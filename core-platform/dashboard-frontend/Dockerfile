# Build stage
FROM node:18-alpine AS builder

WORKDIR /app

COPY core-platform/dashboard-frontend/package.json \
     core-platform/dashboard-frontend/package-lock.json ./

RUN npm ci

COPY core-platform/dashboard-frontend .

RUN npm run build

# Runtime stage
FROM nginx:alpine

COPY --from=builder /app/dist /usr/share/nginx/html

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]