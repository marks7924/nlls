'use client';

import { useState } from 'react';
import Link from 'next/link';
import { 
  UserPlus2, CheckCircle2, FileText, ArrowRight, ArrowLeft, Upload, 
  School, ShieldCheck, Search 
} from 'lucide-react';

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

export default function PublicApplyPage() {
  const [step, setStep] = useState(1);
  const [submittedRefCode, setSubmittedRefCode] = useState<string | null>(null);

  // Form State
  const [studentFirstName, setStudentFirstName] = useState('');
  const [studentLastName, setStudentLastName] = useState('');
  const [dateOfBirth, setDateOfBirth] = useState('2018-05-12');
  const [desiredGrade, setDesiredGrade] = useState('Primary 1');
  
  const [parentName, setParentName] = useState('');
  const [parentEmail, setParentEmail] = useState('');
  const [parentPhone, setParentPhone] = useState('');
  const [parentOccupation, setParentOccupation] = useState('');

  const [birthCertificateUploaded, setBirthCertificateUploaded] = useState(true);
  const [photoUploaded, setPhotoUploaded] = useState(true);

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
                New Life Language School
              </span>
              <span className="text-[10px] text-blue-400 font-mono uppercase tracking-widest block">
                Online Admissions Portal 2026/2027
              </span>
            </div>
          </div>

          <Link href="/login" className="text-xs font-bold text-slate-300 hover:text-white bg-slate-800 px-3 py-1.5 rounded-lg">
            Staff / Parent Portal Login →
          </Link>
        </div>
      </header>

      {/* Main Form Container */}
      <main className="flex-1 max-w-3xl w-full mx-auto p-6 my-8">
        {step < 4 && (
          <div className="mb-8">
            <h1 className="text-3xl font-black text-white font-heading text-center">
              Student Admission Application
            </h1>
            <p className="text-slate-400 text-xs text-center mt-1">
              Apply for Primary 1..6 or Preparatory 1..3 for the Academic Year 2026/2027.
            </p>

            {/* Steps Progress */}
            <div className="flex items-center justify-center gap-4 mt-6">
              {[1, 2, 3].map(i => (
                <div key={i} className="flex items-center gap-2">
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center font-bold text-xs ${
                    step === i ? 'bg-blue-600 text-white ring-4 ring-blue-600/30' : step > i ? 'bg-emerald-600 text-white' : 'bg-slate-800 text-slate-500'
                  }`}>
                    {step > i ? '✓' : i}
                  </div>
                  <span className={`text-xs font-semibold ${step === i ? 'text-white' : 'text-slate-500'}`}>
                    {i === 1 ? 'Student Details' : i === 2 ? 'Parent Details' : 'Documents'}
                  </span>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* STEP 1: STUDENT DETAILS */}
        {step === 1 && (
          <div className="bg-slate-900 border border-slate-800 p-8 rounded-2xl space-y-5 shadow-2xl">
            <h3 className="font-bold text-lg text-white font-heading border-b border-slate-800 pb-3">Step 1: Student Information</h3>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">Student First Name</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Kareem"
                  value={studentFirstName}
                  onChange={(e) => setStudentFirstName(e.target.value)}
                  className="w-full bg-slate-950 border border-slate-800 text-white rounded-xl p-3 text-xs focus:ring-2 focus:ring-blue-600"
                />
              </div>
              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">Student Last Name</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Mostafa"
                  value={studentLastName}
                  onChange={(e) => setStudentLastName(e.target.value)}
                  className="w-full bg-slate-950 border border-slate-800 text-white rounded-xl p-3 text-xs focus:ring-2 focus:ring-blue-600"
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">Date of Birth</label>
                <input
                  type="date"
                  value={dateOfBirth}
                  onChange={(e) => setDateOfBirth(e.target.value)}
                  className="w-full bg-slate-950 border border-slate-800 text-white rounded-xl p-3 text-xs focus:ring-2 focus:ring-blue-600"
                />
              </div>
              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">Desired Grade Level</label>
                <select
                  value={desiredGrade}
                  onChange={(e) => setDesiredGrade(e.target.value)}
                  className="w-full bg-slate-950 border border-slate-800 text-blue-400 font-bold rounded-xl p-3 text-xs focus:ring-2 focus:ring-blue-600"
                >
                  {VALID_GRADES.map(g => (
                    <option key={g.name} value={g.name}>{g.name} ({g.stage} Stage)</option>
                  ))}
                </select>
              </div>
            </div>

            <div className="pt-4 flex justify-end">
              <button
                type="button"
                disabled={!studentFirstName || !studentLastName}
                onClick={() => setStep(2)}
                className="bg-blue-600 hover:bg-blue-700 disabled:opacity-50 text-white font-bold text-xs px-6 py-3 rounded-xl flex items-center gap-2"
              >
                Continue to Parent Information <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        )}

        {/* STEP 2: PARENT DETAILS */}
        {step === 2 && (
          <div className="bg-slate-900 border border-slate-800 p-8 rounded-2xl space-y-5 shadow-2xl">
            <h3 className="font-bold text-lg text-white font-heading border-b border-slate-800 pb-3">Step 2: Guardian Contact Details</h3>

            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1">Parent Full Name</label>
              <input
                type="text"
                required
                placeholder="e.g. Eng. Mostafa Nabil"
                value={parentName}
                onChange={(e) => setParentName(e.target.value)}
                className="w-full bg-slate-950 border border-slate-800 text-white rounded-xl p-3 text-xs focus:ring-2 focus:ring-blue-600"
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">Parent Email</label>
                <input
                  type="email"
                  required
                  placeholder="parent@example.com"
                  value={parentEmail}
                  onChange={(e) => setParentEmail(e.target.value)}
                  className="w-full bg-slate-950 border border-slate-800 text-white rounded-xl p-3 text-xs focus:ring-2 focus:ring-blue-600"
                />
              </div>
              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">Phone Number</label>
                <input
                  type="text"
                  required
                  placeholder="+20 100 000 0000"
                  value={parentPhone}
                  onChange={(e) => setParentPhone(e.target.value)}
                  className="w-full bg-slate-950 border border-slate-800 text-white rounded-xl p-3 text-xs focus:ring-2 focus:ring-blue-600"
                />
              </div>
            </div>

            <div className="pt-4 flex justify-between">
              <button
                type="button"
                onClick={() => setStep(1)}
                className="text-slate-400 hover:text-white font-bold text-xs px-4 py-3 flex items-center gap-1"
              >
                <ArrowLeft className="w-4 h-4" /> Back
              </button>
              <button
                type="button"
                disabled={!parentName || !parentEmail || !parentPhone}
                onClick={() => setStep(3)}
                className="bg-blue-600 hover:bg-blue-700 disabled:opacity-50 text-white font-bold text-xs px-6 py-3 rounded-xl flex items-center gap-2"
              >
                Proceed to Document Uploads <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        )}

        {/* STEP 3: DOCUMENT UPLOAD */}
        {step === 3 && (
          <form onSubmit={handleSubmitApplication} className="bg-slate-900 border border-slate-800 p-8 rounded-2xl space-y-5 shadow-2xl">
            <h3 className="font-bold text-lg text-white font-heading border-b border-slate-800 pb-3">Step 3: Required Admissions Documents</h3>

            <div className="space-y-3">
              <div className="bg-slate-950 border border-slate-800 p-4 rounded-xl flex items-center justify-between">
                <div>
                  <h4 className="font-bold text-white text-xs">Official Birth Certificate Scan</h4>
                  <p className="text-[11px] text-slate-500">PDF or image file (Max 5MB)</p>
                </div>
                <span className="bg-emerald-500/20 text-emerald-400 text-xs font-bold px-3 py-1.5 rounded-lg border border-emerald-500/30 flex items-center gap-1">
                  <CheckCircle2 className="w-3.5 h-3.5" /> Attached
                </span>
              </div>

              <div className="bg-slate-950 border border-slate-800 p-4 rounded-xl flex items-center justify-between">
                <div>
                  <h4 className="font-bold text-white text-xs">Student Passport Photograph</h4>
                  <p className="text-[11px] text-slate-500">Recent white background photo</p>
                </div>
                <span className="bg-emerald-500/20 text-emerald-400 text-xs font-bold px-3 py-1.5 rounded-lg border border-emerald-500/30 flex items-center gap-1">
                  <CheckCircle2 className="w-3.5 h-3.5" /> Attached
                </span>
              </div>
            </div>

            <div className="pt-4 flex justify-between">
              <button
                type="button"
                onClick={() => setStep(2)}
                className="text-slate-400 hover:text-white font-bold text-xs px-4 py-3 flex items-center gap-1"
              >
                <ArrowLeft className="w-4 h-4" /> Back
              </button>
              <button
                type="submit"
                className="bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs px-8 py-3 rounded-xl flex items-center gap-2 shadow-lg"
              >
                Submit Official Application <CheckCircle2 className="w-4 h-4" />
              </button>
            </div>
          </form>
        )}

        {/* STEP 4: CONFIRMATION */}
        {step === 4 && (
          <div className="bg-slate-900 border border-slate-800 p-8 rounded-2xl text-center space-y-6 shadow-2xl">
            <div className="w-16 h-16 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center mx-auto border border-emerald-500/30">
              <CheckCircle2 className="w-10 h-10" />
            </div>

            <div>
              <h2 className="text-2xl font-black text-white font-heading">Application Submitted Successfully!</h2>
              <p className="text-slate-400 text-xs mt-1">
                Your admission request has been logged in the NLLS portal database.
              </p>
            </div>

            <div className="bg-slate-950 p-4 rounded-xl border border-slate-800 max-w-sm mx-auto space-y-1">
              <span className="text-[11px] text-slate-500 font-bold uppercase">Application Reference Code:</span>
              <p className="text-2xl font-mono font-black text-yellow-400">{submittedRefCode}</p>
            </div>

            <div className="text-xs text-slate-400 space-y-2 text-left bg-slate-950 p-4 rounded-xl border border-slate-800">
              <p>• Student Name: <strong className="text-white">{studentFirstName} {studentLastName}</strong></p>
              <p>• Desired Grade: <strong className="text-blue-400">{desiredGrade}</strong></p>
              <p>• Parent Email: <strong className="text-white">{parentEmail}</strong></p>
              <p>• Status: <span className="bg-blue-500/20 text-blue-400 font-bold px-2 py-0.5 rounded">Under Review</span></p>
            </div>

            <div className="pt-2 flex items-center justify-center gap-4">
              <Link href="/" className="bg-slate-800 hover:bg-slate-700 text-white font-bold text-xs px-6 py-2.5 rounded-xl">
                Return to Homepage
              </Link>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}
