'use client';

import { useState } from 'react';
import { Send, Search, CheckCircle2, Clock, XCircle, MessageSquare } from 'lucide-react';

interface RequestItem {
  id: string;
  requesterName: string;
  requesterRole: string;
  type: string;
  subject: string;
  submittedDate: string;
  status: 'submitted' | 'in_progress' | 'resolved';
}

const INITIAL_REQUESTS: RequestItem[] = [
  { id: 'REQ-101', requesterName: 'Mr. Amr Fouad', requesterRole: 'Parent', type: 'Meeting Request', subject: 'Inquiry regarding Primary 1 math progress for Hamza', submittedDate: '2026-10-06', status: 'submitted' },
  { id: 'REQ-102', requesterName: 'Eng. Sherif Mansour', requesterRole: 'Parent', type: 'Document Request', subject: 'Official Enrollment Certificate for Embassy', submittedDate: '2026-10-05', status: 'in_progress' },
  { id: 'REQ-103', requesterName: 'Mrs. Rania Fouad', requesterRole: 'Teacher', type: 'Resource Request', subject: 'Interactive Smartboard Marker & Whiteboard Supplies', submittedDate: '2026-10-03', status: 'resolved' },
];

export default function RequestsManagementPage() {
  const [requests, setRequests] = useState<RequestItem[]>(INITIAL_REQUESTS);
  const [search, setSearch] = useState('');

  const handleStatusChange = (id: string, newStatus: RequestItem['status']) => {
    setRequests(prev => prev.map(r => r.id === id ? { ...r, status: newStatus } : r));
  };

  const filtered = requests.filter(r => {
    const q = search.toLowerCase().trim();
    if (!q) return true;
    return r.requesterName.toLowerCase().includes(q) || r.subject.toLowerCase().includes(q) || r.type.toLowerCase().includes(q);
  });

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-slate-900 font-heading flex items-center gap-2">
            <Send className="w-7 h-7 text-blue-700" />
            Parent & Staff Helpdesk Requests
          </h1>
          <p className="text-slate-600 text-sm mt-1">
            Manage inquiries, meeting requests, document issuances, and administrative support tickets.
          </p>
        </div>
      </div>

      {/* Smart Search */}
      <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-sm flex items-center gap-3">
        <Search className="w-4 h-4 text-slate-400" />
        <input
          type="text"
          placeholder="Smart Search requests by requester, subject, category..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full bg-transparent text-sm focus:outline-none text-slate-800 font-medium"
        />
      </div>

      <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
        <table className="w-full text-left text-xs">
          <thead className="bg-slate-900 text-white font-bold uppercase text-[11px] tracking-wider">
            <tr>
              <th className="p-4">Ticket Ref & Requester</th>
              <th className="p-4">Request Type</th>
              <th className="p-4">Subject</th>
              <th className="p-4">Date</th>
              <th className="p-4">Status</th>
              <th className="p-4 text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100 font-medium text-slate-800">
            {filtered.map(r => (
              <tr key={r.id} className="hover:bg-slate-50">
                <td className="p-4">
                  <div className="font-bold text-slate-900 text-sm">{r.requesterName}</div>
                  <div className="font-mono text-blue-800 text-[11px]">{r.id} · {r.requesterRole}</div>
                </td>
                <td className="p-4 font-bold text-blue-900">{r.type}</td>
                <td className="p-4">{r.subject}</td>
                <td className="p-4 font-mono text-slate-500">{r.submittedDate}</td>
                <td className="p-4">
                  <span className={`px-2 py-0.5 rounded font-bold ${
                    r.status === 'resolved' ? 'bg-emerald-100 text-emerald-800' :
                    r.status === 'in_progress' ? 'bg-blue-100 text-blue-800' : 'bg-amber-100 text-amber-800'
                  }`}>
                    {r.status.replace(/_/g, ' ').toUpperCase()}
                  </span>
                </td>
                <td className="p-4 text-right space-x-1">
                  {r.status !== 'resolved' && (
                    <button
                      onClick={() => handleStatusChange(r.id, 'resolved')}
                      className="bg-emerald-600 hover:bg-emerald-700 text-white font-bold px-3 py-1.5 rounded-lg"
                    >
                      Mark Resolved
                    </button>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
