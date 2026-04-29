FROM node:20-bookworm-slim
WORKDIR /app
COPY package.json package-lock.json* ./
COPY frontend/package.json frontend/package.json
RUN npm install
COPY . .
WORKDIR /app/frontend
EXPOSE 5173
CMD ["npm", "run", "dev"]
