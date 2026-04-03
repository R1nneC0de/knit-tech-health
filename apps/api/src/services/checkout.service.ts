import { Prisma } from '@prisma/client';
import { prisma } from '../lib/prisma';
import { stripe } from '../lib/stripe';
import { paypalClient, paypal } from '../lib/paypal';
import { getCartTotal, clearCart } from './cart.service';

const TAX_RATE = 0.07;

export async function createStripePaymentIntent(userId: string) {
  const { subtotal, cart } = await getCartTotal(userId);
  if (cart.items.length === 0) throw new Error('Cart is empty');

  const tax = subtotal * TAX_RATE;
  const total = subtotal + tax;
  const amountCents = Math.round(total * 100);

  const paymentIntent = await stripe.paymentIntents.create({
    amount: amountCents,
    currency: 'usd',
    metadata: { userId, cartId: cart.id },
  });

  return {
    clientSecret: paymentIntent.client_secret,
    paymentIntentId: paymentIntent.id,
    subtotal,
    tax,
    total,
  };
}

export async function createPayPalOrder(userId: string) {
  const { subtotal, cart } = await getCartTotal(userId);
  if (cart.items.length === 0) throw new Error('Cart is empty');

  const tax = subtotal * TAX_RATE;
  const total = subtotal + tax;

  const request = new paypal.orders.OrdersCreateRequest();
  request.prefer('return=representation');
  request.requestBody({
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

  const response = await paypalClient().execute(request);
  return {
    orderId: response.result.id,
    subtotal,
    tax,
    total,
  };
}

export async function confirmOrder(
  userId: string,
  paymentMethod: string,
  paymentId: string,
  shippingAddress?: object
) {
  const { subtotal, cart } = await getCartTotal(userId);
  if (cart.items.length === 0) throw new Error('Cart is empty');

  const tax = subtotal * TAX_RATE;
  const total = subtotal + tax;

  const order = await prisma.order.create({
    data: {
      userId,
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

  await clearCart(userId);
  return order;
}
