import { ShieldCheck, Headset, Truck, BadgeDollarSign } from 'lucide-react';

const values = [
  {
    icon: ShieldCheck,
    title: 'Quality Assured',
    description:
      'All products meet rigorous medical-grade standards and regulatory requirements.',
  },
  {
    icon: Headset,
    title: 'Expert Support',
    description:
      'Our knowledgeable team helps you find the right equipment for your needs.',
  },
  {
    icon: Truck,
    title: 'Fast Delivery',
    description:
      'Reliable shipping with tracking to get equipment to you quickly.',
  },
  {
    icon: BadgeDollarSign,
    title: 'Competitive Pricing',
    description:
      'Transparent, competitive quotes tailored to your organization.',
  },
];

export default function ValuePropositions() {
  return (
    <section className="bg-white py-16 sm:py-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <h2 className="text-center font-heading text-3xl font-bold text-brand-blue-900">
          Why Choose Knit Tech Health
        </h2>
        <div className="mt-12 grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
          {values.map((v) => (
            <div
              key={v.title}
              className="rounded-xl border border-gray-100 bg-white p-6 text-center shadow-sm transition hover:shadow-md"
            >
              <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-brand-pink-50">
                <v.icon className="h-7 w-7 text-brand-pink-500" />
              </div>
              <h3 className="mt-4 font-heading text-lg font-semibold text-brand-blue-800">
                {v.title}
              </h3>
              <p className="mt-2 text-sm leading-relaxed text-gray-600">
                {v.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
