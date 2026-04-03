'use client';

import Link from 'next/link';
import { useState } from 'react';
import { Menu, X, Heart, ShoppingCart, User, LogOut } from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';
import { useCart } from '@/contexts/CartContext';

const navLinks = [
  { href: '/', label: 'Home' },
  { href: '/shop-medical', label: 'Shop' },
  { href: '/about', label: 'About' },
  { href: '/contact', label: 'Contact' },
];

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const [userMenuOpen, setUserMenuOpen] = useState(false);
  const { user, logout } = useAuth();
  const { itemCount } = useCart();

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

          {user ? (
            <>
              {/* Cart icon */}
              <Link href="/cart" className="relative">
                <ShoppingCart className="h-6 w-6 text-brand-blue-700 transition hover:text-brand-pink-500" />
                {itemCount > 0 && (
                  <span className="absolute -right-2 -top-2 flex h-5 w-5 items-center justify-center rounded-full bg-brand-pink-500 text-xs font-bold text-white">
                    {itemCount > 9 ? '9+' : itemCount}
                  </span>
                )}
              </Link>

              {/* User menu */}
              <div className="relative">
                <button
                  onClick={() => setUserMenuOpen(!userMenuOpen)}
                  className="flex items-center gap-2 rounded-lg border border-gray-200 px-3 py-2 text-sm font-medium text-brand-blue-700 transition hover:bg-brand-blue-50"
                >
                  <User className="h-4 w-4" />
                  {user.firstName}
                </button>
                {userMenuOpen && (
                  <div className="absolute right-0 mt-2 w-48 rounded-xl border border-gray-100 bg-white py-1 shadow-lg">
                    <Link
                      href="/orders"
                      onClick={() => setUserMenuOpen(false)}
                      className="flex items-center gap-2 px-4 py-2 text-sm text-brand-blue-700 hover:bg-brand-blue-50"
                    >
                      Order History
                    </Link>
                    <button
                      onClick={() => { logout(); setUserMenuOpen(false); }}
                      className="flex w-full items-center gap-2 px-4 py-2 text-sm text-red-500 hover:bg-red-50"
                    >
                      <LogOut className="h-4 w-4" />
                      Sign Out
                    </button>
                  </div>
                )}
              </div>
            </>
          ) : (
            <>
              <Link
                href="/login"
                className="text-sm font-medium text-brand-blue-700 transition hover:text-brand-pink-500"
              >
                Sign In
              </Link>
              <Link
                href="/register"
                className="rounded-lg bg-brand-blue-700 px-5 py-2 text-sm font-semibold text-white transition hover:bg-brand-blue-800"
              >
                Get Started
              </Link>
            </>
          )}
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
          {user ? (
            <>
              <Link
                href="/cart"
                onClick={() => setOpen(false)}
                className="flex items-center gap-2 py-3 text-sm font-medium text-brand-blue-700"
              >
                <ShoppingCart className="h-4 w-4" />
                Cart {itemCount > 0 && `(${itemCount})`}
              </Link>
              <Link
                href="/orders"
                onClick={() => setOpen(false)}
                className="block py-3 text-sm font-medium text-brand-blue-700"
              >
                Order History
              </Link>
              <button
                onClick={() => { logout(); setOpen(false); }}
                className="mt-2 block w-full rounded-lg border border-red-200 py-2 text-center text-sm font-medium text-red-500"
              >
                Sign Out
              </button>
            </>
          ) : (
            <>
              <Link
                href="/login"
                onClick={() => setOpen(false)}
                className="block py-3 text-sm font-medium text-brand-blue-700"
              >
                Sign In
              </Link>
              <Link
                href="/register"
                onClick={() => setOpen(false)}
                className="mt-2 block rounded-lg bg-brand-blue-700 px-5 py-2 text-center text-sm font-semibold text-white"
              >
                Get Started
              </Link>
            </>
          )}
        </nav>
      )}
    </header>
  );
}
