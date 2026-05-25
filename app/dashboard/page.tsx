// 'use client';

// import { useState, useEffect } from 'react';
// import Link from 'next/link';
// import { LeadAPI, TelegramAPI } from '@/app/services/apiService';
// import type { LeadDTO } from '@/app/services/apiService';
// import { TESTIMONIALS } from '@/app/lib/mockData';
// import {
//   Home,
//   LayoutDashboard,
//   Users,
//   CheckCircle,
//   LogOut,
//   Plus,
//   Search,
//   Edit2,
//   Trash2,
//   X,
//   PhoneCall,
//   XCircle,
//   TrendingUp,
//   BarChart2,
//   Mail,
//   Phone,
//   User,
//   FileText,
//   Globe,
//   ChevronDown,
//   MessageSquare,
//   Send,
//   AlertCircle,
// } from 'lucide-react';

// type FilterType = 'ALL' | 'NEW' | 'CONTACTED' | 'CONVERTED' | 'LOST';

// const EMPTY_FORM = {
//   id: null as string | null,
//   name: '',
//   phone: '',
//   email: '',
//   source: '',
//   status: 'NEW' as LeadDTO['status'],
//   notes: '',
//   createdAt: '',
//   telegramChatId: '', 
// };

// const STATUS_CONFIG: Record<
//   string,
//   { label: string; color: string; bg: string; icon: React.ReactNode }
// > = {
//   NEW: {
//     label: 'New',
//     color: 'text-indigo-700',
//     bg: 'bg-indigo-100',
//     icon: <Users className="w-3.5 h-3.5" />,
//   },
//   CONTACTED: {
//     label: 'Contacted',
//     color: 'text-amber-700',
//     bg: 'bg-amber-100',
//     icon: <PhoneCall className="w-3.5 h-3.5" />,
//   },
//   CONVERTED: {
//     label: 'Converted',
//     color: 'text-emerald-700',
//     bg: 'bg-emerald-100',
//     icon: <CheckCircle className="w-3.5 h-3.5" />,
//   },
//   LOST: {
//     label: 'Lost',
//     color: 'text-rose-700',
//     bg: 'bg-rose-100',
//     icon: <XCircle className="w-3.5 h-3.5" />,
//   },
// };

// const NAV_ITEMS: {
//   filter: FilterType;
//   label: string;
//   icon: React.ReactNode;
//   color?: string;
// }[] = [
//   {
//     filter: 'ALL',
//     label: 'All Leads',
//     icon: <LayoutDashboard className="w-5 h-5" />,
//   },
//   {
//     filter: 'NEW',
//     label: 'New Leads',
//     icon: <Users className="w-5 h-5" />,
//     color: 'text-indigo-300',
//   },
//   {
//     filter: 'CONTACTED',
//     label: 'Contacted',
//     icon: <PhoneCall className="w-5 h-5" />,
//     color: 'text-amber-300',
//   },
//   {
//     filter: 'CONVERTED',
//     label: 'Converted',
//     icon: <CheckCircle className="w-5 h-5" />,
//     color: 'text-emerald-300',
//   },
//   {
//     filter: 'LOST',
//     label: 'Lost',
//     icon: <XCircle className="w-5 h-5" />,
//     color: 'text-rose-300',
//   },
// ]; 

// // ─── ✅ FIXED SYNTAX ENGINE BOUNDARY HERE ───
// export default function DashboardPage() {
//   const [leads, setLeads] = useState<LeadDTO[]>([]);
//   const [filter, setFilter] = useState<FilterType>('ALL');
//   const [search, setSearch] = useState('');
//   const [isModalOpen, setModal] = useState(false);
//   const [isEditing, setIsEditing] = useState(false);
//   const [formData, setFormData] = useState<typeof EMPTY_FORM>({ ...EMPTY_FORM });
//   const [sidebarOpen, setSidebarOpen] = useState(false);
//   const [loading, setLoading] = useState<boolean>(true);

//   const [isMessageModalOpen, setMessageModal] = useState(false);
//   const [selectedLeadForMessage, setSelectedLeadForMessage] = useState<LeadDTO | null>(null);
//   const [messageText, setMessageText] = useState('');
//   const [isSendingMessage, setIsSendingMessage] = useState(false);

//   const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
//   const [leadToDelete, setLeadToDelete] = useState<LeadDTO | null>(null);
//   const [isDeleting, setIsDeleting] = useState(false);
  
//   const [toast, setToast] = useState<{
//     show: boolean;
//     title: string;
//     message: string;
//     type: 'success' | 'error';
//   }>({ show: false, title: '', message: '', type: 'success' });

//   const showToast = (title: string, message: string, type: 'success' | 'error' = 'success') => {
//     setToast({ show: true, title, message, type });
//     setTimeout(() => {
//       setToast((prev) => ({ ...prev, show: false }));
//     }, 3500);
//   };


//   const fetchDashboardData = async () => {
//     try {
//       setLoading(true);
      
    
//       const data = await LeadAPI.getAll();
      
  
//       setLeads(data);
//     } catch (error) {
//       console.error('Failed to fetch leads:', error);
//       setLeads([]);
//     } finally {
//       setLoading(false);
//     }
//   };

//   useEffect(() => {
//     fetchDashboardData();
//   }, []);

//   const filteredLeads = leads.filter((l) => {
//     const matchesFilter = filter === 'ALL' || l.status === filter;
    
//     const searchTarget = search.toLowerCase().trim();
//     if (!searchTarget) return matchesFilter;

//     const matchesName = l.name?.toLowerCase().includes(searchTarget) ?? false;
//     const matchesEmail = l.email?.toLowerCase().includes(searchTarget) ?? false;
//     const matchesPhone = l.phone?.includes(searchTarget) ?? false;

//     return matchesFilter && (matchesName || matchesEmail || matchesPhone);
//   });

//  // ─── 🚀 DIRECT BACKGROUND MESSAGE FLOW (NO REDIRECT) ───
//   const handleSendMessageSubmit = async (e: React.FormEvent) => {
//     e.preventDefault(); 
//     if (!messageText.trim() || !selectedLeadForMessage) return;

//     try {
//       setIsSendingMessage(true);
      
//       const rawPhone = selectedLeadForMessage.phone;
//       if (!rawPhone || rawPhone.trim() === '') {
//         showToast('Error', 'This lead does not have a valid phone number registered.', 'error');
//         return;
//       }

//       let cleanPhone = rawPhone.replace(/\D/g, '');
//       if (cleanPhone.length === 10) {
//         cleanPhone = '91' + cleanPhone;
//       }

