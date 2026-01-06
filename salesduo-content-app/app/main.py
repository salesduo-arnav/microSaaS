from fastapi import FastAPI, Request
from fastapi.responses import HTMLResponse
import redis
import json
import os
import urllib.parse  # Import this to handle URL encoding

app = FastAPI()

redis_host = os.getenv("REDIS_HOST", "localhost")
r = redis.Redis(host=redis_host, port=6379, decode_responses=True)

@app.get("/", response_class=HTMLResponse)
def read_root(request: Request):
    # 1. Capture the current URL (e.g., http://content.lvh.me/)
    # In a real proxy scenario, you might need X-Forwarded-Proto / Host headers
    # For this POC, we can hardcode the intent or derive it.
    current_url = "http://content.lvh.me" 
    
    # 2. Encode it safely
    # This turns "http://content.lvh.me" into "http%3A%2F%2Fcontent.lvh.me"
    encoded_url = urllib.parse.quote(current_url)
    
    # 3. Construct the login URL
    login_url = f"http://app.lvh.me?redirect={encoded_url}"

    html_content = f"""
    <!DOCTYPE html>
    <html>
    <head>
        <title>Content App</title>
        <style>
            body {{ font-family: sans-serif; padding: 2rem; background-color: #f0f8ff; }}
            .card {{ background: white; padding: 1.5rem; border-radius: 8px; box-shadow: 0 2px 4px rgba(0,0,0,0.1); }}
            .success {{ color: green; font-weight: bold; }}
            .error {{ color: red; font-weight: bold; }}
            .btn {{ display: inline-block; padding: 10px 20px; background: #007bff; color: white; text-decoration: none; border-radius: 4px; }}
            .btn:hover {{ background: #0056b3; }}
        </style>
    </head>
    <body>
        <div class="card">
            <h1>Content Generation App</h1>
            <p>Host: <code>content.lvh.me</code></p>
            <hr/>
            <div id="status">Checking authentication...</div>
        </div>

        <script>
            // We pass the login URL from Python to JS here
            const LOGIN_URL = "{login_url}";

            fetch('/api/me')
                .then(res => res.json())
                .then(data => {{
                    const el = document.getElementById('status');
                    if(data.status === 'Authenticated') {{
                        el.innerHTML = `
                            <p class="success">✅ Authenticated via Shared Cookie</p>
                            <p><b>User:</b> ${{data.logged_in_user}}</p>
                            <p><b>Org ID:</b> ${{data.organization_id}}</p>
                            <br/>
                            <button onclick="alert('Generating Content...')">Generate AI Content</button>
                        `;
                    }} else {{
                        // Use the new Redirect Link
                        el.innerHTML = `
                            <p class="error">❌ Not Logged In</p>
                            <p>You must sign in to view this content.</p>
                            <br/>
                            <a href="${{LOGIN_URL}}" class="btn">Go to Login</a>
                        `;
                    }}
                }});
        </script>
    </body>
    </html>
    """
    return html_content

# ... (Keep the /api/me endpoint exactly as it was in the previous step)
@app.get("/api/me")
def read_api_me(request: Request):
    session_id = request.cookies.get("session_id")
    if not session_id:
        return {"status": "Public", "message": "No Session Cookie found."}
    
    try:
        user_data_raw = r.get(f"session:{session_id}")
        if not user_data_raw:
             return {"status": "Unauthorized"}
        user_data = json.loads(user_data_raw)
        return {
            "status": "Authenticated",
            "logged_in_user": user_data['email'],
            "organization_id": user_data['orgId']
        }
    except:
        return {"error": "Redis Error"}