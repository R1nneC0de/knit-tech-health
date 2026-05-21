import Link from 'next/link';

export default function AboutPreview() {
  return (
    <section className="bg-white py-16 sm:py-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-3xl text-center">
          <span className="text-sm font-semibold uppercase tracking-widest text-brand-orange-500">
            Who We Are
          </span>
          <h2 className="mt-2 font-heading text-3xl font-bold text-brand-blue-900">
            About KnitTech Inc
          </h2>
          <p className="mt-6 text-lg leading-relaxed text-gray-600">
            KnitTech Inc is a multidisciplinary solutions provider combining IT
            innovation, workforce expertise for healthcare &amp; IT, and medical
            equipment distribution under one unified brand. We help enterprise
            clients, hospitals, and government agencies accelerate transformation
            through scalable, compliant, and cost-effective services.
          </p>
          <p className="mt-4 text-lg font-medium leading-relaxed text-brand-blue-800">
            Our mission is simple: Advance technology &amp; healthcare through
            intelligent solutions that improve outcomes for people and organizations.
          </p>
          <div className="mt-8 flex flex-wrap justify-center gap-4">
            <Link
              href="/about"
              className="rounded-lg bg-brand-blue-700 px-8 py-3 font-semibold text-white transition hover:bg-brand-blue-800"
            >
              Learn More About Us
            </Link>
            <Link
              href="/contact"
              className="rounded-lg border-2 border-brand-orange-500 px-8 py-3 font-semibold text-brand-orange-600 transition hover:bg-brand-orange-50"
            >
              Get in Touch
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
