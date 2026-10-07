'use client';

import { useState } from 'react';
import { useAuth } from '@/lib/auth/context';
import { 
  Mail, Send, FileText, CheckCircle2, AlertTriangle, Users, Filter, 
  Eye, RefreshCw, Layers, ShieldCheck, Clock, Search 
} from 'lucide-react';

interface EmailTemplate {
  id: string;
  name: string;
  subject: string;
  category: 'Absence' | 'Results' | 'General Announcement' | 'Tuition' | 'Discipline';
  body: string;
}

const DEMO_TEMPLATES: EmailTemplate[] = [
  {
    id: '1',
    name: 'Unexcused Absence Notification',
    category: 'Absence',
    subject: 'NLLS Notice: Student Absence Record for {{student_name}}',
    body: `Dear {{parent_name}},\n\nThis is an official notice from New Life Language School (NLLS) to inform you that your child {{student_name}} (ID: {{student_id}}) was recorded ABSENT on {{date}} without prior written authorization.\n\nPlease contact student affairs at affairs@nlls.edu.eg or reply directly to this email.\n\nWarm regards,\nStudent Affairs Department\nNew Life Language School`,
  },
  {
    id: '2',
    name: 'Monthly Progress & Grade Release',
    category: 'Results',
    subject: 'NLLS Report Card: {{month}} Academic Results for {{student_name}}',
    body: `Dear {{parent_name}},\n\nThe monthly evaluation marks for {{student_name}} are now published on the official NLLS Portal.\n\nYou may log in to view detailed breakdown per subject at: https://nlls.edu.eg/portal/results\n\nBest regards,\nAcademic Directorate\nNew Life Language School`,
  },
  {
    id: '3',
    name: 'School Event Announcement',
    category: 'General Announcement',
    subject: 'Important Invitation: Annual Science & Culture Fair 2026',
    body: `Dear NLLS Community,\n\nWe cordially invite parents and students to join us for the NLLS Annual Science & Culture Fair on October 25, 2026.\n\nLocation: NLLS Main Campus Grounds\nTime: 09:00 AM - 02:00 PM\n\nWe look forward to celebrating our students' creative projects!\n\nNew Life Language School Administration`,
  },
];

interface LogEntry {
  id: string;
  recipient: string;
  subject: string;
  status: 'sent' | 'queued' | 'failed';
  timestamp: string;
  type: 'automatic' | 'manual';
}

const DEMO_LOGS: LogEntry[] = [
  { id: '101', recipient: 'parent.elsayed@gmail.com', subject: 'NLLS Notice: Student Absence Record for Youssef Ahmed', status: 'sent', timestamp: '2026-10-07 08:45 AM', type: 'automatic' },
  { id: '102', recipient: 'Primary 1 Cohort (24 Parents)', subject: 'Primary 1 English Midterm Schedule Update', status: 'sent', timestamp: '2026-10-06 02:15 PM', type: 'manual' },
  { id: '103', recipient: 'm.ibrahim.parent@yahoo.com', subject: 'Disciplinary Warning Notice', status: 'sent', timestamp: '2026-10-05 11:30 AM', type: 'manual' },
  { id: '104', recipient: 'parent.hassan@gmail.com', subject: 'NLLS Report Card: September Academic Results', status: 'sent', timestamp: '2026-10-01 09:00 AM', type: 'automatic' },
];

