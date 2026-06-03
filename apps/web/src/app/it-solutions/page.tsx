import Link from 'next/link';
import {
  Network,
  Cloud,
  ShieldCheck,
  Monitor,
  CheckCircle,
  Code2,
  Smartphone,
  Zap,
  Users,
  Megaphone,
  Cpu,
  ClipboardList,
  Settings,
  GraduationCap,
  Building2,
  Mail,
  Phone,
} from 'lucide-react';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'IT Solutions — KnitTech Inc',
  description:
    'Government IT & healthcare technology solutions from KnitTech Inc (Nepstaff). SDVOSB-certified. Application development, infrastructure, managed services, and more.',
};

const services = [
  {
    icon: Code2,
    title: 'Application Development & Maintenance',
    description:
      'End-to-end application development and ongoing maintenance — from requirements through deployment and support.',
  },
  {
    icon: Network,
    title: 'Infrastructure Services',
    description:
      '24×7 infrastructure support strategy. High-availability design, monitoring, and management for mission-critical environments.',
  },
  {
    icon: Zap,
    title: 'QA Automation & Testing',
    description:
      'Automated quality assurance and testing services to accelerate release cycles and ensure software reliability.',
  },
  {
    icon: Users,
    title: 'Recruitment Process Outsourcing',
    description:
      'Strategic recruitment solutions — we source, screen, and deliver qualified technology and healthcare talent.',
  },
  {
    icon: Smartphone,
    title: 'Website & Mobile Development',
    description:
      'Professional website design and native iOS + Android app development for healthcare and government clients.',
  },
  {
    icon: Megaphone,
    title: 'Digital Marketing & Strategy',
    description:
      'Data-driven digital marketing strategy to grow your online presence and reach the right audiences.',
  },
  {
    icon: Cpu,
    title: 'Internet of Things (IoT)',
    description:
      'IoT consulting and implementation — connecting devices, sensors, and systems to unlock operational intelligence.',
  },
  {
    icon: ClipboardList,
    title: 'Project Management',
    description:
      'Agile project management methodology ensuring on-time, on-budget delivery for technology initiatives of any scale.',
  },
  {
    icon: Settings,
    title: 'Managed Services',
    description:
      'Fully managed IT services with proactive monitoring, maintenance, and 24×5 operational support.',
  },
  {
    icon: Monitor,
    title: 'Express Vendor Management System',
    description:
      'Our proprietary vendor management platform for streamlined procurement, compliance tracking, and supplier oversight.',
  },
  {
    icon: Cloud,
    title: 'Healthcare IT & EHR Integration',
    description:
      'EHR/EMR integration, clinical system support, and HIPAA-compliant cloud solutions tailored for healthcare organizations.',
  },
  {
    icon: GraduationCap,
    title: 'On-Demand Training',
    description:
      'IT and project management training via our Upskillhire.com partnership — online, on-demand, and role-ready.',
  },
];

const govHighlights = [
  'Top-ranked U.S. government contract holder',
  'DIR contract holder — Texas Dept. of Information Resources',
  'Service Disabled Veterans Owned Small Business (SDVOSB)',
  'State of Texas approved vendor',
  'Serving public sector entities across all 50 states',
  '24×5 operations team with rapid response SLAs',
];

