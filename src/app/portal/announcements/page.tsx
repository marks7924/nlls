'use client';

import { useState } from 'react';
import { Megaphone, Plus, Search, AlertCircle, Pin, Clock, X, CheckCircle2 } from 'lucide-react';

interface AnnouncementItem {
  id: string;
  title: string;
  priority: 'Urgent' | 'Notice' | 'General';
  target: string;
  publishedDate: string;
  content: string;
  isPinned: boolean;
}

const INITIAL_ANNOUNCEMENTS: AnnouncementItem[] = [
  {
    id: 'ann-1',
    title: 'IMPORTANT: Midterm Assessment Schedule Released',
    priority: 'Urgent',
    target: 'Primary & Preparatory Parents',
    publishedDate: '2026-10-07',
    content: 'Official timetable for weekly and monthly assessments is now available under the Exams module.',
    isPinned: true,
  },
  {
    id: 'ann-2',
    title: 'School Uniform Policy & Winter Transition',
    priority: 'Notice',
    target: 'All Students & Parents',
    publishedDate: '2026-10-04',
    content: 'Winter uniform dress code takes effect starting November 1st. Please inspect badges and guidelines.',
    isPinned: false,
  },
];

export default function AnnouncementsManagementPage() {
  const [announcements, setAnnouncements] = useState<AnnouncementItem[]>(INITIAL_ANNOUNCEMENTS);
  const [search, setSearch] = useState('');
  const [showAddModal, setShowAddModal] = useState(false);

  // Form State
  const [title, setTitle] = useState('');
  const [priority, setPriority] = useState<'Urgent' | 'Notice' | 'General'>('Notice');
  const [target, setTarget] = useState('All School');
  const [content, setContent] = useState('');
  const [isPinned, setIsPinned] = useState(false);

  const handleCreateAnnouncement = (e: React.FormEvent) => {
    e.preventDefault();
    const created: AnnouncementItem = {
      id: `ann-${Date.now()}`,
      title,
      priority,
      target,
      publishedDate: new Date().toISOString().split('T')[0],
      content,
      isPinned,
    };
    setAnnouncements([created, ...announcements]);
    setShowAddModal(false);
    setTitle('');
    setContent('');
  };

  const filtered = announcements.filter(a => {
    const q = search.toLowerCase().trim();
    if (!q) return true;
    return a.title.toLowerCase().includes(q) || a.content.toLowerCase().includes(q) || a.target.toLowerCase().includes(q);
  });

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-slate-900 font-heading flex items-center gap-2">
            <Megaphone className="w-7 h-7 text-blue-700" />
            Institutional Announcements & Alerts
          </h1>
          <p className="text-slate-600 text-sm mt-1">
            Broadcast emergency alerts, school notices, and pinned bulletins across portal dashboards.
          </p>
        </div>

        <button
          onClick={() => setShowAddModal(true)}
          className="flex items-center justify-center gap-2 bg-blue-700 hover:bg-blue-800 text-white font-semibold px-4 py-2.5 rounded-lg shadow-sm text-sm"
        >
          <Plus className="w-4 h-4" /> Create Announcement
        </button>
      </div>

      {/* Smart Search */}
      <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-sm flex items-center gap-3">
        <Search className="w-4 h-4 text-slate-400" />
        <input
          type="text"
          placeholder="Smart Search announcements..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full bg-transparent text-sm focus:outline-none text-slate-800 font-medium"
        />
      </div>

      {/* Announcements List */}
      <div className="space-y-4">
        {filtered.map(ann => (
          <div key={ann.id} className="bg-white rounded-2xl border border-slate-200 p-5 shadow-sm space-y-3 relative hover:border-blue-300 transition-all">
            <div className="flex items-start justify-between">
              <div className="flex items-center gap-2">
                {ann.isPinned && <Pin className="w-4 h-4 text-amber-500 fill-amber-500" />}
                <span className={`px-2.5 py-0.5 rounded font-bold text-xs ${
                  ann.priority === 'Urgent' ? 'bg-rose-100 text-rose-800' : 'bg-blue-100 text-blue-800'
                }`}>
                  {ann.priority}
                </span>
                <span className="text-xs text-slate-500 font-semibold">• Target: {ann.target}</span>
              </div>
              <span className="text-xs font-mono text-slate-400">{ann.publishedDate}</span>
            </div>

            <h3 className="font-bold text-slate-900 text-base font-heading">{ann.title}</h3>
            <p className="text-xs text-slate-700 leading-relaxed font-medium">{ann.content}</p>
          </div>
        ))}
      </div>

      {/* Modal */}
      {showAddModal && (
        <div className="fixed inset-0 bg-slate-900/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-md w-full shadow-2xl overflow-hidden">
            <div className="bg-blue-950 text-white p-5 flex items-center justify-between">
              <h3 className="text-lg font-bold font-heading">Post New Announcement</h3>
              <button onClick={() => setShowAddModal(false)} className="text-blue-200 hover:text-white">
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleCreateAnnouncement} className="p-6 space-y-4 text-xs">
              <div>
                <label className="block font-semibold text-slate-700 mb-1">Title</label>
                <input
                  type="text"
                  required
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  className="w-full bg-slate-50 border border-slate-200 rounded-lg p-2.5 font-bold text-slate-900"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-semibold text-slate-700 mb-1">Priority</label>
                  <select
                    value={priority}
                    onChange={(e) => setPriority(e.target.value as any)}
                    className="w-full bg-slate-50 border border-slate-200 rounded-lg p-2.5 font-bold"
                  >
                    <option value="Notice">Notice</option>
                    <option value="Urgent">Urgent</option>
                    <option value="General">General</option>
                  </select>
                </div>
                <div>
                  <label className="block font-semibold text-slate-700 mb-1">Target Role / Stage</label>
                  <select
                    value={target}
                    onChange={(e) => setTarget(e.target.value)}
                    className="w-full bg-slate-50 border border-slate-200 rounded-lg p-2.5 font-bold"
                  >
                    <option value="All School">All School</option>
                    <option value="Primary Parents">Primary Parents</option>
                    <option value="Preparatory Parents">Preparatory Parents</option>
                    <option value="Teachers Only">Teachers Only</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block font-semibold text-slate-700 mb-1">Announcement Content</label>
                <textarea
                  rows={4}
                  required
                  value={content}
                  onChange={(e) => setContent(e.target.value)}
                  className="w-full bg-slate-50 border border-slate-200 rounded-lg p-2.5"
                />
              </div>

              <div className="flex items-center gap-2">
                <input
                  type="checkbox"
                  id="pinCheck"
                  checked={isPinned}
                  onChange={(e) => setIsPinned(e.target.checked)}
                />
                <label htmlFor="pinCheck" className="font-semibold text-slate-700">Pin to top of all user dashboards</label>
              </div>

              <div className="pt-3 flex justify-end gap-2 border-t border-slate-100">
                <button type="button" onClick={() => setShowAddModal(false)} className="px-4 py-2 text-slate-600 font-semibold">
                  Cancel
                </button>
                <button type="submit" className="bg-blue-700 hover:bg-blue-800 text-white font-semibold px-5 py-2 rounded-lg flex items-center gap-1.5">
                  <CheckCircle2 className="w-4 h-4" /> Broadcast Announcement
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
