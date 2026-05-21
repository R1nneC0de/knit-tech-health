export const dynamic = 'force-dynamic';
import { NextRequest, NextResponse } from 'next/server';
import { requireAuth, handleError } from '@/lib/api-auth';
import { prisma } from '@/lib/prisma';
import { stripe } from '@/lib/stripe';

const TAX_RATE = 0.07;

async function getCartTotal(userId: string) {
  let cart = await prisma.cart.findUnique({
    where: { userId },
    include: { items: { include: { product: true } } },
  });
  if (!cart) {
    cart = await prisma.cart.create({
      data: { userId },
      include: { items: { include: { product: true } } },
    });
  }
  let subtotal = 0;
  for (const item of cart.items) subtotal += Number(item.product.price) * item.quantity;
  return { subtotal, cart };
}

export async function POST(request: NextRequest) {
  try {
    const user = requireAuth(request);
    const { subtotal, cart } = await getCartTotal(user.id);
    if (cart.items.length === 0) return NextResponse.json({ error: 'Cart is empty' }, { status: 400 });

    const tax = subtotal * TAX_RATE;
    const total = subtotal + tax;
    const amountCents = Math.round(total * 100);

    const paymentIntent = await stripe.paymentIntents.create({
      amount: amountCents,
      currency: 'usd',
      metadata: { userId: user.id, cartId: cart.id },
    });

    return NextResponse.json({
      clientSecret: paymentIntent.client_secret,
      paymentIntentId: paymentIntent.id,
      subtotal,
      tax,
      total,
    });
  } catch (err) {
    return handleError(err);
  }
}
