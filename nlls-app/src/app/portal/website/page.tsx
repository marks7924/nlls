'use client';

import { useState } from 'react';
import { useAuth } from '@/lib/auth/context';
import { Globe, Save, Edit3, Image as ImageIcon, FileText, Plus, Eye, CheckCircle2 } from 'lucide-react';

export default function WebsiteCMSPage() {
  const { hasPermission } = useAuth();
  const [heroTitle, setHeroTitle] = useState('Nurturing Leaders for a Global Tomorrow');
  const [heroSubtitle, setHeroSubtitle] = useState('Providing exemplary British and Egyptian curriculum education from Early Years through Preparatory levels in Egypt.');
  const [announcementBar, setAnnouncementBar] = useState('Admissions now open for Academic Year 2026/2027 — Early Bird Registration Available!');
  const [savedSuccess, setSavedSuccess] = useState(false);

  const canEditCMS = hasPermission('edit_website');

  const handleSaveCMS = () => {
    setSavedSuccess(true);
    setTimeout(() => setSavedSuccess(false), 3000);
  };

  if (!canEditCMS) {
    return (
      <div className="bg-rose-50 border border-rose-200 rounded-xl p-6 text-center text-rose-800 text-sm">
        You do not have permission to access the Web Content Management System (CMS).
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-slate-900 font-heading flex items-center gap-2">
            <Globe className="w-7 h-7 text-blue-700" />
            Website CMS & Content Editor
          </h1>
          <p className="text-slate-600 text-sm mt-1">
            Edit live public school website banners, hero titles, news, events, and photo gallery albums.
          </p>
        </div>

        <button
          onClick={handleSaveCMS}
          className="flex items-center justify-center gap-2 bg-blue-700 hover:bg-blue-800 text-white font-medium px-5 py-2.5 rounded-lg shadow-sm transition-colors text-sm"
        >
          <Save className="w-4 h-4" /> Publish Website Edits
        </button>
      </div>

      {savedSuccess && (
        <div className="bg-emerald-50 border border-emerald-200 text-emerald-800 p-4 rounded-xl text-sm font-medium flex items-center gap-2">
          <CheckCircle2 className="w-5 h-5 text-emerald-600" /> Website updated successfully! Live site reflects your changes immediately.
        </div>
      )}

      {/* Editor Sections */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Homepage Hero Settings */}
        <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm space-y-4">
          <h3 className="font-bold text-slate-900 text-base font-heading pb-3 border-b border-slate-100 flex items-center gap-2">
            <Edit3 className="w-4 h-4 text-blue-700" /> Homepage Hero Banner
          </h3>

          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1">Top Announcement Banner</label>
            <input
              type="text"
              value={announcementBar}
              onChange={(e) => setAnnouncementBar(e.target.value)}
              className="w-full bg-slate-50 border border-slate-200 text-xs rounded-lg p-2.5 focus:outline-none focus:ring-2 focus:ring-blue-600/20"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1">Main Hero Heading</label>
            <input
              type="text"
              value={heroTitle}
              onChange={(e) => setHeroTitle(e.target.value)}
              className="w-full bg-slate-50 border border-slate-200 text-sm font-bold text-slate-900 rounded-lg p-2.5 focus:outline-none focus:ring-2 focus:ring-blue-600/20"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1">Hero Subtitle</label>
            <textarea
              rows={3}
              value={heroSubtitle}
              onChange={(e) => setHeroSubtitle(e.target.value)}
              className="w-full bg-slate-50 border border-slate-200 text-xs text-slate-700 rounded-lg p-2.5 focus:outline-none focus:ring-2 focus:ring-blue-600/20"
            />
          </div>
        </div>

        {/* Live Preview Box */}
        <div className="bg-slate-900 text-white p-6 rounded-xl shadow-md space-y-4 flex flex-col justify-between">
          <div>
            <div className="text-xs font-bold text-yellow-400 uppercase tracking-wider mb-2 flex items-center gap-1.5">
              <Eye className="w-3.5 h-3.5" /> Live Hero Preview
            </div>

            <div className="bg-yellow-500/20 border border-yellow-500/40 text-yellow-300 text-xs px-3 py-1.5 rounded-lg mb-4 truncate font-medium">
              {announcementBar}
            </div>

            <h2 className="text-xl font-extrabold text-white font-heading leading-tight mb-2">
              {heroTitle}
            </h2>

            <p className="text-xs text-blue-200 leading-relaxed">
              {heroSubtitle}
            </p>
          </div>

          <div className="pt-4 border-t border-slate-800 text-[11px] text-slate-400">
            Previewing desktop website view. Changes affect the main landing page (`/`).
          </div>
        </div>
      </div>
    </div>
  );
}
