'use client';

import { useParams } from 'next/navigation';
import Link from 'next/link';
import { ChevronRight, ShoppingCart } from 'lucide-react';
import { useProduct } from '@/hooks/useProducts';
import ProductImage from '@/components/ui/ProductImage';
import ProductCard from '@/components/shop/ProductCard';
import { useAuth } from '@/contexts/AuthContext';
import { useCart } from '@/contexts/CartContext';
import { useState } from 'react';

export default function ProductDetailPage() {
  const { slug } = useParams<{ slug: string }>();
  const { data: product, isLoading, error } = useProduct(slug);
  const { user } = useAuth();
  const { addToCart } = useCart();
  const [addedToCart, setAddedToCart] = useState(false);

  async function handleAddToCart() {
    if (!product) return;
    await addToCart(product.id);
    setAddedToCart(true);
    setTimeout(() => setAddedToCart(false), 2000);
  }

  if (isLoading) {
    return (
      <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        <div className="animate-pulse">
          <div className="h-4 w-64 rounded bg-gray-200" />
          <div className="mt-8 grid gap-8 lg:grid-cols-2">
            <div className="aspect-square rounded-xl bg-gray-200" />
            <div className="space-y-4">
              <div className="h-8 w-48 rounded bg-gray-200" />
              <div className="h-4 w-full rounded bg-gray-200" />
              <div className="h-4 w-3/4 rounded bg-gray-200" />
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (error || !product) {
    return (
      <div className="mx-auto max-w-7xl px-4 py-16 text-center sm:px-6 lg:px-8">
        <h1 className="font-heading text-2xl font-bold text-brand-blue-900">
          Product Not Found
        </h1>
        <p className="mt-2 text-gray-600">
          The product you&apos;re looking for doesn&apos;t exist.
        </p>
        <Link
          href="/shop-medical"
          className="mt-6 inline-block rounded-lg bg-brand-blue-700 px-6 py-2 text-sm font-semibold text-white"
        >
          Back to Shop
        </Link>
      </div>
    );
  }

  const specs = (product.specifications || {}) as Record<string, string>;

  return (
    <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
      {/* Breadcrumbs */}
      <nav className="flex items-center gap-1 text-sm text-gray-500">
        <Link href="/" className="hover:text-brand-blue-700">
          Home
        </Link>
        <ChevronRight className="h-4 w-4" />
        <Link href="/shop-medical" className="hover:text-brand-blue-700">
          Shop
        </Link>
        <ChevronRight className="h-4 w-4" />
        {product.category && (
          <>
            <Link
              href={`/shop-medical?category=${product.category.slug}`}
              className="hover:text-brand-blue-700"
            >
              {product.category.name}
            </Link>
            <ChevronRight className="h-4 w-4" />
          </>
        )}
        <span className="text-brand-blue-800">{product.name}</span>
      </nav>

      {/* Product content */}
      <div className="mt-8 grid gap-8 lg:grid-cols-2">
        {/* Image */}
        <div className="overflow-hidden rounded-xl border border-gray-100">
          <ProductImage
            src={product.imageUrl}
            slug={product.slug}
            name={product.name}
            className="aspect-square h-full w-full object-cover"
          />
        </div>

        {/* Details */}
        <div>
          {product.category && (
            <span className="mb-3 inline-block rounded-full bg-brand-pink-50 px-3 py-1 text-xs font-medium text-brand-pink-600">
              {product.category.name}
            </span>
          )}
          <h1 className="font-heading text-3xl font-bold text-brand-blue-900">
            {product.name}
          </h1>
          {product.price > 0 && (
            <p className="mt-3 text-2xl font-bold text-brand-pink-600">
              ${Number(product.price).toFixed(2)}
            </p>
          )}
          <p className="mt-4 leading-relaxed text-gray-600">
            {product.description}
          </p>

          <div className="mt-8 flex flex-wrap gap-3">
            {user ? (
              <button
                onClick={handleAddToCart}
                className="flex items-center gap-2 rounded-lg bg-brand-pink-500 px-8 py-3 font-semibold text-white transition hover:bg-brand-pink-600"
              >
                <ShoppingCart className="h-5 w-5" />
                {addedToCart ? 'Added!' : 'Add to Cart'}
              </button>
            ) : (
              <Link
                href="/login"
                className="flex items-center gap-2 rounded-lg bg-brand-pink-500 px-8 py-3 font-semibold text-white transition hover:bg-brand-pink-600"
              >
                <ShoppingCart className="h-5 w-5" />
                Sign in to Add to Cart
              </Link>
            )}
            <Link
              href={`/request/${product.slug}`}
              className="rounded-lg border-2 border-brand-blue-700 px-8 py-3 font-semibold text-brand-blue-700 transition hover:bg-brand-blue-50"
            >
              Request a Quote
            </Link>
          </div>

          {/* Features */}
          {product.features.length > 0 && (
            <div className="mt-10">
              <h2 className="font-heading text-xl font-semibold text-brand-blue-800">
                Features
              </h2>
              <ul className="mt-4 space-y-2">
                {product.features.map((f, i) => (
                  <li key={i} className="flex items-start gap-2 text-sm text-gray-600">
                    <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-brand-pink-400" />
                    {f}
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* Specifications */}
          {Object.keys(specs).length > 0 && (
            <div className="mt-10">
              <h2 className="font-heading text-xl font-semibold text-brand-blue-800">
                Specifications
              </h2>
              <table className="mt-4 w-full text-sm">
                <tbody>
                  {Object.entries(specs).map(([key, value]) => (
                    <tr key={key} className="border-b border-gray-100">
                      <td className="py-2.5 pr-4 font-medium text-brand-blue-700">
                        {key}
                      </td>
                      <td className="py-2.5 text-gray-600">{value}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>

      {/* Related products */}
      {product.relatedProducts && product.relatedProducts.length > 0 && (
        <div className="mt-16">
          <h2 className="font-heading text-2xl font-bold text-brand-blue-900">
            Related Products
          </h2>
          <div className="mt-6 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {product.relatedProducts.map((p) => (
              <ProductCard key={p.id} product={p} />
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
