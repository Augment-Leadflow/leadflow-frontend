'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { LeadAPI, TelegramAPI } from '@/app/services/apiService';
import type { LeadDTO } from '@/app/services/apiService';
import { noteService } from '@/app/services/noteService';
import type { Note } from '@/app/services/noteService';
import {
  Home,
  LayoutDashboard,
  ArrowLeft,
  Users,
  CheckCircle,
  LogOut,
  Plus,
  Search,
  Edit2,
  Trash2,
  X,
  PhoneCall,
  XCircle,
  TrendingUp,
  BarChart2,
  MessageSquare,
  Send,
  AlertCircle,
  ChevronDown,
  Phone,
  FileText
} from 'lucide-react';

type FilterType = 'HOME' | 'ALL' | 'NEW' | 'CONTACTED' | 'CONVERTED' | 'LOST';

const EMPTY_FORM = {
  id: null as string | null,
  name: '',
  phone: '',
  email: '',
  source: '',
  status: 'NEW' as LeadDTO['status'],
  notes: '',
  createdAt: '',
};

const STATUS_CONFIG: Record<
  string,
  { label: string; color: string; bg: string; icon: React.ReactNode }
> = {
  NEW: {
    label: 'New',
    color: 'text-indigo-700',
    bg: 'bg-indigo-100',
    icon: <Users className="w-3.5 h-3.5" />,
  },
  CONTACTED: {
    label: 'Contacted',
    color: 'text-amber-700',
    bg: 'bg-amber-100',
    icon: <PhoneCall className="w-3.5 h-3.5" />,
  },
  CONVERTED: {
    label: 'Converted',
    color: 'text-emerald-700',
    bg: 'bg-emerald-100',
    icon: <CheckCircle className="w-3.5 h-3.5" />,
  },
  LOST: {
    label: 'Lost',
    color: 'text-rose-700',
    bg: 'bg-rose-100',
    icon: <XCircle className="w-3.5 h-3.5" />,
  },
};

const NAV_ITEMS: {
  filter: FilterType;
  label: string;
  icon: React.ReactNode;
  color?: string;
}[] = [
  { filter: 'HOME', label: 'Home', icon: <Home className="w-5 h-5" /> },
  { filter: 'ALL', label: 'All Leads', icon: <LayoutDashboard className="w-5 h-5" /> },
  { filter: 'NEW', label: 'New Leads', icon: <Users className="w-5 h-5" />, color: 'text-indigo-300' },
  { filter: 'CONTACTED', label: 'Contacted', icon: <PhoneCall className="w-5 h-5" />, color: 'text-amber-300' },
  { filter: 'CONVERTED', label: 'Converted', icon: <CheckCircle className="w-5 h-5" />, color: 'text-emerald-300' },
  { filter: 'LOST', label: 'Lost', icon: <XCircle className="w-5 h-5" />, color: 'text-rose-300' },
]; 

