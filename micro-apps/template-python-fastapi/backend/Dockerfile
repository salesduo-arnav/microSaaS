FROM python:3.10-slim

WORKDIR /app

# 1. Copy the Shared SDK folder (from Root Context)
COPY shared-libs/salesduo-py-sdk ./shared-libs/salesduo-py-sdk

# 2. Setup Micro App
WORKDIR /app/micro-apps/template-python-fastapi/backend

# 3. Copy requirements first (caching layer)
COPY micro-apps/template-python-fastapi/backend/requirements.txt .

# 4. Install dependencies (Including the local SDK)
RUN pip install --no-cache-dir -r requirements.txt

# 5. Copy App Code
COPY micro-apps/template-python-fastapi/backend .

# 6. Run Uvicorn
CMD ["uvicorn", "main:app", "--host", "0.0.0.0", "--port", "5000"]