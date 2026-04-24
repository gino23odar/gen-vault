import type { Request, Response } from 'express';
import { signin, signup } from '../services/auth.service.js';
import type { AuthedRequest } from '../middleware/auth.js';
import { prisma } from '../utils/prisma.js';

const cookieOptions = {
  httpOnly: true,
  sameSite: 'lax' as const,
  secure: false,
  maxAge: 7 * 24 * 60 * 60 * 1000,
};

export async function signupHandler(req: Request, res: Response) {
  try {
    const result = await signup(req.body);
    res.cookie('token', result.token, cookieOptions);
    return res.json({ user: sanitize(result.user) });
  } catch (error) {
    return res.status(400).json({ message: (error as Error).message });
  }
}

export async function signinHandler(req: Request, res: Response) {
  try {
    const result = await signin(req.body);
    res.cookie('token', result.token, cookieOptions);
    return res.json({ user: sanitize(result.user) });
  } catch (error) {
    return res.status(401).json({ message: (error as Error).message });
  }
}

export async function signoutHandler(_req: Request, res: Response) {
  res.clearCookie('token');
  return res.json({ ok: true });
}

export async function meHandler(req: AuthedRequest, res: Response) {
  const userId = req.user?.userId;
  if (!userId) return res.status(401).json({ message: 'Unauthorized' });

  const user = await prisma.user.findUnique({ where: { id: userId } });
  if (!user) return res.status(404).json({ message: 'User not found' });

  return res.json({ user: sanitize(user) });
}

function sanitize(user: { id: string; email: string; displayName: string; createdAt: Date }) {
  return {
    id: user.id,
    email: user.email,
    displayName: user.displayName,
    createdAt: user.createdAt,
  };
}
