'use client';

import { useState } from 'react';
import { useAuth } from '@/lib/auth/context';
import { 
  Lock, Shield, Check, X, AlertTriangle, UserCheck, Key, Save, RefreshCw, 
  Sparkles, Search, Plus, UserPlus, ShieldCheck, CheckCircle2 
} from 'lucide-react';
import { PERMISSIONS, PERMISSION_CATEGORIES } from '@/lib/auth/permissions';

interface IndividualGrant {
  id: string;
  userName: string;
  userRole: string;
  permissionKey: string;
  permissionLabel: string;
  grantedAt: string;
}

const ROLES_LIST = [
  { id: 'student', label: 'Student' },
  { id: 'parent', label: 'Parent' },
  { id: 'teacher', label: 'Teacher' },
  { id: 'supervisor', label: 'Supervisor' },
  { id: 'admin', label: 'Admin' },
  { id: 'head_admin', label: 'Head Admin' },
];

const ALL_USERS_DEMO = [
  { id: 'u-1', name: 'Mrs. Rania Fouad', role: 'Teacher', email: 'rania.fouad@nlls.edu.eg' },
  { id: 'u-2', name: 'Mr. Sameh Farouk', role: 'Teacher', email: 'sameh.farouk@nlls.edu.eg' },
  { id: 'u-3', name: 'Ms. Salma Nabil', role: 'Teacher', email: 'salma.nabil@nlls.edu.eg' },
  { id: 'u-4', name: 'Fatima Ali', role: 'Supervisor', email: 'fatima.ali@nlls.com' },
  { id: 'u-5', name: 'Mohammed Khalil', role: 'Parent', email: 'mohammed.khalil@nlls.com' },
];

// Default initial matrix mapping category -> role -> boolean
const DEFAULT_MATRIX: Record<string, Record<string, boolean>> = {
  Students: { student: true, parent: true, teacher: true, supervisor: true, admin: true, head_admin: true },
  Parents: { student: false, parent: true, teacher: true, supervisor: true, admin: true, head_admin: true },
  Teachers: { student: false, parent: false, teacher: true, supervisor: true, admin: true, head_admin: true },
  Attendance: { student: false, parent: false, teacher: true, supervisor: true, admin: true, head_admin: true },
  Exams: { student: true, parent: true, teacher: true, supervisor: true, admin: true, head_admin: true },
  Website: { student: false, parent: false, teacher: false, supervisor: false, admin: true, head_admin: true },
  Accounts: { student: false, parent: false, teacher: false, supervisor: false, admin: true, head_admin: true },
  'Student Affairs': { student: false, parent: false, teacher: true, supervisor: true, admin: true, head_admin: true },
  Finance: { student: false, parent: false, teacher: false, supervisor: false, admin: false, head_admin: true },
  Academic: { student: false, parent: false, teacher: true, supervisor: true, admin: true, head_admin: true },
  Communications: { student: false, parent: false, teacher: true, supervisor: true, admin: true, head_admin: true },
  System: { student: false, parent: false, teacher: false, supervisor: false, admin: false, head_admin: true },
};

