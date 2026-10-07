'use client';

import { useState } from 'react';
import { useAuth } from '@/lib/auth/context';
import { FileSearch, Filter, ShieldCheck, Eye, Search, Lock } from 'lucide-react';

interface AuditLog {
  id: string;
  user: string;
  role: string;
  action: string;
  module: string;
  ip: string;
  timestamp: string;
  details: string;
}

const DEMO_LOGS: AuditLog[] = [
  { id: 'LOG-881', user: 'Head Admin (Hoda Mansour)', role: 'head_admin', action: 'UPDATE_PERMISSIONS', module: 'Permissions', ip: '197.34.12.89', timestamp: '2026-10-07 10:14:02', details: 'Granted publish_final_exam_results to supervisor role' },
  { id: 'LOG-880', user: 'Mr. Sameh Farouk', role: 'teacher', action: 'SUBMIT_EXAM_RESULTS', module: 'Exams', ip: '41.130.45.12', timestamp: '2026-10-07 09:30:15', details: 'Submitted Grade 8 Mathematics Midterm results for 32 students' },
  { id: 'LOG-879', user: 'Admin User', role: 'admin', action: 'CREATE_STUDENT', module: 'Students', ip: '197.34.12.90', timestamp: '2026-10-06 14:22:11', details: 'Registered new student Youssef Ahmed (NL-2026-00142)' },
  { id: 'LOG-878', user: 'Developer (Hidden SysAdmin)', role: 'developer', action: 'RUN_MIGRATION', module: 'System', ip: '127.0.0.1', timestamp: '2026-10-06 08:00:00', details: 'Applied Supabase RLS security policies v1.4' },
];

export default function AuditLogsPage() {
  const { hasPermission, user } = useAuth();
  const [search, setSearch] = useState('');
  const [selectedLog, setSelectedLog] = useState<AuditLog | null>(null);

  const canViewLogs = hasPermission('view_audit_logs');

  if (!canViewLogs) {
    return (
      <div className="bg-rose-50 border border-rose-200 rounded-xl p-6 text-center space-y-3">
        <Lock className="w-8 h-8 text-rose-600 mx-auto" />
        <h3 className="text-lg font-bold text-rose-900">Access Restricted</h3>
        <p className="text-xs text-rose-700">You do not have permission to view immutable system audit logs.</p>
      </div>
    );
  }

  const filteredLogs = DEMO_LOGS.filter(l => 
    l.user.toLowerCase().includes(search.toLowerCase()) || 
    l.action.toLowerCase().includes(search.toLowerCase()) || 
    l.module.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-slate-900 font-heading flex items-center gap-2">
            <FileSearch className="w-7 h-7 text-blue-700" />
            Immutable Audit Logs
          </h1>
          <p className="text-slate-600 text-sm mt-1">
            Real-time security log tracing all administrative, grading, permission, and account modifications.
          </p>
        </div>
      </div>

      <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-sm flex items-center gap-3">
        <Search className="w-4 h-4 text-slate-400" />
        <input
          type="text"
          placeholder="Filter logs by user, action, or module..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full bg-transparent text-sm focus:outline-none text-slate-800"
        />
      </div>

      <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden">
        <table className="w-full text-left text-sm">
          <thead className="bg-slate-50 border-b border-slate-200 text-slate-600 text-xs uppercase tracking-wider font-semibold">
            <tr>
              <th className="py-3.5 px-4">Log ID</th>
              <th className="py-3.5 px-4">Timestamp</th>
              <th className="py-3.5 px-4">User</th>
              <th className="py-3.5 px-4">Action</th>
              <th className="py-3.5 px-4">Module</th>
              <th className="py-3.5 px-4">IP Address</th>
              <th className="py-3.5 px-4 text-right">Details</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100 text-xs">
            {filteredLogs.map(log => (
              <tr key={log.id} className="hover:bg-slate-50/70">
                <td className="py-3.5 px-4 font-mono font-bold text-blue-900">{log.id}</td>
                <td className="py-3.5 px-4 text-slate-500 font-mono">{log.timestamp}</td>
                <td className="py-3.5 px-4 font-semibold text-slate-900">{log.user}</td>
                <td className="py-3.5 px-4">
                  <span className="bg-slate-100 font-mono text-[11px] px-2 py-0.5 rounded text-slate-800">
                    {log.action}
                  </span>
                </td>
                <td className="py-3.5 px-4 text-slate-600 font-medium">{log.module}</td>
                <td className="py-3.5 px-4 font-mono text-slate-500">{log.ip}</td>
                <td className="py-3.5 px-4 text-right">
                  <button
                    onClick={() => setSelectedLog(log)}
                    className="text-blue-700 hover:text-blue-900 font-medium text-xs hover:bg-blue-50 px-2 py-1 rounded"
                  >
                    Inspect
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {selectedLog && (
        <div className="fixed inset-0 bg-slate-900/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-md w-full p-6 space-y-4 shadow-2xl">
            <h3 className="font-bold text-lg text-slate-900 font-heading">Audit Record #{selectedLog.id}</h3>
            <div className="bg-slate-50 p-4 rounded-xl border border-slate-200 text-xs font-mono space-y-2 text-slate-700">
              <div><strong className="text-slate-900">User:</strong> {selectedLog.user}</div>
              <div><strong className="text-slate-900">Role:</strong> {selectedLog.role}</div>
              <div><strong className="text-slate-900">Action:</strong> {selectedLog.action}</div>
              <div><strong className="text-slate-900">IP:</strong> {selectedLog.ip}</div>
              <div><strong className="text-slate-900">Payload Details:</strong> {selectedLog.details}</div>
            </div>
            <button
              onClick={() => setSelectedLog(null)}
              className="w-full bg-slate-800 text-white text-xs font-semibold py-2 rounded-lg"
            >
              Close Record
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
