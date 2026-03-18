import { ShieldCheck, Headset, Heart } from 'lucide-react';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'About Us — Knit Tech Health',
  description: 'Learn about our mission to provide trusted medical equipment solutions.',
};

const values = [
  {
    icon: ShieldCheck,
    title: 'Quality',
    description:
      'Every product in our catalog meets rigorous quality and safety standards. We partner only with trusted manufacturers.',
  },
  {
    icon: Headset,
    title: 'Service',
    description:
      'From product selection to delivery, our team provides personalized support at every step.',
  },
  {
    icon: Heart,
    title: 'Trust',
    description:
      'Healthcare providers count on us for reliable equipment and transparent, honest business practices.',
  },
];

export default function AboutPage() {
  return (
    <>
      {/* Hero */}
      <section className="bg-gradient-to-br from-brand-blue-50 to-brand-pink-50 py-20">
        <div className="mx-auto max-w-7xl px-4 text-center sm:px-6 lg:px-8">
          <h1 className="font-heading text-4xl font-bold text-brand-blue-900 sm:text-5xl">
            About Knit Tech Health
          </h1>
          <p className="mx-auto mt-4 max-w-2xl text-lg text-brand-blue-600">
            Connecting healthcare providers with the medical equipment they need
            to deliver exceptional patient care.
          </p>
        </div>
      </section>

      {/* Mission */}
      <section className="bg-white py-16">
        <div className="mx-auto max-w-3xl px-4 text-center sm:px-6 lg:px-8">
          <h2 className="font-heading text-3xl font-bold text-brand-blue-900">
            Our Mission
          </h2>
          <p className="mt-6 text-lg leading-relaxed text-gray-600">
            At Knit Tech Health, we believe every healthcare provider deserves
            easy access to high-quality medical equipment. We simplify the
            procurement process — browse our catalog, submit a request, and our
            team handles sourcing, pricing, and delivery so you can focus on what
            matters most: patient care.
          </p>
          <p className="mt-4 text-lg leading-relaxed text-gray-600">
            We work with trusted manufacturers and distributors to offer a wide
            range of medical supplies — from mobility aids and respiratory
            equipment to diagnostics and personal protective equipment.
          </p>
        </div>
      </section>

      {/* Values */}
      <section className="bg-brand-blue-50/50 py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <h2 className="text-center font-heading text-3xl font-bold text-brand-blue-900">
            Why Choose Us
          </h2>
          <div className="mt-12 grid gap-8 md:grid-cols-3">
            {values.map((v) => (
              <div
                key={v.title}
                className="rounded-xl bg-white p-8 text-center shadow-sm"
              >
                <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-brand-pink-50">
                  <v.icon className="h-8 w-8 text-brand-pink-500" />
                </div>
                <h3 className="mt-6 font-heading text-xl font-semibold text-brand-blue-800">
                  {v.title}
                </h3>
                <p className="mt-3 leading-relaxed text-gray-600">
                  {v.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Team placeholder */}
      <section className="bg-white py-16">
        <div className="mx-auto max-w-7xl px-4 text-center sm:px-6 lg:px-8">
          <h2 className="font-heading text-3xl font-bold text-brand-blue-900">
            Our Team
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-gray-600">
            Our dedicated team of healthcare equipment specialists brings years
            of industry experience to help you find the right products for your
            facility.
          </p>
          <div className="mt-12 grid gap-8 sm:grid-cols-3">
            {['Operations', 'Sales & Support', 'Logistics'].map((dept) => (
              <div
                key={dept}
                className="rounded-xl border border-gray-100 p-6"
              >
                <div className="mx-auto h-20 w-20 rounded-full bg-gradient-to-br from-brand-blue-100 to-brand-pink-100" />
                <h3 className="mt-4 font-heading font-semibold text-brand-blue-800">
                  {dept}
                </h3>
                <p className="mt-1 text-sm text-gray-500">
                  Dedicated professionals committed to your success.
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
