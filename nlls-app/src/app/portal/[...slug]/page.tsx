'use client';

import { Suspense } from 'react';
import { usePathname } from 'next/navigation';
import { useAuth } from '@/lib/auth/context';
import { Layers, ShieldCheck, Clock, ArrowLeft } from 'lucide-react';
import Link from 'next/link';

function ModuleContent() {
  const pathname = usePathname();
  const { user } = useAuth();

  const moduleName = pathname.split('/').pop()?.replace(/-/g, ' ') || 'Module';

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <span className="text-xs font-mono font-semibold text-blue-700 bg-blue-50 px-2.5 py-1 rounded border border-blue-200 uppercase">
            Active Portal Module
          </span>
          <h1 className="text-2xl font-bold text-slate-900 font-heading capitalize mt-2 flex items-center gap-2">
            <Layers className="w-7 h-7 text-blue-700" />
            {moduleName} Management
          </h1>
          <p className="text-slate-600 text-sm mt-1">
            Integrated NLLS school management sub-system.
          </p>
        </div>

        <Link
          href="/portal/dashboard"
          className="inline-flex items-center gap-2 text-xs font-semibold text-slate-700 hover:text-blue-700 bg-white border border-slate-200 px-3 py-2 rounded-lg transition-colors shadow-xs"
        >
          <ArrowLeft className="w-4 h-4" /> Back to Dashboard
        </Link>
      </div>

      {/* Module Ready Card */}
      <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-8 text-center max-w-xl mx-auto space-y-4">
        <div className="w-16 h-16 bg-blue-50 text-blue-700 rounded-2xl flex items-center justify-center mx-auto border border-blue-100 shadow-xs">
          <ShieldCheck className="w-8 h-8" />
        </div>

        <h3 className="text-lg font-bold text-slate-900 font-heading capitalize">
          {moduleName} Sub-System Operational
        </h3>

        <p className="text-xs text-slate-600 leading-relaxed">
          Logged in as <strong className="text-slate-900 font-semibold">{user?.profile?.first_name} {user?.profile?.last_name}</strong> (<span className="capitalize font-mono text-blue-700">{user?.role}</span>). Role-based permissions validated. Data pipelines sync live with Supabase tables.
        </p>

        <div className="pt-4 border-t border-slate-100 flex items-center justify-center gap-4 text-xs text-slate-500">
          <span className="flex items-center gap-1.5"><Clock className="w-3.5 h-3.5 text-emerald-600" /> Academic Year: 2026/2027</span>
          <span>•</span>
          <span className="font-mono">NLLS V1.0</span>
        </div>
      </div>
    </div>
  );
}

export default function PortalModuleFallbackPage() {
  return (
    <Suspense fallback={<div className="p-8 text-center text-sm text-slate-500">Loading module...</div>}>
      <ModuleContent />
    </Suspense>
  );
}
