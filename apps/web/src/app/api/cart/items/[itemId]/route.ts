export const dynamic = 'force-dynamic';
import { NextRequest, NextResponse } from 'next/server';
import { z } from 'zod';
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

const updateItemSchema = z.object({ quantity: z.number().int().min(0) });

export async function PATCH(
  request: NextRequest,
  { params }: { params: { itemId: string } },
) {
  try {
    const user = requireAuth(request);
    const { quantity } = updateItemSchema.parse(await request.json());
    const cart = await getOrCreateCart(user.id);
    const item = await prisma.cartItem.findFirst({ where: { id: params.itemId, cartId: cart.id } });
    if (!item) return NextResponse.json({ error: 'Cart item not found' }, { status: 404 });

    if (quantity <= 0) {
      await prisma.cartItem.delete({ where: { id: params.itemId } });
    } else {
      await prisma.cartItem.update({ where: { id: params.itemId }, data: { quantity } });
    }
    return NextResponse.json(await getOrCreateCart(user.id));
  } catch (err) {
    if (err instanceof z.ZodError) return NextResponse.json({ error: 'Validation failed' }, { status: 400 });
    return handleError(err);
  }
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: { itemId: string } },
) {
  try {
    const user = requireAuth(request);
    const cart = await getOrCreateCart(user.id);
    const item = await prisma.cartItem.findFirst({ where: { id: params.itemId, cartId: cart.id } });
    if (!item) return NextResponse.json({ error: 'Cart item not found' }, { status: 404 });
    await prisma.cartItem.delete({ where: { id: params.itemId } });
    return NextResponse.json(await getOrCreateCart(user.id));
  } catch (err) {
    return handleError(err);
  }
}
