'use client';

import { useState } from 'react';
import Link from 'next/link';
import { 
  UserPlus2, CheckCircle2, Search, ArrowRight, ArrowLeft, School, 
  Clock, Calendar, ShieldCheck, Mail, AlertCircle 
} from 'lucide-react';
import { getStoredContactMessages } from '@/lib/contact-messages';
import { useLanguageTheme } from '@/lib/language-theme-context';

const VALID_GRADES = [
  { name: 'Primary 1', stage: 'Primary' },
  { name: 'Primary 2', stage: 'Primary' },
  { name: 'Primary 3', stage: 'Primary' },
  { name: 'Primary 4', stage: 'Primary' },
  { name: 'Primary 5', stage: 'Primary' },
  { name: 'Primary 6', stage: 'Primary' },
  { name: 'Preparatory 1', stage: 'Preparatory' },
  { name: 'Preparatory 2', stage: 'Preparatory' },
  { name: 'Preparatory 3', stage: 'Preparatory' },
];

export default function PublicAdmissionsPage() {
  const { lang, theme, toggleLang, toggleTheme, t } = useLanguageTheme();
  const [activeTab, setActiveTab] = useState<'apply' | 'track'>('apply');
  const [step, setStep] = useState(1);
  const [submittedRefCode, setSubmittedRefCode] = useState<string | null>(null);

  // Tracking Search State
  const [trackQuery, setTrackQuery] = useState('');
  const [trackResult, setTrackResult] = useState<{
    code: string;
    type: 'admission' | 'inquiry';
    title: string;
    status: string;
    date: string;
    details: string;
  } | null>(null);

  // Form State
  const [studentFirstName, setStudentFirstName] = useState('');
  const [studentLastName, setStudentLastName] = useState('');
  const [dateOfBirth, setDateOfBirth] = useState('2018-05-12');
  const [desiredGrade, setDesiredGrade] = useState('Primary 1');
  const [parentName, setParentName] = useState('');
  const [parentEmail, setParentEmail] = useState('');
  const [parentPhone, setParentPhone] = useState('');

  const handleTrackSearch = (e: React.FormEvent) => {
    e.preventDefault();
    const q = trackQuery.toUpperCase().trim();
    if (!q) return;

    if (q.startsWith('MSG-')) {
      const messages = getStoredContactMessages();
      const foundMsg = messages.find(m => m.id.toUpperCase() === q);
      if (foundMsg) {
        setTrackResult({
          code: foundMsg.id,
          type: 'inquiry',
          title: `Contact Us Inquiry (${foundMsg.department.replace('_', ' ')})`,
          status: foundMsg.isRead ? 'Reviewed by Student Affairs' : 'Message Received / Pending Review',
          date: foundMsg.timestamp,
          details: `Inquiry submitted by ${foundMsg.firstName} ${foundMsg.lastName} (${foundMsg.email}).`
        });
        return;
      }
    }

    // Default mock admission tracker response
    setTrackResult({
      code: q.startsWith('ADM-') ? q : `ADM-2026-${q}`,
      type: 'admission',
      title: 'Online Student Admission Application',
      status: 'Interview Scheduled for October 15 at 10:00 AM',
      date: '2026-10-06',
      details: 'Application documents received and verified. Candidate interview scheduled on main campus.'
    });
  };

  const handleSubmitApplication = (e: React.FormEvent) => {
    e.preventDefault();
    const refCode = `ADM-2026-${Math.floor(1000 + Math.random() * 9000)}`;
    setSubmittedRefCode(refCode);
    setStep(4);
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col font-sans">
      {/* Top Header */}
      <header className="bg-slate-900/80 backdrop-blur-md border-b border-slate-800 p-4 sticky top-0 z-50">
        <div className="max-w-5xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-3">
            <img
              src="/nlls.png"
              alt="NLLS School Logo"
              className="w-10 h-10 object-contain cursor-pointer hover:scale-105 active:scale-95 transition-transform"
              onClick={() => window.location.reload()}
              title="Click to Reload Page"
            />
            <div className="cursor-pointer" onClick={() => window.location.reload()}>
              <span className="font-bold text-white text-base tracking-tight font-heading block">
                {t('school.title')}
              </span>
              <span className="text-[10px] text-blue-400 font-mono uppercase tracking-widest block">
                {t('school.portal_sub')}
              </span>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={toggleLang}
              className="text-xs font-bold px-3 py-1.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 transition-all"
            >
              🌐 {lang === 'en' ? 'العربية' : 'English'}
            </button>
            <button
              onClick={() => setActiveTab('track')}
              className={`text-xs font-bold px-3 py-2 rounded-xl transition-all ${
                activeTab === 'track' ? 'bg-blue-600 text-white' : 'bg-slate-800 text-slate-300 hover:text-white'
              }`}
            >
              {t('nav.track_status')}
            </button>
            <Link href="/login" className="text-xs font-bold text-slate-300 hover:text-white bg-slate-800 px-3.5 py-2 rounded-xl">
              {t('nav.portal_login')}
            </Link>
          </div>
        </div>
      </header>

      {/* Main Container */}
      <main className="flex-1 max-w-3xl w-full mx-auto p-6 my-8">
        {/* Navigation Tabs */}
        <div className="flex justify-center gap-3 mb-8">
          <button
            onClick={() => setActiveTab('apply')}
            className={`px-6 py-2.5 rounded-xl font-bold text-xs transition-all ${
              activeTab === 'apply' ? 'bg-blue-600 text-white shadow-lg' : 'bg-slate-900 text-slate-400 border border-slate-800 hover:text-white'
            }`}
          >
            Apply for Enrolment
          </button>
          <button
            onClick={() => setActiveTab('track')}
            className={`px-6 py-2.5 rounded-xl font-bold text-xs transition-all ${
              activeTab === 'track' ? 'bg-blue-600 text-white shadow-lg' : 'bg-slate-900 text-slate-400 border border-slate-800 hover:text-white'
            }`}
          >
            Track Reference Status
          </button>
        </div>

        {/* TAB 1: APPLY FOR ENROLMENT */}
        {activeTab === 'apply' && (
          <div>
            {step < 4 && (
              <div className="mb-8 text-center">
                <h1 className="text-3xl font-black text-white font-heading">
                  Student Admission Application
                </h1>
                <p className="text-slate-400 text-xs mt-1">
                  Enrolment options for Primary 1..6 and Preparatory 1..3.
                </p>

                <div className="flex items-center justify-center gap-4 mt-6">
                  {[1, 2, 3].map(i => (
                    <div key={i} className="flex items-center gap-2">
                      <div className={`w-8 h-8 rounded-full flex items-center justify-center font-bold text-xs ${
                        step === i ? 'bg-blue-600 text-white ring-4 ring-blue-600/30' : step > i ? 'bg-emerald-600 text-white' : 'bg-slate-800 text-slate-500'
                      }`}>
                        {step > i ? '✓' : i}
                      </div>
                      <span className={`text-xs font-semibold ${step === i ? 'text-white' : 'text-slate-500'}`}>
                        {i === 1 ? 'Student' : i === 2 ? 'Guardian' : 'Documents'}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {step === 1 && (
              <div className="bg-slate-900 border border-slate-800 p-8 rounded-2xl space-y-5 shadow-2xl">
                <h3 className="font-bold text-lg text-white font-heading border-b border-slate-800 pb-3">Step 1: Student Information</h3>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-semibold text-slate-300 mb-1">First Name</label>
                    <input type="text" required placeholder="Kareem" value={studentFirstName} onChange={(e) => setStudentFirstName(e.target.value)} className="w-full bg-slate-950 border border-slate-800 text-white rounded-xl p-3 text-xs" />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-slate-300 mb-1">Last Name</label>
                    <input type="text" required placeholder="Mostafa" value={studentLastName} onChange={(e) => setStudentLastName(e.target.value)} className="w-full bg-slate-950 border border-slate-800 text-white rounded-xl p-3 text-xs" />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-semibold text-slate-300 mb-1">Date of Birth</label>
                    <input type="date" value={dateOfBirth} onChange={(e) => setDateOfBirth(e.target.value)} className="w-full bg-slate-950 border border-slate-800 text-white rounded-xl p-3 text-xs" />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-slate-300 mb-1">Desired Grade</label>
                    <select value={desiredGrade} onChange={(e) => setDesiredGrade(e.target.value)} className="w-full bg-slate-950 border border-slate-800 text-blue-400 font-bold rounded-xl p-3 text-xs">
                      {VALID_GRADES.map(g => (
                        <option key={g.name} value={g.name}>{g.name} ({g.stage} Stage)</option>
                      ))}
                    </select>
                  </div>
                </div>

                <div className="pt-4 flex justify-end">
                  <button type="button" disabled={!studentFirstName || !studentLastName} onClick={() => setStep(2)} className="bg-blue-600 hover:bg-blue-700 disabled:opacity-50 text-white font-bold text-xs px-6 py-3 rounded-xl flex items-center gap-2">
                    Next: Guardian Information <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
              </div>
            )}

            {step === 2 && (
              <div className="bg-slate-900 border border-slate-800 p-8 rounded-2xl space-y-5 shadow-2xl">
                <h3 className="font-bold text-lg text-white font-heading border-b border-slate-800 pb-3">Step 2: Guardian Details</h3>
                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1">Parent Name</label>
                  <input type="text" required placeholder="Eng. Mostafa Nabil" value={parentName} onChange={(e) => setParentName(e.target.value)} className="w-full bg-slate-950 border border-slate-800 text-white rounded-xl p-3 text-xs" />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-semibold text-slate-300 mb-1">Email</label>
                    <input type="email" required placeholder="parent@example.com" value={parentEmail} onChange={(e) => setParentEmail(e.target.value)} className="w-full bg-slate-950 border border-slate-800 text-white rounded-xl p-3 text-xs" />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-slate-300 mb-1">Phone</label>
                    <input type="text" required placeholder="+20 100 000 0000" value={parentPhone} onChange={(e) => setParentPhone(e.target.value)} className="w-full bg-slate-950 border border-slate-800 text-white rounded-xl p-3 text-xs" />
                  </div>
                </div>

                <div className="pt-4 flex justify-between">
                  <button type="button" onClick={() => setStep(1)} className="text-slate-400 font-bold text-xs px-4 py-3">Back</button>
                  <button type="button" disabled={!parentName || !parentEmail || !parentPhone} onClick={() => setStep(3)} className="bg-blue-600 hover:bg-blue-700 disabled:opacity-50 text-white font-bold text-xs px-6 py-3 rounded-xl flex items-center gap-2">
                    Next: Documents <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
              </div>
            )}

            {step === 3 && (
              <form onSubmit={handleSubmitApplication} className="bg-slate-900 border border-slate-800 p-8 rounded-2xl space-y-5 shadow-2xl">
                <h3 className="font-bold text-lg text-white font-heading border-b border-slate-800 pb-3">Step 3: Document Attachments</h3>
                <div className="bg-slate-950 p-4 rounded-xl border border-slate-800 flex justify-between items-center text-xs">
                  <span>Birth Certificate Scan</span>
                  <span className="text-emerald-400 font-bold">✓ Attached</span>
                </div>
                <div className="bg-slate-950 p-4 rounded-xl border border-slate-800 flex justify-between items-center text-xs">
                  <span>Passport Photo</span>
                  <span className="text-emerald-400 font-bold">✓ Attached</span>
                </div>

                <div className="pt-4 flex justify-between">
                  <button type="button" onClick={() => setStep(2)} className="text-slate-400 font-bold text-xs">Back</button>
                  <button type="submit" className="bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs px-8 py-3 rounded-xl flex items-center gap-2">
                    Submit Application <CheckCircle2 className="w-4 h-4" />
                  </button>
                </div>
              </form>
            )}

            {step === 4 && (
              <div className="bg-slate-900 border border-slate-800 p-8 rounded-2xl text-center space-y-6 shadow-2xl">
                <div className="w-16 h-16 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center mx-auto border border-emerald-500/30">
                  <CheckCircle2 className="w-10 h-10" />
                </div>
                <div>
                  <h2 className="text-2xl font-black text-white font-heading">Application Submitted!</h2>
                  <p className="text-slate-400 text-xs mt-1">Use your tracking reference below to monitor your admission status anytime.</p>
                </div>
                <div className="bg-slate-950 p-4 rounded-xl border border-slate-800 max-w-sm mx-auto space-y-1">
                  <span className="text-[11px] text-slate-500 font-bold uppercase">Tracking Reference Code:</span>
                  <p className="text-2xl font-mono font-black text-yellow-400">{submittedRefCode}</p>
                </div>
              </div>
            )}
          </div>
        )}

        {/* TAB 2: TRACK STATUS */}
        {activeTab === 'track' && (
          <div className="bg-slate-900 border border-slate-800 p-8 rounded-2xl space-y-6 shadow-2xl">
            <div>
              <h2 className="text-2xl font-black text-white font-heading">Track Inquiry or Application Status</h2>
              <p className="text-slate-400 text-xs mt-1">
                Enter your Tracking Reference Code (e.g., <code className="text-yellow-400">ADM-2026-9821</code> or <code className="text-yellow-400">MSG-2026-126</code>).
              </p>
            </div>

            <form onSubmit={handleTrackSearch} className="flex gap-2">
              <div className="relative flex-1">
                <Search className="w-4 h-4 text-slate-500 absolute left-3 top-3.5" />
                <input
                  type="text"
                  required
                  placeholder="Enter Tracking Reference Code..."
                  value={trackQuery}
                  onChange={(e) => setTrackQuery(e.target.value)}
                  className="w-full pl-9 pr-4 py-3 bg-slate-950 border border-slate-800 text-white rounded-xl text-xs font-mono font-bold focus:ring-2 focus:ring-blue-600"
                />
              </div>
              <button type="submit" className="bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs px-6 rounded-xl">
                Check Status
              </button>
            </form>

            {trackResult && (
              <div className="bg-slate-950 p-6 rounded-xl border border-slate-800 space-y-4 animate-in fade-in">
                <div className="flex items-start justify-between border-b border-slate-800 pb-3">
                  <div>
                    <span className="text-xs font-mono text-yellow-400 bg-yellow-400/10 px-2 py-0.5 rounded border border-yellow-400/20 font-bold">
                      {trackResult.code}
                    </span>
                    <h3 className="font-bold text-white text-base font-heading mt-1">{trackResult.title}</h3>
                  </div>
                  <span className="bg-blue-500/20 text-blue-400 font-bold text-xs px-3 py-1 rounded-full border border-blue-500/30">
                    {trackResult.status}
                  </span>
                </div>

                <div className="text-xs text-slate-300 space-y-2">
                  <p>{trackResult.details}</p>
                  <p className="text-slate-500 font-mono text-[11px]">Last Updated: {trackResult.date}</p>
                </div>
              </div>
            )}
          </div>
        )}
      </main>
    </div>
  );
}
