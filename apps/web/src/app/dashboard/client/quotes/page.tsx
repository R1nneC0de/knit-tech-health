'use client';

import Link from 'next/link';
import { FileText } from 'lucide-react';
import { useMyQuotes } from '@/hooks/useClientDashboard';

const statusColors: Record<string, string> = {
  PENDING: 'bg-brand-orange-100 text-brand-orange-700',
  CONTACTED: 'bg-blue-100 text-blue-700',
  COMPLETED: 'bg-green-100 text-green-700',
  CANCELLED: 'bg-gray-100 text-gray-500',
};

export default function MyQuotesPage() {
  const { data: quotes, isLoading } = useMyQuotes();

  return (
    <div>
      <h1 className="font-heading text-2xl font-bold text-brand-blue-900">My Quote Requests</h1>
      <p className="mt-1 text-sm text-gray-500">Equipment inquiries you&apos;ve submitted to KnitTech Inc.</p>

      {isLoading ? (
        <div className="mt-8 space-y-3">
          {[...Array(4)].map((_, i) => <div key={i} className="h-16 animate-pulse rounded-xl bg-gray-100" />)}
        </div>
      ) : !quotes?.length ? (
        <div className="mt-16 text-center">
          <FileText className="mx-auto h-14 w-14 text-gray-300" />
          <p className="mt-4 text-gray-500">No quote requests yet.</p>
          <Link
            href="/shop-medical"
            className="mt-6 inline-block rounded-lg bg-brand-blue-700 px-6 py-2.5 text-sm font-semibold text-white hover:bg-brand-blue-800"
          >
            Browse Equipment
          </Link>
        </div>
      ) : (
        <div className="mt-6 overflow-hidden rounded-xl border border-gray-100 bg-white shadow-sm">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-gray-100 bg-gray-50">
                <th className="px-4 py-3 text-left font-semibold text-gray-500">Ref #</th>
                <th className="px-4 py-3 text-left font-semibold text-gray-500">Product</th>
                <th className="px-4 py-3 text-left font-semibold text-gray-500">Organization</th>
                <th className="px-4 py-3 text-left font-semibold text-gray-500">Date</th>
                <th className="px-4 py-3 text-left font-semibold text-gray-500">Status</th>
              </tr>
            </thead>
            <tbody>
              {quotes.map((q) => (
                <tr key={q.id} className="border-b border-gray-50 last:border-0">
                  <td className="px-4 py-3 font-mono text-xs text-gray-500">
                    #{q.orderNumber}
                  </td>
                  <td className="px-4 py-3 font-medium text-brand-blue-800">
                    {(q.product as { name: string } | undefined)?.name ?? q.productId}
                  </td>
                  <td className="px-4 py-3 text-gray-600">{q.organization ?? '—'}</td>
                  <td className="px-4 py-3 text-gray-500">{new Date(q.createdAt).toLocaleDateString()}</td>
                  <td className="px-4 py-3">
                    <span className={`rounded-full px-2.5 py-0.5 text-xs font-semibold ${statusColors[q.status] ?? 'bg-gray-100 text-gray-600'}`}>
                      {q.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
