FROM node:18-alpine

WORKDIR /app

# 1. Copy Shared SDK
COPY shared-libs/salesduo-js-sdk ./shared-libs/salesduo-js-sdk
WORKDIR /app/shared-libs/salesduo-js-sdk
RUN npm install

# 2. Setup Frontend
WORKDIR /app/micro-apps/template-python-fastapi/frontend
COPY micro-apps/template-python-fastapi/frontend/package.json .
RUN npm install
COPY micro-apps/template-python-fastapi/frontend .

EXPOSE 5173
CMD ["npm", "run", "dev", "--", "--host"]