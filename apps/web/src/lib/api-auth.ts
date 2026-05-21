import { NextRequest, NextResponse } from 'next/server';
import { verifyAccessToken } from './auth';

interface ApiUser { id: string; email: string; role: string }
interface ApiError { status: number; message: string }

export function getUser(request: NextRequest): ApiUser | null {
  const header = request.headers.get('authorization');
  if (!header?.startsWith('Bearer ')) return null;
  try {
    const payload = verifyAccessToken(header.slice(7));
    return { id: payload.userId, email: payload.email, role: payload.role };
  } catch {
    return null;
  }
}

export function requireAuth(request: NextRequest): ApiUser {
  const user = getUser(request);
  if (!user) throw { status: 401, message: 'Unauthorized' } satisfies ApiError;
  return user;
}

export function requireRole(request: NextRequest, ...roles: string[]): ApiUser {
  const user = requireAuth(request);
  if (!roles.includes(user.role)) throw { status: 403, message: 'Forbidden' } satisfies ApiError;
  return user;
}

export function handleError(err: unknown): NextResponse {
  if (err && typeof err === 'object' && 'status' in err) {
    const e = err as ApiError;
    return NextResponse.json({ error: e.message }, { status: e.status });
  }
  const msg = err instanceof Error ? err.message : 'Internal server error';
  return NextResponse.json({ error: msg }, { status: 500 });
}
