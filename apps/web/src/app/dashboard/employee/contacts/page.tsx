'use client';

import { useState } from 'react';
import { useAdminContacts } from '@/hooks/useAdmin';

export default function ContactsPage() {
  const { data: contacts, isLoading } = useAdminContacts();
  const [expanded, setExpanded] = useState<string | null>(null);

  return (
    <div>
      <h1 className="font-heading text-2xl font-bold text-brand-blue-900">Contact Submissions</h1>

      {isLoading ? (
        <div className="mt-8 space-y-3">
          {[...Array(5)].map((_, i) => <div key={i} className="h-16 animate-pulse rounded-xl bg-gray-100" />)}
        </div>
      ) : !contacts?.length ? (
        <p className="mt-12 text-center text-gray-400">No contact submissions yet.</p>
      ) : (
        <div className="mt-6 space-y-3">
          {contacts.map((c) => (
            <div key={c.id} className="overflow-hidden rounded-xl border border-gray-100 bg-white shadow-sm">
              <button
                onClick={() => setExpanded(expanded === c.id ? null : c.id)}
                className="flex w-full items-center justify-between px-5 py-4 text-left"
              >
                <div>
                  <p className="font-semibold text-brand-blue-800">{c.firstName} {c.lastName}</p>
                  <p className="text-xs text-gray-400">{c.email} · {c.subject}</p>
                </div>
                <div className="flex items-center gap-4">
                  <span className="text-xs text-gray-400">{new Date(c.createdAt).toLocaleDateString()}</span>
                  <span className="text-gray-400">{expanded === c.id ? '▲' : '▼'}</span>
                </div>
              </button>
              {expanded === c.id && (
                <div className="border-t border-gray-100 px-5 py-4">
                  {c.phone && <p className="mb-2 text-sm text-gray-500">Phone: {c.phone}</p>}
                  <p className="text-sm text-gray-700 whitespace-pre-wrap">{c.message}</p>
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
