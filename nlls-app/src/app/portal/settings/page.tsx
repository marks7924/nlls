'use client';

import { useState } from 'react';
import { Settings, Save, ShieldCheck, Globe, Mail, Lock, CheckCircle2 } from 'lucide-react';

export default function SettingsManagementPage() {
  const [schoolName, setSchoolName] = useState('New Life Language School (NLLS)');
  const [academicYear, setAcademicYear] = useState('2026/2027');
  const [contactEmail, setContactEmail] = useState('info@nlls.edu.eg');
  const [phone, setPhone] = useState('+20 2 2700 8900');
  const [requireHeadAdminAuth, setRequireHeadAdminAuth] = useState(true);
  const [webNotice, setWebNotice] = useState<string | null>(null);

  const handleSaveSettings = (e: React.FormEvent) => {
    e.preventDefault();
    setWebNotice('✅ Web Notice: System & School Configuration updated successfully!');
    setTimeout(() => setWebNotice(null), 5000);
  };

  return (
    <div className="space-y-6">
      {webNotice && (
        <div className="bg-emerald-900 text-white p-4 rounded-2xl flex items-center justify-between shadow-lg font-mono text-xs border border-emerald-700">
          <span>{webNotice}</span>
          <button onClick={() => setWebNotice(null)} className="font-bold text-emerald-200">Dismiss</button>
        </div>
      )}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-slate-900 font-heading flex items-center gap-2">
            <Settings className="w-7 h-7 text-blue-700" />
            System & School Configuration Settings
          </h1>
          <p className="text-slate-600 text-sm mt-1">
            Configure institutional profile, active academic year parameters, and security policies.
          </p>
        </div>
      </div>

      <form onSubmit={handleSaveSettings} className="bg-white rounded-2xl border border-slate-200 shadow-sm p-6 space-y-6 max-w-3xl">
        <h3 className="font-bold text-slate-900 text-base font-heading border-b border-slate-100 pb-3">Institutional Settings</h3>

        <div className="space-y-4 text-xs">
          <div>
            <label className="block font-semibold text-slate-700 mb-1">Official School Identity Name</label>
            <input
              type="text"
              required
              value={schoolName}
              onChange={(e) => setSchoolName(e.target.value)}
              className="w-full bg-slate-50 border border-slate-200 rounded-lg p-3 text-slate-900 font-bold"
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block font-semibold text-slate-700 mb-1">Active Academic Year</label>
              <input
                type="text"
                required
                value={academicYear}
                onChange={(e) => setAcademicYear(e.target.value)}
                className="w-full bg-slate-50 border border-slate-200 rounded-lg p-3 text-blue-900 font-mono font-bold"
              />
            </div>

            <div>
              <label className="block font-semibold text-slate-700 mb-1">Official Contact Email</label>
              <input
                type="email"
                required
                value={contactEmail}
                onChange={(e) => setContactEmail(e.target.value)}
                className="w-full bg-slate-50 border border-slate-200 rounded-lg p-3 text-slate-900 font-medium"
              />
            </div>
          </div>

          <div>
            <label className="block font-semibold text-slate-700 mb-1">Official Phone Line</label>
            <input
              type="text"
              required
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              className="w-full bg-slate-50 border border-slate-200 rounded-lg p-3 text-slate-900 font-medium"
            />
          </div>
        </div>

        <h3 className="font-bold text-slate-900 text-base font-heading border-b border-slate-100 pb-3 pt-4">Security Safeguards</h3>

        <div className="flex items-center justify-between bg-blue-50 p-4 rounded-xl border border-blue-100 text-xs">
          <div>
            <h4 className="font-bold text-blue-950">Require Head Admin Password for High-Risk Actions</h4>
            <p className="text-blue-800 text-[11px]">Enforce password re-authentication for student expulsions and role overrides.</p>
          </div>
          <input
            type="checkbox"
            checked={requireHeadAdminAuth}
            onChange={(e) => setRequireHeadAdminAuth(e.target.checked)}
            className="w-5 h-5 rounded border-slate-300 text-blue-600 focus:ring-blue-600"
          />
        </div>

        <div className="pt-3 border-t border-slate-100 flex justify-end">
          <button type="submit" className="bg-blue-700 hover:bg-blue-800 text-white font-bold px-6 py-2.5 rounded-xl text-sm flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4" /> Save System Settings
          </button>
        </div>
      </form>
    </div>
  );
}
