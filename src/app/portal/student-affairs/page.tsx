'use client';

import { useState } from 'react';
import { ShieldAlert, Plus, Search, X, Mail, Lock, AlertTriangle, Send } from 'lucide-react';

interface Incident {
  id: string;
  studentName: string;
  studentId: string;
  grade: string;
  type: 'Behavioral' | 'Tardiness' | 'Uniform Violation' | 'Academic Disruption';
  severity: 'low' | 'medium' | 'high' | 'critical';
  date: string;
  actionOption: 'no_pe' | 'no_break' | 'parent_contact' | 'temp_suspension' | 'kicked_from_school';
  actionTaken: string;
  status: 'pending' | 'parent_notified' | 'resolved' | 'suspension_recommended' | 'expelled';
}

const ALL_STUDENTS_LIST = [
  { id: '101', name: 'Youssef Ahmed El-Sayed', studentId: 'NL-2026-00142', grade: 'Preparatory 1', parentEmail: 'parent.elsayed@gmail.com' },
  { id: '102', name: 'Mariam Mahmoud Ibrahim', studentId: 'NL-2026-00143', grade: 'Preparatory 2', parentEmail: 'm.ibrahim.parent@yahoo.com' },
  { id: '103', name: 'Omar Khaled Hassan', studentId: 'NL-2026-00144', grade: 'Primary 5', parentEmail: 'parent.hassan@gmail.com' },
  { id: '104', name: 'Nour Tarek Abdelrahman', studentId: 'NL-2026-00145', grade: 'Primary 4', parentEmail: 'tarek.parent@gmail.com' },
  { id: '105', name: 'Hamza Amr Fouad', studentId: 'NL-2026-00146', grade: 'Primary 1', parentEmail: 'fouad.parent@gmail.com' },
];

const INITIAL_INCIDENTS: Incident[] = [
  { id: 'INC-101', studentName: 'Omar Khaled Hassan', studentId: 'NL-2026-00144', grade: 'Primary 5', type: 'Behavioral', severity: 'medium', date: '2026-10-06', actionOption: 'parent_contact', actionTaken: 'Parent notified via email portal', status: 'parent_notified' },
  { id: 'INC-102', studentName: 'Nour Tarek Abdelrahman', studentId: 'NL-2026-00145', grade: 'Primary 4', type: 'Academic Disruption', severity: 'high', date: '2026-10-04', actionOption: 'temp_suspension', actionTaken: 'Formal 2-day suspension + parent notice', status: 'suspension_recommended' },
  { id: 'INC-103', studentName: 'Youssef Ahmed El-Sayed', studentId: 'NL-2026-00142', grade: 'Preparatory 1', type: 'Tardiness', severity: 'low', date: '2026-09-28', actionOption: 'no_break', actionTaken: 'Restricted from 1 break period', status: 'resolved' },
];

