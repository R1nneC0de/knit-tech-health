'use client';

import { useQuery } from '@tanstack/react-query';
import { authApiFetch } from '@/lib/api';
import { useAuth } from '@/contexts/AuthContext';
import type { InquiryOrder, PurchaseOrder, JobApplication } from '@kth/shared';

function useToken() {
  const { accessToken } = useAuth();
  return accessToken ?? '';
}

export function useMyQuotes() {
  const token = useToken();
  return useQuery({
    queryKey: ['client', 'quotes'],
    queryFn: () => authApiFetch<InquiryOrder[]>('/orders/inquiries', token),
    enabled: !!token,
  });
}

export function useMyOrders() {
  const token = useToken();
  return useQuery({
    queryKey: ['client', 'orders'],
    queryFn: () => authApiFetch<PurchaseOrder[]>('/orders', token),
    enabled: !!token,
  });
}

export function useMyApplications() {
  const token = useToken();
  return useQuery({
    queryKey: ['client', 'applications'],
    queryFn: () => authApiFetch<JobApplication[]>('/job-applications/mine', token),
    enabled: !!token,
  });
}
