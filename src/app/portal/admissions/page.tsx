'use client';

import { useState } from 'react';
import { useAuth } from '@/lib/auth/context';
import { 
  UserPlus2, Search, Filter, CheckCircle2, XCircle, Clock, Calendar, Mail, 
  FileText, ShieldCheck, UserCheck, X 
} from 'lucide-react';
import { registerNewStudent } from '@/lib/students-store';

interface AdmissionApplication {
  id: string;
  applicantCode: string;
  studentName: string;
  desiredGrade: string;
  stage: string;
  parentName: string;
  parentEmail: string;
  parentPhone: string;
  submittedDate: string;
  status: 'submitted' | 'under_review' | 'interview_scheduled' | 'accepted' | 'rejected' | 'enrolled';
  interviewDate?: string;
}

const INITIAL_ADMISSIONS: AdmissionApplication[] = [
  {
    id: 'adm-1',
    applicantCode: 'ADM-2026-9821',
    studentName: 'Youssef Hany El-Sayed',
    desiredGrade: 'Primary 1',
    stage: 'Primary',
    parentName: 'Hany El-Sayed',
    parentEmail: 'hany.sayed@gmail.com',
    parentPhone: '+20 100 999 8877',
    submittedDate: '2026-10-06',
    status: 'submitted',
  },
  {
    id: 'adm-2',
    applicantCode: 'ADM-2026-9822',
    studentName: 'Malak Sherif Mansour',
    desiredGrade: 'Preparatory 1',
    stage: 'Preparatory',
    parentName: 'Sherif Mansour',
    parentEmail: 'sherif.mansour@hotmail.com',
    parentPhone: '+20 102 333 4455',
    submittedDate: '2026-10-05',
    status: 'interview_scheduled',
    interviewDate: '2026-10-12 at 10:00 AM',
  },
  {
    id: 'adm-3',
    applicantCode: 'ADM-2026-9823',
    studentName: 'Adham Tarek Abdelrahman',
    desiredGrade: 'Primary 3',
    stage: 'Primary',
    parentName: 'Tarek Abdelrahman',
    parentEmail: 'tarek.parent@gmail.com',
    parentPhone: '+20 100 111 2233',
    submittedDate: '2026-10-02',
    status: 'accepted',
  },
];