export default function StudentAffairsPage() {
  const [incidents, setIncidents] = useState<Incident[]>(INITIAL_INCIDENTS);
  const [search, setSearch] = useState('');
  const [showReportModal, setShowReportModal] = useState(false);

  // Smart Search for Student Name inside Modal
  const [studentQuery, setStudentQuery] = useState('');
  const [selectedStudentObj, setSelectedStudentObj] = useState<typeof ALL_STUDENTS_LIST[0] | null>(null);

  // Form State
  const [type, setType] = useState<'Behavioral' | 'Tardiness' | 'Uniform Violation' | 'Academic Disruption'>('Behavioral');
  const [severity, setSeverity] = useState<'low' | 'medium' | 'high' | 'critical'>('medium');
  const [actionOption, setActionOption] = useState<'no_pe' | 'no_break' | 'parent_contact' | 'temp_suspension' | 'kicked_from_school'>('no_break');
  const [actionNotes, setActionNotes] = useState('');

  // Sub-Modals for Parent Email & Head Admin Confirmation
  const [emailModalStudent, setEmailModalStudent] = useState<{ name: string; email: string; reason: string } | null>(null);
  const [showHeadAdminAuthModal, setShowHeadAdminAuthModal] = useState(false);
  const [headAdminPassword, setHeadAdminPassword] = useState('');
  const [authError, setAuthError] = useState('');

  const filteredStudents = ALL_STUDENTS_LIST.filter(s => 
    s.name.toLowerCase().includes(studentQuery.toLowerCase()) || 
    s.studentId.toLowerCase().includes(studentQuery.toLowerCase())
  );

  const handleSelectActionOption = (val: typeof actionOption) => {
    setActionOption(val);
    if (val === 'kicked_from_school') {
      setShowHeadAdminAuthModal(true);
    }
  };

  const handleHeadAdminAuthConfirm = (e: React.FormEvent) => {
    e.preventDefault();
    if (headAdminPassword === 'headadmin123' || headAdminPassword === 'ch222ch222') {
      setShowHeadAdminAuthModal(false);
      setAuthError('');
    } else {
      setAuthError('Invalid Head Admin Password');
    }
  };

  const handleCreateIncident = (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedStudentObj) {
      setAuthError('Please search and select a student from the type-ahead list.');
      return;
    }

    const actionTextMap = {
      no_pe: 'Restricted from PE Class',
      no_break: 'Restricted from Recess Break',
      parent_contact: 'Parent Contact Email Dispatched',
      temp_suspension: 'Temporary Suspension Logged & Parent Emailed',
      kicked_from_school: 'Permanently Expelled from NLLS (Head Admin Approved)',
    };

    const newInc: Incident = {
      id: `INC-${Date.now().toString().slice(-3)}`,
      studentName: selectedStudentObj.name,
      studentId: selectedStudentObj.studentId,
      grade: selectedStudentObj.grade,
      type,
      severity,
      date: '2026-10-07',
      actionOption,
      actionTaken: actionNotes || actionTextMap[actionOption],
      status: actionOption === 'kicked_from_school' ? 'expelled' : actionOption === 'temp_suspension' ? 'suspension_recommended' : 'parent_notified',
    };

    setIncidents(prev => [newInc, ...prev]);
    setShowReportModal(false);

    // If action requires parent email, open Email Portal popup automatically!
    if (actionOption === 'parent_contact' || actionOption === 'temp_suspension') {
      setEmailModalStudent({
        name: selectedStudentObj.name,
        email: selectedStudentObj.parentEmail,
        reason: actionOption === 'temp_suspension' ? 'Temporary Suspension Notice' : 'Parent Contact Incident Notice',
      });
    }

    // Reset Form
    setSelectedStudentObj(null);
    setStudentQuery('');
    setActionNotes('');
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-slate-900 font-heading flex items-center gap-2">
            <ShieldAlert className="w-7 h-7 text-blue-700" />
            Student Affairs & Disciplinary Records
          </h1>
          <p className="text-slate-600 text-sm mt-1">
            Track student incidents, assign disciplinary actions (No PE, No Break, Parent Email, Temp Suspension, Expulsion).
          </p>
        </div>

        <button
          onClick={() => setShowReportModal(true)}
          className="flex items-center justify-center gap-2 bg-blue-700 hover:bg-blue-800 text-white font-semibold px-4 py-2.5 rounded-lg shadow-sm transition-colors text-sm"
        >
          <Plus className="w-4 h-4" /> Report Student Incident
        </button>
      </div>

      {/* Smart Search */}
      <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-sm flex items-center gap-3">
        <Search className="w-4 h-4 text-slate-400" />
        <input
          type="text"
          placeholder="Smart Search incident records by student name, ID, or action..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full bg-transparent text-sm focus:outline-none text-slate-800 font-medium"
        />
      </div>

      {/* Incidents Table */}
      <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden">
        <table className="w-full text-left text-sm">
          <thead className="bg-slate-50 border-b border-slate-200 text-slate-600 text-xs uppercase tracking-wider font-semibold">
            <tr>
              <th className="py-3.5 px-4">Case ID</th>
              <th className="py-3.5 px-4">Student</th>
              <th className="py-3.5 px-4">Category</th>
              <th className="py-3.5 px-4">Severity</th>
              <th className="py-3.5 px-4">Action / Remediation</th>
              <th className="py-3.5 px-4">Status</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100 text-xs">
            {incidents.filter(i => i.studentName.toLowerCase().includes(search.toLowerCase()) || i.studentId.toLowerCase().includes(search.toLowerCase())).map(inc => (
              <tr key={inc.id} className="hover:bg-slate-50">
                <td className="py-3.5 px-4 font-mono font-bold text-blue-900">{inc.id}</td>
                <td className="py-3.5 px-4">
                  <div className="font-semibold text-slate-900">{inc.studentName}</div>
                  <div className="text-[11px] text-slate-500 font-mono">{inc.grade} · {inc.studentId}</div>
                </td>
                <td className="py-3.5 px-4 font-medium text-slate-700">{inc.type}</td>
                <td className="py-3.5 px-4">
                  <span className={`px-2 py-0.5 rounded font-semibold text-[11px] ${
                    inc.severity === 'critical' ? 'bg-purple-100 text-purple-900 font-bold' :
                    inc.severity === 'high' ? 'bg-rose-100 text-rose-800' : 'bg-amber-100 text-amber-800'
                  }`}>
                    {inc.severity.toUpperCase()}
                  </span>
                </td>
                <td className="py-3.5 px-4 text-slate-800 font-medium">{inc.actionTaken}</td>
                <td className="py-3.5 px-4">
                  {inc.status === 'expelled' && (
                    <span className="bg-purple-900 text-yellow-300 px-2 py-0.5 rounded font-bold">
                      Expelled from School
                    </span>
                  )}
                  {inc.status === 'suspension_recommended' && (
                    <span className="bg-rose-50 text-rose-700 border border-rose-200 px-2 py-0.5 rounded font-semibold">
                      Suspension Notice Sent
                    </span>
                  )}
                  {inc.status === 'parent_notified' && (
                    <span className="bg-blue-50 text-blue-700 border border-blue-200 px-2 py-0.5 rounded font-semibold">
                      Parent Contacted
                    </span>
                  )}
                  {inc.status === 'resolved' && (
                    <span className="bg-emerald-50 text-emerald-700 border border-emerald-200 px-2 py-0.5 rounded font-semibold">
                      Resolved
                    </span>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Report Incident Modal with Smart Student Search & Action Options */}
      {showReportModal && (
        <div className="fixed inset-0 bg-slate-900/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-lg w-full shadow-2xl overflow-hidden">
            <div className="bg-blue-900 text-white p-5 flex items-center justify-between">
              <h3 className="text-lg font-bold font-heading">Report Disciplinary Incident</h3>
              <button onClick={() => setShowReportModal(false)} className="text-blue-200 hover:text-white">
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleCreateIncident} className="p-6 space-y-4 text-xs">
              {/* SMART SEARCH FOR STUDENT NAME */}
              <div>
                <label className="block font-semibold text-slate-700 mb-1">Smart Search Student Name</label>
                {selectedStudentObj ? (
                  <div className="flex items-center justify-between bg-blue-50 border border-blue-200 p-2.5 rounded-lg text-xs font-semibold text-blue-900">
                    <span>{selectedStudentObj.name} ({selectedStudentObj.studentId} · {selectedStudentObj.grade})</span>
                    <button type="button" onClick={() => setSelectedStudentObj(null)} className="text-blue-600 font-bold hover:text-blue-800">Change</button>
                  </div>
                ) : (
                  <div className="relative">
                    <input
                      type="text"
                      placeholder="Type student name to search..."
                      value={studentQuery}
                      onChange={(e) => setStudentQuery(e.target.value)}
                      className="w-full bg-slate-50 border border-slate-200 rounded-lg p-2.5 font-semibold text-slate-900"
                    />
                    {studentQuery && (
                      <div className="absolute top-full left-0 right-0 bg-white border border-slate-200 rounded-lg shadow-lg z-10 max-h-40 overflow-y-auto mt-1">
                        {filteredStudents.map(st => (
                          <div
                            key={st.id}
                            onClick={() => {
                              setSelectedStudentObj(st);
                              setStudentQuery('');
                            }}
                            className="p-2.5 hover:bg-blue-50 cursor-pointer flex justify-between border-b border-slate-100"
                          >
                            <span className="font-semibold text-slate-900">{st.name}</span>
                            <span className="text-slate-500 font-mono">{st.grade}</span>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                )}
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-semibold text-slate-700 mb-1">Incident Category</label>
                  <select value={type} onChange={(e) => setType(e.target.value as any)} className="w-full bg-slate-50 border border-slate-200 rounded-lg p-2.5">
                    <option value="Behavioral">Behavioral</option>
                    <option value="Tardiness">Tardiness</option>
                    <option value="Uniform Violation">Uniform Violation</option>
                    <option value="Academic Disruption">Academic Disruption</option>
                  </select>
                </div>

                <div>
                  <label className="block font-semibold text-slate-700 mb-1">Severity</label>
                  <select value={severity} onChange={(e) => setSeverity(e.target.value as any)} className="w-full bg-slate-50 border border-slate-200 rounded-lg p-2.5">
                    <option value="low">Low</option>
                    <option value="medium">Medium</option>
                    <option value="high">High</option>
                    <option value="critical">Critical</option>
                  </select>
                </div>
              </div>

              {/* ACTION / STATUS OPTIONS */}
              <div>
                <label className="block font-semibold text-slate-700 mb-1">Disciplinary Action / Status</label>
                <select
                  value={actionOption}
                  onChange={(e) => handleSelectActionOption(e.target.value as any)}
                  className="w-full bg-slate-50 border border-slate-200 rounded-lg p-2.5 font-bold text-slate-900"
                >
                  <option value="no_pe">🚫 No PE Class</option>
                  <option value="no_break">🚫 No Recess Break</option>
                  <option value="parent_contact">📧 Parent Contact (Auto-opens Parent Email Portal)</option>
                  <option value="temp_suspension">⚠️ Temporary Suspension (Auto-opens Suspension Email)</option>
                  <option value="kicked_from_school">🚨 Kicked / Expelled from School (Requires Head Admin Password)</option>
                </select>
              </div>

              <div>
                <label className="block font-semibold text-slate-700 mb-1">Additional Remediation Notes</label>
                <textarea
                  rows={2}
                  placeholder="Enter details..."
                  value={actionNotes}
                  onChange={(e) => setActionNotes(e.target.value)}
                  className="w-full bg-slate-50 border border-slate-200 rounded-lg p-2.5"
                />
              </div>

              <div className="pt-3 flex justify-end gap-2 border-t border-slate-100">
                <button type="button" onClick={() => setShowReportModal(false)} className="px-4 py-2 text-slate-600 font-semibold">
                  Cancel
                </button>
                <button type="submit" className="bg-blue-700 hover:bg-blue-800 text-white font-semibold px-5 py-2 rounded-lg">
                  Submit Disciplinary Record
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Head Admin Password Confirmation Modal for Expulsion */}
      {showHeadAdminAuthModal && (
        <div className="fixed inset-0 bg-slate-900/70 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-sm w-full p-6 shadow-2xl space-y-4">
            <div className="flex items-center gap-2 text-rose-700">
              <Lock className="w-6 h-6" />
              <h3 className="font-bold text-base font-heading">Head Admin Authorization Required</h3>
            </div>
            <p className="text-xs text-slate-600">
              Expelling a student requires Head Administrator password verification.
            </p>

            <form onSubmit={handleHeadAdminAuthConfirm} className="space-y-3">
              <input
                type="password"
                required
                placeholder="Enter Head Admin password (e.g. headadmin123)..."
                value={headAdminPassword}
                onChange={(e) => setHeadAdminPassword(e.target.value)}
                className="w-full bg-slate-50 border border-slate-300 rounded-lg p-2.5 text-xs font-mono"
              />
              {authError && <p className="text-xs text-rose-600 font-bold">{authError}</p>}

              <div className="flex justify-end gap-2 pt-2">
                <button type="button" onClick={() => setShowHeadAdminAuthModal(false)} className="text-xs text-slate-600">Cancel</button>
                <button type="submit" className="bg-rose-700 text-white text-xs font-bold px-4 py-2 rounded-lg">
                  Confirm Expulsion
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Parent Email Portal Modal triggered automatically */}
      {emailModalStudent && (
        <div className="fixed inset-0 bg-slate-900/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-md w-full shadow-2xl overflow-hidden">
            <div className="bg-blue-900 text-white p-5 flex items-center justify-between">
              <h3 className="text-base font-bold font-heading flex items-center gap-2">
                <Mail className="w-5 h-5 text-yellow-400" /> Automated Parent Email Portal
              </h3>
              <button onClick={() => setEmailModalStudent(null)} className="text-blue-200 hover:text-white">
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="p-6 space-y-3 text-xs">
              <div className="bg-blue-50 p-3 rounded-lg border border-blue-100">
                <div className="text-slate-500">Recipient Parent Email:</div>
                <div className="font-mono font-bold text-blue-900">{emailModalStudent.email}</div>
                <div className="text-slate-500 mt-1">Regarding Student: <strong>{emailModalStudent.name}</strong></div>
              </div>

              <div>
                <label className="block font-semibold text-slate-700 mb-1">Subject</label>
                <input
                  type="text"
                  readOnly
                  value={`NLLS Official Notice: ${emailModalStudent.reason} for ${emailModalStudent.name}`}
                  className="w-full bg-slate-100 border border-slate-200 rounded p-2 text-xs font-semibold text-slate-800"
                />
              </div>

              <div>
                <label className="block font-semibold text-slate-700 mb-1">Email Body Content</label>
                <textarea
                  rows={4}
                  readOnly
                  value={`Dear Parent,\n\nThis is an official communication regarding your child ${emailModalStudent.name}.\nDisciplinary Action Logged: ${emailModalStudent.reason}.\n\nPlease contact Student Affairs at affairs@nlls.edu.eg.`}
                  className="w-full bg-slate-50 border border-slate-200 rounded p-2 text-xs font-mono text-slate-700"
                />
              </div>

              <div className="pt-2 flex justify-end gap-2">
                <button
                  onClick={() => {
                    setEmailModalStudent(null);
                  }}
                  className="bg-blue-700 text-white text-xs font-bold px-5 py-2 rounded-lg flex items-center gap-1.5"
                >
                  <Send className="w-3.5 h-3.5" /> Dispatch Email Now
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
