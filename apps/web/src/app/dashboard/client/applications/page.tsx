'use client';

import Link from 'next/link';
import { Briefcase, Paperclip } from 'lucide-react';
import { useMyApplications } from '@/hooks/useClientDashboard';
import { useAuth } from '@/contexts/AuthContext';

const statusColors: Record<string, string> = {
  PENDING: 'bg-brand-orange-100 text-brand-orange-700',
  REVIEWING: 'bg-blue-100 text-blue-700',
  INTERVIEWED: 'bg-purple-100 text-purple-700',
  HIRED: 'bg-green-100 text-green-700',
  REJECTED: 'bg-gray-100 text-gray-500',
};

const API_BASE = process.env.NEXT_PUBLIC_API_URL || '/api';

export default function MyApplicationsPage() {
  const { data: applications, isLoading } = useMyApplications();
  const { accessToken } = useAuth();

  return (
    <div>
      <h1 className="font-heading text-2xl font-bold text-brand-blue-900">My Applications</h1>
      <p className="mt-1 text-sm text-gray-500">Job applications you&apos;ve submitted to KnitTech Inc.</p>

      {isLoading ? (
        <div className="mt-8 space-y-3">
          {[...Array(4)].map((_, i) => <div key={i} className="h-16 animate-pulse rounded-xl bg-gray-100" />)}
        </div>
      ) : !applications?.length ? (
        <div className="mt-16 text-center">
          <Briefcase className="mx-auto h-14 w-14 text-gray-300" />
          <p className="mt-4 text-gray-500">No applications yet.</p>
          <Link
            href="/staffing"
            className="mt-6 inline-block rounded-lg bg-brand-blue-700 px-6 py-2.5 text-sm font-semibold text-white hover:bg-brand-blue-800"
          >
            View Open Positions
          </Link>
        </div>
      ) : (
        <div className="mt-6 overflow-hidden rounded-xl border border-gray-100 bg-white shadow-sm">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-gray-100 bg-gray-50">
                <th className="px-4 py-3 text-left font-semibold text-gray-500">Position</th>
                <th className="px-4 py-3 text-left font-semibold text-gray-500">Resume</th>
                <th className="px-4 py-3 text-left font-semibold text-gray-500">Date Applied</th>
                <th className="px-4 py-3 text-left font-semibold text-gray-500">Status</th>
              </tr>
            </thead>
            <tbody>
              {applications.map((app) => {
                const resumeUrl = (app as any).resumeName
                  ? `${API_BASE}/job-applications/${app.id}/resume?token=${accessToken}`
                  : null;
                return (
                  <tr key={app.id} className="border-b border-gray-50 last:border-0">
                    <td className="px-4 py-3 font-medium text-brand-blue-800">{app.position}</td>
                    <td className="px-4 py-3">
                      {resumeUrl ? (
                        <a
                          href={resumeUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-1 text-xs text-brand-blue-600 hover:underline"
                        >
                          <Paperclip className="h-3 w-3" />
                          {(app as any).resumeName}
                        </a>
                      ) : (
                        <span className="text-xs text-gray-400">Not uploaded</span>
                      )}
                    </td>
                    <td className="px-4 py-3 text-gray-500">{new Date(app.createdAt).toLocaleDateString()}</td>
                    <td className="px-4 py-3">
                      <span className={`rounded-full px-2.5 py-0.5 text-xs font-semibold ${statusColors[app.status] ?? 'bg-gray-100 text-gray-600'}`}>
                        {app.status}
                      </span>
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
