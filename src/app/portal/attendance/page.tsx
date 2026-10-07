'use client';

import { useState } from 'react';
import { useAuth } from '@/lib/auth/context';
import { 
  CheckSquare, Calendar, Filter, Save, AlertCircle, Mail, UserCheck, UserX, Clock, 
  ShieldAlert, CheckCircle2, Lock, AlertTriangle, Search
} from 'lucide-react';

interface AttendanceRow {
  studentId: string;
  name: string;
  class: string;
  status: 'present' | 'absent' | 'late' | 'excused';
  parentEmail: string;
  parentPhone: string;
}

const INITIAL_ROSTER: AttendanceRow[] = [
  { studentId: 'NL-2026-00145', name: 'Nour Tarek Abdelrahman', class: 'Primary 4', status: 'present', parentEmail: 'tarek.abdelrahman@gmail.com', parentPhone: '+20 100 111 2233' },
  { studentId: 'NL-2026-00146', name: 'Hamza Amr Fouad', class: 'Primary 1', status: 'absent', parentEmail: 'amr.fouad@yahoo.com', parentPhone: '+20 101 222 3344' },
  { studentId: 'NL-2026-00147', name: 'Farida Sherif Mansour', class: 'Primary 1', status: 'present', parentEmail: 'sherif.mansour@hotmail.com', parentPhone: '+20 102 333 4455' },
  { studentId: 'NL-2026-00148', name: 'Kareem Mostafa Nabil', class: 'Primary 6', status: 'late', parentEmail: 'mostafa.nabil@gmail.com', parentPhone: '+20 103 444 5566' },
  { studentId: 'NL-2026-00149', name: 'Laila Hany El-Sayed', class: 'Primary 2', status: 'absent', parentEmail: 'hany.sayed@gmail.com', parentPhone: '+20 104 555 6677' },
  { studentId: 'NL-2026-00150', name: 'Ziad Sherif Hassan', class: 'Primary 3', status: 'present', parentEmail: 'sherif.hassan@gmail.com', parentPhone: '+20 105 666 7788' },
  { studentId: 'NL-2026-00151', name: 'Sherif Samir Mansour', class: 'Preparatory 3', status: 'present', parentEmail: 'samir.mansour@gmail.com', parentPhone: '+20 106 777 8899' },
];

