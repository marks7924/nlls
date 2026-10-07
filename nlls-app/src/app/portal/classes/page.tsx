'use client';

import { useState } from 'react';
import { School, Search, Plus, Users, UserCheck, MapPin, X, CheckCircle2 } from 'lucide-react';

interface ClassItem {
  id: string;
  name: string;
  stage: 'Primary' | 'Preparatory';
  homeroomTeacher: string;
  studentCount: number;
  capacity: number;
  roomNumber: string;
  students: { id: string; name: string; studentId: string }[];
}

// Exactly 9 classes: Primary 1..6, Preparatory 1..3. Only ONE class for each (no letters A, B, C)
const INITIAL_CLASSES: ClassItem[] = [
  { 
    id: 'p1', name: 'Primary 1', stage: 'Primary', homeroomTeacher: 'Mrs. Rania Fouad', studentCount: 24, capacity: 30, roomNumber: 'Building A - Room 101',
    students: [
      { id: '101', name: 'Hamza Amr Fouad', studentId: 'NL-2026-00146' },
      { id: '102', name: 'Farida Sherif Mansour', studentId: 'NL-2026-00147' },
    ]
  },
  { 
    id: 'p2', name: 'Primary 2', stage: 'Primary', homeroomTeacher: 'Ms. Salma Nabil', studentCount: 26, capacity: 30, roomNumber: 'Building A - Room 102',
    students: [{ id: '103', name: 'Laila Hany El-Sayed', studentId: 'NL-2026-00149' }]
  },
  { 
    id: 'p3', name: 'Primary 3', stage: 'Primary', homeroomTeacher: 'Mrs. Dina Hassan', studentCount: 25, capacity: 30, roomNumber: 'Building A - Room 103',
    students: [{ id: '104', name: 'Ziad Sherif Hassan', studentId: 'NL-2026-00150' }]
  },
  { 
    id: 'p4', name: 'Primary 4', stage: 'Primary', homeroomTeacher: 'Mr. Tarek Abdelrahman', studentCount: 28, capacity: 30, roomNumber: 'Building A - Room 201',
    students: [{ id: '105', name: 'Nour Tarek Abdelrahman', studentId: 'NL-2026-00145' }]
  },
  { 
    id: 'p5', name: 'Primary 5', stage: 'Primary', homeroomTeacher: 'Mr. Khaled Hassan', studentCount: 27, capacity: 30, roomNumber: 'Building A - Room 202',
    students: [{ id: '106', name: 'Omar Khaled Hassan', studentId: 'NL-2026-00144' }]
  },
  { 
    id: 'p6', name: 'Primary 6', stage: 'Primary', homeroomTeacher: 'Dr. Ahmed Rashed', studentCount: 29, capacity: 30, roomNumber: 'Building A - Room 203',
    students: [{ id: '107', name: 'Kareem Mostafa Nabil', studentId: 'NL-2026-00148' }]
  },
  { 
    id: 'prep1', name: 'Preparatory 1', stage: 'Preparatory', homeroomTeacher: 'Mr. Sameh Farouk', studentCount: 28, capacity: 30, roomNumber: 'Building B - Room 101',
    students: [{ id: '108', name: 'Youssef Ahmed El-Sayed', studentId: 'NL-2026-00142' }]
  },
  { 
    id: 'prep2', name: 'Preparatory 2', stage: 'Preparatory', homeroomTeacher: 'Mrs. Mona El-Shazly', studentCount: 30, capacity: 30, roomNumber: 'Building B - Room 102',
    students: [{ id: '109', name: 'Mariam Mahmoud Ibrahim', studentId: 'NL-2026-00143' }]
  },
  { 
    id: 'prep3', name: 'Preparatory 3', stage: 'Preparatory', homeroomTeacher: 'Mr. Hassan Mostafa', studentCount: 29, capacity: 30, roomNumber: 'Building B - Room 103',
    students: [{ id: '110', name: 'Sherif Samir Mansour', studentId: 'NL-2026-00151' }]
  },
];

