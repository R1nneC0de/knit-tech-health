export const dynamic = 'force-dynamic';
import { NextRequest, NextResponse } from 'next/server';
import { z } from 'zod';
import { getUser, requireAuth, handleError } from '@/lib/api-auth';
import { prisma } from '@/lib/prisma';
import { sendVendorOrderNotification, sendCustomerConfirmation } from '@/lib/mailer';

const createOrderSchema = z.object({
  productId: z.string().min(1),
  firstName: z.string().min(1, 'First name is required'),
  lastName: z.string().min(1, 'Last name is required'),
  email: z.string().email('Valid email is required'),
  phone: z.string().min(1, 'Phone number is required'),
  organization: z.string().optional(),
  message: z.string().optional(),
});

export async function POST(request: NextRequest) {
  try {
    const body = createOrderSchema.parse(await request.json());
    const user = getUser(request);
    const order = await prisma.inquiryOrder.create({
      data: { ...body, userId: user?.id ?? null },
      include: { product: true },
    });

    Promise.all([sendVendorOrderNotification(order), sendCustomerConfirmation(order)])
      .then(async () => {
        await prisma.inquiryOrder.update({ where: { id: order.id }, data: { emailSent: true } });
      })
      .catch((err) => console.error('[Email] Failed to send order emails:', err));

    return NextResponse.json(order, { status: 201 });
  } catch (err) {
    if (err instanceof z.ZodError) return NextResponse.json({ error: 'Validation failed', details: err.errors }, { status: 400 });
    return handleError(err);
  }
}

export async function GET(request: NextRequest) {
  try {
    const user = requireAuth(request);
    const orders = await prisma.order.findMany({
      where: { userId: user.id },
      include: { items: { include: { product: { select: { name: true, slug: true, imageUrl: true } } } } },
      orderBy: { createdAt: 'desc' },
    });
    return NextResponse.json(orders);
  } catch (err) {
    return handleError(err);
  }
}
