import { Router, Request, Response } from 'express';
import type { Router as IRouter } from 'express';
import { stripe } from '../lib/stripe';
import { prisma } from '../lib/prisma';

const router: IRouter = Router();

router.post('/stripe', async (req: Request, res: Response) => {
  const sig = req.headers['stripe-signature'];
  const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET;

  if (!webhookSecret || !sig) {
    return res.status(400).json({ error: 'Missing stripe signature' });
  }

  let event;
  try {
    event = stripe.webhooks.constructEvent(req.body, sig, webhookSecret);
  } catch {
    return res.status(400).json({ error: 'Invalid webhook signature' });
  }

  if (event.type === 'payment_intent.succeeded') {
    const intent = event.data.object as { id: string };
    // Mark any pending orders with this payment intent as PAID
    await prisma.order.updateMany({
      where: { paymentId: intent.id, status: 'PENDING' },
      data: { status: 'PAID' },
    });
  }

  res.json({ received: true });
});

export default router;
