'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { Package, ChevronRight } from 'lucide-react';
import ProtectedRoute from '@/components/auth/ProtectedRoute';
import { useAuth } from '@/contexts/AuthContext';
import { authApiFetch } from '@/lib/api';
import type { PurchaseOrder } from '@kth/shared';

const statusColors: Record<string, string> = {
  PENDING: 'bg-yellow-100 text-yellow-700',
  PAID: 'bg-green-100 text-green-700',
  SHIPPED: 'bg-blue-100 text-blue-700',
  DELIVERED: 'bg-brand-blue-100 text-brand-blue-700',
  CANCELLED: 'bg-red-100 text-red-600',
};

function OrdersContent() {
  const { accessToken } = useAuth();
  const [orders, setOrders] = useState<PurchaseOrder[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!accessToken) return;
    authApiFetch<PurchaseOrder[]>('/orders/history', accessToken)
      .then(setOrders)
      .finally(() => setLoading(false));
  }, [accessToken]);

  if (loading) {
    return (
      <div className="mx-auto max-w-4xl px-4 py-12">
        <div className="space-y-4">
          {[1, 2, 3].map((i) => <div key={i} className="h-24 animate-pulse rounded-xl bg-gray-100" />)}
        </div>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-4xl px-4 py-8 sm:px-6 lg:px-8">
      <h1 className="font-heading text-3xl font-bold text-brand-blue-900">Order History</h1>
      <p className="mt-1 text-gray-500">{orders.length} order{orders.length !== 1 ? 's' : ''}</p>

      {orders.length === 0 ? (
        <div className="mt-16 text-center">
          <Package className="mx-auto h-16 w-16 text-gray-300" />
          <p className="mt-4 text-lg text-gray-500">No orders yet.</p>
          <Link
            href="/shop-medical"
            className="mt-6 inline-block rounded-lg bg-brand-blue-700 px-8 py-3 font-semibold text-white transition hover:bg-brand-blue-800"
          >
            Browse Equipment
          </Link>
        </div>
      ) : (
        <div className="mt-6 space-y-4">
          {orders.map((order) => (
            <Link
              key={order.id}
              href={`/order-confirmation/${order.id}`}
              className="flex items-center justify-between rounded-xl border border-gray-100 bg-white p-5 shadow-sm transition hover:border-brand-pink-200 hover:shadow-md"
            >
              <div>
                <p className="text-xs text-gray-400">
                  Order #{order.id.slice(0, 8).toUpperCase()} &bull;{' '}
                  {new Date(order.createdAt).toLocaleDateString()}
                </p>
                <p className="mt-1 font-heading font-semibold text-brand-blue-800">
                  {order.items.length} item{order.items.length !== 1 ? 's' : ''}
                </p>
                <p className="mt-0.5 text-sm text-gray-500">
                  {order.items
                    .slice(0, 2)
                    .map((i) => i.product?.name)
                    .join(', ')}
                  {order.items.length > 2 && ` +${order.items.length - 2} more`}
                </p>
              </div>
              <div className="flex items-center gap-4">
                <div className="text-right">
                  <p className="font-bold text-brand-blue-900">${Number(order.total).toFixed(2)}</p>
                  <span className={`mt-1 inline-block rounded-full px-2.5 py-0.5 text-xs font-medium ${statusColors[order.status] ?? 'bg-gray-100 text-gray-600'}`}>
                    {order.status}
                  </span>
                </div>
                <ChevronRight className="h-4 w-4 text-gray-400" />
              </div>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}

export default function OrdersPage() {
  return (
    <ProtectedRoute>
      <OrdersContent />
    </ProtectedRoute>
  );
}
