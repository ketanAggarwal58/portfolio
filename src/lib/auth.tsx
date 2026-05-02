'use client';
import { createContext, useContext, useEffect, useState, ReactNode } from 'react';
import { useRouter } from 'next/navigation';

type AuthState = {
  token: string | null;
  loading: boolean;
  login: (username: string, password: string) => Promise<string | null>;
  logout: () => void;
};

const AuthContext = createContext<AuthState | null>(null);

const CMS = process.env.NEXT_PUBLIC_CMS_URL ?? 'http://localhost:8080';

export function AuthProvider({ children }: { children: ReactNode }) {
  const [token, setToken] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const stored = sessionStorage.getItem('admin_token');
    if (stored) setToken(stored);
    setLoading(false);
  }, []);

  async function login(username: string, password: string): Promise<string | null> {
    try {
      const res = await fetch(`${CMS}/api/auth/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password }),
      });
      if (!res.ok) return 'Invalid credentials';
      const { token } = await res.json();
      sessionStorage.setItem('admin_token', token);
      setToken(token);
      return null;
    } catch {
      return 'Could not reach server';
    }
  }

  function logout() {
    sessionStorage.removeItem('admin_token');
    setToken(null);
    router.push('/admin/login');
  }

  return (
    <AuthContext.Provider value={{ token, loading, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error('useAuth must be used within AuthProvider');
  return ctx;
}

export function authHeaders(token: string) {
  return {
    'Content-Type': 'application/json',
    Authorization: `Bearer ${token}`,
  };
}

export const CMS_URL = CMS;