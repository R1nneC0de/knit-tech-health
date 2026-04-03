import { prisma } from '../lib/prisma';

export async function getOrCreateCart(userId: string) {
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

export async function addToCart(userId: string, productId: string, quantity: number) {
  const cart = await getOrCreateCart(userId);

  const existing = await prisma.cartItem.findUnique({
    where: { cartId_productId: { cartId: cart.id, productId } },
  });

  if (existing) {
    await prisma.cartItem.update({
      where: { id: existing.id },
      data: { quantity: existing.quantity + quantity },
    });
  } else {
    await prisma.cartItem.create({
      data: { cartId: cart.id, productId, quantity },
    });
  }

  return getOrCreateCart(userId);
}

export async function updateCartItem(userId: string, itemId: string, quantity: number) {
  const cart = await getOrCreateCart(userId);
  const item = await prisma.cartItem.findFirst({ where: { id: itemId, cartId: cart.id } });
  if (!item) throw new Error('Cart item not found');

  if (quantity <= 0) {
    await prisma.cartItem.delete({ where: { id: itemId } });
  } else {
    await prisma.cartItem.update({ where: { id: itemId }, data: { quantity } });
  }
  return getOrCreateCart(userId);
}

export async function removeCartItem(userId: string, itemId: string) {
  const cart = await getOrCreateCart(userId);
  const item = await prisma.cartItem.findFirst({ where: { id: itemId, cartId: cart.id } });
  if (!item) throw new Error('Cart item not found');
  await prisma.cartItem.delete({ where: { id: itemId } });
  return getOrCreateCart(userId);
}

export async function clearCart(userId: string) {
  const cart = await getOrCreateCart(userId);
  await prisma.cartItem.deleteMany({ where: { cartId: cart.id } });
}

export async function getCartTotal(userId: string) {
  const cart = await getOrCreateCart(userId);
  let subtotal = 0;
  for (const item of cart.items) {
    subtotal += Number(item.product.price) * item.quantity;
  }
  return { subtotal, cart };
}
