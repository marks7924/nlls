// ============================================================
// NLLS — Shared Contact Messages Store
// ============================================================

export interface ContactMessage {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  department: 'admissions' | 'academics' | 'student_affairs' | 'general';
  message: string;
  timestamp: string;
  isRead: boolean;
}

export const INITIAL_CONTACT_MESSAGES: ContactMessage[] = [
  {
    id: 'MSG-2026-001',
    firstName: 'Mark',
    lastName: 'Samer',
    email: 'm@gmail.com',
    phone: '01203345435',
    department: 'general',
    message: 'Inquiry regarding student affairs registration process for Primary 1..6.',
    timestamp: '2026-10-07 11:40 AM',
    isRead: false,
  },
  {
    id: 'MSG-2026-002',
    firstName: 'Amr',
    lastName: 'Fouad',
    email: 'amr.fouad@gmail.com',
    phone: '+20 101 222 3344',
    department: 'admissions',
    message: 'We submitted an application for Primary 1. Would like to check interview schedule dates.',
    timestamp: '2026-10-06 03:15 PM',
    isRead: true,
  },
  {
    id: 'MSG-2026-003',
    firstName: 'Salma',
    lastName: 'Mansour',
    email: 'salma.m@yahoo.com',
    phone: '+20 102 333 4455',
    department: 'academics',
    message: 'Requesting French language curriculum details for Preparatory 2.',
    timestamp: '2026-10-05 09:20 AM',
    isRead: true,
  }
];

const LOCAL_STORAGE_KEY = 'nlls_contact_messages';

export function getStoredContactMessages(): ContactMessage[] {
  if (typeof window === 'undefined') return INITIAL_CONTACT_MESSAGES;
  try {
    const raw = localStorage.getItem(LOCAL_STORAGE_KEY);
    if (!raw) {
      localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(INITIAL_CONTACT_MESSAGES));
      return INITIAL_CONTACT_MESSAGES;
    }
    return JSON.parse(raw);
  } catch (err) {
    return INITIAL_CONTACT_MESSAGES;
  }
}

export function saveContactMessage(msg: Omit<ContactMessage, 'id' | 'timestamp' | 'isRead'>): ContactMessage {
  const messages = getStoredContactMessages();
  const newMsg: ContactMessage = {
    ...msg,
    id: `MSG-2026-${Math.floor(100 + Math.random() * 900)}`,
    timestamp: new Date().toLocaleString('en-US', { dateStyle: 'short', timeStyle: 'short' }),
    isRead: false,
  };
  const updated = [newMsg, ...messages];
  if (typeof window !== 'undefined') {
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(updated));
  }
  return newMsg;
}

export function markContactMessageAsRead(id: string): ContactMessage[] {
  const messages = getStoredContactMessages();
  const updated = messages.map(m => m.id === id ? { ...m, isRead: true } : m);
  if (typeof window !== 'undefined') {
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(updated));
  }
  return updated;
}
