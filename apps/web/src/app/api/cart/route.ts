export const dynamic = 'force-dynamic';
import { NextRequest, NextResponse } from 'next/server';
import { requireAuth, handleError } from '@/lib/api-auth';
import { prisma } from '@/lib/prisma';

async function getOrCreateCart(userId: string) {
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
  return cart;
}

export async function GET(request: NextRequest) {
  try {
    const user = requireAuth(request);
    const cart = await getOrCreateCart(user.id);
    return NextResponse.json(cart);
  } catch (err) {
    return handleError(err);
  }
}

export async function DELETE(request: NextRequest) {
  try {
    const user = requireAuth(request);
    const cart = await getOrCreateCart(user.id);
    await prisma.cartItem.deleteMany({ where: { cartId: cart.id } });
    return NextResponse.json({ message: 'Cart cleared' });
  } catch (err) {
    return handleError(err);
  }
}
