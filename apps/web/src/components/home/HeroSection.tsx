import Link from 'next/link';

export default function HeroSection() {
  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-brand-pink-50 via-white to-brand-blue-50">
      <div className="mx-auto max-w-7xl px-4 py-24 sm:px-6 sm:py-32 lg:px-8">
        <div className="max-w-2xl">
          <h1 className="font-heading text-4xl font-bold tracking-tight text-brand-blue-900 sm:text-5xl lg:text-6xl">
            Trusted Medical Equipment{' '}
            <span className="text-brand-pink-500">Solutions</span>
          </h1>
          <p className="mt-6 text-lg leading-relaxed text-brand-blue-600">
            Quality medical supplies and equipment for healthcare providers.
            Browse our catalog and request the products you need — our team will
            handle the rest.
          </p>
          <div className="mt-8 flex flex-wrap gap-4">
            <Link
              href="/shop"
              className="rounded-lg bg-brand-blue-700 px-8 py-3 font-semibold text-white transition hover:bg-brand-blue-800"
            >
              Browse Equipment
            </Link>
            <Link
              href="/contact"
              className="rounded-lg border-2 border-brand-blue-700 px-8 py-3 font-semibold text-brand-blue-700 transition hover:bg-brand-blue-50"
            >
              Contact Us
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
