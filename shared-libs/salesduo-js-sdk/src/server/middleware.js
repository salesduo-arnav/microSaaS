const { createClient } = require('redis');

let redisClient;

// Default Redis URL uses environment variable if available
const DEFAULT_REDIS_URL = process.env.REDIS_URL || 'redis://shared-redis:6379';

const initSalesDuoMiddleware = async (redisUrl = DEFAULT_REDIS_URL) => {
  if (!redisClient) {
    redisClient = createClient({ url: redisUrl });
    redisClient.on('error', (err) => console.error('[SalesDuo SDK] Redis Error', err));
    await redisClient.connect();
    console.log('[SalesDuo SDK] Connected to Redis');
  }
};

const requireAuth = async (req, res, next) => {
  const sessionId = req.cookies['session_id'];

  if (!sessionId) {
    return res.status(401).json({ error: 'Unauthorized: No Session' });
  }

  try {
    if (!redisClient) await initSalesDuoMiddleware();
    
    const data = await redisClient.get(`session:${sessionId}`);
    if (!data) {
      return res.status(403).json({ error: 'Session Expired' });
    }

    req.user = JSON.parse(data);
    next();
  } catch (err) {
    console.error('[SalesDuo SDK] Auth Error', err);
    res.status(500).json({ error: 'Internal Auth Validation Error' });
  }
};

module.exports = { initSalesDuoMiddleware, requireAuth };