export default function DashboardPage() {
  const [leads, setLeads] = useState<LeadDTO[]>([]);
  const [filter, setFilter] = useState<FilterType>('HOME');
  const [search, setSearch] = useState('');
  const [isModalOpen, setModal] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState<typeof EMPTY_FORM>({ ...EMPTY_FORM });
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [loading, setLoading] = useState<boolean>(true);

  const [isMessageModalOpen, setMessageModal] = useState(false);
  const [selectedLeadForMessage, setSelectedLeadForMessage] = useState<LeadDTO | null>(null);
  const [messageText, setMessageText] = useState('');
  const [isSendingMessage, setIsSendingMessage] = useState(false);

  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [leadToDelete, setLeadToDelete] = useState<LeadDTO | null>(null);
  const [isDeleting, setIsDeleting] = useState(false);

  const [notes, setNotes] = useState<Note[]>([]);
  const [isNotesModalOpen, setIsNotesModalOpen] = useState(false);
  const [notesTab, setNotesTab] = useState<'view' | 'add'>('view');
  const [noteForm, setNoteForm] = useState({ id: null as number | null, content: '' });

  // Field-specific error state for Create/Edit Lead Form
  const [formFieldErrors, setFormFieldErrors] = useState({ name: '', email: '', phone: '' });

  const [toast, setToast] = useState<{
    show: boolean;
    title: string;
    message: string;
    type: 'success' | 'error';
  }>({ show: false, title: '', message: '', type: 'success' });

  const showToast = (title: string, message: string, type: 'success' | 'error' = 'success') => {
    setToast({ show: true, title, message, type });
    setTimeout(() => {
      setToast((prev) => ({ ...prev, show: false }));
    }, 3500);
  };

  const fetchDashboardData = async () => {
    try {
      setLoading(true);
      const data = await LeadAPI.getAll();
      setLeads(data);
    } catch (error) {
      console.error('Failed to fetch leads:', error);
      setLeads([]);
    } finally {
      setLoading(false);
    }
  };

  const fetchNotesData = async () => {
    try {
      const data = await noteService.getUserNotes();
      setNotes(data);
    } catch (error) {
      console.error('Failed to fetch notes:', error);
    }
  };

  useEffect(() => {
    fetchDashboardData();
    fetchNotesData();
  }, []);

  const filteredLeads = leads.filter((l) => {
    const matchesFilter = filter === 'ALL' || l.status === filter;
    
    const searchTarget = search.toLowerCase().trim();
    if (!searchTarget) return matchesFilter;

    const matchesName = l.name?.toLowerCase().includes(searchTarget) ?? false;
    const matchesEmail = l.email?.toLowerCase().includes(searchTarget) ?? false;
    const matchesPhone = l.phone?.includes(searchTarget) ?? false;

    return matchesFilter && (matchesName || matchesEmail || matchesPhone);
  });

  const handleSendMessageSubmit = async (e: React.FormEvent) => {
    e.preventDefault(); 
    if (!messageText.trim() || !selectedLeadForMessage) return;

    try {
      setIsSendingMessage(true);
      await TelegramAPI.send({
        name: selectedLeadForMessage.name,
        phone: selectedLeadForMessage.phone,
        source: selectedLeadForMessage.source || 'Direct',
        type: "MANUAL",
        message: messageText.trim(),
        leadChatId: selectedLeadForMessage.telegramChatId || ''
      });
      showToast('Success', `Notification tracking triggered for ${selectedLeadForMessage.name}!`, 'success');
      setMessageText(''); 
      setMessageModal(false); 
    } catch (error) {
      console.error('Failed to send dynamic API notification request:', error);
      showToast('Error', 'Failed to submit notification to Java server.', 'error');
    } finally {
      setIsSendingMessage(false);
    }
  };

  const counts = {
    ALL: leads.length,
    NEW: leads.filter((l) => l.status === 'NEW').length,
    CONTACTED: leads.filter((l) => l.status === 'CONTACTED').length,
    CONVERTED: leads.filter((l) => l.status === 'CONVERTED').length,
    LOST: leads.filter((l) => l.status === 'LOST').length,
  };

  const openCreate = () => {
    setFormData({ ...EMPTY_FORM });
    setFormFieldErrors({ name: '', email: '', phone: '' }); 
    setIsEditing(false);
    setModal(true);
  };

  const openEdit = (lead: LeadDTO) => {
    setFormData({
      id: lead.id ?? '',
      name: lead.name,
      phone: lead.phone,
      email: lead.email,
      source: lead.source,
      status: lead.status,
      notes: lead.notes,
      createdAt: lead.createdAt ?? ''
    });
    setFormFieldErrors({ name: '', email: '', phone: '' }); 
    setIsEditing(true);
    setModal(true);
  };

  const openMessageModal = (lead: LeadDTO) => {
    setSelectedLeadForMessage(lead);
    setMessageText('');
    setMessageModal(true);
  };

  const openDeleteModal = (lead: LeadDTO) => {
    setLeadToDelete(lead);
    setIsDeleteModalOpen(true);
  };

  const validateLeadForm = () => {
    let isValid = true;
    const errors = { name: '', email: '', phone: '' };

    if (!formData.name?.trim()) {
      errors.name = 'Full name is required';
      isValid = false;
    } else if (formData.name.trim().length < 3) {
      errors.name = 'Name must be at least 3 characters long';
      isValid = false;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!formData.email?.trim()) {
      errors.email = 'Email address is required';
      isValid = false;
    } else if (!emailRegex.test(formData.email.trim())) {
      errors.email = 'Please enter a valid email profile';
      isValid = false;
    }

    const phoneRegex = /^[0-9]{10}$/;
    if (!formData.phone?.trim()) {
      errors.phone = 'Phone number is required';
      isValid = false;
    } else if (!phoneRegex.test(formData.phone.trim().replace(/[\s-]/g, ''))) {
      errors.phone = 'Please enter a valid 10-digit mobile number';
      isValid = false;
    }

    setFormFieldErrors(errors);
    return isValid;
  };

  const handleSave = async () => {
    if (!validateLeadForm()) {
      showToast('Validation Failed', 'Please fix the errors highlighted in the form.', 'error');
      return;
    }

    const inputEmail = formData.email.trim().toLowerCase();

    // ── 🌟 DUPLICATE EMAIL CHECK RULES ──
    if (!isEditing) {
      const isDuplicate = leads.some(lead => lead.email?.trim().toLowerCase() === inputEmail);
      if (isDuplicate) {
        setFormFieldErrors(prev => ({ ...prev, email: 'A lead with this email address already exists.' }));
        showToast('Duplicate Lead', 'Cannot create multiple leads with the same email.', 'error');
        return; 
      }
    } else {
      const isDuplicateOnOtherLead = leads.some(
        lead => lead.email?.trim().toLowerCase() === inputEmail && lead.id !== formData.id
      );
      if (isDuplicateOnOtherLead) {
        setFormFieldErrors(prev => ({ ...prev, email: 'This email is already taken by another lead.' }));
        showToast('Duplicate Error', 'Email profile is already assigned to a different lead.', 'error');
        return;
      }
    }
      
    try {
      const leadData = {
        name: formData.name.trim(),
        email: formData.email.trim(),
        phone: formData.phone.trim(),
        source: formData.source,
        notes: formData.notes,
        status: formData.status
      };
 
      if (isEditing && formData.id !== null && formData.id !== '') {
        await LeadAPI.update(formData.id, leadData);
        showToast('Success', 'Lead information updated smoothly.');
      } else {
        await LeadAPI.create(leadData);
        showToast('Created', 'New lead profile initialized successfully.');
      }
      setModal(false);
      fetchDashboardData();
    } catch (error) {
      console.error('Failed to save lead:', error);
      showToast('Error', 'Failed to store configurations. Server mismatch.', 'error');
    }
  };

  const confirmDeleteLead = async () => {
    if (!leadToDelete || !leadToDelete.id) return;

    try {
      setIsDeleting(true);
      await LeadAPI.delete(leadToDelete.id);
      showToast('Lead Deleted', `${leadToDelete.name || 'The lead'} has been completely cleared out.`, 'success');
      setIsDeleteModalOpen(false);
      setLeadToDelete(null);
      fetchDashboardData();
    } catch (error) {
      console.error('Failed to delete lead:', error);
      showToast('Delete Failed', 'Could not run removal on database servers.', 'error');
    } finally {
      setIsDeleting(false);
    }
  };

  const handleSaveNote = async () => {
    if (!noteForm.content.trim()) {
      showToast('Validation Error', 'Note content cannot be empty.', 'error');
      return;
    }

    try {
      if (noteForm.id !== null) {
        await noteService.updateNote(noteForm.id, { content: noteForm.content });
        showToast('Success', 'Note updated successfully.');
      } else {
        await noteService.createNote({ content: noteForm.content });
        showToast('Success', 'New note created successfully.');
      }
      setNoteForm({ id: null, content: '' });
      setNotesTab('view');
      fetchNotesData();
    } catch (error) {
      console.error('Failed to save note:', error);
      showToast('Error', 'Failed to process note persistence.', 'error');
    }
  };

  const handleEditNoteClick = (note: Note) => {
    if (note.id !== undefined) {
      setNoteForm({ id: note.id, content: note.content ?? '' });
      setNotesTab('add');
    }
  };

  const handleDeleteNoteClick = async (id: number) => {
    try {
      await noteService.deleteNote(id);
      showToast('Deleted', 'Note successfully removed.');
      fetchNotesData();
    } catch (error) {
      console.error('Failed to delete note:', error);
      showToast('Error', 'Could not delete the selected note.', 'error');
    }
  };

  // ── 🌟 NEW: Safe Structural Declarations Area ──
  const handleLogout = () => {
    localStorage.clear();
    sessionStorage.clear();
    document.cookie = "token=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
    showToast('Logged Out', 'Your session has been securely closed.', 'success');
    setTimeout(() => {
      window.location.href = '/';
    }, 1000);
  };

  const conversionRate = leads.length > 0 ? Math.round((counts.CONVERTED / leads.length) * 100) : 0;

  return (
    <div className="relative min-h-screen w-full flex bg-[url('/bg.jpg')] bg-cover bg-center bg-no-repeat text-slate-900">
      
      {toast.show && (
        <div className="fixed top-6 right-6 z-[100] flex items-center gap-3 bg-white border-l-4 border-indigo-600 rounded-xl px-4 py-3.5 shadow-2xl min-w-[300px] max-w-sm border border-slate-100 transition-all duration-300">
          {toast.type === 'success' ? (
            <CheckCircle className="w-5 h-5 text-emerald-500 flex-shrink-0" />
          ) : (
            <AlertCircle className="w-5 h-5 text-rose-500 flex-shrink-0" />
          )}
          <div className="flex-1">
            <p className="text-xs font-bold text-slate-900 tracking-wide uppercase">{toast.title}</p>
            <p className="text-xs text-slate-500 mt-0.5 font-medium">{toast.message}</p>
          </div>
          <button onClick={() => setToast((prev) => ({ ...prev, show: false }))} className="text-slate-300 hover:text-slate-500 p-0.5 rounded-md transition-colors">
            <X className="w-4 h-4" />
          </button>
        </div>
      )}

      {sidebarOpen && (
        <div className="fixed inset-0 z-30 bg-black/40 md:hidden" onClick={() => setSidebarOpen(false)} />
      )}

      <aside className={`fixed md:static inset-y-0 left-0 z-40 w-64 bg-slate-900 text-white flex flex-col h-full flex-shrink-0 transform transition-transform duration-300 ${sidebarOpen ? 'translate-x-0' : '-translate-x-full md:translate-x-0'}`}>
        <div className="flex flex-col flex-1 min-h-0">
          <div className="flex items-center gap-2 px-4 py-5 border-b border-slate-700/60 flex-shrink-0">
            <Link href="/" title="Back to Website" className="p-1.5 text-slate-400 hover:text-white hover:bg-slate-800 rounded-lg transition-colors flex items-center justify-center">
              <ArrowLeft className="w-5 h-5" />
            </Link>
            <div className="flex items-center gap-2 ml-1">
              <div className="w-8 h-8 rounded-xl bg-indigo-600 flex items-center justify-center shadow-lg shadow-indigo-600/40">
                <TrendingUp className="w-4 h-4 text-white" />
              </div>
              <span className="text-base font-extrabold tracking-tight">LeadFlow</span>
            </div>
          </div>

          <nav className="flex-1 px-4 py-6 space-y-1 overflow-y-auto">
            {NAV_ITEMS.map(({ filter: f, label, icon, color }) => {
              const active = filter === f;
              return (
                <button
                  key={f}
                  type="button"
                  onClick={() => {
                    setFilter(f);
                    setSidebarOpen(false);
                  }}
                  className={`w-full text-left px-3 py-2.5 rounded-xl flex items-center justify-between gap-3 transition-all duration-150 ${active ? 'bg-indigo-600 text-white shadow-lg shadow-indigo-600/30' : 'text-slate-400 hover:bg-slate-800 hover:text-white'}`}
                >
                  <span className={`flex items-center gap-3 ${active ? 'text-white' : color}`}>
                    {icon}
                    <span className="text-sm font-semibold">{label}</span>
                  </span>
                  {f !== 'HOME' && (
                    <span className={`text-xs font-bold px-2 py-0.5 rounded-full ${active ? 'bg-white/20 text-white' : 'bg-slate-700 text-slate-400'}`}>
                      {f === 'ALL' ? counts.ALL : counts[f as keyof typeof counts] || 0}
                    </span>
                  )}
                </button>
              );
            })}

            <div className="pt-6">
              <p className="text-slate-500 text-xs font-bold uppercase tracking-widest px-3 mb-3">Analytics</p>
              <div className="px-3 py-4 bg-slate-800 rounded-xl space-y-3">
                <div className="flex justify-between text-sm">
                  <span className="text-slate-400">Conversion Rate</span>
                  <span className="text-emerald-400 font-bold">{conversionRate}%</span>
                </div>
                <div className="w-full h-2 bg-slate-700 rounded-full overflow-hidden">
                  <div className="h-full bg-gradient-to-r from-emerald-500 to-teal-400 rounded-full transition-all" style={{ width: `${conversionRate}%` }} />
                </div>
                <div className="flex justify-between text-xs text-slate-500">
                  <span>{counts.CONVERTED} converted</span>
                  <span>{leads.length} total</span>
                </div>
              </div>
            </div>
          </nav>
        </div>

        {/* ── 🌟 UPDATED Logout Button trigger layout ── */}
        <div className="p-4 border-t border-slate-800 bg-slate-950/40 space-y-1.5 flex-shrink-0">
          <button 
            type="button" 
            onClick={handleLogout} 
            className="w-full flex items-center gap-3 px-3 py-2.5 text-slate-400 hover:text-rose-400 hover:bg-rose-950/20 rounded-xl transition-all duration-150 text-sm font-semibold border border-transparent hover:border-rose-900/30 text-left"
          >
            <LogOut className="w-4 h-4" />
            <span>Log Out</span>
          </button>
        </div>
      </aside>

      <main className="flex-1 flex flex-col h-full overflow-hidden bg-white/80 backdrop-blur-md">
        {filter === 'HOME' && (
          <div className="bg-white border-b border-slate-100 px-6 py-3.5 animate-fade-in flex-shrink-0">
            <h1 className="text-[32px] font-black text-[#4F46E5] tracking-wide uppercase">
              Welcome to LeadFlow!!!!!
            </h1>
          </div>
        )}

        <header className="bg-white border-b border-slate-100 px-6 py-4 flex items-center gap-4 sticky top-0 z-20 flex-shrink-0">
          <button type="button" onClick={() => setSidebarOpen(true)} className="md:hidden p-2 text-slate-500 hover:text-slate-900 hover:bg-slate-100 rounded-lg">
            <BarChart2 className="w-5 h-5" />
          </button>

          <div className="relative flex-1 max-w-sm md:max-w-md">
            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
            <input
              type="text"
              placeholder="Search…"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full pl-10 pr-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-all"
            />
          </div>

          <div className="ml-auto flex items-center gap-2 md:gap-3">
            <button
              type="button"
              onClick={() => {
                setNoteForm({ id: null, content: '' });
                setNotesTab('view');
                setIsNotesModalOpen(true);
              }}
              className="flex items-center gap-2 bg-slate-100 hover:bg-slate-200 text-slate-700 px-4 py-2.5 rounded-xl text-sm font-bold border border-slate-200 transition-colors"
            >
              <FileText className="w-4 h-4 text-indigo-600" />
              <span>Notes</span>
            </button>

            <button type="button" onClick={openCreate} className="flex items-center gap-2 bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2.5 rounded-xl text-sm font-bold shadow-lg shadow-indigo-600/30 transition-colors">
              <Plus className="w-4 h-4" />
              <span>New Lead</span>
            </button>
          </div>
        </header>

        <div className="flex-1 p-6 overflow-y-auto">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 mb-6">
            <div className="bg-white p-5 rounded-2xl border border-slate-100 shadow-sm flex items-center justify-between">
              <div>
                <p className="text-xs font-bold text-slate-400 uppercase tracking-wider">Total Leads</p>
                <h3 className="text-2xl font-extrabold text-slate-800 mt-1">{counts.ALL}</h3>
              </div>
              <div className="w-12 h-12 bg-indigo-50 rounded-xl flex items-center justify-center text-indigo-600">
                <LayoutDashboard className="w-6 h-6" />
              </div>
            </div>

            <div className="bg-white p-5 rounded-2xl border border-slate-100 shadow-sm flex items-center justify-between">
              <div>
                <p className="text-xs font-bold text-slate-400 uppercase tracking-wider">Converted Leads</p>
                <h3 className="text-2xl font-extrabold text-slate-800 mt-1">{counts.CONVERTED}</h3>
              </div>
              <div className="w-12 h-12 bg-emerald-50 rounded-xl flex items-center justify-center text-emerald-600">
                <CheckCircle className="w-6 h-6" />
              </div>
            </div>
          </div>

          {filter !== 'HOME' && (
            <div className="bg-white rounded-2xl border border-slate-100 shadow-sm overflow-hidden animate-fade-in">
              <div className="px-6 py-4 border-b border-slate-100 flex items-center justify-between">
                <h2 className="font-bold text-slate-900">{filter === 'ALL' ? 'All Leads' : STATUS_CONFIG[filter]?.label + ' Leads'}</h2>
                {search && (
                  <button type="button" onClick={() => setSearch('')} className="text-xs text-slate-400 hover:text-slate-700 flex items-center gap-1">
                    <X className="w-3 h-3" /> Clear search
                  </button>
                )}
              </div>

              <div className="overflow-x-auto">
                <table className="w-full text-left border-collapse min-w-[720px] table-fixed">
                  <thead>
                    <tr className="bg-slate-50 text-slate-500 text-xs uppercase tracking-wider">
                      <th className="w-[22%] px-6 py-3 font-semibold border-b border-slate-100">Name</th>
                      <th className="w-[24%] px-4 py-3 font-semibold border-b border-slate-100">Email</th>
                      <th className="w-[18%] px-4 py-3 font-semibold border-b border-slate-100">Phone</th>
                      <th className="w-[14%] px-4 py-3 font-semibold border-b border-slate-100">Source</th>
                      <th className="w-[12%] px-4 py-3 font-semibold border-b border-slate-100">Status</th>
                      <th className="w-[10%] pr-6 py-3 font-semibold border-b border-slate-100 text-right">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-50 text-sm">
                    {filteredLeads.length === 0 ? (
                      <tr>
                        <td colSpan={6} className="px-6 py-16 text-center">
                          <div className="flex flex-col items-center gap-2 text-slate-400">
                            <Users className="w-10 h-10 opacity-30" />
                            <p className="font-semibold text-slate-500">No leads found</p>
                            <p className="text-sm">{search ? 'Try a different search term' : 'Create your first lead to get started'}</p>
                          </div>
                        </td>
                      </tr>
                    ) : (
                      filteredLeads.map((lead) => {
                        const st = STATUS_CONFIG[lead.status];
                        return (
                          <tr key={lead.id} className="hover:bg-slate-50/70 transition-colors group">
                            <td className="px-6 py-3.5 truncate font-medium text-slate-900">
                              <div className="flex items-center gap-3 truncate">
                                <div className="w-8 h-8 rounded-full bg-indigo-100 text-indigo-700 flex items-center justify-center text-xs font-bold flex-shrink-0">
                                  {lead.name.split(' ').map((n) => n[0]).join('').toUpperCase().slice(0, 2)}
                                </div>
                                <div className="truncate">
                                  <p className="font-semibold text-slate-900 text-sm truncate">{lead.name}</p>
                                  <p className="text-[11px] text-slate-400">{lead.createdAt || 'Just now'}</p>
                                </div>
                              </div>
                            </td>
                            <td className="px-4 py-3.5 truncate text-slate-600">
                              {lead.email ? (
                                <a href={`mailto:${lead.email}`} className="hover:text-indigo-600 hover:underline block truncate">{lead.email}</a>
                              ) : (
                                <span className="text-slate-400 italic">None</span>
                              )}
                            </td>
                            <td className="px-4 py-3.5 truncate text-slate-600">
                              <a href={`tel:${lead.phone}`} className="hover:text-indigo-600 block truncate">{lead.phone}</a>
                            </td>
                            <td className="px-4 py-3.5 truncate text-slate-500">{lead.source || 'Direct'}</td>
                            <td className="px-4 py-3.5 whitespace-nowrap">
                              <span className={`inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-bold ${st.bg} ${st.color}`}>{st.label}</span>
                            </td>
                            <td className="pr-6 py-3.5 text-right whitespace-nowrap">
                              <div className="flex items-center justify-end gap-0.5">
                                <button type="button" onClick={() => openMessageModal(lead)} className="p-1.5 text-slate-400 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors">
                                  <MessageSquare className="w-4 h-4" />
                                </button>
                                <button type="button" onClick={() => openEdit(lead)} className="p-1.5 text-slate-400 hover:text-indigo-600 hover:bg-indigo-50 rounded-lg transition-colors">
                                  <Edit2 className="w-4 h-4" />
                                </button>
                                <button type="button" onClick={() => lead.id && openDeleteModal(lead)} className="p-1.5 text-slate-400 hover:text-rose-500 hover:bg-rose-50 rounded-lg transition-colors">
                                  <Trash2 className="w-4 h-4" />
                                </button>
                              </div>
                            </td>
                          </tr>
                        );
                      })
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          )}
        </div>
      </main>

      {/* Notes Modal */}
      {isNotesModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm animate-fade-in">
          <div className="bg-white w-full max-w-lg rounded-2xl shadow-2xl overflow-hidden flex flex-col max-h-[85vh]">
            <div className="px-6 py-5 border-b border-slate-100 flex justify-between items-center bg-slate-50 flex-shrink-0">
              <h2 className="text-xl font-extrabold text-slate-900 tracking-tight">Notes</h2>
              <button type="button" onClick={() => setIsNotesModalOpen(false)} className="p-2 hover:bg-slate-200 rounded-full text-slate-500 transition-colors">
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="flex border-b border-slate-100 bg-slate-50/50 px-6 pt-2 flex-shrink-0">
              <button
                type="button"
                onClick={() => setNotesTab('view')}
                className={`px-4 py-2.5 text-sm font-bold border-b-2 transition-all ${notesTab === 'view' ? 'border-indigo-600 text-indigo-600' : 'border-transparent text-slate-500 hover:text-slate-800'}`}
              >
                View Notes
              </button>
              <button
                type="button"
                onClick={() => {
                  setNoteForm({ id: null, content: '' });
                  setNotesTab('add');
                }}
                className={`px-4 py-2.5 text-sm font-bold border-b-2 transition-all ${notesTab === 'add' ? 'border-indigo-600 text-indigo-600' : 'border-transparent text-slate-500 hover:text-slate-800'}`}
              >
                {noteForm.id !== null ? 'Edit Note' : 'Add Note'}
              </button>
            </div>

            <div className="flex-1 overflow-y-auto p-6">
              {notesTab === 'view' ? (
                <div className="space-y-3">
                  {notes.length === 0 ? (
                    <div className="text-center py-12 text-slate-400">
                      <FileText className="w-10 h-10 mx-auto opacity-30 mb-2" />
                      <p className="font-semibold text-slate-500">No notes recorded yet</p>
                      <p className="text-xs mt-0.5">Switch to the Add Note tab to create one.</p>
                    </div>
                  ) : (
                    notes.map((note) => (
                      <div key={note.id} className="bg-slate-50 rounded-xl border border-slate-200 p-4 shadow-sm animate-fade-in">
                        <p className="text-sm text-slate-700 whitespace-pre-wrap leading-relaxed">{note.content}</p>
                        
                        <div className="flex items-center justify-end gap-2 mt-4 pt-3 border-t border-slate-200/60">
                          <button
                            type="button"
                            onClick={() => handleEditNoteClick(note)}
                            className="flex items-center gap-1.5 px-3 py-1.5 bg-white hover:bg-indigo-50 text-slate-600 hover:text-indigo-600 rounded-lg text-xs font-semibold transition-colors border border-slate-200 hover:border-indigo-100"
                          >
                            <Edit2 className="w-3 h-3" />
                            <span>Edit</span>
                          </button>
                          <button
                            type="button"
                            onClick={() => note.id !== undefined && handleDeleteNoteClick(note.id)}
                            className="flex items-center gap-1.5 px-3 py-1.5 bg-white hover:bg-rose-50 text-slate-600 hover:text-rose-600 rounded-lg text-xs font-semibold transition-colors border border-slate-200 hover:border-rose-100"
                          >
                            <Trash2 className="w-3 h-3" />
                            <span>Delete</span>
                          </button>
                        </div>
                      </div>
                    ))
                  )}
                </div>
              ) : (
                <div className="space-y-4">
                  <div>
                    <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">Write Note *</label>
                    <textarea
                      rows={6}
                      value={noteForm.content}
                      onChange={(e) => setNoteForm({ ...noteForm, content: e.target.value })}
                      placeholder="Write your note description here…"
                      className="w-full p-3 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 text-slate-800 transition-all resize-none"
                    />
                  </div>
                  <div className="flex gap-3 pt-2">
                    <button
                      type="button"
                      onClick={() => {
                        setNoteForm({ id: null, content: '' });
                        setNotesTab('view');
                      }}
                      className="flex-1 py-2.5 bg-white border border-slate-200 text-slate-700 font-bold rounded-xl text-xs hover:bg-slate-100 transition-colors"
                    >
                      Cancel
                    </button>
                    <button
                      type="button"
                      onClick={handleSaveNote}
                      className="flex-1 py-2.5 bg-indigo-600 text-white font-bold rounded-xl text-xs shadow-md hover:bg-indigo-700 transition-colors"
                    >
                      Save Note
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      {/* ── 📊 Create / Edit Lead Modal ── */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm">
          <div className="bg-white w-full max-w-md mx-4 rounded-2xl shadow-2xl overflow-hidden transform transition-all animate-fade-in border border-slate-100">
            <div className="px-6 py-4 border-b border-slate-100 flex justify-between items-center bg-slate-50">
              <div>
                <h2 className="text-lg font-bold text-slate-900">{isEditing ? 'Edit Lead' : 'Create New Lead'}</h2>
                <p className="text-xs text-slate-500 mt-0.5">{isEditing ? 'Update lead information profile' : ''}</p>
              </div>
              <button type="button" onClick={() => setModal(false)} className="p-2 hover:bg-slate-200 rounded-full text-slate-500 transition-colors">
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="p-6 space-y-3.5 max-h-[65vh] overflow-y-auto">
              {/* Name Field Input Row */}
              <div className="space-y-1">
                <label className="block text-xs font-bold text-slate-600 uppercase tracking-wide">Full Name *</label>
                <input 
                  type="text" 
                  value={formData.name || ''} 
                  onChange={(e) => {
                    setFormData({ ...formData, name: e.target.value });
                    if (formFieldErrors.name) setFormFieldErrors(prev => ({ ...prev, name: '' }));
                  }} 
                  className={`w-full p-2.5 border rounded-xl text-sm focus:outline-none focus:ring-2 transition-all ${
                    formFieldErrors.name 
                      ? 'border-rose-400 focus:ring-rose-500/20 focus:border-rose-500' 
                      : 'border-slate-200 focus:ring-indigo-500/20 focus:border-indigo-500/50'
                  }`} 
                />
                {formFieldErrors.name && (
                  <p className="text-[11px] text-rose-400 font-medium ml-0.5 flex items-center gap-1 animate-in fade-in slide-in-from-top-1 duration-150">
                    <AlertCircle className="w-3 h-3" /> {formFieldErrors.name}
                  </p>
                )}
              </div>

              {/* Email Input Row */}
              <div className="space-y-1">
                <label className="block text-xs font-bold text-slate-600 uppercase tracking-wide">Email Address *</label>
                <input 
                  type="email" 
                  value={formData.email || ''} 
                  onChange={(e) => {
                    setFormData({ ...formData, email: e.target.value });
                    if (formFieldErrors.email) setFormFieldErrors(prev => ({ ...prev, email: '' }));
                  }} 
                  className={`w-full p-2.5 border rounded-xl text-sm focus:outline-none focus:ring-2 transition-all ${
                    formFieldErrors.email 
                      ? 'border-rose-400 focus:ring-rose-500/20 focus:border-rose-500' 
                      : 'border-slate-200 focus:ring-indigo-500/20 focus:border-indigo-500/50'
                  }`} 
                />
                {formFieldErrors.email && (
                  <p className="text-[11px] text-rose-400 font-medium ml-0.5 flex items-center gap-1 animate-in fade-in slide-in-from-top-1 duration-150">
                    <AlertCircle className="w-3 h-3" /> {formFieldErrors.email}
                  </p>
                )}
              </div>

              {/* Phone Input Row */}
              <div className="space-y-1">
                <label className="block text-xs font-bold text-slate-600 uppercase tracking-wide">Phone Number *</label>
                <input 
                  type="tel" 
                  value={formData.phone || ''} 
                  onChange={(e) => {
                    setFormData({ ...formData, phone: e.target.value });
                    if (formFieldErrors.phone) setFormFieldErrors(prev => ({ ...prev, phone: '' }));
                  }} 
                  className={`w-full p-2.5 border rounded-xl text-sm focus:outline-none focus:ring-2 transition-all ${
                    formFieldErrors.phone 
                      ? 'border-rose-400 focus:ring-rose-500/20 focus:border-rose-500' 
                      : 'border-slate-200 focus:ring-indigo-500/20 focus:border-indigo-500/50'
                  }`} 
                />
                {formFieldErrors.phone && (
                  <p className="text-[11px] text-rose-400 font-medium ml-0.5 flex items-center gap-1 animate-in fade-in slide-in-from-top-1 duration-150">
                    <AlertCircle className="w-3 h-3" /> {formFieldErrors.phone}
                  </p>
                )}
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-600 uppercase tracking-wide mb-1">Lead Source</label>
                <div className="relative">
                  <select value={formData.source || ''} onChange={(e) => setFormData({ ...formData, source: e.target.value })} className="w-full p-2.5 border border-slate-200 rounded-xl text-sm appearance-none bg-white focus:outline-none focus:ring-2 focus:ring-indigo-500/20 transition-all">
                    <option value="">Select source…</option>
                    {['LinkedIn', 'Google Ads', 'Referral', 'Website', 'Trade Show', 'Webinar', 'Other'].map((s) => (
                      <option key={s} value={s}>{s}</option>
                    ))}
                  </select>
                  <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 pointer-events-none" />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-600 uppercase tracking-wide mb-1.5">Status</label>
                <div className="grid grid-cols-2 gap-2">
                  { (['NEW', 'CONTACTED', 'CONVERTED', 'LOST'] as LeadDTO['status'][]).map((s) => {
                    const cfg = STATUS_CONFIG[s];
                    return (
                      <button
                        key={s}
                        type="button"
                        onClick={() => setFormData({ ...formData, status: s })}
                        className={`flex items-center justify-center p-2 rounded-xl border-2 text-xs font-bold transition-all ${formData.status === s ? `border-current ${cfg.color} ${cfg.bg}` : 'border-slate-200 text-slate-500 hover:border-slate-300'}`}
                      >
                        {cfg.label}
                      </button>
                    );
                  })}
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-600 uppercase tracking-wide mb-1">Notes</label>
                <textarea rows={2} value={formData.notes || ''} onChange={(e) => setFormData({ ...formData, notes: e.target.value })} className="w-full p-2.5 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500/20 transition-all resize-none" />
              </div>
            </div>

            <div className="px-6 py-4 border-t border-slate-100 flex gap-3 bg-slate-50">
              <button type="button" onClick={() => setModal(false)} className="flex-1 py-2.5 bg-white border border-slate-200 text-slate-700 font-bold rounded-xl hover:bg-slate-100 transition-colors text-xs">Cancel</button>
              <button type="button" onClick={handleSave} className="flex-1 py-2.5 bg-indigo-600 hover:bg-indigo-700 text-white font-bold rounded-xl shadow-lg text-xs transition-colors">{isEditing ? 'Save Changes' : 'Create Lead'}</button>
            </div>
          </div>
        </div>
      )}

      {/* Send Message Modal */}
      {isMessageModalOpen && selectedLeadForMessage && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm">
          <form onSubmit={handleSendMessageSubmit} className="bg-white w-full max-w-md rounded-2xl shadow-2xl overflow-hidden">
            <div className="px-6 py-4 border-b border-slate-100 flex justify-between items-center bg-slate-50">
              <div className="flex items-center gap-2">
                <MessageSquare className="w-5 h-5 text-indigo-600" />
                <h2 className="text-lg font-bold text-slate-900">Message</h2>
              </div>
              <button type="button" onClick={() => setMessageModal(false)} className="p-1.5 hover:bg-slate-200 rounded-full text-slate-500 transition-colors">
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="p-6 space-y-4">
              <div className="p-3 bg-slate-50 rounded-xl border border-slate-100">
                <p className="text-xs text-slate-500 font-medium">Recipient</p>
                <p className="text-sm font-semibold text-slate-800">{selectedLeadForMessage.name}</p>
                {selectedLeadForMessage.phone ? (
                  <p className="text-xs text-slate-600 font-semibold mt-1 flex items-center gap-1.5">
                    <Phone className="w-3.5 h-3.5 text-indigo-500 flex-shrink-0" />
                    <span>{selectedLeadForMessage.phone}</span>
                  </p>
                ) : (
                  <p className="text-xs text-slate-400 italic mt-1">No phone number registered</p>
                )}
              </div>
              <div>
                <label className="block text-xs font-bold text-slate-600 uppercase tracking-wider mb-1.5">Write Message</label>
                <textarea rows={4} required value={messageText} onChange={(e) => setMessageText(e.target.value)} placeholder="Type your follow-up note or custom message here..." className="w-full p-3 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-all resize-none text-slate-800" />
              </div>
            </div>

            <div className="px-6 py-3.5 border-t border-slate-100 flex gap-3 bg-slate-50 justify-end">
              <button type="button" onClick={() => setMessageModal(false)} className="px-4 py-2 bg-white border border-slate-200 text-slate-700 font-semibold rounded-xl hover:bg-slate-100 transition-colors text-xs">Cancel</button>
              <button type="submit" disabled={isSendingMessage || !messageText.trim()} className="px-4 py-2 bg-indigo-600 text-white font-semibold rounded-xl shadow-md transition-colors text-xs flex items-center gap-1.5 disabled:opacity-50">
                {isSendingMessage ? <div className="w-3.5 h-3.5 border-2 border-white/30 border-t-white rounded-full animate-spin" /> : <Send className="w-3.5 h-3.5" />}
                <span>{isSendingMessage ? 'Sending...' : 'Send Message'}</span>
              </button>
            </div>
          </form>
        </div>
      )}


      {/* Delete Lead Confirmation Modal */}
      {isDeleteModalOpen && leadToDelete && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm">
        <div className="bg-white w-full max-w-md mx-4 rounded-2xl shadow-2xl overflow-hidden transform transition-all animate-fade-in border border-slate-100">
            <div className="p-6 text-center">
              <div className="w-12 h-12 rounded-full bg-rose-100 text-rose-600 flex items-center justify-center mx-auto mb-4 shadow-sm">
                <AlertCircle className="w-6 h-6" />
              </div>
              <h3 className="text-lg font-bold text-slate-900">Delete Lead Profile?</h3>
              <p className="text-xs text-slate-500 mt-2 leading-relaxed">Are you sure you want to delete <span className="font-semibold text-slate-800">{leadToDelete.name}</span>? </p>
            </div>
            <div className="px-6 py-4 bg-slate-50 border-t border-slate-100 flex gap-3">
              <button type="button" disabled={isDeleting} onClick={() => { setIsDeleteModalOpen(false); setLeadToDelete(null); }} className="flex-1 py-2.5 bg-white border border-slate-200 text-slate-700 font-bold rounded-xl text-xs transition-colors hover:bg-slate-100 disabled:opacity-50">Cancel</button>
              <button type="button" disabled={isDeleting} onClick={confirmDeleteLead} className="flex-1 py-2.5 bg-rose-600 hover:bg-rose-700 text-white font-bold rounded-xl text-xs shadow-md shadow-rose-600/20 transition-all flex items-center justify-center gap-1.5 disabled:opacity-50">
                {isDeleting ? <div className="w-3.5 h-3.5 border-2 border-white/30 border-t-white rounded-full animate-spin" /> : <Trash2 className="w-3.5 h-3.5" />}
                <span>{isDeleting ? 'Deleting...' : 'Yes, Delete'}</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}