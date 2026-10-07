'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useAuth } from '@/lib/auth/context';
import { ROLE_LABELS } from '@/lib/navigation';
import { registerNewStudent } from '@/lib/students-store';
import { CheckCircle2, X } from 'lucide-react';

export default function DashboardPage() {
  const { user, hasPermission } = useAuth();
  const [showAddStudentModal, setShowAddStudentModal] = useState(false);
  const [webNotice, setWebNotice] = useState<string | null>(null);

  // Form State
  const [name, setName] = useState('');
  const [arabicName, setArabicName] = useState('');
  const [stage, setStage] = useState<'Primary' | 'Preparatory'>('Primary');
  const [grade, setGrade] = useState('Primary 1');
  const [parentName, setParentName] = useState('');
  const [parentPhone, setParentPhone] = useState('');
  const [parentEmail, setParentEmail] = useState('');

  if (!user) return null;

  const role = user.role;
  const isStudentOrParent = role === 'student' || role === 'parent';
  const isStaff = ['teacher', 'supervisor', 'admin', 'head_admin', 'developer'].includes(role);

  const handleAddStudentSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const created = registerNewStudent({
      name,
      arabicName,
      stage,
      grade,
      gender: 'male',
      parentName,
      parentPhone,
      parentEmail,
    });
    setShowAddStudentModal(false);
    setName('');
    setArabicName('');
    setParentName('');
    setParentPhone('');
    setParentEmail('');
    setWebNotice(`✅ Web Notice: Student ${created.name} (${created.studentId}) successfully registered into ${created.grade}!`);
    setTimeout(() => setWebNotice(null), 5000);
  };

  return (
    <div className="animate-fade-in space-y-6">
      {/* Web Notice Banner */}
      {webNotice && (
        <div className="bg-emerald-900 text-white p-4 rounded-2xl flex items-center justify-between shadow-lg font-mono text-xs border border-emerald-700">
          <span>{webNotice}</span>
          <button onClick={() => setWebNotice(null)} className="font-bold text-emerald-200">Dismiss</button>
        </div>
      )}
      {/* Welcome Header */}
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-900">
          Welcome, {user.profile.first_name}
        </h1>
        <p className="text-sm text-gray-500 mt-1">
          {ROLE_LABELS[user.role]} Dashboard · Academic Year 2026/2027
        </p>
      </div>

      {/* Date/Quick Info Bar */}
      <div className="bg-white border border-gray-200 rounded-lg p-4 mb-6 flex flex-wrap items-center gap-4 sm:gap-8">
        <div className="flex items-center gap-2">
          <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
          </svg>
          <span className="text-sm text-gray-600">
            {new Date().toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}
          </span>
        </div>
        <div className="flex items-center gap-2">
          <span className="w-2 h-2 bg-green-500 rounded-full"></span>
          <span className="text-sm text-gray-600">First Term</span>
        </div>
        {role === 'student' && (
          <div className="flex items-center gap-2">
            <span className="text-sm text-gray-500">Class:</span>
            <span className="text-sm font-medium text-gray-800">Primary 5A</span>
          </div>
        )}
      </div>

      {/* Stats Cards */}
      {isStaff && (
        <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
          <StatCard
            icon={<UserIcon />}
            iconBg="bg-brand-50"
            iconColor="text-brand-600"
            value="487"
            label="Total Students"
          />
          <StatCard
            icon={<CheckIcon />}
            iconBg="bg-green-50"
            iconColor="text-green-600"
            value="462"
            label="Present Today"
          />
          <StatCard
            icon={<XIcon />}
            iconBg="bg-red-50"
            iconColor="text-red-600"
            value="25"
            label="Absent Today"
          />
          <StatCard
            icon={<CalendarIcon />}
            iconBg="bg-accent-50"
            iconColor="text-accent-600"
            value="3"
            label="Upcoming Exams"
          />
        </div>
      )}

      {role === 'student' && (
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
          <StatCard icon={<BookIcon />} iconBg="bg-brand-50" iconColor="text-brand-600" value="8" label="Subjects" />
          <StatCard icon={<CheckIcon />} iconBg="bg-green-50" iconColor="text-green-600" value="92%" label="Attendance" />
          <StatCard icon={<AwardIcon />} iconBg="bg-accent-50" iconColor="text-accent-600" value="88.5%" label="Average" />
          <StatCard icon={<ClipboardIcon />} iconBg="bg-purple-50" iconColor="text-purple-600" value="2" label="Pending Homework" />
        </div>
      )}

      {role === 'parent' && (
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
          <StatCard icon={<UserIcon />} iconBg="bg-brand-50" iconColor="text-brand-600" value="2" label="My Children" />
          <StatCard icon={<CheckIcon />} iconBg="bg-green-50" iconColor="text-green-600" value="95%" label="Attendance" />
          <StatCard icon={<AwardIcon />} iconBg="bg-accent-50" iconColor="text-accent-600" value="91.2%" label="Average" />
          <StatCard icon={<CalendarIcon />} iconBg="bg-red-50" iconColor="text-red-600" value="1" label="Upcoming Events" />
        </div>
      )}

      <div className="grid lg:grid-cols-3 gap-6">
        {/* Main Content Area */}
        <div className="lg:col-span-2 space-y-6">
          {/* Today's Schedule / Recent Activity */}
          {isStaff && (
            <div className="bg-white border border-gray-200 rounded-lg">
              <div className="px-5 py-4 border-b border-gray-100 flex items-center justify-between">
                <h2 className="text-base font-semibold text-gray-900">Today&apos;s Overview</h2>
                <span className="badge badge-blue">Live</span>
              </div>
              <div className="divide-y divide-gray-100">
                {[
                  { time: '8:00 AM', title: 'Morning Assembly', status: 'completed', type: 'event' },
                  { time: '8:30 AM', title: 'Attendance Recording', status: 'in-progress', type: 'task' },
                  { time: '10:00 AM', title: 'Mathematics Weekly Exam — Primary 5A', status: 'upcoming', type: 'exam' },
                  { time: '11:30 AM', title: 'Parent Meeting — Ahmed Khalil', status: 'upcoming', type: 'meeting' },
                  { time: '1:00 PM', title: 'Science Lab — Primary 4A', status: 'upcoming', type: 'class' },
                ].map((item, i) => (
                  <div key={i} className="px-5 py-3 flex items-center gap-4">
                    <span className="text-xs font-medium text-gray-400 w-16 flex-shrink-0">{item.time}</span>
                    <div className={`w-2 h-2 rounded-full flex-shrink-0 ${
                      item.status === 'completed' ? 'bg-green-500' :
                      item.status === 'in-progress' ? 'bg-accent-500' : 'bg-gray-300'
                    }`} />
                    <div className="min-w-0 flex-1">
                      <p className={`text-sm ${item.status === 'completed' ? 'text-gray-400 line-through' : 'text-gray-800'}`}>
                        {item.title}
                      </p>
                    </div>
                    <span className={`badge ${
                      item.type === 'exam' ? 'badge-red' :
                      item.type === 'meeting' ? 'badge-yellow' :
                      item.type === 'event' ? 'badge-blue' : 'badge-gray'
                    }`}>
                      {item.type}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Student Schedule */}
          {role === 'student' && (
            <div className="bg-white border border-gray-200 rounded-lg">
              <div className="px-5 py-4 border-b border-gray-100">
                <h2 className="text-base font-semibold text-gray-900">Today&apos;s Classes</h2>
              </div>
              <div className="divide-y divide-gray-100">
                {[
                  { time: '8:30 AM', subject: 'Arabic', teacher: 'Ms. Amira', room: 'Room 12', status: 'completed' },
                  { time: '9:30 AM', subject: 'Mathematics', teacher: 'Mr. Hassan', room: 'Room 12', status: 'completed' },
                  { time: '10:30 AM', subject: 'English', teacher: 'Ms. Sarah', room: 'Room 12', status: 'current' },
                  { time: '11:30 AM', subject: 'Science', teacher: 'Mr. Tarek', room: 'Lab 2', status: 'upcoming' },
                  { time: '12:30 PM', subject: 'Social Studies', teacher: 'Ms. Fatima', room: 'Room 12', status: 'upcoming' },
                ].map((item, i) => (
                  <div key={i} className={`px-5 py-3 flex items-center gap-4 ${item.status === 'current' ? 'bg-brand-50 border-l-[3px] border-brand-500' : ''}`}>
                    <span className="text-xs font-medium text-gray-400 w-16 flex-shrink-0">{item.time}</span>
                    <div className="min-w-0 flex-1">
                      <p className={`text-sm font-medium ${item.status === 'completed' ? 'text-gray-400' : 'text-gray-800'}`}>
                        {item.subject}
                      </p>
                      <p className="text-xs text-gray-400">{item.teacher} · {item.room}</p>
                    </div>
                    {item.status === 'current' && <span className="badge badge-blue">Now</span>}
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Parent — Children Overview */}
          {role === 'parent' && (
            <div className="bg-white border border-gray-200 rounded-lg">
              <div className="px-5 py-4 border-b border-gray-100">
                <h2 className="text-base font-semibold text-gray-900">My Children</h2>
              </div>
              <div className="divide-y divide-gray-100">
                {[
                  { name: 'Ahmed Khalil', grade: 'Primary 5A', code: 'NL-2026-00124', avg: '88.5%', attendance: '92%' },
                  { name: 'Sara Khalil', grade: 'KG 2', code: 'NL-2026-00213', avg: '-', attendance: '96%' },
                ].map((child) => (
                  <div key={child.code} className="px-5 py-4 flex items-center gap-4">
                    <div className="w-10 h-10 bg-brand-100 rounded-full flex items-center justify-center flex-shrink-0">
                      <span className="text-brand-700 text-sm font-bold">{child.name[0]}</span>
                    </div>
                    <div className="min-w-0 flex-1">
                      <p className="text-sm font-medium text-gray-900">{child.name}</p>
                      <p className="text-xs text-gray-500">{child.grade} · {child.code}</p>
                    </div>
                    <div className="hidden sm:flex items-center gap-4 text-center">
                      <div>
                        <p className="text-sm font-semibold text-gray-900">{child.avg}</p>
                        <p className="text-[10px] text-gray-400">Average</p>
                      </div>
                      <div>
                        <p className="text-sm font-semibold text-green-600">{child.attendance}</p>
                        <p className="text-[10px] text-gray-400">Attendance</p>
                      </div>
                    </div>
                    <button className="text-sm text-brand-600 hover:text-brand-700 font-medium">View</button>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Recent Results / Grades */}
          {(role === 'student' || role === 'parent') && (
            <div className="bg-white border border-gray-200 rounded-lg">
              <div className="px-5 py-4 border-b border-gray-100 flex items-center justify-between">
                <h2 className="text-base font-semibold text-gray-900">Recent Results</h2>
                <button className="text-sm text-brand-600 hover:text-brand-700 font-medium">View All</button>
              </div>
              <div className="overflow-x-auto">
                <table>
                  <thead>
                    <tr>
                      <th>Subject</th>
                      <th>Exam</th>
                      <th>Mark</th>
                      <th>Percentage</th>
                    </tr>
                  </thead>
                  <tbody>
                    {[
                      { subject: 'Mathematics', exam: 'Weekly 3', mark: '18/20', pct: '90%', color: 'text-green-600' },
                      { subject: 'Arabic', exam: 'Monthly', mark: '44/50', pct: '88%', color: 'text-green-600' },
                      { subject: 'English', exam: 'Weekly 3', mark: '19/20', pct: '95%', color: 'text-green-600' },
                      { subject: 'Science', exam: 'Weekly 3', mark: '15/20', pct: '75%', color: 'text-accent-600' },
                    ].map((r, i) => (
                      <tr key={i}>
                        <td className="font-medium text-gray-900">{r.subject}</td>
                        <td>{r.exam}</td>
                        <td className="font-medium">{r.mark}</td>
                        <td className={`font-semibold ${r.color}`}>{r.pct}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* Admin-level tables */}
          {isStaff && role !== 'teacher' && (
            <div className="bg-white border border-gray-200 rounded-lg">
              <div className="px-5 py-4 border-b border-gray-100 flex items-center justify-between">
                <h2 className="text-base font-semibold text-gray-900">Stage Performance</h2>
                <span className="text-xs text-gray-400">First Term 2026/2027</span>
              </div>
              <div className="overflow-x-auto">
                <table>
                  <thead>
                    <tr>
                      <th>Stage</th>
                      <th>Students</th>
                      <th>Avg Attendance</th>
                      <th>Avg Score</th>
                      <th>Status</th>
                    </tr>
                  </thead>
                  <tbody>
                    {[
                      { stage: 'Early Years', students: 78, attendance: '96%', score: '-', status: 'On Track' },
                      { stage: 'Primary', students: 287, attendance: '93%', score: '84.2%', status: 'On Track' },
                      { stage: 'Preparatory', students: 122, attendance: '91%', score: '79.8%', status: 'Needs Attention' },
                    ].map((s) => (
                      <tr key={s.stage}>
                        <td className="font-medium text-gray-900">{s.stage}</td>
                        <td>{s.students}</td>
                        <td className="text-green-600 font-medium">{s.attendance}</td>
                        <td className="font-medium">{s.score}</td>
                        <td>
                          <span className={`badge ${s.status === 'On Track' ? 'badge-green' : 'badge-yellow'}`}>
                            {s.status}
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          {/* Upcoming Exams */}
          <div className="bg-white border border-gray-200 rounded-lg">
            <div className="px-5 py-4 border-b border-gray-100">
              <h2 className="text-sm font-semibold text-gray-900">Upcoming Exams</h2>
            </div>
            <div className="p-4 space-y-3">
              {[
                { subject: 'Mathematics', type: 'Weekly Exam', date: 'Oct 8', grade: 'Primary 5A' },
                { subject: 'Arabic', type: 'Monthly Exam', date: 'Oct 12', grade: 'Primary 5A' },
                { subject: 'Science', type: 'Weekly Exam', date: 'Oct 14', grade: 'Primary 5A' },
              ].map((exam, i) => (
                <div key={i} className="flex items-start gap-3 p-3 bg-gray-50 rounded-md">
                  <div className="w-10 h-10 bg-brand-100 rounded-md flex flex-col items-center justify-center flex-shrink-0">
                    <span className="text-[10px] text-brand-500 font-medium leading-none">Oct</span>
                    <span className="text-sm font-bold text-brand-700 leading-none">{exam.date.split(' ')[1]}</span>
                  </div>
                  <div className="min-w-0">
                    <p className="text-sm font-medium text-gray-900">{exam.subject}</p>
                    <p className="text-xs text-gray-500">{exam.type}</p>
                    {isStaff && <p className="text-xs text-gray-400">{exam.grade}</p>}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Announcements */}
          <div className="bg-white border border-gray-200 rounded-lg">
            <div className="px-5 py-4 border-b border-gray-100 flex items-center justify-between">
              <h2 className="text-sm font-semibold text-gray-900">Announcements</h2>
              <span className="w-5 h-5 bg-red-500 text-white text-[10px] font-bold rounded-full flex items-center justify-center">2</span>
            </div>
            <div className="divide-y divide-gray-100">
              {[
                { title: 'Monthly Exam Schedule Released', time: '2 hours ago', priority: 'high' },
                { title: 'Sports Day — October 15', time: '1 day ago', priority: 'normal' },
                { title: 'Parent Meeting Reminder', time: '2 days ago', priority: 'normal' },
              ].map((ann, i) => (
                <div key={i} className="px-5 py-3 cursor-pointer hover:bg-gray-50">
                  <div className="flex items-start gap-2">
                    {ann.priority === 'high' && <span className="w-2 h-2 bg-red-500 rounded-full mt-1.5 flex-shrink-0"></span>}
                    <div>
                      <p className="text-sm text-gray-800 font-medium">{ann.title}</p>
                      <p className="text-xs text-gray-400 mt-0.5">{ann.time}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Quick Actions */}
          {isStaff && (
            <div className="bg-white border border-gray-200 rounded-lg">
              <div className="px-5 py-4 border-b border-gray-100 flex items-center justify-between">
                <h2 className="text-sm font-semibold text-gray-900">Quick Actions</h2>
                <button
                  onClick={() => setShowAddStudentModal(true)}
                  className="text-xs bg-blue-700 hover:bg-blue-800 text-white font-bold px-2.5 py-1 rounded-md"
                >
                  + Add Student
                </button>
              </div>
              <div className="p-4 grid grid-cols-2 gap-2">
                {[
                  { label: 'Record Attendance', icon: '✓', href: '/portal/attendance' },
                  { label: 'Enter Grades', icon: '📝', href: '/portal/grades' },
                  { label: 'New Announcement', icon: '📢', href: '/portal/announcements' },
                  { label: 'Add Student', icon: '👤', action: () => setShowAddStudentModal(true) },
                ].map((act) => (
                  act.href ? (
                    <Link
                      key={act.label}
                      href={act.href}
                      className="flex flex-col items-center gap-1.5 p-3 bg-gray-50 rounded-md hover:bg-brand-50 hover:text-brand-700 transition-colors text-center"
                    >
                      <span className="text-lg">{act.icon}</span>
                      <span className="text-xs font-medium text-gray-600">{act.label}</span>
                    </Link>
                  ) : (
                    <button
                      key={act.label}
                      onClick={act.action}
                      className="flex flex-col items-center gap-1.5 p-3 bg-gray-50 rounded-md hover:bg-brand-50 hover:text-brand-700 transition-colors text-center"
                    >
                      <span className="text-lg">{act.icon}</span>
                      <span className="text-xs font-medium text-gray-600">{act.label}</span>
                    </button>
                  )
                ))}
              </div>
            </div>
          )}

          {/* Attendance Summary for today */}
          {isStaff && (
            <div className="bg-white border border-gray-200 rounded-lg">
              <div className="px-5 py-4 border-b border-gray-100">
                <h2 className="text-sm font-semibold text-gray-900">Today&apos;s Attendance</h2>
              </div>
              <div className="p-4">
                <div className="flex items-center justify-between mb-3">
                  <span className="text-xs text-gray-500">Overall Attendance</span>
                  <span className="text-sm font-bold text-green-600">94.9%</span>
                </div>
                <div className="w-full h-2 bg-gray-100 rounded-full overflow-hidden">
                  <div className="h-full bg-green-500 rounded-full" style={{ width: '94.9%' }}></div>
                </div>
                <div className="mt-3 space-y-2">
                  {[
                    { label: 'Present', count: 462, color: 'bg-green-500' },
                    { label: 'Absent', count: 18, color: 'bg-red-500' },
                    { label: 'Late', count: 5, color: 'bg-accent-500' },
                    { label: 'Excused', count: 2, color: 'bg-gray-400' },
                  ].map((s) => (
                    <div key={s.label} className="flex items-center justify-between text-xs">
                      <div className="flex items-center gap-2">
                        <span className={`w-2 h-2 rounded-full ${s.color}`}></span>
                        <span className="text-gray-600">{s.label}</span>
                      </div>
                      <span className="font-medium text-gray-800">{s.count}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Modal: Add New Student directly from Dashboard */}
      {showAddStudentModal && (
        <div className="fixed inset-0 bg-slate-900/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-md w-full shadow-2xl overflow-hidden animate-in fade-in">
            <div className="bg-blue-950 text-white p-5 flex items-center justify-between">
              <h3 className="text-lg font-bold font-heading">Register New Student</h3>
              <button onClick={() => setShowAddStudentModal(false)} className="text-blue-200 hover:text-white">
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleAddStudentSubmit} className="p-6 space-y-4 text-xs text-slate-800">
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
                <button type="button" onClick={() => setShowAddStudentModal(false)} className="px-4 py-2 text-slate-600 font-semibold">
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
    </div>
  );
}

// ---- Small Icon Components ----

function UserIcon() {
  return (
    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0z" />
    </svg>
  );
}

function CheckIcon() {
  return (
    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
    </svg>
  );
}

function XIcon() {
  return (
    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z" />
    </svg>
  );
}

function CalendarIcon() {
  return (
    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
    </svg>
  );
}

function BookIcon() {
  return (
    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
    </svg>
  );
}

function AwardIcon() {
  return (
    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z" />
    </svg>
  );
}

function ClipboardIcon() {
  return (
    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01" />
    </svg>
  );
}

function StatCard({
  icon,
  iconBg,
  iconColor,
  value,
  label,
}: {
  icon: React.ReactNode;
  iconBg: string;
  iconColor: string;
  value: string;
  label: string;
}) {
  return (
    <div className="bg-white border border-gray-200 rounded-lg p-4 flex items-center gap-3">
      <div className={`w-10 h-10 ${iconBg} rounded-lg flex items-center justify-center flex-shrink-0 ${iconColor}`}>
        {icon}
      </div>
      <div>
        <p className="text-xl font-bold text-gray-900 leading-tight">{value}</p>
        <p className="text-xs text-gray-500">{label}</p>
      </div>
    </div>
  );
}
