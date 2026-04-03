'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { Heart } from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';

export default function RegisterPage() {
  const router = useRouter();
  const { register } = useAuth();
  const [form, setForm] = useState({ firstName: '', lastName: '', email: '', phone: '', password: '', confirmPassword: '' });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  function update(field: string, value: string) {
    setForm((prev) => ({ ...prev, [field]: value }));
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError('');
    if (form.password !== form.confirmPassword) {
      setError('Passwords do not match');
      return;
    }
    if (form.password.length < 8) {
      setError('Password must be at least 8 characters');
      return;
    }
    setLoading(true);
    try {
      await register({
        email: form.email,
        password: form.password,
        firstName: form.firstName,
        lastName: form.lastName,
        phone: form.phone || undefined,
      });
      router.replace('/shop-medical');
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Registration failed');
    } finally {
      setLoading(false);
    }
  }

  const inputClass = 'mt-1 block w-full rounded-lg border border-gray-200 px-3 py-2.5 text-sm focus:border-brand-blue-400 focus:outline-none focus:ring-2 focus:ring-brand-blue-100';

  return (
    <div className="flex min-h-[calc(100vh-4rem)] items-center justify-center bg-gradient-to-br from-brand-pink-50 via-white to-brand-blue-50 px-4 py-12">
      <div className="w-full max-w-md rounded-2xl border border-gray-100 bg-white p-8 shadow-md">
        <div className="mb-8 flex flex-col items-center">
          <Heart className="h-10 w-10 text-brand-pink-500" />
          <h1 className="mt-4 font-heading text-2xl font-bold text-brand-blue-900">Create an account</h1>
          <p className="mt-1 text-sm text-gray-500">Join Knit Tech Health to shop and track orders</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-brand-blue-700">First Name <span className="text-brand-pink-500">*</span></label>
              <input type="text" required value={form.firstName} onChange={(e) => update('firstName', e.target.value)} className={inputClass} />
            </div>
            <div>
              <label className="block text-sm font-medium text-brand-blue-700">Last Name <span className="text-brand-pink-500">*</span></label>
              <input type="text" required value={form.lastName} onChange={(e) => update('lastName', e.target.value)} className={inputClass} />
            </div>
          </div>
          <div>
            <label className="block text-sm font-medium text-brand-blue-700">Email <span className="text-brand-pink-500">*</span></label>
            <input type="email" required value={form.email} onChange={(e) => update('email', e.target.value)} className={inputClass} placeholder="you@example.com" />
          </div>
          <div>
            <label className="block text-sm font-medium text-brand-blue-700">Phone</label>
            <input type="tel" value={form.phone} onChange={(e) => update('phone', e.target.value)} className={inputClass} placeholder="(555) 000-0000" />
          </div>
          <div>
            <label className="block text-sm font-medium text-brand-blue-700">Password <span className="text-brand-pink-500">*</span></label>
            <input type="password" required value={form.password} onChange={(e) => update('password', e.target.value)} className={inputClass} placeholder="Min. 8 characters" />
          </div>
          <div>
            <label className="block text-sm font-medium text-brand-blue-700">Confirm Password <span className="text-brand-pink-500">*</span></label>
            <input type="password" required value={form.confirmPassword} onChange={(e) => update('confirmPassword', e.target.value)} className={inputClass} placeholder="••••••••" />
          </div>

          {error && <p className="text-sm text-red-500">{error}</p>}

          <button
            type="submit"
            disabled={loading}
            className="w-full rounded-lg bg-brand-blue-700 px-6 py-3 font-semibold text-white transition hover:bg-brand-blue-800 disabled:opacity-50"
          >
            {loading ? 'Creating account...' : 'Create Account'}
          </button>
        </form>

        <p className="mt-6 text-center text-sm text-gray-500">
          Already have an account?{' '}
          <Link href="/login" className="font-semibold text-brand-pink-500 hover:text-brand-pink-600">
            Sign in
          </Link>
        </p>
      </div>
    </div>
  );
}
