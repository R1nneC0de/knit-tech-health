'use client';

import { useSearchParams, useRouter } from 'next/navigation';
import { useState, useEffect, Suspense, useMemo } from 'react';
import {
  Search, X, Building2, Clock, ShieldCheck, Phone, Mail,
  CheckCircle, ClipboardList, Truck, Globe, Layers,
} from 'lucide-react';
import { useProducts, useCategories } from '@/hooks/useProducts';
import ProductCard from '@/components/shop/ProductCard';
import type { Product } from '@kth/shared';
import { useAuth } from '@/contexts/AuthContext';
import { apiFetch, authApiFetch } from '@/lib/api';

// Excluded from display — cardiac/high-risk devices outside our distribution scope
const EXCLUDED_CATEGORY_SLUGS = new Set(['defibrillators']);

// Top-selling categories: one product from each surfaces first when browsing "All"
const TOP_SELLER_CATEGORY_SLUGS = [
  'mobility',
  'diagnostic-equipment',
  'ppe',
  'wound-care',
  'bath-safety',
];

// LICENSE GATE: flip to true once distribution licenses are obtained
const SHOW_PRODUCT_CATALOG = false;

const INQUIRY_INITIAL = {
  firstName: '', lastName: '', email: '',
  phone: '', organization: '',
  equipmentNeeded: '', message: '',
};

