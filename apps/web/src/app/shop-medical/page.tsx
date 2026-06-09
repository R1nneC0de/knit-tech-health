'use client';

import { useSearchParams, useRouter } from 'next/navigation';
import { useState, useEffect, Suspense, useMemo } from 'react';
import { Search, X, Building2, Clock, ShieldCheck, Phone, Mail } from 'lucide-react';
import { useProducts, useCategories } from '@/hooks/useProducts';
import ProductCard from '@/components/shop/ProductCard';
import type { Product } from '@kth/shared';

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
                <a href="tel:8322515160" className="flex items-center gap-2 text-brand-blue-700 hover:text-brand-orange-500">
                  <Phone className="h-4 w-4 shrink-0" /> 832-251-5160
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
            <div
              key={i}
              className="h-72 animate-pulse rounded-xl bg-gray-200"
            />
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
