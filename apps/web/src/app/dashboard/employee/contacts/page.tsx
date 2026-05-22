'use client';

import { useState } from 'react';
import { CheckCircle } from 'lucide-react';
import { useAdminContacts } from '@/hooks/useAdmin';
import { useMarkContactResponded } from '@/hooks/useAdmin';

export default function ContactsPage() {
  const { data: contacts, isLoading } = useAdminContacts();
  const [expanded, setExpanded] = useState<string | null>(null);
  const { mutate: markResponded } = useMarkContactResponded();

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
                <div className="flex items-center gap-3">
                  {c.emailSent && (
                    <CheckCircle className="h-4 w-4 shrink-0 text-green-500" />
                  )}
                  <div>
                    <p className="font-semibold text-brand-blue-800">{c.firstName} {c.lastName}</p>
                    <p className="text-xs text-gray-400">{c.email} · {c.subject}</p>
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  {c.emailSent ? (
                    <span className="rounded-full bg-green-100 px-2.5 py-0.5 text-xs font-semibold text-green-700">
                      Responded
                    </span>
                  ) : (
                    <span className="rounded-full bg-brand-orange-100 px-2.5 py-0.5 text-xs font-semibold text-brand-orange-700">
                      New
                    </span>
                  )}
                  <span className="text-xs text-gray-400">{new Date(c.createdAt).toLocaleDateString()}</span>
                  <span className="text-gray-400">{expanded === c.id ? '▲' : '▼'}</span>
                </div>
              </button>
              {expanded === c.id && (
                <div className="border-t border-gray-100 px-5 py-4">
                  {c.phone && <p className="mb-2 text-sm text-gray-500">Phone: {c.phone}</p>}
                  <p className="text-sm text-gray-700 whitespace-pre-wrap">{c.message}</p>
                  <div className="mt-4 flex justify-end">
                    <button
                      onClick={() => markResponded({ id: c.id, responded: !c.emailSent })}
                      className={`rounded-lg px-4 py-2 text-xs font-semibold transition ${
                        c.emailSent
                          ? 'bg-gray-100 text-gray-500 hover:bg-gray-200'
                          : 'bg-green-600 text-white hover:bg-green-700'
                      }`}
                    >
                      {c.emailSent ? 'Mark as Unresponded' : 'Mark as Responded'}
                    </button>
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
