const express = require('express');
const cookieParser = require('cookie-parser');
const cors = require('cors');
// Import from the Shared SDK (CommonJS supported)
const { initSalesDuoMiddleware, requireAuth } = require('@salesduo/js-sdk/server');

const app = express();

// Middleware
app.use(cookieParser());
app.use(cors({ 
    origin: 'http://javascript.lvh.me', // The Frontend URL
    credentials: true 
}));

// Initialize Redis Connection via SDK
initSalesDuoMiddleware();

// 1. Health Check
app.get('/', (req, res) => {
    res.json({ status: 'Backend is running' });
});

// 2. Protected Route (Uses the SDK middleware)
app.get('/api/protected', requireAuth, (req, res) => {
    // req.user is populated by the SDK if session is valid
    res.json({
        message: `Hello ${req.user.name}, this is data from the Micro App Backend!`,
        orgId: req.user.orgId,
        secret: "JS Backend working perfectly"
    });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Micro App Backend running on port ${PORT}`);
});