//       const jwtToken = localStorage.getItem('token'); 

//       // Send raw payload packet directly to our Java backend system
//       const response = await fetch('http://localhost:8080/api/automation/direct-whatsapp', {
//         method: 'POST',
//         headers: {
//           'Content-Type': 'application/json',
//           'Authorization': jwtToken ? `Bearer ${jwtToken}` : '', 
//         },
//         body: JSON.stringify({
//           phone: '+' + cleanPhone, // Formats to international standard e.g. +916265094332
//           message: messageText.trim() 
//         }),
//       });

//       if (!response.ok) {
//         const errorText = await response.text();
//         throw new Error(errorText || 'Backend gateway rejected direct delivery packet');
//       }

//       showToast('Success', `Message dispatched directly to ${selectedLeadForMessage.name}'s phone!`, 'success');
//       setMessageText(''); 
//       setMessageModal(false); 
//     } catch (error: any) {
//       console.error('Failed to execute direct manual dispatch routing:', error);
//       showToast('Error', error.message || 'Failed to submit notification to Java server.', 'error');
//     } finally {
//       setIsSendingMessage(false);
//     }
//   };

//   // ─── ✅ Cleaned Remaining Code Matrix Block ───
//   const counts = {
//     ALL: leads.length,
//     NEW: leads.filter((l) => l.status === 'NEW').length,
//     CONTACTED: leads.filter((l) => l.status === 'CONTACTED').length,
//     CONVERTED: leads.filter((l) => l.status === 'CONVERTED').length,
//     LOST: leads.filter((l) => l.status === 'LOST').length,
//   };

//   const openCreate = () => {
//     setFormData({ ...EMPTY_FORM });
//     setIsEditing(false);
//     setModal(true);
//   };

//   const openEdit = (lead: LeadDTO) => {
//     setFormData({
//       id: lead.id ?? '',
//       name: lead.name,
//       phone: lead.phone,
//       email: lead.email,
//       source: lead.source,
//       status: lead.status,
//       notes: lead.notes,
//       createdAt: lead.createdAt ?? '',
//       telegramChatId: (lead as any).telegramChatId ?? '',
//     });
//     setIsEditing(true);
//     setModal(true);
//   };

//   const openMessageModal = (lead: LeadDTO) => {
//     setSelectedLeadForMessage(lead);
//     setMessageText('');
//     setMessageModal(true);
//   };
//   const openDeleteModal = (lead: LeadDTO) => {
//     setLeadToDelete(lead);
//     setIsDeleteModalOpen(true);
//   };

//   const handleSave = async () => {
//     const name = formData.name?.trim() ?? '';
//     const email = formData.email?.trim() ?? '';
//     const phone = formData.phone?.trim() ?? '';

//     if (!name || !email || !phone) {
//       showToast('Validation Failed', 'Please input all required values.', 'error');
//       return;
//     }
      
//     try {
//       const leadData = {
//         name: formData.name,
//         email: formData.email,
//         phone: formData.phone,
//         source: formData.source,
//         notes: formData.notes,
//         status: formData.status,
//         telegramChatId: formData.telegramChatId.trim(),
//       };
 
//       if (isEditing && formData.id !== null && formData.id !== '') {
//         await LeadAPI.update(formData.id, leadData);
//         showToast('Success', 'Lead information updated smoothly.');
//       } else {
//         await LeadAPI.create(leadData);
//         showToast('Created', 'New lead profile initialized successfully.');
//       }
//       setModal(false);
//       fetchDashboardData();
//     } catch (error) {
//       console.error('Failed to save lead:', error);
//       showToast('Error', 'Failed to store configurations.', 'error');
//     }
//   };

//   const confirmDeleteLead = async () => {
//     if (!leadToDelete || !leadToDelete.id) return;

//     try {
//       setIsDeleting(true);
//       await LeadAPI.delete(leadToDelete.id);
//       showToast('Lead Deleted', `${leadToDelete.name || 'The lead'} has been completely cleared out.`, 'success');
//       setIsDeleteModalOpen(false);
//       setLeadToDelete(null);
//       fetchDashboardData();
//     } catch (error) {
//       console.error('Failed to delete lead:', error);
//       showToast('Delete Failed', 'Could not run removal on database servers.', 'error');
//     } finally {
//       setIsDeleting(false);
//     }
//   };

//   const conversionRate =
//     leads.length > 0 ? Math.round((counts.CONVERTED / leads.length) * 100) : 0;

//   return (
//     <div className="relative min-h-screen w-full flex bg-slate-100 text-slate-900">
      
//       {toast.show && (
//         <div className="fixed top-6 right-6 z-[100] flex items-center gap-3 bg-white border-l-4 border-indigo-600 rounded-xl px-4 py-3.5 shadow-2xl min-w-[300px] max-w-sm border border-slate-100 transition-all duration-300">
//           {toast.type === 'success' ? (
//             <CheckCircle className="w-5 h-5 text-emerald-500 flex-shrink-0" />
//           ) : (
//             <AlertCircle className="w-5 h-5 text-rose-500 flex-shrink-0" />
//           )}
//           <div className="flex-1">
//             <p className="text-xs font-bold text-slate-900 tracking-wide uppercase">{toast.title}</p>
//             <p className="text-xs text-slate-500 mt-0.5 font-medium">{toast.message}</p>
//           </div>
//           <button onClick={() => setToast((prev) => ({ ...prev, show: false }))} className="text-slate-300 hover:text-slate-500 p-0.5 rounded-md transition-colors">
//             <X className="w-4 h-4" />
//           </button>
//         </div>
//       )}

//       {sidebarOpen && (
//         <div
//           className="fixed inset-0 z-30 bg-black/40 md:hidden"
//           onClick={() => setSidebarOpen(false)}
//         />
//       )}

//       <aside
//         className={`
//           fixed md:static inset-y-0 left-0 z-40 w-64 bg-slate-900 text-white flex flex-col h-full flex-shrink-0
//           transform transition-transform duration-300
//           ${sidebarOpen ? 'translate-x-0' : '-translate-x-full md:translate-x-0'}
//         `}
//       >
//         <div className="flex flex-col flex-1 min-h-0">
//           <div className="flex items-center gap-3 px-6 py-5 border-b border-slate-700/60 flex-shrink-0">
//             <div className="w-9 h-9 rounded-xl bg-indigo-600 flex items-center justify-center shadow-lg shadow-indigo-600/40">
//               <TrendingUp className="w-5 h-5 text-white" />
//             </div>
//             <span className="text-lg font-extrabold tracking-tight">LeadFlow</span>
//           </div>

