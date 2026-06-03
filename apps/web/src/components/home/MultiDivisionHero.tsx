import Link from 'next/link';

export default function MultiDivisionHero() {
  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-brand-blue-900 via-brand-blue-800 to-brand-blue-900">
      {/* Decorative rings */}
      <div className="pointer-events-none absolute -right-32 -top-32 h-[500px] w-[500px] rounded-full bg-brand-orange-500/5" />
      <div className="pointer-events-none absolute -bottom-20 -left-20 h-[350px] w-[350px] rounded-full bg-brand-orange-500/5" />

      <div className="relative mx-auto max-w-7xl px-4 py-28 sm:px-6 sm:py-36 lg:px-8">
        <div className="max-w-3xl">
          <span className="inline-block rounded-full bg-brand-orange-500/15 px-4 py-1.5 text-sm font-semibold text-brand-orange-400 ring-1 ring-brand-orange-500/30">
            KnitTech Inc — Technology + Healthcare
          </span>
          <h1 className="mt-5 font-heading text-4xl font-bold tracking-tight text-white sm:text-5xl">
            Empowering the Future of{' '}
            <span className="text-brand-orange-400">Technology &amp; Healthcare</span>
          </h1>
          <p className="mt-6 text-lg leading-relaxed text-brand-blue-200">
            KnitTech Inc delivers integrated technology solutions, clinical staffing,
            and medical equipment solutions that help organizations operate smarter,
            faster, and with greater confidence.{' '}
            <span className="font-semibold text-white">One partner. Complete solutions.</span>
          </p>
          <div className="mt-10 flex flex-wrap gap-4">
            <a
              href="#divisions"
              className="rounded-lg bg-brand-orange-500 px-8 py-3 font-semibold text-white shadow-lg transition hover:bg-brand-orange-600"
            >
              Explore Divisions
            </a>
            <Link
              href="/contact"
              className="rounded-lg border-2 border-white/30 px-8 py-3 font-semibold text-white transition hover:border-white/60 hover:bg-white/10"
            >
              Contact Us
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
