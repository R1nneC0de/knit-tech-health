'use client';

import { useEffect, type ReactNode } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/contexts/AuthContext';
import type { UserRole } from '@kth/shared';

interface Props {
  children: ReactNode;
  allowedRoles: UserRole[];
  redirectTo?: string;
}

export default function RoleProtectedRoute({ children, allowedRoles, redirectTo = '/' }: Props) {
  const { user, isLoading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (isLoading) return;
    if (!user) {
      router.replace('/login');
    } else if (!allowedRoles.includes(user.role)) {
      router.replace(redirectTo);
    }
  }, [user, isLoading, router, allowedRoles, redirectTo]);

  if (isLoading) {
    return (
      <div className="flex min-h-[400px] items-center justify-center">
        <div className="h-8 w-8 animate-spin rounded-full border-4 border-brand-blue-200 border-t-brand-blue-700" />
      </div>
    );
  }

  if (!user || !allowedRoles.includes(user.role)) return null;

  return <>{children}</>;
}
