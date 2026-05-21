export const dynamic = 'force-dynamic';
import { NextRequest, NextResponse } from 'next/server';
import { refreshAccessToken } from '@/lib/auth';

export async function POST(request: NextRequest) {
  try {
    const { refreshToken } = await request.json();
    if (!refreshToken) return NextResponse.json({ error: 'Refresh token required' }, { status: 400 });
    const result = await refreshAccessToken(refreshToken);
    return NextResponse.json(result);
  } catch {
    return NextResponse.json({ error: 'Invalid refresh token' }, { status: 401 });
  }
}
