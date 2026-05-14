import Link from 'next/link';
import {
  Heart,
  Stethoscope,
  Activity,
  Briefcase,
  Users,
  Building2,
  ShieldCheck,
  Zap,
  Headset,
  CheckCircle,
  ArrowRight,
  GraduationCap,
  Clock,
} from 'lucide-react';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Healthcare Staffing — KTI Health',
  description:
    'KTI Health connects qualified healthcare professionals with top facilities nationwide. Travel nursing, locum tenens, allied health, advanced practice, and permanent placement.',
};

const forProfessionals = [
  {
    icon: Heart,
    title: 'Travel Nursing',
    description:
      'Short-term nursing assignments at leading hospitals and health systems across the country. Competitive pay packages, housing stipends, travel reimbursements, and comprehensive benefits.',
  },
  {
    icon: Stethoscope,
    title: 'Locum Tenens',
    description:
      'Flexible physician and advanced practice provider placements for clinics, hospitals, and specialty practices. Choose your schedule — from days to months.',
  },
  {
    icon: Activity,
    title: 'Allied Health',
    description:
      'Physical therapists, occupational therapists, radiologists, respiratory therapists, lab technicians, and 50+ more specialties placed in facilities that need them most.',
  },
  {
    icon: GraduationCap,
    title: 'Advanced Practice',
    description:
      'Dedicated placement services for Nurse Practitioners, CRNAs, and Physician Assistants — both travel and permanent roles across all specialties.',
  },
  {
    icon: Briefcase,
    title: 'Permanent Placement',
    description:
      'Direct-hire recruiting for healthcare organizations building long-term clinical teams. We match the right cultural fit, not just credentials.',
  },
  {
    icon: Building2,
    title: 'School-Based Services',
    description:
      'Speech-language pathologists, physical therapists, occupational therapists, and behavioral health specialists placed in school districts nationwide.',
  },
];

const forEmployers = [
  {
    icon: Users,
    title: 'Travel & Temporary Staffing',
    description:
      'Rapidly scale your workforce during census surges, leave coverage, or facility expansions with pre-credentialed, ready-to-deploy clinical professionals.',
  },
  {
    icon: Clock,
    title: 'Per Diem Staffing',
    description:
      'On-demand nurses and allied health professionals available when your census spikes. No long-term commitments — full flexibility for your facility.',
  },
  {
    icon: ShieldCheck,
    title: 'Managed Services (MSP)',
    description:
      'Let us manage your entire contingent workforce program — vendor neutral or preferred supplier — reducing cost and administrative burden.',
  },
  {
    icon: Zap,
    title: 'Recruitment Process Outsourcing',
    description:
      'Outsource your permanent hire recruiting to our specialists. We source, screen, and deliver qualified candidates while you focus on patient care.',
  },
];

const stats = [
  { value: '5,000+', label: 'Professionals Placed Annually' },
  { value: '200+', label: 'Partner Facilities' },
  { value: '50+', label: 'Clinical Specialties Covered' },
  { value: '15+', label: 'Years of Experience' },
];

const whyUs = [
  {
    icon: ShieldCheck,
    title: 'Rigorous Credentialing',
    description:
      'Every professional is thoroughly vetted — licenses verified, background checked, and compliance-ready before day one. Joint Commission-certified credentialing process.',
  },
  {
    icon: Zap,
    title: 'Rapid Deployment',
    description:
      'Our streamlined process gets qualified professionals placed in days, not weeks. We move at the speed your facility demands, without cutting corners.',
  },
  {
    icon: Headset,
    title: '24/7 Dedicated Support',
    description:
      'A dedicated account team is available around the clock for both facilities and professionals — before, during, and after every assignment.',
  },
  {
    icon: CheckCircle,
    title: 'Competitive Compensation',
    description:
      'We offer some of the most competitive pay packages in the industry — weekly pay, housing allowances, travel reimbursements, and full benefits.',
  },
];

