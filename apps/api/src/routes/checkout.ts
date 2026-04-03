import { Router, Request, Response } from 'express';
import type { Router as IRouter } from 'express';
import { requireAuth } from '../middleware/auth';
import {
  createStripePaymentIntent,
  createPayPalOrder,
  confirmOrder,
} from '../services/checkout.service';
import { prisma } from '../lib/prisma';

const router: IRouter = Router();

router.use(requireAuth);

router.post('/checkout/create-payment-intent', async (req: Request, res: Response) => {
  try {
    const result = await createStripePaymentIntent(req.user!.id);
    res.json(result);
  } catch (err) {
    const msg = err instanceof Error ? err.message : 'Failed to create payment intent';
    res.status(400).json({ error: msg });
  }
});

router.post('/checkout/create-paypal-order', async (req: Request, res: Response) => {
  try {
    const result = await createPayPalOrder(req.user!.id);
    res.json(result);
  } catch (err) {
    const msg = err instanceof Error ? err.message : 'Failed to create PayPal order';
    res.status(400).json({ error: msg });
  }
});

router.post('/checkout/confirm', async (req: Request, res: Response) => {
  const { paymentMethod, paymentId, shippingAddress } = req.body;
  if (!paymentMethod || !paymentId) {
    return res.status(400).json({ error: 'paymentMethod and paymentId are required' });
  }
  try {
    const order = await confirmOrder(req.user!.id, paymentMethod, paymentId, shippingAddress);
    res.json(order);
  } catch (err) {
    const msg = err instanceof Error ? err.message : 'Failed to confirm order';
    res.status(400).json({ error: msg });
  }
});

router.get('/orders/history', async (req: Request, res: Response) => {
  const orders = await prisma.order.findMany({
    where: { userId: req.user!.id },
    include: { items: { include: { product: { select: { name: true, slug: true, imageUrl: true } } } } },
    orderBy: { createdAt: 'desc' },
  });
  res.json(orders);
});

router.get('/orders/:id', async (req: Request, res: Response) => {
  const order = await prisma.order.findFirst({
    where: { id: req.params.id, userId: req.user!.id },
    include: { items: { include: { product: { include: { category: true } } } } },
  });
  if (!order) return res.status(404).json({ error: 'Order not found' });
  res.json(order);
});

export default router;
