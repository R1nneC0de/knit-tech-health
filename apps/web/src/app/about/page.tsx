import { ShieldCheck, Headset, Heart, Award, MapPin, Building2, Users } from 'lucide-react';
import Link from 'next/link';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'About Us — KnitTech Inc',
  description:
    'KnitTech Inc — Service Disabled Veteran Owned Small Business (SDVOSB) delivering healthcare staffing, medical equipment, and IT solutions nationwide.',
};

const values = [
  {
    icon: ShieldCheck,
    title: 'Quality',
    description:
      'Every product and placement meets rigorous standards. We partner with trusted manufacturers and credentialed professionals to deliver what healthcare demands.',
  },
  {
    icon: Headset,
    title: 'Service',
    description:
      'From equipment sourcing to staffing placement, our team provides personalized support — Monday through Friday, 7 am to 8 pm CST.',
  },
  {
    icon: Heart,
    title: 'Trust',
    description:
      'Healthcare organizations count on us for reliable equipment, qualified professionals, and transparent, honest business practices.',
  },
];

const team = [
  { name: 'Suresh Bhandari', title: 'President & CEO' },
  { name: 'Andy Silver', title: 'Business Development Manager' },
  { name: 'Celine Marie', title: 'Healthcare Sales Director' },
  { name: 'Priscilla Foster', title: 'HR Manager' },
  { name: 'Ram Thomas', title: 'Strategic Solutions, AVP' },
];

const stateClients = ['Texas', 'Georgia', 'Mississippi', 'Florida', 'Connecticut', 'Ohio', 'Indiana'];

