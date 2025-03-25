FROM node:20-slim
WORKDIR /app
COPY package*.json ./
RUN npm install
RUN npm install -g @observablehq/framework
ENV OBSERVABLE_TELEMETRY_DISABLE=true
EXPOSE 8080
CMD ["npm", "run", "docker"]