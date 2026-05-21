import { Router } from 'express';
import type { Router as IRouter } from 'express';
import { z } from 'zod';
import { prisma } from '../lib/prisma';
import { optionalAuth } from '../middleware/auth';
import { validate } from '../middleware/validate';

const router: IRouter = Router();

const applySchema = z.object({
  firstName: z.string().min(1),
  lastName: z.string().min(1),
  email: z.string().email(),
  phone: z.string().min(7),
  position: z.string().min(1),
  message: z.string().optional(),
});

router.post('/job-applications', optionalAuth, validate(applySchema), async (req, res, next) => {
  try {
    const data = req.body as z.infer<typeof applySchema>;
    const application = await prisma.jobApplication.create({
      data: {
        ...data,
        userId: req.user?.id ?? null,
      },
    });
    res.status(201).json(application);
  } catch (err) {
    next(err);
  }
});

export default router;
