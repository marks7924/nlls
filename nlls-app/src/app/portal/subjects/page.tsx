'use client';

import { useState } from 'react';
import { BookOpen, Search, Plus, Award } from 'lucide-react';

interface Subject {
  id: string;
  name: string;
  code: string;
  stages: string[];
  passMark: number;
  totalMark: number;
}

const DEMO_SUBJECTS: Subject[] = [
  { id: '1', name: 'English Language & Literature', code: 'ENG-01', stages: ['Early Years', 'Primary', 'Preparatory'], passMark: 50, totalMark: 100 },
  { id: '2', name: 'Mathematics & Pre-Algebra', code: 'MTH-01', stages: ['Primary', 'Preparatory'], passMark: 50, totalMark: 100 },
  { id: '3', name: 'Science & Lab Experiments', code: 'SCI-01', stages: ['Primary', 'Preparatory'], passMark: 50, totalMark: 100 },
  { id: '4', name: 'Arabic Language & Heritage', code: 'ARB-01', stages: ['Early Years', 'Primary', 'Preparatory'], passMark: 50, totalMark: 100 },
  { id: '5', name: 'French Second Language', code: 'FRN-01', stages: ['Primary', 'Preparatory'], passMark: 50, totalMark: 100 },
  { id: '6', name: 'Computer Science & ICT', code: 'ICT-01', stages: ['Primary', 'Preparatory'], passMark: 50, totalMark: 100 },
];

export default function SubjectsPage() {
  const [search, setSearch] = useState('');
  const [webNotice, setWebNotice] = useState<string | null>(null);

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
            <BookOpen className="w-7 h-7 text-blue-700" />
            Curriculum & Subject Catalog
          </h1>
          <p className="text-slate-600 text-sm mt-1">
            Manage subjects, academic grading weights, pass marks, and stage distributions.
          </p>
        </div>

        <button
          onClick={() => {
            setWebNotice('✅ Web Notice: Subject curriculum setup modal activated.');
            setTimeout(() => setWebNotice(null), 4000);
          }}
          className="flex items-center justify-center gap-2 bg-blue-700 hover:bg-blue-800 text-white font-medium px-4 py-2.5 rounded-lg shadow-sm transition-colors text-sm"
        >
          <Plus className="w-4 h-4" /> Add Subject
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {DEMO_SUBJECTS.map(s => (
          <div key={s.id} className="bg-white rounded-xl border border-slate-200 shadow-sm p-5 space-y-3">
            <div className="flex items-start justify-between">
              <div>
                <span className="font-mono text-xs font-semibold text-blue-900 bg-blue-50 px-2 py-0.5 rounded border border-blue-200">
                  {s.code}
                </span>
                <h3 className="font-bold text-slate-900 text-base font-heading mt-2">{s.name}</h3>
              </div>
            </div>

            <div className="flex flex-wrap gap-1 pt-1">
              {s.stages.map(st => (
                <span key={st} className="bg-slate-100 text-slate-700 text-[11px] font-medium px-2 py-0.5 rounded">
                  {st}
                </span>
              ))}
            </div>

            <div className="pt-2 border-t border-slate-100 grid grid-cols-2 gap-2 text-xs">
              <div>
                <span className="text-slate-500 text-[11px] block">Pass Mark</span>
                <span className="font-semibold text-emerald-700">{s.passMark} / {s.totalMark} Marks</span>
              </div>
              <div>
                <span className="text-slate-500 text-[11px] block">Grading Weight</span>
                <span className="font-semibold text-slate-900">Standard 100%</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