export default function AdmissionsManagementPage() {
  const { user } = useAuth();
  const [admissions, setAdmissions] = useState<AdmissionApplication[]>(INITIAL_ADMISSIONS);
  const [search, setSearch] = useState('');
  const [stageFilter, setStageFilter] = useState('all');

  // Modal State for Schedule Interview
  const [selectedAdm, setSelectedAdm] = useState<AdmissionApplication | null>(null);
  const [interviewDateStr, setInterviewDateStr] = useState('2026-10-15 at 11:00 AM');

  const [webNotice, setWebNotice] = useState<string | null>(null);

  const handleStatusChange = (id: string, newStatus: AdmissionApplication['status']) => {
    setAdmissions(prev => prev.map(a => {
      if (a.id === id) {
        const updated = { ...a, status: newStatus };
        if (newStatus === 'accepted') {
          registerNewStudent({
            name: a.studentName,
            stage: a.stage === 'Preparatory' ? 'Preparatory' : 'Primary',
            grade: a.desiredGrade,
            gender: 'male',
            parentName: a.parentName,
            parentPhone: a.parentPhone,
            parentEmail: a.parentEmail,
          });
          setWebNotice(`✅ Web Notice: Admission for ${a.studentName} APPROVED! Student automatically added to active school roster into ${a.desiredGrade}.`);
          setTimeout(() => setWebNotice(null), 5000);
        }
        return updated;
      }
      return a;
    }));
  };

  const handleEnrollStudent = (adm: AdmissionApplication) => {
    handleStatusChange(adm.id, 'enrolled');
    registerNewStudent({
      name: adm.studentName,
      stage: adm.stage === 'Preparatory' ? 'Preparatory' : 'Primary',
      grade: adm.desiredGrade,
      gender: 'male',
      parentName: adm.parentName,
      parentPhone: adm.parentPhone,
      parentEmail: adm.parentEmail,
    });
    setWebNotice(`✅ Web Notice: Applicant ${adm.studentName} has been officially enrolled into ${adm.desiredGrade}! Registered into Active Student Roster.`);
    setTimeout(() => setWebNotice(null), 5000);
  };

  // Smart Search
  const filtered = admissions.filter(a => {
    const matchesStage = stageFilter === 'all' || a.stage === stageFilter;
    const q = search.toLowerCase().trim();
    if (!q) return matchesStage;

    const matchesName = a.studentName.toLowerCase().includes(q);
    const matchesCode = a.applicantCode.toLowerCase().includes(q);
    const matchesParent = a.parentName.toLowerCase().includes(q);
    const matchesGrade = a.desiredGrade.toLowerCase().includes(q);

    return matchesStage && (matchesName || matchesCode || matchesParent || matchesGrade);
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
            <UserPlus2 className="w-7 h-7 text-blue-700" />
            Admissions & Student Application Oversight
          </h1>
          <p className="text-slate-600 text-sm mt-1">
            Review online applications, schedule placement interviews, approve admissions, and enroll accepted applicants.
          </p>
        </div>

        <a
          href="/apply"
          target="_blank"
          className="bg-blue-700 hover:bg-blue-800 text-white font-bold px-4 py-2.5 rounded-lg shadow-sm text-sm text-center"
        >
          Open Public Admission Form ↗
        </a>
      </div>

      {/* Toolbar & Smart Search */}
      <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-sm flex flex-col md:flex-row items-center justify-between gap-4">
        <div className="relative w-full md:w-96">
          <Search className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
          <input
            type="text"
            placeholder="Smart Search applicant name, code, grade, parent..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-9 pr-8 py-2 bg-slate-50 border border-slate-200 rounded-lg text-xs text-slate-800 focus:outline-none focus:ring-2 focus:ring-blue-600"
          />
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={() => setStageFilter('all')}
            className={`px-3 py-1.5 rounded-lg text-xs font-bold ${stageFilter === 'all' ? 'bg-blue-700 text-white' : 'bg-slate-100 text-slate-700'}`}
          >
            All Stages ({admissions.length})
          </button>
          <button
            onClick={() => setStageFilter('Primary')}
            className={`px-3 py-1.5 rounded-lg text-xs font-bold ${stageFilter === 'Primary' ? 'bg-blue-700 text-white' : 'bg-slate-100 text-slate-700'}`}
          >
            Primary Applicants
          </button>
          <button
            onClick={() => setStageFilter('Preparatory')}
            className={`px-3 py-1.5 rounded-lg text-xs font-bold ${stageFilter === 'Preparatory' ? 'bg-blue-700 text-white' : 'bg-slate-100 text-slate-700'}`}
          >
            Preparatory Applicants
          </button>
        </div>
      </div>

      {/* Applications Table */}
      <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
        <table className="w-full text-left text-xs">
          <thead className="bg-slate-900 text-white font-bold uppercase text-[11px] tracking-wider">
            <tr>
              <th className="p-4">Ref Code & Applicant</th>
              <th className="p-4">Desired Grade</th>
              <th className="p-4">Parent / Guardian</th>
              <th className="p-4">Submission Date</th>
              <th className="p-4">Current Status</th>
              <th className="p-4 text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100 font-medium text-slate-800">
            {filtered.map(adm => (
              <tr key={adm.id} className="hover:bg-slate-50">
                <td className="p-4">
                  <div className="font-bold text-slate-900 text-sm">{adm.studentName}</div>
                  <div className="font-mono text-blue-800 text-xs font-bold">{adm.applicantCode}</div>
                </td>
                <td className="p-4 font-bold text-blue-900">{adm.desiredGrade} ({adm.stage})</td>
                <td className="p-4">
                  <div>{adm.parentName}</div>
                  <div className="text-slate-400 font-mono text-[11px]">{adm.parentEmail}</div>
                </td>
                <td className="p-4 font-mono text-slate-500">{adm.submittedDate}</td>
                <td className="p-4">
                  <span className={`px-2.5 py-1 rounded-full font-bold text-[11px] ${
                    adm.status === 'enrolled' ? 'bg-purple-100 text-purple-900 border border-purple-200' :
                    adm.status === 'accepted' ? 'bg-emerald-100 text-emerald-800 border border-emerald-200' :
                    adm.status === 'interview_scheduled' ? 'bg-blue-100 text-blue-800 border border-blue-200' :
                    adm.status === 'rejected' ? 'bg-rose-100 text-rose-800 border border-rose-200' :
                    'bg-amber-100 text-amber-800 border border-amber-200'
                  }`}>
                    {adm.status.replace(/_/g, ' ').toUpperCase()}
                  </span>
                  {adm.interviewDate && (
                    <div className="text-[10px] text-blue-700 font-mono mt-1 font-semibold">
                      📅 {adm.interviewDate}
                    </div>
                  )}
                </td>
                <td className="p-4 text-right space-x-1">
                  {adm.status === 'submitted' && (
                    <button
                      onClick={() => {
                        setSelectedAdm(adm);
                      }}
                      className="bg-blue-50 text-blue-700 hover:bg-blue-100 font-bold px-2.5 py-1.5 rounded-lg border border-blue-200"
                    >
                      Schedule Interview
                    </button>
                  )}
                  {adm.status === 'interview_scheduled' && (
                    <button
                      onClick={() => handleStatusChange(adm.id, 'accepted')}
                      className="bg-emerald-600 text-white hover:bg-emerald-700 font-bold px-2.5 py-1.5 rounded-lg"
                    >
                      Approve Admission
                    </button>
                  )}
                  {adm.status === 'accepted' && (
                    <button
                      onClick={() => handleEnrollStudent(adm)}
                      className="bg-purple-700 text-white hover:bg-purple-800 font-bold px-3 py-1.5 rounded-lg flex items-center gap-1 inline-flex"
                    >
                      <UserCheck className="w-3.5 h-3.5" /> Enroll Student
                    </button>
                  )}
                  {adm.status === 'enrolled' && (
                    <span className="text-emerald-700 font-bold text-xs">Student Enrolled ✓</span>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Modal: Schedule Interview */}
      {selectedAdm && (
        <div className="fixed inset-0 bg-slate-900/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-md w-full p-6 shadow-2xl space-y-4">
            <h3 className="font-bold text-lg text-slate-900 font-heading">Schedule Assessment Interview</h3>
            <p className="text-xs text-slate-600">Applicant: <strong>{selectedAdm.studentName}</strong> ({selectedAdm.desiredGrade})</p>

            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">Interview Date & Time</label>
              <input
                type="text"
                value={interviewDateStr}
                onChange={(e) => setInterviewDateStr(e.target.value)}
                className="w-full bg-slate-50 border border-slate-200 rounded-lg p-2.5 text-xs font-mono"
              />
            </div>

            <div className="flex justify-end gap-2 pt-2 border-t border-slate-100">
              <button onClick={() => setSelectedAdm(null)} className="text-xs text-slate-600 font-semibold px-4 py-2">Cancel</button>
              <button
                onClick={() => {
                  setAdmissions(prev => prev.map(a => a.id === selectedAdm.id ? { ...a, status: 'interview_scheduled', interviewDate: interviewDateStr } : a));
                  setSelectedAdm(null);
                }}
                className="bg-blue-700 text-white text-xs font-bold px-4 py-2 rounded-lg"
              >
                Confirm Schedule & Email Parent
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
