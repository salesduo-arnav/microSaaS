FROM node:18-alpine

WORKDIR /app

# 1. Copy Shared SDK
COPY shared-libs/salesduo-js-sdk ./shared-libs/salesduo-js-sdk
# Note: We NO LONGER need to build the SDK
WORKDIR /app/shared-libs/salesduo-js-sdk
RUN npm install

# 2. Setup Backend
WORKDIR /app/micro-apps/template-node-react/backend
COPY micro-apps/template-node-react/backend/package.json .
RUN npm install
COPY micro-apps/template-node-react/backend .

CMD ["npm", "start"]