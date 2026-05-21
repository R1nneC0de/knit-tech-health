export const dynamic = 'force-dynamic';
import { NextRequest, NextResponse } from 'next/server';
import { requireRole, handleError } from '@/lib/api-auth';
import { prisma } from '@/lib/prisma';

export async function GET(request: NextRequest) {
  try {
    requireRole(request, 'KTI_EMPLOYEE', 'ADMIN');
    const status = new URL(request.url).searchParams.get('status');
    const applications = await prisma.jobApplication.findMany({
      where: status ? { status } : undefined,
      orderBy: { createdAt: 'desc' },
    });
    return NextResponse.json(applications);
  } catch (err) {
    return handleError(err);
  }
}
