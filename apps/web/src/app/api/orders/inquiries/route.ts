export const dynamic = 'force-dynamic';
import { NextRequest, NextResponse } from 'next/server';
import { requireAuth, handleError } from '@/lib/api-auth';
import { prisma } from '@/lib/prisma';

export async function GET(request: NextRequest) {
  try {
    const user = requireAuth(request);
    const inquiries = await prisma.inquiryOrder.findMany({
      where: { userId: user.id },
      include: { product: { select: { name: true, imageUrl: true, slug: true } } },
      orderBy: { createdAt: 'desc' },
    });
    return NextResponse.json(inquiries);
  } catch (err) {
    return handleError(err);
  }
}
