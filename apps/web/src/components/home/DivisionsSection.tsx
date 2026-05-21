import Link from 'next/link';
import { Stethoscope, Users, Cpu, ArrowRight } from 'lucide-react';

const divisions = [
  {
    icon: Stethoscope,
    title: 'Medical Equipment Supplies',
    description:
      'B2B medical supply store for hospitals, clinics, and labs. Browse 90+ products across 8 categories — request a quote or purchase directly online without login.',
    href: '/shop-medical',
    cta: 'Browse Equipment',
    accent: 'text-brand-orange-500',
    border: 'border-brand-orange-200',
    bg: 'bg-brand-orange-50',
  },
  {
    icon: Users,
    title: 'Healthcare Staffing',
    description:
      'Connecting qualified healthcare professionals — travel nurses, locum tenens, allied health, and permanent placements — with top facilities nationwide.',
    href: '/staffing',
    cta: 'Explore Staffing',
    accent: 'text-brand-blue-500',
    border: 'border-brand-blue-200',
    bg: 'bg-brand-blue-50',
  },
  {
    icon: Cpu,
    title: 'IT Solutions',
    description:
      'Enterprise-grade technology for healthcare organizations — HIPAA-compliant infrastructure, cloud migration, EHR integration, and government contracting support.',
    href: '/it-solutions',
    cta: 'Explore IT Services',
    accent: 'text-brand-orange-500',
    border: 'border-brand-orange-200',
    bg: 'bg-brand-orange-50',
  },
];

export default function DivisionsSection() {
  return (
    <section id="divisions" className="bg-white py-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <span className="text-sm font-semibold uppercase tracking-widest text-brand-orange-500">
            What We Do
          </span>
          <h2 className="mt-2 font-heading text-3xl font-bold text-brand-blue-900 sm:text-4xl">
            Our Divisions
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-lg text-gray-600">
            Three specialized divisions, one integrated partner for healthcare excellence.
          </p>
        </div>

        <div className="mt-14 grid gap-8 md:grid-cols-3">
          {divisions.map((div) => (
            <div
              key={div.title}
              className={`group flex flex-col rounded-2xl border-2 ${div.border} bg-white p-8 shadow-sm transition hover:shadow-md`}
            >
              <div className={`mb-6 flex h-14 w-14 items-center justify-center rounded-xl ${div.bg}`}>
                <div.icon className={`h-7 w-7 ${div.accent}`} />
              </div>
              <h3 className="font-heading text-xl font-bold text-brand-blue-900">
                {div.title}
              </h3>
              <p className="mt-3 flex-1 leading-relaxed text-gray-600">
                {div.description}
              </p>
              <Link
                href={div.href}
                className={`mt-6 inline-flex items-center gap-2 font-semibold ${div.accent} transition hover:gap-3`}
              >
                {div.cta}
                <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
