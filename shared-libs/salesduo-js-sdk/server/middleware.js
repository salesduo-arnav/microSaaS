const { createClient } = require('redis');

// Initialize Redis once
const redisClient = createClient({ url: process.env.REDIS_URL || 'redis://localhost:6379' });
redisClient.connect().catch(console.error);

const verifySession = async (req, res, next) => {
  const sessionId = req.cookies['session_id'];

  if (!sessionId) {
    return res.status(401).json({ error: "Unauthorized: No Session Cookie" });
  }

  try {
    const data = await redisClient.get(`session:${sessionId}`);
    if (!data) {
      return res.status(403).json({ error: "Session Expired" });
    }
    
    // Attach User Context to Request
    req.user = JSON.parse(data);
    next();
  } catch (err) {
    console.error("Session Validation Error", err);
    res.status(500).json({ error: "Internal Auth Error" });
  }
};

module.exports = { verifySession };