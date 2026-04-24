import dotenv from 'dotenv';

dotenv.config();

export const env = {
  port: Number(process.env.PORT ?? 4000),
  databaseUrl: process.env.DATABASE_URL ?? '',
  jwtSecret: process.env.JWT_SECRET ?? 'dev-secret-change-me',
  frontendUrl: process.env.FRONTEND_URL ?? 'http://localhost:5173',
  mockMode: process.env.MOCK_MODE !== 'false',
};
