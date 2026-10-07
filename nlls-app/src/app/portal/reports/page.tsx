'use client';

import { useState } from 'react';
import { BarChart3, Download, FileSpreadsheet, Calendar, Search, Filter } from 'lucide-react';

export default function ReportsManagementPage() {
  const [selectedReportType, setSelectedReportType] = useState('Academic Performance Breakdown');
  const [webNotice, setWebNotice] = useState<string | null>(null);

  const reportPresets = [
    { title: 'Academic Performance Breakdown', description: 'Comprehensive subject mark statistics for Primary 1..6 & Preparatory 1..3.', format: 'PDF / Excel' },
    { title: 'Attendance Audit Log', description: 'Monthly student presence, absence, and tardiness summaries.', format: 'PDF / Excel' },
    { title: 'Disciplinary Incident Digest', description: 'Incident reports, parent notifications, suspensions, and expulsion logs.', format: 'PDF' },
    { title: 'Teacher Workload & Class Roster Report', description: 'Teacher assignment metrics, period counts, and homeroom breakdown.', format: 'Excel' },
  ];

  const handleExport = (title: string, format: string) => {
    setWebNotice(`✅ Web Notice: Exporting ${title} in ${format} format... Download queued.`);
    setTimeout(() => setWebNotice(null), 5000);
  };

  return (
    <div className="space-y-6">
      {webNotice && (
        <div className="bg-emerald-900 text-white p-4 rounded-2xl flex items-center justify-between shadow-lg font-mono text-xs border border-emerald-700">
          <span>{webNotice}</span>
          <button onClick={() => setWebNotice(null)} className="font-bold text-emerald-200">Dismiss</button>
        </div>
      )}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-slate-900 font-heading flex items-center gap-2">
            <BarChart3 className="w-7 h-7 text-blue-700" />
            Executive Reports & Analytics Exporter
          </h1>
          <p className="text-slate-600 text-sm mt-1">
            Generate, view, and export institutional performance reports for school leadership.
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        {reportPresets.map(r => (
          <div key={r.title} className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm space-y-4 hover:border-blue-400 transition-all flex flex-col justify-between">
            <div className="space-y-2">
              <span className="bg-blue-50 text-blue-800 text-[10px] font-bold px-2.5 py-0.5 rounded border border-blue-200 uppercase">{r.format}</span>
              <h3 className="font-bold text-slate-900 text-base font-heading">{r.title}</h3>
              <p className="text-xs text-slate-600">{r.description}</p>
            </div>

            <div className="pt-3 border-t border-slate-100 flex items-center justify-end gap-2">
              <button
                onClick={() => handleExport(r.title, 'Excel')}
                className="bg-emerald-50 hover:bg-emerald-100 text-emerald-800 text-xs font-bold px-3 py-2 rounded-lg flex items-center gap-1.5 border border-emerald-200"
              >
                <FileSpreadsheet className="w-3.5 h-3.5" /> Export Excel
              </button>
              <button
                onClick={() => handleExport(r.title, 'PDF')}
                className="bg-blue-700 hover:bg-blue-800 text-white text-xs font-bold px-4 py-2 rounded-lg flex items-center gap-1.5 shadow-sm"
              >
                <Download className="w-3.5 h-3.5" /> Export PDF
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
