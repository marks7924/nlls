'use client';

import { useState } from 'react';
import { useAuth } from '@/lib/auth/context';
import { Calendar, Clock, Edit3, User, MapPin, Plus, X, Save, CheckCircle2, ShieldCheck } from 'lucide-react';

interface Period {
  id: string;
  periodNum: number;
  time: string;
  subject: string;
  teacher: string;
  room: string;
}

const ALL_CLASSES = [
  'Primary 1', 'Primary 2', 'Primary 3', 'Primary 4', 'Primary 5', 'Primary 6',
  'Preparatory 1', 'Preparatory 2', 'Preparatory 3'
];

const INITIAL_SCHEDULE: Record<string, Period[]> = {
  Sunday: [
    { id: 'p1', periodNum: 1, time: '08:00 - 08:45', subject: 'English Language', teacher: 'Mrs. Rania Fouad', room: 'Building A - Room 101' },
    { id: 'p2', periodNum: 2, time: '08:50 - 09:35', subject: 'Mathematics', teacher: 'Mr. Sameh Farouk', room: 'Building A - Room 101' },
    { id: 'p3', periodNum: 3, time: '09:40 - 10:25', subject: 'Science Practical', teacher: 'Dr. Ahmed Rashed', room: 'Lab A' },
    { id: 'p4', periodNum: 4, time: '10:55 - 11:40', subject: 'Arabic Literature', teacher: 'Mrs. Dina Hassan', room: 'Building A - Room 101' },
    { id: 'p5', periodNum: 5, time: '11:45 - 12:30', subject: 'French Language', teacher: 'Mme. Sophie', room: 'Building A - Room 101' },
  ],
  Monday: [
    { id: 'p6', periodNum: 1, time: '08:00 - 08:45', subject: 'Mathematics', teacher: 'Mr. Sameh Farouk', room: 'Building A - Room 101' },
    { id: 'p7', periodNum: 2, time: '08:50 - 09:35', subject: 'Computer Science', teacher: 'Eng. Tarek', room: 'Computer Lab' },
    { id: 'p8', periodNum: 3, time: '09:40 - 10:25', subject: 'English Language', teacher: 'Mrs. Rania Fouad', room: 'Building A - Room 101' },
    { id: 'p9', periodNum: 4, time: '10:55 - 11:40', subject: 'Physical Education', teacher: 'Coach Omar', room: 'Sports Field' },
    { id: 'p10', periodNum: 5, time: '11:45 - 12:30', subject: 'Science', teacher: 'Dr. Ahmed Rashed', room: 'Building A - Room 101' },
  ],
  Tuesday: [
    { id: 'p11', periodNum: 1, time: '08:00 - 08:45', subject: 'Science', teacher: 'Dr. Ahmed Rashed', room: 'Building A - Room 101' },
    { id: 'p12', periodNum: 2, time: '08:50 - 09:35', subject: 'French Language', teacher: 'Mme. Sophie', room: 'Building A - Room 101' },
    { id: 'p13', periodNum: 3, time: '09:40 - 10:25', subject: 'Arabic Literature', teacher: 'Mrs. Dina Hassan', room: 'Building A - Room 101' },
    { id: 'p14', periodNum: 4, time: '10:55 - 11:40', subject: 'Mathematics', teacher: 'Mr. Sameh Farouk', room: 'Building A - Room 101' },
    { id: 'p15', periodNum: 5, time: '11:45 - 12:30', subject: 'Art & Craft', teacher: 'Ms. Dina', room: 'Art Studio' },
  ],
  Wednesday: [
    { id: 'p16', periodNum: 1, time: '08:00 - 08:45', subject: 'English Language', teacher: 'Mrs. Rania Fouad', room: 'Building A - Room 101' },
    { id: 'p17', periodNum: 2, time: '08:50 - 09:35', subject: 'Social Studies', teacher: 'Mr. Khaled', room: 'Building A - Room 101' },
    { id: 'p18', periodNum: 3, time: '09:40 - 10:25', subject: 'Mathematics', teacher: 'Mr. Sameh Farouk', room: 'Building A - Room 101' },
    { id: 'p19', periodNum: 4, time: '10:55 - 11:40', subject: 'Science', teacher: 'Dr. Ahmed Rashed', room: 'Building A - Room 101' },
    { id: 'p20', periodNum: 5, time: '11:45 - 12:30', subject: 'Religion', teacher: 'Sheikh Ibrahim', room: 'Building A - Room 101' },
  ],
  Thursday: [
    { id: 'p21', periodNum: 1, time: '08:00 - 08:45', subject: 'Arabic Literature', teacher: 'Mrs. Dina Hassan', room: 'Building A - Room 101' },
    { id: 'p22', periodNum: 2, time: '08:50 - 09:35', subject: 'English Language', teacher: 'Mrs. Rania Fouad', room: 'Building A - Room 101' },
    { id: 'p23', periodNum: 3, time: '09:40 - 10:25', subject: 'Weekly Assessment', teacher: 'Homeroom Supervisor', room: 'Building A - Room 101' },
    { id: 'p24', periodNum: 4, time: '10:55 - 11:40', subject: 'French Language', teacher: 'Mme. Sophie', room: 'Building A - Room 101' },
    { id: 'p25', periodNum: 5, time: '11:45 - 12:30', subject: 'Assembly', teacher: 'All Staff', room: 'Main Hall' },
  ],
};

