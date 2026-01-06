from fastapi import FastAPI, Request, HTTPException
import redis
import json
import os

app = FastAPI()

# Connect to the Redis container running in the OTHER project
redis_host = os.getenv("REDIS_HOST", "localhost")
r = redis.Redis(host=redis_host, port=6379, decode_responses=True)

@app.get("/")
def read_root(request: Request):
    # 1. Extract Cookie
    session_id = request.cookies.get("session_id")
    
    if not session_id:
        return {
            "status": "Public View",
            "message": "You are NOT logged in. No Cookie found.",
            "action": "Please POST to http://api.lvh.me/auth/login"
        }

    # 2. Validate with Core Redis
    try:
        user_data_raw = r.get(f"session:{session_id}")
    except redis.exceptions.ConnectionError:
        return {"error": "Cannot connect to Redis. Is Repo 1 running?"}

    if not user_data_raw:
         return {
            "status": "Unauthorized", 
            "message": "Cookie found, but Session ID is invalid or expired."
        }
    
    # 3. Success
    user_data = json.loads(user_data_raw)
    return {
        "status": "Authenticated",
        "app": "Content Service (Python)",
        "logged_in_user": user_data['email'],
        "organization_id": user_data['orgId']
    }