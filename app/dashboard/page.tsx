'use client';
import { useState } from 'react';
import { useRouter } from 'next/navigation';

const INITIAL_DATA = [
    { id: 1, name: "Mahak Jaiswal", phone: "98267xxxxx", source: "Google", status: "NEW", notes: "Core Java focus", createdAt: "2026-05-01" },
    { id: 2, name: "Sarthak Dev", phone: "91234xxxxx", source: "LinkedIn", status: "CONVERTED", notes: "Ready for onboarding", createdAt: "2026-04-20" },
];

export default function DashboardPage() {
    const router = useRouter();
    const [leads, setLeads] = useState(INITIAL_DATA);
    const [filter, setFilter] = useState('ALL');
    const [search, setSearch] = useState('');
    
    // Modal & Form State
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isEditing, setIsEditing] = useState(false);
    const [formData, setFormData] = useState({ id: null, name: '', phone: '', source: '', status: 'NEW', notes: '', createdAt: '' });

    const filteredLeads = leads.filter(l => 
        (filter === 'ALL' || l.status === filter) &&
        (l.name.toLowerCase().includes(search.toLowerCase()) || l.phone.includes(search))
    );

    // --- FUNCTIONS ---
    const handleOpenCreate = () => {
        setFormData({ id: null, name: '', phone: '', source: '', status: 'NEW', notes: '', createdAt: '' });
        setIsEditing(false);
        setIsModalOpen(true);
    };

    const handleOpenEdit = (lead) => {
        setFormData(lead);
        setIsEditing(true);
        setIsModalOpen(true);
    };

    const handleDelete = (id) => {
        if(window.confirm("Are you sure you want to delete this lead?")) {
            setLeads(leads.filter(l => l.id !== id));
        }
    };

    const handleSave = (e) => {
        e.preventDefault();
        if (isEditing) {
            setLeads(leads.map(l => l.id === formData.id ? formData : l));
        } else {
            const newLead = { ...formData, id: Date.now(), createdAt: new Date().toISOString().split('T')[0] };
            setLeads([...leads, newLead]);
        }
        setIsModalOpen(false);
    };

    return (
        <div className="flex min-h-screen bg-gray-100">
            {/* SIDEBAR */}
            <aside className="w-72 bg-black text-white fixed h-full flex flex-col p-6 z-30">
                <h2 className="text-3xl font-bold mb-10 text-blue-500 tracking-tighter">LeadFlow</h2>
                <nav className="flex-1 space-y-2">
                    {['ALL', 'NEW', 'CONTACTED', 'CONVERTED', 'LOST'].map((status) => (
                        <button key={status} onClick={() => setFilter(status)}
                            className={`w-full text-left px-4 py-3 rounded-xl transition font-medium ${filter === status ? 'bg-blue-600 shadow-lg' : 'text-gray-400 hover:bg-white/10'}`}>
                            {status === 'ALL' ? 'View Leads' : `${status.charAt(0) + status.slice(1).toLowerCase()} Leads`}
                        </button>
                    ))}
                    <button onClick={() => router.push('/')} className="w-full text-left px-4 py-3 rounded-xl text-red-500 mt-10 hover:bg-red-500/10 font-bold italic">Logout</button>
                </nav>
            </aside>

            {/* MAIN CONTENT */}
            <main className="flex-1 ml-72 relative p-8">
                <div className="absolute inset-0 bg-cover bg-center -z-10 opacity-20" 
                     style={{ backgroundImage: "url('https://images.unsplash.com/photo-1497366216548-37526070297c?q=80&w=1920')" }}>
                </div>

                <div className="max-w-6xl mx-auto space-y-8 relative z-10">
                    <div className="flex justify-between items-center gap-4">
                        <input type="text" placeholder="Search by name or phone..." className="w-96 px-4 py-2.5 rounded-2xl bg-white/80 border shadow-sm outline-none focus:ring-2 focus:ring-blue-500"
                               onChange={(e) => setSearch(e.target.value)} />
                        <div className="flex gap-4">
                            <button onClick={() => router.back()} className="px-5 py-2.5 bg-white rounded-xl border font-medium hover:bg-gray-50 transition">Back</button>
                            <button onClick={handleOpenCreate} className="px-6 py-2.5 bg-blue-600 text-white rounded-xl font-bold shadow-lg hover:bg-blue-700 transition">+ Create Lead</button>
                        </div>
                    </div>

                    {/* METRICS */}
                    <div className="grid grid-cols-2 gap-6">
                        <div className="bg-white/80 backdrop-blur p-6 rounded-3xl shadow-sm border border-white">
                            <p className="text-gray-500 text-xs font-bold uppercase tracking-widest">Total Leads</p>
                            <p className="text-5xl font-black">{leads.length}</p>
                        </div>
                        <div className="bg-white/80 backdrop-blur p-6 rounded-3xl shadow-sm border border-white text-green-600">
                            <p className="text-gray-500 text-xs font-bold uppercase tracking-widest">Converted</p>
                            <p className="text-5xl font-black">{leads.filter(l => l.status === 'CONVERTED').length}</p>
                        </div>
                    </div>

                    {/* TABLE */}
                    <div className="bg-white/90 backdrop-blur rounded-[2rem] shadow-xl border overflow-hidden">
                        <table className="w-full text-left">
                             <thead className="bg-gray-50/50 border-b">
                                <tr className="text-gray-400 text-[10px] uppercase font-black tracking-widest text-center">
                                    <th className="p-5 text-left">Name</th>
                                    <th className="p-5">Phone</th><th>Source</th><th>Status</th><th>Notes</th><th>Created At</th><th className="p-5">Actions</th>
                                </tr>
                            </thead> 
                           
                            <tbody className="text-sm">
  {filteredLeads.map((l) => (
    <tr key={l.id} className="border-b border-gray-50 hover:bg-gray-50/50 transition-colors text-center">
      <td className="p-5 font-bold text-gray-700 text-left">{l.name}</td><td className="p-5 text-gray-500">{l.phone}</td><td className="p-5 text-gray-500">{l.source}</td><td className="p-5"><span className={`px-3 py-1 rounded-full text-[10px] font-black ${l.status === 'NEW' ? 'bg-blue-100 text-blue-600' : l.status === 'CONVERTED' ? 'bg-green-100 text-green-600' : 'bg-gray-100'}`}>{l.status}</span></td><td className="p-5 text-gray-400 italic truncate max-w-[120px]">{l.notes}</td><td className="p-5 text-gray-500 text-xs">{l.createdAt}</td><td className="p-5 font-bold text-xs"><button onClick={() => handleOpenEdit(l)} className="text-blue-500 mr-4 hover:underline">EDIT</button><button onClick={() => handleDelete(l.id)} className="text-red-400 hover:underline">DELETE</button></td>
    </tr>
  ))}
</tbody>
                        </table>
                    </div>
                </div>
            </main>

            {/* CREATE / EDIT MODAL */}
            {isModalOpen && (
                <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4">
                    <div className="bg-white w-full max-w-lg p-8 rounded-[2.5rem] shadow-2xl">
                        <h2 className="text-2xl font-black mb-6">{isEditing ? '✏️ Edit Lead' : '🚀 Add New Lead'}</h2>
                        <form onSubmit={handleSave} className="space-y-4">
                            <div className="grid grid-cols-2 gap-4">
                                <input type="text" placeholder="Name" required className="p-3 border rounded-xl outline-none focus:ring-2 focus:ring-blue-500" value={formData.name} onChange={e => setFormData({...formData, name: e.target.value})} />
                                <input type="text" placeholder="Phone" required className="p-3 border rounded-xl outline-none focus:ring-2 focus:ring-blue-500" value={formData.phone} onChange={e => setFormData({...formData, phone: e.target.value})} />
                            </div>
                            <div className="grid grid-cols-2 gap-4">
                                <input type="text" placeholder="Source (e.g. Google)" className="p-3 border rounded-xl outline-none focus:ring-2 focus:ring-blue-500" value={formData.source} onChange={e => setFormData({...formData, source: e.target.value})} />
                                <select className="p-3 border rounded-xl outline-none focus:ring-2 focus:ring-blue-500 font-bold" value={formData.status} onChange={e => setFormData({...formData, status: e.target.value})}>
                                    <option value="NEW">NEW</option>
                                    <option value="CONTACTED">CONTACTED</option>
                                    <option value="CONVERTED">CONVERTED</option>
                                    <option value="LOST">LOST</option>
                                </select>
                            </div>
                            <textarea placeholder="Notes / Details" className="w-full p-3 border rounded-xl outline-none focus:ring-2 focus:ring-blue-500 h-24" value={formData.notes} onChange={e => setFormData({...formData, notes: e.target.value})} />
                            
                            <div className="flex gap-4 mt-6">
                                <button type="button" onClick={() => setIsModalOpen(false)} className="flex-1 py-3 bg-gray-100 rounded-2xl font-bold hover:bg-gray-200 transition">Cancel</button>
                                <button type="submit" className="flex-1 py-3 bg-blue-600 text-white rounded-2xl font-bold shadow-lg hover:bg-blue-700 transition">Save Lead</button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
}