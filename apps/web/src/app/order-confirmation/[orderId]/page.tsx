'use client';

import { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import Link from 'next/link';
import { CheckCircle, Package } from 'lucide-react';
import ProtectedRoute from '@/components/auth/ProtectedRoute';
import { useAuth } from '@/contexts/AuthContext';
import { authApiFetch } from '@/lib/api';
import type { PurchaseOrder } from '@kth/shared';

function ConfirmationContent() {
  const { orderId } = useParams<{ orderId: string }>();
  const { accessToken } = useAuth();
  const [order, setOrder] = useState<PurchaseOrder | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!accessToken || !orderId) return;
    authApiFetch<PurchaseOrder>(`/orders/${orderId}`, accessToken)
      .then(setOrder)
      .finally(() => setLoading(false));
  }, [accessToken, orderId]);

  if (loading) {
    return (
      <div className="mx-auto max-w-2xl px-4 py-12">
        <div className="h-48 animate-pulse rounded-xl bg-gray-100" />
      </div>
    );
  }

  if (!order) {
    return (
      <div className="mx-auto max-w-2xl px-4 py-20 text-center">
        <Package className="mx-auto h-12 w-12 text-gray-300" />
        <p className="mt-4 text-gray-500">Order not found.</p>
      </div>
    );
  }

  const paymentLabel: Record<string, string> = {
    stripe: 'Credit / Debit Card',
    paypal: 'PayPal',
    venmo: 'Venmo',
    cashapp: 'Cash App',
  };

  return (
    <div className="mx-auto max-w-2xl px-4 py-12 sm:px-6 lg:px-8">
      <div className="rounded-2xl border border-gray-100 bg-white p-8 shadow-md text-center">
        <CheckCircle className="mx-auto h-16 w-16 text-green-500" />
        <h1 className="mt-6 font-heading text-3xl font-bold text-brand-blue-900">Order Confirmed!</h1>
        <p className="mt-2 text-gray-500">
          Thank you for your order. We&apos;ll process it shortly.
        </p>
        <p className="mt-1 text-sm text-gray-400">Order #{order.id.slice(0, 8).toUpperCase()}</p>

        <div className="mt-8 rounded-xl bg-brand-blue-50 p-4 text-left">
          <h2 className="font-heading text-sm font-semibold uppercase tracking-wider text-brand-blue-700">
            Items Ordered
          </h2>
          <ul className="mt-3 divide-y divide-brand-blue-100">
            {order.items.map((item) => (
              <li key={item.id} className="flex justify-between py-2 text-sm">
                <span className="text-brand-blue-800">
                  {item.product?.name} <span className="text-brand-blue-500">×{item.quantity}</span>
                </span>
                <span className="font-medium text-brand-blue-900">
                  ${(Number(item.unitPrice) * item.quantity).toFixed(2)}
                </span>
              </li>
            ))}
          </ul>
          <div className="mt-3 border-t border-brand-blue-100 pt-3 text-sm">
            <div className="flex justify-between text-gray-600">
              <span>Subtotal</span><span>${Number(order.subtotal).toFixed(2)}</span>
            </div>
            <div className="flex justify-between text-gray-600">
              <span>Tax</span><span>${Number(order.tax).toFixed(2)}</span>
            </div>
            <div className="mt-1 flex justify-between font-bold text-brand-blue-900">
              <span>Total Paid</span><span>${Number(order.total).toFixed(2)}</span>
            </div>
          </div>
          <p className="mt-3 text-xs text-gray-500">
            Paid via {paymentLabel[order.paymentMethod] ?? order.paymentMethod}
          </p>
        </div>

        <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:justify-center">
          <Link
            href="/orders"
            className="rounded-lg border border-brand-blue-200 px-6 py-2.5 text-sm font-semibold text-brand-blue-700 transition hover:bg-brand-blue-50"
          >
            View Order History
          </Link>
          <Link
            href="/shop-medical"
            className="rounded-lg bg-brand-blue-700 px-6 py-2.5 text-sm font-semibold text-white transition hover:bg-brand-blue-800"
          >
            Continue Shopping
          </Link>
        </div>
      </div>
    </div>
  );
}

export default function OrderConfirmationPage() {
  return (
    <ProtectedRoute>
      <ConfirmationContent />
    </ProtectedRoute>
  );
}
