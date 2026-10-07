'use client';

import { useAuth } from '@/lib/auth/context';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import type { UserRoleType } from '@/types';
import { ROLE_CONFIG } from '@/lib/auth/demo-data';
import Link from 'next/link';

export default function LoginPage() {
  const { user, login } = useAuth();
  const router = useRouter();
  const [showDevLogin, setShowDevLogin] = useState(false);
  const [devEmail, setDevEmail] = useState('');
  const [devPassword, setDevPassword] = useState('');
  const [devError, setDevError] = useState('');
  const [devClicks, setDevClicks] = useState(0);

  useEffect(() => {
    if (user) {
      router.push('/portal/dashboard');
    }
  }, [user, router]);

  const handleRoleLogin = (role: UserRoleType) => {
    login(role);
    router.push('/portal/dashboard');
  };

  // Hidden developer login — triple-click on the logo to reveal
  const handleLogoClick = () => {
    const newClicks = devClicks + 1;
    setDevClicks(newClicks);
    if (newClicks >= 5) {
      setShowDevLogin(true);
      setDevClicks(0);
    }
    // Reset after 2 seconds
    setTimeout(() => setDevClicks(0), 2000);
  };

  const handleDevLogin = (e: React.FormEvent) => {
    e.preventDefault();
    // In production, this would validate against Supabase Auth
    // For V1 demo, we check against known credentials client-side
    // NOTE: In production, NEVER validate credentials client-side
    if (devEmail === 'marksamer010@gmail.com' && devPassword === 'ch222ch222') {
      login('developer');
      router.push('/portal/dashboard');
    } else {
      setDevError('Invalid credentials');
    }
  };

  // Roles visible on login (Developer is hidden)
  const visibleRoles: UserRoleType[] = [
    'student',
    'parent',
    'teacher',
    'supervisor',
    'admin',
    'head_admin',
  ];

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      {/* Header */}
      <header className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 h-16 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-3">
            <div
              className="w-10 h-10 bg-brand-800 rounded-lg flex items-center justify-center cursor-pointer select-none"
              onClick={handleLogoClick}
            >
              <span className="text-white font-bold text-lg">N</span>
            </div>
            <div>
              <h1 className="text-lg font-bold text-gray-900 leading-tight">New Life</h1>
              <p className="text-xs text-brand-600 font-medium -mt-0.5">Language School</p>
            </div>
          </Link>
          <Link href="/" className="text-sm text-gray-500 hover:text-brand-600 transition-colors">
            ← Back to Website
          </Link>
        </div>
      </header>

      <main className="flex-1 flex items-center justify-center p-4">
        <div className="w-full max-w-2xl">
          {/* Demo Banner */}
          <div className="bg-accent-50 border border-accent-200 rounded-lg p-3 mb-6 text-center">
            <p className="text-sm text-accent-800">
              <strong>Development Mode</strong> — Select a role to log in. This temporary login will be replaced with the real authentication system.
            </p>
          </div>

          <div className="bg-white rounded-lg border border-gray-200 shadow-card overflow-hidden">
            <div className="p-6 sm:p-8 border-b border-gray-100 bg-brand-800">
              <h2 className="text-xl font-bold text-white text-center">Portal Login</h2>
              <p className="text-sm text-blue-200 text-center mt-1">
                Select your role to access the school portal
              </p>
            </div>

            <div className="p-6 sm:p-8">
              {!showDevLogin ? (
                <>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    {visibleRoles.map((role) => {
                      const config = ROLE_CONFIG[role];
                      return (
                        <button
                          key={role}
                          onClick={() => handleRoleLogin(role)}
                          className="flex items-center gap-3 p-4 border border-gray-200 rounded-lg hover:border-brand-300 hover:bg-brand-50 transition-all text-left group"
                          id={`login-${role}`}
                        >
                          <span className="text-2xl flex-shrink-0">{config.icon}</span>
                          <div className="min-w-0">
                            <p className="text-sm font-semibold text-gray-900 group-hover:text-brand-700">
                              {config.label}
                            </p>
                            <p className="text-xs text-gray-500 truncate">
                              {config.description}
                            </p>
                          </div>
                          <svg className="w-4 h-4 text-gray-300 group-hover:text-brand-500 flex-shrink-0 ml-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                          </svg>
                        </button>
                      );
                    })}
                  </div>
                </>
              ) : (
                <>
                  <div className="mb-4">
                    <button
                      onClick={() => setShowDevLogin(false)}
                      className="text-sm text-gray-500 hover:text-gray-700 transition-colors"
                    >
                      ← Back to role selection
                    </button>
                  </div>

                  <div className="bg-gray-800 rounded-lg p-4 mb-6">
                    <p className="text-sm text-gray-300 font-mono">Developer Access</p>
                  </div>

                  <form onSubmit={handleDevLogin} className="space-y-4">
                    <div>
                      <label htmlFor="dev-email">Email</label>
                      <input
                        type="email"
                        id="dev-email"
                        value={devEmail}
                        onChange={(e) => setDevEmail(e.target.value)}
                        placeholder="Developer email"
                        required
                        autoComplete="email"
                      />
                    </div>
                    <div>
                      <label htmlFor="dev-password">Password</label>
                      <input
                        type="password"
                        id="dev-password"
                        value={devPassword}
                        onChange={(e) => setDevPassword(e.target.value)}
                        placeholder="Password"
                        required
                        autoComplete="current-password"
                      />
                    </div>
                    {devError && (
                      <p className="text-sm text-red-600">{devError}</p>
                    )}
                    <button
                      type="submit"
                      className="w-full px-4 py-2.5 text-sm font-semibold text-white bg-gray-800 hover:bg-gray-900 rounded-md transition-colors"
                    >
                      Login as Developer
                    </button>
                  </form>
                </>
              )}
            </div>
          </div>

          <p className="text-center text-xs text-gray-400 mt-4">
            © 2026 New Life Language School. All rights reserved.
          </p>
        </div>
      </main>
    </div>
  );
}