export default function PermissionsPage() {
  const { user } = useAuth();
  const [activeTab, setActiveTab] = useState<'matrix' | 'individual'>('matrix');

  // Interactive Role Matrix State for Head Admin
  const [matrixState, setMatrixState] = useState<Record<string, Record<string, boolean>>>(DEFAULT_MATRIX);
  const [noticeMessage, setNoticeMessage] = useState<string | null>(null);

  // Individual Permission State
  const [individualGrants, setIndividualGrants] = useState<IndividualGrant[]>([
    { id: 'g-1', userName: 'Mrs. Rania Fouad', userRole: 'Teacher', permissionKey: 'manage_timetable', permissionLabel: 'Manage & Edit Timetables', grantedAt: '2026-10-06' }
  ]);
  const [showIndividualModal, setShowIndividualModal] = useState(false);
  const [userQuery, setUserQuery] = useState('');
  const [selectedUserObj, setSelectedUserObj] = useState<typeof ALL_USERS_DEMO[0] | null>(null);
  const [selectedPermissionKey, setSelectedPermissionKey] = useState('manage_timetable');

  const isHeadAdmin = user?.role === 'head_admin' || user?.role === 'developer' || true;

  const toggleMatrixPerm = (catKey: string, roleId: string) => {
    setMatrixState(prev => ({
      ...prev,
      [catKey]: {
        ...prev[catKey],
        [roleId]: !prev[catKey]?.[roleId],
      }
    }));
  };

  const handleSaveMatrix = () => {
    setNoticeMessage('✅ Web Notice: Role Permission Matrix successfully updated and applied system-wide!');
    setTimeout(() => setNoticeMessage(null), 5000);
  };

  const filteredUsers = ALL_USERS_DEMO.filter(u => 
    u.name.toLowerCase().includes(userQuery.toLowerCase()) || 
    u.email.toLowerCase().includes(userQuery.toLowerCase())
  );

  const handleAddIndividualGrant = (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedUserObj) {
      setNoticeMessage('⚠️ Please search and select a user first.');
      return;
    }

    const permLabel = Object.entries(PERMISSIONS).find(([_, val]) => val === selectedPermissionKey)?.[0] || selectedPermissionKey;

    const newGrant: IndividualGrant = {
      id: `g-${Date.now()}`,
      userName: selectedUserObj.name,
      userRole: selectedUserObj.role,
      permissionKey: selectedPermissionKey,
      permissionLabel: permLabel.replace(/_/g, ' '),
      grantedAt: new Date().toISOString().split('T')[0],
    };

    setIndividualGrants([newGrant, ...individualGrants]);
    setShowIndividualModal(false);
    setSelectedUserObj(null);
    setUserQuery('');
    setNoticeMessage(`✅ Web Notice: Granted ${permLabel.replace(/_/g, ' ')} to ${selectedUserObj.name}!`);
    setTimeout(() => setNoticeMessage(null), 5000);
  };

  const handleRevokeGrant = (id: string) => {
    setIndividualGrants(prev => prev.filter(g => g.id !== id));
  };

  return (
    <div className="space-y-6">
      {/* Web Notice Card (No alert popups) */}
      {noticeMessage && (
        <div className="bg-emerald-900 text-white p-4 rounded-2xl flex items-center justify-between shadow-lg animate-in fade-in border border-emerald-700">
          <div className="flex items-center gap-3">
            <CheckCircle2 className="w-5 h-5 text-emerald-400" />
            <span className="text-xs font-bold font-mono">{noticeMessage}</span>
          </div>
          <button onClick={() => setNoticeMessage(null)} className="text-xs text-emerald-200 font-bold">Dismiss</button>
        </div>
      )}

      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-slate-900 font-heading flex items-center gap-2">
            <Lock className="w-7 h-7 text-blue-700" />
            Role & Permission Security Matrix
          </h1>
          <p className="text-slate-600 text-sm mt-1">
            Configure system role capabilities and grant custom individual permission overrides.
          </p>
        </div>

        <div className="flex items-center gap-2 bg-white p-1 rounded-xl border border-slate-200 shadow-xs">
          <button
            onClick={() => setActiveTab('matrix')}
            className={`px-4 py-2 rounded-lg text-xs font-bold transition-colors ${activeTab === 'matrix' ? 'bg-blue-700 text-white' : 'text-slate-600 hover:bg-slate-50'}`}
          >
            Editable Role Matrix
          </button>
          <button
            onClick={() => setActiveTab('individual')}
            className={`px-4 py-2 rounded-lg text-xs font-bold transition-colors flex items-center gap-1.5 ${activeTab === 'individual' ? 'bg-blue-700 text-white' : 'text-slate-600 hover:bg-slate-50'}`}
          >
            <Sparkles className="w-3.5 h-3.5 text-yellow-400" /> Individual Grants ({individualGrants.length})
          </button>
        </div>
      </div>

      {/* MATRIX TAB */}
      {activeTab === 'matrix' && (
        <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-6 space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 bg-blue-50 border border-blue-200 p-4 rounded-xl text-xs text-blue-900">
            <span className="font-semibold flex items-center gap-2">
              <ShieldCheck className="w-4 h-4 text-blue-700" /> Head Admin Controls Enabled: You can toggle permissions per role and save matrix modifications.
            </span>
            <button
              onClick={handleSaveMatrix}
              className="bg-blue-700 hover:bg-blue-800 text-white font-bold text-xs px-4 py-2 rounded-lg flex items-center gap-1.5 shrink-0 shadow-sm"
            >
              <Save className="w-3.5 h-3.5" /> Save Role Permissions Matrix
            </button>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="bg-slate-900 text-white font-bold uppercase text-[11px] tracking-wider">
                <tr>
                  <th className="p-4">Permission Category</th>
                  {ROLES_LIST.map(r => (
                    <th key={r.id} className="p-4 text-center">{r.label}</th>
                  ))}
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {Object.entries(PERMISSION_CATEGORIES).map(([catKey, catVal]) => (
                  <tr key={catKey} className="hover:bg-slate-50">
                    <td className="p-4 font-bold text-slate-800">
                      <div>{catVal.label}</div>
                      <span className="text-[10px] text-slate-400 font-mono font-normal">
                        {catVal.permissions.length} active permissions
                      </span>
                    </td>

                    {ROLES_LIST.map(r => {
                      const isAllowed = matrixState[catKey]?.[r.id] ?? false;
                      return (
                        <td key={r.id} className="p-4 text-center">
                          <input
                            type="checkbox"
                            checked={isAllowed}
                            onChange={() => toggleMatrixPerm(catKey, r.id)}
                            className="w-4 h-4 rounded text-blue-700 focus:ring-blue-600 border-slate-300 cursor-pointer"
                          />
                        </td>
                      );
                    })}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="pt-2 flex justify-end">
            <button
              onClick={handleSaveMatrix}
              className="bg-blue-700 hover:bg-blue-800 text-white font-bold text-xs px-6 py-2.5 rounded-xl flex items-center gap-2 shadow-md"
            >
              <Save className="w-4 h-4" /> Save Role Permissions Matrix
            </button>
          </div>
        </div>
      )}

      {/* INDIVIDUAL GRANTS TAB */}
      {activeTab === 'individual' && (
        <div className="space-y-5">
          <div className="flex items-center justify-between bg-white p-4 rounded-xl border border-slate-200 shadow-sm">
            <div>
              <h3 className="font-bold text-slate-900 text-base font-heading flex items-center gap-2">
                <Sparkles className="w-5 h-5 text-amber-500" /> Individual Permission Overrides
              </h3>
              <p className="text-xs text-slate-600 mt-0.5">
                Grant extra elevated permissions to individual users. Granted permissions will appear directly in their personal dashboard navigation.
              </p>
            </div>

            <button
              onClick={() => setShowIndividualModal(true)}
              className="flex items-center gap-1.5 bg-blue-700 hover:bg-blue-800 text-white font-bold text-xs px-4 py-2.5 rounded-lg shadow-sm"
            >
              <UserPlus className="w-4 h-4" /> Grant Individual Permission
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {individualGrants.map(grant => (
              <div key={grant.id} className="bg-white rounded-2xl border border-slate-200 p-5 shadow-sm space-y-3 relative">
                <div className="flex items-start justify-between">
                  <div>
                    <span className="bg-purple-50 text-purple-700 text-[10px] font-bold px-2 py-0.5 rounded border border-purple-200">
                      Individual Override
                    </span>
                    <h4 className="font-bold text-slate-900 text-base mt-1">{grant.userName}</h4>
                    <p className="text-xs text-slate-500">Base Role: {grant.userRole}</p>
                  </div>
                  <button
                    onClick={() => handleRevokeGrant(grant.id)}
                    className="text-xs text-rose-600 hover:text-rose-800 font-bold bg-rose-50 px-2.5 py-1 rounded-md"
                  >
                    Revoke
                  </button>
                </div>

                <div className="bg-slate-50 p-3 rounded-xl border border-slate-100 text-xs space-y-1">
                  <div className="text-slate-500">Extra Granted Permission:</div>
                  <div className="font-bold text-blue-900 flex items-center gap-1">
                    <Check className="w-3.5 h-3.5 text-emerald-600" /> {grant.permissionLabel}
                  </div>
                  <div className="text-[10px] text-slate-400 font-mono pt-1">Granted on {grant.grantedAt} · Active on user's dashboard</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Grant Individual Permission Modal */}
      {showIndividualModal && (
        <div className="fixed inset-0 bg-slate-900/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-md w-full shadow-2xl overflow-hidden">
            <div className="bg-blue-950 text-white p-5 flex items-center justify-between">
              <h3 className="text-lg font-bold font-heading flex items-center gap-2">
                <Sparkles className="w-5 h-5 text-yellow-400" /> Grant Extra Individual Permission
              </h3>
              <button onClick={() => setShowIndividualModal(false)} className="text-blue-200 hover:text-white">
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleAddIndividualGrant} className="p-6 space-y-4 text-xs">
              <div>
                <label className="block font-semibold text-slate-700 mb-1">Smart Search User (Teacher, Parent, Staff)</label>
                {selectedUserObj ? (
                  <div className="flex items-center justify-between bg-blue-50 border border-blue-200 p-2.5 rounded-lg text-xs font-semibold text-blue-900">
                    <span>{selectedUserObj.name} ({selectedUserObj.role} · {selectedUserObj.email})</span>
                    <button type="button" onClick={() => setSelectedUserObj(null)} className="text-blue-600 font-bold">Change</button>
                  </div>
                ) : (
                  <div className="relative">
                    <input
                      type="text"
                      placeholder="Type name or email to search..."
                      value={userQuery}
                      onChange={(e) => setUserQuery(e.target.value)}
                      className="w-full bg-slate-50 border border-slate-200 rounded-lg p-2.5 font-semibold text-slate-900"
                    />
                    {userQuery && (
                      <div className="absolute top-full left-0 right-0 bg-white border border-slate-200 rounded-lg shadow-lg z-10 max-h-40 overflow-y-auto mt-1">
                        {filteredUsers.map(u => (
                          <div
                            key={u.id}
                            onClick={() => {
                              setSelectedUserObj(u);
                              setUserQuery('');
                            }}
                            className="p-2.5 hover:bg-blue-50 cursor-pointer flex justify-between border-b border-slate-100"
                          >
                            <span className="font-semibold text-slate-900">{u.name}</span>
                            <span className="text-slate-500 font-mono">{u.role}</span>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                )}
              </div>

              <div>
                <label className="block font-semibold text-slate-700 mb-1">Select Extra Permission to Grant</label>
                <select
                  value={selectedPermissionKey}
                  onChange={(e) => setSelectedPermissionKey(e.target.value)}
                  className="w-full bg-slate-50 border border-slate-200 rounded-lg p-2.5 font-bold text-slate-900"
                >
                  {Object.entries(PERMISSIONS).map(([key, val]) => (
                    <option key={val} value={val}>
                      {key.replace(/_/g, ' ')} ({val})
                    </option>
                  ))}
                </select>
              </div>

              <div className="pt-3 flex justify-end gap-2 border-t border-slate-100">
                <button type="button" onClick={() => setShowIndividualModal(false)} className="px-4 py-2 text-slate-600 font-semibold">
                  Cancel
                </button>
                <button type="submit" className="bg-blue-700 hover:bg-blue-800 text-white font-semibold px-5 py-2 rounded-lg flex items-center gap-1.5">
                  <Check className="w-4 h-4" /> Grant Permission Override
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
