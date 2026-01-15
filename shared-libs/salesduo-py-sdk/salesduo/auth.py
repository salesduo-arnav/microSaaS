import os
import json
import logging
from fastapi import Request, HTTPException
import redis.asyncio as redis
from dotenv import load_dotenv

# Load environment variables from .env file
load_dotenv()

# Setup Logger for SDK
logger = logging.getLogger("salesduo_sdk")
logging.basicConfig(level=logging.INFO)

REDIS_URL = os.getenv('REDIS_URL', 'redis://shared-redis:6379')

# Create Client
redis_client = redis.from_url(REDIS_URL, decode_responses=True)

class AuthUser:
    def __init__(self, data: dict):
        self.id = data.get('userId') or data.get('id')
        self.email = data.get('email')
        self.name = data.get('name')
        self.org_id = data.get('orgId')
        self.plan = data.get('plan')

async def get_current_user(request: Request) -> AuthUser:
    """
    FastAPI Dependency with Debug Logging
    """
    # 1. Log Cookie Check
    session_id = request.cookies.get("session_id")
    logger.info(f"🔍 [SDK] Checking Auth. Session ID Cookie found: {'YES' if session_id else 'NO'}")
    
    if not session_id:
        logger.warning("⚠️ [SDK] No session_id cookie found in request.")
        raise HTTPException(status_code=401, detail="Unauthorized: No Session Cookie")

    try:
        # 2. Log Redis Lookup
        logger.info(f"⏳ [SDK] Connecting to Redis at {REDIS_URL} for session: {session_id[:6]}...")
        data_str = await redis_client.get(f"session:{session_id}")
        
        if not data_str:
            logger.warning(f"⛔ [SDK] Session {session_id[:6]}... not found in Redis (Expired/Invalid).")
            raise HTTPException(status_code=403, detail="Session Expired")
        
        # 3. Log Success
        logger.info(f"✅ [SDK] Session valid. User Data: {data_str}")
        user_data = json.loads(data_str)
        return AuthUser(user_data)

    except redis.RedisError as e:
        logger.error(f"🔥 [SDK] Redis Connection Failed: {str(e)}")
        raise HTTPException(status_code=500, detail=f"Internal Auth Error: {str(e)}")
    except Exception as e:
        logger.error(f"🔥 [SDK] Unexpected Error in get_current_user: {str(e)}")
        raise HTTPException(status_code=500, detail="Unknown Auth Error")