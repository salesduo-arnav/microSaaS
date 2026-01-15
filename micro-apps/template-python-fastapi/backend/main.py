import logging
import traceback
from fastapi import FastAPI, Depends, Request
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import JSONResponse
from salesduo import get_current_user, AuthUser

# 1. Setup Logging to Console (So 'docker logs' shows it)
logging.basicConfig(level=logging.INFO)
logger = logging.getLogger("fastapi_app")

app = FastAPI()

# 2. CORS Setup
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://python.lvh.me", "http://localhost:5006"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# 3. Global Exception Handler (The "Black Box" Recorder)
@app.exception_handler(Exception)
async def global_exception_handler(request: Request, exc: Exception):
    # Print the FULL stack trace to the console
    error_msg = traceback.format_exc()
    logger.error(f"❌ CRITICAL ERROR on {request.url.path}:\n{error_msg}")
    
    return JSONResponse(
        status_code=500,
        content={"detail": "Internal Server Error", "error": str(exc), "trace": error_msg.split("\n")}
    )

@app.get("/api/health")
def health_check():
    logger.info("Health check endpoint called")
    return {"status": "ok", "service": "Python Micro App"}

# PROTECTED ROUTE
@app.get("/api/dashboard-data")
async def get_dashboard_data(user: AuthUser = Depends(get_current_user)):
    logger.info(f"Dashboard access granted for user: {user.email}")
    return {
        "message": f"Welcome back, {user.name}!",
        "org_id": user.org_id,
        "plan": user.plan,
        "secret_data": [1, 2, 3, 4, 5]
    }