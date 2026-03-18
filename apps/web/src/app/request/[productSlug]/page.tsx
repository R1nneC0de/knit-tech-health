'use client';

import { useParams } from 'next/navigation';
import { useState } from 'react';
import Link from 'next/link';
import { CheckCircle, Package } from 'lucide-react';
import { useProduct } from '@/hooks/useProducts';
import { apiFetch } from '@/lib/api';
import ProductImage from '@/components/ui/ProductImage';

interface FormData {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  organization: string;
  message: string;
}

const initial: FormData = {
  firstName: '',
  lastName: '',
  email: '',
  phone: '',
  organization: '',
  message: '',
};

export default function RequestPage() {
  const { productSlug } = useParams<{ productSlug: string }>();
  const { data: product, isLoading } = useProduct(productSlug);
  const [form, setForm] = useState<FormData>(initial);
  const [errors, setErrors] = useState<Partial<FormData>>({});
  const [submitting, setSubmitting] = useState(false);
  const [success, setSuccess] = useState(false);
  const [serverError, setServerError] = useState('');

  function validate(): boolean {
    const e: Partial<FormData> = {};
    if (!form.firstName.trim()) e.firstName = 'First name is required';
    if (!form.lastName.trim()) e.lastName = 'Last name is required';
    if (!form.email.trim() || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email))
      e.email = 'Valid email is required';
    if (!form.phone.trim()) e.phone = 'Phone number is required';
    setErrors(e);
    return Object.keys(e).length === 0;
  }

  async function handleSubmit(ev: React.FormEvent) {
    ev.preventDefault();
    if (!validate() || !product) return;

    setSubmitting(true);
    setServerError('');

    try {
      await apiFetch('/orders', {
        method: 'POST',
        body: JSON.stringify({
          productId: product.id,
          firstName: form.firstName,
          lastName: form.lastName,
          email: form.email,
          phone: form.phone,
          organization: form.organization || undefined,
          message: form.message || undefined,
        }),
      });
      setSuccess(true);
    } catch (err) {
      setServerError(
        err instanceof Error ? err.message : 'Something went wrong',
      );
    } finally {
      setSubmitting(false);
    }
  }

  function field(
    name: keyof FormData,
    label: string,
    required = false,
    type = 'text',
  ) {
    return (
      <div>
        <label className="block text-sm font-medium text-brand-blue-700">
          {label}
          {required && <span className="text-brand-pink-500"> *</span>}
        </label>
        <input
          type={type}
          value={form[name]}
          onChange={(e) => setForm({ ...form, [name]: e.target.value })}
          className="mt-1 block w-full rounded-lg border border-gray-200 px-3 py-2.5 text-sm focus:border-brand-blue-400 focus:outline-none focus:ring-2 focus:ring-brand-blue-100"
        />
        {errors[name] && (
          <p className="mt-1 text-xs text-red-500">{errors[name]}</p>
        )}
      </div>
    );
  }

  if (isLoading) {
    return (
      <div className="mx-auto max-w-4xl px-4 py-12">
        <div className="h-8 w-64 animate-pulse rounded bg-gray-200" />
      </div>
    );
  }

  if (!product) {
    return (
      <div className="mx-auto max-w-4xl px-4 py-16 text-center">
        <h1 className="font-heading text-2xl font-bold text-brand-blue-900">
          Product Not Found
        </h1>
        <Link
          href="/shop"
          className="mt-4 inline-block text-brand-blue-700 underline"
        >
          Back to Shop
        </Link>
      </div>
    );
  }

  if (success) {
    return (
      <div className="mx-auto max-w-4xl px-4 py-20 text-center">
        <CheckCircle className="mx-auto h-16 w-16 text-green-500" />
        <h1 className="mt-6 font-heading text-3xl font-bold text-brand-blue-900">
          Thank You!
        </h1>
        <p className="mt-4 text-lg text-gray-600">
          We&apos;ve received your request for{' '}
          <strong>{product.name}</strong>. Our team will reach out within{' '}
          <strong>24 hours</strong>.
        </p>
        <Link
          href="/shop"
          className="mt-8 inline-block rounded-lg bg-brand-blue-700 px-8 py-3 font-semibold text-white"
        >
          Continue Browsing
        </Link>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-4xl px-4 py-8 sm:px-6 lg:px-8">
      <h1 className="font-heading text-3xl font-bold text-brand-blue-900">
        Request Equipment
      </h1>
      <p className="mt-2 text-gray-600">
        Fill out the form below and our team will contact you with pricing and
        availability.
      </p>

      <div className="mt-8 grid gap-8 lg:grid-cols-5">
        {/* Product info */}
        <div className="lg:col-span-2">
          <div className="rounded-xl border border-gray-100 bg-white p-4 shadow-sm">
            <div className="aspect-[4/3] overflow-hidden rounded-lg bg-gray-100">
              <ProductImage
                slug={product.slug}
                name={product.name}
                className="h-full w-full object-cover"
              />
            </div>
            <div className="mt-4">
              {product.category && (
                <span className="rounded-full bg-brand-pink-50 px-3 py-0.5 text-xs font-medium text-brand-pink-600">
                  {product.category.name}
                </span>
              )}
              <h2 className="mt-2 font-heading text-lg font-semibold text-brand-blue-800">
                {product.name}
              </h2>
              <p className="mt-1 text-sm text-gray-500">
                {product.description}
              </p>
            </div>
          </div>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-4 lg:col-span-3">
          <div className="grid gap-4 sm:grid-cols-2">
            {field('firstName', 'First Name', true)}
            {field('lastName', 'Last Name', true)}
          </div>
          {field('email', 'Email Address', true, 'email')}
          {field('phone', 'Phone Number', true, 'tel')}
          {field('organization', 'Organization')}
          <div>
            <label className="block text-sm font-medium text-brand-blue-700">
              Message
            </label>
            <textarea
              rows={4}
              value={form.message}
              onChange={(e) => setForm({ ...form, message: e.target.value })}
              className="mt-1 block w-full rounded-lg border border-gray-200 px-3 py-2.5 text-sm focus:border-brand-blue-400 focus:outline-none focus:ring-2 focus:ring-brand-blue-100"
              placeholder="Any specific requirements or questions..."
            />
          </div>
          {serverError && (
            <p className="text-sm text-red-500">{serverError}</p>
          )}
          <button
            type="submit"
            disabled={submitting}
            className="w-full rounded-lg bg-brand-pink-500 px-8 py-3 font-semibold text-white transition hover:bg-brand-pink-600 disabled:opacity-50"
          >
            {submitting ? 'Submitting...' : 'Submit Request'}
          </button>
        </form>
      </div>
    </div>
  );
}
