'use client';

import { createContext, useContext, useState, useEffect, useCallback, type ReactNode } from 'react';
import type { User, AuthResponse } from '@kth/shared';
import { apiFetch, authApiFetch } from '@/lib/api';
import Cookies from 'js-cookie';

interface RegisterData {
  email: string;
  password: string;
  firstName: string;
  lastName: string;
  phone?: string;
}

interface AuthContextType {
  user: User | null;
  accessToken: string | null;
  isLoading: boolean;
  login: (email: string, password: string) => Promise<void>;
  register: (data: RegisterData) => Promise<void>;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType>({
  user: null,
  accessToken: null,
  isLoading: true,
  login: async () => {},
  register: async () => {},
  logout: () => {},
});

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [accessToken, setAccessToken] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  // Restore session on mount using refresh token cookie
  useEffect(() => {
    const stored = Cookies.get('refreshToken');
    if (!stored) {
      setIsLoading(false);
      return;
    }
    apiFetch<{ accessToken: string }>('/auth/refresh', {
      method: 'POST',
      body: JSON.stringify({ refreshToken: stored }),
    })
      .then(({ accessToken: tok }) => {
        setAccessToken(tok);
        return authApiFetch<User>('/auth/me', tok);
      })
      .then(setUser)
      .catch(() => Cookies.remove('refreshToken'))
      .finally(() => setIsLoading(false));
  }, []);

  const login = useCallback(async (email: string, password: string) => {
    const result = await apiFetch<AuthResponse>('/auth/login', {
      method: 'POST',
      body: JSON.stringify({ email, password }),
    });
    Cookies.set('refreshToken', result.refreshToken, { expires: 7, sameSite: 'strict' });
    setAccessToken(result.accessToken);
    setUser(result.user);
  }, []);

  const register = useCallback(async (data: RegisterData) => {
    const result = await apiFetch<AuthResponse>('/auth/register', {
      method: 'POST',
      body: JSON.stringify(data),
    });
    Cookies.set('refreshToken', result.refreshToken, { expires: 7, sameSite: 'strict' });
    setAccessToken(result.accessToken);
    setUser(result.user);
  }, []);

  const logout = useCallback(() => {
    Cookies.remove('refreshToken');
    setAccessToken(null);
    setUser(null);
  }, []);

  return (
    <AuthContext.Provider value={{ user, accessToken, isLoading, login, register, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}