//           <nav className="flex-1 px-4 py-6 space-y-1 overflow-y-auto">
//             <Link
//               href="/"
//               onClick={() => setSidebarOpen(false)}
//               className="flex items-center gap-3 px-3 py-2.5 text-slate-400 hover:text-white hover:bg-slate-800 rounded-xl transition-all duration-150"
//             >
//               <Home className="w-5 h-5" />
//               <span className="text-sm font-semibold">Home</span>
//             </Link>

//             {NAV_ITEMS.map(({ filter: f, label, icon, color }) => {
//               const active = filter === f;
//               return (
//                 <button
//                   key={f}
//                   type="button"
//                   onClick={() => {
//                     setFilter(f);
//                     setSidebarOpen(false);
//                   }}
//                   className={`w-full text-left px-3 py-2.5 rounded-xl flex items-center justify-between gap-3 transition-all duration-150 ${active
//                     ? 'bg-indigo-600 text-white shadow-lg shadow-indigo-600/30'
//                     : 'text-slate-400 hover:bg-slate-800 hover:text-white'
//                     }`}
//                 >
//                   <span className={`flex items-center gap-3 ${active ? 'text-white' : color}`}>
//                     {icon}
//                     <span className="text-sm font-semibold">{label}</span>
//                   </span>
//                   <span
//                     className={`text-xs font-bold px-2 py-0.5 rounded-full ${active
//                       ? 'bg-white/20 text-white'
//                       : 'bg-slate-700 text-slate-400'
//                       }`}
//                   >
//                     {counts[f]}
//                   </span>
//                 </button>
//               );
//             })}

//             <div className="pt-6">
//               <p className="text-slate-500 text-xs font-bold uppercase tracking-widest px-3 mb-3">
//                 Analytics
//               </p>
//               <div className="px-3 py-4 bg-slate-800 rounded-xl space-y-3">
//                 <div className="flex justify-between text-sm">
//                   <span className="text-slate-400">Conversion Rate</span>
//                   <span className="text-emerald-400 font-bold">{conversionRate}%</span>
//                 </div>
//                 <div className="w-full h-2 bg-slate-700 rounded-full overflow-hidden">
//                   <div
//                     className="h-full bg-gradient-to-r from-emerald-500 to-teal-400 rounded-full transition-all"
//                     style={{ width: `${conversionRate}%` }}
//                   />
//                 </div>
//                 <div className="flex justify-between text-xs text-slate-500">
//                   <span>{counts.CONVERTED} converted</span>
//                   <span>{leads.length} total</span>
//                 </div>
//               </div>
//             </div>
//           </nav>
//         </div>

//         <div className="p-4 border-t border-slate-800 bg-slate-950/40 space-y-1.5 flex-shrink-0">
//           <Link
//             href="/"
//             className="flex items-center gap-3 px-3 py-2.5 text-slate-400 hover:text-rose-400 hover:bg-rose-950/20 rounded-xl transition-all duration-150 text-sm font-semibold border border-transparent hover:border-rose-900/30"
//           >
//             <LogOut className="w-4 h-4" />
//             <span>Log Out</span>
//           </Link>
//         </div>
//       </aside>

//       <main className="flex-1 flex flex-col h-full overflow-hidden">
//         <header className="bg-white border-b border-slate-100 px-6 py-4 flex items-center gap-4 sticky top-0 z-20 flex-shrink-0">
//           <button
//             type="button"
//             onClick={() => setSidebarOpen(true)}
//             className="md:hidden p-2 text-slate-500 hover:text-slate-900 hover:bg-slate-100 rounded-lg"
//           >
//             <BarChart2 className="w-5 h-5" />
//           </button>

//           <div className="relative flex-1 max-w-sm md:max-w-md">
//             <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
//             <input
//               type="text"
//               placeholder="Search by name, email or phone…"
//               value={search}
//               onChange={(e) => setSearch(e.target.value)}
//               className="w-full pl-10 pr-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-all"
//             />
//           </div>

//           <div className="ml-auto flex items-center gap-2 md:gap-3">
//             <span className="hidden sm:block text-sm text-slate-500 mr-1">
//               {filteredLeads.length} lead{filteredLeads.length !== 1 ? 's' : ''}
//             </span>
            
//             <button
//               type="button"
//               onClick={openCreate}
//               className="flex items-center gap-2 bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2.5 rounded-xl text-sm font-bold shadow-lg shadow-indigo-600/30 transition-colors"
//             >
//               <Plus className="w-4 h-4" />
//               <span>New Lead</span>
//             </button>
//           </div>
//         </header>

//         <div className="flex-1 p-6 overflow-y-auto">
//           <div className="bg-white rounded-2xl border border-slate-100 shadow-sm overflow-hidden">
//             <div className="px-6 py-4 border-b border-slate-100 flex items-center justify-between">
//               <h2 className="font-bold text-slate-900">
//                 {filter === 'ALL' ? 'All Leads' : STATUS_CONFIG[filter]?.label + ' Leads'}
//               </h2>
//               {search && (
//                 <button
//                   type="button"
//                   onClick={() => setSearch('')}
//                   className="text-xs text-slate-400 hover:text-slate-700 flex items-center gap-1"
//                 >
//                   <X className="w-3 h-3" /> Clear search
//                 </button>
//               )}
//             </div>

