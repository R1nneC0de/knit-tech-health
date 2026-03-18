'use client';

import { useState } from 'react';
import { CheckCircle, Phone, Mail, MapPin, Clock } from 'lucide-react';
import { apiFetch } from '@/lib/api';

interface FormData {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  subject: string;
  message: string;
}

const initial: FormData = {
  firstName: '',
  lastName: '',
  email: '',
  phone: '',
  subject: '',
  message: '',
};

const contactInfo = [
  { icon: Phone, label: 'Phone', value: '(555) 123-4567' },
  { icon: Mail, label: 'Email', value: 'info@knittechhealth.com' },
  {
    icon: MapPin,
    label: 'Address',
    value: '123 Medical Drive, Suite 100\nAtlanta, GA 30301',
  },
  { icon: Clock, label: 'Hours', value: 'Mon-Fri: 8am - 6pm EST' },
];

export default function ContactPage() {
  const [form, setForm] = useState<FormData>(initial);
  const [errors, setErrors] = useState<Partial<FormData>>({});
  const [submitting, setSubmitting] = useState(false);
  const [success, setSuccess] = useState(false);
  const [serverError, setServerError] = useState('');

  function validate(): boolean {
    const e: Partial<FormData> = {};
    if (!form.firstName.trim()) e.firstName = 'Required';
    if (!form.lastName.trim()) e.lastName = 'Required';
    if (!form.email.trim() || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email))
      e.email = 'Valid email required';
    if (!form.subject.trim()) e.subject = 'Required';
    if (!form.message.trim()) e.message = 'Required';
    setErrors(e);
    return Object.keys(e).length === 0;
  }

  async function handleSubmit(ev: React.FormEvent) {
    ev.preventDefault();
    if (!validate()) return;

    setSubmitting(true);
    setServerError('');

    try {
      await apiFetch('/contact', {
        method: 'POST',
        body: JSON.stringify({
          ...form,
          phone: form.phone || undefined,
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

  function input(
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

  if (success) {
    return (
      <div className="mx-auto max-w-4xl px-4 py-20 text-center">
        <CheckCircle className="mx-auto h-16 w-16 text-green-500" />
        <h1 className="mt-6 font-heading text-3xl font-bold text-brand-blue-900">
          Message Sent!
        </h1>
        <p className="mt-4 text-lg text-gray-600">
          Thank you for reaching out. We&apos;ll get back to you shortly.
        </p>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
      <h1 className="font-heading text-3xl font-bold text-brand-blue-900">
        Contact Us
      </h1>
      <p className="mt-2 text-gray-600">
        Have a question? We&apos;d love to hear from you.
      </p>

      <div className="mt-8 grid gap-8 lg:grid-cols-5">
        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-4 lg:col-span-3">
          <div className="grid gap-4 sm:grid-cols-2">
            {input('firstName', 'First Name', true)}
            {input('lastName', 'Last Name', true)}
          </div>
          {input('email', 'Email Address', true, 'email')}
          {input('phone', 'Phone Number', false, 'tel')}
          {input('subject', 'Subject', true)}
          <div>
            <label className="block text-sm font-medium text-brand-blue-700">
              Message <span className="text-brand-pink-500">*</span>
            </label>
            <textarea
              rows={5}
              value={form.message}
              onChange={(e) => setForm({ ...form, message: e.target.value })}
              className="mt-1 block w-full rounded-lg border border-gray-200 px-3 py-2.5 text-sm focus:border-brand-blue-400 focus:outline-none focus:ring-2 focus:ring-brand-blue-100"
            />
            {errors.message && (
              <p className="mt-1 text-xs text-red-500">{errors.message}</p>
            )}
          </div>
          {serverError && (
            <p className="text-sm text-red-500">{serverError}</p>
          )}
          <button
            type="submit"
            disabled={submitting}
            className="w-full rounded-lg bg-brand-blue-700 px-8 py-3 font-semibold text-white transition hover:bg-brand-blue-800 disabled:opacity-50"
          >
            {submitting ? 'Sending...' : 'Send Message'}
          </button>
        </form>

        {/* Contact info */}
        <div className="space-y-4 lg:col-span-2">
          {contactInfo.map((item) => (
            <div
              key={item.label}
              className="rounded-xl border border-gray-100 bg-white p-5 shadow-sm"
            >
              <div className="flex items-start gap-3">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-brand-pink-50">
                  <item.icon className="h-5 w-5 text-brand-pink-500" />
                </div>
                <div>
                  <h3 className="font-heading text-sm font-semibold text-brand-blue-800">
                    {item.label}
                  </h3>
                  <p className="mt-1 whitespace-pre-line text-sm text-gray-600">
                    {item.value}
                  </p>
                </div>
              </div>
            </div>
          ))}

          {/* Map placeholder */}
          <div className="flex h-48 items-center justify-center rounded-xl border border-gray-100 bg-gray-50">
            <div className="text-center">
              <MapPin className="mx-auto h-8 w-8 text-gray-300" />
              <p className="mt-2 text-sm text-gray-400">Map placeholder</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
