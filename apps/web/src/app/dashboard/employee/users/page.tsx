'use client';

import { useAuth } from '@/contexts/AuthContext';
import { useAdminUsers, useUpdateUserRole } from '@/hooks/useAdmin';

const ROLES = ['CUSTOMER', 'KTI_EMPLOYEE', 'ADMIN'] as const;

const roleColors: Record<string, string> = {
  ADMIN: 'bg-purple-100 text-purple-700',
  KTI_EMPLOYEE: 'bg-brand-blue-100 text-brand-blue-700',
  CUSTOMER: 'bg-gray-100 text-gray-600',
};

export default function UsersPage() {
  const { user: currentUser } = useAuth();
  const { data: users, isLoading } = useAdminUsers();
  const { mutate: updateRole } = useUpdateUserRole();

  if (currentUser?.role !== 'ADMIN') {
    return (
      <div className="flex h-48 items-center justify-center">
        <p className="text-gray-400">Access restricted to administrators.</p>
      </div>
    );
  }

  return (
    <div>
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <h1 className="font-heading text-2xl font-bold text-brand-blue-900">User Management</h1>
          <p className="mt-1 text-sm text-gray-500">Manage roles for all registered users.</p>
        </div>
      </div>

      {isLoading ? (
        <div className="mt-8 space-y-3">
          {[...Array(5)].map((_, i) => <div key={i} className="h-14 animate-pulse rounded-xl bg-gray-100" />)}
        </div>
      ) : !users?.length ? (
        <p className="mt-12 text-center text-gray-400">No users found.</p>
      ) : (
        <div className="mt-6 overflow-hidden rounded-xl border border-gray-100 bg-white shadow-sm">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-gray-100 bg-gray-50">
                <th className="px-4 py-3 text-left font-semibold text-gray-500">Name</th>
                <th className="px-4 py-3 text-left font-semibold text-gray-500">Email</th>
                <th className="px-4 py-3 text-left font-semibold text-gray-500">Role</th>
                <th className="px-4 py-3 text-left font-semibold text-gray-500">Joined</th>
              </tr>
            </thead>
            <tbody>
              {users.map((u) => (
                <tr key={u.id} className="border-b border-gray-50 hover:bg-gray-50">
                  <td className="px-4 py-3 font-medium text-gray-800">
                    {u.firstName} {u.lastName}
                  </td>
                  <td className="px-4 py-3 text-gray-600">{u.email}</td>
                  <td className="px-4 py-3">
                    {u.id === currentUser.id ? (
                      <span className={`rounded-full px-2 py-0.5 text-xs font-semibold ${roleColors[u.role] ?? 'bg-gray-100 text-gray-600'}`}>
                        {u.role}
                      </span>
                    ) : (
                      <select
                        value={u.role}
                        onChange={(e) => updateRole({ id: u.id, role: e.target.value })}
                        className={`rounded-full px-2 py-0.5 text-xs font-semibold border-0 cursor-pointer ${roleColors[u.role] ?? 'bg-gray-100 text-gray-600'}`}
                      >
                        {ROLES.map((r) => <option key={r} value={r}>{r}</option>)}
                      </select>
                    )}
                  </td>
                  <td className="px-4 py-3 text-gray-500">{new Date(u.createdAt).toLocaleDateString()}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
