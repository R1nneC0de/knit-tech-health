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
  price: number;
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

export type UserRole = 'CUSTOMER' | 'ADMIN';

export interface User {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  phone: string | null;
  role: UserRole;
}

export interface AuthResponse {
  user: User;
  accessToken: string;
  refreshToken: string;
}

export interface CartItem {
  id: string;
  cartId: string;
  productId: string;
  product?: Product;
  quantity: number;
}

export interface Cart {
  id: string;
  userId: string;
  items: CartItem[];
}

export type PurchaseOrderStatus = 'PENDING' | 'PAID' | 'SHIPPED' | 'DELIVERED' | 'CANCELLED';

export interface PurchaseOrder {
  id: string;
  userId: string;
  items: PurchaseOrderItem[];
  subtotal: number;
  tax: number;
  total: number;
  status: PurchaseOrderStatus;
  paymentMethod: string;
  paymentId: string | null;
  shippingAddress: ShippingAddress | null;
  createdAt: string;
}

export interface PurchaseOrderItem {
  id: string;
  productId: string;
  product?: Product;
  quantity: number;
  unitPrice: number;
}

export interface ShippingAddress {
  street: string;
  city: string;
  state: string;
  zip: string;
  country: string;
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
