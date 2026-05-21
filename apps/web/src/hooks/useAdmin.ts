'use client';

import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { authApiFetch } from '@/lib/api';
import { useAuth } from '@/contexts/AuthContext';
import type { InquiryOrder, PurchaseOrder, ContactSubmission, JobApplication, AdminStats } from '@kth/shared';

function useToken() {
  const { accessToken } = useAuth();
  return accessToken ?? '';
}

export function useAdminStats() {
  const token = useToken();
  return useQuery({
    queryKey: ['admin', 'stats'],
    queryFn: () => authApiFetch<AdminStats>('/admin/stats', token),
    enabled: !!token,
    refetchInterval: 30_000,
  });
}

export function useAdminInquiries(status?: string) {
  const token = useToken();
  return useQuery({
    queryKey: ['admin', 'inquiries', status],
    queryFn: () => authApiFetch<InquiryOrder[]>(`/admin/inquiries${status ? `?status=${status}` : ''}`, token),
    enabled: !!token,
  });
}

export function useAdminOrders(status?: string) {
  const token = useToken();
  return useQuery({
    queryKey: ['admin', 'orders', status],
    queryFn: () => authApiFetch<PurchaseOrder[]>(`/admin/orders${status ? `?status=${status}` : ''}`, token),
    enabled: !!token,
  });
}

export function useAdminContacts() {
  const token = useToken();
  return useQuery({
    queryKey: ['admin', 'contacts'],
    queryFn: () => authApiFetch<ContactSubmission[]>('/admin/contacts', token),
    enabled: !!token,
  });
}

export function useAdminApplications(status?: string) {
  const token = useToken();
  return useQuery({
    queryKey: ['admin', 'applications', status],
    queryFn: () => authApiFetch<JobApplication[]>(`/admin/applications${status ? `?status=${status}` : ''}`, token),
    enabled: !!token,
  });
}

export function useUpdateInquiryStatus() {
  const token = useToken();
  const qc = useQueryClient();
  return useMutation({
    mutationFn: ({ id, status }: { id: string; status: string }) =>
      authApiFetch('/admin/inquiries/' + id, token, { method: 'PATCH', body: JSON.stringify({ status }) }),
    onSuccess: () => qc.invalidateQueries({ queryKey: ['admin', 'inquiries'] }),
  });
}

export function useUpdateOrderStatus() {
  const token = useToken();
  const qc = useQueryClient();
  return useMutation({
    mutationFn: ({ id, status }: { id: string; status: string }) =>
      authApiFetch('/admin/orders/' + id, token, { method: 'PATCH', body: JSON.stringify({ status }) }),
    onSuccess: () => qc.invalidateQueries({ queryKey: ['admin', 'orders'] }),
  });
}

export function useUpdateApplicationStatus() {
  const token = useToken();
  const qc = useQueryClient();
  return useMutation({
    mutationFn: ({ id, status }: { id: string; status: string }) =>
      authApiFetch('/admin/applications/' + id, token, { method: 'PATCH', body: JSON.stringify({ status }) }),
    onSuccess: () => qc.invalidateQueries({ queryKey: ['admin', 'applications'] }),
  });
}
