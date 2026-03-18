'use client';

import Link from 'next/link';
import { useState } from 'react';
import { Menu, X, Heart } from 'lucide-react';

const navLinks = [
  { href: '/', label: 'Home' },
  { href: '/shop', label: 'Shop' },
  { href: '/about', label: 'About' },
  { href: '/contact', label: 'Contact' },
];

export default function Navbar() {
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 border-b border-gray-100 bg-white shadow-sm">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2">
          <Heart className="h-7 w-7 text-brand-pink-500" />
          <span className="font-heading text-xl font-bold text-brand-blue-700">
            Knit Tech Health
          </span>
        </Link>

        {/* Desktop nav */}
        <nav className="hidden items-center gap-8 md:flex">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="text-sm font-medium text-brand-blue-700 transition hover:text-brand-pink-500"
            >
              {link.label}
            </Link>
          ))}
          <Link
            href="/shop"
            className="rounded-lg bg-brand-blue-700 px-5 py-2 text-sm font-semibold text-white transition hover:bg-brand-blue-800"
          >
            Request Equipment
          </Link>
        </nav>

        {/* Mobile toggle */}
        <button
          onClick={() => setOpen(!open)}
          className="md:hidden"
          aria-label="Toggle menu"
        >
          {open ? (
            <X className="h-6 w-6 text-brand-blue-700" />
          ) : (
            <Menu className="h-6 w-6 text-brand-blue-700" />
          )}
        </button>
      </div>

      {/* Mobile nav */}
      {open && (
        <nav className="border-t border-gray-100 bg-white px-4 pb-4 md:hidden">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              onClick={() => setOpen(false)}
              className="block py-3 text-sm font-medium text-brand-blue-700"
            >
              {link.label}
            </Link>
          ))}
          <Link
            href="/shop"
            onClick={() => setOpen(false)}
            className="mt-2 block rounded-lg bg-brand-blue-700 px-5 py-2 text-center text-sm font-semibold text-white"
          >
            Request Equipment
          </Link>
        </nav>
      )}
    </header>
  );
}