export default function AboutPage() {
  return (
    <>
      {/* Hero */}
      <section className="bg-gradient-to-br from-brand-blue-900 to-brand-blue-800 py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl">
            <span className="inline-block rounded-full bg-brand-orange-500/15 px-4 py-1.5 text-sm font-semibold text-brand-orange-400 ring-1 ring-brand-orange-500/30">
              KnitTech Inc — Technology + Healthcare
            </span>
            <h1 className="mt-4 font-heading text-4xl font-bold text-white sm:text-5xl">
              About KnitTech Inc
            </h1>
            <p className="mt-4 text-base text-brand-blue-200">
              A Service Disabled Veteran Owned Small Business (SDVOSB) delivering
              healthcare staffing, medical equipment, and IT solutions to government
              agencies, hospitals, and healthcare organizations across the United States.
            </p>
            <div className="mt-6 flex flex-wrap gap-3">
              <span className="inline-flex items-center gap-1.5 rounded-full bg-brand-orange-500/20 px-4 py-1.5 text-sm font-semibold text-brand-orange-300 ring-1 ring-brand-orange-500/40">
                🎖️ SDVOSB Certified
              </span>
              <span className="inline-flex items-center gap-1.5 rounded-full bg-white/10 px-3 py-1 text-sm font-medium text-white ring-1 ring-white/20">
                🤝 VetHUB Certified Partner
              </span>
              <span className="inline-flex items-center gap-1.5 rounded-full bg-white/10 px-3 py-1 text-sm font-medium text-white ring-1 ring-white/20">
                ✓ Texas Approved Vendor
              </span>
              <span className="inline-flex items-center gap-1.5 rounded-full bg-white/10 px-3 py-1 text-sm font-medium text-white ring-1 ring-white/20">
                🏛️ SBA Certified · CAGE: 8UU52
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* Mission */}
      <section className="bg-white py-16">
        <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
          <h2 className="font-heading text-3xl font-bold text-brand-blue-900">Our Mission</h2>
          <p className="mt-6 text-base leading-relaxed text-gray-600">
            We specialize in healthcare technology and solutions — including staffing services and
            placement of physicians, healthcare leaders, Advanced Practice RNs, physician assistants,
            and travel nurses — connecting the right talent with the right facilities across America.
          </p>
          <p className="mt-4 text-base leading-relaxed text-gray-600">
            Beyond staffing, our medical equipment division simplifies procurement for government
            agencies, hospitals, and specialty clinics. Our IT solutions division (Nepstaff) delivers
            application development, managed services, and government contracting support nationwide.
            Flexibility, quality, and veteran integrity guide everything we do.
          </p>
        </div>
      </section>

      {/* SDVOSB Credentials */}
      <section className="bg-brand-blue-700 py-14">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4 text-center">
            {[
              { icon: Award, label: 'SDVOSB Certified', sub: 'Service Disabled Veterans Owned Small Business' },
              { icon: ShieldCheck, label: 'TX State Approved Vendor', sub: 'Official State of Texas procurement partner' },
              { icon: Building2, label: 'Top Gov. Contractor', sub: 'Top-ranked public sector contract holder' },
              { icon: MapPin, label: '7+ States Served', sub: 'TX · GA · MS · FL · CT · OH · IN' },
            ].map((item) => (
              <div key={item.label} className="flex flex-col items-center">
                <item.icon className="h-8 w-8 text-brand-orange-300" />
                <p className="mt-3 font-heading text-lg font-bold text-white">{item.label}</p>
                <p className="mt-1 text-sm text-brand-blue-200">{item.sub}</p>
              </div>
            ))}
          </div>
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
              <div key={v.title} className="rounded-xl bg-white p-8 text-center shadow-sm">
                <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-brand-orange-50">
                  <v.icon className="h-8 w-8 text-brand-orange-500" />
                </div>
                <h3 className="mt-6 font-heading text-xl font-semibold text-brand-blue-800">{v.title}</h3>
                <p className="mt-3 leading-relaxed text-gray-600">{v.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* State clients */}
      <section className="bg-white py-14">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 text-center">
          <p className="text-xs font-semibold uppercase tracking-widest text-gray-400">Clients We Serve</p>
          <h2 className="mt-2 font-heading text-2xl font-bold text-brand-blue-900">State Government Clients on Record</h2>
          <div className="mt-6 flex flex-wrap justify-center gap-3">
            {stateClients.map((s) => (
              <span key={s} className="rounded-full border border-brand-blue-200 bg-brand-blue-50 px-5 py-2 text-sm font-semibold text-brand-blue-800">
                {s}
              </span>
            ))}
          </div>
          <p className="mt-4 text-sm text-gray-500">
            Named partners: Grady Hospitals · Experis · DIR (Texas) · Madrin · Bastil
          </p>
        </div>
      </section>

      {/* Team */}
      <section className="bg-brand-blue-50/50 py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h2 className="font-heading text-3xl font-bold text-brand-blue-900">Our Team</h2>
            <p className="mx-auto mt-4 max-w-2xl text-gray-600">
              Experienced professionals across healthcare, business development, and technology —
              united by a commitment to service and veteran-owned integrity.
            </p>
          </div>
          <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {team.map((member) => (
              <div key={member.name} className="flex items-center gap-4 rounded-xl border border-gray-100 bg-white p-6 shadow-sm">
                <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-brand-blue-100 to-brand-orange-100">
                  <Users className="h-7 w-7 text-brand-blue-600" />
                </div>
                <div>
                  <p className="font-heading font-semibold text-brand-blue-900">{member.name}</p>
                  <p className="mt-0.5 text-sm text-gray-500">{member.title}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="bg-brand-blue-700 py-14">
        <div className="mx-auto max-w-7xl px-4 text-center sm:px-6 lg:px-8">
          <h2 className="font-heading text-2xl font-bold text-white">Work With Us</h2>
          <p className="mx-auto mt-3 max-w-xl text-brand-blue-200">
            Whether you need medical equipment, qualified clinicians, or government IT services —
            we&apos;re ready to be your trusted partner.
          </p>
          <Link
            href="/contact"
            className="mt-6 inline-block rounded-lg bg-brand-orange-500 px-10 py-3 font-semibold text-white transition hover:bg-brand-orange-600"
          >
            Get in Touch
          </Link>
        </div>
      </section>
    </>
  );
}
