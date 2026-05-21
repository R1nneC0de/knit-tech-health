export const dynamic = 'force-dynamic';
import { NextRequest, NextResponse } from 'next/server';
import { requireRole, handleError } from '@/lib/api-auth';
import { prisma } from '@/lib/prisma';

export async function PATCH(
  request: NextRequest,
  { params }: { params: { id: string } },
) {
  try {
    requireRole(request, 'KTI_EMPLOYEE', 'ADMIN');
    const { status } = await request.json();
    const inquiry = await prisma.inquiryOrder.update({ where: { id: params.id }, data: { status } });
    return NextResponse.json(inquiry);
  } catch (err) {
    return handleError(err);
  }
}
