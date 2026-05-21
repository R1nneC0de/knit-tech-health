'use client';

import { Suspense, useState } from 'react';
import { useSearchParams } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';
import { CheckCircle } from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';
import { authApiFetch, apiFetch } from '@/lib/api';

const POSITIONS = [
  'Registered Nurse (RN)',
  'Licensed Practical Nurse (LPN)',
  'Certified Nursing Assistant (CNA)',
  'Physical Therapist',
  'Occupational Therapist',
  'Medical Lab Technician',
  'Healthcare IT Specialist',
  'Other',
];

function ApplyForm() {
  const { user, accessToken } = useAuth();
  const searchParams = useSearchParams();
  const prefillPosition = searchParams.get('position') ?? '';

  const [form, setForm] = useState({
    firstName: user?.firstName ?? '',
    lastName: user?.lastName ?? '',
    email: user?.email ?? '',
    phone: '',
    position: prefillPosition,
    message: '',
  });
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState('');

  function update(field: string, value: string) {
    setForm((prev) => ({ ...prev, [field]: value }));
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError('');
    setLoading(true);
    try {
      const fetchFn = accessToken
        ? (path: string, init?: RequestInit) => authApiFetch(path, accessToken, init)
        : apiFetch;
      await fetchFn('/job-applications', {
        method: 'POST',
        body: JSON.stringify(form),
      });
      setSubmitted(true);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Submission failed. Please try again.');
    } finally {
      setLoading(false);
    }
  }

  const inputClass = 'mt-1 block w-full rounded-lg border border-gray-200 px-3 py-2.5 text-sm focus:border-brand-blue-400 focus:outline-none focus:ring-2 focus:ring-brand-blue-100';

  if (submitted) {
    return (
      <div className="flex min-h-[calc(100vh-4rem)] items-center justify-center px-4">
        <div className="max-w-md text-center">
          <CheckCircle className="mx-auto h-14 w-14 text-green-500" />
          <h1 className="mt-4 font-heading text-2xl font-bold text-brand-blue-900">Application Received!</h1>
          <p className="mt-2 text-gray-500">
            Thank you for applying to KnitTech Inc. Our staffing team will review your application and reach out within 2–3 business days.
          </p>
          <Link href="/staffing" className="mt-6 inline-block rounded-lg bg-brand-orange-500 px-6 py-3 font-semibold text-white hover:bg-brand-orange-600">
            Back to Staffing
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-2xl px-4 py-12 sm:px-6 lg:px-8">
      <div className="mb-8 flex items-center gap-4">
        <Image src="/logo.jpeg" alt="KnitTech Inc" width={60} height={24} className="object-contain" />
        <div>
          <h1 className="font-heading text-2xl font-bold text-brand-blue-900">Apply to Join KnitTech Inc</h1>
          <p className="text-sm text-gray-500">Healthcare staffing opportunities across the country</p>
        </div>
      </div>

      <div className="rounded-2xl border border-gray-100 bg-white p-8 shadow-sm">
        <form onSubmit={handleSubmit} className="space-y-5">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-brand-blue-700">First Name <span className="text-brand-orange-500">*</span></label>
              <input type="text" required value={form.firstName} onChange={(e) => update('firstName', e.target.value)} className={inputClass} />
            </div>
            <div>
              <label className="block text-sm font-medium text-brand-blue-700">Last Name <span className="text-brand-orange-500">*</span></label>
              <input type="text" required value={form.lastName} onChange={(e) => update('lastName', e.target.value)} className={inputClass} />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-brand-blue-700">Email <span className="text-brand-orange-500">*</span></label>
            <input type="email" required value={form.email} onChange={(e) => update('email', e.target.value)} className={inputClass} />
          </div>

          <div>
            <label className="block text-sm font-medium text-brand-blue-700">Phone <span className="text-brand-orange-500">*</span></label>
            <input type="tel" required value={form.phone} onChange={(e) => update('phone', e.target.value)} className={inputClass} placeholder="(555) 000-0000" />
          </div>

          <div>
            <label className="block text-sm font-medium text-brand-blue-700">Position Applying For <span className="text-brand-orange-500">*</span></label>
            <select required value={form.position} onChange={(e) => update('position', e.target.value)} className={inputClass}>
              <option value="">Select a position…</option>
              {POSITIONS.map((p) => <option key={p} value={p}>{p}</option>)}
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-brand-blue-700">Message / Cover Letter</label>
            <textarea
              rows={4}
              value={form.message}
              onChange={(e) => update('message', e.target.value)}
              className={inputClass}
              placeholder="Tell us about your experience and why you'd like to join KnitTech Inc…"
            />
          </div>

          {error && <p className="text-sm text-red-500">{error}</p>}

          <button
            type="submit"
            disabled={loading}
            className="w-full rounded-lg bg-brand-orange-500 px-6 py-3 font-semibold text-white transition hover:bg-brand-orange-600 disabled:opacity-50"
          >
            {loading ? 'Submitting…' : 'Submit Application'}
          </button>
        </form>
      </div>
    </div>
  );
}

export default function ApplyPage() {
  return (
    <Suspense fallback={<div className="flex min-h-[400px] items-center justify-center"><div className="h-8 w-8 animate-spin rounded-full border-4 border-brand-blue-200 border-t-brand-blue-700" /></div>}>
      <ApplyForm />
    </Suspense>
  );
}
