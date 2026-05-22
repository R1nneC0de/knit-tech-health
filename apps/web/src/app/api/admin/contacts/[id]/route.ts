export const dynamic = 'force-dynamic';
import { NextRequest, NextResponse } from 'next/server';
import { requireRole, handleError } from '@/lib/api-auth';
import { prisma } from '@/lib/prisma';

export async function PATCH(request: NextRequest, { params }: { params: { id: string } }) {
  try {
    requireRole(request, 'KTI_EMPLOYEE', 'ADMIN');
    const { responded } = await request.json() as { responded: boolean };
    const contact = await prisma.contactSubmission.update({
      where: { id: params.id },
      data: { emailSent: responded },
    });
    return NextResponse.json(contact);
  } catch (err) {
    return handleError(err);
  }
}
