'use client';

import { useState } from 'react';
import { useAuth } from '@/lib/auth/context';
import { 
  FileText, Plus, CheckCircle, Clock, Lock, Send, Eye, Filter, 
  Award, AlertCircle, FileSpreadsheet, ShieldCheck, X, Save 
} from 'lucide-react';

interface Exam {
  id: string;
  title: string;
  type: 'Weekly Quiz' | 'Monthly Exam' | 'Midterm' | 'Final Exam';
  subject: string;
  grade: string;
  date: string;
  maxScore: number;
  status: 'draft' | 'scheduled' | 'results_pending' | 'submitted' | 'approved' | 'published';
  submittedBy?: string;
  publishedAt?: string;
}

interface StudentResult {
  id: string;
  studentId: string;
  name: string;
  score: number;
  isAbsent: boolean;
}

const INITIAL_EXAMS: Exam[] = [
  { id: '1', title: 'English Monthly Exam 1', type: 'Monthly Exam', subject: 'English Language', grade: 'Grade 7', date: '2026-10-15', maxScore: 50, status: 'scheduled' },
  { id: '2', title: 'Mathematics Midterm Assessment', type: 'Midterm', subject: 'Mathematics', grade: 'Grade 8', date: '2026-10-02', maxScore: 100, status: 'submitted', submittedBy: 'Mr. Sameh Farouk' },
  { id: '3', title: 'Science Lab Practical Quiz', type: 'Weekly Quiz', subject: 'Science', grade: 'Grade 7', date: '2026-09-28', maxScore: 20, status: 'published', publishedAt: '2026-09-30' },
  { id: '4', title: 'French Vocabulary Quiz 2', type: 'Weekly Quiz', subject: 'French', grade: 'Grade 5', date: '2026-10-12', maxScore: 15, status: 'results_pending' },
  { id: '5', title: 'Arabic Term 1 Final Exam', type: 'Final Exam', subject: 'Arabic Literature', grade: 'Grade 9', date: '2026-12-10', maxScore: 100, status: 'draft' },
];

const INITIAL_STUDENT_RESULTS: StudentResult[] = [
  { id: '101', studentId: 'NL-2026-00142', name: 'Youssef Ahmed El-Sayed', score: 14, isAbsent: false },
  { id: '102', studentId: 'NL-2026-00143', name: 'Mariam Mahmoud Ibrahim', score: 15, isAbsent: false },
  { id: '103', studentId: 'NL-2026-00144', name: 'Omar Khaled Hassan', score: 0, isAbsent: true },
  { id: '104', studentId: 'NL-2026-00145', name: 'Nour Tarek Abdelrahman', score: 12, isAbsent: false },
];

