'use client';

import { useState } from 'react';
import { useAuth } from '@/lib/auth/context';
import { Shield, Search, Plus, Mail, Phone, BookOpen, UserCheck, X, CheckCircle2 } from 'lucide-react';

interface Supervisor {
  id: string;
  name: string;
  code: string;
  email: string;
  phone: string;
  assignedStage: 'Primary' | 'Preparatory' | 'Both';
  assignedGrades: string[];
  teachersCount: number;
}

const INITIAL_SUPERVISORS: Supervisor[] = [
  {
    id: 'sup-1',
    name: 'Fatima Ali',
    code: 'SUP-001',
    email: 'fatima.ali@nlls.com',
    phone: '+20 100 888 9900',
    assignedStage: 'Primary',
    assignedGrades: ['Primary 1', 'Primary 2', 'Primary 3', 'Primary 4', 'Primary 5', 'Primary 6'],
    teachersCount: 8,
  },
  {
    id: 'sup-2',
    name: 'Khaled Mansour',
    code: 'SUP-002',
    email: 'khaled.mansour@nlls.com',
    phone: '+20 101 777 6655',
    assignedStage: 'Preparatory',
    assignedGrades: ['Preparatory 1', 'Preparatory 2', 'Preparatory 3'],
    teachersCount: 6,
  },
];