const specialties = [
  'Registered Nurses', 'ICU / Critical Care', 'Emergency Department', 'Operating Room',
  'Labor & Delivery', 'NICU / PICU', 'Medical-Surgical', 'Radiology / Imaging',
  'Physical Therapy', 'Occupational Therapy', 'Speech-Language Pathology',
  'Respiratory Therapy', 'Clinical Lab / Phlebotomy', 'Pharmacy', 'Physician Assistants', 'Nurse Practitioners',
];

export default function StaffingPage() {
  return (
    <>
      {/* Hero */}
      <section className="bg-gradient-to-br from-brand-blue-50 via-white to-brand-pink-50 py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl">
            <span className="inline-block rounded-full bg-brand-pink-100 px-4 py-1 text-sm font-semibold text-brand-pink-600">
              Healthcare Staffing Division
            </span>
            <h1 className="mt-4 font-heading text-4xl font-bold text-brand-blue-900 sm:text-5xl lg:text-6xl">
              Your Partner in the{' '}
              <span className="text-brand-pink-500">Mission of Care</span>
            </h1>
            <p className="mt-6 text-lg leading-relaxed text-brand-blue-600">
              KTI Health connects qualified healthcare professionals with leading
              facilities nationwide — delivering the full spectrum of staffing
              solutions under one trusted partner. Whether you&apos;re a clinician
              seeking your next assignment or a facility filling a critical gap,
              we&apos;re here to help.
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
                Find a Job
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Bar */}
      <section className="bg-brand-blue-700 py-12">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 gap-8 text-center sm:grid-cols-4">
            {stats.map((stat) => (
              <div key={stat.label}>
                <div className="font-heading text-3xl font-bold text-white sm:text-4xl">
                  {stat.value}
                </div>
                <div className="mt-1 text-sm text-brand-blue-200">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* For Professionals */}
      <section className="bg-white py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mb-14 flex flex-col items-start justify-between gap-4 sm:flex-row sm:items-end">
            <div>
              <p className="text-sm font-semibold uppercase tracking-wider text-brand-pink-500">
                For Healthcare Professionals
              </p>
              <h2 className="mt-2 font-heading text-3xl font-bold text-brand-blue-900 sm:text-4xl">
                Advance Your Career With Us
              </h2>
              <p className="mt-3 max-w-xl text-lg text-gray-600">
                From your first travel assignment to a permanent leadership role —
                we support every stage of your healthcare career.
              </p>
            </div>
            <Link
              href="/contact"
              className="inline-flex items-center gap-2 whitespace-nowrap font-semibold text-brand-blue-700 transition hover:text-brand-pink-500"
            >
              Browse All Positions <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {forProfessionals.map((item) => (
              <div
                key={item.title}
                className="group rounded-2xl border border-gray-100 bg-white p-7 shadow-sm transition hover:shadow-md hover:border-brand-pink-200"
              >
                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-brand-pink-50">
                  <item.icon className="h-6 w-6 text-brand-pink-500" />
                </div>
                <h3 className="mt-4 font-heading text-lg font-semibold text-brand-blue-900">
                  {item.title}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-gray-600">
                  {item.description}
                </p>
                <Link
                  href="/contact"
                  className="mt-4 inline-flex items-center gap-1 text-sm font-semibold text-brand-pink-500 transition group-hover:gap-2"
                >
                  Learn More <ArrowRight className="h-3.5 w-3.5" />
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Specialties Grid */}
      <section className="bg-brand-blue-50/60 py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <h2 className="text-center font-heading text-3xl font-bold text-brand-blue-900">
            Specialties We Place
          </h2>
          <p className="mx-auto mt-3 max-w-2xl text-center text-gray-600">
            50+ clinical specialties covered across nursing, allied health, advanced practice, and physician staffing.
          </p>
          <div className="mt-10 flex flex-wrap justify-center gap-3">
            {specialties.map((specialty) => (
              <span
                key={specialty}
                className="rounded-full border border-brand-blue-200 bg-white px-4 py-2 text-sm font-medium text-brand-blue-700"
              >
                {specialty}
              </span>
            ))}
            <span className="rounded-full border border-brand-pink-200 bg-brand-pink-50 px-4 py-2 text-sm font-medium text-brand-pink-600">
              + Many More
            </span>
          </div>
        </div>
      </section>

      {/* For Employers */}
      <section className="bg-white py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mb-14">
            <p className="text-sm font-semibold uppercase tracking-wider text-brand-pink-500">
              For Healthcare Employers
            </p>
            <h2 className="mt-2 font-heading text-3xl font-bold text-brand-blue-900 sm:text-4xl">
              Workforce Solutions Built for Your Facility
            </h2>
            <p className="mt-3 max-w-2xl text-lg text-gray-600">
              From short-term coverage to full managed services — flexible staffing
              programs designed around your operational goals.
            </p>
          </div>
          <div className="grid gap-6 sm:grid-cols-2">
            {forEmployers.map((item) => (
              <div
                key={item.title}
                className="flex gap-5 rounded-2xl border border-gray-100 bg-white p-7 shadow-sm transition hover:shadow-md"
              >
                <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-brand-blue-50">
                  <item.icon className="h-6 w-6 text-brand-blue-600" />
                </div>
                <div>
                  <h3 className="font-heading text-lg font-semibold text-brand-blue-900">
                    {item.title}
                  </h3>
                  <p className="mt-1 text-sm leading-relaxed text-gray-600">
                    {item.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Why Choose KTI */}
      <section className="bg-brand-blue-50/50 py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h2 className="font-heading text-3xl font-bold text-brand-blue-900 sm:text-4xl">
              Why Healthcare Leaders Choose KTI Health
            </h2>
            <p className="mx-auto mt-4 max-w-2xl text-lg text-gray-600">
              We combine deep clinical expertise with a genuine commitment to the
              people and organizations we serve.
            </p>
          </div>
          <div className="mt-14 grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
            {whyUs.map((item) => (
              <div
                key={item.title}
                className="rounded-xl bg-white p-7 text-center shadow-sm"
              >
                <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-brand-pink-50">
                  <item.icon className="h-7 w-7 text-brand-pink-500" />
                </div>
                <h3 className="mt-5 font-heading text-lg font-semibold text-brand-blue-800">
                  {item.title}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-gray-600">
                  {item.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Split CTA */}
      <section className="bg-white py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid gap-6 sm:grid-cols-2">
            <div className="rounded-2xl bg-brand-blue-700 p-10">
              <h3 className="font-heading text-2xl font-bold text-white">
                I&apos;m a Healthcare Professional
              </h3>
              <p className="mt-3 text-brand-blue-200">
                Explore travel assignments, per diem shifts, and permanent roles
                across the country. Join thousands of clinicians who trust KTI Health.
              </p>
              <Link
                href="/contact"
                className="mt-6 inline-block rounded-lg bg-brand-pink-500 px-7 py-3 font-semibold text-white transition hover:bg-brand-pink-600"
              >
                Find My Next Assignment
              </Link>
            </div>
            <div className="rounded-2xl bg-brand-pink-500 p-10">
              <h3 className="font-heading text-2xl font-bold text-white">
                I&apos;m a Healthcare Employer
              </h3>
              <p className="mt-3 text-pink-100">
                Fill critical staffing gaps fast with pre-credentialed professionals.
                Talk to a staffing specialist about your facility&apos;s needs.
              </p>
              <Link
                href="/contact"
                className="mt-6 inline-block rounded-lg bg-white px-7 py-3 font-semibold text-brand-pink-600 transition hover:bg-pink-50"
              >
                Talk to a Specialist
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Bottom CTA Banner */}
      <section className="bg-brand-blue-700 py-16">
        <div className="mx-auto max-w-7xl px-4 text-center sm:px-6 lg:px-8">
          <h2 className="font-heading text-3xl font-bold text-white">
            Ready to Get Started?
          </h2>
          <p className="mx-auto mt-4 max-w-xl text-lg text-brand-blue-200">
            Our staffing specialists are standing by. Whether you need one nurse
            tomorrow or a full managed workforce program — we have the solution.
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
