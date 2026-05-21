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
    const order = await prisma.order.update({ where: { id: params.id }, data: { status } });
    return NextResponse.json(order);
  } catch (err) {
    return handleError(err);
  }
}
