import Link from 'next/link';
import { Heart, Stethoscope, Activity, Briefcase, ShieldCheck, Zap, Headset } from 'lucide-react';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Healthcare Staffing — KTI Health',
  description:
    'KTI Health connects qualified healthcare professionals with top facilities nationwide. Travel nursing, locum tenens, allied health, and permanent placement.',
};

const services = [
  {
    icon: Heart,
    title: 'Travel Nursing',
    description:
      'Short-term nursing assignments at leading hospitals and health systems across the country. Competitive pay, housing stipends, and full benefits included.',
  },
  {
    icon: Stethoscope,
    title: 'Locum Tenens',
    description:
      'Flexible physician and advanced practice provider placements for clinics, hospitals, and specialty practices — from days to months.',
  },
  {
    icon: Activity,
    title: 'Allied Health',
    description:
      'Physical therapists, occupational therapists, radiologists, lab technicians, and more — placed in facilities that need them most.',
  },
  {
    icon: Briefcase,
    title: 'Permanent Placement',
    description:
      'Direct hire recruiting for healthcare organizations seeking to build long-term clinical teams with the right cultural and clinical fit.',
  },
];

const stats = [
  { value: '5,000+', label: 'Professionals Placed' },
  { value: '200+', label: 'Partner Facilities' },
  { value: '15+', label: 'Years of Experience' },
];

const whyUs = [
  {
    icon: ShieldCheck,
    title: 'Credentialing Excellence',
    description:
      'Every professional is thoroughly vetted, credentialed, and compliance-ready before placement — so you can focus on patient care.',
  },
  {
    icon: Zap,
    title: 'Rapid Deployment',
    description:
      'Our streamlined process gets qualified professionals placed in days, not weeks. We move at the speed your facility needs.',
  },
  {
    icon: Headset,
    title: '24/7 Support',
    description:
      'Dedicated staffing specialists available around the clock to support both facilities and healthcare professionals throughout every engagement.',
  },
];

export default function StaffingPage() {
  return (
    <>
      {/* Hero */}
      <section className="bg-gradient-to-br from-brand-blue-50 via-white to-brand-pink-50 py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl">
            <span className="inline-block rounded-full bg-brand-pink-100 px-4 py-1 text-sm font-semibold text-brand-pink-600">
              Healthcare Staffing Division
            </span>
            <h1 className="mt-4 font-heading text-4xl font-bold text-brand-blue-900 sm:text-5xl">
              Your Trusted Healthcare{' '}
              <span className="text-brand-pink-500">Staffing Partner</span>
            </h1>
            <p className="mt-6 text-lg leading-relaxed text-brand-blue-600">
              Connecting qualified healthcare professionals with leading facilities
              nationwide. From travel nursing to permanent placement — we deliver
              the right talent, right when you need it.
            </p>
            <div className="mt-8 flex flex-wrap gap-4">
              <Link
                href="/contact"
                className="rounded-lg bg-brand-blue-700 px-8 py-3 font-semibold text-white transition hover:bg-brand-blue-800"
              >
                Find Talent
              </Link>
              <Link
                href="/contact"
                className="rounded-lg border-2 border-brand-blue-700 px-8 py-3 font-semibold text-brand-blue-700 transition hover:bg-brand-blue-50"
              >
                Browse Positions
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
              Staffing Solutions
            </h2>
            <p className="mx-auto mt-4 max-w-2xl text-lg text-gray-600">
              Specialized placement services designed for every level of healthcare staffing need.
            </p>
          </div>
          <div className="mt-14 grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
            {services.map((service) => (
              <div
                key={service.title}
                className="rounded-xl bg-white p-6 shadow-sm ring-1 ring-gray-100 transition hover:shadow-md"
              >
                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-brand-pink-50">
                  <service.icon className="h-6 w-6 text-brand-pink-500" />
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

      {/* Stats Bar */}
      <section className="bg-brand-blue-700 py-14">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-3 gap-8 text-center">
            {stats.map((stat) => (
              <div key={stat.label}>
                <div className="font-heading text-4xl font-bold text-white">
                  {stat.value}
                </div>
                <div className="mt-1 text-sm text-brand-blue-200">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Why Choose KTI Staffing */}
      <section className="bg-brand-blue-50/50 py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <h2 className="text-center font-heading text-3xl font-bold text-brand-blue-900">
            Why Choose KTI Health Staffing
          </h2>
          <div className="mt-12 grid gap-8 md:grid-cols-3">
            {whyUs.map((item) => (
              <div
                key={item.title}
                className="rounded-xl bg-white p-8 text-center shadow-sm"
              >
                <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-brand-pink-50">
                  <item.icon className="h-8 w-8 text-brand-pink-500" />
                </div>
                <h3 className="mt-6 font-heading text-xl font-semibold text-brand-blue-800">
                  {item.title}
                </h3>
                <p className="mt-3 leading-relaxed text-gray-600">
                  {item.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Banner */}
      <section className="bg-brand-blue-700 py-16">
        <div className="mx-auto max-w-7xl px-4 text-center sm:px-6 lg:px-8">
          <h2 className="font-heading text-3xl font-bold text-white">
            Ready to Fill Your Staffing Needs?
          </h2>
          <p className="mx-auto mt-4 max-w-xl text-lg text-brand-blue-200">
            Our staffing specialists are standing by to match your facility with
            the right professionals — quickly and reliably.
          </p>
          <Link
            href="/contact"
            className="mt-8 inline-block rounded-lg bg-brand-pink-500 px-10 py-3 font-semibold text-white transition hover:bg-brand-pink-600"
          >
            Contact Us Today
          </Link>
        </div>
      </section>
    </>
  );
}