//             <div className="overflow-x-auto">
//               <table className="w-full text-left border-collapse min-w-[720px] table-fixed">
//                 <thead>
//                   <tr className="bg-slate-50 text-slate-500 text-xs uppercase tracking-wider">
//                     <th className="w-[22%] px-6 py-3 font-semibold border-b border-slate-100">Name</th>
//                     <th className="w-[24%] px-4 py-3 font-semibold border-b border-slate-100">Email</th>
//                     <th className="w-[18%] px-4 py-3 font-semibold border-b border-slate-100">Phone</th>
//                     <th className="w-[14%] px-4 py-3 font-semibold border-b border-slate-100">Source</th>
//                     <th className="w-[12%] px-4 py-3 font-semibold border-b border-slate-100">Status</th>
//                     <th className="w-[10%] pr-6 py-3 font-semibold border-b border-slate-100 text-right">Actions</th>
//                   </tr>
//                 </thead>
//                 <tbody className="divide-y divide-slate-50 text-sm">
//                   {filteredLeads.length === 0 ? (
//                     <tr>
//                       <td colSpan={6} className="px-6 py-16 text-center">
//                         <div className="flex flex-col items-center gap-2 text-slate-400">
//                           <Users className="w-10 h-10 opacity-30" />
//                           <p className="font-semibold text-slate-500">No leads found</p>
//                           <p className="text-sm">
//                             {search ? 'Try a different search term' : 'Create your first lead to get started'}
//                           </p>
//                         </div>
//                       </td>
//                     </tr>
//                   ) : (
//                     filteredLeads.map((lead) => {
//                       const st = STATUS_CONFIG[lead.status];
//                       return (
//                         <tr key={lead.id} className="hover:bg-slate-50/70 transition-colors group">
//                           <td className="px-6 py-3.5 truncate font-medium text-slate-900">
//                             <div className="flex items-center gap-3 truncate">
//                               <div className="w-8 h-8 rounded-full bg-indigo-100 text-indigo-700 flex items-center justify-center text-xs font-bold flex-shrink-0">
//                                 {lead.name.split(' ').map((n) => n[0]).join('').toUpperCase().slice(0, 2)}
//                               </div>
//                               <div className="truncate">
//                                 <p className="font-semibold text-slate-900 text-sm truncate">{lead.name}</p>
//                                 <p className="text-[11px] text-slate-400">{lead.createdAt || 'Just now'}</p>
//                               </div>
//                             </div>
//                           </td>

//                           <td className="px-4 py-3.5 truncate text-slate-600">
//                             {lead.email ? (
//                               <a href={`mailto:${lead.email}`} className="hover:text-indigo-600 hover:underline block truncate">
//                                 {lead.email}
//                               </a>
//                             ) : (
//                               <span className="text-slate-400 italic">None</span>
//                             )}
//                           </td>

//                           <td className="px-4 py-3.5 truncate text-slate-600">
//                             <a href={`tel:${lead.phone}`} className="hover:text-indigo-600 block truncate">
//                               {lead.phone}
//                             </a>
//                           </td>

//                           <td className="px-4 py-3.5 truncate text-slate-500">{lead.source || 'Direct'}</td>

//                           <td className="px-4 py-3.5 whitespace-nowrap">
//                             <span className={`inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-bold ${st.bg} ${st.color}`}>
//                               {st.label}
//                             </span>
//                           </td>

//                           <td className="pr-6 py-3.5 text-right whitespace-nowrap">
//                             <div className="flex items-center justify-end gap-0.5">
//                               <button
//                                 type="button"
//                                 onClick={() => openMessageModal(lead)}
//                                 title="Message"
//                                 className="p-1.5 text-slate-400 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
//                               >
//                                 <MessageSquare className="w-4 h-4" />
//                               </button>
//                               <button
//                                 type="button"
//                                 onClick={() => openEdit(lead)}
//                                 title="Edit"
//                                 className="p-1.5 text-slate-400 hover:text-indigo-600 hover:bg-indigo-50 rounded-lg transition-colors"
//                               >
//                                 <Edit2 className="w-4 h-4" />
//                               </button>
//                               <button
//                                 type="button"
//                                 onClick={() => lead.id && openDeleteModal(lead)}
//                                 title="Delete"
//                                 className="p-1.5 text-slate-400 hover:text-rose-500 hover:bg-rose-50 rounded-lg transition-colors"
//                               >
//                                 <Trash2 className="w-4 h-4" />
//                               </button>
//                             </div>
//                           </td>
//                         </tr>
//                       );
//                     })
//                   )}
//                 </tbody>
//               </table>
//             </div>
//           </div>
//         </div>
//       </main>

//       {isModalOpen && (
//         <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm">
//           <div className="bg-white w-full max-w-lg rounded-2xl shadow-2xl overflow-hidden animate-fade-in">
//             <div className="px-6 py-4 border-b border-slate-100 flex justify-between items-center bg-slate-50">
//               <div>
//                 <h2 className="text-lg font-bold text-slate-900">{isEditing ? 'Edit Lead' : 'Create New Lead'}</h2>
//                 <p className="text-xs text-slate-500 mt-0.5">{isEditing ? 'Update lead information' : 'Add a new lead to your pipeline'}</p>
//               </div>
//               <button type="button" onClick={() => setModal(false)} className="p-2 hover:bg-slate-200 rounded-full text-slate-500 transition-colors">
//                 <X className="w-5 h-5" />
//               </button>
//             </div>

//             <div className="p-6 space-y-4 max-h-[70vh] overflow-y-auto">
//               <div>
//                 <label className="block text-sm font-bold text-slate-700 mb-1.5">Full Name *</label>
//                 <input
//                   type="text"
//                   value={formData.name || ''}
//                   onChange={(e) => setFormData({ ...formData, name: e.target.value })}
//                   className="w-full p-3 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-all"
//                 />
//               </div>
//               <div>
//                 <label className="block text-sm font-bold text-slate-700 mb-1.5">Email Address *</label>
//                 <input
//                   type="email"
//                   value={formData.email || ''}
//                   onChange={(e) => setFormData({ ...formData, email: e.target.value })}
//                   className="w-full p-3 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-all"
//                 />
//               </div>
//               <div>
//                 <label className="block text-sm font-bold text-slate-700 mb-1.5">Phone Number *</label>
//                 <input
//                   type="tel"
//                   value={formData.phone || ''}
//                   onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
//                   className="w-full p-3 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-all"
//                 />
//               </div>

//               <div>
//                 <label className="block text-sm font-bold text-slate-700 mb-1.5">Telegram Chat ID</label>
//                 <input
//                   type="text"
//                   placeholder="e.g. 1342143998"
//                   value={formData.telegramChatId || ''}
//                   onChange={(e) => setFormData({ ...formData, telegramChatId: e.target.value })}
//                   className="w-full p-3 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-all text-slate-800 bg-white"
//                 />
//               </div>

