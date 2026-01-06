const express = require('express');
const { createClient } = require('redis');
const { v4: uuidv4 } = require('uuid');
const cookieParser = require('cookie-parser');
const cors = require('cors');

const app = express();

// Update CORS to allow requests from the React Frontend
app.use(cors({
    origin: 'http://app.lvh.me',
    credentials: true
}));

app.use(express.json());
app.use(cookieParser());

// Connect to Redis using the hostname 'shared-redis'
const redisClient = createClient({ url: 'redis://shared-redis:6379' });
redisClient.connect().catch(console.error);

// Login Endpoint
app.post('/auth/login', async (req, res) => {
    const { email } = req.body;
    
    // Simulate User Lookup
    if (!email) return res.status(400).json({ error: "Email required" });

    // Generate Session
    const sessionId = uuidv4();
    
    // Store in Redis (The "Coat Check")
    // Note: We store the email and orgId here
    await redisClient.set(
        `session:${sessionId}`, 
        JSON.stringify({ 
            userId: 101, 
            email: email, 
            orgId: 999,
            role: 'admin' 
        }),
        { EX: 86400 } // 24 hours TTL
    );

    console.log(`[Core] Session created: ${sessionId} for ${email}`);

    // Set Cookie (The "Claim Ticket")
    // CRITICAL: domain must start with dot to allow subdomains
    res.cookie('session_id', sessionId, {
        domain: '.lvh.me', 
        httpOnly: true,
        path: '/'
    });

    res.json({ message: 'Login successful', sessionId });
});

// User Endpoint (For checking who is logged in via API)
app.get('/user/me', async (req, res) => {
    const sessionId = req.cookies.session_id;
    if (!sessionId) return res.status(401).json({ error: 'No cookie found' });

    const userData = await redisClient.get(`session:${sessionId}`);
    if (!userData) return res.status(401).json({ error: 'Invalid session' });

    res.json(JSON.parse(userData));
});

app.listen(4000, () => console.log('Core Backend running on port 4000'));