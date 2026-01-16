FROM node:18-alpine

WORKDIR /app

# Copy shared libraries
COPY shared-libs ./shared-libs

# Install shared-lib dependencies
WORKDIR /app/shared-libs/salesduo-ui
RUN npm install

# Setup dashboard
WORKDIR /app/core-platform/dashboard-frontend
COPY core-platform/dashboard-frontend/package.json .
# npm install will use the `file:` path which points to ../../shared-libs/salesduo-ui
# We are currently in /app/core-platform/dashboard-frontend
# ../../shared-libs/salesduo-ui translates to /app / shared-libs / salesduo-ui
# Which exists because we copied shared-libs to /app/shared-libs

RUN npm install

# Copy the rest of the dashboard code
COPY core-platform/dashboard-frontend .

# Expose Vite port
EXPOSE 3000
CMD ["npm", "run", "dev", "--", "--host"]