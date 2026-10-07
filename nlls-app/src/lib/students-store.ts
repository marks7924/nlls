// ============================================================
// NLLS — Shared Active Students Store
// ============================================================

export interface StudentRecord {
  id: string;
  studentId: string;
  name: string;
  arabicName: string;
  stage: 'Primary' | 'Preparatory';
  grade: string;
  className: string;
  gender: 'male' | 'female';
  dob: string;
  status: 'active' | 'suspended' | 'graduated' | 'transferred';
  parentName: string;
  parentPhone: string;
  parentEmail: string;
  email: string;
  enrollmentDate: string;
}

export const INITIAL_STUDENTS_LIST: StudentRecord[] = [
  { id: '1', studentId: 'NL-2026-00146', name: 'Hamza Amr Fouad', arabicName: 'حمزة عمرو فؤاد', stage: 'Primary', grade: 'Primary 1', className: 'Primary 1', gender: 'male', dob: '2020-04-18', status: 'active', parentName: 'Amr Fouad Nabil', parentPhone: '+20 101 222 3344', parentEmail: 'fouad.parent@gmail.com', email: 'h.fouad@nlls.edu.eg', enrollmentDate: '2026-09-01' },
  { id: '2', studentId: 'NL-2026-00147', name: 'Farida Sherif Mansour', arabicName: 'فريدة شريف منصور', stage: 'Primary', grade: 'Primary 1', className: 'Primary 1', gender: 'female', dob: '2020-07-05', status: 'active', parentName: 'Sherif Mansour Samir', parentPhone: '+20 102 333 4455', parentEmail: 'sherif.mansour@hotmail.com', email: 'f.mansour@nlls.edu.eg', enrollmentDate: '2026-09-01' },
  { id: '3', studentId: 'NL-2026-00149', name: 'Laila Hany El-Sayed', arabicName: 'ليلى هاني السيد', stage: 'Primary', grade: 'Primary 2', className: 'Primary 2', gender: 'female', dob: '2019-03-12', status: 'active', parentName: 'Hany El-Sayed', parentPhone: '+20 104 555 6677', parentEmail: 'hany.sayed@gmail.com', email: 'l.sayed@nlls.edu.eg', enrollmentDate: '2026-09-01' },
  { id: '4', studentId: 'NL-2026-00150', name: 'Ziad Sherif Hassan', arabicName: 'زياد شريف حسن', stage: 'Primary', grade: 'Primary 3', className: 'Primary 3', gender: 'male', dob: '2018-09-20', status: 'active', parentName: 'Sherif Hassan', parentPhone: '+20 105 666 7788', parentEmail: 'sherif.hassan@gmail.com', email: 'z.hassan@nlls.edu.eg', enrollmentDate: '2026-09-01' },
  { id: '5', studentId: 'NL-2026-00145', name: 'Nour Tarek Abdelrahman', arabicName: 'نور طارق عبدالرحمن', stage: 'Primary', grade: 'Primary 4', className: 'Primary 4', gender: 'female', dob: '2017-11-30', status: 'suspended', parentName: 'Tarek Abdelrahman', parentPhone: '+20 100 111 2233', parentEmail: 'tarek.parent@gmail.com', email: 'n.abdelrahman@nlls.edu.eg', enrollmentDate: '2026-09-01' },
  { id: '6', studentId: 'NL-2026-00144', name: 'Omar Khaled Hassan', arabicName: 'عمر خالد حسن', stage: 'Primary', grade: 'Primary 5', className: 'Primary 5', gender: 'male', dob: '2016-02-10', status: 'active', parentName: 'Khaled Hassan', parentPhone: '+20 105 666 7788', parentEmail: 'parent.hassan@gmail.com', email: 'o.hassan@nlls.edu.eg', enrollmentDate: '2026-09-01' },
  { id: '7', studentId: 'NL-2026-00148', name: 'Kareem Mostafa Nabil', arabicName: 'كريم مصطفى نبيل', stage: 'Primary', grade: 'Primary 6', className: 'Primary 6', gender: 'male', dob: '2015-05-15', status: 'active', parentName: 'Mostafa Nabil', parentPhone: '+20 103 444 5566', parentEmail: 'mostafa.nabil@gmail.com', email: 'k.nabil@nlls.edu.eg', enrollmentDate: '2026-09-01' },
  { id: '8', studentId: 'NL-2026-00142', name: 'Youssef Ahmed El-Sayed', arabicName: 'يوسف أحمد السيد', stage: 'Preparatory', grade: 'Preparatory 1', className: 'Preparatory 1', gender: 'male', dob: '2014-05-14', status: 'active', parentName: 'Ahmed El-Sayed', parentPhone: '+20 106 777 8899', parentEmail: 'parent.elsayed@gmail.com', email: 'y.elsayed@nlls.edu.eg', enrollmentDate: '2026-09-01' },
  { id: '9', studentId: 'NL-2026-00143', name: 'Mariam Mahmoud Ibrahim', arabicName: 'مريم محمود إبراهيم', stage: 'Preparatory', grade: 'Preparatory 2', className: 'Preparatory 2', gender: 'female', dob: '2013-08-22', status: 'active', parentName: 'Mahmoud Ibrahim', parentPhone: '+20 107 888 9900', parentEmail: 'm.ibrahim.parent@yahoo.com', email: 'm.ibrahim@nlls.edu.eg', enrollmentDate: '2026-09-01' },
  { id: '10', studentId: 'NL-2026-00151', name: 'Sherif Samir Mansour', arabicName: 'شريف سمير منصور', stage: 'Preparatory', grade: 'Preparatory 3', className: 'Preparatory 3', gender: 'male', dob: '2012-01-10', status: 'active', parentName: 'Samir Mansour', parentPhone: '+20 108 999 0011', parentEmail: 'samir.mansour@gmail.com', email: 's.mansour@nlls.edu.eg', enrollmentDate: '2026-09-01' },
];

const LOCAL_STORAGE_KEY = 'nlls_registered_students';

export function getStoredStudents(): StudentRecord[] {
  if (typeof window === 'undefined') return INITIAL_STUDENTS_LIST;
  try {
    const raw = localStorage.getItem(LOCAL_STORAGE_KEY);
    if (!raw) {
      localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(INITIAL_STUDENTS_LIST));
      return INITIAL_STUDENTS_LIST;
    }
    return JSON.parse(raw);
  } catch (err) {
    return INITIAL_STUDENTS_LIST;
  }
}

export function registerNewStudent(data: {
  name: string;
  arabicName?: string;
  stage: 'Primary' | 'Preparatory';
  grade: string;
  gender: 'male' | 'female';
  parentName: string;
  parentPhone: string;
  parentEmail: string;
}): StudentRecord {
  const students = getStoredStudents();
  const nextNum = students.length + 152;
  const newStudent: StudentRecord = {
    id: String(Date.now()),
    studentId: `NL-2026-00${nextNum}`,
    name: data.name,
    arabicName: data.arabicName || data.name,
    stage: data.stage,
    grade: data.grade,
    className: data.grade,
    gender: data.gender,
    dob: '2017-01-01',
    status: 'active',
    parentName: data.parentName,
    parentPhone: data.parentPhone,
    parentEmail: data.parentEmail,
    email: `${data.name.toLowerCase().replace(/\s+/g, '.')}@nlls.edu.eg`,
    enrollmentDate: new Date().toISOString().split('T')[0],
  };

  const updated = [newStudent, ...students];
  if (typeof window !== 'undefined') {
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(updated));
  }
  return newStudent;
}
