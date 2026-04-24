import type { Response } from 'express';
import { z } from 'zod';
import type { AuthedRequest } from '../middleware/auth.js';
import { deleteBird, generateBird, getBird, listBirds, listFieldBirds, listPromptHistory, reorderBirds, toggleFavorite } from '../services/bird.service.js';

export async function generateBirdHandler(req: AuthedRequest, res: Response) {
  try {
    const bird = await generateBird(req.user!.userId, req.body);
    return res.status(201).json({ bird });
  } catch (error) {
    return res.status(400).json({ message: (error as Error).message });
  }
}

export async function listBirdsHandler(req: AuthedRequest, res: Response) {
  const birds = await listBirds(req.user!.userId);
  return res.json({ birds });
}

export async function getBirdHandler(req: AuthedRequest, res: Response) {
  const bird = await getBird(req.user!.userId, req.params.id);
  if (!bird) return res.status(404).json({ message: 'Bird not found' });
  return res.json({ bird });
}

export async function favoriteBirdHandler(req: AuthedRequest, res: Response) {
  const body = z.object({ isFavorite: z.boolean() }).parse(req.body);
  const bird = await toggleFavorite(req.user!.userId, req.params.id, body.isFavorite);
  return res.json({ bird });
}

export async function reorderBirdsHandler(req: AuthedRequest, res: Response) {
  const body = z.object({ ids: z.array(z.string()) }).parse(req.body);
  await reorderBirds(req.user!.userId, body.ids);
  return res.json({ ok: true });
}

export async function deleteBirdHandler(req: AuthedRequest, res: Response) {
  await deleteBird(req.user!.userId, req.params.id);
  return res.json({ ok: true });
}

export async function promptHistoryHandler(req: AuthedRequest, res: Response) {
  const prompts = await listPromptHistory(req.user!.userId);
  return res.json({ prompts });
}

export async function fieldBirdsHandler(req: AuthedRequest, res: Response) {
  const birds = await listFieldBirds(req.user!.userId);
  return res.json({ birds });
}
