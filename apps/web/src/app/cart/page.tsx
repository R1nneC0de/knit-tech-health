'use client';

import Link from 'next/link';
import { Minus, Plus, Trash2, ShoppingCart, ArrowRight } from 'lucide-react';
import ProtectedRoute from '@/components/auth/ProtectedRoute';
import { useCart } from '@/contexts/CartContext';
import ProductImage from '@/components/ui/ProductImage';

const TAX_RATE = 0.07;

function CartContent() {
  const { cart, isLoading, updateQuantity, removeItem } = useCart();

  if (isLoading) {
    return (
      <div className="mx-auto max-w-4xl px-4 py-12">
        <div className="space-y-4">
          {[1, 2, 3].map((i) => (
            <div key={i} className="h-28 animate-pulse rounded-xl bg-gray-100" />
          ))}
        </div>
      </div>
    );
  }

  if (!cart || cart.items.length === 0) {
    return (
      <div className="mx-auto max-w-4xl px-4 py-20 text-center">
        <ShoppingCart className="mx-auto h-16 w-16 text-gray-300" />
        <h2 className="mt-4 font-heading text-2xl font-bold text-brand-blue-900">Your cart is empty</h2>
        <p className="mt-2 text-gray-500">Browse our catalog to find medical equipment you need.</p>
        <Link
          href="/shop-medical"
          className="mt-8 inline-block rounded-lg bg-brand-blue-700 px-8 py-3 font-semibold text-white transition hover:bg-brand-blue-800"
        >
          Browse Equipment
        </Link>
      </div>
    );
  }

  const subtotal = cart.items.reduce((sum, item) => sum + Number(item.product?.price ?? 0) * item.quantity, 0);
  const tax = subtotal * TAX_RATE;
  const total = subtotal + tax;

  return (
    <div className="mx-auto max-w-4xl px-4 py-8 sm:px-6 lg:px-8">
      <h1 className="font-heading text-3xl font-bold text-brand-blue-900">Your Cart</h1>
      <p className="mt-1 text-gray-500">{cart.items.length} item{cart.items.length !== 1 ? 's' : ''}</p>

      <div className="mt-8 grid gap-8 lg:grid-cols-3">
        {/* Items */}
        <div className="space-y-4 lg:col-span-2">
          {cart.items.map((item) => (
            <div key={item.id} className="flex gap-4 rounded-xl border border-gray-100 bg-white p-4 shadow-sm">
              <div className="h-24 w-24 shrink-0 overflow-hidden rounded-lg bg-gray-100">
                <ProductImage
                  slug={item.product?.slug ?? ''}
                  name={item.product?.name ?? ''}
                  className="h-full w-full object-cover"
                />
              </div>
              <div className="flex flex-1 flex-col">
                <div className="flex items-start justify-between">
                  <div>
                    {item.product?.category && (
                      <span className="text-xs text-brand-pink-500">{item.product.category.name}</span>
                    )}
                    <h3 className="font-heading text-base font-semibold text-brand-blue-800">
                      {item.product?.name}
                    </h3>
                  </div>
                  <button
                    onClick={() => removeItem(item.id)}
                    className="text-gray-400 transition hover:text-red-500"
                    aria-label="Remove item"
                  >
                    <Trash2 className="h-4 w-4" />
                  </button>
                </div>
                <div className="mt-auto flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => updateQuantity(item.id, item.quantity - 1)}
                      className="flex h-7 w-7 items-center justify-center rounded-full border border-gray-200 transition hover:border-brand-blue-400"
                    >
                      <Minus className="h-3 w-3" />
                    </button>
                    <span className="w-8 text-center text-sm font-semibold">{item.quantity}</span>
                    <button
                      onClick={() => updateQuantity(item.id, item.quantity + 1)}
                      className="flex h-7 w-7 items-center justify-center rounded-full border border-gray-200 transition hover:border-brand-blue-400"
                    >
                      <Plus className="h-3 w-3" />
                    </button>
                  </div>
                  <p className="font-bold text-brand-blue-800">
                    ${(Number(item.product?.price ?? 0) * item.quantity).toFixed(2)}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Summary */}
        <div className="h-fit rounded-xl border border-gray-100 bg-white p-6 shadow-sm">
          <h2 className="font-heading text-lg font-bold text-brand-blue-900">Order Summary</h2>
          <div className="mt-4 space-y-2 text-sm">
            <div className="flex justify-between text-gray-600">
              <span>Subtotal</span>
              <span>${subtotal.toFixed(2)}</span>
            </div>
            <div className="flex justify-between text-gray-600">
              <span>Tax (7%)</span>
              <span>${tax.toFixed(2)}</span>
            </div>
            <div className="mt-3 flex justify-between border-t border-gray-100 pt-3 font-bold text-brand-blue-900">
              <span>Total</span>
              <span>${total.toFixed(2)}</span>
            </div>
          </div>
          <Link
            href="/checkout"
            className="mt-6 flex w-full items-center justify-center gap-2 rounded-lg bg-brand-pink-500 px-6 py-3 font-semibold text-white transition hover:bg-brand-pink-600"
          >
            Proceed to Checkout
            <ArrowRight className="h-4 w-4" />
          </Link>
          <Link
            href="/shop-medical"
            className="mt-3 block text-center text-sm text-brand-blue-700 hover:text-brand-pink-500"
          >
            Continue Shopping
          </Link>
        </div>
      </div>
    </div>
  );
}

export default function CartPage() {
  return (
    <ProtectedRoute>
      <CartContent />
    </ProtectedRoute>
  );
}
