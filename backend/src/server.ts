import express from 'express';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import { env } from './config/env.js';
import authRoutes from './routes/auth.routes.js';
import birdRoutes from './routes/bird.routes.js';
import { requireAuth } from './middleware/auth.js';
import { promptHistoryHandler, fieldBirdsHandler } from './controllers/bird.controller.js';

const app = express();

app.use(cors({ origin: env.frontendUrl, credentials: true }));
app.use(express.json());
app.use(cookieParser());

app.get('/api/health', (_req, res) => res.json({ ok: true, mockMode: env.mockMode }));

app.use('/api/auth', authRoutes);
app.use('/api/birds', requireAuth, birdRoutes);
app.get('/api/prompts', requireAuth, promptHistoryHandler);
app.get('/api/field/birds', requireAuth, fieldBirdsHandler);

app.listen(env.port, () => {
  console.log(`Backend running on http://localhost:${env.port}`);
});