export default function TimetablePage() {
  const { user } = useAuth();
  const [selectedClass, setSelectedClass] = useState('Primary 1');
  const [activeDay, setActiveDay] = useState('Sunday');
  const [schedule, setSchedule] = useState<Record<string, Period[]>>(INITIAL_SCHEDULE);
  const [editingPeriod, setEditingPeriod] = useState<Period | null>(null);

  // Edit Form State
  const [editSubject, setEditSubject] = useState('');
  const [editTeacher, setEditTeacher] = useState('');
  const [editRoom, setEditRoom] = useState('');

  const canEditTimetable = user?.role === 'admin' || user?.role === 'head_admin' || user?.role === 'developer';
  const days = Object.keys(schedule);

  const handleStartEdit = (p: Period) => {
    setEditingPeriod(p);
    setEditSubject(p.subject);
    setEditTeacher(p.teacher);
    setEditRoom(p.room);
  };

  const handleSavePeriod = (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingPeriod) return;

    setSchedule(prev => ({
      ...prev,
      [activeDay]: prev[activeDay].map(p => p.id === editingPeriod.id ? { ...p, subject: editSubject, teacher: editTeacher, room: editRoom } : p)
    }));

    setEditingPeriod(null);
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-slate-900 font-heading flex items-center gap-2">
            <Calendar className="w-7 h-7 text-blue-700" />
            Stage Timetable & Schedule Manager
          </h1>
          <p className="text-slate-600 text-sm mt-1">
            Weekly subject period schedule for all NLLS stages (Primary 1–6, Preparatory 1–3).
          </p>
        </div>

        <div className="flex items-center gap-3 bg-white p-2 rounded-xl border border-slate-200 shadow-sm">
          <label className="text-xs font-bold text-slate-500 uppercase tracking-wider pl-2">Select Cohort:</label>
          <select
            value={selectedClass}
            onChange={(e) => setSelectedClass(e.target.value)}
            className="bg-slate-50 border border-slate-300 text-slate-900 font-bold text-xs rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-600"
          >
            {ALL_CLASSES.map(cls => (
              <option key={cls} value={cls}>{cls}</option>
            ))}
          </select>
        </div>
      </div>

      {canEditTimetable && (
        <div className="bg-blue-50 border border-blue-200 rounded-xl p-3 flex items-center justify-between text-xs text-blue-800">
          <span className="flex items-center gap-2 font-semibold">
            <ShieldCheck className="w-4 h-4 text-blue-700" /> Administrative Access Enabled: You can customize or assign timetable slots for any day and stage.
          </span>
        </div>
      )}

      {/* Days Tabs */}
      <div className="flex items-center gap-2 bg-white p-2 rounded-xl border border-slate-200 shadow-sm overflow-x-auto">
        {days.map(day => (
          <button
            key={day}
            onClick={() => setActiveDay(day)}
            className={`px-5 py-2.5 rounded-lg text-xs font-bold transition-all whitespace-nowrap ${
              activeDay === day
                ? 'bg-blue-700 text-white shadow-sm'
                : 'text-slate-600 hover:bg-slate-100'
            }`}
          >
            {day}
          </button>
        ))}
      </div>

      {/* Period Timeline List */}
      <div className="space-y-3">
        {schedule[activeDay].map(period => (
          <div
            key={period.id}
            className="bg-white rounded-xl border border-slate-200 shadow-sm p-4 flex flex-col md:flex-row md:items-center justify-between gap-4 hover:border-blue-400 transition-colors"
          >
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-blue-50 text-blue-800 font-bold font-mono rounded-xl flex items-center justify-center border border-blue-200 flex-shrink-0">
                P{period.periodNum}
              </div>
              <div>
                <span className="text-xs font-mono font-semibold text-slate-500 flex items-center gap-1">
                  <Clock className="w-3 h-3 text-blue-600" /> {period.time}
                </span>
                <h3 className="font-bold text-slate-900 text-base font-heading mt-0.5">{period.subject}</h3>
              </div>
            </div>

            <div className="flex items-center gap-4 text-xs text-slate-600">
              <div className="flex items-center gap-1.5 font-medium"><User className="w-4 h-4 text-blue-600" /> {period.teacher}</div>
              <div className="flex items-center gap-1.5 font-semibold bg-slate-100 px-2.5 py-1 rounded text-slate-800"><MapPin className="w-3.5 h-3.5 text-blue-600" /> {period.room}</div>

              {canEditTimetable && (
                <button
                  onClick={() => handleStartEdit(period)}
                  className="bg-blue-50 hover:bg-blue-100 text-blue-700 text-xs px-3 py-1.5 rounded-lg font-semibold flex items-center gap-1 border border-blue-200"
                >
                  <Edit3 className="w-3.5 h-3.5" /> Set Slot
                </button>
              )}
            </div>
          </div>
        ))}
      </div>

      {/* Edit Period Slot Modal */}
      {editingPeriod && (
        <div className="fixed inset-0 bg-slate-900/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-md w-full shadow-2xl overflow-hidden">
            <div className="bg-blue-950 text-white p-5 flex items-center justify-between">
              <div>
                <span className="text-xs font-mono bg-blue-800 text-yellow-400 px-2 py-0.5 rounded">
                  {selectedClass} · {activeDay} Period {editingPeriod.periodNum}
                </span>
                <h3 className="text-lg font-bold mt-1 font-heading">Set Timetable Slot</h3>
              </div>
              <button onClick={() => setEditingPeriod(null)} className="text-blue-200 hover:text-white">
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSavePeriod} className="p-6 space-y-4 text-xs">
              <div>
                <label className="block font-semibold text-slate-700 mb-1">Subject Title</label>
                <input
                  type="text"
                  required
                  value={editSubject}
                  onChange={(e) => setEditSubject(e.target.value)}
                  className="w-full bg-slate-50 border border-slate-200 rounded-lg p-2.5 font-semibold text-slate-900"
                />
              </div>

              <div>
                <label className="block font-semibold text-slate-700 mb-1">Assigned Teacher</label>
                <input
                  type="text"
                  required
                  value={editTeacher}
                  onChange={(e) => setEditTeacher(e.target.value)}
                  className="w-full bg-slate-50 border border-slate-200 rounded-lg p-2.5 font-semibold text-slate-900"
                />
              </div>

              <div>
                <label className="block font-semibold text-slate-700 mb-1">Room / Lab Location</label>
                <input
                  type="text"
                  required
                  value={editRoom}
                  onChange={(e) => setEditRoom(e.target.value)}
                  className="w-full bg-slate-50 border border-slate-200 rounded-lg p-2.5 font-semibold text-slate-900"
                />
              </div>

              <div className="pt-3 flex justify-end gap-2 border-t border-slate-100">
                <button type="button" onClick={() => setEditingPeriod(null)} className="px-4 py-2 text-slate-600 font-semibold">
                  Cancel
                </button>
                <button type="submit" className="bg-blue-700 hover:bg-blue-800 text-white font-semibold px-5 py-2 rounded-lg flex items-center gap-1.5">
                  <CheckCircle2 className="w-4 h-4" /> Save Schedule Slot
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
