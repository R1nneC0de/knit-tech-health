import { Router, Request, Response } from 'express';
import type { Router as IRouter } from 'express';
import { z } from 'zod';
import { validate } from '../middleware/validate';
import { requireAuth } from '../middleware/auth';
import {
  registerUser,
  loginUser,
  refreshAccessToken,
} from '../services/auth.service';
import { prisma } from '../lib/prisma';

const router: IRouter = Router();

const registerSchema = z.object({
  email: z.string().email(),
  password: z.string().min(8, 'Password must be at least 8 characters'),
  firstName: z.string().min(1),
  lastName: z.string().min(1),
  phone: z.string().optional(),
});

const loginSchema = z.object({
  email: z.string().email(),
  password: z.string().min(1),
});

router.post('/auth/register', validate(registerSchema), async (req: Request, res: Response) => {
  try {
    const result = await registerUser(req.body);
    res.status(201).json(result);
  } catch (err) {
    const msg = err instanceof Error ? err.message : 'Registration failed';
    res.status(400).json({ error: msg });
  }
});

router.post('/auth/login', validate(loginSchema), async (req: Request, res: Response) => {
  try {
    const result = await loginUser(req.body.email, req.body.password);
    res.json(result);
  } catch (err) {
    const msg = err instanceof Error ? err.message : 'Login failed';
    res.status(401).json({ error: msg });
  }
});

router.post('/auth/refresh', async (req: Request, res: Response) => {
  const { refreshToken } = req.body;
  if (!refreshToken) return res.status(400).json({ error: 'Refresh token required' });
  try {
    const result = await refreshAccessToken(refreshToken);
    res.json(result);
  } catch {
    res.status(401).json({ error: 'Invalid refresh token' });
  }
});

router.get('/auth/me', requireAuth, async (req: Request, res: Response) => {
  const user = await prisma.user.findUnique({
    where: { id: req.user!.id },
    select: { id: true, email: true, firstName: true, lastName: true, phone: true, role: true },
  });
  if (!user) return res.status(404).json({ error: 'User not found' });
  res.json(user);
});

export default router;
