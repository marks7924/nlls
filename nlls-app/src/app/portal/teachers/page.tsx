'use client';

import { useState } from 'react';
import { useAuth } from '@/lib/auth/context';
import { 
  UserCheck, Search, Filter, Plus, Mail, Phone, BookOpen, GraduationCap, 
  Award, ArrowUpRight, Shield, CheckCircle2, X, Sparkles, Star
} from 'lucide-react';

interface Teacher {
  id: string;
  name: string;
  nameAr?: string;
  code: string;
  email: string;
  phone: string;
  subject: string;
  stages: string[];
  roleTitle: 'Teacher' | 'Senior Teacher' | 'Head of Department' | 'Lead Supervisor' | 'Academic Director';
  status: 'active' | 'on_leave';
  assignedClasses: string[];
  promotionHistory?: { title: string; date: string }[];
}

const INITIAL_TEACHERS: Teacher[] = [
  {
    id: 't-1',
    name: 'Mrs. Rania Fouad',
    code: 'TCH-001',
    email: 'rania.fouad@nlls.edu.eg',
    phone: '+20 100 123 4567',
    subject: 'English Language & Literature',
    stages: ['Primary'],
    roleTitle: 'Senior Teacher',
    status: 'active',
    assignedClasses: ['Primary 1', 'Primary 2'],
    promotionHistory: [{ title: 'Senior Teacher', date: '2025-09-01' }]
  },
  {
    id: 't-2',
    name: 'Mr. Sameh Farouk',
    code: 'TCH-002',
    email: 'sameh.farouk@nlls.edu.eg',
    phone: '+20 101 234 5678',
    subject: 'Mathematics & Advanced Algebra',
    stages: ['Preparatory'],
    roleTitle: 'Head of Department',
    status: 'active',
    assignedClasses: ['Preparatory 1', 'Preparatory 2', 'Preparatory 3'],
    promotionHistory: [
      { title: 'Senior Teacher', date: '2024-09-01' },
      { title: 'Head of Department', date: '2026-01-15' }
    ]
  },
  {
    id: 't-3',
    name: 'Ms. Salma Nabil',
    code: 'TCH-003',
    email: 'salma.nabil@nlls.edu.eg',
    phone: '+20 102 345 6789',
    subject: 'Science & Physics Fundamentals',
    stages: ['Primary', 'Preparatory'],
    roleTitle: 'Teacher',
    status: 'active',
    assignedClasses: ['Primary 3', 'Primary 4'],
  },
  {
    id: 't-4',
    name: 'Dr. Ahmed Rashed',
    code: 'TCH-004',
    email: 'ahmed.rashed@nlls.edu.eg',
    phone: '+20 103 456 7890',
    subject: 'French Language',
    stages: ['Primary', 'Preparatory'],
    roleTitle: 'Senior Teacher',
    status: 'active',
    assignedClasses: ['Primary 6', 'Preparatory 1'],
    promotionHistory: [{ title: 'Senior Teacher', date: '2025-01-10' }]
  },
  {
    id: 't-5',
    name: 'Mrs. Dina Hassan',
    code: 'TCH-005',
    email: 'dina.hassan@nlls.edu.eg',
    phone: '+20 104 567 8901',
    subject: 'Arabic & Quran Studies',
    stages: ['Primary'],
    roleTitle: 'Teacher',
    status: 'active',
    assignedClasses: ['Primary 3', 'Primary 5'],
  }
];

