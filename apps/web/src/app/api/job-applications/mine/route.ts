export const dynamic = 'force-dynamic';
import { NextRequest, NextResponse } from 'next/server';
import { requireAuth, handleError } from '@/lib/api-auth';
import { prisma } from '@/lib/prisma';

export async function GET(request: NextRequest) {
  try {
    const user = requireAuth(request);
    const raw = await prisma.jobApplication.findMany({
      where: { userId: user.id },
      orderBy: { createdAt: 'desc' },
    });
    const applications = raw.map(({ resumeData: _r, ...rest }) => rest);
    return NextResponse.json(applications);
  } catch (err) {
    return handleError(err);
  }
}