//               <div>
//                 <label className="block text-sm font-bold text-slate-700 mb-1.5">Lead Source</label>
//                 <div className="relative">
//                   <select
//                     value={formData.source || ''}
//                     onChange={(e) => setFormData({ ...formData, source: e.target.value })}
//                     className="w-full p-3 border border-slate-200 rounded-xl text-sm appearance-none bg-white focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-all"
//                   >
//                     <option value="">Select source…</option>
//                     {['LinkedIn', 'Google Ads', 'Referral', 'Website', 'Trade Show', 'Webinar', 'Other'].map((s) => (
//                       <option key={s} value={s}>{s}</option>
//                     ))}
//                   </select>
//                   <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 pointer-events-none" />
//                 </div>
//               </div>
//               <div>
//                 <label className="block text-sm font-bold text-slate-700 mb-1.5">Status</label>
//                 <div className="grid grid-cols-2 gap-2">
//                   {(['NEW', 'CONTACTED', 'CONVERTED', 'LOST'] as LeadDTO['status'][]).map((s) => {
//                     const cfg = STATUS_CONFIG[s];
//                     return (
//                       <button
//                         key={s}
//                         type="button"
//                         onClick={() => setFormData({ ...formData, status: s })}
//                         className={`flex items-center gap-2 p-3 rounded-xl border-2 text-sm font-semibold transition-all ${formData.status === s ? `border-current ${cfg.color} ${cfg.bg}` : 'border-slate-200 text-slate-500 hover:border-slate-300'}`}
//                       >
//                         {cfg.label}
//                       </button>
//                     );
//                   })}
//                 </div>
//               </div>
//               <div>
//                 <label className="block text-sm font-bold text-slate-700 mb-1.5">Notes</label>
//                 <textarea
//                   rows={3}
//                   value={formData.notes || ''}
//                   onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
//                   className="w-full p-3 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-all resize-none"
//                 />
//               </div>
//             </div>

//             <div className="px-6 py-4 border-t border-slate-100 flex gap-3 bg-slate-50">
//               <button type="button" onClick={() => setModal(false)} className="flex-1 py-3 bg-white border border-slate-200 text-slate-700 font-bold rounded-xl hover:bg-slate-100 transition-colors text-sm">Cancel</button>
//               <button type="button" onClick={handleSave} className="flex-1 py-3 bg-indigo-600 text-white font-bold rounded-xl shadow-lg text-sm">Save Changes</button>
//             </div>
//           </div>
//         </div>
//       )}

//       {isMessageModalOpen && selectedLeadForMessage && (
//         <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm">
//           <form onSubmit={handleSendMessageSubmit} className="bg-white w-full max-w-md rounded-2xl shadow-2xl overflow-hidden animate-fade-in">
//             <div className="px-6 py-4 border-b border-slate-100 flex justify-between items-center bg-slate-50">
//               <div className="flex items-center gap-2">
//                 <MessageSquare className="w-5 h-5 text-indigo-600" />
//                 <h2 className="text-lg font-bold text-slate-900">Message</h2>
//               </div>
//               <button type="button" onClick={() => setMessageModal(false)} className="p-1.5 hover:bg-slate-200 rounded-full text-slate-500 transition-colors">
//                 <X className="w-4 h-4" />
//               </button>
//             </div>

//             <div className="p-6 space-y-4">
//               <div className="p-3 bg-slate-50 rounded-xl border border-slate-100">
//                 <p className="text-xs text-slate-500 font-medium">Recipient</p>
//                 <p className="text-sm font-semibold text-slate-800">{selectedLeadForMessage.name}</p>
//                 {selectedLeadForMessage.phone ? (
//                   <p className="text-xs text-slate-600 font-semibold mt-1 flex items-center gap-1.5">
//                     <Phone className="w-3.5 h-3.5 text-indigo-500 flex-shrink-0" />
//                     <span>{selectedLeadForMessage.phone}</span>
//                   </p>
//                 ) : (
//                   <p className="text-xs text-slate-400 italic mt-1">No phone number registered</p>
//                 )}
//               </div>
//               <div>
//                 <label className="block text-xs font-bold text-slate-600 uppercase tracking-wider mb-1.5">Write Message</label>
//                 <textarea
//                   rows={4}
//                   required
//                   value={messageText}
//                   onChange={(e) => setMessageText(e.target.value)}
//                   placeholder="Type your follow-up note or custom message here..."
//                   className="w-full p-3 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-all resize-none text-slate-800 bg-white"
//                 />
//               </div>
//             </div>

//             <div className="px-6 py-3.5 border-t border-slate-100 flex gap-3 bg-slate-50 justify-end">
//               <button type="button" onClick={() => setMessageModal(false)} className="px-4 py-2 bg-white border border-slate-200 text-slate-700 font-semibold rounded-xl hover:bg-slate-100 transition-colors text-xs">Cancel</button>
//               <button
//                 type="submit" 
//                 disabled={isSendingMessage || !messageText.trim()}
//                 className="px-4 py-2 bg-indigo-600 text-white font-semibold rounded-xl shadow-md transition-colors text-xs flex items-center gap-1.5 disabled:opacity-50"
//               >
//                 {isSendingMessage ? (
//                   <div className="w-3.5 h-3.5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
//                 ) : (     
//                   <Send className="w-3.5 h-3.5" />
//                 )}
//                 <span>{isSendingMessage ? 'Sending...' : 'Send Message'}</span>
//               </button>
//             </div>
//           </form>
//         </div>
//       )}

//       {isDeleteModalOpen && leadToDelete && (
//         <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm">
//           <div className="bg-white w-full max-w-sm rounded-2xl shadow-2xl overflow-hidden transform transition-all animate-fade-in border border-slate-100">
//             <div className="p-6 text-center">
//               <div className="w-12 h-12 rounded-full bg-rose-100 text-rose-600 flex items-center justify-center mx-auto mb-4 shadow-sm">
//                 <AlertCircle className="w-6 h-6" />
//               </div>
//               <h3 className="text-lg font-bold text-slate-900">Delete Lead Profile?</h3>
//               <p className="text-xs text-slate-500 mt-2 leading-relaxed">
//                 Are you sure you want to delete <span className="font-semibold text-slate-800">{leadToDelete.name}</span>? 
//                 This operational path cannot be undone.
//               </p>
//             </div>

//             <div className="px-6 py-4 bg-slate-50 border-t border-slate-100 flex gap-3">
//               <button
//                 type="button"
//                 disabled={isDeleting}
//                 onClick={() => {
//                   setIsDeleteModalOpen(false);
//                   setLeadToDelete(null);
//                 }}
//                 className="flex-1 py-2.5 bg-white border border-slate-200 text-slate-700 font-bold rounded-xl text-xs transition-colors hover:bg-slate-100 disabled:opacity-50"
//               >
//                 Cancel
//               </button>
//               <button
//                 type="button"
//                 disabled={isDeleting}
//                 onClick={confirmDeleteLead}
//                 className="flex-1 py-2.5 bg-rose-600 hover:bg-rose-700 text-white font-bold rounded-xl text-xs shadow-md shadow-rose-600/20 transition-all flex items-center justify-center gap-1.5 disabled:opacity-50"
//               >
//                 {isDeleting ? (
//                   <div className="w-3.5 h-3.5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
//                 ) : (
//                   <Trash2 className="w-3.5 h-3.5" />
//                 )}
//                 <span>{isDeleting ? 'Deleting...' : 'Yes, Delete'}</span>
//               </button>
//             </div>
//           </div>
//         </div>
//       )}

