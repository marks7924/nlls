'use client';

import { useState } from 'react';
import { CalendarDays, Plus, Search, MapPin, Clock, Users, X, CheckCircle2 } from 'lucide-react';

interface EventItem {
  id: string;
  title: string;
  date: string;
  time: string;
  location: string;
  targetAudience: 'All' | 'Primary' | 'Preparatory' | 'Parents Only' | 'Teachers Only';
  description: string;
  rsvpCount: number;
}

const INITIAL_EVENTS: EventItem[] = [
  {
    id: 'ev-1',
    title: 'Annual Science & Technology Innovation Fair 2026',
    date: '2026-10-25',
    time: '09:00 AM - 02:00 PM',
    location: 'NLLS Main Campus Courtyard',
    targetAudience: 'All',
    description: 'Interactive STEM projects, robotics showcases, and young scientist presentations.',
    rsvpCount: 180,
  },
  {
    id: 'ev-2',
    title: 'Primary Stage Parent-Teacher Conference',
    date: '2026-11-05',
    time: '01:00 PM - 05:00 PM',
    location: 'Auditorium Hall A',
    targetAudience: 'Primary',
    description: 'Individual parent consultation with primary stage homeroom and subject teachers.',
    rsvpCount: 95,
  },
  {
    id: 'ev-3',
    title: 'Preparatory French & English Spelling Bee Championship',
    date: '2026-11-12',
    time: '10:00 AM - 01:00 PM',
    location: 'Main Theater',
    targetAudience: 'Preparatory',
    description: 'Inter-class language competition for Preparatory 1..3 students.',
    rsvpCount: 60,
  },
];

export default function EventsManagementPage() {
  const [events, setEvents] = useState<EventItem[]>(INITIAL_EVENTS);
  const [search, setSearch] = useState('');
  const [showAddModal, setShowAddModal] = useState(false);

  // Form State
  const [title, setTitle] = useState('');
  const [date, setDate] = useState('2026-11-20');
  const [time, setTime] = useState('10:00 AM - 01:00 PM');
  const [location, setLocation] = useState('NLLS Main Auditorium');
  const [targetAudience, setTargetAudience] = useState<'All' | 'Primary' | 'Preparatory' | 'Parents Only' | 'Teachers Only'>('All');
  const [description, setDescription] = useState('');

  const handleCreateEvent = (e: React.FormEvent) => {
    e.preventDefault();
    const created: EventItem = {
      id: `ev-${Date.now()}`,
      title,
      date,
      time,
      location,
      targetAudience,
      description,
      rsvpCount: 0,
    };
    setEvents([created, ...events]);
    setShowAddModal(false);
    setTitle('');
    setDescription('');
  };

  const filtered = events.filter(e => {
    const q = search.toLowerCase().trim();
    if (!q) return true;
    return e.title.toLowerCase().includes(q) || e.location.toLowerCase().includes(q) || e.targetAudience.toLowerCase().includes(q);
  });

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-slate-900 font-heading flex items-center gap-2">
            <CalendarDays className="w-7 h-7 text-blue-700" />
            School Calendar & Event Management
          </h1>
          <p className="text-slate-600 text-sm mt-1">
            Organize academic conferences, science fairs, sports days, and institutional events.
          </p>
        </div>

        <button
          onClick={() => setShowAddModal(true)}
          className="flex items-center justify-center gap-2 bg-blue-700 hover:bg-blue-800 text-white font-semibold px-4 py-2.5 rounded-lg shadow-sm text-sm"
        >
          <Plus className="w-4 h-4" /> Publish New Event
        </button>
      </div>

      {/* Smart Search */}
      <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-sm flex items-center gap-3">
        <Search className="w-4 h-4 text-slate-400" />
        <input
          type="text"
          placeholder="Smart Search event title, location, audience..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full bg-transparent text-sm focus:outline-none text-slate-800 font-medium"
        />
      </div>

      {/* Events Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        {filtered.map(ev => (
          <div key={ev.id} className="bg-white rounded-2xl border border-slate-200 p-5 shadow-sm space-y-3 hover:shadow-md transition-all">
            <div className="flex items-start justify-between">
              <span className="bg-blue-50 text-blue-700 font-bold text-xs px-2.5 py-0.5 rounded border border-blue-200">
                {ev.targetAudience} Target
              </span>
              <span className="bg-slate-100 text-slate-700 font-mono text-[11px] font-bold px-2 py-0.5 rounded">
                RSVPs: {ev.rsvpCount}
              </span>
            </div>

            <h3 className="font-bold text-slate-900 text-base font-heading">{ev.title}</h3>

            <div className="text-xs text-slate-600 space-y-1.5 pt-2 border-t border-slate-100">
              <div className="flex items-center gap-2"><CalendarDays className="w-3.5 h-3.5 text-blue-600" /> <strong>{ev.date}</strong> ({ev.time})</div>
              <div className="flex items-center gap-2"><MapPin className="w-3.5 h-3.5 text-blue-600" /> {ev.location}</div>
            </div>

            <p className="text-xs text-slate-500 line-clamp-2 pt-1">{ev.description}</p>
          </div>
        ))}
      </div>

      {/* Add Event Modal */}
      {showAddModal && (
        <div className="fixed inset-0 bg-slate-900/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-md w-full shadow-2xl overflow-hidden">
            <div className="bg-blue-950 text-white p-5 flex items-center justify-between">
              <h3 className="text-lg font-bold font-heading">Publish School Event</h3>
              <button onClick={() => setShowAddModal(false)} className="text-blue-200 hover:text-white">
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleCreateEvent} className="p-6 space-y-4 text-xs">
              <div>
                <label className="block font-semibold text-slate-700 mb-1">Event Title</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Primary Art Exhibition"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  className="w-full bg-slate-50 border border-slate-200 rounded-lg p-2.5 font-bold text-slate-900"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-semibold text-slate-700 mb-1">Event Date</label>
                  <input
                    type="date"
                    value={date}
                    onChange={(e) => setDate(e.target.value)}
                    className="w-full bg-slate-50 border border-slate-200 rounded-lg p-2.5"
                  />
                </div>
                <div>
                  <label className="block font-semibold text-slate-700 mb-1">Target Audience</label>
                  <select
                    value={targetAudience}
                    onChange={(e) => setTargetAudience(e.target.value as any)}
                    className="w-full bg-slate-50 border border-slate-200 rounded-lg p-2.5 font-bold"
                  >
                    <option value="All">All School</option>
                    <option value="Primary">Primary Stage</option>
                    <option value="Preparatory">Preparatory Stage</option>
                    <option value="Parents Only">Parents Only</option>
                    <option value="Teachers Only">Teachers Only</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block font-semibold text-slate-700 mb-1">Venue Location</label>
                <input
                  type="text"
                  required
                  value={location}
                  onChange={(e) => setLocation(e.target.value)}
                  className="w-full bg-slate-50 border border-slate-200 rounded-lg p-2.5"
                />
              </div>

              <div>
                <label className="block font-semibold text-slate-700 mb-1">Description</label>
                <textarea
                  rows={3}
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  className="w-full bg-slate-50 border border-slate-200 rounded-lg p-2.5"
                />
              </div>

              <div className="pt-3 flex justify-end gap-2 border-t border-slate-100">
                <button type="button" onClick={() => setShowAddModal(false)} className="px-4 py-2 text-slate-600 font-semibold">
                  Cancel
                </button>
                <button type="submit" className="bg-blue-700 hover:bg-blue-800 text-white font-semibold px-5 py-2 rounded-lg flex items-center gap-1.5">
                  <CheckCircle2 className="w-4 h-4" /> Publish Event
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
