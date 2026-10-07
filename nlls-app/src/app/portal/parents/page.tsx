'use client';

import { useState } from 'react';
import { useAuth } from '@/lib/auth/context';
import { 
  Users, Search, Plus, Mail, Phone, MapPin, UserPlus, GraduationCap, X, CheckCircle2 
} from 'lucide-react';

interface ParentRecord {
  id: string;
  name: string;
  email: string;
  phone: string;
  address: string;
  children: { name: string; class: string; studentId: string }[];
  primaryContact: boolean;
}

const INITIAL_PARENTS: ParentRecord[] = [
  {
    id: 'p-1',
    name: 'Mr. Amr Fouad',
    email: 'fouad.parent@gmail.com',
    phone: '+20 101 222 3344',
    address: '90th Street, 5th Settlement, New Cairo',
    children: [{ name: 'Hamza Amr Fouad', class: 'Primary 1', studentId: 'NL-2026-00146' }],
    primaryContact: true,
  },
  {
    id: 'p-2',
    name: 'Eng. Sherif Mansour',
    email: 'sherif.mansour@hotmail.com',
    phone: '+20 102 333 4455',
    address: 'Rehab City, Group 12, Villa 4',
    children: [
      { name: 'Farida Sherif Mansour', class: 'Primary 1', studentId: 'NL-2026-00147' },
      { name: 'Sherif Samir Mansour', class: 'Preparatory 3', studentId: 'NL-2026-00151' }
    ],
    primaryContact: true,
  },
  {
    id: 'p-3',
    name: 'Dr. Tarek Abdelrahman',
    email: 'tarek.parent@gmail.com',
    phone: '+20 100 111 2233',
    address: 'Nasr City, 7th District, Cairo',
    children: [{ name: 'Nour Tarek Abdelrahman', class: 'Primary 4', studentId: 'NL-2026-00145' }],
    primaryContact: true,
  },
  {
    id: 'p-4',
    name: 'Mr. Khaled Hassan',
    email: 'parent.hassan@gmail.com',
    phone: '+20 105 666 7788',
    address: 'Madinaty, B1, Apt 402',
    children: [{ name: 'Omar Khaled Hassan', class: 'Primary 5', studentId: 'NL-2026-00144' }],
    primaryContact: true,
  },
];

