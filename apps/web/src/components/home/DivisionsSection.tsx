import Link from 'next/link';
import { Stethoscope, Users, Cpu, ArrowRight } from 'lucide-react';

const divisions = [
  {
    icon: Stethoscope,
    title: 'Medical Equipment',
    description:
      'B2B medical supply store for hospitals, clinics, and labs. Browse 90+ products across 8 categories — request quotes or purchase directly online.',
    href: '/shop-medical',
    cta: 'Browse Equipment',
    accent: 'text-brand-teal-500',
    bg: 'bg-brand-teal-50',
  },
  {
    icon: Users,
    title: 'Healthcare Staffing',
    description:
      'Connecting qualified healthcare professionals with leading facilities nationwide — travel nursing, locum tenens, allied health, and permanent placement.',
    href: '/staffing',
    cta: 'Explore Staffing',
    accent: 'text-brand-blue-500',
    bg: 'bg-brand-blue-50',
  },
  {
    icon: Cpu,
    title: 'IT Solutions',
    description:
      'Enterprise-grade technology for healthcare organizations. From HIPAA-compliant infrastructure to cloud migration and EHR integration.',
    href: '/it-solutions',
    cta: 'Explore IT Services',
    accent: 'text-brand-teal-500',
    bg: 'bg-brand-teal-50',
  },
];

export default function DivisionsSection() {
  return (
    <section id="divisions" className="bg-white py-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <h2 className="font-heading text-3xl font-bold text-brand-blue-900 sm:text-4xl">
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
              className="group flex flex-col rounded-2xl border border-gray-100 bg-white p-8 shadow-sm transition hover:shadow-md"
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
