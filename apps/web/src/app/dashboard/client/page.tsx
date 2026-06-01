'use client';

import Link from 'next/link';
import { FileText, ShoppingBag } from 'lucide-react';
import { useMyQuotes, useMyOrders } from '@/hooks/useClientDashboard';
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

export default function ClientDashboardPage() {
  const { user } = useAuth();
  const { data: quotes, isLoading: loadingQuotes } = useMyQuotes();
  const { data: orders, isLoading: loadingOrders } = useMyOrders();

  return (
    <div>
      <h1 className="font-heading text-2xl font-bold text-brand-blue-900">
        Welcome back, {user?.firstName}
      </h1>
      <p className="mt-1 text-sm text-gray-500">Here&apos;s a summary of your activity with KnitTech Inc.</p>

      <div className="mt-8 grid gap-5 sm:grid-cols-2">
        <StatCard
          label="Quote Requests"
          value={loadingQuotes ? undefined : quotes?.length}
          href="/dashboard/client/quotes"
          icon={FileText}
          color="bg-brand-orange-500"
        />
        <StatCard
          label="Purchase Orders"
          value={loadingOrders ? undefined : orders?.length}
          href="/dashboard/client/orders"
          icon={ShoppingBag}
          color="bg-brand-blue-600"
        />
      </div>

      <div className="mt-10 rounded-xl border border-gray-100 bg-white p-6 shadow-sm">
        <h2 className="font-heading text-lg font-semibold text-brand-blue-800">Quick Actions</h2>
        <div className="mt-4 flex flex-wrap gap-3">
          <Link
            href="/shop-medical"
            className="rounded-lg bg-brand-orange-500 px-4 py-2 text-sm font-semibold text-white hover:bg-brand-orange-600"
          >
            Browse Medical Equipment
          </Link>
          <Link
            href="/staffing"
            className="rounded-lg bg-brand-blue-700 px-4 py-2 text-sm font-semibold text-white hover:bg-brand-blue-800"
          >
            View Staffing Services
          </Link>
          <Link
            href="/contact"
            className="rounded-lg border border-gray-200 px-4 py-2 text-sm font-semibold text-gray-600 hover:bg-gray-50"
          >
            Contact Us
          </Link>
        </div>
      </div>
    </div>
  );
}
