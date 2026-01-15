const express = require('express');
const { createClient } = require('redis');
const { v4: uuidv4 } = require('uuid');
const cookieParser = require('cookie-parser');
const cors = require('cors');
const bcrypt = require('bcryptjs');

const sequelize = require('./config/database');
const User = require('./models/User');
const Organization = require('./models/Organization');

const app = express();
const PORT = process.env.PORT || 4000;

/* ============================
   MODEL RELATIONSHIPS
============================ */
User.belongsTo(Organization);
Organization.hasMany(User);

// You will likely add a Subscription model here later for Billing
// Organization.hasOne(Subscription);

/* ============================
   MIDDLEWARE
============================ */
app.use(cors({
    origin: ['http://app.lvh.me', 'http://javascript.lvh.me', 'http://python.lvh.me'], // Add other micro-app URLs here later
    credentials: true
}));
app.use(express.json());
app.use(cookieParser());

/* ============================
   REDIS CLIENT (Shared Session Store)
============================ */
const redisClient = createClient({
    url: `redis://${process.env.REDIS_HOST}:6379`,
    socket: {
        reconnectStrategy: retries => Math.min(retries * 50, 2000)
    }
});

/* ============================
   CORE AUTH ROUTES
============================ */
// SIGN UP
app.post('/auth/signup', async (req, res) => {
    try {
        const { name, email, password } = req.body;
        if (!name || !email || !password) {
            return res.status(400).json({ error: 'Missing fields' });
        }

        const existingUser = await User.findOne({ where: { email } });
        if (existingUser) {
            return res.status(409).json({ error: 'User already exists' });
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        const result = await sequelize.transaction(async (t) => {
            const org = await Organization.create({
                name: `${name}'s Org`,
                plan: 'free'
            }, { transaction: t });

            const user = await User.create({
                name,
                email,
                password: hashedPassword,
                OrganizationId: org.id
            }, { transaction: t });

            return { user, org };
        });

        const sessionId = await createSession(result.user, result.org);
        setCookie(res, sessionId);

        res.status(201).json({ message: 'Account created' });
    } catch (err) {
        console.error('Signup error:', err);
        res.status(500).json({ error: 'Internal server error' });
    }
});

// LOGIN
app.post('/auth/login', async (req, res) => {
    try {
        const { email, password } = req.body;

        const user = await User.findOne({
            where: { email },
            include: Organization
        });

        if (!user) {
            return res.status(400).json({ error: 'Invalid credentials' });
        }

        const valid = await bcrypt.compare(password, user.password);
        if (!valid) {
            return res.status(400).json({ error: 'Invalid credentials' });
        }

        const sessionId = await createSession(user, user.Organization);
        setCookie(res, sessionId);

        res.json({ message: 'Login successful' });
    } catch (err) {
        console.error('Login error:', err);
        res.status(500).json({ error: 'Internal server error' });
    }
});

// LOGOUT
app.post('/auth/logout', async (req, res) => {
    try {
        const sessionId = req.cookies.session_id;
        
        // 1. Remove from Redis if session exists
        if (sessionId) {
            await redisClient.del(`session:${sessionId}`);
        }

        // 2. Clear the cookie
        // IMPORTANT: Options must match exactly how the cookie was set
        res.clearCookie('session_id', {
            domain: '.lvh.me',
            path: '/'
        });

        res.json({ message: 'Logged out successfully' });
    } catch (err) {
        console.error('Logout error:', err);
        // Even if Redis fails, we generally want to tell the client 
        // they are logged out or at least clear the cookie.
        res.status(500).json({ error: 'Internal server error' }); 
    }
});

// CURRENT USER (Session Validation)
app.get('/user/me', async (req, res) => {
    try {
        const sessionId = req.cookies.session_id;
        if (!sessionId) return res.status(401).json({ error: 'No session' });

        const data = await redisClient.get(`session:${sessionId}`);
        if (!data) return res.status(401).json({ error: 'Session expired' });

        res.json(JSON.parse(data));
    } catch (err) {
        res.status(500).json({ error: 'Internal server error' });
    }
});

/* ============================
   BILLING ENGINE (New Core Feature)
============================ */
// This is where Stripe/Payment logic lives. 
// Micro-apps should NOT handle billing. They query this service.

app.get('/billing/status', async (req, res) => {
    // 1. Validate Session
    const sessionId = req.cookies.session_id;
    if (!sessionId) return res.status(401).json({ error: 'Unauthorized' });
    
    // 2. Fetch Billing Status
    // In real life: Check DB or Stripe API for subscription status
    const userData = JSON.parse(await redisClient.get(`session:${sessionId}`));
    
    res.json({
        orgId: userData.orgId,
        plan: userData.plan, // 'free', 'pro', 'enterprise'
        status: 'active',
        nextBillingDate: '2026-02-01'
    });
});

app.post('/billing/upgrade', async (req, res) => {
    // Logic to upgrade plan
    res.json({ message: "Mock upgrade successful" });
});

/* ============================
   HELPERS
============================ */
async function createSession(user, org) {
    const sessionId = uuidv4();
    const payload = {
        userId: user.id,
        email: user.email,
        name: user.name,
        orgId: org.id,
        plan: org.plan
    };

    await redisClient.set(
        `session:${sessionId}`,
        JSON.stringify(payload),
        { EX: 86400 }
    );

    return sessionId;
}

function setCookie(res, sessionId) {
    res.cookie('session_id', sessionId, {
        domain: '.lvh.me',
        httpOnly: true,
        secure: false,
        sameSite: 'lax',
        path: '/'
    });
}

/* ============================
   STARTUP SEQUENCE
============================ */
async function startServer() {
    // Wait for MySQL
    let retries = 5;
    while (retries) {
        try {
            await sequelize.authenticate();
            console.log('[MySQL] Connected');
            break;
        } catch (err) {
            console.log('[MySQL] Waiting...', err.message);
            retries -= 1;
            await new Promise(r => setTimeout(r, 5000));
        }
    }
    
    await sequelize.sync({ force: false });
    await redisClient.connect();
    
    app.listen(PORT, () => {
        console.log(`Core Platform Backend running on port ${PORT}`);
    });
}

startServer().catch(err => console.error(err));