export const ALL_GRADES_OPTIONS: { name: string; stage: 'Primary' | 'Preparatory' }[] = [
  { name: 'Primary 1', stage: 'Primary' },
  { name: 'Primary 2', stage: 'Primary' },
  { name: 'Primary 3', stage: 'Primary' },
  { name: 'Primary 4', stage: 'Primary' },
  { name: 'Primary 5', stage: 'Primary' },
  { name: 'Primary 6', stage: 'Primary' },
  { name: 'Preparatory 1', stage: 'Preparatory' },
  { name: 'Preparatory 2', stage: 'Preparatory' },
  { name: 'Preparatory 3', stage: 'Preparatory' },
];

export default function ClassesPage() {
  const [classesList, setClassesList] = useState<ClassItem[]>(INITIAL_CLASSES);
  const [search, setSearch] = useState('');
  const [stageFilter, setStageFilter] = useState<'all' | 'Primary' | 'Preparatory'>('all');
  const [selectedClass, setSelectedClass] = useState<ClassItem | null>(null);
  const [showAddModal, setShowAddModal] = useState(false);

  // Form State for Class Registration
  const [selectedGradeOption, setSelectedGradeOption] = useState('Primary 1');
  const [newTeacher, setNewTeacher] = useState('Mrs. Rania Fouad');
  const [newRoom, setNewRoom] = useState('Building A - Room 104');
  const [newCapacity, setNewCapacity] = useState(30);

  const handleCreateClass = (e: React.FormEvent) => {
    e.preventDefault();
    const gradeObj = ALL_GRADES_OPTIONS.find(g => g.name === selectedGradeOption) || ALL_GRADES_OPTIONS[0];

    const created: ClassItem = {
      id: String(Date.now()),
      name: gradeObj.name,
      stage: gradeObj.stage,
      homeroomTeacher: newTeacher,
      studentCount: 0,
      capacity: newCapacity,
      roomNumber: newRoom,
      students: [],
    };

    setClassesList(prev => [created, ...prev]);
    setShowAddModal(false);
  };

  // Smart Multi-field Search
  const filtered = classesList.filter(c => {
    const matchesStage = stageFilter === 'all' || c.stage === stageFilter;
    const query = search.toLowerCase().trim();
    if (!query) return matchesStage;

    const matchesName = c.name.toLowerCase().includes(query);
    const matchesStageText = c.stage.toLowerCase().includes(query);
    const matchesTeacher = c.homeroomTeacher.toLowerCase().includes(query);
    const matchesRoom = c.roomNumber.toLowerCase().includes(query);
    const matchesStudent = c.students.some(st => st.name.toLowerCase().includes(query) || st.studentId.toLowerCase().includes(query));

    return matchesStage && (matchesName || matchesStageText || matchesTeacher || matchesRoom || matchesStudent);
  });

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-slate-900 font-heading flex items-center gap-2">
            <School className="w-7 h-7 text-blue-700" />
            Classroom & Grade Registry
          </h1>
          <p className="text-slate-600 text-sm mt-1">
            Official NLLS Educational Structure: <strong>Primary 1..6</strong> & <strong>Preparatory 1..3</strong> (Single cohort per grade).
          </p>
        </div>

        <button
          onClick={() => setShowAddModal(true)}
          className="flex items-center justify-center gap-2 bg-blue-700 hover:bg-blue-800 text-white font-semibold px-4 py-2.5 rounded-lg shadow-sm transition-colors text-sm"
        >
          <Plus className="w-4 h-4" /> Class Registration
        </button>
      </div>

      {/* Filter & Smart Search Toolbar */}
      <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-sm flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="relative w-full sm:w-96">
          <Search className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
          <input
            type="text"
            placeholder="Smart Search by Grade (Primary 1..6, Preparatory 1..3), teacher, room, student..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-9 pr-8 py-2 bg-slate-50 border border-slate-200 rounded-lg text-sm text-slate-800 focus:outline-none focus:ring-2 focus:ring-blue-600"
          />
          {search && (
            <button onClick={() => setSearch('')} className="absolute right-3 top-2.5 text-xs text-slate-400 hover:text-slate-600">✕</button>
          )}
        </div>

        <div className="flex items-center gap-2 w-full sm:w-auto">
          <button
            onClick={() => setStageFilter('all')}
            className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-colors ${stageFilter === 'all' ? 'bg-blue-700 text-white' : 'bg-slate-100 text-slate-700 hover:bg-slate-200'}`}
          >
            All Cohorts ({classesList.length})
          </button>
          <button
            onClick={() => setStageFilter('Primary')}
            className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-colors ${stageFilter === 'Primary' ? 'bg-blue-700 text-white' : 'bg-slate-100 text-slate-700 hover:bg-slate-200'}`}
          >
            Primary (1–6)
          </button>
          <button
            onClick={() => setStageFilter('Preparatory')}
            className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-colors ${stageFilter === 'Preparatory' ? 'bg-blue-700 text-white' : 'bg-slate-100 text-slate-700 hover:bg-slate-200'}`}
          >
            Preparatory (1–3)
          </button>
        </div>
      </div>

      {/* Class Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        {filtered.map(c => (
          <div
            key={c.id}
            onClick={() => setSelectedClass(c)}
            className="bg-white rounded-xl border border-slate-200 shadow-sm hover:shadow-md hover:border-blue-400 transition-all p-5 space-y-3 cursor-pointer group"
          >
            <div className="flex items-start justify-between">
              <div>
                <span className={`text-xs font-bold px-2.5 py-0.5 rounded border ${c.stage === 'Primary' ? 'bg-blue-50 text-blue-700 border-blue-200' : 'bg-amber-50 text-amber-700 border-amber-200'}`}>
                  {c.stage} Stage
                </span>
                <h3 className="font-bold text-slate-900 text-xl font-heading mt-1.5 group-hover:text-blue-700 transition-colors">
                  {c.name}
                </h3>
              </div>
              <div className="bg-slate-100 text-slate-800 text-xs font-bold px-2.5 py-1 rounded-md flex items-center gap-1">
                <Users className="w-3.5 h-3.5 text-blue-600" /> {c.studentCount} / {c.capacity}
              </div>
            </div>

            <div className="text-xs text-slate-600 space-y-1.5 pt-2 border-t border-slate-100">
              <div className="flex items-center gap-1.5">
                <UserCheck className="w-3.5 h-3.5 text-blue-600 shrink-0" />
                <span><strong>Homeroom Teacher:</strong> {c.homeroomTeacher}</span>
              </div>
              <div className="flex items-center gap-1.5">
                <MapPin className="w-3.5 h-3.5 text-blue-600 shrink-0" />
                <span><strong>Classroom:</strong> {c.roomNumber}</span>
              </div>
            </div>

            <div className="pt-2 text-right">
              <span className="text-xs text-blue-700 font-semibold group-hover:underline">View Roster & Schedule →</span>
            </div>
          </div>
        ))}
      </div>

      {/* Class Details Roster Modal */}
      {selectedClass && (
        <div className="fixed inset-0 bg-slate-900/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-lg w-full shadow-2xl overflow-hidden animate-in fade-in duration-150">
            <div className="bg-blue-950 text-white p-5 flex items-center justify-between">
              <div>
                <span className="text-xs font-mono bg-blue-800 text-yellow-400 px-2 py-0.5 rounded">
                  {selectedClass.stage} Stage
                </span>
                <h3 className="text-xl font-bold mt-1 font-heading">{selectedClass.name} Overview</h3>
              </div>
              <button onClick={() => setSelectedClass(null)} className="text-blue-200 hover:text-white p-1 text-xl">
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="p-6 space-y-4">
              <div className="grid grid-cols-2 gap-3 text-xs bg-slate-50 p-3 rounded-xl border border-slate-200">
                <div><span className="text-slate-500 block">Homeroom Teacher</span><strong className="text-slate-900">{selectedClass.homeroomTeacher}</strong></div>
                <div><span className="text-slate-500 block">Room Designation</span><strong className="text-slate-900">{selectedClass.roomNumber}</strong></div>
              </div>

              <div>
                <h4 className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">Registered Class Roster ({selectedClass.students.length} Enrolled)</h4>
                {selectedClass.students.length > 0 ? (
                  <div className="divide-y divide-slate-100 border border-slate-200 rounded-xl overflow-hidden text-xs">
                    {selectedClass.students.map(st => (
                      <div key={st.id} className="p-3 flex items-center justify-between hover:bg-slate-50">
                        <span className="font-semibold text-slate-900">{st.name}</span>
                        <span className="font-mono text-blue-800 bg-blue-50 px-2 py-0.5 rounded border border-blue-100">{st.studentId}</span>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="text-center p-4 bg-slate-50 rounded-xl text-xs text-slate-500">
                    No active student records assigned to this class cohort.
                  </div>
                )}
              </div>
            </div>

            <div className="bg-slate-50 p-4 border-t border-slate-200 flex justify-end">
              <button onClick={() => setSelectedClass(null)} className="bg-slate-800 hover:bg-slate-900 text-white text-xs px-4 py-2 rounded-lg font-semibold">
                Close
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Class Registration Modal */}
      {showAddModal && (
        <div className="fixed inset-0 bg-slate-900/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-md w-full shadow-2xl overflow-hidden">
            <div className="bg-blue-950 text-white p-5 flex items-center justify-between">
              <div>
                <h3 className="text-lg font-bold font-heading">Class Registration & Grade Setup</h3>
                <p className="text-xs text-blue-200">Full option list for Primary (1–6) & Preparatory (1–3)</p>
              </div>
              <button onClick={() => setShowAddModal(false)} className="text-blue-200 hover:text-white">
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleCreateClass} className="p-6 space-y-4 text-xs">
              <div>
                <label className="block font-semibold text-slate-700 mb-1">Select Target Grade Level</label>
                <select
                  value={selectedGradeOption}
                  onChange={(e) => setSelectedGradeOption(e.target.value)}
                  className="w-full bg-slate-50 border border-slate-200 rounded-lg p-2.5 text-xs text-slate-900 font-bold focus:ring-2 focus:ring-blue-600"
                >
                  {ALL_GRADES_OPTIONS.map(g => (
                    <option key={g.name} value={g.name}>
                      {g.name} — ({g.stage} Stage)
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block font-semibold text-slate-700 mb-1">Assigned Lead Teacher</label>
                <input
                  type="text"
                  required
                  value={newTeacher}
                  onChange={(e) => setNewTeacher(e.target.value)}
                  className="w-full bg-slate-50 border border-slate-200 rounded-lg p-2.5 font-medium text-slate-800"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-semibold text-slate-700 mb-1">Room / Building</label>
                  <input
                    type="text"
                    required
                    value={newRoom}
                    onChange={(e) => setNewRoom(e.target.value)}
                    className="w-full bg-slate-50 border border-slate-200 rounded-lg p-2.5 text-slate-800"
                  />
                </div>
                <div>
                  <label className="block font-semibold text-slate-700 mb-1">Max Capacity</label>
                  <input
                    type="number"
                    value={newCapacity}
                    onChange={(e) => setNewCapacity(Number(e.target.value))}
                    className="w-full bg-slate-50 border border-slate-200 rounded-lg p-2.5 font-semibold text-slate-800"
                  />
                </div>
              </div>

              <div className="pt-3 flex items-center justify-end gap-2 border-t border-slate-100">
                <button type="button" onClick={() => setShowAddModal(false)} className="px-4 py-2 text-slate-600 font-semibold">
                  Cancel
                </button>
                <button type="submit" className="bg-blue-700 hover:bg-blue-800 text-white font-semibold px-5 py-2 rounded-lg flex items-center gap-1.5">
                  <CheckCircle2 className="w-4 h-4" /> Save Registration
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
