'use client';

import Link from 'next/link';
import { useCategories } from '@/hooks/useProducts';
import {
  Accessibility,
  BedDouble,
  ShowerHead,
  Wind,
  Cross,
  Shield,
  Activity,
  HandHelping,
  Gauge,
  Droplets,
  Zap,
  Monitor,
  FlaskConical,
  Microscope,
  Scissors,
  Bed,
  Smile,
  Bell,
  Package,
  Cable,
} from 'lucide-react';

const iconMap: Record<string, React.ElementType> = {
  mobility: Accessibility,
  'patient-support': BedDouble,
  'bath-safety': ShowerHead,
  respiratory: Wind,
  'wound-care': Cross,
  ppe: Shield,
  'diagnostic-equipment': Activity,
  'aids-daily-living': HandHelping,
  'anesthesia-equipment': Gauge,
  'infusion-pumps': Droplets,
  defibrillators: Zap,
  'patient-monitoring': Monitor,
  sterilization: FlaskConical,
  endoscopy: Microscope,
  'surgical-equipment': Scissors,
  'beds-furniture': Bed,
  'dental-equipment': Smile,
  'nurse-call-systems': Bell,
  'consumables-disposables': Package,
  'cables-sensors': Cable,
};

export default function CategoryGrid() {
  const { data: categories, isLoading } = useCategories();

  if (isLoading) {
    return (
      <section className="bg-brand-blue-50/50 py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <h2 className="text-center font-heading text-3xl font-bold text-brand-blue-900">
            Shop by Category
          </h2>
          <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {Array.from({ length: 8 }).map((_, i) => (
              <div
                key={i}
                className="h-40 animate-pulse rounded-xl bg-gray-200"
              />
            ))}
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="bg-brand-blue-50/50 py-16">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <h2 className="text-center font-heading text-3xl font-bold text-brand-blue-900">
          Shop by Category
        </h2>
        <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {categories?.map((cat) => {
            const Icon = iconMap[cat.slug] || Activity;
            return (
              <Link
                key={cat.id}
                href={`/shop-medical?category=${cat.slug}`}
                className="group rounded-xl border border-gray-100 bg-white p-6 shadow-sm transition hover:border-brand-pink-200 hover:shadow-md"
              >
                <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-brand-blue-50 transition group-hover:bg-brand-pink-50">
                  <Icon className="h-6 w-6 text-brand-blue-600 transition group-hover:text-brand-pink-500" />
                </div>
                <h3 className="mt-4 font-heading text-lg font-semibold text-brand-blue-800">
                  {cat.name}
                </h3>
                <p className="mt-1 text-sm text-gray-500">
                  {cat._count?.products ?? 0} products
                </p>
              </Link>
            );
          })}
        </div>
      </div>
    </section>
  );
}
