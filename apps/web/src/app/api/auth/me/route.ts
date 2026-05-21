export const dynamic = 'force-dynamic';
import { NextRequest, NextResponse } from 'next/server';
import { requireAuth, handleError } from '@/lib/api-auth';
import { prisma } from '@/lib/prisma';

export async function GET(request: NextRequest) {
  try {
    const authUser = requireAuth(request);
    const user = await prisma.user.findUnique({
      where: { id: authUser.id },
      select: { id: true, email: true, firstName: true, lastName: true, phone: true, role: true },
    });
    if (!user) return NextResponse.json({ error: 'User not found' }, { status: 404 });
    return NextResponse.json(user);
  } catch (err) {
    return handleError(err);
  }
}
