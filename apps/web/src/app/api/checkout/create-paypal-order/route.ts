export const dynamic = 'force-dynamic';
import { NextRequest, NextResponse } from 'next/server';
import { requireAuth, handleError } from '@/lib/api-auth';
import { prisma } from '@/lib/prisma';
import { paypalClient, paypal } from '@/lib/paypal';

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

    const ppRequest = new paypal.orders.OrdersCreateRequest();
    ppRequest.prefer('return=representation');
    ppRequest.requestBody({
      intent: 'CAPTURE',
      purchase_units: [
        {
          amount: {
            currency_code: 'USD',
            value: total.toFixed(2),
            breakdown: {
              item_total: { currency_code: 'USD', value: subtotal.toFixed(2) },
              tax_total: { currency_code: 'USD', value: tax.toFixed(2) },
            },
          },
          items: cart.items.map((item) => ({
            name: item.product.name,
            unit_amount: { currency_code: 'USD', value: Number(item.product.price).toFixed(2) },
            quantity: String(item.quantity),
          })),
        },
      ],
    });

    const response = await paypalClient().execute(ppRequest);
    return NextResponse.json({ orderId: response.result.id, subtotal, tax, total });
  } catch (err) {
    return handleError(err);
  }
}
