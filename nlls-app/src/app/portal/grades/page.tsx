'use client';

import { useState } from 'react';
import { Award, Search, Filter, Printer, Download, BookOpen, CheckCircle2 } from 'lucide-react';

interface GradeCard {
  studentId: string;
  name: string;
  class: string;
  english: number;
  math: number;
  science: number;
  arabic: number;
  french: number;
  total: number;
  percentage: number;
  status: 'Passed' | 'Needs Improvement';
}

const INITIAL_GRADES_ROSTER: GradeCard[] = [
  { studentId: 'NL-2026-00146', name: 'Hamza Amr Fouad', class: 'Primary 1', english: 95, math: 98, science: 92, arabic: 90, french: 88, total: 463, percentage: 92.6, status: 'Passed' },
  { studentId: 'NL-2026-00147', name: 'Farida Sherif Mansour', class: 'Primary 1', english: 98, math: 100, science: 96, arabic: 94, french: 92, total: 480, percentage: 96.0, status: 'Passed' },
  { studentId: 'NL-2026-00145', name: 'Nour Tarek Abdelrahman', class: 'Primary 4', english: 88, math: 85, science: 90, arabic: 82, french: 80, total: 425, percentage: 85.0, status: 'Passed' },
  { studentId: 'NL-2026-00144', name: 'Omar Khaled Hassan', class: 'Primary 5', english: 75, math: 70, science: 78, arabic: 72, french: 68, total: 363, percentage: 72.6, status: 'Needs Improvement' },
  { studentId: 'NL-2026-00142', name: 'Youssef Ahmed El-Sayed', class: 'Preparatory 1', english: 92, math: 94, science: 90, arabic: 88, french: 86, total: 450, percentage: 90.0, status: 'Passed' },
  { studentId: 'NL-2026-00151', name: 'Sherif Samir Mansour', class: 'Preparatory 3', english: 96, math: 99, science: 95, arabic: 93, french: 90, total: 473, percentage: 94.6, status: 'Passed' },
];

export default function GradesManagementPage() {
  const [roster, setRoster] = useState<GradeCard[]>(INITIAL_GRADES_ROSTER);
  const [selectedClass, setSelectedClass] = useState('All Classes');
  const [search, setSearch] = useState('');
  const [webNotice, setWebNotice] = useState<string | null>(null);

  // Smart Search
  const filtered = roster.filter(st => {
    const matchesClass = selectedClass === 'All Classes' || st.class === selectedClass;
    const q = search.toLowerCase().trim();
    if (!q) return matchesClass;

    const matchesName = st.name.toLowerCase().includes(q);
    const matchesId = st.studentId.toLowerCase().includes(q);
    const matchesClassText = st.class.toLowerCase().includes(q);

    return matchesClass && (matchesName || matchesId || matchesClassText);
  });

  return (
    <div className="space-y-6">
      {webNotice && (
        <div className="bg-emerald-900 text-white p-4 rounded-2xl flex items-center justify-between shadow-lg font-mono text-xs border border-emerald-700">
          <span>{webNotice}</span>
          <button onClick={() => setWebNotice(null)} className="font-bold text-emerald-200">Dismiss</button>
        </div>
      )}
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-slate-900 font-heading flex items-center gap-2">
            <Award className="w-7 h-7 text-blue-700" />
            Academic Grade Ledger & Report Cards
          </h1>
          <p className="text-slate-600 text-sm mt-1">
            View term evaluations, calculate grade averages, and generate official NLLS report cards for Primary (1–6) & Preparatory (1–3).
          </p>
        </div>

        <button
          onClick={() => {
            setWebNotice('✅ Web Notice: Batch Report Cards PDF generated for active cohort!');
            setTimeout(() => setWebNotice(null), 4000);
          }}
          className="flex items-center justify-center gap-2 bg-blue-700 hover:bg-blue-800 text-white font-bold px-4 py-2.5 rounded-lg shadow-sm text-sm"
        >
          <Printer className="w-4 h-4" /> Export Official Report Cards (PDF)
        </button>
      </div>

      {/* Toolbar & Smart Search */}
      <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-sm flex flex-col md:flex-row items-center justify-between gap-4">
        <div className="flex items-center gap-3 w-full md:w-auto">
          <label className="text-xs font-bold text-slate-500 uppercase">Select Cohort:</label>
          <select
            value={selectedClass}
            onChange={(e) => setSelectedClass(e.target.value)}
            className="bg-slate-50 border border-slate-300 font-bold text-xs text-slate-900 rounded-lg px-3 py-2"
          >
            <option value="All Classes">All Cohorts Overview</option>
            <option value="Primary 1">Primary 1</option>
            <option value="Primary 2">Primary 2</option>
            <option value="Primary 3">Primary 3</option>
            <option value="Primary 4">Primary 4</option>
            <option value="Primary 5">Primary 5</option>
            <option value="Primary 6">Primary 6</option>
            <option value="Preparatory 1">Preparatory 1</option>
            <option value="Preparatory 2">Preparatory 2</option>
            <option value="Preparatory 3">Preparatory 3</option>
          </select>
        </div>

        {/* Smart Search */}
        <div className="relative w-full md:w-80">
          <Search className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
          <input
            type="text"
            placeholder="Smart Search student name, ID, class..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-9 pr-8 py-2 bg-slate-50 border border-slate-200 rounded-lg text-xs text-slate-800 focus:outline-none focus:ring-2 focus:ring-blue-600"
          />
        </div>
      </div>

      {/* Grades Roster Table */}
      <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
        <table className="w-full text-left text-xs">
          <thead className="bg-slate-900 text-white font-bold uppercase text-[11px] tracking-wider">
            <tr>
              <th className="p-4">Student Name & ID</th>
              <th className="p-4">Class</th>
              <th className="p-4 text-center">English (100)</th>
              <th className="p-4 text-center">Math (100)</th>
              <th className="p-4 text-center">Science (100)</th>
              <th className="p-4 text-center">Arabic (100)</th>
              <th className="p-4 text-center">French (100)</th>
              <th className="p-4 text-center">Overall %</th>
              <th className="p-4 text-center">Academic Status</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {filtered.map(st => (
              <tr key={st.studentId} className="hover:bg-slate-50 font-medium text-slate-800">
                <td className="p-4">
                  <div className="font-bold text-slate-900 text-sm">{st.name}</div>
                  <div className="font-mono text-slate-400 text-xs">{st.studentId}</div>
                </td>
                <td className="p-4 font-semibold text-blue-900">{st.class}</td>
                <td className="p-4 text-center font-mono font-bold text-slate-800">{st.english}</td>
                <td className="p-4 text-center font-mono font-bold text-slate-800">{st.math}</td>
                <td className="p-4 text-center font-mono font-bold text-slate-800">{st.science}</td>
                <td className="p-4 text-center font-mono font-bold text-slate-800">{st.arabic}</td>
                <td className="p-4 text-center font-mono font-bold text-slate-800">{st.french}</td>
                <td className="p-4 text-center font-mono font-black text-blue-800 text-sm">{st.percentage}%</td>
                <td className="p-4 text-center">
                  <span className={`px-2.5 py-1 rounded-full font-bold text-[11px] ${
                    st.status === 'Passed' ? 'bg-emerald-50 text-emerald-700 border border-emerald-200' : 'bg-amber-50 text-amber-700 border border-amber-200'
                  }`}>
                    {st.status}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
