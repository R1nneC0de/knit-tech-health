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
  MapPin,
  DollarSign,
  CalendarDays,
  Sun,
  Moon,
} from 'lucide-react';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Healthcare Staffing — KTI Health',
  description:
    'KTI Health connects qualified healthcare professionals with top facilities nationwide. Browse open travel nursing, allied health, and locum tenens positions.',
};

const jobs = [
  {
    title: 'Travel RN — ICU / Critical Care',
    facility: 'Tampa General Hospital',
    location: 'Tampa, FL',
    pay: '$3,150 / week',
    shift: '3×12 Nights',
    weeks: '13 weeks',
    type: 'Travel Nursing',
    urgent: true,
  },
  {
    title: 'Travel RN — Emergency Department',
    facility: 'Banner University Medical Center',
    location: 'Phoenix, AZ',
    pay: '$2,980 / week',
    shift: '3×12 Days/Nights',
    weeks: '13 weeks',
    type: 'Travel Nursing',
    urgent: true,
  },
  {
    title: 'Travel RN — Operating Room',
    facility: 'Providence St. Joseph Medical Center',
    location: 'Burbank, CA',
    pay: '$3,420 / week',
    shift: '4×10 Days',
    weeks: '13 weeks',
    type: 'Travel Nursing',
    urgent: false,
  },
  {
    title: 'Travel RN — Labor & Delivery',
    facility: 'HCA Florida Kendall Hospital',
    location: 'Miami, FL',
    pay: '$2,890 / week',
    shift: '3×12 Nights',
    weeks: '13 weeks',
    type: 'Travel Nursing',
    urgent: false,
  },
  {
    title: 'Travel RN — NICU Level III',
    facility: 'Nationwide Children\'s Hospital',
    location: 'Columbus, OH',
    pay: '$3,050 / week',
    shift: '3×12 Nights',
    weeks: '13 weeks',
    type: 'Travel Nursing',
    urgent: true,
  },
  {
    title: 'Travel RN — Med/Surg Telemetry',
    facility: 'Emory University Hospital',
    location: 'Atlanta, GA',
    pay: '$2,240 / week',
    shift: '3×12 Days',
    weeks: '13 weeks',
    type: 'Travel Nursing',
    urgent: false,
  },
  {
    title: 'Travel RN — Stepdown / PCU',
    facility: 'Scripps Mercy Hospital',
    location: 'San Diego, CA',
    pay: '$2,650 / week',
    shift: '3×12 Days/Nights',
    weeks: '13 weeks',
    type: 'Travel Nursing',
    urgent: false,
  },
  {
    title: 'Travel Physical Therapist',
    facility: 'Intermountain Health',
    location: 'Salt Lake City, UT',
    pay: '$2,180 / week',
    shift: '5×8 Days',
    weeks: '13 weeks',
    type: 'Allied Health',
    urgent: false,
  },
  {
    title: 'Travel Radiologic Technologist',
    facility: 'Dignity Health — St. Mary\'s',
    location: 'San Francisco, CA',
    pay: '$2,450 / week',
    shift: '4×10 Days',
    weeks: '13 weeks',
    type: 'Allied Health',
    urgent: true,
  },
  {
    title: 'Travel Respiratory Therapist',
    facility: 'Vanderbilt University Medical Center',
    location: 'Nashville, TN',
    pay: '$2,050 / week',
    shift: '3×12 Nights',
    weeks: '13 weeks',
    type: 'Allied Health',
    urgent: false,
  },
  {
    title: 'Travel Occupational Therapist',
    facility: 'UPMC Presbyterian',
    location: 'Pittsburgh, PA',
    pay: '$2,100 / week',
    shift: '5×8 Days',
    weeks: '13 weeks',
    type: 'Allied Health',
    urgent: false,
  },
  {
    title: 'Locum Tenens — Emergency Medicine MD',
    facility: 'Regional Medical Center',
    location: 'Charlotte, NC',
    pay: '$225 / hour',
    shift: '12-hour shifts',
    weeks: 'Flexible',
    type: 'Locum Tenens',
    urgent: true,
  },
  {
    title: 'Locum Tenens — Hospitalist NP',
    facility: 'AdventHealth',
    location: 'Orlando, FL',
    pay: '$115 / hour',
    shift: '7-on / 7-off',
    weeks: 'Ongoing',
    type: 'Locum Tenens',
    urgent: false,
  },
  {
    title: 'Travel RN — PACU',
    facility: 'NYP / Weill Cornell Medical Center',
    location: 'New York, NY',
    pay: '$3,280 / week',
    shift: '3×12 Days',
    weeks: '13 weeks',
    type: 'Travel Nursing',
    urgent: false,
  },
  {
    title: 'Perm — Director of Nursing',
    facility: 'Community Health Network',
    location: 'Indianapolis, IN',
    pay: '$115,000–$135,000 / yr',
    shift: 'Full-time Days',
    weeks: 'Permanent',
    type: 'Permanent Placement',
    urgent: false,
  },
  {
    title: 'Travel Speech-Language Pathologist',
    facility: 'Boston Children\'s Hospital',
    location: 'Boston, MA',
    pay: '$2,380 / week',
    shift: '5×8 Days',
    weeks: '13 weeks',
    type: 'Allied Health',
    urgent: true,
  },
];

