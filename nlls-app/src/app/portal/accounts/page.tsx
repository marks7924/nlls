'use client';

import { useState } from 'react';
import { Key, Search, RefreshCw, Plus, Shield, UserCheck, X, CheckCircle2 } from 'lucide-react';

interface AccountUser {
  id: string;
  name: string;
  email: string;
  role: string;
  status: 'active' | 'suspended';
  lastLogin: string;
}

const INITIAL_ACCOUNTS: AccountUser[] = [
  { id: 'acc-1', name: 'Nadia Ibrahim', email: 'nadia.ibrahim@nlls.com', role: 'Head Admin', status: 'active', lastLogin: '2026-10-07 09:12 AM' },
  { id: 'acc-2', name: 'Omar Mahmoud', email: 'omar.mahmoud@nlls.com', role: 'Admin', status: 'active', lastLogin: '2026-10-07 08:30 AM' },
  { id: 'acc-3', name: 'Fatima Ali', email: 'fatima.ali@nlls.com', role: 'Supervisor', status: 'active', lastLogin: '2026-10-06 04:15 PM' },
  { id: 'acc-4', name: 'Mrs. Rania Fouad', email: 'rania.fouad@nlls.edu.eg', role: 'Teacher', status: 'active', lastLogin: '2026-10-07 07:45 AM' },
  { id: 'acc-5', name: 'Mr. Amr Fouad', email: 'fouad.parent@gmail.com', role: 'Parent', status: 'active', lastLogin: '2026-10-05 01:20 PM' },
  { id: 'acc-6', name: 'Mark Samer', email: 'marksamer010@gmail.com', role: 'Developer', status: 'active', lastLogin: '2026-10-07 10:00 AM' },
];

export default function AccountsManagementPage() {
  const [accounts, setAccounts] = useState<AccountUser[]>(INITIAL_ACCOUNTS);
  const [search, setSearch] = useState('');

  const [webNotice, setWebNotice] = useState<string | null>(null);

  const handleResetPassword = (email: string) => {
    setWebNotice(`✅ Web Notice: Temporary reset link dispatched to ${email}!`);
    setTimeout(() => setWebNotice(null), 5000);
  };

  const filtered = accounts.filter(acc => {
    const q = search.toLowerCase().trim();
    if (!q) return true;
    return acc.name.toLowerCase().includes(q) || acc.email.toLowerCase().includes(q) || acc.role.toLowerCase().includes(q);
  });

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
            <Key className="w-7 h-7 text-blue-700" />
            User Account Security & Credentials
          </h1>
          <p className="text-slate-600 text-sm mt-1">
            Manage authentication accounts, role credential provisioning, and password resets.
          </p>
        </div>
      </div>

      {/* Smart Search */}
      <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-sm flex items-center gap-3">
        <Search className="w-4 h-4 text-slate-400" />
        <input
          type="text"
          placeholder="Smart Search accounts by user name, email, role..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full bg-transparent text-sm focus:outline-none text-slate-800 font-medium"
        />
      </div>

      {/* Accounts Table */}
      <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
        <table className="w-full text-left text-xs">
          <thead className="bg-slate-900 text-white font-bold uppercase text-[11px] tracking-wider">
            <tr>
              <th className="p-4">User & Email</th>
              <th className="p-4">Portal Role</th>
              <th className="p-4">Account Status</th>
              <th className="p-4">Last Activity</th>
              <th className="p-4 text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100 font-medium text-slate-800">
            {filtered.map(acc => (
              <tr key={acc.id} className="hover:bg-slate-50">
                <td className="p-4">
                  <div className="font-bold text-slate-900 text-sm">{acc.name}</div>
                  <div className="font-mono text-slate-400 text-xs">{acc.email}</div>
                </td>
                <td className="p-4">
                  <span className="bg-blue-50 text-blue-800 text-[11px] font-bold px-2.5 py-1 rounded border border-blue-200">
                    {acc.role}
                  </span>
                </td>
                <td className="p-4">
                  <span className="bg-emerald-100 text-emerald-800 text-[11px] font-bold px-2 py-0.5 rounded-full">
                    Active
                  </span>
                </td>
                <td className="p-4 font-mono text-slate-500">{acc.lastLogin}</td>
                <td className="p-4 text-right">
                  <button
                    onClick={() => handleResetPassword(acc.email)}
                    className="bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold px-3 py-1.5 rounded-lg text-xs"
                  >
                    Reset Password
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
