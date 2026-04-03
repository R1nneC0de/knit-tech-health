'use client';

import { createContext, useContext, useState, useEffect, useCallback, type ReactNode } from 'react';
import type { Cart } from '@kth/shared';
import { authApiFetch } from '@/lib/api';
import { useAuth } from './AuthContext';

interface CartContextType {
  cart: Cart | null;
  itemCount: number;
  isLoading: boolean;
  addToCart: (productId: string, quantity?: number) => Promise<void>;
  updateQuantity: (itemId: string, quantity: number) => Promise<void>;
  removeItem: (itemId: string) => Promise<void>;
  clearCart: () => Promise<void>;
  refetch: () => Promise<void>;
}

const CartContext = createContext<CartContextType>({
  cart: null,
  itemCount: 0,
  isLoading: false,
  addToCart: async () => {},
  updateQuantity: async () => {},
  removeItem: async () => {},
  clearCart: async () => {},
  refetch: async () => {},
});

export function CartProvider({ children }: { children: ReactNode }) {
  const { user, accessToken } = useAuth();
  const [cart, setCart] = useState<Cart | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const fetchCart = useCallback(async () => {
    if (!accessToken) { setCart(null); return; }
    setIsLoading(true);
    try {
      const data = await authApiFetch<Cart>('/cart', accessToken);
      setCart(data);
    } catch {
      setCart(null);
    } finally {
      setIsLoading(false);
    }
  }, [accessToken]);

  useEffect(() => {
    if (user && accessToken) {
      fetchCart();
    } else {
      setCart(null);
    }
  }, [user, accessToken, fetchCart]);

  const addToCart = useCallback(async (productId: string, quantity = 1) => {
    if (!accessToken) return;
    const data = await authApiFetch<Cart>('/cart/items', accessToken, {
      method: 'POST',
      body: JSON.stringify({ productId, quantity }),
    });
    setCart(data);
  }, [accessToken]);

  const updateQuantity = useCallback(async (itemId: string, quantity: number) => {
    if (!accessToken) return;
    const data = await authApiFetch<Cart>(`/cart/items/${itemId}`, accessToken, {
      method: 'PATCH',
      body: JSON.stringify({ quantity }),
    });
    setCart(data);
  }, [accessToken]);

  const removeItem = useCallback(async (itemId: string) => {
    if (!accessToken) return;
    const data = await authApiFetch<Cart>(`/cart/items/${itemId}`, accessToken, {
      method: 'DELETE',
    });
    setCart(data);
  }, [accessToken]);

  const clearCart = useCallback(async () => {
    if (!accessToken) return;
    await authApiFetch('/cart', accessToken, { method: 'DELETE' });
    setCart((prev) => prev ? { ...prev, items: [] } : null);
  }, [accessToken]);

  const itemCount = cart?.items.reduce((sum, item) => sum + item.quantity, 0) ?? 0;

  return (
    <CartContext.Provider value={{ cart, itemCount, isLoading, addToCart, updateQuantity, removeItem, clearCart, refetch: fetchCart }}>
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  return useContext(CartContext);
}
