export const dynamic = 'force-dynamic';
import { NextRequest, NextResponse } from 'next/server';
import { requireAuth, handleError } from '@/lib/api-auth';
import { prisma } from '@/lib/prisma';
import { Prisma } from '@prisma/client';

const TAX_RATE = 0.07;

async function getCartTotal(userId: string) {
  let cart = await prisma.cart.findUnique({
    where: { userId },
    include: { items: { include: { product: { include: { category: true } } } } },
  });
  if (!cart) {
    cart = await prisma.cart.create({
      data: { userId },
      include: { items: { include: { product: { include: { category: true } } } } },
    });
  }
  let subtotal = 0;
  for (const item of cart.items) subtotal += Number(item.product.price) * item.quantity;
  return { subtotal, cart };
}

export async function POST(request: NextRequest) {
  try {
    const user = requireAuth(request);
    const { paymentMethod, paymentId, shippingAddress } = await request.json();
    if (!paymentMethod || !paymentId) {
      return NextResponse.json({ error: 'paymentMethod and paymentId are required' }, { status: 400 });
    }

    const { subtotal, cart } = await getCartTotal(user.id);
    if (cart.items.length === 0) return NextResponse.json({ error: 'Cart is empty' }, { status: 400 });

    const tax = subtotal * TAX_RATE;
    const total = subtotal + tax;

    const order = await prisma.order.create({
      data: {
        userId: user.id,
        subtotal,
        tax,
        total,
        status: 'PAID',
        paymentMethod,
        paymentId,
        shippingAddress: (shippingAddress ?? Prisma.JsonNull) as Prisma.InputJsonValue,
        items: {
          create: cart.items.map((item) => ({
            productId: item.productId,
            quantity: item.quantity,
            unitPrice: item.product.price,
          })),
        },
      },
      include: { items: { include: { product: true } } },
    });

    await prisma.cartItem.deleteMany({ where: { cartId: cart.id } });
    return NextResponse.json(order);
  } catch (err) {
    return handleError(err);
  }
}
