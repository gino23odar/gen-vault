import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { z } from 'zod';
import { env } from '../config/env.js';
import { prisma } from '../utils/prisma.js';

const authSchema = z.object({
  email: z.string().email(),
  password: z.string().min(8),
  displayName: z.string().min(2).max(50).optional(),
});

export const signup = async (input: unknown) => {
  const data = authSchema.parse(input);
  const existing = await prisma.user.findUnique({ where: { email: data.email } });
  if (existing) {
    throw new Error('Email already exists');
  }

  const passwordHash = await bcrypt.hash(data.password, 10);
  const user = await prisma.user.create({
    data: {
      email: data.email,
      passwordHash,
      displayName: data.displayName ?? data.email.split('@')[0],
    },
  });

  return { user, token: signToken(user.id, user.email) };
};

export const signin = async (input: unknown) => {
  const data = authSchema.omit({ displayName: true }).parse(input);
  const user = await prisma.user.findUnique({ where: { email: data.email } });
  if (!user) {
    throw new Error('Invalid credentials');
  }

  const ok = await bcrypt.compare(data.password, user.passwordHash);
  if (!ok) {
    throw new Error('Invalid credentials');
  }

  return { user, token: signToken(user.id, user.email) };
};

function signToken(userId: string, email: string) {
  return jwt.sign({ userId, email }, env.jwtSecret, { expiresIn: '7d' });
}