export default function ExamsPage() {
  const { hasPermission } = useAuth();
  const [exams, setExams] = useState<Exam[]>(INITIAL_EXAMS);
  const [subjectFilter, setSubjectFilter] = useState('all');
  const [statusFilter, setStatusFilter] = useState('all');
  const [activeTab, setActiveTab] = useState<'all' | 'pending_approval' | 'published'>('all');

  // Modal states
  const [editingExam, setEditingExam] = useState<Exam | null>(null);
  const [studentResults, setStudentResults] = useState<StudentResult[]>(INITIAL_STUDENT_RESULTS);
  const [showScheduleModal, setShowScheduleModal] = useState(false);

  // New Exam Form
  const [newTitle, setNewTitle] = useState('');
  const [newSubject, setNewSubject] = useState('English Language');
  const [newGrade, setNewGrade] = useState('Grade 7');
  const [newType, setNewType] = useState<'Weekly Quiz' | 'Monthly Exam' | 'Midterm' | 'Final Exam'>('Weekly Quiz');
  const [newDate, setNewDate] = useState('2026-10-20');
  const [newMaxScore, setNewMaxScore] = useState(50);

  const canEnterResults = hasPermission('enter_exam_results');
  const canApproveResults = hasPermission('approve_exam_results');
  const canPublishResults = hasPermission('publish_final_exam_results');

  const filteredExams = exams.filter((e) => {
    const matchesSubject = subjectFilter === 'all' || e.subject === subjectFilter;
    const matchesStatus = statusFilter === 'all' || e.status === statusFilter;
    
    if (activeTab === 'pending_approval') return e.status === 'submitted';
    if (activeTab === 'published') return e.status === 'published';
    
    return matchesSubject && matchesStatus;
  });

  const handleScoreChange = (id: string, score: number) => {
    setStudentResults(prev => prev.map(s => s.id === id ? { ...s, score } : s));
  };

  const handleSaveMarks = () => {
    if (!editingExam) return;
    setExams(prev => prev.map(e => e.id === editingExam.id ? { ...e, status: 'submitted', submittedBy: 'Logged User' } : e));
    setEditingExam(null);
  };

  const handleApproveAndPublish = (examId: string) => {
    setExams(prev => prev.map(e => e.id === examId ? { ...e, status: 'published', publishedAt: '2026-10-07' } : e));
    setEditingExam(null);
  };

  const handleScheduleExam = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTitle) return;

    const created: Exam = {
      id: String(Date.now()),
      title: newTitle,
      type: newType,
      subject: newSubject,
      grade: newGrade,
      date: newDate,
      maxScore: newMaxScore,
      status: 'scheduled',
    };

    setExams(prev => [created, ...prev]);
    setShowScheduleModal(false);
    setNewTitle('');
  };

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-slate-900 font-heading flex items-center gap-2">
            <FileText className="w-7 h-7 text-blue-700" />
            Exams & Result Workflow
          </h1>
          <p className="text-slate-600 text-sm mt-1">
            Manage assessment schedules, enter marks, submit for supervisor approval, and publish final report cards.
          </p>
        </div>

        {hasPermission('create_exam') && (
          <button
            onClick={() => setShowScheduleModal(true)}
            className="flex items-center justify-center gap-2 bg-blue-700 hover:bg-blue-800 text-white font-semibold px-4 py-2.5 rounded-lg shadow-sm transition-colors text-sm"
          >
            <Plus className="w-4 h-4" />
            Schedule New Exam
          </button>
        )}
      </div>

      {/* Status Workflow Banner */}
      <div className="bg-gradient-to-r from-blue-900 via-blue-800 to-indigo-900 rounded-xl p-5 text-white shadow-sm flex flex-col md:flex-row items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-yellow-400/20 text-yellow-400 flex items-center justify-center font-bold">
            <ShieldCheck className="w-6 h-6" />
          </div>
          <div>
            <h3 className="font-semibold text-sm">Grading & Result Lock Workflow</h3>
            <p className="text-xs text-blue-200 mt-0.5">
              Teacher enters → Supervisor approves → Head Admin publishes & locks marks.
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2 bg-blue-950/60 p-2 rounded-lg border border-blue-700/50 text-xs">
          <div className="flex items-center gap-1.5 px-2.5 py-1 rounded bg-blue-800/80 text-blue-200">
            <Clock className="w-3.5 h-3.5" /> Draft/Scheduled
          </div>
          <span>→</span>
          <div className="flex items-center gap-1.5 px-2.5 py-1 rounded bg-amber-500/20 text-amber-300">
            <Send className="w-3.5 h-3.5" /> Submitted
          </div>
          <span>→</span>
          <div className="flex items-center gap-1.5 px-2.5 py-1 rounded bg-emerald-500/20 text-emerald-300">
            <Lock className="w-3.5 h-3.5" /> Published
          </div>
        </div>
      </div>

      {/* Tabs & Controls */}
      <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4 border-b border-slate-200 pb-3">
        <div className="flex items-center gap-2 overflow-x-auto">
          <button
            onClick={() => setActiveTab('all')}
            className={`px-4 py-2 rounded-lg text-xs font-semibold transition-colors ${
              activeTab === 'all' ? 'bg-blue-700 text-white' : 'text-slate-600 hover:bg-slate-100'
            }`}
          >
            All Scheduled Exams
          </button>
          <button
            onClick={() => setActiveTab('pending_approval')}
            className={`px-4 py-2 rounded-lg text-xs font-semibold transition-colors flex items-center gap-1.5 ${
              activeTab === 'pending_approval' ? 'bg-blue-700 text-white' : 'text-slate-600 hover:bg-slate-100'
            }`}
          >
            Pending Supervisor Approval
            <span className="bg-amber-100 text-amber-800 text-[10px] px-1.5 py-0.2 rounded-full font-bold">1</span>
          </button>
          <button
            onClick={() => setActiveTab('published')}
            className={`px-4 py-2 rounded-lg text-xs font-semibold transition-colors ${
              activeTab === 'published' ? 'bg-blue-700 text-white' : 'text-slate-600 hover:bg-slate-100'
            }`}
          >
            Published Results
          </button>
        </div>

        <select
          value={subjectFilter}
          onChange={(e) => setSubjectFilter(e.target.value)}
          className="bg-white border border-slate-200 text-slate-700 text-xs rounded-lg px-3 py-2"
        >
          <option value="all">All Subjects</option>
          <option value="English Language">English Language</option>
          <option value="Mathematics">Mathematics</option>
          <option value="Science">Science</option>
          <option value="French">French</option>
          <option value="Arabic Literature">Arabic Literature</option>
        </select>
      </div>

      {/* Exams Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {filteredExams.map((exam) => (
          <div key={exam.id} className="bg-white rounded-xl border border-slate-200 shadow-sm hover:shadow-md transition-shadow p-5 flex flex-col justify-between">
            <div>
              <div className="flex items-start justify-between gap-2 mb-3">
                <span className="bg-blue-50 text-blue-700 border border-blue-200 text-[11px] font-semibold px-2.5 py-0.5 rounded-md">
                  {exam.type}
                </span>

                {exam.status === 'scheduled' && (
                  <span className="bg-slate-100 text-slate-700 text-xs px-2.5 py-0.5 rounded-full font-medium inline-flex items-center gap-1">
                    <Clock className="w-3 h-3 text-slate-500" /> Scheduled
                  </span>
                )}
                {exam.status === 'submitted' && (
                  <span className="bg-amber-50 text-amber-700 border border-amber-200 text-xs px-2.5 py-0.5 rounded-full font-medium inline-flex items-center gap-1">
                    <Send className="w-3 h-3 text-amber-600" /> Awaiting Approval
                  </span>
                )}
                {exam.status === 'published' && (
                  <span className="bg-emerald-50 text-emerald-700 border border-emerald-200 text-xs px-2.5 py-0.5 rounded-full font-medium inline-flex items-center gap-1">
                    <CheckCircle className="w-3 h-3 text-emerald-600" /> Published
                  </span>
                )}
                {exam.status === 'results_pending' && (
                  <span className="bg-blue-50 text-blue-700 border border-blue-200 text-xs px-2.5 py-0.5 rounded-full font-medium inline-flex items-center gap-1">
                    <Clock className="w-3 h-3 text-blue-600" /> Enter Marks
                  </span>
                )}
              </div>

              <h3 className="font-bold text-slate-900 text-base font-heading mb-1">{exam.title}</h3>
              <p className="text-xs text-slate-500 font-medium">
                {exam.subject} · <span className="text-slate-800 font-semibold">{exam.grade}</span>
              </p>

              <div className="mt-4 pt-3 border-t border-slate-100 grid grid-cols-2 gap-2 text-xs">
                <div><span className="text-slate-500 block text-[11px]">Exam Date</span><span className="font-semibold text-slate-800">{exam.date}</span></div>
                <div><span className="text-slate-500 block text-[11px]">Max Score</span><span className="font-semibold text-blue-900">{exam.maxScore} Marks</span></div>
              </div>
            </div>

            {/* Action Bar */}
            <div className="mt-5 pt-3 border-t border-slate-100 flex items-center justify-between">
              {exam.status === 'results_pending' && (
                <button
                  onClick={() => setEditingExam(exam)}
                  className="w-full bg-blue-700 hover:bg-blue-800 text-white text-xs font-semibold py-2 rounded-lg transition-colors flex items-center justify-center gap-1.5"
                >
                  <FileSpreadsheet className="w-3.5 h-3.5" /> Enter Student Marks
                </button>
              )}

              {exam.status === 'submitted' && (
                <button
                  onClick={() => setEditingExam(exam)}
                  className="w-full bg-amber-600 hover:bg-amber-700 text-white text-xs font-semibold py-2 rounded-lg transition-colors flex items-center justify-center gap-1.5"
                >
                  <ShieldCheck className="w-3.5 h-3.5" /> Review & Approve Marks
                </button>
              )}

              {exam.status === 'published' && (
                <button
                  onClick={() => setEditingExam(exam)}
                  className="w-full bg-slate-100 hover:bg-slate-200 text-slate-800 text-xs font-semibold py-2 rounded-lg transition-colors flex items-center justify-center gap-1.5"
                >
                  <Eye className="w-3.5 h-3.5" /> View Published Marks
                </button>
              )}

              {exam.status === 'scheduled' && (
                <span className="text-xs text-slate-400 italic w-full text-center">Exam date pending</span>
              )}
            </div>
          </div>
        ))}
      </div>

      {/* Marks Entry / Review Modal */}
      {editingExam && (
        <div className="fixed inset-0 bg-slate-900/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-lg w-full shadow-2xl overflow-hidden animate-in fade-in duration-150">
            <div className="bg-blue-900 text-white p-5 flex items-center justify-between">
              <div>
                <span className="text-xs font-mono bg-blue-800 text-yellow-400 px-2 py-0.5 rounded">{editingExam.grade}</span>
                <h3 className="text-lg font-bold mt-1 font-heading">{editingExam.title}</h3>
                <p className="text-xs text-blue-200">{editingExam.subject} · Max Marks: {editingExam.maxScore}</p>
              </div>
              <button onClick={() => setEditingExam(null)} className="text-blue-200 hover:text-white">
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="p-6 space-y-4">
              <h4 className="text-xs font-bold text-slate-500 uppercase tracking-wider">Student Result Sheet</h4>

              <div className="divide-y divide-slate-100 border border-slate-200 rounded-xl overflow-hidden text-xs">
                {studentResults.map(st => (
                  <div key={st.id} className="p-3 flex items-center justify-between">
                    <div>
                      <div className="font-semibold text-slate-900">{st.name}</div>
                      <div className="text-[11px] text-slate-500 font-mono">{st.studentId}</div>
                    </div>

                    <div className="flex items-center gap-2">
                      <input
                        type="number"
                        disabled={editingExam.status === 'published'}
                        max={editingExam.maxScore}
                        min={0}
                        value={st.score}
                        onChange={(e) => handleScoreChange(st.id, Number(e.target.value))}
                        className="w-16 bg-slate-50 border border-slate-200 rounded p-1 text-center font-bold text-slate-900"
                      />
                      <span className="text-slate-400 text-[11px]">/ {editingExam.maxScore}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-slate-50 p-4 border-t border-slate-200 flex justify-between items-center">
              <button onClick={() => setEditingExam(null)} className="text-xs text-slate-600 font-semibold">
                Close
              </button>

              {editingExam.status === 'results_pending' && (
                <button onClick={handleSaveMarks} className="bg-blue-700 hover:bg-blue-800 text-white text-xs px-4 py-2 rounded-lg font-semibold flex items-center gap-1.5">
                  <Save className="w-3.5 h-3.5" /> Save & Submit to Supervisor
                </button>
              )}

              {editingExam.status === 'submitted' && (
                <button onClick={() => handleApproveAndPublish(editingExam.id)} className="bg-emerald-600 hover:bg-emerald-700 text-white text-xs px-4 py-2 rounded-lg font-semibold flex items-center gap-1.5">
                  <ShieldCheck className="w-3.5 h-3.5" /> Approve & Lock Marks
                </button>
              )}
            </div>
          </div>
        </div>
      )}

      {/* Schedule Exam Modal */}
      {showScheduleModal && (
        <div className="fixed inset-0 bg-slate-900/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-md w-full shadow-2xl overflow-hidden">
            <div className="bg-blue-900 text-white p-5 flex items-center justify-between">
              <h3 className="text-lg font-bold font-heading">Schedule Assessment</h3>
              <button onClick={() => setShowScheduleModal(false)} className="text-blue-200 hover:text-white">
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleScheduleExam} className="p-6 space-y-4 text-xs">
              <div>
                <label className="block font-semibold text-slate-700 mb-1">Assessment Title</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Science Term 1 Practical Quiz"
                  value={newTitle}
                  onChange={(e) => setNewTitle(e.target.value)}
                  className="w-full bg-slate-50 border border-slate-200 rounded-lg p-2.5 font-semibold text-slate-900"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-semibold text-slate-700 mb-1">Subject</label>
                  <select value={newSubject} onChange={(e) => setNewSubject(e.target.value)} className="w-full bg-slate-50 border border-slate-200 rounded-lg p-2.5">
                    <option value="English Language">English Language</option>
                    <option value="Mathematics">Mathematics</option>
                    <option value="Science">Science</option>
                    <option value="French">French</option>
                  </select>
                </div>

                <div>
                  <label className="block font-semibold text-slate-700 mb-1">Grade</label>
                  <select value={newGrade} onChange={(e) => setNewGrade(e.target.value)} className="w-full bg-slate-50 border border-slate-200 rounded-lg p-2.5">
                    <option value="Grade 7">Grade 7</option>
                    <option value="Grade 8">Grade 8</option>
                    <option value="Grade 5">Grade 5</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-semibold text-slate-700 mb-1">Assessment Type</label>
                  <select value={newType} onChange={(e) => setNewType(e.target.value as any)} className="w-full bg-slate-50 border border-slate-200 rounded-lg p-2.5">
                    <option value="Weekly Quiz">Weekly Quiz</option>
                    <option value="Monthly Exam">Monthly Exam</option>
                    <option value="Midterm">Midterm</option>
                    <option value="Final Exam">Final Exam</option>
                  </select>
                </div>

                <div>
                  <label className="block font-semibold text-slate-700 mb-1">Max Score</label>
                  <input
                    type="number"
                    value={newMaxScore}
                    onChange={(e) => setNewMaxScore(Number(e.target.value))}
                    className="w-full bg-slate-50 border border-slate-200 rounded-lg p-2.5 font-semibold"
                  />
                </div>
              </div>

              <div className="pt-3 flex justify-end gap-2 border-t border-slate-100">
                <button type="button" onClick={() => setShowScheduleModal(false)} className="px-4 py-2 text-slate-600 font-semibold">
                  Cancel
                </button>
                <button type="submit" className="bg-blue-700 hover:bg-blue-800 text-white font-semibold px-5 py-2 rounded-lg">
                  Save Exam Schedule
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