//     </div>
//   );
// }



'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { LeadAPI } from '@/app/services/apiService';
import type { LeadDTO } from '@/app/services/apiService';
import {
  Home,
  LayoutDashboard,
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
  Phone,
  ChevronDown,
  MessageSquare,
  Send,
  AlertCircle,
} from 'lucide-react';

type FilterType = 'ALL' | 'NEW' | 'CONTACTED' | 'CONVERTED' | 'LOST';

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
  {
    filter: 'ALL',
    label: 'All Leads',
    icon: <LayoutDashboard className="w-5 h-5" />,
  },
  {
    filter: 'NEW',
    label: 'New Leads',
    icon: <Users className="w-5 h-5" />,
    color: 'text-indigo-300',
  },
  {
    filter: 'CONTACTED',
    label: 'Contacted',
    icon: <PhoneCall className="w-5 h-5" />,
    color: 'text-amber-300',
  },
  {
    filter: 'CONVERTED',
    label: 'Converted',
    icon: <CheckCircle className="w-5 h-5" />,
    color: 'text-emerald-300',
  },
  {
    filter: 'LOST',
    label: 'Lost',
    icon: <XCircle className="w-5 h-5" />,
    color: 'text-rose-300',
  },
];

export default function DashboardPage() {
  const router = useRouter();
  const [leads, setLeads] = useState<LeadDTO[]>([]);
  const [filter, setFilter] = useState<FilterType>('ALL');
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

  useEffect(() => {
    fetchDashboardData();
  }, []);

 // ─── ✅ FIXED: Filter ke sath-sath ab hum Newest First sort bhi karenge ───
  const filteredLeads = leads
    .filter((l) => {
      const matchesFilter = filter === 'ALL' || l.status === filter;

      const searchTarget = search.toLowerCase().trim();
      if (!searchTarget) return matchesFilter;

      const matchesName = l.name?.toLowerCase().includes(searchTarget) ?? false;
      const matchesEmail = l.email?.toLowerCase().includes(searchTarget) ?? false;
      const matchesPhone = l.phone?.includes(searchTarget) ?? false;

      return matchesFilter && (matchesName || matchesEmail || matchesPhone);
    })
   
    .sort((a, b) => {
      const dateA = a.createdAt ? new Date(a.createdAt).getTime() : 0;
      const dateB = b.createdAt ? new Date(b.createdAt).getTime() : 0;
      return dateB - dateA; // Newest leads strictly on top
    });

  const handleSendMessageSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!messageText.trim() || !selectedLeadForMessage) return;

    try {
      setIsSendingMessage(true);

      const rawPhone = selectedLeadForMessage.phone;
      if (!rawPhone || rawPhone.trim() === '') {
        showToast('Error', 'This lead does not have a valid phone number registered.', 'error');
        return;
      }

      let cleanPhone = rawPhone.replace(/\D/g, '');
      if (cleanPhone.length === 10) {
        cleanPhone = '91' + cleanPhone;
      }
      const jwtToken = localStorage.getItem('token');

      const response = await fetch('http://localhost:8080/api/automation/direct-whatsapp', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': jwtToken ? `Bearer ${jwtToken}` : '',
        },
        body: JSON.stringify({
          phone: '+' + cleanPhone,
          message: messageText.trim()
        }),
      });

      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(errorText || 'Backend gateway rejected direct delivery packet');
      }

      showToast('Success', `Message dispatched directly to ${selectedLeadForMessage.name}'s phone!`, 'success');
      setMessageText('');
      setMessageModal(false);
    } catch (error: any) {
      console.error('Failed to execute direct manual dispatch routing:', error);
      showToast('Error', error.message || 'Failed to submit notification to Java server.', 'error');
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
      createdAt: lead.createdAt ?? '',
    });
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

  const handleSave = async () => {
    const name = formData.name?.trim() ?? '';
    const email = formData.email?.trim() ?? '';
    const phone = formData.phone?.trim() ?? '';

    if (!name || !email || !phone) {
      showToast('Validation Failed', 'Please input all required values.', 'error');
      return;
    }

    try {
      const leadData = {
        name: formData.name,
        email: formData.email,
        phone: formData.phone,
        source: formData.source,
        notes: formData.notes,
        status: formData.status,
      };

      if (isEditing && formData.id !== null && formData.id !== '') {
        await LeadAPI.update(formData.id, leadData);
        showToast('Success', 'Lead information updated smoothly.');
      } else {
        await LeadAPI.create(leadData);
        showToast('Created', 'New lead profile initialized successfully.');
      }
      
      setModal(false);
      await fetchDashboardData();
      router.refresh();
    } catch (error) {
      console.error('Failed to save lead:', error);
      showToast('Error', 'Failed to store configurations.', 'error');
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
      
      await fetchDashboardData();
      router.refresh();
    } catch (error) {
      console.error('Failed to delete lead:', error);
      showToast('Delete Failed', 'Could not run removal on database servers.', 'error');
    } finally {
      setIsDeleting(false);
    }
  };

  const conversionRate =
    leads.length > 0 ? Math.round((counts.CONVERTED / leads.length) * 100) : 0;

  return (
    <div className="relative min-h-screen w-full flex bg-slate-100 text-slate-900">

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
        <div
          className="fixed inset-0 z-30 bg-black/40 md:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      <aside
        className={`
          fixed md:static inset-y-0 left-0 z-40 w-64 bg-slate-900 text-white flex flex-col h-full flex-shrink-0
          transform transition-transform duration-300
          ${sidebarOpen ? 'translate-x-0' : '-translate-x-full md:translate-x-0'}
        `}
      >
        <div className="flex flex-col flex-1 min-h-0">
          <div className="flex items-center gap-3 px-6 py-5 border-b border-slate-700/60 flex-shrink-0">
            <div className="w-9 h-9 rounded-xl bg-indigo-600 flex items-center justify-center shadow-lg shadow-indigo-600/40">
              <TrendingUp className="w-5 h-5 text-white" />
            </div>
            <span className="text-lg font-extrabold tracking-tight">LeadFlow</span>
          </div>

          <nav className="flex-1 px-4 py-6 space-y-1 overflow-y-auto">
            <Link
              href="/"
              onClick={() => setSidebarOpen(false)}
              className="flex items-center gap-3 px-3 py-2.5 text-slate-400 hover:text-white hover:bg-slate-800 rounded-xl transition-all duration-150"
            >
              <Home className="w-5 h-5" />
              <span className="text-sm font-semibold">Home</span>
            </Link>

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
                  className={`w-full text-left px-3 py-2.5 rounded-xl flex items-center justify-between gap-3 transition-all duration-150 ${active
                    ? 'bg-indigo-600 text-white shadow-lg shadow-indigo-600/30'
                    : 'text-slate-400 hover:bg-slate-800 hover:text-white'
                    }`}
                >
                  <span className={`flex items-center gap-3 ${active ? 'text-white' : color}`}>
                    {icon}
                    <span className="text-sm font-semibold">{label}</span>
                  </span>
                  <span
                    className={`text-xs font-bold px-2 py-0.5 rounded-full ${active
                      ? 'bg-white/20 text-white'
                      : 'bg-slate-700 text-slate-400'
                      }`}
                  >
                    {counts[f]}
                  </span>
                </button>
              );
            })}

            <div className="pt-6">
              <p className="text-slate-500 text-xs font-bold uppercase tracking-widest px-3 mb-3">
                Analytics
              </p>
              <div className="px-3 py-4 bg-slate-800 rounded-xl space-y-3">
                <div className="flex justify-between text-sm">
                  <span className="text-slate-400">Conversion Rate</span>
                  <span className="text-emerald-400 font-bold">{conversionRate}%</span>
                </div>
                <div className="w-full h-2 bg-slate-700 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-gradient-to-r from-emerald-500 to-teal-400 rounded-full transition-all"
                    style={{ width: `${conversionRate}%` }}
                  />
                </div>
                <div className="flex justify-between text-xs text-slate-500">
                  <span>{counts.CONVERTED} converted</span>
                  <span>{leads.length} total</span>
                </div>
              </div>
            </div>
          </nav>
        </div>

        <div className="p-4 border-t border-slate-800 bg-slate-950/40 space-y-1.5 flex-shrink-0">
          <Link
            href="/"
            className="flex items-center gap-3 px-3 py-2.5 text-slate-400 hover:text-rose-400 hover:bg-rose-950/20 rounded-xl transition-all duration-150 text-sm font-semibold border border-transparent hover:border-rose-900/30"
          >
            <LogOut className="w-4 h-4" />
            <span>Log Out</span>
          </Link>
        </div>
      </aside>

      <main className="flex-1 flex flex-col h-full overflow-hidden">
        <header className="bg-white border-b border-slate-100 px-6 py-4 flex items-center gap-4 sticky top-0 z-20 flex-shrink-0">
          <button
            type="button"
            onClick={() => setSidebarOpen(true)}
            className="md:hidden p-2 text-slate-500 hover:text-slate-900 hover:bg-slate-100 rounded-lg"
          >
            <BarChart2 className="w-5 h-5" />
          </button>

          <div className="relative flex-1 max-w-sm md:max-w-md">
            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
            <input
              type="text"
              placeholder="Search by name, email or phone…"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full pl-10 pr-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-all"
            />
          </div>

          <div className="ml-auto flex items-center gap-2 md:gap-3">
            <span className="hidden sm:block text-sm text-slate-500 mr-1">
              {filteredLeads.length} lead{filteredLeads.length !== 1 ? 's' : ''}
            </span>

            <button
              type="button"
              onClick={openCreate}
              className="flex items-center gap-2 bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2.5 rounded-xl text-sm font-bold shadow-lg shadow-indigo-600/30 transition-colors"
            >
              <Plus className="w-4 h-4" />
              <span>New Lead</span>
            </button>
          </div>
        </header>

        <div className="flex-1 p-6 overflow-y-auto">
          <div className="bg-white rounded-2xl border border-slate-100 shadow-sm overflow-hidden">
            <div className="px-6 py-4 border-b border-slate-100 flex items-center justify-between">
              <h2 className="font-bold text-slate-900">
                {filter === 'ALL' ? 'All Leads' : STATUS_CONFIG[filter]?.label + ' Leads'}
              </h2>
              {search && (
                <button
                  type="button"
                  onClick={() => setSearch('')}
                  className="text-xs text-slate-400 hover:text-slate-700 flex items-center gap-1"
                >
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
                          <p className="text-sm">
                            {search ? 'Try a different search term' : 'Create your first lead to get started'}
                          </p>
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
                              <a href={`mailto:${lead.email}`} className="hover:text-indigo-600 hover:underline block truncate">
                                {lead.email}
                              </a>
                            ) : (
                              <span className="text-slate-400 italic">None</span>
                            )}
                          </td>

                          <td className="px-4 py-3.5 truncate text-slate-600">
                            <a href={`tel:${lead.phone}`} className="hover:text-indigo-600 block truncate">
                              {lead.phone}
                            </a>
                          </td>

                          <td className="px-4 py-3.5 truncate text-slate-500">{lead.source || 'Direct'}</td>

                          <td className="px-4 py-3.5 whitespace-nowrap">
                            <span className={`inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-bold ${st.bg} ${st.color}`}>
                              {st.label}
                            </span>
                          </td>

                          <td className="pr-6 py-3.5 text-right whitespace-nowrap">
                            <div className="flex items-center justify-end gap-0.5">
                              <button
                                type="button"
                                onClick={() => openMessageModal(lead)}
                                title="Message"
                                className="p-1.5 text-slate-400 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                              >
                                <MessageSquare className="w-4 h-4" />
                              </button>
                              <button
                                type="button"
                                onClick={() => openEdit(lead)}
                                title="Edit"
                                className="p-1.5 text-slate-400 hover:text-indigo-600 hover:bg-indigo-50 rounded-lg transition-colors"
                              >
                                <Edit2 className="w-4 h-4" />
                              </button>
                              <button
                                type="button"
                                onClick={() => lead.id && openDeleteModal(lead)}
                                title="Delete"
                                className="p-1.5 text-slate-400 hover:text-rose-500 hover:bg-rose-50 rounded-lg transition-colors"
                              >
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
        </div>
      </main>

      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm">
          <div className="bg-white w-full max-w-lg rounded-2xl shadow-2xl overflow-hidden animate-fade-in">
            <div className="px-6 py-4 border-b border-slate-100 flex justify-between items-center bg-slate-50">
              <div>
                <h2 className="text-lg font-bold text-slate-900">{isEditing ? 'Edit Lead' : 'Create New Lead'}</h2>
                <p className="text-xs text-slate-500 mt-0.5">{isEditing ? 'Update lead information' : 'Add a new lead to your pipeline'}</p>
              </div>
              <button type="button" onClick={() => setModal(false)} className="p-2 hover:bg-slate-200 rounded-full text-slate-500 transition-colors">
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="p-6 space-y-4 max-h-[70vh] overflow-y-auto">
              <div>
                <label className="block text-sm font-bold text-slate-700 mb-1.5">Full Name *</label>
                <input
                  type="text"
                  value={formData.name || ''}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="w-full p-3 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-all"
                />
              </div>
              <div>
                <label className="block text-sm font-bold text-slate-700 mb-1.5">Email Address *</label>
                <input
                  type="email"
                  value={formData.email || ''}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  className="w-full p-3 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-all"
                />
              </div>
              <div>
                <label className="block text-sm font-bold text-slate-700 mb-1.5">Phone Number *</label>
                <input
                  type="tel"
                  value={formData.phone || ''}
                  onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                  className="w-full p-3 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-all"
                />
              </div>

              <div>
                <label className="block text-sm font-bold text-slate-700 mb-1.5">Lead Source</label>
                <div className="relative">
                  <select
                    value={formData.source || ''}
                    onChange={(e) => setFormData({ ...formData, source: e.target.value })}
                    className="w-full p-3 border border-slate-200 rounded-xl text-sm appearance-none bg-white focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-all"
                  >
                    <option value="">Select source…</option>
                    {['LinkedIn', 'Google Ads', 'Referral', 'Website', 'Trade Show', 'Webinar', 'Other'].map((s) => (
                      <option key={s} value={s}>{s}</option>
                    ))}
                  </select>
                  <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 pointer-events-none" />
                </div>
              </div>
              <div>

                <label className="block text-sm font-bold text-slate-700 mb-1.5">Status</label>
                <div className="grid grid-cols-2 gap-2">
                  {(['NEW', 'CONTACTED', 'CONVERTED', 'LOST'] as LeadDTO['status'][]).map((s) => {
                    const cfg = STATUS_CONFIG[s];
                    return (
                      <button
                        key={s}
                        type="button"
                        onClick={() => setFormData({ ...formData, status: s })}
                        className={`flex items-center gap-2 p-3 rounded-xl border-2 text-sm font-semibold transition-all ${formData.status === s ? `border-current ${cfg.color} ${cfg.bg}` : 'border-slate-200 text-slate-500 hover:border-slate-300'}`}
                      >
                        {cfg.label}
                      </button>
                    );
                  })}
                </div>
              </div>
              <div>
                <label className="block text-sm font-bold text-slate-700 mb-1.5">Notes</label>
                <textarea
                  rows={3}
                  value={formData.notes || ''}
                  onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                  className="w-full p-3 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-all resize-none"
                />
              </div>
            </div>

            <div className="px-6 py-4 border-t border-slate-100 flex gap-3 bg-slate-50">
              <button type="button" onClick={() => setModal(false)} className="flex-1 py-3 bg-white border border-slate-200 text-slate-700 font-bold rounded-xl hover:bg-slate-100 transition-colors text-sm">Cancel</button>
              <button type="button" onClick={handleSave} className="flex-1 py-3 bg-indigo-600 text-white font-bold rounded-xl shadow-lg text-sm">Save Changes</button>
            </div>
          </div>
        </div>
      )}

      {isMessageModalOpen && selectedLeadForMessage && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm">
          <form onSubmit={handleSendMessageSubmit} className="bg-white w-full max-w-md rounded-2xl shadow-2xl overflow-hidden animate-fade-in">
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
                <textarea
                  rows={4}
                  required
                  value={messageText}
                  onChange={(e) => setMessageText(e.target.value)}
                  placeholder="Type your follow-up note or custom message here..."
                  className="w-full p-3 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-all resize-none text-slate-800 bg-white"
                />
              </div>
            </div>

            <div className="px-6 py-3.5 border-t border-slate-100 flex gap-3 bg-slate-50 justify-end">
              <button type="button" onClick={() => setMessageModal(false)} className="px-4 py-2 bg-white border border-slate-200 text-slate-700 font-semibold rounded-xl hover:bg-slate-100 transition-colors text-xs">Cancel</button>
              <button
                type="submit"
                disabled={isSendingMessage || !messageText.trim()}
                className="px-4 py-2 bg-indigo-600 text-white font-semibold rounded-xl shadow-md transition-colors text-xs flex items-center gap-1.5 disabled:opacity-50"
              >
                {isSendingMessage ? (
                  <div className="w-3.5 h-3.5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                ) : (
                  <Send className="w-3.5 h-3.5" />
                )}
                <span>{isSendingMessage ? 'Sending...' : 'Send Message'}</span>
              </button>
            </div>
          </form>
        </div>
      )}

      {isDeleteModalOpen && leadToDelete && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm">
          <div className="bg-white w-full max-w-sm rounded-2xl shadow-2xl overflow-hidden transform transition-all animate-fade-in border border-slate-100">
            <div className="p-6 text-center">
              <div className="w-12 h-12 rounded-full bg-rose-100 text-rose-600 flex items-center justify-center mx-auto mb-4 shadow-sm">
                <AlertCircle className="w-6 h-6" />
              </div>
              <h3 className="text-lg font-bold text-slate-900">Delete Lead Profile?</h3>
              <p className="text-xs text-slate-500 mt-2 leading-relaxed">
                Are you sure you want to delete <span className="font-semibold text-slate-800">{leadToDelete.name}</span>?
                This operational path cannot be undone.
              </p>
            </div>

            <div className="px-6 py-4 bg-slate-50 border-t border-slate-100 flex gap-3">
              <button
                type="button"
                disabled={isDeleting}
                onClick={() => {
                  setIsDeleteModalOpen(false);
                  setLeadToDelete(null);
                }}
                className="flex-1 py-2.5 bg-white border border-slate-200 text-slate-700 font-bold rounded-xl text-xs transition-colors hover:bg-slate-100 disabled:opacity-50"
              >
                Cancel
              </button>
              <button
                type="button"
                disabled={isDeleting}
                onClick={confirmDeleteLead}
                className="flex-1 py-2.5 bg-rose-600 hover:bg-rose-700 text-white font-bold rounded-xl text-xs shadow-md shadow-rose-600/20 transition-all flex items-center justify-center gap-1.5 disabled:opacity-50"
              >
                {isDeleting ? (
                  <div className="w-3.5 h-3.5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                ) : (
                  <Trash2 className="w-3.5 h-3.5" />
                )}
                <span>{isDeleting ? 'Deleting...' : 'Yes, Delete'}</span>
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
}