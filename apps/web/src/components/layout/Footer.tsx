import Link from 'next/link';
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

const entityCodes = [
  { label: 'UEI', value: 'JMFKNLXXFN32' },
  { label: 'CAGE', value: '8MAJ5' },
  { label: 'DUNS', value: '117251766' },
];

export default function Footer() {
  return (
    <footer className="bg-brand-blue-900 text-gray-300">
      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
          {/* Brand */}
          <div>
            <p className="text-xs font-semibold uppercase tracking-widest text-brand-orange-400">
              Technology + Healthcare
            </p>
            <p className="mt-3 text-sm leading-relaxed">
              Veteran-owned company delivering medical equipment, healthcare
              staffing, and enterprise IT solutions nationwide.
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
                    className="text-sm transition hover:text-brand-orange-300"
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
                    className="text-sm transition hover:text-brand-orange-300"
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
                <Phone className="mt-0.5 h-4 w-4 shrink-0 text-brand-orange-400" />
                (832) 205-8542
              </li>
              <li className="flex items-start gap-2">
                <Mail className="mt-0.5 h-4 w-4 shrink-0 text-brand-orange-400" />
                sales@knittechinc.com
              </li>
              <li className="flex items-start gap-2">
                <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-brand-orange-400" />
                <span>KNITTECH INC<br />2901 Wilcrest Dr, STE 515<br />Houston, TX 77042</span>
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="border-t border-brand-blue-800">
        <div className="mx-auto max-w-7xl px-4 py-5 sm:px-6 lg:px-8">
          <div className="flex flex-col items-center gap-2 text-center sm:flex-row sm:justify-between sm:text-left">
            <p className="text-xs font-semibold uppercase tracking-wider text-white">
              KNITTECH INC
            </p>
            <p className="text-xs font-medium text-brand-orange-400">
              🎖️ Service Disabled Veteran Owned Small Business (SDVOSB)
            </p>
          </div>

          <dl className="mt-3 flex flex-col items-center gap-1 text-xs text-gray-400 sm:flex-row sm:flex-wrap sm:gap-x-6">
            {entityCodes.map((code) => (
              <div key={code.label} className="flex items-center gap-1.5">
                <dt className="font-semibold uppercase tracking-wider text-gray-300">
                  {code.label}
                </dt>
                <dd className="font-mono">{code.value}</dd>
              </div>
            ))}
          </dl>

          <p className="mt-3 text-xs text-gray-500">
            &copy; {new Date().getFullYear()} KnitTech Inc. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