function ShopContent() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const activeCategory = searchParams.get('category') || '';
  const [search, setSearch] = useState(searchParams.get('search') || '');
  const [debouncedSearch, setDebouncedSearch] = useState(search);

  useEffect(() => {
    const t = setTimeout(() => setDebouncedSearch(search), 300);
    return () => clearTimeout(t);
  }, [search]);

  const { data: categories } = useCategories();
  const { data: products, isLoading } = useProducts({
    category: activeCategory || undefined,
    search: debouncedSearch || undefined,
  });

  // Exclude heart-related categories from the filter nav
  const displayCategories = useMemo(
    () => categories?.filter(c => !EXCLUDED_CATEGORY_SLUGS.has(c.slug)),
    [categories],
  );

  // Filter: remove excluded categories and Class 3 (high-risk) devices.
  // When no category filter is active, promote one product per top-seller category
  // to the first five slots so popular items are immediately visible.
  const displayProducts = useMemo((): Product[] => {
    if (!products) return [];

    const filtered = products.filter(p => {
      if (EXCLUDED_CATEGORY_SLUGS.has(p.category?.slug ?? '')) return false;
      const deviceClass = (p.specifications as Record<string, string>)?.['Device Class'];
      if (deviceClass === 'Class 3') return false;
      return true;
    });

    if (!activeCategory) {
      const topSellers: Product[] = [];
      for (const slug of TOP_SELLER_CATEGORY_SLUGS) {
        const match = filtered.find(p => p.category?.slug === slug);
        if (match) topSellers.push(match);
      }
      const topIds = new Set(topSellers.map(p => p.id));
      return [...topSellers, ...filtered.filter(p => !topIds.has(p.id))];
    }

    return filtered;
  }, [products, activeCategory]);

  function setCategory(slug: string) {
    const params = new URLSearchParams(searchParams.toString());
    if (slug) params.set('category', slug);
    else params.delete('category');
    router.push(`/shop-medical?${params.toString()}`);
  }

  const { user, accessToken } = useAuth();

  const [inquiryForm, setInquiryForm] = useState(INQUIRY_INITIAL);
  const [inquiryErrors, setInquiryErrors] = useState<Partial<typeof INQUIRY_INITIAL>>({});
  const [inquirySubmitting, setInquirySubmitting] = useState(false);
  const [inquirySuccess, setInquirySuccess] = useState(false);
  const [inquiryServerError, setInquiryServerError] = useState('');

  useEffect(() => {
    if (user) {
      setInquiryForm(prev => ({
        ...prev,
        firstName: user.firstName ?? '',
        lastName: user.lastName ?? '',
        email: user.email ?? '',
      }));
    }
  }, [user]);

  function validateInquiry() {
    const e: Partial<typeof INQUIRY_INITIAL> = {};
    if (!inquiryForm.firstName.trim()) e.firstName = 'First name is required';
    if (!inquiryForm.lastName.trim()) e.lastName = 'Last name is required';
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(inquiryForm.email)) e.email = 'Valid email is required';
    if (!inquiryForm.phone.trim()) e.phone = 'Phone number is required';
    if (!inquiryForm.equipmentNeeded.trim()) e.equipmentNeeded = 'Please describe the equipment you need';
    setInquiryErrors(e);
    return Object.keys(e).length === 0;
  }

  async function handleInquirySubmit(ev: React.FormEvent) {
    ev.preventDefault();
    if (!validateInquiry()) return;
    setInquirySubmitting(true);
    setInquiryServerError('');
    try {
      const payload = {
        firstName: inquiryForm.firstName,
        lastName: inquiryForm.lastName,
        email: inquiryForm.email,
        phone: inquiryForm.phone || undefined,
        subject: `Equipment Inquiry: ${inquiryForm.equipmentNeeded.slice(0, 60)}`,
        message: [
          `Equipment Needed: ${inquiryForm.equipmentNeeded}`,
          inquiryForm.organization ? `Organization: ${inquiryForm.organization}` : null,
          inquiryForm.message ? `Additional Notes: ${inquiryForm.message}` : null,
        ].filter(Boolean).join('\n\n'),
      };
      if (accessToken) {
        await authApiFetch('/contact', accessToken, { method: 'POST', body: JSON.stringify(payload) });
      } else {
        await apiFetch('/contact', { method: 'POST', body: JSON.stringify(payload) });
      }
      setInquirySuccess(true);
    } catch (err) {
      setInquiryServerError(err instanceof Error ? err.message : 'Something went wrong. Please try again.');
    } finally {
      setInquirySubmitting(false);
    }
  }

  return (
    <div>
      {/* Hero / intro banner */}
      <div className="bg-brand-blue-900 border-b border-brand-blue-800 py-12">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col gap-8 lg:flex-row lg:items-center lg:justify-between">
            <div>
              <span className="inline-block rounded-full bg-brand-orange-100 px-4 py-1 text-sm font-semibold text-brand-orange-600">
                Medical Equipment Division
              </span>
              <h1 className="mt-3 font-heading text-3xl font-bold text-white sm:text-4xl">
                Medical, Dental & Hospital Equipment
              </h1>
              <p className="mt-3 max-w-xl text-brand-blue-200">
                Trusted distributor of medical, dental, and hospital equipment for government agencies, hospitals,
                and healthcare facilities across the United States. SDVOSB-certified. State of Texas approved vendor.
              </p>
              <div className="mt-4 flex flex-wrap gap-3">
                <span className="inline-flex items-center gap-1.5 rounded-full border border-brand-blue-600 bg-brand-blue-800 px-3 py-1 text-sm font-medium text-white">
                  🎖️ SDVOSB Certified
                </span>
                <span className="inline-flex items-center gap-1.5 rounded-full border border-brand-blue-600 bg-brand-blue-800 px-3 py-1 text-sm font-medium text-white">
                  ✓ TX State Approved Vendor
                </span>
                <span className="inline-flex items-center gap-1.5 rounded-full border border-brand-blue-600 bg-brand-blue-800 px-3 py-1 text-sm font-medium text-white">
                  🏛️ Government Contract Eligible
                </span>
              </div>
            </div>
            <div className="rounded-2xl border border-brand-orange-100 bg-white p-6 shadow-sm lg:min-w-[300px]">
              <p className="text-sm font-semibold uppercase tracking-wider text-brand-orange-500">Get a Quote</p>
              <p className="mt-2 font-heading text-2xl font-bold text-brand-blue-900">Within 1 Hour</p>
              <p className="mt-1 text-sm text-gray-500">Our dedicated procurement team responds fast.</p>
              <div className="mt-4 space-y-2 text-sm">
                <a href="mailto:sales@knittechinc.com" className="flex items-center gap-2 text-brand-blue-700 hover:text-brand-orange-500">
                  <Mail className="h-4 w-4 shrink-0" /> sales@knittechinc.com
                </a>
                <a href="tel:8322058542" className="flex items-center gap-2 text-brand-blue-700 hover:text-brand-orange-500">
                  <Phone className="h-4 w-4 shrink-0" /> (832) 205-8542
                </a>
              </div>
            </div>
          </div>

          {/* Facilities served */}
          <div className="mt-8">
            <p className="text-xs font-semibold uppercase tracking-widest text-brand-blue-300">Facilities We Serve</p>
            <div className="mt-3 flex flex-wrap gap-2">
              {[
                'Hospitals',
                'Surgery Centers',
                'Specialty Clinics',
                'Primary Care Practices',
                'Urgent Care Centers',
                'Dental Offices',
                'Long-Term Care Facilities',
                'Diagnostic Imaging Centers',
              ].map((f) => (
                <span key={f} className="flex items-center gap-1 rounded-lg bg-brand-blue-800 border border-brand-blue-600 px-3 py-1.5 text-sm text-white">
                  <Building2 className="h-3.5 w-3.5 shrink-0 text-brand-orange-500" /> {f}
                </span>
              ))}
            </div>
          </div>

          {/* Value props */}
          <div className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-3">
            {[
              { icon: Clock, title: 'Quote in Under 1 Hour', desc: 'Dedicated procurement experts on standby M–F, 8 am–10 pm CST.' },
              { icon: ShieldCheck, title: 'SDVOSB & Gov Contract Ready', desc: 'Veteran-owned. Approved for state and federal procurement.' },
              { icon: Building2, title: 'All Healthcare Settings', desc: 'Hospitals, clinics, dental, long-term care, imaging, and more.' },
            ].map((vp) => (
              <div key={vp.title} className="flex gap-3 rounded-xl border border-gray-100 bg-white p-4 shadow-sm">
                <vp.icon className="mt-0.5 h-5 w-5 shrink-0 text-brand-orange-500" />
                <div>
                  <p className="text-sm font-semibold text-brand-blue-900">{vp.title}</p>
                  <p className="mt-0.5 text-xs text-gray-500">{vp.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {SHOW_PRODUCT_CATALOG && (
        <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
          <h2 className="font-heading text-2xl font-bold text-brand-blue-900">Browse Catalog</h2>
          <p className="mt-1 text-gray-600">
            Browse our full catalog and request the equipment you need.
          </p>

          {/* Search */}
          <div className="relative mt-6 max-w-md">
            <Search className="absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              placeholder="Search products..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full rounded-lg border border-gray-200 py-2.5 pl-10 pr-10 text-sm focus:border-brand-blue-400 focus:outline-none focus:ring-2 focus:ring-brand-blue-100"
            />
            {search && (
              <button
                onClick={() => setSearch('')}
                className="absolute right-3 top-1/2 -translate-y-1/2"
              >
                <X className="h-4 w-4 text-gray-400" />
              </button>
            )}
          </div>

          {/* Category filter */}
          <div className="mt-6 flex flex-wrap gap-2">
            <button
              onClick={() => setCategory('')}
              className={`rounded-full px-4 py-1.5 text-sm font-medium transition ${
                !activeCategory
                  ? 'bg-brand-blue-700 text-white'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              All
            </button>
            {displayCategories?.map((cat) => (
              <button
                key={cat.id}
                onClick={() => setCategory(cat.slug)}
                className={`rounded-full px-4 py-1.5 text-sm font-medium transition ${
                  activeCategory === cat.slug
                    ? 'bg-brand-blue-700 text-white'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                {cat.name}
              </button>
            ))}
          </div>

          {/* Product grid */}
          {isLoading ? (
            <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
              {Array.from({ length: 8 }).map((_, i) => (
                <div key={i} className="h-72 animate-pulse rounded-xl bg-gray-200" />
              ))}
            </div>
          ) : displayProducts.length > 0 ? (
            <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
              {displayProducts.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          ) : (
            <div className="mt-16 text-center">
              <p className="text-lg text-gray-500">No products found.</p>
              <p className="mt-1 text-sm text-gray-400">
                Try adjusting your search or category filter.
              </p>
            </div>
          )}
        </div>
      )}

      {!SHOW_PRODUCT_CATALOG && (
        <>
          {/* Section A: Intro */}
          <section className="bg-white py-14">
            <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
              <div className="max-w-3xl">
                <span className="inline-block rounded-full bg-brand-orange-100 px-4 py-1 text-sm font-semibold text-brand-orange-600">
                  Medical Equipment Procurement
                </span>
                <h2 className="mt-3 font-heading text-3xl font-bold text-brand-blue-900">
                  Modern Equipment, Trusted Standards
                </h2>
                <p className="mt-4 text-base leading-relaxed text-gray-600">
                  KTI Health sources FDA-cleared and ISO-compliant medical, dental, and hospital equipment for
                  government agencies, hospitals, specialty clinics, and long-term care facilities across the
                  United States. Every product we procure meets applicable federal and state regulatory
                  requirements — so your facility receives equipment you can trust from day one.
                </p>
                <p className="mt-4 text-base leading-relaxed text-gray-600">
                  As an SDVOSB-certified, Texas State Approved Vendor with GSA Schedule eligibility, we
                  streamline procurement for both government and private healthcare buyers. Submit a request
                  below and our dedicated procurement team will respond with sourcing options and pricing
                  within one business hour.
                </p>
              </div>
            </div>
          </section>

          {/* Section B: Comprehensive Equipment Sourcing — generic capability pillars */}
          <section className="bg-brand-blue-50/50 py-16">
            <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
              <div className="text-center">
                <h2 className="font-heading text-3xl font-bold text-brand-blue-900">
                  Comprehensive Equipment Sourcing
                </h2>
                <p className="mx-auto mt-3 max-w-2xl text-gray-600">
                  From routine supplies to complex capital equipment — our procurement team sources across
                  the full spectrum of medical, dental, and hospital equipment needs.
                </p>
              </div>
              <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                {[
                  {
                    icon: Globe,
                    title: 'Broad Procurement Reach',
                    desc: 'Access to thousands of medical-grade products from a vetted network of FDA-cleared and ISO-certified manufacturers and distributors.',
                  },
                  {
                    icon: Layers,
                    title: 'Custom Sourcing on Request',
                    desc: 'If you have a specific brand, model, or specification in mind, our team will locate it. No catalog limitation — we source to your requirements.',
                  },
                  {
                    icon: Building2,
                    title: 'Government & Institutional Expertise',
                    desc: 'Experienced in the complex procurement requirements of hospitals, government agencies, and multi-facility health systems.',
                  },
                  {
                    icon: ShieldCheck,
                    title: 'Quality Assurance',
                    desc: 'Every order is reviewed for regulatory compliance, documentation, and chain-of-custody integrity before fulfillment.',
                  },
                  {
                    icon: Truck,
                    title: 'Logistics Coordination',
                    desc: "We coordinate delivery and setup logistics tailored to your facility's receiving requirements and timeline.",
                  },
                  {
                    icon: ClipboardList,
                    title: 'Dedicated Account Support',
                    desc: 'A dedicated procurement specialist manages your requests from initial inquiry through delivery confirmation.',
                  },
                ].map((card) => (
                  <div key={card.title} className="rounded-xl border border-gray-100 bg-white p-6 shadow-sm">
                    <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-brand-blue-50">
                      <card.icon className="h-6 w-6 text-brand-blue-600" />
                    </div>
                    <h3 className="mt-4 font-heading text-lg font-semibold text-brand-blue-800">
                      {card.title}
                    </h3>
                    <p className="mt-1 text-sm leading-relaxed text-gray-500">{card.desc}</p>
                  </div>
                ))}
              </div>
            </div>
          </section>

          {/* Section C: How It Works */}
          <section className="bg-brand-blue-700 py-14">
            <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
              <h2 className="text-center font-heading text-2xl font-bold text-white">How It Works</h2>
              <p className="mx-auto mt-2 max-w-xl text-center text-brand-blue-200">
                Getting the equipment your facility needs is straightforward with KTI Health.
              </p>
              <div className="mt-10 grid gap-6 sm:grid-cols-3">
                {[
                  {
                    step: '01',
                    icon: ClipboardList,
                    title: 'Submit Your Request',
                    desc: 'Use the inquiry form below to describe the equipment you need — brand, quantity, specifications, or simply a general requirement.',
                  },
                  {
                    step: '02',
                    icon: Layers,
                    title: 'We Source & Quote',
                    desc: 'Our procurement team locates FDA-cleared, ISO-compliant equipment from verified suppliers and delivers a detailed quote within one business hour.',
                  },
                  {
                    step: '03',
                    icon: Truck,
                    title: 'Delivery & Setup',
                    desc: 'Approved orders are coordinated for delivery with full logistics support for government and institutional buyers.',
                  },
                ].map((s) => (
                  <div key={s.step} className="rounded-xl border border-brand-blue-600 bg-brand-blue-800 p-6">
                    <span className="font-heading text-4xl font-bold text-brand-orange-400 opacity-60">
                      {s.step}
                    </span>
                    <s.icon className="mt-3 h-6 w-6 text-brand-orange-300" />
                    <h3 className="mt-3 font-heading text-lg font-semibold text-white">{s.title}</h3>
                    <p className="mt-2 text-sm leading-relaxed text-brand-blue-200">{s.desc}</p>
                  </div>
                ))}
              </div>
            </div>
          </section>

          {/* Section D: Compliance & Standards */}
          <section className="border-y border-gray-100 bg-white py-12">
            <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
              <p className="text-center text-xs font-semibold uppercase tracking-widest text-gray-400">
                Compliance & Standards
              </p>
              <div className="mt-6 flex flex-wrap justify-center gap-4">
                {[
                  { label: 'FDA-Cleared Devices', sub: 'All distributed devices meet FDA clearance requirements' },
                  { label: 'ISO 13485 Suppliers', sub: 'Sourced from ISO 13485 certified manufacturers' },
                  { label: 'TX State Approved Vendor', sub: 'Official Texas state procurement partner' },
                  { label: 'SDVOSB Certified', sub: 'Service-Disabled Veteran Owned Small Business' },
                  { label: 'GSA Schedule Eligible', sub: 'Qualified for federal GSA procurement vehicles' },
                ].map((badge) => (
                  <div
                    key={badge.label}
                    className="flex flex-col items-center rounded-xl border border-brand-blue-100 bg-brand-blue-50 px-6 py-4 text-center shadow-sm"
                  >
                    <ShieldCheck className="h-5 w-5 text-brand-blue-500" />
                    <p className="mt-2 text-sm font-semibold text-brand-blue-800">{badge.label}</p>
                    <p className="mt-0.5 max-w-[180px] text-xs text-gray-500">{badge.sub}</p>
                  </div>
                ))}
              </div>
            </div>
          </section>

          {/* Section E: General Inquiry Form */}
          <section className="bg-brand-blue-50/50 py-16" id="inquiry-form">
            <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
              <div className="mb-8">
                <h2 className="font-heading text-3xl font-bold text-brand-blue-900">Request Equipment</h2>
                <p className="mt-2 text-gray-600">
                  Tell us what you need and our team will source it and deliver a quote within one business
                  hour — Monday through Friday, 8 am–10 pm CST.
                </p>
              </div>

              <div className="grid gap-8 lg:grid-cols-5">
                {/* Form column */}
                <div className="lg:col-span-3">
                  {inquirySuccess ? (
                    <div className="rounded-2xl border border-green-100 bg-white p-10 text-center shadow-sm">
                      <CheckCircle className="mx-auto h-14 w-14 text-green-500" />
                      <h3 className="mt-4 font-heading text-2xl font-bold text-brand-blue-900">
                        Request Received!
                      </h3>
                      <p className="mt-3 text-gray-600">
                        Thank you. Our procurement team will review your inquiry and follow up within{' '}
                        <strong>one business hour</strong> with sourcing options and pricing.
                      </p>
                      <button
                        onClick={() => {
                          setInquirySuccess(false);
                          setInquiryForm(INQUIRY_INITIAL);
                        }}
                        className="mt-6 rounded-lg border border-brand-blue-200 px-6 py-2 text-sm font-medium text-brand-blue-700 hover:bg-brand-blue-50"
                      >
                        Submit Another Request
                      </button>
                    </div>
                  ) : (
                    <form
                      onSubmit={handleInquirySubmit}
                      className="space-y-5 rounded-2xl border border-gray-100 bg-white p-8 shadow-sm"
                    >
                      {user && (
                        <div className="rounded-lg border border-brand-blue-100 bg-brand-blue-50 px-4 py-3 text-sm text-brand-blue-700">
                          Signed in as{' '}
                          <strong>
                            {user.firstName} {user.lastName}
                          </strong>{' '}
                          ({user.email}) — fields pre-filled from your account.
                        </div>
                      )}

                      {/* Name row */}
                      <div className="grid gap-4 sm:grid-cols-2">
                        <div>
                          <label className="block text-sm font-medium text-brand-blue-700">
                            First Name <span className="text-brand-orange-500">*</span>
                          </label>
                          <input
                            type="text"
                            value={inquiryForm.firstName}
                            onChange={(e) => setInquiryForm({ ...inquiryForm, firstName: e.target.value })}
                            className="mt-1 block w-full rounded-lg border border-gray-200 px-3 py-2.5 text-sm focus:border-brand-blue-400 focus:outline-none focus:ring-2 focus:ring-brand-blue-100"
                          />
                          {inquiryErrors.firstName && (
                            <p className="mt-1 text-xs text-red-500">{inquiryErrors.firstName}</p>
                          )}
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-brand-blue-700">
                            Last Name <span className="text-brand-orange-500">*</span>
                          </label>
                          <input
                            type="text"
                            value={inquiryForm.lastName}
                            onChange={(e) => setInquiryForm({ ...inquiryForm, lastName: e.target.value })}
                            className="mt-1 block w-full rounded-lg border border-gray-200 px-3 py-2.5 text-sm focus:border-brand-blue-400 focus:outline-none focus:ring-2 focus:ring-brand-blue-100"
                          />
                          {inquiryErrors.lastName && (
                            <p className="mt-1 text-xs text-red-500">{inquiryErrors.lastName}</p>
                          )}
                        </div>
                      </div>

                      {/* Email */}
                      <div>
                        <label className="block text-sm font-medium text-brand-blue-700">
                          Email Address <span className="text-brand-orange-500">*</span>
                        </label>
                        <input
                          type="email"
                          value={inquiryForm.email}
                          onChange={(e) => setInquiryForm({ ...inquiryForm, email: e.target.value })}
                          className="mt-1 block w-full rounded-lg border border-gray-200 px-3 py-2.5 text-sm focus:border-brand-blue-400 focus:outline-none focus:ring-2 focus:ring-brand-blue-100"
                        />
                        {inquiryErrors.email && (
                          <p className="mt-1 text-xs text-red-500">{inquiryErrors.email}</p>
                        )}
                      </div>

                      {/* Phone */}
                      <div>
                        <label className="block text-sm font-medium text-brand-blue-700">
                          Phone Number <span className="text-brand-orange-500">*</span>
                        </label>
                        <input
                          type="tel"
                          value={inquiryForm.phone}
                          onChange={(e) => setInquiryForm({ ...inquiryForm, phone: e.target.value })}
                          className="mt-1 block w-full rounded-lg border border-gray-200 px-3 py-2.5 text-sm focus:border-brand-blue-400 focus:outline-none focus:ring-2 focus:ring-brand-blue-100"
                        />
                        {inquiryErrors.phone && (
                          <p className="mt-1 text-xs text-red-500">{inquiryErrors.phone}</p>
                        )}
                      </div>

                      {/* Organization */}
                      <div>
                        <label className="block text-sm font-medium text-brand-blue-700">
                          Organization{' '}
                          <span className="text-xs font-normal text-gray-400">(optional)</span>
                        </label>
                        <input
                          type="text"
                          value={inquiryForm.organization}
                          onChange={(e) => setInquiryForm({ ...inquiryForm, organization: e.target.value })}
                          placeholder="Hospital, clinic, government agency..."
                          className="mt-1 block w-full rounded-lg border border-gray-200 px-3 py-2.5 text-sm focus:border-brand-blue-400 focus:outline-none focus:ring-2 focus:ring-brand-blue-100"
                        />
                      </div>

                      {/* Equipment Needed */}
                      <div>
                        <label className="block text-sm font-medium text-brand-blue-700">
                          Equipment Needed <span className="text-brand-orange-500">*</span>
                        </label>
                        <textarea
                          rows={4}
                          value={inquiryForm.equipmentNeeded}
                          onChange={(e) => setInquiryForm({ ...inquiryForm, equipmentNeeded: e.target.value })}
                          placeholder="Describe the equipment you need — type, quantity, brand preferences, or any specifications..."
                          className="mt-1 block w-full rounded-lg border border-gray-200 px-3 py-2.5 text-sm focus:border-brand-blue-400 focus:outline-none focus:ring-2 focus:ring-brand-blue-100"
                        />
                        {inquiryErrors.equipmentNeeded && (
                          <p className="mt-1 text-xs text-red-500">{inquiryErrors.equipmentNeeded}</p>
                        )}
                      </div>

                      {/* Additional Notes */}
                      <div>
                        <label className="block text-sm font-medium text-brand-blue-700">
                          Additional Notes{' '}
                          <span className="text-xs font-normal text-gray-400">(optional)</span>
                        </label>
                        <textarea
                          rows={3}
                          value={inquiryForm.message}
                          onChange={(e) => setInquiryForm({ ...inquiryForm, message: e.target.value })}
                          placeholder="Budget range, preferred timeline, compliance requirements..."
                          className="mt-1 block w-full rounded-lg border border-gray-200 px-3 py-2.5 text-sm focus:border-brand-blue-400 focus:outline-none focus:ring-2 focus:ring-brand-blue-100"
                        />
                      </div>

                      {inquiryServerError && (
                        <p className="text-sm text-red-500">{inquiryServerError}</p>
                      )}

                      <button
                        type="submit"
                        disabled={inquirySubmitting}
                        className="w-full rounded-lg bg-brand-orange-500 px-8 py-3 font-semibold text-white transition hover:bg-brand-orange-600 disabled:opacity-50"
                      >
                        {inquirySubmitting ? 'Submitting...' : 'Submit Equipment Request'}
                      </button>
                    </form>
                  )}
                </div>

                {/* Contact sidebar */}
                <div className="space-y-4 lg:col-span-2">
                  <div className="rounded-xl border border-brand-orange-100 bg-white p-6 shadow-sm">
                    <p className="text-sm font-semibold uppercase tracking-wider text-brand-orange-500">
                      Get a Quote
                    </p>
                    <p className="mt-2 font-heading text-2xl font-bold text-brand-blue-900">Within 1 Hour</p>
                    <p className="mt-1 text-sm text-gray-500">
                      Our dedicated procurement team responds fast.
                    </p>
                    <div className="mt-4 space-y-2 text-sm">
                      <a
                        href="mailto:sales@knittechinc.com"
                        className="flex items-center gap-2 text-brand-blue-700 hover:text-brand-orange-500"
                      >
                        <Mail className="h-4 w-4 shrink-0" /> sales@knittechinc.com
                      </a>
                      <a
                        href="tel:8322058542"
                        className="flex items-center gap-2 text-brand-blue-700 hover:text-brand-orange-500"
                      >
                        <Phone className="h-4 w-4 shrink-0" /> (832) 205-8542
                      </a>
                    </div>
                  </div>
                  <div className="rounded-xl border border-gray-100 bg-white p-6 shadow-sm">
                    <h3 className="font-heading text-sm font-semibold text-brand-blue-800">
                      What Happens Next
                    </h3>
                    <ul className="mt-3 space-y-2 text-sm text-gray-600">
                      {[
                        'You receive a confirmation email immediately',
                        'Our team reviews your request within 1 business hour',
                        'You receive a detailed quote with sourcing options',
                        'Approval leads to coordinated delivery to your facility',
                      ].map((step) => (
                        <li key={step} className="flex items-start gap-2">
                          <CheckCircle className="mt-0.5 h-4 w-4 shrink-0 text-green-500" />
                          {step}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </section>
        </>
      )}
    </div>
  );
}

export default function ShopPage() {
  return (
    <Suspense>
      <ShopContent />
    </Suspense>
  );
}
