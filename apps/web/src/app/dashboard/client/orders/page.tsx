'use client';

import Link from 'next/link';
import { ShoppingBag } from 'lucide-react';
import { useMyOrders } from '@/hooks/useClientDashboard';

const statusColors: Record<string, string> = {
  PENDING: 'bg-brand-orange-100 text-brand-orange-700',
  PAID: 'bg-blue-100 text-blue-700',
  SHIPPED: 'bg-purple-100 text-purple-700',
  DELIVERED: 'bg-green-100 text-green-700',
  CANCELLED: 'bg-gray-100 text-gray-500',
};

export default function MyOrdersPage() {
  const { data: orders, isLoading } = useMyOrders();

  return (
    <div>
      <h1 className="font-heading text-2xl font-bold text-brand-blue-900">My Orders</h1>
      <p className="mt-1 text-sm text-gray-500">Your purchase history with KnitTech Inc.</p>

      {isLoading ? (
        <div className="mt-8 space-y-3">
          {[...Array(4)].map((_, i) => <div key={i} className="h-16 animate-pulse rounded-xl bg-gray-100" />)}
        </div>
      ) : !orders?.length ? (
        <div className="mt-16 text-center">
          <ShoppingBag className="mx-auto h-14 w-14 text-gray-300" />
          <p className="mt-4 text-gray-500">No orders yet.</p>
          <Link
            href="/shop-medical"
            className="mt-6 inline-block rounded-lg bg-brand-blue-700 px-6 py-2.5 text-sm font-semibold text-white hover:bg-brand-blue-800"
          >
            Browse Equipment
          </Link>
        </div>
      ) : (
        <div className="mt-6 overflow-hidden rounded-xl border border-gray-100 bg-white shadow-sm">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-gray-100 bg-gray-50">
                <th className="px-4 py-3 text-left font-semibold text-gray-500">Order #</th>
                <th className="px-4 py-3 text-left font-semibold text-gray-500">Items</th>
                <th className="px-4 py-3 text-left font-semibold text-gray-500">Total</th>
                <th className="px-4 py-3 text-left font-semibold text-gray-500">Payment</th>
                <th className="px-4 py-3 text-left font-semibold text-gray-500">Date</th>
                <th className="px-4 py-3 text-left font-semibold text-gray-500">Status</th>
              </tr>
            </thead>
            <tbody>
              {orders.map((order) => (
                <tr key={order.id} className="border-b border-gray-50 last:border-0 hover:bg-gray-50">
                  <td className="px-4 py-3 font-mono text-xs text-gray-500">
                    #{order.id.slice(0, 8).toUpperCase()}
                  </td>
                  <td className="max-w-xs px-4 py-3 text-gray-700">
                    <span className="line-clamp-1">
                      {order.items.map((i) => i.product?.name ?? '?').join(', ')}
                    </span>
                    <span className="text-xs text-gray-400">{order.items.length} item{order.items.length !== 1 ? 's' : ''}</span>
                  </td>
                  <td className="px-4 py-3 font-semibold text-brand-blue-800">
                    ${Number(order.total).toFixed(2)}
                  </td>
                  <td className="px-4 py-3 capitalize text-gray-600">{order.paymentMethod}</td>
                  <td className="px-4 py-3 text-gray-500">{new Date(order.createdAt).toLocaleDateString()}</td>
                  <td className="px-4 py-3">
                    <span className={`rounded-full px-2.5 py-0.5 text-xs font-semibold ${statusColors[order.status] ?? 'bg-gray-100 text-gray-600'}`}>
                      {order.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
