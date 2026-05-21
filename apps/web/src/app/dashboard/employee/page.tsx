'use client';

import Link from 'next/link';
import { FileText, ShoppingBag, Mail, Users } from 'lucide-react';
import { useAdminStats } from '@/hooks/useAdmin';
import { useAuth } from '@/contexts/AuthContext';

function StatCard({ label, value, href, icon: Icon, color }: {
  label: string;
  value: number | undefined;
  href: string;
  icon: React.ElementType;
  color: string;
}) {
  return (
    <Link href={href} className="flex items-center gap-4 rounded-xl border border-gray-100 bg-white p-5 shadow-sm transition hover:shadow-md">
      <div className={`flex h-12 w-12 items-center justify-center rounded-lg ${color}`}>
        <Icon className="h-6 w-6 text-white" />
      </div>
      <div>
        <p className="text-2xl font-bold text-brand-blue-900">{value ?? '—'}</p>
        <p className="text-sm text-gray-500">{label}</p>
      </div>
    </Link>
  );
}

export default function EmployeeDashboardPage() {
  const { user } = useAuth();
  const { data: stats, isLoading } = useAdminStats();

  return (
    <div>
      <h1 className="font-heading text-2xl font-bold text-brand-blue-900">
        Welcome back, {user?.firstName}
      </h1>
      <p className="mt-1 text-sm text-gray-500">Here&apos;s a snapshot of what needs your attention.</p>

      <div className="mt-8 grid gap-5 sm:grid-cols-2 xl:grid-cols-4">
        <StatCard
          label="Pending Quote Requests"
          value={isLoading ? undefined : stats?.pendingInquiries}
          href="/dashboard/employee/inquiries"
          icon={FileText}
          color="bg-brand-orange-500"
        />
        <StatCard
          label="Open Orders"
          value={isLoading ? undefined : stats?.openOrders}
          href="/dashboard/employee/orders"
          icon={ShoppingBag}
          color="bg-brand-blue-600"
        />
        <StatCard
          label="Unread Contacts"
          value={isLoading ? undefined : stats?.newContacts}
          href="/dashboard/employee/contacts"
          icon={Mail}
          color="bg-brand-blue-400"
        />
        <StatCard
          label="New Applications"
          value={isLoading ? undefined : stats?.newApplications}
          href="/dashboard/employee/applications"
          icon={Users}
          color="bg-brand-orange-600"
        />
      </div>

      <div className="mt-10 rounded-xl border border-gray-100 bg-white p-6 shadow-sm">
        <h2 className="font-heading text-lg font-semibold text-brand-blue-800">Quick Actions</h2>
        <div className="mt-4 flex flex-wrap gap-3">
          <Link href="/dashboard/employee/inquiries?status=PENDING" className="rounded-lg bg-brand-orange-500 px-4 py-2 text-sm font-semibold text-white hover:bg-brand-orange-600">
            Review Pending Quotes
          </Link>
          <Link href="/dashboard/employee/applications?status=PENDING" className="rounded-lg bg-brand-blue-700 px-4 py-2 text-sm font-semibold text-white hover:bg-brand-blue-800">
            Review Applications
          </Link>
          <Link href="/shop-medical" className="rounded-lg border border-gray-200 px-4 py-2 text-sm font-semibold text-gray-600 hover:bg-gray-50">
            View Shop
          </Link>
        </div>
      </div>
    </div>
  );
}
