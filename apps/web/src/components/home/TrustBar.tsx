const stats = [
  { value: '500+', label: 'Partner Facilities' },
  { value: '90+', label: 'Medical Products' },
  { value: '5,000+', label: 'Healthcare Professionals Placed' },
  { value: '15+', label: 'Years of Experience' },
];

export default function TrustBar() {
  return (
    <section className="bg-brand-blue-700 py-12">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 gap-8 sm:grid-cols-4">
          {stats.map((stat) => (
            <div key={stat.label} className="text-center">
              <div className="font-heading text-3xl font-bold text-white sm:text-4xl">
                {stat.value}
              </div>
              <div className="mt-1 text-sm text-brand-blue-200">{stat.label}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
