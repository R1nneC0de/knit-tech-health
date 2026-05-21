'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { LayoutDashboard, FileText, ShoppingBag, Mail, Users } from 'lucide-react';
import RoleProtectedRoute from '@/components/auth/RoleProtectedRoute';

const nav = [
  { href: '/dashboard/employee', label: 'Overview', icon: LayoutDashboard },
  { href: '/dashboard/employee/inquiries', label: 'Quote Requests', icon: FileText },
  { href: '/dashboard/employee/orders', label: 'Orders', icon: ShoppingBag },
  { href: '/dashboard/employee/contacts', label: 'Contacts', icon: Mail },
  { href: '/dashboard/employee/applications', label: 'Job Applications', icon: Users },
];

export default function EmployeeDashboardLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();

  return (
    <RoleProtectedRoute allowedRoles={['KTI_EMPLOYEE', 'ADMIN']}>
      <div className="flex min-h-screen bg-gray-50">
        {/* Sidebar */}
        <aside className="hidden w-64 shrink-0 border-r border-gray-200 bg-white lg:block">
          <div className="sticky top-0 p-6">
            <p className="mb-1 text-xs font-semibold uppercase tracking-widest text-gray-400">KTI Employee Portal</p>
            <nav className="mt-4 space-y-1">
              {nav.map(({ href, label, icon: Icon }) => {
                const active = pathname === href;
                return (
                  <Link
                    key={href}
                    href={href}
                    className={`flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition ${
                      active
                        ? 'bg-brand-blue-700 text-white'
                        : 'text-gray-600 hover:bg-gray-100 hover:text-brand-blue-800'
                    }`}
                  >
                    <Icon className="h-4 w-4 shrink-0" />
                    {label}
                  </Link>
                );
              })}
            </nav>
          </div>
        </aside>

        {/* Mobile nav */}
        <div className="lg:hidden w-full border-b border-gray-200 bg-white px-4 py-3">
          <div className="flex gap-2 overflow-x-auto">
            {nav.map(({ href, label }) => {
              const active = pathname === href;
              return (
                <Link
                  key={href}
                  href={href}
                  className={`shrink-0 rounded-lg px-3 py-1.5 text-xs font-semibold transition ${
                    active ? 'bg-brand-blue-700 text-white' : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                  }`}
                >
                  {label}
                </Link>
              );
            })}
          </div>
        </div>

        {/* Main content */}
        <main className="flex-1 overflow-auto p-6 lg:p-8">{children}</main>
      </div>
    </RoleProtectedRoute>
  );
}