const typeColors: Record<string, string> = {
  'Travel Nursing': 'bg-brand-teal-50 text-brand-teal-600',
  'Allied Health': 'bg-blue-50 text-blue-600',
  'Locum Tenens': 'bg-amber-50 text-amber-700',
  'Permanent Placement': 'bg-green-50 text-green-700',
};

const forProfessionals = [
  { icon: Heart, title: 'Travel Nursing', description: 'Short-term nursing assignments at leading hospitals nationwide. Competitive pay, housing stipends, and full benefits.' },
  { icon: Stethoscope, title: 'Locum Tenens', description: 'Flexible physician and APP placements — days to months, across all specialties.' },
  { icon: Activity, title: 'Allied Health', description: '50+ specialties: PT, OT, radiology, respiratory, lab, pharmacy, and more.' },
  { icon: GraduationCap, title: 'Advanced Practice', description: 'Dedicated placement for NPs, CRNAs, and PAs — travel and permanent roles.' },
  { icon: Briefcase, title: 'Permanent Placement', description: 'Direct-hire recruiting matching the right clinical and cultural fit.' },
  { icon: Building2, title: 'School-Based Services', description: 'SLPs, PTs, OTs, and behavioral health specialists for school districts nationwide.' },
];

const forEmployers = [
  { icon: Users, title: 'Travel & Temporary Staffing', description: 'Rapidly scale during census surges, leave coverage, or expansions with pre-credentialed professionals.' },
  { icon: Clock, title: 'Per Diem Staffing', description: 'On-demand nurses and allied health professionals. No long-term commitments — full flexibility.' },
  { icon: ShieldCheck, title: 'Managed Services (MSP)', description: 'Let us manage your entire contingent workforce program — reducing cost and administrative burden.' },
  { icon: Zap, title: 'Recruitment Process Outsourcing', description: 'Outsource your permanent hire recruiting. We source, screen, and deliver qualified candidates.' },
];

const whyUs = [
  { icon: ShieldCheck, title: 'Rigorous Credentialing', description: 'Licenses verified, background checked, compliance-ready before day one. Joint Commission-certified process.' },
  { icon: Zap, title: 'Rapid Deployment', description: 'Qualified professionals placed in days, not weeks. We move at the speed your facility demands.' },
  { icon: Headset, title: '24/7 Dedicated Support', description: 'Account teams available around the clock for both facilities and professionals throughout every assignment.' },
  { icon: CheckCircle, title: 'Competitive Compensation', description: 'Top-of-market pay packages — weekly pay, housing allowances, travel reimbursements, and full benefits.' },
];

const stats = [
  { value: '5,000+', label: 'Professionals Placed Annually' },
  { value: '200+', label: 'Partner Facilities' },
  { value: '50+', label: 'Clinical Specialties Covered' },
  { value: '15+', label: 'Years of Experience' },
];

