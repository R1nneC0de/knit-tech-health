import Image from 'next/image';

const badges = [
  { src: '/images/vethub-badge.png', alt: 'VetHUB — Veteran Heroes United in Business', width: 110 },
  { src: '/images/sdvosb-badge.png', alt: 'SDVOSB — Service Disabled Veteran Owned Small Business', width: 110 },
  { src: '/images/sba-badge.png', alt: 'SBA — U.S. Small Business Administration', width: 100 },
];

export default function CertificationBadges() {
  return (
    <section className="border-y border-brand-orange-100 bg-gradient-to-r from-brand-blue-900 via-brand-blue-800 to-brand-blue-900 py-12">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Veteran-owned headline */}
        <div className="mb-8 text-center">
          <span className="inline-flex items-center gap-2 rounded-full bg-brand-orange-500/10 px-5 py-2 text-sm font-semibold text-brand-orange-400 ring-1 ring-brand-orange-500/30">
            🎖️ Service Disabled Veteran Owned Small Business
          </span>
          <p className="mt-3 text-sm text-brand-blue-200">
            Proudly certified and committed to serving the nation — in business and in healthcare.
          </p>
        </div>

        {/* Badge row */}
        <div className="flex flex-wrap items-center justify-center gap-10">
          {badges.map((badge) => (
            <div
              key={badge.alt}
              className="flex items-center justify-center rounded-xl bg-white/5 p-4 ring-1 ring-white/10 backdrop-blur-sm transition hover:bg-white/10"
            >
              <Image
                src={badge.src}
                alt={badge.alt}
                width={badge.width}
                height={110}
                className="h-24 w-auto object-contain"
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
