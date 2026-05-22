'use client';

import { useState } from 'react';
import { ChevronDown, ChevronUp } from 'lucide-react';
import { useAdminInquiries, useUpdateInquiryStatus } from '@/hooks/useAdmin';

const STATUSES = ['PENDING', 'CONTACTED', 'COMPLETED', 'CANCELLED'];

const statusColors: Record<string, string> = {
  PENDING: 'bg-brand-orange-100 text-brand-orange-700',
  CONTACTED: 'bg-blue-100 text-blue-700',
  COMPLETED: 'bg-green-100 text-green-700',
  CANCELLED: 'bg-gray-100 text-gray-500',
};

export default function InquiriesPage() {
  const [filter, setFilter] = useState('');
  const [expanded, setExpanded] = useState<string | null>(null);
  const { data: inquiries, isLoading } = useAdminInquiries(filter || undefined);
  const { mutate: updateStatus } = useUpdateInquiryStatus();

  return (
    <div>
      <div className="flex flex-wrap items-center justify-between gap-4">
        <h1 className="font-heading text-2xl font-bold text-brand-blue-900">Quote Requests</h1>
        <div className="flex gap-2">
          <button
            onClick={() => setFilter('')}
            className={`rounded-lg px-3 py-1.5 text-xs font-semibold ${filter === '' ? 'bg-brand-blue-700 text-white' : 'bg-gray-100 text-gray-600 hover:bg-gray-200'}`}
          >
            All
          </button>
          {STATUSES.map((s) => (
            <button
              key={s}
              onClick={() => setFilter(s)}
              className={`rounded-lg px-3 py-1.5 text-xs font-semibold ${filter === s ? 'bg-brand-blue-700 text-white' : 'bg-gray-100 text-gray-600 hover:bg-gray-200'}`}
            >
              {s}
            </button>
          ))}
        </div>
      </div>

      {isLoading ? (
        <div className="mt-8 space-y-3">
          {[...Array(5)].map((_, i) => <div key={i} className="h-16 animate-pulse rounded-xl bg-gray-100" />)}
        </div>
      ) : !inquiries?.length ? (
        <p className="mt-12 text-center text-gray-400">No quote requests found.</p>
      ) : (
        <div className="mt-6 overflow-hidden rounded-xl border border-gray-100 bg-white shadow-sm">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-gray-100 bg-gray-50">
                <th className="w-8 px-4 py-3" />
                <th className="px-4 py-3 text-left font-semibold text-gray-500">Product</th>
                <th className="px-4 py-3 text-left font-semibold text-gray-500">Requester</th>
                <th className="px-4 py-3 text-left font-semibold text-gray-500">Organization</th>
                <th className="px-4 py-3 text-left font-semibold text-gray-500">Date</th>
                <th className="px-4 py-3 text-left font-semibold text-gray-500">Status</th>
              </tr>
            </thead>
            <tbody>
              {inquiries.map((inq) => {
                const isExpanded = expanded === inq.id;
                return (
                  <>
                    <tr
                      key={inq.id}
                      className="border-b border-gray-50 hover:bg-gray-50 cursor-pointer"
                      onClick={() => setExpanded(isExpanded ? null : inq.id)}
                    >
                      <td className="px-4 py-3 text-gray-400">
                        {isExpanded ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />}
                      </td>
                      <td className="px-4 py-3 font-medium text-brand-blue-800">
                        {(inq.product as { name: string } | undefined)?.name ?? inq.productId}
                      </td>
                      <td className="px-4 py-3 text-gray-700">
                        {inq.firstName} {inq.lastName}
                        <br />
                        <span className="text-xs text-gray-400">{inq.email}</span>
                      </td>
                      <td className="px-4 py-3 text-gray-600">{inq.organization ?? '—'}</td>
                      <td className="px-4 py-3 text-gray-500">{new Date(inq.createdAt).toLocaleDateString()}</td>
                      <td className="px-4 py-3" onClick={(e) => e.stopPropagation()}>
                        <select
                          value={inq.status}
                          onChange={(e) => updateStatus({ id: inq.id, status: e.target.value })}
                          className={`rounded-full px-2 py-0.5 text-xs font-semibold border-0 cursor-pointer ${statusColors[inq.status] ?? 'bg-gray-100 text-gray-600'}`}
                        >
                          {STATUSES.map((s) => <option key={s} value={s}>{s}</option>)}
                        </select>
                      </td>
                    </tr>
                    {isExpanded && (
                      <tr key={`${inq.id}-detail`} className="bg-brand-blue-50 border-b border-gray-100">
                        <td />
                        <td colSpan={5} className="px-4 py-4">
                          <div className="grid gap-3 sm:grid-cols-2 text-sm">
                            <div>
                              <p className="text-xs font-semibold uppercase tracking-wide text-gray-400">Phone</p>
                              <p className="mt-0.5 text-gray-700">{inq.phone}</p>
                            </div>
                            <div>
                              <p className="text-xs font-semibold uppercase tracking-wide text-gray-400">Email</p>
                              <p className="mt-0.5 text-gray-700">{inq.email}</p>
                            </div>
                            {inq.message && (
                              <div className="sm:col-span-2">
                                <p className="text-xs font-semibold uppercase tracking-wide text-gray-400">Message</p>
                                <p className="mt-0.5 whitespace-pre-wrap text-gray-700">{inq.message}</p>
                              </div>
                            )}
                          </div>
                        </td>
                      </tr>
                    )}
                  </>
                );
              })}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
