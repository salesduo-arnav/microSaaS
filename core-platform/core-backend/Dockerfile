FROM node:18-alpine

WORKDIR /app

# Copy package files first to leverage Docker cache
COPY package*.json ./
RUN npm install

# Copy source code
COPY . .

EXPOSE 4000

CMD ["npm", "start"]