import Link from 'next/link';

export default function AboutPreview() {
  return (
    <section className="bg-white py-16 sm:py-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-3xl text-center">
          <h2 className="font-heading text-3xl font-bold text-brand-blue-900">
            Our Mission
          </h2>
          <p className="mt-6 text-lg leading-relaxed text-gray-600">
            At KTI Health, we&apos;re committed to delivering excellence across
            healthcare and technology. From medical equipment and staffing solutions
            to enterprise IT infrastructure — we partner with providers, facilities,
            and organizations to keep healthcare running at its best.
          </p>
          <Link
            href="/about"
            className="mt-8 inline-block rounded-lg border-2 border-brand-blue-700 px-8 py-3 font-semibold text-brand-blue-700 transition hover:bg-brand-blue-50"
          >
            Learn More About Us
          </Link>
        </div>
      </div>
    </section>
  );
}
