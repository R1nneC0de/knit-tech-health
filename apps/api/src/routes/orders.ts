import { Router, Request, Response } from 'express';
import type { Router as IRouter } from 'express';
import { z } from 'zod';
import { validate } from '../middleware/validate';
import { requireAuth } from '../middleware/auth';
import { prisma } from '../lib/prisma';
import { createOrder } from '../services/order.service';

const router: IRouter = Router();

const createOrderSchema = z.object({
  productId: z.string().min(1),
  firstName: z.string().min(1, 'First name is required'),
  lastName: z.string().min(1, 'Last name is required'),
  email: z.string().email('Valid email is required'),
  phone: z.string().min(1, 'Phone number is required'),
  organization: z.string().optional(),
  message: z.string().optional(),
});

export type CreateOrderInput = z.infer<typeof createOrderSchema>;

router.post(
  '/orders',
  validate(createOrderSchema),
  async (req: Request, res: Response) => {
    const order = await createOrder(req.body);
    res.status(201).json(order);
  },
);

router.get('/orders/history', requireAuth, async (req, res, next) => {
  try {
    const orders = await prisma.order.findMany({
      where: { userId: req.user!.id },
      include: {
        items: { include: { product: { select: { name: true, slug: true } } } },
      },
      orderBy: { createdAt: 'desc' },
    });
    res.json(orders);
  } catch (err) {
    next(err);
  }
});

router.get('/orders/inquiries', requireAuth, async (req, res, next) => {
  try {
    const inquiries = await prisma.inquiryOrder.findMany({
      where: { userId: req.user!.id },
      include: { product: { select: { name: true, imageUrl: true, slug: true } } },
      orderBy: { createdAt: 'desc' },
    });
    res.json(inquiries);
  } catch (err) {
    next(err);
  }
});

export default router;
