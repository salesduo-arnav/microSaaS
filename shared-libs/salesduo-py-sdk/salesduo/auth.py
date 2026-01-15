import os
import json
import redis
from fastapi import Request, HTTPException, Depends

# Initialize Redis Connection
redis_host = os.getenv("REDIS_HOST", "localhost")
r = redis.Redis(host=redis_host, port=6379, decode_responses=True)

async def get_current_user(request: Request):
    """
    FastAPI Dependency that extracts the session_id cookie 
    and validates it against Redis.
    """
    session_id = request.cookies.get("session_id")
    
    if not session_id:
        raise HTTPException(status_code=401, detail="Not authenticated")
        
    user_data_raw = r.get(f"session:{session_id}")
    
    if not user_data_raw:
        raise HTTPException(status_code=403, detail="Session expired")
        
    # Return user object (dict)
    return json.loads(user_data_raw)