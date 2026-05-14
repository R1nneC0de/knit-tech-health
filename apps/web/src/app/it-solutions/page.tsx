import Link from 'next/link';
import { Network, Cloud, ShieldCheck, Monitor, CheckCircle } from 'lucide-react';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'IT Solutions — KTI Health',
  description:
    'Enterprise IT solutions for healthcare organizations. HIPAA-compliant infrastructure, cloud services, cybersecurity, and EHR integration from KTI Health.',
};

const services = [
  {
    icon: Network,
    title: 'Network Infrastructure',
    description:
      'Reliable, high-performance network design and deployment built for the demands of modern healthcare environments — clinical floors, admin offices, and everything in between.',
  },
  {
    icon: Cloud,
    title: 'Cloud Solutions',
    description:
      'Migrate workloads, data, and applications to secure, scalable cloud platforms. We design, migrate, and manage cloud environments tailored for healthcare compliance.',
  },
  {
    icon: ShieldCheck,
    title: 'Cybersecurity',
    description:
      'HIPAA-compliant security frameworks, vulnerability assessments, endpoint protection, and incident response — protecting patient data and operational continuity.',
  },
  {
    icon: Monitor,
    title: 'Healthcare IT & EHR',
    description:
      'EHR/EMR integration, clinical system support, and healthcare IT consulting. We speak both technology and clinical workflows.',
  },
];

const highlights = [
  'HIPAA-compliant architecture and documentation',
  '24/7 monitoring and infrastructure support',
  'Custom integration with existing clinical systems',
  'Staff training and change management support',
  'Disaster recovery and business continuity planning',
  'Scalable solutions for single-site and multi-facility organizations',
];

export default function ITSolutionsPage() {
  return (
    <>
      {/* Hero */}
      <section className="bg-gradient-to-br from-brand-blue-50 via-white to-brand-pink-50 py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl">
            <span className="inline-block rounded-full bg-brand-blue-100 px-4 py-1 text-sm font-semibold text-brand-blue-700">
              IT Solutions Division
            </span>
            <h1 className="mt-4 font-heading text-4xl font-bold text-brand-blue-900 sm:text-5xl">
              Enterprise IT Solutions{' '}
              <span className="text-brand-pink-500">for Healthcare</span>
            </h1>
            <p className="mt-6 text-lg leading-relaxed text-brand-blue-600">
              From network infrastructure to cybersecurity and EHR integration —
              KTI Health delivers modern, HIPAA-compliant technology that keeps
              healthcare organizations connected, secure, and efficient.
            </p>
            <div className="mt-8 flex flex-wrap gap-4">
              <Link
                href="/contact"
                className="rounded-lg bg-brand-blue-700 px-8 py-3 font-semibold text-white transition hover:bg-brand-blue-800"
              >
                Get a Consultation
              </Link>
              <Link
                href="/contact"
                className="rounded-lg border-2 border-brand-blue-700 px-8 py-3 font-semibold text-brand-blue-700 transition hover:bg-brand-blue-50"
              >
                Learn More
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Services */}
      <section className="bg-white py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h2 className="font-heading text-3xl font-bold text-brand-blue-900">
              Our IT Services
            </h2>
            <p className="mx-auto mt-4 max-w-2xl text-lg text-gray-600">
              Comprehensive technology services designed for the unique demands of
              healthcare organizations.
            </p>
          </div>
          <div className="mt-14 grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
            {services.map((service) => (
              <div
                key={service.title}
                className="rounded-xl bg-white p-6 shadow-sm ring-1 ring-gray-100 transition hover:shadow-md"
              >
                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-brand-blue-50">
                  <service.icon className="h-6 w-6 text-brand-blue-600" />
                </div>
                <h3 className="mt-4 font-heading text-lg font-semibold text-brand-blue-900">
                  {service.title}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-gray-600">
                  {service.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Feature Highlights */}
      <section className="bg-brand-blue-50/50 py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid items-center gap-12 lg:grid-cols-2">
            <div>
              <h2 className="font-heading text-3xl font-bold text-brand-blue-900">
                Built for Healthcare. Designed for Compliance.
              </h2>
              <p className="mt-4 text-lg leading-relaxed text-gray-600">
                We understand that healthcare IT isn't just about technology — it's
                about protecting patients, supporting clinicians, and meeting
                regulatory requirements without slowing anyone down.
              </p>
              <ul className="mt-8 space-y-4">
                {highlights.map((item) => (
                  <li key={item} className="flex items-start gap-3">
                    <CheckCircle className="mt-0.5 h-5 w-5 shrink-0 text-brand-pink-500" />
                    <span className="text-gray-700">{item}</span>
                  </li>
                ))}
              </ul>
            </div>
            <div className="flex items-center justify-center">
              <div className="h-80 w-full rounded-2xl bg-gradient-to-br from-brand-blue-100 to-brand-pink-100" />
            </div>
          </div>
        </div>
      </section>

      {/* CTA Banner */}
      <section className="bg-brand-blue-700 py-16">
        <div className="mx-auto max-w-7xl px-4 text-center sm:px-6 lg:px-8">
          <h2 className="font-heading text-3xl font-bold text-white">
            Ready to Modernize Your Healthcare IT?
          </h2>
          <p className="mx-auto mt-4 max-w-xl text-lg text-brand-blue-200">
            Our technology consultants are ready to assess your infrastructure and
            design a roadmap that fits your organization&apos;s goals and compliance
            requirements.
          </p>
          <Link
            href="/contact"
            className="mt-8 inline-block rounded-lg bg-brand-pink-500 px-10 py-3 font-semibold text-white transition hover:bg-brand-pink-600"
          >
            Schedule a Consultation
          </Link>
        </div>
      </section>
    </>
  );
}