export default function AttendancePage() {
  const { user } = useAuth();
  const [selectedClass, setSelectedClass] = useState('Primary 1');
  const [attendanceDate, setAttendanceDate] = useState(new Date().toISOString().split('T')[0]);
  const [roster, setRoster] = useState<AttendanceRow[]>(INITIAL_ROSTER);
  const [search, setSearch] = useState('');

  // Daily Submission & Lock State
  const [isSubmittedForDay, setIsSubmittedForDay] = useState(false);
  const [unsubmittedWarning, setUnsubmittedWarning] = useState(true); // Simulating past day unsubmitted alert for high staff

  const isHighStaff = user?.role === 'admin' || user?.role === 'head_admin' || user?.role === 'supervisor' || user?.role === 'developer';

  const handleStatusChange = (studentId: string, newStatus: AttendanceRow['status']) => {
    if (isSubmittedForDay) return;
    setRoster(prev => prev.map(item => item.studentId === studentId ? { ...item, status: newStatus } : item));
  };

  const handleSubmitDailyAttendance = () => {
    setIsSubmittedForDay(true);
    setUnsubmittedWarning(false);
  };

  // Smart Search across student name, ID, class, status
  const filteredRoster = roster.filter(st => {
    const matchesClass = st.class === selectedClass || selectedClass === 'All Classes';
    const q = search.toLowerCase().trim();
    if (!q) return matchesClass;

    const matchesName = st.name.toLowerCase().includes(q);
    const matchesId = st.studentId.toLowerCase().includes(q);
    const matchesStatus = st.status.toLowerCase().includes(q);
    return matchesClass && (matchesName || matchesId || matchesStatus);
  });

  const presentCount = roster.filter(r => r.status === 'present').length;
  const absentCount = roster.filter(r => r.status === 'absent').length;
  const lateCount = roster.filter(r => r.status === 'late').length;

  return (
    <div className="space-y-6">
      {/* High Staff Alert Banner if a day passed without submission */}
      {unsubmittedWarning && isHighStaff && !isSubmittedForDay && (
        <div className="bg-amber-50 border-2 border-amber-400 p-4 rounded-2xl flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 shadow-md animate-pulse">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-amber-500 text-white rounded-xl">
              <ShieldAlert className="w-6 h-6" />
            </div>
            <div>
              <h4 className="font-bold text-amber-950 text-sm">HIGH STAFF ALERT: Attendance Not Submitted!</h4>
              <p className="text-xs text-amber-800">
                A day passed without attendance being officially submitted by the homeroom teacher. Action required to validate attendance logs.
              </p>
            </div>
          </div>
          <button
            onClick={() => setUnsubmittedWarning(false)}
            className="text-xs font-bold text-amber-900 bg-amber-200 hover:bg-amber-300 px-3 py-1.5 rounded-lg whitespace-nowrap"
          >
            Acknowledge Alert
          </button>
        </div>
      )}

      {/* Page Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-slate-900 font-heading flex items-center gap-2">
            <CheckSquare className="w-7 h-7 text-blue-700" />
            Daily Attendance Verification & Logging
          </h1>
          <p className="text-slate-600 text-sm mt-1">
            Record, validate, and officially lock daily attendance records for NLLS cohorts.
          </p>
        </div>

        {/* Primary Action Button: Submit Daily Attendance */}
        <div className="flex items-center gap-3">
          {isSubmittedForDay ? (
            <div className="flex items-center gap-2 bg-emerald-100 border border-emerald-300 text-emerald-800 px-4 py-2.5 rounded-xl font-bold text-xs shadow-xs">
              <CheckCircle2 className="w-4 h-4 text-emerald-600" /> Attendance Validated & Locked for Today
            </div>
          ) : (
            <button
              onClick={handleSubmitDailyAttendance}
              className="flex items-center justify-center gap-2 bg-emerald-600 hover:bg-emerald-700 text-white font-bold px-5 py-2.5 rounded-xl shadow-md transition-all text-sm hover:scale-[1.02]"
            >
              <Save className="w-4 h-4" /> Submit & Validate Attendance for the Day
            </button>
          )}
        </div>
      </div>

      {/* Controls & Smart Search Bar */}
      <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-sm flex flex-col md:flex-row items-center justify-between gap-4">
        <div className="flex flex-wrap items-center gap-3 w-full md:w-auto">
          <div>
            <label className="block text-[11px] font-bold text-slate-500 uppercase tracking-wider mb-1">Select Cohort:</label>
            <select
              value={selectedClass}
              onChange={(e) => setSelectedClass(e.target.value)}
              className="bg-slate-50 border border-slate-300 font-bold text-xs text-slate-900 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-600"
            >
              <option value="All Classes">All Cohorts (Overview)</option>
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

          <div>
            <label className="block text-[11px] font-bold text-slate-500 uppercase tracking-wider mb-1">Date:</label>
            <input
              type="date"
              value={attendanceDate}
              onChange={(e) => setAttendanceDate(e.target.value)}
              className="bg-slate-50 border border-slate-300 font-semibold text-xs text-slate-900 rounded-lg px-3 py-2"
            />
          </div>
        </div>

        {/* Smart Search */}
        <div className="relative w-full md:w-80">
          <Search className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
          <input
            type="text"
            placeholder="Smart Search student name, ID, status..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-9 pr-8 py-2 bg-slate-50 border border-slate-200 rounded-lg text-xs text-slate-800 focus:outline-none focus:ring-2 focus:ring-blue-600"
          />
        </div>
      </div>

      {/* Summary KPI Badges */}
      <div className="grid grid-cols-3 gap-4">
        <div className="bg-emerald-50 border border-emerald-200 p-4 rounded-2xl flex items-center justify-between">
          <div>
            <p className="text-xs font-bold text-emerald-800">Present Students</p>
            <p className="text-2xl font-black text-emerald-900 mt-1">{presentCount}</p>
          </div>
          <UserCheck className="w-7 h-7 text-emerald-600" />
        </div>
        <div className="bg-rose-50 border border-rose-200 p-4 rounded-2xl flex items-center justify-between">
          <div>
            <p className="text-xs font-bold text-rose-800">Absent Students</p>
            <p className="text-2xl font-black text-rose-900 mt-1">{absentCount}</p>
          </div>
          <UserX className="w-7 h-7 text-rose-600" />
        </div>
        <div className="bg-amber-50 border border-amber-200 p-4 rounded-2xl flex items-center justify-between">
          <div>
            <p className="text-xs font-bold text-amber-800">Tardy / Late</p>
            <p className="text-2xl font-black text-amber-900 mt-1">{lateCount}</p>
          </div>
          <Clock className="w-7 h-7 text-amber-600" />
        </div>
      </div>

      {/* Roster Table */}
      <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
        <table className="w-full text-left text-xs">
          <thead className="bg-slate-900 text-white uppercase font-bold text-[11px] tracking-wider">
            <tr>
              <th className="p-4">Student ID & Name</th>
              <th className="p-4">Class</th>
              <th className="p-4 text-center">Attendance Status Toggle</th>
              <th className="p-4">Parent Notification Portal</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {filteredRoster.map(row => (
              <tr key={row.studentId} className="hover:bg-slate-50 transition-colors">
                <td className="p-4">
                  <div className="font-bold text-slate-900 text-sm">{row.name}</div>
                  <div className="font-mono text-slate-400 text-xs">{row.studentId}</div>
                </td>
                <td className="p-4 font-semibold text-slate-700">{row.class}</td>
                <td className="p-4 text-center">
                  <div className="inline-flex p-1 bg-slate-100 rounded-xl border border-slate-200 gap-1">
                    {(['present', 'absent', 'late'] as const).map(st => (
                      <button
                        key={st}
                        disabled={isSubmittedForDay}
                        onClick={() => handleStatusChange(row.studentId, st)}
                        className={`px-3 py-1.5 rounded-lg text-xs font-bold uppercase transition-all ${
                          row.status === st
                            ? st === 'present' ? 'bg-emerald-600 text-white shadow-xs' : st === 'absent' ? 'bg-rose-600 text-white shadow-xs' : 'bg-amber-500 text-white shadow-xs'
                            : 'text-slate-600 hover:bg-slate-200'
                        } ${isSubmittedForDay ? 'opacity-75 cursor-not-allowed' : ''}`}
                      >
                        {st}
                      </button>
                    ))}
                  </div>
                </td>
                <td className="p-4">
                  {row.status === 'absent' ? (
                    <div className="flex items-center gap-2">
                      <span className="bg-rose-50 text-rose-700 px-2.5 py-1 rounded-md font-bold text-[11px] border border-rose-200 flex items-center gap-1">
                        <Mail className="w-3 h-3" /> Auto Absence Email Sent
                      </span>
                    </div>
                  ) : (
                    <span className="text-slate-400 text-xs">No action required</span>
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