export default function StaffingPage() {
  return (
    <>
      {/* Hero */}
      <section className="bg-gradient-to-br from-brand-blue-50 via-white to-brand-teal-50 py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl">
            <span className="inline-block rounded-full bg-brand-teal-100 px-4 py-1 text-sm font-semibold text-brand-teal-600">
              Healthcare Staffing Division
            </span>
            <h1 className="mt-4 font-heading text-4xl font-bold text-brand-blue-900 sm:text-5xl lg:text-6xl">
              Your Partner in the{' '}
              <span className="text-brand-teal-500">Mission of Care</span>
            </h1>
            <p className="mt-6 text-lg leading-relaxed text-brand-blue-600">
              KTI Health (KNITTECH INC) connects qualified healthcare professionals
              with leading facilities from coast to coast — placing travel nurses,
              allied health, advanced practice providers, and physicians under one
              trusted, veteran-owned partner.
            </p>
            <div className="mt-6 flex flex-wrap gap-3">
              <span className="inline-flex items-center gap-1.5 rounded-full border border-brand-blue-200 bg-white px-3 py-1 text-sm font-medium text-brand-blue-700">
                🎖️ SDVOSB Certified
              </span>
              <span className="inline-flex items-center gap-1.5 rounded-full border border-brand-blue-200 bg-white px-3 py-1 text-sm font-medium text-brand-blue-700">
                ✓ Texas Approved Vendor
              </span>
              <span className="inline-flex items-center gap-1.5 rounded-full border border-brand-blue-200 bg-white px-3 py-1 text-sm font-medium text-brand-blue-700">
                📍 Nationwide Placements
              </span>
            </div>
            <div className="mt-6 flex flex-wrap gap-4">
              <a href="#open-positions" className="rounded-lg bg-brand-blue-700 px-8 py-3 font-semibold text-white transition hover:bg-brand-blue-800">
                Browse Open Positions
              </a>
              <Link href="/contact" className="rounded-lg border-2 border-brand-blue-700 px-8 py-3 font-semibold text-brand-blue-700 transition hover:bg-brand-blue-50">
                Talk to a Recruiter
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
                <div className="font-heading text-3xl font-bold text-white sm:text-4xl">{stat.value}</div>
                <div className="mt-1 text-sm text-brand-blue-200">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Specialties We Place */}
      <section className="bg-white py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <p className="text-sm font-semibold uppercase tracking-wider text-brand-teal-500">Disciplines & Specialties</p>
            <h2 className="mt-2 font-heading text-3xl font-bold text-brand-blue-900">Healthcare Professionals We Place</h2>
            <p className="mx-auto mt-3 max-w-2xl text-gray-600">
              From bedside nurses to C-suite leaders, we staff every tier of the clinical workforce — neighborhood, travel, and per diem.
            </p>
          </div>
          <div className="mt-10 grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
            {[
              { label: 'Travel Nurses', icon: Heart },
              { label: 'Per Diem Nurses', icon: Clock },
              { label: 'Local / Neighborhood RNs', icon: MapPin },
              { label: 'Allied Health', icon: Activity },
              { label: 'Advanced Practice RNs', icon: Stethoscope },
              { label: 'Physician Assistants', icon: Stethoscope },
              { label: 'Physician Placement', icon: Users },
              { label: 'Interim Leadership', icon: Briefcase },
            ].map((s) => (
              <div key={s.label} className="flex items-center gap-3 rounded-xl border border-gray-100 bg-brand-blue-50/50 p-4 text-sm font-semibold text-brand-blue-800">
                <s.icon className="h-5 w-5 shrink-0 text-brand-teal-500" />
                {s.label}
              </div>
            ))}
          </div>
          <div className="mt-8 rounded-2xl bg-brand-teal-50 p-6 text-center">
            <p className="text-sm font-medium text-brand-blue-700">
              We accept applications Mon–Fri, 8 am – 10 pm CST. &nbsp;•&nbsp; Direct pay available via pay card. &nbsp;•&nbsp; Contact:{' '}
              <a href="mailto:hr@ktihealth.com" className="font-semibold text-brand-teal-600 underline underline-offset-2">hr@ktihealth.com</a>
            </p>
          </div>
        </div>
      </section>

      {/* Open Positions */}
      <section id="open-positions" className="bg-white py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mb-10 flex flex-col justify-between gap-4 sm:flex-row sm:items-end">
            <div>
              <p className="text-sm font-semibold uppercase tracking-wider text-brand-teal-500">Now Hiring</p>
              <h2 className="mt-2 font-heading text-3xl font-bold text-brand-blue-900 sm:text-4xl">Open Positions</h2>
              <p className="mt-2 text-gray-600">Current openings across travel nursing, allied health, locum tenens, and permanent roles.</p>
            </div>
            <Link href="/contact" className="inline-flex items-center gap-2 whitespace-nowrap font-semibold text-brand-blue-700 transition hover:text-brand-teal-500">
              Submit Your Resume <ArrowRight className="h-4 w-4" />
            </Link>
          </div>

          <div className="grid gap-4 lg:grid-cols-2">
            {jobs.map((job) => (
              <div
                key={`${job.title}-${job.location}`}
                className="group relative rounded-2xl border border-gray-100 bg-white p-6 shadow-sm transition hover:border-brand-teal-200 hover:shadow-md"
              >
                {job.urgent && (
                  <span className="absolute right-4 top-4 rounded-full bg-red-50 px-2.5 py-0.5 text-xs font-semibold text-red-600">
                    Urgent
                  </span>
                )}
                <div className="flex items-start justify-between gap-4 pr-16">
                  <div>
                    <span className={`inline-block rounded-full px-2.5 py-0.5 text-xs font-semibold ${typeColors[job.type]}`}>
                      {job.type}
                    </span>
                    <h3 className="mt-2 font-heading text-base font-bold text-brand-blue-900 group-hover:text-brand-blue-700">
                      {job.title}
                    </h3>
                    <p className="mt-0.5 text-sm text-gray-500">{job.facility}</p>
                  </div>
                </div>

                <div className="mt-4 grid grid-cols-2 gap-2 text-sm text-gray-600 sm:grid-cols-4">
                  <div className="flex items-center gap-1.5">
                    <MapPin className="h-4 w-4 shrink-0 text-brand-teal-400" />
                    <span>{job.location}</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <DollarSign className="h-4 w-4 shrink-0 text-brand-teal-400" />
                    <span className="font-semibold text-brand-blue-700">{job.pay}</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    {job.shift.toLowerCase().includes('night') ? (
                      <Moon className="h-4 w-4 shrink-0 text-brand-teal-400" />
                    ) : (
                      <Sun className="h-4 w-4 shrink-0 text-brand-teal-400" />
                    )}
                    <span>{job.shift}</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <CalendarDays className="h-4 w-4 shrink-0 text-brand-teal-400" />
                    <span>{job.weeks}</span>
                  </div>
                </div>

                <div className="mt-4">
                  <Link
                    href="/contact"
                    className="inline-flex items-center gap-1.5 rounded-lg bg-brand-blue-50 px-4 py-2 text-sm font-semibold text-brand-blue-700 transition hover:bg-brand-blue-100"
                  >
                    Apply Now <ArrowRight className="h-3.5 w-3.5" />
                  </Link>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-10 rounded-2xl bg-brand-blue-50 p-8 text-center">
            <p className="font-heading text-lg font-semibold text-brand-blue-900">Don&apos;t see the right fit?</p>
            <p className="mt-1 text-gray-600">Submit your resume and a recruiter will match you with positions that fit your specialty, preferred location, and schedule.</p>
            <Link href="/contact" className="mt-4 inline-block rounded-lg bg-brand-blue-700 px-8 py-3 font-semibold text-white transition hover:bg-brand-blue-800">
              Submit Your Resume
            </Link>
          </div>
        </div>
      </section>

      {/* For Professionals */}
      <section className="bg-brand-blue-50/50 py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mb-12 flex flex-col justify-between gap-4 sm:flex-row sm:items-end">
            <div>
              <p className="text-sm font-semibold uppercase tracking-wider text-brand-teal-500">For Healthcare Professionals</p>
              <h2 className="mt-2 font-heading text-3xl font-bold text-brand-blue-900">Advance Your Career With Us</h2>
            </div>
          </div>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {forProfessionals.map((item) => (
              <div key={item.title} className="rounded-2xl border border-gray-100 bg-white p-7 shadow-sm transition hover:shadow-md">
                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-brand-teal-50">
                  <item.icon className="h-6 w-6 text-brand-teal-500" />
                </div>
                <h3 className="mt-4 font-heading text-lg font-semibold text-brand-blue-900">{item.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-gray-600">{item.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* For Employers */}
      <section className="bg-white py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mb-12">
            <p className="text-sm font-semibold uppercase tracking-wider text-brand-teal-500">For Healthcare Employers</p>
            <h2 className="mt-2 font-heading text-3xl font-bold text-brand-blue-900">Workforce Solutions for Your Facility</h2>
          </div>
          <div className="grid gap-6 sm:grid-cols-2">
            {forEmployers.map((item) => (
              <div key={item.title} className="flex gap-5 rounded-2xl border border-gray-100 bg-white p-7 shadow-sm transition hover:shadow-md">
                <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-brand-blue-50">
                  <item.icon className="h-6 w-6 text-brand-blue-600" />
                </div>
                <div>
                  <h3 className="font-heading text-lg font-semibold text-brand-blue-900">{item.title}</h3>
                  <p className="mt-1 text-sm leading-relaxed text-gray-600">{item.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Why KTI */}
      <section className="bg-brand-blue-50/50 py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <h2 className="text-center font-heading text-3xl font-bold text-brand-blue-900">Why Healthcare Leaders Choose KTI Health</h2>
          <div className="mt-12 grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
            {whyUs.map((item) => (
              <div key={item.title} className="rounded-xl bg-white p-7 text-center shadow-sm">
                <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-brand-teal-50">
                  <item.icon className="h-7 w-7 text-brand-teal-500" />
                </div>
                <h3 className="mt-5 font-heading text-lg font-semibold text-brand-blue-800">{item.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-gray-600">{item.description}</p>
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
              <h3 className="font-heading text-2xl font-bold text-white">I&apos;m a Healthcare Professional</h3>
              <p className="mt-3 text-brand-blue-200">Explore travel assignments, per diem shifts, and permanent roles across the country.</p>
              <Link href="/contact" className="mt-6 inline-block rounded-lg bg-brand-teal-500 px-7 py-3 font-semibold text-white transition hover:bg-brand-teal-600">
                Find My Next Assignment
              </Link>
            </div>
            <div className="rounded-2xl bg-brand-teal-500 p-10">
              <h3 className="font-heading text-2xl font-bold text-white">I&apos;m a Healthcare Employer</h3>
              <p className="mt-3 text-teal-100">Fill critical staffing gaps fast with pre-credentialed professionals.</p>
              <Link href="/contact" className="mt-6 inline-block rounded-lg bg-white px-7 py-3 font-semibold text-brand-teal-600 transition hover:bg-teal-50">
                Talk to a Specialist
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Bottom CTA */}
      <section className="bg-brand-blue-700 py-16">
        <div className="mx-auto max-w-7xl px-4 text-center sm:px-6 lg:px-8">
          <h2 className="font-heading text-3xl font-bold text-white">Ready to Get Started?</h2>
          <p className="mx-auto mt-4 max-w-xl text-lg text-brand-blue-200">
            Our staffing specialists are standing by — whether you need one nurse tomorrow or a full managed workforce program.
          </p>
          <Link href="/contact" className="mt-8 inline-block rounded-lg bg-brand-teal-500 px-10 py-3 font-semibold text-white transition hover:bg-brand-teal-600">
            Contact Us Today
          </Link>
        </div>
      </section>
    </>
  );
}
