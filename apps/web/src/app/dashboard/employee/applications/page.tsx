'use client';

import { useState } from 'react';
import { Download } from 'lucide-react';
import { useAdminApplications, useUpdateApplicationStatus } from '@/hooks/useAdmin';
import { useAuth } from '@/contexts/AuthContext';

const STATUSES = ['PENDING', 'REVIEWING', 'INTERVIEWED', 'HIRED', 'REJECTED'];

const statusColors: Record<string, string> = {
  PENDING: 'bg-brand-orange-100 text-brand-orange-700',
  REVIEWING: 'bg-blue-100 text-blue-700',
  INTERVIEWED: 'bg-purple-100 text-purple-700',
  HIRED: 'bg-green-100 text-green-700',
  REJECTED: 'bg-gray-100 text-gray-500',
};

const API_BASE = process.env.NEXT_PUBLIC_API_URL || '/api';

export default function ApplicationsPage() {
  const [filter, setFilter] = useState('');
  const { data: applications, isLoading } = useAdminApplications(filter || undefined);
  const { mutate: updateStatus } = useUpdateApplicationStatus();
  const { accessToken } = useAuth();

  return (
    <div>
      <div className="flex flex-wrap items-center justify-between gap-4">
        <h1 className="font-heading text-2xl font-bold text-brand-blue-900">Job Applications</h1>
        <div className="flex flex-wrap gap-2">
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
      ) : !applications?.length ? (
        <p className="mt-12 text-center text-gray-400">No applications found.</p>
      ) : (
        <div className="mt-6 overflow-hidden rounded-xl border border-gray-100 bg-white shadow-sm">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-gray-100 bg-gray-50">
                <th className="px-4 py-3 text-left font-semibold text-gray-500">Applicant</th>
                <th className="px-4 py-3 text-left font-semibold text-gray-500">Position</th>
                <th className="px-4 py-3 text-left font-semibold text-gray-500">Phone</th>
                <th className="px-4 py-3 text-left font-semibold text-gray-500">Message</th>
                <th className="px-4 py-3 text-left font-semibold text-gray-500">Resume</th>
                <th className="px-4 py-3 text-left font-semibold text-gray-500">Date</th>
                <th className="px-4 py-3 text-left font-semibold text-gray-500">Status</th>
              </tr>
            </thead>
            <tbody>
              {applications.map((app) => {
                const resumeUrl = (app as any).resumeName
                  ? `${API_BASE}/job-applications/${app.id}/resume?token=${accessToken}`
                  : null;
                return (
                  <tr key={app.id} className="border-b border-gray-50 hover:bg-gray-50">
                    <td className="px-4 py-3 font-medium text-brand-blue-800">
                      {app.firstName} {app.lastName}
                      <br />
                      <span className="text-xs text-gray-400">{app.email}</span>
                    </td>
                    <td className="px-4 py-3 text-gray-700">{app.position}</td>
                    <td className="px-4 py-3 text-gray-600">{app.phone}</td>
                    <td className="max-w-xs px-4 py-3 text-gray-500">
                      <span className="line-clamp-2">{app.message ?? '—'}</span>
                    </td>
                    <td className="px-4 py-3">
                      {resumeUrl ? (
                        <a
                          href={resumeUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-1 rounded-lg bg-brand-blue-50 px-2.5 py-1 text-xs font-semibold text-brand-blue-700 hover:bg-brand-blue-100"
                        >
                          <Download className="h-3 w-3" />
                          {(app as any).resumeName}
                        </a>
                      ) : (
                        <span className="text-xs text-gray-400">—</span>
                      )}
                    </td>
                    <td className="px-4 py-3 text-gray-500">{new Date(app.createdAt).toLocaleDateString()}</td>
                    <td className="px-4 py-3">
                      <select
                        value={app.status}
                        onChange={(e) => updateStatus({ id: app.id, status: e.target.value })}
                        className={`rounded-full px-2 py-0.5 text-xs font-semibold border-0 cursor-pointer ${statusColors[app.status] ?? 'bg-gray-100 text-gray-600'}`}
                      >
                        {STATUSES.map((s) => <option key={s} value={s}>{s}</option>)}
                      </select>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
