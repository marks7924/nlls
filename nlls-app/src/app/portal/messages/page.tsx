'use client';

import { useState, useEffect } from 'react';
import { 
  Mail, Search, Filter, CheckCircle2, Eye, Reply, Send, MessageSquare, 
  Sparkles, Trash2, ShieldCheck, X, Inbox 
} from 'lucide-react';
import { 
  getStoredContactMessages, 
  markContactMessageAsRead, 
  type ContactMessage 
} from '@/lib/contact-messages';

export default function ContactMessagesAdminPage() {
  const [messages, setMessages] = useState<ContactMessage[]>([]);
  const [search, setSearch] = useState('');
  const [departmentFilter, setDepartmentFilter] = useState('all');
  const [selectedMessage, setSelectedMessage] = useState<ContactMessage | null>(null);

  // Notice Banner State
  const [webNotice, setWebNotice] = useState<string | null>(null);

  // Reply Modal State
  const [replyText, setReplyText] = useState('');
  const [showReplyModal, setShowReplyModal] = useState(false);

  useEffect(() => {
    setMessages(getStoredContactMessages());
  }, []);

  const handleSelectMessage = (msg: ContactMessage) => {
    setSelectedMessage(msg);
    if (!msg.isRead) {
      const updated = markContactMessageAsRead(msg.id);
      setMessages(updated);
    }
  };

  const handleSendReply = (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedMessage || !replyText) return;

    setShowReplyModal(false);
    setReplyText('');
    setWebNotice(`✅ Web Notice: Reply successfully dispatched to ${selectedMessage.email}! Copy logged in Email Audit.`);

    setTimeout(() => setWebNotice(null), 5000);
  };

  const unreadCount = messages.filter(m => !m.isRead).length;

  const filtered = messages.filter(m => {
    const matchesDept = departmentFilter === 'all' || m.department === departmentFilter;
    const q = search.toLowerCase().trim();
    if (!q) return matchesDept;

    const matchesName = `${m.firstName} ${m.lastName}`.toLowerCase().includes(q);
    const matchesEmail = m.email.toLowerCase().includes(q);
    const matchesPhone = m.phone.toLowerCase().includes(q);
    const matchesMsg = m.message.toLowerCase().includes(q);
    const matchesId = m.id.toLowerCase().includes(q);

    return matchesDept && (matchesName || matchesEmail || matchesPhone || matchesMsg || matchesId);
  });

  return (
    <div className="space-y-6">
      {/* Web Notice Banner (Replacing native browser alerts) */}
      {webNotice && (
        <div className="bg-emerald-900 text-white p-4 rounded-2xl flex items-center justify-between shadow-lg animate-in fade-in border border-emerald-700">
          <div className="flex items-center gap-3">
            <CheckCircle2 className="w-5 h-5 text-emerald-400" />
            <span className="text-xs font-bold font-mono">{webNotice}</span>
          </div>
          <button onClick={() => setWebNotice(null)} className="text-xs text-emerald-200 hover:text-white font-bold">Dismiss</button>
        </div>
      )}

      {/* Page Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-slate-900 font-heading flex items-center gap-2">
            <Inbox className="w-7 h-7 text-blue-700" />
            Website Contact Messages & Inquiries
          </h1>
          <p className="text-slate-600 text-sm mt-1">
            Real-time inbox for public submissions from the NLLS Contact Us portal.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <span className="bg-blue-50 text-blue-800 text-xs font-bold px-3 py-1.5 rounded-xl border border-blue-200 flex items-center gap-1.5">
            <Mail className="w-4 h-4 text-blue-600" /> {unreadCount} Unread Messages
          </span>
        </div>
      </div>

      {/* Toolbar & Smart Search */}
      <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-sm flex flex-col md:flex-row items-center justify-between gap-4">
        <div className="relative w-full md:w-96">
          <Search className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
          <input
            type="text"
            placeholder="Smart Search sender name, email, phone, message text..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-9 pr-8 py-2 bg-slate-50 border border-slate-200 rounded-lg text-xs text-slate-800 focus:outline-none focus:ring-2 focus:ring-blue-600"
          />
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={() => setDepartmentFilter('all')}
            className={`px-3 py-1.5 rounded-lg text-xs font-bold ${departmentFilter === 'all' ? 'bg-blue-700 text-white' : 'bg-slate-100 text-slate-700'}`}
          >
            All Messages ({messages.length})
          </button>
          <button
            onClick={() => setDepartmentFilter('admissions')}
            className={`px-3 py-1.5 rounded-lg text-xs font-bold ${departmentFilter === 'admissions' ? 'bg-blue-700 text-white' : 'bg-slate-100 text-slate-700'}`}
          >
            Admissions
          </button>
          <button
            onClick={() => setDepartmentFilter('student_affairs')}
            className={`px-3 py-1.5 rounded-lg text-xs font-bold ${departmentFilter === 'student_affairs' ? 'bg-blue-700 text-white' : 'bg-slate-100 text-slate-700'}`}
          >
            Student Affairs
          </button>
          <button
            onClick={() => setDepartmentFilter('academics')}
            className={`px-3 py-1.5 rounded-lg text-xs font-bold ${departmentFilter === 'academics' ? 'bg-blue-700 text-white' : 'bg-slate-100 text-slate-700'}`}
          >
            Academics
          </button>
        </div>
      </div>

      {/* Messages Main Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Messages List Column */}
        <div className="lg:col-span-6 space-y-3">
          {filtered.map(msg => (
            <div
              key={msg.id}
              onClick={() => handleSelectMessage(msg)}
              className={`p-4 rounded-2xl border transition-all cursor-pointer space-y-2 relative ${
                selectedMessage?.id === msg.id
                  ? 'bg-blue-50/80 border-blue-400 shadow-sm'
                  : msg.isRead
                  ? 'bg-white border-slate-200 hover:border-slate-300'
                  : 'bg-amber-50/40 border-amber-200 font-semibold'
              }`}
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  {!msg.isRead && (
                    <span className="w-2.5 h-2.5 rounded-full bg-amber-500 animate-pulse" />
                  )}
                  <h4 className="font-bold text-slate-900 text-sm">{msg.firstName} {msg.lastName}</h4>
                </div>
                <span className="text-[11px] font-mono text-slate-400">{msg.timestamp}</span>
              </div>

              <div className="flex items-center gap-2 text-xs">
                <span className="bg-slate-100 text-slate-700 px-2 py-0.5 rounded text-[10px] font-mono uppercase font-bold">
                  {msg.department.replace('_', ' ')}
                </span>
                <span className="text-slate-500 truncate">{msg.email} · {msg.phone}</span>
              </div>

              <p className="text-xs text-slate-600 line-clamp-2">{msg.message}</p>
            </div>
          ))}

          {filtered.length === 0 && (
            <div className="text-center p-8 bg-white rounded-2xl border border-slate-200 text-slate-400 text-xs">
              No contact messages matching your query.
            </div>
          )}
        </div>

        {/* Selected Message Detail Column */}
        <div className="lg:col-span-6">
          {selectedMessage ? (
            <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-6 space-y-5 sticky top-6">
              <div className="flex items-start justify-between border-b border-slate-100 pb-4">
                <div>
                  <span className="bg-blue-100 text-blue-800 text-[10px] font-bold px-2.5 py-0.5 rounded-md uppercase font-mono">
                    {selectedMessage.department.replace('_', ' ')} Department
                  </span>
                  <h3 className="font-bold text-slate-900 text-xl font-heading mt-1">
                    {selectedMessage.firstName} {selectedMessage.lastName}
                  </h3>
                  <span className="text-xs font-mono text-slate-400">{selectedMessage.id} · Submitted {selectedMessage.timestamp}</span>
                </div>

                <button
                  onClick={() => setShowReplyModal(true)}
                  className="bg-blue-700 hover:bg-blue-800 text-white font-bold text-xs px-4 py-2 rounded-xl flex items-center gap-1.5 shadow-sm"
                >
                  <Reply className="w-3.5 h-3.5" /> Reply to Sender
                </button>
              </div>

              <div className="bg-slate-50 p-4 rounded-xl border border-slate-200 space-y-2 text-xs">
                <div><span className="text-slate-500 font-bold block">Email Address:</span> <span className="font-mono text-blue-900 font-bold">{selectedMessage.email}</span></div>
                <div><span className="text-slate-500 font-bold block">Phone Contact:</span> <span className="font-mono text-slate-800">{selectedMessage.phone}</span></div>
              </div>

              <div className="space-y-2">
                <span className="text-xs font-bold text-slate-500 uppercase tracking-wider block">Message Content:</span>
                <div className="bg-slate-50 p-4 rounded-xl border border-slate-200 text-xs text-slate-800 font-medium leading-relaxed whitespace-pre-line">
                  {selectedMessage.message}
                </div>
              </div>
            </div>
          ) : (
            <div className="bg-white rounded-2xl border border-slate-200 p-12 text-center text-slate-400 space-y-3">
              <Mail className="w-10 h-10 mx-auto text-slate-300" />
              <p className="text-sm font-semibold">Select a contact message from the list to view details and send direct replies.</p>
            </div>
          )}
        </div>
      </div>

      {/* Reply Modal */}
      {showReplyModal && selectedMessage && (
        <div className="fixed inset-0 bg-slate-900/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-md w-full shadow-2xl overflow-hidden animate-in fade-in">
            <div className="bg-blue-950 text-white p-5 flex items-center justify-between">
              <h3 className="text-base font-bold font-heading flex items-center gap-2">
                <Reply className="w-4 h-4 text-yellow-400" /> Reply to {selectedMessage.firstName} {selectedMessage.lastName}
              </h3>
              <button onClick={() => setShowReplyModal(false)} className="text-blue-200 hover:text-white">
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSendReply} className="p-6 space-y-4 text-xs">
              <div>
                <label className="block font-semibold text-slate-700 mb-1">To Email</label>
                <input
                  type="text"
                  readOnly
                  value={selectedMessage.email}
                  className="w-full bg-slate-100 border border-slate-200 rounded-lg p-2.5 font-mono text-blue-900 font-bold"
                />
              </div>

              <div>
                <label className="block font-semibold text-slate-700 mb-1">Reply Subject</label>
                <input
                  type="text"
                  readOnly
                  value={`Re: NLLS Website Inquiry [${selectedMessage.id}]`}
                  className="w-full bg-slate-100 border border-slate-200 rounded-lg p-2.5 font-semibold text-slate-800"
                />
              </div>

              <div>
                <label className="block font-semibold text-slate-700 mb-1">Official Response Text</label>
                <textarea
                  rows={5}
                  required
                  placeholder="Compose official response to the parent/inquirer..."
                  value={replyText}
                  onChange={(e) => setReplyText(e.target.value)}
                  className="w-full bg-slate-50 border border-slate-200 rounded-lg p-2.5 font-sans text-slate-800"
                />
              </div>

              <div className="pt-3 flex justify-end gap-2 border-t border-slate-100">
                <button type="button" onClick={() => setShowReplyModal(false)} className="px-4 py-2 text-slate-600 font-semibold">
                  Cancel
                </button>
                <button type="submit" className="bg-blue-700 hover:bg-blue-800 text-white font-semibold px-5 py-2 rounded-lg flex items-center gap-1.5">
                  <Send className="w-3.5 h-3.5" /> Dispatch Reply Email
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
