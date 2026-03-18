import Link from 'next/link';
import type { Product } from '@kth/shared';
import ProductImage from '@/components/ui/ProductImage';

export default function ProductCard({ product }: { product: Product }) {
  return (
    <Link
      href={`/shop/${product.slug}`}
      className="group flex flex-col overflow-hidden rounded-xl border border-gray-100 bg-white shadow-sm transition hover:shadow-md"
    >
      <div className="relative aspect-[4/3] overflow-hidden bg-gray-100">
        <ProductImage
          slug={product.slug}
          name={product.name}
          className="h-full w-full object-cover transition group-hover:scale-105"
        />
      </div>
      <div className="flex flex-1 flex-col p-4">
        {product.category && (
          <span className="mb-2 w-fit rounded-full bg-brand-pink-50 px-3 py-0.5 text-xs font-medium text-brand-pink-600">
            {product.category.name}
          </span>
        )}
        <h3 className="font-heading text-lg font-semibold text-brand-blue-800 group-hover:text-brand-pink-500">
          {product.name}
        </h3>
        <p className="mt-2 line-clamp-2 flex-1 text-sm text-gray-600">
          {product.description}
        </p>
        <span className="mt-4 text-sm font-semibold text-brand-blue-700">
          View Details &rarr;
        </span>
      </div>
    </Link>
  );
}
