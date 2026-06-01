'use client';

import { useState } from 'react';
import { useAdminOrders, useUpdateOrderStatus } from '@/hooks/useAdmin';

const STATUSES = ['PENDING', 'PAID', 'SHIPPED', 'DELIVERED', 'CANCELLED'];

const statusColors: Record<string, string> = {
  PENDING: 'bg-brand-orange-100 text-brand-orange-700',
  PAID: 'bg-blue-100 text-blue-700',
  SHIPPED: 'bg-purple-100 text-purple-700',
  DELIVERED: 'bg-green-100 text-green-700',
  CANCELLED: 'bg-gray-100 text-gray-500',
};

export default function OrdersPage() {
  const [filter, setFilter] = useState('');
  const { data: orders, isLoading } = useAdminOrders(filter || undefined);
  const { mutate: updateStatus } = useUpdateOrderStatus();

  return (
    <div>
      <div className="flex flex-wrap items-center justify-between gap-4">
        <h1 className="font-heading text-2xl font-bold text-brand-blue-900">Purchase Orders</h1>
        <div className="flex flex-wrap gap-2">
          <button
            onClick={() => setFilter('')}
            className={`rounded-lg px-3 py-1.5 text-xs font-semibold ${filter === '' ? 'bg-brand-blue-700 text-white' : 'bg-gray-100 text-gray-600 hover:bg-gray-200'}`}
          >
            All
          </button>
          {STATUSES.map((s) => (
            <button
              key={s}
              onClick={() => setFilter(s)}
              className={`rounded-lg px-3 py-1.5 text-xs font-semibold ${filter === s ? 'bg-brand-blue-700 text-white' : 'bg-gray-100 text-gray-600 hover:bg-gray-200'}`}
            >
              {s}
            </button>
          ))}
        </div>
      </div>

      {isLoading ? (
        <div className="mt-8 space-y-3">
          {[...Array(5)].map((_, i) => <div key={i} className="h-16 animate-pulse rounded-xl bg-gray-100" />)}
        </div>
      ) : !orders?.length ? (
        <p className="mt-12 text-center text-gray-400">No orders found.</p>
      ) : (
        <div className="mt-6 overflow-hidden rounded-xl border border-gray-100 bg-white shadow-sm">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-gray-100 bg-gray-50">
                <th className="px-4 py-3 text-left font-semibold text-gray-500">Order #</th>
                <th className="px-4 py-3 text-left font-semibold text-gray-500">Customer</th>
                <th className="px-4 py-3 text-left font-semibold text-gray-500">Items</th>
                <th className="px-4 py-3 text-left font-semibold text-gray-500">Total</th>
                <th className="px-4 py-3 text-left font-semibold text-gray-500">Payment</th>
                <th className="px-4 py-3 text-left font-semibold text-gray-500">Date</th>
                <th className="px-4 py-3 text-left font-semibold text-gray-500">Status</th>
              </tr>
            </thead>
            <tbody>
              {orders.map((order) => {
                const user = (order as any).user as { email: string; firstName: string; lastName: string } | undefined;
                const items = (order as any).items as Array<{ quantity: number; product?: { name: string } }> | undefined;
                return (
                  <tr key={order.id} className="border-b border-gray-50 hover:bg-gray-50">
                    <td className="px-4 py-3 font-mono text-xs text-gray-500">
                      #{order.id.slice(0, 8).toUpperCase()}
                    </td>
                    <td className="px-4 py-3 text-gray-700">
                      {user ? `${user.firstName} ${user.lastName}` : '—'}
                      <br />
                      <span className="text-xs text-gray-400">{user?.email}</span>
                    </td>
                    <td className="px-4 py-3 text-gray-600">
                      {items?.map((it) => `${it.product?.name ?? '?'} ×${it.quantity}`).join(', ') ?? '—'}
                    </td>
                    <td className="px-4 py-3 font-medium text-brand-blue-800">
                      ${Number(order.total).toFixed(2)}
                    </td>
                    <td className="px-4 py-3 capitalize text-gray-600">{order.paymentMethod}</td>
                    <td className="px-4 py-3 text-gray-500">{new Date(order.createdAt).toLocaleDateString()}</td>
                    <td className="px-4 py-3">
                      <select
                        value={order.status}
                        onChange={(e) => updateStatus({ id: order.id, status: e.target.value })}
                        className={`rounded-full px-2 py-0.5 text-xs font-semibold border-0 cursor-pointer ${statusColors[order.status] ?? 'bg-gray-100 text-gray-600'}`}
                      >
                        {STATUSES.map((s) => <option key={s} value={s}>{s}</option>)}
                      </select>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
