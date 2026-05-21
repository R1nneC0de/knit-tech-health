export const dynamic = 'force-dynamic';
import { NextRequest, NextResponse } from 'next/server';
import { requireRole, handleError } from '@/lib/api-auth';
import { prisma } from '@/lib/prisma';

export async function GET(request: NextRequest) {
  try {
    requireRole(request, 'KTI_EMPLOYEE', 'ADMIN');
    const [pendingInquiries, openOrders, newContacts, newApplications] = await Promise.all([
      prisma.inquiryOrder.count({ where: { status: 'PENDING' } }),
      prisma.order.count({ where: { status: { in: ['PENDING', 'PAID'] } } }),
      prisma.contactSubmission.count({ where: { emailSent: false } }),
      prisma.jobApplication.count({ where: { status: 'PENDING' } }),
    ]);
    return NextResponse.json({ pendingInquiries, openOrders, newContacts, newApplications });
  } catch (err) {
    return handleError(err);
  }
}
