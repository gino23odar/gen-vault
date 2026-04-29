FROM node:20-bookworm-slim
WORKDIR /app
COPY package.json package-lock.json* ./
COPY backend/package.json backend/package.json
RUN apt-get update -y \
  && apt-get install -y --no-install-recommends openssl ca-certificates \
  && rm -rf /var/lib/apt/lists/*
COPY . .
WORKDIR /app/backend
RUN npx prisma generate
EXPOSE 4000
CMD ["npm", "run", "dev", "--workspace", "backend"]
