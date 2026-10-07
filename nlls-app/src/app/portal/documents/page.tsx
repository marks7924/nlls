'use client';

import { useState } from 'react';
import { FileArchive, Download, Search, Plus, Eye, FileText } from 'lucide-react';

interface DocItem {
  id: string;
  name: string;
  category: 'Policy' | 'Curriculum' | 'Form' | 'Exam Spec';
  size: string;
  date: string;
  stage: string;
}

const INITIAL_DOCS: DocItem[] = [
  { id: '1', name: 'NLLS Student Handbook & Disciplinary Code 2026.pdf', category: 'Policy', size: '2.4 MB', date: '2026-09-01', stage: 'All Stages' },
  { id: '2', name: 'Primary English Curriculum Blueprint 2026-2027.pdf', category: 'Curriculum', size: '4.1 MB', date: '2026-09-10', stage: 'Primary (1–6)' },
  { id: '3', name: 'Preparatory Science Lab Safety Protocol & Guide.pdf', category: 'Exam Spec', size: '1.8 MB', date: '2026-09-15', stage: 'Preparatory (1–3)' },
  { id: '4', name: 'Student Leave & Absence Request Form.pdf', category: 'Form', size: '512 KB', date: '2026-09-05', stage: 'All Stages' },
];

export default function DocumentsManagementPage() {
  const [docs, setDocs] = useState<DocItem[]>(INITIAL_DOCS);
  const [search, setSearch] = useState('');
  const [webNotice, setWebNotice] = useState<string | null>(null);

  const filtered = docs.filter(d => {
    const q = search.toLowerCase().trim();
    if (!q) return true;
    return d.name.toLowerCase().includes(q) || d.category.toLowerCase().includes(q) || d.stage.toLowerCase().includes(q);
  });

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
            <FileArchive className="w-7 h-7 text-blue-700" />
            Institutional Document Library
          </h1>
          <p className="text-slate-600 text-sm mt-1">
            Access official school regulations, curriculum guidelines, exam specifications, and download parent forms.
          </p>
        </div>

        <button
          onClick={() => setWebNotice('✅ Web Notice: Document upload modal activated.')}
          className="flex items-center justify-center gap-2 bg-blue-700 hover:bg-blue-800 text-white font-semibold px-4 py-2.5 rounded-lg shadow-sm text-sm"
        >
          <Plus className="w-4 h-4" /> Upload Document
        </button>
      </div>

      {/* Smart Search */}
      <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-sm flex items-center gap-3">
        <Search className="w-4 h-4 text-slate-400" />
        <input
          type="text"
          placeholder="Smart Search documents by title, category, stage..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full bg-transparent text-sm focus:outline-none text-slate-800 font-medium"
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {filtered.map(d => (
          <div key={d.id} className="bg-white rounded-2xl border border-slate-200 p-5 shadow-sm space-y-3 flex items-center justify-between">
            <div className="flex items-center gap-3.5">
              <div className="p-3 bg-blue-50 text-blue-700 rounded-xl border border-blue-200">
                <FileText className="w-6 h-6" />
              </div>
              <div>
                <span className="text-[10px] font-bold bg-slate-100 text-slate-700 px-2 py-0.5 rounded uppercase">{d.category}</span>
                <h3 className="font-bold text-slate-900 text-sm mt-1">{d.name}</h3>
                <p className="text-xs text-slate-400 font-mono mt-0.5">{d.size} · {d.stage} · {d.date}</p>
              </div>
            </div>

            <button
              onClick={() => {
                setWebNotice(`✅ Web Notice: Downloading ${d.name}...`);
                setTimeout(() => setWebNotice(null), 4000);
              }}
              className="bg-blue-50 hover:bg-blue-100 text-blue-700 p-2.5 rounded-xl border border-blue-200"
            >
              <Download className="w-4 h-4" />
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