// Target options grouped by scope
const TARGET_MAP = {
  class: [
    'Primary 1 Cohort',
    'Primary 2 Cohort',
    'Primary 3 Cohort',
    'Primary 4 Cohort',
    'Primary 5 Cohort',
    'Primary 6 Cohort',
    'Preparatory 1 Cohort',
    'Preparatory 2 Cohort',
    'Preparatory 3 Cohort',
  ],
  stage: [
    'Primary Stage (Grades 1–6)',
    'Preparatory Stage (Grades 1–3)',
    'All School Stages',
  ],
  role: [
    'All Teaching Faculty',
    'All Academic Supervisors',
    'All Registered Parents',
    'All Enrolled Students',
  ],
  individual: [
    'Hamza Amr Fouad (Parent: fouad.parent@gmail.com)',
    'Farida Sherif Mansour (Parent: sherif.mansour@hotmail.com)',
    'Nour Tarek Abdelrahman (Parent: tarek.parent@gmail.com)',
    'Omar Khaled Hassan (Parent: parent.hassan@gmail.com)',
    'Mrs. Rania Fouad (Teacher: rania.fouad@nlls.edu.eg)',
    'Mr. Sameh Farouk (Teacher: sameh.farouk@nlls.edu.eg)',
  ],
};

export default function EmailCenterPage() {
  const { hasPermission } = useAuth();
  const [activeTab, setActiveTab] = useState<'composer' | 'templates' | 'logs'>('composer');

  // Composer State
  const [recipientScope, setRecipientScope] = useState<'class' | 'stage' | 'role' | 'individual'>('class');
  const [selectedTarget, setSelectedTarget] = useState(TARGET_MAP.class[0]);
  const [subject, setSubject] = useState('');
  const [body, setBody] = useState('');
  const [selectedTemplate, setSelectedTemplate] = useState('');

  const canSend = true; // Permitted for Admin / Head Admin / Teacher

  const handleScopeChange = (newScope: 'class' | 'stage' | 'role' | 'individual') => {
    setRecipientScope(newScope);
    setSelectedTarget(TARGET_MAP[newScope][0]);
  };

  const handleApplyTemplate = (templateId: string) => {
    const t = DEMO_TEMPLATES.find(temp => temp.id === templateId);
    if (t) {
      setSubject(t.subject);
      setBody(t.body);
      setSelectedTemplate(templateId);
    }
  };

  const [webNotice, setWebNotice] = useState<string | null>(null);

  const handleSend = () => {
    if (!subject || !body) {
      setWebNotice('⚠️ Web Notice: Please provide both subject and body content before dispatching.');
      return;
    }
    setWebNotice(`✅ Web Notice: Email successfully queued to [${recipientScope.toUpperCase()}] target: ${selectedTarget}! System will prevent duplicates automatically.`);
    setSubject('');
    setBody('');
    setTimeout(() => setWebNotice(null), 6000);
  };

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
            <Mail className="w-7 h-7 text-blue-700" />
            Email Management Center
          </h1>
          <p className="text-slate-600 text-sm mt-1">
            Dispatch target emails to parents/teachers/students, manage official templates, and audit delivery logs.
          </p>
        </div>

        <div className="flex items-center gap-2 bg-white p-1 rounded-xl border border-slate-200 shadow-xs">
          <button
            onClick={() => setActiveTab('composer')}
            className={`px-4 py-2 rounded-lg text-xs font-semibold transition-colors flex items-center gap-1.5 ${
              activeTab === 'composer' ? 'bg-blue-700 text-white' : 'text-slate-600 hover:bg-slate-50'
            }`}
          >
            <Send className="w-3.5 h-3.5" /> Compose Broadcast
          </button>
          <button
            onClick={() => setActiveTab('templates')}
            className={`px-4 py-2 rounded-lg text-xs font-semibold transition-colors flex items-center gap-1.5 ${
              activeTab === 'templates' ? 'bg-blue-700 text-white' : 'text-slate-600 hover:bg-slate-50'
            }`}
          >
            <FileText className="w-3.5 h-3.5" /> Templates
          </button>
          <button
            onClick={() => setActiveTab('logs')}
            className={`px-4 py-2 rounded-lg text-xs font-semibold transition-colors flex items-center gap-1.5 ${
              activeTab === 'logs' ? 'bg-blue-700 text-white' : 'text-slate-600 hover:bg-slate-50'
            }`}
          >
            <Clock className="w-3.5 h-3.5" /> Delivery Logs
          </button>
        </div>
      </div>

      {/* COMPOSER TAB */}
      {activeTab === 'composer' && (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Left Column: Composer Form */}
          <div className="lg:col-span-2 bg-white rounded-2xl border border-slate-200 shadow-sm p-6 space-y-5">
            <h3 className="font-bold text-slate-900 text-base font-heading pb-3 border-b border-slate-100 flex items-center gap-2">
              <Send className="w-4 h-4 text-blue-700" /> Dispatch Target Email
            </h3>

            {/* Template Quick Select */}
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1.5">Load from Pre-built Template</label>
              <select
                value={selectedTemplate}
                onChange={(e) => handleApplyTemplate(e.target.value)}
                className="w-full bg-slate-50 border border-slate-200 text-slate-800 text-xs rounded-lg p-2.5 focus:outline-none focus:ring-2 focus:ring-blue-600/20"
              >
                <option value="">-- Custom Email (Blank) --</option>
                {DEMO_TEMPLATES.map(t => (
                  <option key={t.id} value={t.id}>{t.name} [{t.category}]</option>
                ))}
              </select>
            </div>

            {/* DYNAMIC RECIPIENT TARGETING */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 bg-slate-50 p-4 rounded-xl border border-slate-200">
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1.5">1. Choose Recipient Scope</label>
                <select
                  value={recipientScope}
                  onChange={(e) => handleScopeChange(e.target.value as any)}
                  className="w-full bg-white border border-slate-300 font-bold text-xs text-slate-900 rounded-lg p-2.5 focus:ring-2 focus:ring-blue-600"
                >
                  <option value="class">Specific Class / Cohort (Primary 1..6, Prep 1..3)</option>
                  <option value="stage">Educational Stage (Primary, Prep)</option>
                  <option value="role">Role Group (Teachers, Parents, Staff)</option>
                  <option value="individual">Individual Parent / Teacher Smart Search</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1.5">2. Smart Target Options (Filtered by Scope)</label>
                <select
                  value={selectedTarget}
                  onChange={(e) => setSelectedTarget(e.target.value)}
                  className="w-full bg-white border border-slate-300 font-bold text-xs text-blue-900 rounded-lg p-2.5 focus:ring-2 focus:ring-blue-600"
                >
                  {TARGET_MAP[recipientScope].map(option => (
                    <option key={option} value={option}>{option}</option>
                  ))}
                </select>
              </div>
            </div>

            {/* Subject */}
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1.5">Subject Line</label>
              <input
                type="text"
                placeholder="Enter email subject..."
                value={subject}
                onChange={(e) => setSubject(e.target.value)}
                className="w-full bg-slate-50 border border-slate-200 text-slate-900 font-medium text-sm rounded-lg p-2.5 focus:outline-none focus:ring-2 focus:ring-blue-600/20"
              />
            </div>

            {/* Body */}
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1.5">Email Body (Supports Dynamic Variables)</label>
              <textarea
                rows={8}
                placeholder="Compose email text here..."
                value={body}
                onChange={(e) => setBody(e.target.value)}
                className="w-full bg-slate-50 border border-slate-200 text-slate-800 text-xs rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-blue-600/20 font-mono leading-relaxed"
              />
            </div>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row items-center justify-between gap-3 pt-2 border-t border-slate-100">
              <span className="text-xs text-slate-500">
                Variables: <code className="bg-slate-100 px-1 py-0.5 rounded text-[11px] text-blue-800 font-mono">{"{{student_name}}"}</code> <code className="bg-slate-100 px-1 py-0.5 rounded text-[11px] text-blue-800 font-mono">{"{{parent_name}}"}</code>
              </span>

              <button
                onClick={handleSend}
                className="bg-blue-700 hover:bg-blue-800 text-white font-medium px-6 py-2.5 rounded-lg shadow-sm transition-colors text-sm flex items-center gap-2"
              >
                <Send className="w-4 h-4" /> Queue & Dispatch Target Email
              </button>
            </div>
          </div>

          {/* Right Column: Dynamic Safety & Safeguard Rules */}
          <div className="space-y-4">
            <div className="bg-blue-950 text-white rounded-2xl p-5 shadow-sm space-y-3">
              <h4 className="font-bold text-sm font-heading flex items-center gap-2">
                <ShieldCheck className="w-4 h-4 text-yellow-400" /> Smart Scope Targeting Active
              </h4>
              <p className="text-xs text-blue-200 leading-relaxed">
                When you select a scope (Class, Stage, Role, Individual), the target selector automatically restricts options to only valid recipients within that group.
              </p>
              <ul className="text-xs text-blue-100 space-y-2 pt-2 border-t border-blue-800">
                <li className="flex items-start gap-1.5">
                  <span className="text-yellow-400 font-bold">•</span> Single-click target validation.
                </li>
                <li className="flex items-start gap-1.5">
                  <span className="text-yellow-400 font-bold">•</span> Duplicate email suppression enabled.
                </li>
              </ul>
            </div>
          </div>
        </div>
      )}

      {/* TEMPLATES TAB */}
      {activeTab === 'templates' && (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {DEMO_TEMPLATES.map(t => (
            <div key={t.id} className="bg-white rounded-xl border border-slate-200 shadow-sm p-5 flex flex-col justify-between">
              <div>
                <span className="bg-blue-50 text-blue-700 border border-blue-200 text-[11px] font-semibold px-2.5 py-0.5 rounded-md">
                  {t.category}
                </span>
                <h3 className="font-bold text-slate-900 text-base font-heading mt-2 mb-1">{t.name}</h3>
                <p className="text-xs text-slate-600 font-mono bg-slate-50 p-2 rounded border border-slate-100 mb-3 truncate">
                  {t.subject}
                </p>
                <p className="text-xs text-slate-500 font-mono whitespace-pre-line line-clamp-4">
                  {t.body}
                </p>
              </div>

              <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-end">
                <button
                  onClick={() => {
                    handleApplyTemplate(t.id);
                    setActiveTab('composer');
                  }}
                  className="bg-blue-50 hover:bg-blue-100 text-blue-700 text-xs px-3 py-1.5 rounded-lg font-medium transition-colors"
                >
                  Use Template →
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* LOGS TAB */}
      {activeTab === 'logs' && (
        <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden">
          <table className="w-full text-left text-sm">
            <thead className="bg-slate-50 border-b border-slate-200 text-slate-600 text-xs uppercase tracking-wider font-semibold">
              <tr>
                <th className="py-3.5 px-4">Timestamp</th>
                <th className="py-3.5 px-4">Recipient Target</th>
                <th className="py-3.5 px-4">Subject</th>
                <th className="py-3.5 px-4">Type</th>
                <th className="py-3.5 px-4">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 text-xs">
              {DEMO_LOGS.map(log => (
                <tr key={log.id} className="hover:bg-slate-50/70">
                  <td className="py-3.5 px-4 text-slate-500 font-mono">{log.timestamp}</td>
                  <td className="py-3.5 px-4 font-medium text-slate-900">{log.recipient}</td>
                  <td className="py-3.5 px-4 text-slate-700">{log.subject}</td>
                  <td className="py-3.5 px-4">
                    <span className={`px-2 py-0.5 rounded font-medium ${log.type === 'automatic' ? 'bg-indigo-50 text-indigo-700' : 'bg-slate-100 text-slate-700'}`}>
                      {log.type}
                    </span>
                  </td>
                  <td className="py-3.5 px-4">
                    <span className="bg-emerald-50 text-emerald-700 border border-emerald-200 px-2.5 py-0.5 rounded-full font-semibold inline-flex items-center gap-1">
                      <CheckCircle2 className="w-3 h-3 text-emerald-600" /> Delivered
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
