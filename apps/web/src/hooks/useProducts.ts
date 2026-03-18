'use client';

import { useQuery } from '@tanstack/react-query';
import { apiFetch } from '@/lib/api';
import type { Product, Category } from '@kth/shared';

type ProductWithRelated = Product & { relatedProducts: Product[] };

export function useProducts(params?: { category?: string; search?: string }) {
  const searchParams = new URLSearchParams();
  if (params?.category) searchParams.set('category', params.category);
  if (params?.search) searchParams.set('search', params.search);
  const qs = searchParams.toString();

  return useQuery({
    queryKey: ['products', params],
    queryFn: () => apiFetch<Product[]>(`/products${qs ? `?${qs}` : ''}`),
  });
}

export function useProduct(slug: string) {
  return useQuery({
    queryKey: ['product', slug],
    queryFn: () => apiFetch<ProductWithRelated>(`/products/${slug}`),
    enabled: !!slug,
  });
}

export function useCategories() {
  return useQuery({
    queryKey: ['categories'],
    queryFn: () => apiFetch<Category[]>('/categories'),
  });
}
