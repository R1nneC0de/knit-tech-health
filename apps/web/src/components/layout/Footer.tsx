import Link from 'next/link';
import Image from 'next/image';
import { Phone, Mail, MapPin } from 'lucide-react';

const divisions = [
  { href: '/shop-medical', label: 'Medical Equipment' },
  { href: '/staffing', label: 'Healthcare Staffing' },
  { href: '/it-solutions', label: 'IT Solutions' },
];

const company = [
  { href: '/about', label: 'About Us' },
  { href: '/contact', label: 'Contact' },
  { href: '/shop-medical', label: 'Shop' },
];

export default function Footer() {
  return (
    <footer className="bg-brand-blue-900 text-gray-300">
      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
          {/* Brand */}
          <div>
            <div className="mb-4 inline-block rounded-xl bg-white px-3 py-2">
              <Image
                src="/logo.jpeg"
                alt="KTI Health"
                width={0}
                height={0}
                sizes="100vw"
                className="h-9 w-auto object-contain"
              />
            </div>
            <p className="text-sm leading-relaxed">
              Premium healthcare and technology solutions — medical equipment,
              staffing, and IT services under one unified brand.
            </p>
          </div>

          {/* Divisions */}
          <div>
            <h3 className="mb-4 font-heading text-sm font-semibold uppercase tracking-wider text-white">
              Divisions
            </h3>
            <ul className="space-y-2">
              {divisions.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm transition hover:text-brand-teal-300"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Company */}
          <div>
            <h3 className="mb-4 font-heading text-sm font-semibold uppercase tracking-wider text-white">
              Company
            </h3>
            <ul className="space-y-2">
              {company.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm transition hover:text-brand-teal-300"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="mb-4 font-heading text-sm font-semibold uppercase tracking-wider text-white">
              Contact Us
            </h3>
            <ul className="space-y-3 text-sm">
              <li className="flex items-start gap-2">
                <Phone className="mt-0.5 h-4 w-4 shrink-0 text-brand-teal-400" />
                (555) 123-4567
              </li>
              <li className="flex items-start gap-2">
                <Mail className="mt-0.5 h-4 w-4 shrink-0 text-brand-teal-400" />
                info@knittechinc.com
              </li>
              <li className="flex items-start gap-2">
                <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-brand-teal-400" />
                123 Medical Drive, Suite 100
                <br />
                Atlanta, GA 30301
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="border-t border-brand-blue-800">
        <div className="mx-auto max-w-7xl px-4 py-4 sm:px-6 lg:px-8">
          <p className="text-center text-xs text-gray-400">
            &copy; {new Date().getFullYear()} KTI Health / KnitTechInc. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