export default function ParentsManagementPage() {
  const { user } = useAuth();
  const [parents, setParents] = useState<ParentRecord[]>(INITIAL_PARENTS);
  const [search, setSearch] = useState('');
  const [showAddModal, setShowAddModal] = useState(false);

  // Form State
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [address, setAddress] = useState('');

  const handleAddParent = (e: React.FormEvent) => {
    e.preventDefault();
    const created: ParentRecord = {
      id: `p-${Date.now()}`,
      name,
      email,
      phone,
      address,
      children: [],
      primaryContact: true,
    };
    setParents([created, ...parents]);
    setShowAddModal(false);
    setName('');
    setEmail('');
    setPhone('');
    setAddress('');
  };

  // Smart Search across parent name, email, phone, address, children names/IDs
  const filteredParents = parents.filter(p => {
    const q = search.toLowerCase().trim();
    if (!q) return true;
    const matchesName = p.name.toLowerCase().includes(q);
    const matchesEmail = p.email.toLowerCase().includes(q);
    const matchesPhone = p.phone.toLowerCase().includes(q);
    const matchesAddress = p.address.toLowerCase().includes(q);
    const matchesChild = p.children.some(c => c.name.toLowerCase().includes(q) || c.studentId.toLowerCase().includes(q) || c.class.toLowerCase().includes(q));

    return matchesName || matchesEmail || matchesPhone || matchesAddress || matchesChild;
  });

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-slate-900 font-heading flex items-center gap-2">
            <UserPlus className="w-7 h-7 text-blue-700" />
            Parents Directory & Guardian Accounts
          </h1>
          <p className="text-slate-600 text-sm mt-1">
            Manage parent contact details, primary guardian links, and student assignments.
          </p>
        </div>

        <button
          onClick={() => setShowAddModal(true)}
          className="flex items-center justify-center gap-2 bg-blue-700 hover:bg-blue-800 text-white font-semibold px-4 py-2.5 rounded-lg shadow-sm text-sm"
        >
          <Plus className="w-4 h-4" /> Add Parent Record
        </button>
      </div>

      {/* Smart Search */}
      <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-sm flex items-center gap-3">
        <Search className="w-4 h-4 text-slate-400" />
        <input
          type="text"
          placeholder="Smart Search parent name, email, phone, child name, or student ID..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full bg-transparent text-sm focus:outline-none text-slate-800 font-medium"
        />
        {search && (
          <button onClick={() => setSearch('')} className="text-xs text-slate-400 hover:text-slate-600">Clear</button>
        )}
      </div>

      {/* Parents Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        {filteredParents.map(p => (
          <div key={p.id} className="bg-white rounded-2xl border border-slate-200 p-5 shadow-sm space-y-3 relative hover:shadow-md transition-all">
            <div className="flex items-start justify-between">
              <div className="flex items-center gap-3">
                <div className="w-11 h-11 rounded-full bg-blue-100 text-blue-800 font-bold flex items-center justify-center text-sm border border-blue-200">
                  {p.name.split(' ').map(n => n[0]).slice(0, 2).join('')}
                </div>
                <div>
                  <h3 className="font-bold text-slate-900 text-base">{p.name}</h3>
                  <span className="bg-emerald-50 text-emerald-700 text-[10px] font-bold px-2 py-0.5 rounded border border-emerald-200">
                    Primary Guardian
                  </span>
                </div>
              </div>
            </div>

            <div className="text-xs text-slate-600 space-y-1.5 pt-2 border-t border-slate-100">
              <div className="flex items-center gap-2"><Mail className="w-3.5 h-3.5 text-blue-600" /> <span>{p.email}</span></div>
              <div className="flex items-center gap-2"><Phone className="w-3.5 h-3.5 text-blue-600" /> <span>{p.phone}</span></div>
              <div className="flex items-center gap-2"><MapPin className="w-3.5 h-3.5 text-blue-600" /> <span>{p.address}</span></div>
            </div>

            <div className="bg-slate-50 p-3 rounded-xl border border-slate-100 space-y-1 text-xs">
              <span className="text-slate-500 font-bold block text-[11px] uppercase">Enrolled Children ({p.children.length})</span>
              {p.children.length > 0 ? (
                p.children.map(c => (
                  <div key={c.studentId} className="flex justify-between items-center text-slate-800 font-medium">
                    <span>• {c.name} ({c.class})</span>
                    <span className="font-mono text-[10px] text-blue-800 bg-blue-50 px-1.5 py-0.5 rounded">{c.studentId}</span>
                  </div>
                ))
              ) : (
                <p className="text-slate-400 text-[11px]">No student links attached yet</p>
              )}
            </div>
          </div>
        ))}
      </div>

      {/* Modal: Add Parent */}
      {showAddModal && (
        <div className="fixed inset-0 bg-slate-900/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-md w-full shadow-2xl overflow-hidden">
            <div className="bg-blue-950 text-white p-5 flex items-center justify-between">
              <h3 className="text-lg font-bold font-heading">Add New Parent Record</h3>
              <button onClick={() => setShowAddModal(false)} className="text-blue-200 hover:text-white">
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleAddParent} className="p-6 space-y-4 text-xs">
              <div>
                <label className="block font-semibold text-slate-700 mb-1">Parent Full Name</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Mr. Hany El-Sayed"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full bg-slate-50 border border-slate-200 rounded-lg p-2.5 font-medium"
                />
              </div>

              <div>
                <label className="block font-semibold text-slate-700 mb-1">Email Address</label>
                <input
                  type="email"
                  required
                  placeholder="hany.sayed@gmail.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full bg-slate-50 border border-slate-200 rounded-lg p-2.5"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-semibold text-slate-700 mb-1">Phone Number</label>
                  <input
                    type="text"
                    required
                    placeholder="+20 100 000 0000"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    className="w-full bg-slate-50 border border-slate-200 rounded-lg p-2.5"
                  />
                </div>
                <div>
                  <label className="block font-semibold text-slate-700 mb-1">Residential City/District</label>
                  <input
                    type="text"
                    required
                    placeholder="New Cairo"
                    value={address}
                    onChange={(e) => setAddress(e.target.value)}
                    className="w-full bg-slate-50 border border-slate-200 rounded-lg p-2.5"
                  />
                </div>
              </div>

              <div className="pt-3 flex justify-end gap-2 border-t border-slate-100">
                <button type="button" onClick={() => setShowAddModal(false)} className="px-4 py-2 text-slate-600 font-semibold">
                  Cancel
                </button>
                <button type="submit" className="bg-blue-700 hover:bg-blue-800 text-white font-semibold px-5 py-2 rounded-lg flex items-center gap-1.5">
                  <CheckCircle2 className="w-4 h-4" /> Save Parent Profile
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
