import Link from 'next/link';
import { Heart, Phone, Mail, MapPin } from 'lucide-react';

const quickLinks = [
  { href: '/', label: 'Home' },
  { href: '/shop-medical', label: 'Shop Equipment' },
  { href: '/about', label: 'About Us' },
  { href: '/contact', label: 'Contact' },
];

const categories = [
  { href: '/shop-medical?category=mobility', label: 'Mobility' },
  { href: '/shop-medical?category=respiratory', label: 'Respiratory' },
  { href: '/shop-medical?category=ppe', label: 'PPE' },
  { href: '/shop-medical?category=diagnostic-equipment', label: 'Diagnostics' },
];

export default function Footer() {
  return (
    <footer className="bg-brand-blue-900 text-gray-300">
      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
          {/* Company */}
          <div>
            <div className="mb-4 flex items-center gap-2">
              <Heart className="h-6 w-6 text-brand-pink-400" />
              <span className="font-heading text-lg font-bold text-white">
                Knit Tech Health
              </span>
            </div>
            <p className="text-sm leading-relaxed">
              Trusted medical equipment solutions for healthcare providers.
              Quality products, expert support, competitive pricing.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="mb-4 font-heading text-sm font-semibold uppercase tracking-wider text-white">
              Quick Links
            </h3>
            <ul className="space-y-2">
              {quickLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm transition hover:text-brand-pink-300"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Categories */}
          <div>
            <h3 className="mb-4 font-heading text-sm font-semibold uppercase tracking-wider text-white">
              Categories
            </h3>
            <ul className="space-y-2">
              {categories.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm transition hover:text-brand-pink-300"
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
                <Phone className="mt-0.5 h-4 w-4 shrink-0 text-brand-pink-400" />
                (555) 123-4567
              </li>
              <li className="flex items-start gap-2">
                <Mail className="mt-0.5 h-4 w-4 shrink-0 text-brand-pink-400" />
                info@knittechhealth.com
              </li>
              <li className="flex items-start gap-2">
                <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-brand-pink-400" />
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
            &copy; {new Date().getFullYear()} Knit Tech Health. All rights
            reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
