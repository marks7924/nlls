'use client';

import { useAuth } from '@/lib/auth/context';
import { useLanguageTheme } from '@/lib/language-theme-context';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import type { UserRoleType } from '@/types';
import { ROLE_CONFIG } from '@/lib/auth/demo-data';
import Link from 'next/link';

export default function LoginPage() {
  const { user, login } = useAuth();
  const { lang, theme, toggleLang, toggleTheme, t } = useLanguageTheme();
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

  const handleLogoClick = () => {
    const newClicks = devClicks + 1;
    setDevClicks(newClicks);
    if (newClicks >= 5) {
      setShowDevLogin(true);
      setDevClicks(0);
    }
    setTimeout(() => setDevClicks(0), 2000);
  };

  const handleDevLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (devEmail === 'marksamer010@gmail.com' && devPassword === 'ch222ch222') {
      login('developer');
      router.push('/portal/dashboard');
    } else {
      setDevError('Invalid credentials');
    }
  };

  const visibleRoles: UserRoleType[] = [
    'student',
    'parent',
    'teacher',
    'supervisor',
    'admin',
    'head_admin',
  ];

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 text-slate-800 dark:text-slate-100 flex flex-col transition-colors duration-200">
      {/* Header */}
      <header className="bg-white dark:bg-slate-900 border-b border-slate-200 dark:border-slate-800">
        <div className="max-w-7xl mx-auto px-4 h-16 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-3">
            <img
              src="/nlls.png"
              alt="NLLS Logo"
              className="w-10 h-10 object-contain cursor-pointer"
              onClick={handleLogoClick}
            />
            <div>
              <h1 className="text-lg font-bold text-slate-900 dark:text-white leading-tight font-heading">
                {t('school.title')}
              </h1>
              <p className="text-xs text-blue-600 dark:text-blue-400 font-medium -mt-0.5">
                {t('school.tagline')}
              </p>
            </div>
          </Link>
          <div className="flex items-center gap-3">
            <button
              onClick={toggleLang}
              className="text-xs font-bold px-3 py-1.5 rounded-xl bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-200 hover:bg-slate-200 dark:hover:bg-slate-700 transition-all border border-slate-200 dark:border-slate-700"
            >
              🌐 {lang === 'en' ? 'العربية' : 'English'}
            </button>
            <button
              onClick={toggleTheme}
              className="text-xs font-bold px-3 py-1.5 rounded-xl bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-200 hover:bg-slate-200 dark:hover:bg-slate-700 transition-all border border-slate-200 dark:border-slate-700"
            >
              {theme === 'light' ? '🌙 Dark' : '☀️ Light'}
            </button>
            <Link href="/" className="text-sm font-semibold text-blue-600 dark:text-blue-400 hover:underline">
              ← {lang === 'ar' ? 'العودة للموقع' : 'Back to Website'}
            </Link>
          </div>
        </div>
      </header>

      <main className="flex-1 flex items-center justify-center p-4">
        <div className="w-full max-w-2xl">
          {/* Demo Banner */}
          <div className="bg-amber-50 dark:bg-amber-950/40 border border-amber-200 dark:border-amber-800 rounded-xl p-3.5 mb-6 text-center shadow-sm">
            <p className="text-xs sm:text-sm text-amber-800 dark:text-amber-300 font-medium">
              <strong>{lang === 'ar' ? 'وضع العرض التجريبي' : 'Development Demo Mode'}</strong> — {lang === 'ar' ? 'اختر حساب الدور المناسب لتسجيل الدخول الفوري إلى البوابة الرقمية.' : 'Select a role to log in instantly into the official digital portal.'}
            </p>
          </div>

          <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-xl overflow-hidden">
            <div className="p-6 sm:p-8 border-b border-slate-100 dark:border-slate-800 bg-blue-900 dark:bg-slate-950">
              <h2 className="text-2xl font-black text-white text-center font-heading">
                {t('footer.portal')}
              </h2>
              <p className="text-xs sm:text-sm text-blue-200 text-center mt-1">
                {t('school.portal_sub')}
              </p>
            </div>

            <div className="p-6 sm:p-8">
              {!showDevLogin ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                  {visibleRoles.map((role) => {
                    const config = ROLE_CONFIG[role];
                    return (
                      <button
                        key={role}
                        onClick={() => handleRoleLogin(role)}
                        className="flex items-center gap-3.5 p-4 border border-slate-200 dark:border-slate-800 rounded-xl hover:border-blue-500 hover:bg-blue-50/50 dark:hover:bg-slate-800/80 transition-all text-left dark:text-right group bg-slate-50/50 dark:bg-slate-900"
                        id={`login-${role}`}
                      >
                        <span className="text-2xl flex-shrink-0">{config.icon}</span>
                        <div className="min-w-0 flex-1">
                          <p className="text-sm font-bold text-slate-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400">
                            {config.label}
                          </p>
                          <p className="text-xs text-slate-500 dark:text-slate-400 truncate">
                            {config.description}
                          </p>
                        </div>
                      </button>
                    );
                  })}
                </div>
              ) : (
                <>
                  <div className="mb-4">
                    <button
                      onClick={() => setShowDevLogin(false)}
                      className="text-sm font-semibold text-slate-500 hover:text-slate-700 dark:hover:text-white transition-colors"
                    >
                      ← {lang === 'ar' ? 'الرجوع لاختيار الأدوار' : 'Back to role selection'}
                    </button>
                  </div>

                  <div className="bg-slate-800 rounded-xl p-4 mb-6">
                    <p className="text-sm text-slate-300 font-mono">Developer Access</p>
                  </div>

                  <form onSubmit={handleDevLogin} className="space-y-4">
                    <div>
                      <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">Email</label>
                      <input
                        type="email"
                        value={devEmail}
                        onChange={(e) => setDevEmail(e.target.value)}
                        placeholder="Developer email"
                        required
                        className="w-full px-4 py-2.5 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-950 text-slate-900 dark:text-white text-sm"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">Password</label>
                      <input
                        type="password"
                        value={devPassword}
                        onChange={(e) => setDevPassword(e.target.value)}
                        placeholder="Password"
                        required
                        className="w-full px-4 py-2.5 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-950 text-slate-900 dark:text-white text-sm"
                      />
                    </div>
                    {devError && (
                      <p className="text-sm text-red-600 font-semibold">{devError}</p>
                    )}
                    <button
                      type="submit"
                      className="w-full px-4 py-3 text-sm font-bold text-white bg-blue-600 hover:bg-blue-700 rounded-xl transition-colors shadow-md"
                    >
                      Login as Developer
                    </button>
                  </form>
                </>
              )}
            </div>
          </div>

          <p className="text-center text-xs text-slate-400 dark:text-slate-500 mt-6 font-medium">
            {t('footer.rights')}
          </p>
        </div>
      </main>
    </div>
  );
}