export default function SupervisorsManagementPage() {
  const { user } = useAuth();
  const [supervisors, setSupervisors] = useState<Supervisor[]>(INITIAL_SUPERVISORS);
  const [search, setSearch] = useState('');
  const [showAddModal, setShowAddModal] = useState(false);

  // Form State
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [stage, setStage] = useState<'Primary' | 'Preparatory' | 'Both'>('Primary');

  const handleAddSupervisor = (e: React.FormEvent) => {
    e.preventDefault();
    const created: Supervisor = {
      id: `sup-${Date.now()}`,
      name,
      code: `SUP-00${supervisors.length + 1}`,
      email,
      phone,
      assignedStage: stage,
      assignedGrades: stage === 'Primary' ? ['Primary 1..6'] : stage === 'Preparatory' ? ['Preparatory 1..3'] : ['All Grades'],
      teachersCount: 5,
    };
    setSupervisors([created, ...supervisors]);
    setShowAddModal(false);
    setName('');
    setEmail('');
    setPhone('');
  };

  const filteredSupervisors = supervisors.filter(s => {
    const q = search.toLowerCase().trim();
    if (!q) return true;
    return (
      s.name.toLowerCase().includes(q) ||
      s.code.toLowerCase().includes(q) ||
      s.email.toLowerCase().includes(q) ||
      s.assignedStage.toLowerCase().includes(q)
    );
  });

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-slate-900 font-heading flex items-center gap-2">
            <Shield className="w-7 h-7 text-blue-700" />
            Academic Supervisors Oversight
          </h1>
          <p className="text-slate-600 text-sm mt-1">
            Supervise stage lead supervisors, teacher evaluation assignments, and curriculum quality.
          </p>
        </div>

        <button
          onClick={() => setShowAddModal(true)}
          className="flex items-center justify-center gap-2 bg-blue-700 hover:bg-blue-800 text-white font-semibold px-4 py-2.5 rounded-lg shadow-sm text-sm"
        >
          <Plus className="w-4 h-4" /> Appoint Supervisor
        </button>
      </div>

      {/* Smart Search */}
      <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-sm flex items-center gap-3">
        <Search className="w-4 h-4 text-slate-400" />
        <input
          type="text"
          placeholder="Smart Search supervisors by name, code, email, stage..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full bg-transparent text-sm focus:outline-none text-slate-800 font-medium"
        />
      </div>

      {/* Supervisors Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        {filteredSupervisors.map(s => (
          <div key={s.id} className="bg-white rounded-2xl border border-slate-200 p-5 shadow-sm space-y-4 hover:shadow-md transition-all">
            <div className="flex items-start justify-between">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-full bg-amber-100 text-amber-900 font-bold flex items-center justify-center text-base border border-amber-300">
                  {s.name.split(' ').map(n => n[0]).slice(0, 2).join('')}
                </div>
                <div>
                  <h3 className="font-bold text-slate-900 text-base">{s.name}</h3>
                  <p className="text-xs text-slate-500 font-mono">{s.code}</p>
                </div>
              </div>

              <span className="bg-amber-50 text-amber-800 text-xs font-bold px-3 py-1 rounded-full border border-amber-200">
                {s.assignedStage} Stage Supervisor
              </span>
            </div>

            <div className="text-xs text-slate-600 space-y-1.5 border-t border-slate-100 pt-3">
              <div className="flex items-center gap-2"><Mail className="w-3.5 h-3.5 text-blue-600" /> {s.email}</div>
              <div className="flex items-center gap-2"><Phone className="w-3.5 h-3.5 text-blue-600" /> {s.phone}</div>
              <div className="flex items-center gap-2"><UserCheck className="w-3.5 h-3.5 text-blue-600" /> Supervised Teachers: <strong>{s.teachersCount} Active Teachers</strong></div>
            </div>

            <div className="bg-slate-50 p-3 rounded-xl border border-slate-100 text-xs">
              <span className="text-slate-500 font-bold block mb-1">Supervised Cohorts:</span>
              <div className="flex flex-wrap gap-1">
                {s.assignedGrades.map(g => (
                  <span key={g} className="bg-white border border-slate-200 px-2 py-0.5 rounded text-slate-700 font-medium">
                    {g}
                  </span>
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Modal: Appoint Supervisor */}
      {showAddModal && (
        <div className="fixed inset-0 bg-slate-900/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-md w-full shadow-2xl overflow-hidden">
            <div className="bg-blue-950 text-white p-5 flex items-center justify-between">
              <h3 className="text-lg font-bold font-heading">Appoint Academic Supervisor</h3>
              <button onClick={() => setShowAddModal(false)} className="text-blue-200 hover:text-white">
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleAddSupervisor} className="p-6 space-y-4 text-xs">
              <div>
                <label className="block font-semibold text-slate-700 mb-1">Supervisor Full Name</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Dr. Hoda Mansour"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full bg-slate-50 border border-slate-200 rounded-lg p-2.5 font-medium"
                />
              </div>

              <div>
                <label className="block font-semibold text-slate-700 mb-1">Official Email</label>
                <input
                  type="email"
                  required
                  placeholder="hoda.mansour@nlls.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full bg-slate-50 border border-slate-200 rounded-lg p-2.5"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-semibold text-slate-700 mb-1">Phone Number</label>
                  <input
                    type="text"
                    required
                    placeholder="+20 100 000 0000"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    className="w-full bg-slate-50 border border-slate-200 rounded-lg p-2.5"
                  />
                </div>
                <div>
                  <label className="block font-semibold text-slate-700 mb-1">Supervised Stage</label>
                  <select
                    value={stage}
                    onChange={(e) => setStage(e.target.value as any)}
                    className="w-full bg-slate-50 border border-slate-200 rounded-lg p-2.5 font-bold"
                  >
                    <option value="Primary">Primary Stage</option>
                    <option value="Preparatory">Preparatory Stage</option>
                    <option value="Both">Both Stages</option>
                  </select>
                </div>
              </div>

              <div className="pt-3 flex justify-end gap-2 border-t border-slate-100">
                <button type="button" onClick={() => setShowAddModal(false)} className="px-4 py-2 text-slate-600 font-semibold">
                  Cancel
                </button>
                <button type="submit" className="bg-blue-700 hover:bg-blue-800 text-white font-semibold px-5 py-2 rounded-lg flex items-center gap-1.5">
                  <CheckCircle2 className="w-4 h-4" /> Save Supervisor
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
