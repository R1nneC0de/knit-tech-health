export const dynamic = 'force-dynamic';
import { NextRequest, NextResponse } from 'next/server';
import { verifyAccessToken } from '@/lib/auth';
import { handleError } from '@/lib/api-auth';
import { prisma } from '@/lib/prisma';

export async function GET(request: NextRequest, { params }: { params: { id: string } }) {
  try {
    // Accept token from Authorization header or query param (needed for direct download links)
    const headerToken = request.headers.get('authorization')?.slice(7);
    const queryToken = new URL(request.url).searchParams.get('token');
    const token = headerToken ?? queryToken;

    if (!token) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

    let payload;
    try {
      payload = verifyAccessToken(token);
    } catch {
      return NextResponse.json({ error: 'Invalid token' }, { status: 401 });
    }

    const app = await prisma.jobApplication.findUnique({
      where: { id: params.id },
      select: { resumeData: true, resumeName: true, resumeType: true, userId: true },
    });

    if (!app?.resumeData) {
      return NextResponse.json({ error: 'No resume found' }, { status: 404 });
    }

    const isAdmin = ['KTI_EMPLOYEE', 'ADMIN'].includes(payload.role);
    const isOwner = app.userId === payload.userId;
    if (!isAdmin && !isOwner) {
      return NextResponse.json({ error: 'Forbidden' }, { status: 403 });
    }

    return new NextResponse(new Uint8Array(app.resumeData), {
      headers: {
        'Content-Type': app.resumeType ?? 'application/octet-stream',
        'Content-Disposition': `attachment; filename="${app.resumeName ?? 'resume'}"`,
      },
    });
  } catch (err) {
    return handleError(err);
  }
}
