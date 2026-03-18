// ── Types ──

export interface Category {
  id: string;
  name: string;
  slug: string;
  description: string;
  imageUrl: string;
  sortOrder: number;
  _count?: { products: number };
}

export interface Product {
  id: string;
  name: string;
  slug: string;
  description: string;
  features: string[];
  specifications: Record<string, string>;
  imageUrl: string;
  categoryId: string;
  category?: Category;
  sortOrder: number;
}

export type OrderStatus = 'PENDING' | 'CONTACTED' | 'COMPLETED' | 'CANCELLED';

export interface InquiryOrder {
  id: string;
  productId: string;
  product?: Product;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  organization: string | null;
  message: string | null;
  status: OrderStatus;
  emailSent: boolean;
  createdAt: string;
}

export interface ContactSubmission {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  phone: string | null;
  subject: string;
  message: string;
  emailSent: boolean;
  createdAt: string;
}

// ── Constants ──

export const ORDER_STATUSES: OrderStatus[] = [
  'PENDING',
  'CONTACTED',
  'COMPLETED',
  'CANCELLED',
];

export const VENDOR_COMPANY = 'Knit Tech Health';
export const VENDOR_EMAIL = 'info@knittechhealth.com';
