'use client';

import { useState, useEffect } from 'react';
import { useAuth } from '@/lib/auth/context';
import { 
  Users, Search, Filter, Plus, UserCheck, ShieldAlert, Key, Download, 
  ChevronRight, Eye, Edit3, Trash2, Mail, Phone, Calendar, GraduationCap, X, CheckCircle2 
} from 'lucide-react';
import { getStoredStudents, registerNewStudent, type StudentRecord } from '@/lib/students-store';

export default function StudentsPage() {
  const { hasPermission } = useAuth();
  const [students, setStudents] = useState<StudentRecord[]>([]);
  const [search, setSearch] = useState('');
  const [stageFilter, setStageFilter] = useState('all');
  const [statusFilter, setStatusFilter] = useState('all');
  const [selectedStudent, setSelectedStudent] = useState<StudentRecord | null>(null);
  
  // Registration Modal State
  const [showRegisterModal, setShowRegisterModal] = useState(false);
  const [name, setName] = useState('');
  const [arabicName, setArabicName] = useState('');
  const [stage, setStage] = useState<'Primary' | 'Preparatory'>('Primary');
  const [grade, setGrade] = useState('Primary 1');
  const [gender, setGender] = useState<'male' | 'female'>('male');
  const [parentName, setParentName] = useState('');
  const [parentPhone, setParentPhone] = useState('');
  const [parentEmail, setParentEmail] = useState('');
  const [webNotice, setWebNotice] = useState<string | null>(null);

  useEffect(() => {
    setStudents(getStoredStudents());
  }, []);

  const canEdit = true;
  const canCreate = true;

  const handleRegisterStudentSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const created = registerNewStudent({
      name,
      arabicName,
      stage,
      grade,
      gender,
      parentName,
      parentPhone,
      parentEmail,
    });
    setStudents(getStoredStudents());
    setShowRegisterModal(false);
    setName('');
    setArabicName('');
    setParentName('');
    setParentPhone('');
    setParentEmail('');
    setWebNotice(`✅ Web Notice: Student ${created.name} (${created.studentId}) successfully registered into ${created.grade}!`);
    setTimeout(() => setWebNotice(null), 5000);
  };

  const filteredStudents = students.filter((s) => {
    const q = search.toLowerCase().trim();
    const matchesSearch = !q || (
      s.name.toLowerCase().includes(q) || 
      (s.arabicName && s.arabicName.includes(q)) || 
      s.studentId.toLowerCase().includes(q) ||
      s.className.toLowerCase().includes(q) ||
      s.parentName.toLowerCase().includes(q)
    );
    const matchesStage = stageFilter === 'all' || s.stage === stageFilter;
    const matchesStatus = statusFilter === 'all' || s.status === statusFilter;
    return matchesSearch && matchesStage && matchesStatus;
  });

  return (
    <div className="space-y-6">
      {webNotice && (
        <div className="bg-emerald-900 text-white p-4 rounded-2xl flex items-center justify-between shadow-lg font-mono text-xs border border-emerald-700">
          <span>{webNotice}</span>
          <button onClick={() => setWebNotice(null)} className="font-bold text-emerald-200">Dismiss</button>
        </div>
      )}

      {/* Page Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-slate-900 font-heading flex items-center gap-2">
            <Users className="w-7 h-7 text-blue-700" />
            Active Student Roster Management
          </h1>
          <p className="text-slate-600 text-sm mt-1">
            Browse active students, manage profiles, and register new students across Primary (1–6) & Preparatory (1–3).
          </p>
        </div>

        <button
          onClick={() => setShowRegisterModal(true)}
          className="flex items-center justify-center gap-2 bg-blue-700 hover:bg-blue-800 text-white font-semibold px-4 py-2.5 rounded-lg shadow-sm transition-colors text-sm"
        >
          <Plus className="w-4 h-4" />
          Register New Student
        </button>
      </div>

      {/* Filters & Smart Search Bar */}
      <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-sm flex flex-col md:flex-row items-stretch md:items-center gap-3 justify-between">
        <div className="relative flex-1 max-w-md">
          <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
          <input
            type="text"
            placeholder="Smart Search student name, ID, class, parent..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-9 pr-4 py-2 bg-slate-50 border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-600/20 focus:border-blue-600"
          />
        </div>

        <div className="flex items-center gap-3 overflow-x-auto">
          <div className="flex items-center gap-1 text-xs text-slate-500 font-medium whitespace-nowrap">
            <Filter className="w-3.5 h-3.5" /> Filter by:
          </div>

          <select
            value={stageFilter}
            onChange={(e) => setStageFilter(e.target.value)}
            className="bg-slate-50 border border-slate-200 text-slate-700 text-xs rounded-lg px-3 py-2 font-semibold"
          >
            <option value="all">All Stages</option>
            <option value="Primary">Primary Stage (1–6)</option>
            <option value="Preparatory">Preparatory Stage (1–3)</option>
          </select>

          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="bg-slate-50 border border-slate-200 text-slate-700 text-xs rounded-lg px-3 py-2 font-semibold"
          >
            <option value="all">All Statuses</option>
            <option value="active">Active</option>
            <option value="suspended">Suspended</option>
            <option value="graduated">Graduated</option>
          </select>
        </div>
      </div>

      {/* Students Table */}
      <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm">
            <thead className="bg-slate-900 text-white text-xs uppercase tracking-wider font-bold">
              <tr>
                <th className="py-3.5 px-4">Student Code</th>
                <th className="py-3.5 px-4">Full Name</th>
                <th className="py-3.5 px-4">Stage & Grade</th>
                <th className="py-3.5 px-4">Class Cohort</th>
                <th className="py-3.5 px-4">Parent / Guardian</th>
                <th className="py-3.5 px-4">Status</th>
                <th className="py-3.5 px-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 text-slate-700 text-xs">
              {filteredStudents.length > 0 ? (
                filteredStudents.map((student) => (
                  <tr key={student.id} className="hover:bg-slate-50/80 transition-colors">
                    <td className="py-3.5 px-4 font-mono font-bold text-blue-900">
                      {student.studentId}
                    </td>
                    <td className="py-3.5 px-4">
                      <div className="font-bold text-slate-900">{student.name}</div>
                      <div className="text-slate-400 text-[11px] font-arabic">{student.arabicName}</div>
                    </td>
                    <td className="py-3.5 px-4 font-medium text-slate-800">
                      <span className="inline-flex items-center gap-1.5">
                        <GraduationCap className="w-3.5 h-3.5 text-blue-600" />
                        {student.stage} · {student.grade}
                      </span>
                    </td>
                    <td className="py-3.5 px-4">
                      <span className="bg-blue-50 text-blue-800 text-xs font-bold px-2.5 py-1 rounded-md border border-blue-200">
                        {student.className}
                      </span>
                    </td>
                    <td className="py-3.5 px-4">
                      <div className="font-semibold text-slate-900">{student.parentName}</div>
                      <div className="text-slate-400 font-mono text-[11px]">{student.parentPhone}</div>
                    </td>
                    <td className="py-3.5 px-4">
                      <span className={`px-2.5 py-0.5 rounded-full font-bold text-[11px] ${
                        student.status === 'active' ? 'bg-emerald-100 text-emerald-800' : 'bg-amber-100 text-amber-800'
                      }`}>
                        {student.status.toUpperCase()}
                      </span>
                    </td>
                    <td className="py-3.5 px-4 text-right">
                      <button
                        onClick={() => setSelectedStudent(student)}
                        className="inline-flex items-center gap-1 text-xs text-blue-700 hover:text-blue-900 font-bold bg-blue-50 px-2.5 py-1.5 rounded-md"
                      >
                        <Eye className="w-3.5 h-3.5" /> Profile
                      </button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={7} className="py-8 text-center text-slate-500 text-sm">
                    No active student records matching your search query.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Modal: Register New Student */}
      {showRegisterModal && (
        <div className="fixed inset-0 bg-slate-900/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-md w-full shadow-2xl overflow-hidden animate-in fade-in">
            <div className="bg-blue-950 text-white p-5 flex items-center justify-between">
              <h3 className="text-lg font-bold font-heading">Register New Student</h3>
              <button onClick={() => setShowRegisterModal(false)} className="text-blue-200 hover:text-white">
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleRegisterStudentSubmit} className="p-6 space-y-4 text-xs">
              <div>
                <label className="block font-semibold text-slate-700 mb-1">Student Full English Name</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Adham Tarek Abdelrahman"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full bg-slate-50 border border-slate-200 rounded-lg p-2.5 font-semibold text-slate-900"
                />
              </div>

              <div>
                <label className="block font-semibold text-slate-700 mb-1">Arabic Name (Optional)</label>
                <input
                  type="text"
                  placeholder="أدهم طارق عبدالرحمن"
                  value={arabicName}
                  onChange={(e) => setArabicName(e.target.value)}
                  className="w-full bg-slate-50 border border-slate-200 rounded-lg p-2.5 font-semibold text-slate-900 font-arabic"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-semibold text-slate-700 mb-1">Stage</label>
                  <select
                    value={stage}
                    onChange={(e) => {
                      const st = e.target.value as 'Primary' | 'Preparatory';
                      setStage(st);
                      setGrade(st === 'Primary' ? 'Primary 1' : 'Preparatory 1');
                    }}
                    className="w-full bg-slate-50 border border-slate-200 rounded-lg p-2.5 font-bold"
                  >
                    <option value="Primary">Primary Stage</option>
                    <option value="Preparatory">Preparatory Stage</option>
                  </select>
                </div>

                <div>
                  <label className="block font-semibold text-slate-700 mb-1">Grade Level</label>
                  <select
                    value={grade}
                    onChange={(e) => setGrade(e.target.value)}
                    className="w-full bg-slate-50 border border-slate-200 rounded-lg p-2.5 font-bold"
                  >
                    {stage === 'Primary' ? (
                      <>
                        <option value="Primary 1">Primary 1</option>
                        <option value="Primary 2">Primary 2</option>
                        <option value="Primary 3">Primary 3</option>
                        <option value="Primary 4">Primary 4</option>
                        <option value="Primary 5">Primary 5</option>
                        <option value="Primary 6">Primary 6</option>
                      </>
                    ) : (
                      <>
                        <option value="Preparatory 1">Preparatory 1</option>
                        <option value="Preparatory 2">Preparatory 2</option>
                        <option value="Preparatory 3">Preparatory 3</option>
                      </>
                    )}
                  </select>
                </div>
              </div>

              <div>
                <label className="block font-semibold text-slate-700 mb-1">Parent / Guardian Full Name</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Eng. Tarek Abdelrahman"
                  value={parentName}
                  onChange={(e) => setParentName(e.target.value)}
                  className="w-full bg-slate-50 border border-slate-200 rounded-lg p-2.5 font-semibold text-slate-900"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-semibold text-slate-700 mb-1">Parent Phone</label>
                  <input
                    type="text"
                    required
                    placeholder="+20 100 000 0000"
                    value={parentPhone}
                    onChange={(e) => setParentPhone(e.target.value)}
                    className="w-full bg-slate-50 border border-slate-200 rounded-lg p-2.5"
                  />
                </div>
                <div>
                  <label className="block font-semibold text-slate-700 mb-1">Parent Email</label>
                  <input
                    type="email"
                    required
                    placeholder="parent@gmail.com"
                    value={parentEmail}
                    onChange={(e) => setParentEmail(e.target.value)}
                    className="w-full bg-slate-50 border border-slate-200 rounded-lg p-2.5"
                  />
                </div>
              </div>

              <div className="pt-3 flex justify-end gap-2 border-t border-slate-100">
                <button type="button" onClick={() => setShowRegisterModal(false)} className="px-4 py-2 text-slate-600 font-semibold">
                  Cancel
                </button>
                <button type="submit" className="bg-blue-700 hover:bg-blue-800 text-white font-semibold px-5 py-2 rounded-lg flex items-center gap-1.5">
                  <CheckCircle2 className="w-4 h-4" /> Register & Enrol Student
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Student Details Modal */}
      {selectedStudent && (
        <div className="fixed inset-0 bg-slate-900/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-lg w-full shadow-2xl overflow-hidden animate-in fade-in">
            <div className="bg-blue-950 text-white p-5 flex items-center justify-between">
              <div>
                <span className="text-xs font-mono bg-blue-800 text-yellow-400 px-2 py-0.5 rounded">
                  {selectedStudent.studentId}
                </span>
                <h3 className="text-lg font-bold mt-1 font-heading">{selectedStudent.name}</h3>
                <p className="text-xs text-blue-200 font-arabic">{selectedStudent.arabicName}</p>
              </div>
              <button
                onClick={() => setSelectedStudent(null)}
                className="text-blue-200 hover:text-white text-xl font-bold p-1"
              >
                ✕
              </button>
            </div>

            <div className="p-6 space-y-4 text-sm text-slate-700">
              <div className="grid grid-cols-2 gap-4 text-xs">
                <div className="bg-slate-50 p-3 rounded-xl border border-slate-200">
                  <div className="text-slate-500">Academic Stage</div>
                  <div className="font-bold text-slate-900">{selectedStudent.stage}</div>
                </div>
                <div className="bg-slate-50 p-3 rounded-xl border border-slate-200">
                  <div className="text-slate-500">Grade & Class Cohort</div>
                  <div className="font-bold text-slate-900">{selectedStudent.grade}</div>
                </div>
                <div className="bg-slate-50 p-3 rounded-xl border border-slate-200">
                  <div className="text-slate-500">Institutional Email</div>
                  <div className="font-mono text-xs font-bold text-blue-800 truncate">{selectedStudent.email}</div>
                </div>
                <div className="bg-slate-50 p-3 rounded-xl border border-slate-200">
                  <div className="text-slate-500">Enrollment Date</div>
                  <div className="font-semibold text-slate-900">{selectedStudent.enrollmentDate}</div>
                </div>
              </div>

              <div className="border-t border-slate-200 pt-3">
                <div className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">Parent / Guardian Information</div>
                <div className="bg-blue-50 p-3.5 rounded-xl border border-blue-200 space-y-1 text-xs">
                  <div className="font-bold text-slate-900">{selectedStudent.parentName}</div>
                  <div className="text-slate-600 font-mono">Phone: {selectedStudent.parentPhone}</div>
                  <div className="text-slate-600 font-mono">Email: {selectedStudent.parentEmail}</div>
                </div>
              </div>
            </div>

            <div className="bg-slate-50 px-6 py-4 border-t border-slate-200 flex justify-end">
              <button
                onClick={() => setSelectedStudent(null)}
                className="bg-slate-800 text-white text-xs px-4 py-2 rounded-lg font-bold"
              >
                Close Profile
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
