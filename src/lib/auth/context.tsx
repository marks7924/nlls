'use client';

import React, { createContext, useContext, useState, useCallback, useEffect } from 'react';
import type { AuthUser, UserRoleType, Profile } from '@/types';
import { DEMO_USERS } from '@/lib/auth/demo-data';

// ---- Permission Helpers ----

interface AuthContextType {
  user: AuthUser | null;
  isLoading: boolean;
  login: (role: UserRoleType) => void;
  logout: () => void;
  hasPermission: (permission: string) => boolean;
  hasAnyPermission: (permissions: string[]) => boolean;
  hasAllPermissions: (permissions: string[]) => boolean;
}

const AuthContext = createContext<AuthContextType>({
  user: null,
  isLoading: true,
  login: () => {},
  logout: () => {},
  hasPermission: () => false,
  hasAnyPermission: () => false,
  hasAllPermissions: () => false,
});

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<AuthUser | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  // Check for stored session on mount
  useEffect(() => {
    const stored = localStorage.getItem('nlls_demo_user');
    if (stored) {
      try {
        setUser(JSON.parse(stored));
      } catch {
        localStorage.removeItem('nlls_demo_user');
      }
    }
    setIsLoading(false);
  }, []);

  const login = useCallback((role: UserRoleType) => {
    const demoUser = DEMO_USERS[role];
    if (demoUser) {
      setUser(demoUser);
      localStorage.setItem('nlls_demo_user', JSON.stringify(demoUser));
    }
  }, []);

  const logout = useCallback(() => {
    setUser(null);
    localStorage.removeItem('nlls_demo_user');
  }, []);

  const hasPermission = useCallback(
    (permission: string): boolean => {
      if (!user) return false;
      // Developer has all permissions
      if (user.role === 'developer') return true;
      return user.permissions.includes(permission);
    },
    [user]
  );

  const hasAnyPermission = useCallback(
    (permissions: string[]): boolean => {
      if (!user) return false;
      if (user.role === 'developer') return true;
      return permissions.some((p) => user.permissions.includes(p));
    },
    [user]
  );

  const hasAllPermissions = useCallback(
    (permissions: string[]): boolean => {
      if (!user) return false;
      if (user.role === 'developer') return true;
      return permissions.every((p) => user.permissions.includes(p));
    },
    [user]
  );

  return (
    <AuthContext.Provider
      value={{
        user,
        isLoading,
        login,
        logout,
        hasPermission,
        hasAnyPermission,
        hasAllPermissions,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}
