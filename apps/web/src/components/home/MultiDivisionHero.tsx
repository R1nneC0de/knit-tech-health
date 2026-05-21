import Link from 'next/link';

export default function MultiDivisionHero() {
  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-brand-blue-50 via-white to-brand-yellow-50">
      <div className="mx-auto max-w-7xl px-4 py-24 sm:px-6 sm:py-32 lg:px-8">
        <div className="max-w-3xl">
          <span className="inline-block rounded-full bg-brand-yellow-100 px-4 py-1 text-sm font-semibold text-brand-yellow-600">
            KnitTechInc — Multi-Division Platform
          </span>
          <h1 className="mt-4 font-heading text-4xl font-bold tracking-tight text-brand-blue-900 sm:text-5xl lg:text-6xl">
            Premium Healthcare &{' '}
            <span className="text-brand-yellow-500">Technology Solutions</span>
          </h1>
          <p className="mt-6 text-lg leading-relaxed text-brand-blue-600">
            KTI Health delivers medical equipment, staffing solutions, and enterprise
            IT services — all under one unified, trusted brand built for modern
            healthcare organizations.
          </p>
          <div className="mt-8 flex flex-wrap gap-4">
            <a
              href="#divisions"
              className="rounded-lg bg-brand-blue-700 px-8 py-3 font-semibold text-white transition hover:bg-brand-blue-800"
            >
              Explore Divisions
            </a>
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