export default function TeachersPage() {
  const { user } = useAuth();
  const [teachers, setTeachers] = useState<Teacher[]>(INITIAL_TEACHERS);
  const [search, setSearch] = useState('');
  const [stageFilter, setStageFilter] = useState<string>('all');
  const [showAddModal, setShowAddModal] = useState(false);
  const [selectedTeacherForPromotion, setSelectedTeacherForPromotion] = useState<Teacher | null>(null);

  // Add Teacher Form
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [subject, setSubject] = useState('');
  const [stage, setStage] = useState('Primary');
  const [initialRole, setInitialRole] = useState<'Teacher' | 'Senior Teacher'>('Teacher');

  // Promote Teacher Form
  const [newTitle, setNewTitle] = useState<'Teacher' | 'Senior Teacher' | 'Head of Department' | 'Lead Supervisor' | 'Academic Director'>('Senior Teacher');
  const [promotionNotes, setPromotionNotes] = useState('');

  const canManageTeachers = user?.role === 'admin' || user?.role === 'head_admin' || user?.role === 'developer';

  const handleAddTeacher = (e: React.FormEvent) => {
    e.preventDefault();
    const newTech: Teacher = {
      id: `t-${Date.now()}`,
      name,
      code: `TCH-00${teachers.length + 1}`,
      email,
      phone,
      subject,
      stages: [stage],
      roleTitle: initialRole,
      status: 'active',
      assignedClasses: stage === 'Primary' ? ['Primary 1'] : ['Preparatory 1'],
    };
    setTeachers([newTech, ...teachers]);
    setShowAddModal(false);
    setName('');
    setEmail('');
    setPhone('');
    setSubject('');
  };

  const handlePromoteTeacher = (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedTeacherForPromotion) return;

    setTeachers(prev => prev.map(t => {
      if (t.id === selectedTeacherForPromotion.id) {
        const updatedHistory = t.promotionHistory || [];
        return {
          ...t,
          roleTitle: newTitle,
          promotionHistory: [
            ...updatedHistory,
            { title: newTitle, date: new Date().toISOString().split('T')[0] }
          ]
        };
      }
      return t;
    }));

    setSelectedTeacherForPromotion(null);
    setPromotionNotes('');
  };

  // Smart Search across multiple fields
  const filteredTeachers = teachers.filter(t => {
    const matchesStage = stageFilter === 'all' || t.stages.includes(stageFilter);
    const q = search.toLowerCase().trim();
    if (!q) return matchesStage;

    const matchesName = t.name.toLowerCase().includes(q);
    const matchesCode = t.code.toLowerCase().includes(q);
    const matchesEmail = t.email.toLowerCase().includes(q);
    const matchesSubject = t.subject.toLowerCase().includes(q);
    const matchesRole = t.roleTitle.toLowerCase().includes(q);
    const matchesClasses = t.assignedClasses.some(c => c.toLowerCase().includes(q));

    return matchesStage && (matchesName || matchesCode || matchesEmail || matchesSubject || matchesRole || matchesClasses);
  });

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-slate-900 font-heading flex items-center gap-2">
            <UserCheck className="w-7 h-7 text-blue-700" />
            Faculty & Teacher Management
          </h1>
          <p className="text-slate-600 text-sm mt-1">
            Manage faculty records, subject assignments, and academic teacher promotions.
          </p>
        </div>

        {canManageTeachers && (
          <button
            onClick={() => setShowAddModal(true)}
            className="flex items-center justify-center gap-2 bg-blue-700 hover:bg-blue-800 text-white font-semibold px-4 py-2.5 rounded-lg shadow-sm transition-colors text-sm"
          >
            <Plus className="w-4 h-4" /> Add New Teacher
          </button>
        )}
      </div>

      {/* Smart Search & Filter Toolbar */}
      <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-sm flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="relative w-full sm:w-96">
          <Search className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
          <input
            type="text"
            placeholder="Smart Search teachers by name, subject, code, class..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-9 pr-8 py-2 bg-slate-50 border border-slate-200 rounded-lg text-sm text-slate-800 focus:outline-none focus:ring-2 focus:ring-blue-600"
          />
          {search && (
            <button onClick={() => setSearch('')} className="absolute right-3 top-2.5 text-xs text-slate-400 hover:text-slate-600">✕</button>
          )}
        </div>

        <div className="flex items-center gap-2 w-full sm:w-auto">
          <button
            onClick={() => setStageFilter('all')}
            className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-colors ${stageFilter === 'all' ? 'bg-blue-700 text-white' : 'bg-slate-100 text-slate-700 hover:bg-slate-200'}`}
          >
            All Teachers ({teachers.length})
          </button>
          <button
            onClick={() => setStageFilter('Primary')}
            className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-colors ${stageFilter === 'Primary' ? 'bg-blue-700 text-white' : 'bg-slate-100 text-slate-700 hover:bg-slate-200'}`}
          >
            Primary Faculty
          </button>
          <button
            onClick={() => setStageFilter('Preparatory')}
            className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-colors ${stageFilter === 'Preparatory' ? 'bg-blue-700 text-white' : 'bg-slate-100 text-slate-700 hover:bg-slate-200'}`}
          >
            Preparatory Faculty
          </button>
        </div>
      </div>

      {/* Teachers Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        {filteredTeachers.map(t => (
          <div key={t.id} className="bg-white rounded-2xl border border-slate-200 p-5 shadow-sm hover:shadow-md transition-all space-y-4 relative">
            <div className="flex items-start justify-between">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-full bg-blue-100 text-blue-800 flex items-center justify-center font-bold text-lg border border-blue-200">
                  {t.name.split(' ').map(n => n[0]).slice(0, 2).join('')}
                </div>
                <div>
                  <h3 className="font-bold text-slate-900 text-base">{t.name}</h3>
                  <p className="text-xs text-slate-500 font-mono">{t.code}</p>
                </div>
              </div>
              
              <span className={`text-[10px] font-bold px-2.5 py-1 rounded-full border ${
                t.roleTitle === 'Head of Department' ? 'bg-purple-50 text-purple-700 border-purple-200' :
                t.roleTitle === 'Senior Teacher' ? 'bg-blue-50 text-blue-700 border-blue-200' :
                t.roleTitle === 'Lead Supervisor' ? 'bg-amber-50 text-amber-700 border-amber-200' :
                'bg-emerald-50 text-emerald-700 border-emerald-200'
              }`}>
                {t.roleTitle}
              </span>
            </div>

            <div className="space-y-2 text-xs border-t border-slate-100 pt-3 text-slate-600">
              <div className="flex items-center gap-2">
                <BookOpen className="w-3.5 h-3.5 text-blue-600" />
                <span className="font-semibold text-slate-800">{t.subject}</span>
              </div>
              <div className="flex items-center gap-2">
                <Mail className="w-3.5 h-3.5 text-slate-400" />
                <span>{t.email}</span>
              </div>
              <div className="flex items-center gap-2">
                <GraduationCap className="w-3.5 h-3.5 text-slate-400" />
                <span>Stages: <strong>{t.stages.join(', ')}</strong></span>
              </div>
              <div className="flex flex-wrap gap-1 mt-1">
                {t.assignedClasses.map(c => (
                  <span key={c} className="bg-slate-100 text-slate-700 px-2 py-0.5 rounded text-[11px] font-medium">
                    {c}
                  </span>
                ))}
              </div>
            </div>

            {/* Promotion Badge History */}
            {t.promotionHistory && t.promotionHistory.length > 0 && (
              <div className="bg-blue-50/60 p-2.5 rounded-xl border border-blue-100 text-[11px] space-y-1">
                <div className="flex items-center gap-1 text-blue-800 font-bold">
                  <Sparkles className="w-3 h-3 text-amber-500" /> Promotion Milestones:
                </div>
                {t.promotionHistory.map((h, idx) => (
                  <div key={idx} className="flex justify-between text-slate-600">
                    <span>Promoted to <strong>{h.title}</strong></span>
                    <span className="font-mono text-slate-400">{h.date}</span>
                  </div>
                ))}
              </div>
            )}

            {/* Admin Promote Button */}
            {canManageTeachers && (
              <div className="pt-2 border-t border-slate-100 flex items-center justify-end">
                <button
                  onClick={() => {
                    setSelectedTeacherForPromotion(t);
                    setNewTitle(t.roleTitle === 'Teacher' ? 'Senior Teacher' : 'Head of Department');
                  }}
                  className="flex items-center gap-1 text-xs font-bold text-blue-700 hover:text-blue-900 bg-blue-50 hover:bg-blue-100 px-3 py-1.5 rounded-lg transition-colors"
                >
                  <ArrowUpRight className="w-3.5 h-3.5" /> Promote Teacher
                </button>
              </div>
            )}
          </div>
        ))}
      </div>

      {/* Modal: Add New Teacher */}
      {showAddModal && (
        <div className="fixed inset-0 bg-slate-900/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-md w-full shadow-2xl overflow-hidden animate-in fade-in">
            <div className="bg-blue-950 text-white p-5 flex items-center justify-between">
              <h3 className="text-lg font-bold font-heading">Register New Faculty Teacher</h3>
              <button onClick={() => setShowAddModal(false)} className="text-blue-200 hover:text-white">
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleAddTeacher} className="p-6 space-y-4 text-xs">
              <div>
                <label className="block font-semibold text-slate-700 mb-1">Full Name</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Mrs. Nouran El-Sayed"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full bg-slate-50 border border-slate-200 rounded-lg p-2.5 text-slate-900 font-medium"
                />
              </div>

              <div>
                <label className="block font-semibold text-slate-700 mb-1">Official Email</label>
                <input
                  type="email"
                  required
                  placeholder="nouran.sayed@nlls.edu.eg"
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
                  <label className="block font-semibold text-slate-700 mb-1">Teaching Stage</label>
                  <select
                    value={stage}
                    onChange={(e) => setStage(e.target.value)}
                    className="w-full bg-slate-50 border border-slate-200 rounded-lg p-2.5 font-bold"
                  >
                    <option value="Primary">Primary Stage</option>
                    <option value="Preparatory">Preparatory Stage</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block font-semibold text-slate-700 mb-1">Specialization / Subject</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Science & Chemistry"
                  value={subject}
                  onChange={(e) => setSubject(e.target.value)}
                  className="w-full bg-slate-50 border border-slate-200 rounded-lg p-2.5"
                />
              </div>

              <div>
                <label className="block font-semibold text-slate-700 mb-1">Initial Rank Title</label>
                <select
                  value={initialRole}
                  onChange={(e) => setInitialRole(e.target.value as any)}
                  className="w-full bg-slate-50 border border-slate-200 rounded-lg p-2.5 font-bold"
                >
                  <option value="Teacher">Teacher</option>
                  <option value="Senior Teacher">Senior Teacher</option>
                </select>
              </div>

              <div className="pt-3 flex items-center justify-end gap-2 border-t border-slate-100">
                <button type="button" onClick={() => setShowAddModal(false)} className="px-4 py-2 text-slate-600 font-semibold">
                  Cancel
                </button>
                <button type="submit" className="bg-blue-700 hover:bg-blue-800 text-white font-semibold px-5 py-2 rounded-lg">
                  Save Teacher Profile
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Modal: Promote Teacher */}
      {selectedTeacherForPromotion && (
        <div className="fixed inset-0 bg-slate-900/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-md w-full shadow-2xl overflow-hidden">
            <div className="bg-blue-950 text-white p-5 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Award className="w-5 h-5 text-yellow-400" />
                <div>
                  <h3 className="text-lg font-bold font-heading">Promote Teacher</h3>
                  <p className="text-xs text-blue-200">{selectedTeacherForPromotion.name}</p>
                </div>
              </div>
              <button onClick={() => setSelectedTeacherForPromotion(null)} className="text-blue-200 hover:text-white">
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handlePromoteTeacher} className="p-6 space-y-4 text-xs">
              <div className="bg-slate-50 p-3 rounded-xl border border-slate-200 space-y-1">
                <p className="text-slate-500">Current Role Title:</p>
                <p className="font-bold text-slate-900 text-sm">{selectedTeacherForPromotion.roleTitle}</p>
              </div>

              <div>
                <label className="block font-semibold text-slate-700 mb-1">Select Target Promotion Rank</label>
                <select
                  value={newTitle}
                  onChange={(e) => setNewTitle(e.target.value as any)}
                  className="w-full bg-slate-50 border border-slate-200 rounded-lg p-2.5 text-xs text-slate-900 font-bold focus:ring-2 focus:ring-blue-600"
                >
                  <option value="Senior Teacher font-bold">Senior Teacher</option>
                  <option value="Head of Department">Head of Department</option>
                  <option value="Lead Supervisor">Lead Supervisor</option>
                  <option value="Academic Director">Academic Director</option>
                </select>
              </div>

              <div>
                <label className="block font-semibold text-slate-700 mb-1">Administrative Notes / Justification</label>
                <textarea
                  rows={3}
                  placeholder="Enter reason or evaluation score supporting this academic promotion..."
                  value={promotionNotes}
                  onChange={(e) => setPromotionNotes(e.target.value)}
                  className="w-full bg-slate-50 border border-slate-200 rounded-lg p-2.5"
                />
              </div>

              <div className="pt-3 flex items-center justify-end gap-2 border-t border-slate-100">
                <button type="button" onClick={() => setSelectedTeacherForPromotion(null)} className="px-4 py-2 text-slate-600 font-semibold">
                  Cancel
                </button>
                <button type="submit" className="bg-blue-700 hover:bg-blue-800 text-white font-semibold px-5 py-2 rounded-lg flex items-center gap-1.5">
                  <CheckCircle2 className="w-4 h-4" /> Confirm & Issue Promotion
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