export default function ITSolutionsPage() {
  return (
    <>
      {/* Hero */}
      <section className="bg-brand-blue-900 py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl">
            <span className="inline-block rounded-full bg-brand-blue-800 px-4 py-1 text-sm font-semibold text-brand-blue-200 ring-1 ring-brand-blue-600">
              IT Solutions Division
            </span>
            <h1 className="mt-4 font-heading text-4xl font-bold text-white sm:text-5xl">
              Trusted Government IT &{' '}
              <span className="text-brand-orange-400">Healthcare Technology</span>
            </h1>
            <p className="mt-6 text-base leading-relaxed text-brand-blue-200">
              KNITTECH INC delivers healthcare and IT services and
              products to government agencies, hospitals, and enterprises across the
              USA. Veteran-owned. Government-certified. Available Monday–Friday,
              7 am–8 pm CST.
            </p>
            <div className="mt-6 flex flex-wrap gap-3">
              <span className="inline-flex items-center gap-1.5 rounded-full border border-brand-blue-600 bg-brand-blue-800 px-3 py-1 text-sm font-medium text-white">
                🎖️ SDVOSB Certified
              </span>
              <span className="inline-flex items-center gap-1.5 rounded-full border border-brand-blue-600 bg-brand-blue-800 px-3 py-1 text-sm font-medium text-white">
                🏛️ Government Contract Holder
              </span>
              <span className="inline-flex items-center gap-1.5 rounded-full border border-brand-blue-600 bg-brand-blue-800 px-3 py-1 text-sm font-medium text-white">
                ✓ DIR — Texas Approved
              </span>
            </div>
            <div className="mt-8 flex flex-wrap gap-4">
              <Link
                href="/contact"
                className="rounded-lg bg-brand-blue-700 px-8 py-3 font-semibold text-white transition hover:bg-brand-blue-800"
              >
                Get a Consultation
              </Link>
              <Link
                href="/contact"
                className="rounded-lg border-2 border-white px-8 py-3 font-semibold text-white transition hover:bg-brand-blue-800"
              >
                Request a Quote
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Services grid */}
      <section className="bg-white py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <p className="text-sm font-semibold uppercase tracking-wider text-brand-orange-500">What We Do</p>
            <h2 className="mt-2 font-heading text-3xl font-bold text-brand-blue-900">
              Full-Spectrum IT & Technology Services
            </h2>
            <p className="mx-auto mt-4 max-w-2xl text-base text-gray-600">
              From application development to managed services — one partner, every technology need.
            </p>
          </div>
          <div className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {services.map((service) => (
              <div
                key={service.title}
                className="rounded-xl bg-white p-6 shadow-sm ring-1 ring-gray-100 transition hover:shadow-md"
              >
                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-brand-orange-50">
                  <service.icon className="h-6 w-6 text-brand-orange-500" />
                </div>
                <h3 className="mt-4 font-heading text-lg font-semibold text-brand-blue-900">
                  {service.title}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-gray-600">
                  {service.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Government contracting section */}
      <section className="bg-brand-blue-50/50 py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid items-center gap-12 lg:grid-cols-2">
            <div>
              <p className="text-sm font-semibold uppercase tracking-wider text-brand-orange-500">Government Contracting</p>
              <h2 className="mt-2 font-heading text-3xl font-bold text-brand-blue-900">
                A Top-Ranked Public Sector Partner
              </h2>
              <p className="mt-4 text-base leading-relaxed text-gray-600">
                As a Service Disabled Veterans Owned Small Business (SDVOSB) and
                top-ranked government contract holder, we serve public sector
                entities across all 50 states — from state agencies to federal
                healthcare facilities.
              </p>
              <ul className="mt-8 space-y-4">
                {govHighlights.map((item) => (
                  <li key={item} className="flex items-start gap-3">
                    <CheckCircle className="mt-0.5 h-5 w-5 shrink-0 text-brand-orange-500" />
                    <span className="text-gray-700">{item}</span>
                  </li>
                ))}
              </ul>
            </div>
            <div className="rounded-2xl bg-brand-blue-700 p-10 text-white">
              <Building2 className="h-12 w-12 text-brand-orange-300" />
              <h3 className="mt-4 font-heading text-2xl font-bold">State Clients on Record</h3>
              <p className="mt-2 text-brand-blue-200">
                Texas · Georgia · Mississippi · Florida · Connecticut · Ohio · Indiana
              </p>
              <div className="mt-6 border-t border-brand-blue-600 pt-6">
                <p className="text-sm text-brand-blue-200">Named partners include:</p>
                <p className="mt-1 font-semibold">Grady Hospitals · Experis · DIR (Texas) · Madrin · Bastil</p>
              </div>
              <div className="mt-6 space-y-2 text-sm">
                <a href="mailto:sales@knittechinc.com" className="flex items-center gap-2 text-brand-orange-300 hover:text-white">
                  <Mail className="h-4 w-4 shrink-0" /> sales@knittechinc.com
                </a>
                <a href="tel:8322058542" className="flex items-center gap-2 text-brand-orange-300 hover:text-white">
                  <Phone className="h-4 w-4 shrink-0" /> (832) 205-8542
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Banner */}
      <section className="bg-brand-blue-700 py-16">
        <div className="mx-auto max-w-7xl px-4 text-center sm:px-6 lg:px-8">
          <h2 className="font-heading text-3xl font-bold text-white">
            Ready to Modernize Your Technology?
          </h2>
          <p className="mx-auto mt-4 max-w-xl text-base text-brand-blue-200">
            Our technology consultants are ready to assess your needs and design
            solutions that fit your organization&apos;s goals and compliance
            requirements. Available Mon–Fri, 7 am–8 pm CST.
          </p>
          <Link
            href="/contact"
            className="mt-8 inline-block rounded-lg bg-brand-orange-500 px-10 py-3 font-semibold text-white transition hover:bg-brand-orange-600"
          >
            Schedule a Consultation
          </Link>
        </div>
      </section>
    </>
  );
}
