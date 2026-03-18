import { prisma } from '../lib/prisma';
import {
  sendVendorOrderNotification,
  sendCustomerConfirmation,
} from './email.service';

export async function createOrder(data: {
  productId: string;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  organization?: string;
  message?: string;
}) {
  const order = await prisma.inquiryOrder.create({
    data,
    include: { product: true },
  });

  // Send emails (fire-and-forget, update flag on success)
  Promise.all([
    sendVendorOrderNotification(order),
    sendCustomerConfirmation(order),
  ])
    .then(async () => {
      await prisma.inquiryOrder.update({
        where: { id: order.id },
        data: { emailSent: true },
      });
    })
    .catch((err) => {
      console.error('[Email] Failed to send order emails:', err);
    });

  return order;
}
