import { createContext, useContext, useEffect, useMemo, useState } from 'react';
import { api } from '../api/client';
import type { User } from '../types';

type AuthContextValue = {
  user: User | null;
  loading: boolean;
  signin: (email: string, password: string) => Promise<void>;
  signup: (email: string, password: string, displayName: string) => Promise<void>;
  signout: () => Promise<void>;
};

const AuthContext = createContext<AuthContextValue | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    api<{ user: User }>('/api/auth/me')
      .then((result) => setUser(result.user))
      .catch(() => setUser(null))
      .finally(() => setLoading(false));
  }, []);

  const value = useMemo<AuthContextValue>(
    () => ({
      user,
      loading,
      signin: async (email, password) => {
        const result = await api<{ user: User }>('/api/auth/signin', {
          method: 'POST',
          body: JSON.stringify({ email, password }),
        });
        setUser(result.user);
      },
      signup: async (email, password, displayName) => {
        const result = await api<{ user: User }>('/api/auth/signup', {
          method: 'POST',
          body: JSON.stringify({ email, password, displayName }),
        });
        setUser(result.user);
      },
      signout: async () => {
        await api('/api/auth/signout', { method: 'POST' });
        setUser(null);
      },
    }),
    [loading, user],
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) throw new Error('useAuth must be used within AuthProvider');
  return context;
}
