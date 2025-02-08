# Use Node.js LTS (matches engine requirement in package.json)
FROM node:20-slim

# Set working directory
WORKDIR /app

# Copy package files
COPY package*.json ./

# Install dependencies
RUN npm install

# Install Observable CLI globally
RUN npm install -g @observablehq/framework

# Disable telemetry
ENV OBSERVABLE_TELEMETRY_DISABLE=true

EXPOSE 8080

# Start development server
CMD ["npm", "run", "docker"]