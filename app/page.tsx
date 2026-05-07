'use client';

import { useState, useEffect, useMemo } from 'react';
import { useRouter } from 'next/navigation';

// --- STEP 1: INTERFACE DEFINITION ---
export interface Lead {
  id: string | number;
  name: string;
  phone: string;
  source: string;
  status: string;
  notes: string;
  createdAt: string;
}

export default function DashboardPage() {
  const router = useRouter();

  // --- STEP 2: CONSOLIDATED STATES (No Duplicates) ---
  const [leads, setLeads] = useState<Lead[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [mounted, setMounted] = useState(false);

  const [filter, setFilter] = useState('ALL');
  const [search, setSearch] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isEditing, setIsEditing] = useState(false);

  // Form data state using the Lead interface
  const [formData, setFormData] = useState<Partial<Lead>>({
    name: '',
    phone: '',
    source: '',
    status: 'NEW',
    notes: '',
  });

  // Handle Hydration fix
  useEffect(() => {
    setMounted(true);
  }, []);

  // --- 3. FETCH DATA (GET) ---
  useEffect(() => {
    const fetchLeads = async () => {
      try {
        const response = await fetch('https://your-backend-api.com/leads'); // Replace with your actual URL
        if (!response.ok) throw new Error('Failed to fetch data');
        const data: Lead[] = await response.json();
        setLeads(data);
      } catch (err: any) {
        setError(err.message);
      } finally {
        setIsLoading(false);
      }
    };
    if (mounted) fetchLeads();
  }, [mounted]);

  // --- 4. SAVE DATA (POST / PUT) ---
  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    const method = isEditing ? 'PUT' : 'POST';
    const url = isEditing
      ? `https://your-backend-api.com/leads/${formData.id}`
      : 'https://your-backend-api.com/leads';

    try {
      const response = await fetch(url, {
        method: method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        const savedLead: Lead = await response.json();
        if (isEditing) {
          setLeads(leads.map((l) => (l.id === savedLead.id ? savedLead : l)));
        } else {
          setLeads([...leads, savedLead]);
        }
        setIsModalOpen(false);
      }
    } catch (err) {
      alert("Error saving data to backend");
    }
  };

  // --- 5. DELETE DATA (DELETE) ---
  const handleDelete = async (id: string | number) => {
    if (!window.confirm("Are you sure?")) return;

    try {
      const response = await fetch(`https://your-backend-api.com/leads/${id}`, {
        method: 'DELETE',
      });
      if (response.ok) {
        setLeads(leads.filter((l) => l.id !== id));
      }
    } catch (err) {
      alert("Delete failed");
    }
  };

  // --- 6. MODAL HANDLERS ---
  const handleOpenCreate = () => {
    setFormData({ name: '', phone: '', source: '', status: 'NEW', notes: '' });
    setIsEditing(false);
    setIsModalOpen(true);
  };

  const handleOpenEdit = (lead: Lead) => {
    setFormData(lead);
    setIsEditing(true);
    setIsModalOpen(true);
  };

  // Filter Logic (Safe with optional chaining)
  const filteredLeads = useMemo(() => {
    return leads.filter((l) => {
      const matchesFilter = filter === 'ALL' || l.status === filter;
      const matchesSearch =
        l.name?.toLowerCase().includes(search.toLowerCase()) ||
        l.phone?.includes(search);
      return matchesFilter && matchesSearch;
    });
  }, [leads, filter, search]);

  if (!mounted || isLoading) return <div className="flex items-center justify-center h-screen font-black text-blue-600">CONNECTING...</div>;
  if (error) return <div className="text-red-500 p-10">Error: {error}</div>;

  return (
    <div className="flex min-h-screen bg-gray-100">
      {/* SIDEBAR */}
      <aside className="w-72 bg-black text-white fixed h-full flex flex-col p-6 z-30">
        <h2 className="text-3xl font-bold mb-10 text-blue-500 tracking-tighter">LeadFlow</h2>
        <nav className="flex-1 space-y-2">
          {['ALL', 'NEW', 'CONTACTED', 'CONVERTED', 'LOST'].map((status) => (
            <button
              key={status}
              onClick={() => setFilter(status)}
              className={`w-full text-left px-4 py-3 rounded-xl transition font-medium ${
                filter === status ? 'bg-blue-600 shadow-lg' : 'text-gray-400 hover:bg-white/10'
              }`}
            >
              {status === 'ALL' ? 'View Leads' : `${status.charAt(0) + status.slice(1).toLowerCase()} Leads`}
            </button>
          ))}
          <button
            onClick={() => router.push('/')}
            className="w-full text-left px-4 py-3 rounded-xl text-red-500 mt-10 hover:bg-red-500/10 font-bold italic"
          >
            Logout
          </button>
        </nav>
      </aside>

      {/* MAIN CONTENT */}
      <main className="flex-1 ml-72 relative p-8">
        <div className="max-w-6xl mx-auto space-y-8 relative z-10">
          <div className="flex justify-between items-center gap-4">
            <input
              type="text"
              placeholder="Search by name or phone..."
              className="w-96 px-4 py-2.5 rounded-2xl bg-white/80 border shadow-sm outline-none focus:ring-2 focus:ring-blue-500"
              onChange={(e) => setSearch(e.target.value)}
            />
            <div className="flex gap-4">
              <button onClick={() => router.back()} className="px-5 py-2.5 bg-white rounded-xl border font-medium hover:bg-gray-50 transition">
                Back
              </button>
              <button onClick={handleOpenCreate} className="px-6 py-2.5 bg-blue-600 text-white rounded-xl font-bold shadow-lg hover:bg-blue-700 transition">
                + Create Lead
              </button>
            </div>
          </div>

          {/* DATA TABLE */}
          <div className="bg-white/90 backdrop-blur rounded-[2rem] shadow-xl border overflow-hidden">
            <table className="w-full text-left">
              <thead className="bg-gray-50/50 border-b">
                <tr className="text-gray-400 text-[10px] uppercase font-black tracking-widest text-center">
                  <th className="p-5 text-left">Name</th>
                  <th className="p-5">Phone</th>
                  <th>Source</th>
                  <th>Status</th>
                  <th>Notes</th>
                  <th className="p-5">Actions</th>
                </tr>
              </thead>
              <tbody className="text-sm">
                {filteredLeads.map((l) => (
                  <tr key={l.id} className="border-b border-gray-50 hover:bg-gray-50/50 transition-colors text-center">
                    <td className="p-5 font-bold text-gray-700 text-left">{l.name}</td>
                    <td className="p-5 text-gray-500">{l.phone}</td>
                    <td className="p-5 text-gray-500">{l.source}</td>
                    <td className="p-5">
                      <span className={`px-3 py-1 rounded-full text-[10px] font-black ${l.status === 'NEW' ? 'bg-blue-100 text-blue-600' : 'bg-green-100 text-green-600'}`}>
                        {l.status}
                      </span>
                    </td>
                    <td className="p-5 text-gray-400 italic truncate max-w-[120px]">{l.notes}</td>
                    <td className="p-5 font-bold text-xs">
                      <button onClick={() => handleOpenEdit(l)} className="text-blue-500 mr-4 hover:underline">
                        EDIT
                      </button>
                      <button onClick={() => handleDelete(l.id)} className="text-red-400 hover:underline">
                        DELETE
                      </button>
                    </td>
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
              <input
                type="text"
                placeholder="Name"
                required
                className="w-full p-3 border rounded-xl outline-none focus:ring-2 focus:ring-blue-500"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              />
              <input
                type="text"
                placeholder="Phone"
                required
                className="w-full p-3 border rounded-xl outline-none focus:ring-2 focus:ring-blue-500"
                value={formData.phone}
                onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
              />
              <select
                className="w-full p-3 border rounded-xl outline-none focus:ring-2 focus:ring-blue-500 font-bold"
                value={formData.status}
                onChange={(e) => setFormData({ ...formData, status: e.target.value })}
              >
                <option value="NEW">NEW</option>
                <option value="CONTACTED">CONTACTED</option>
                <option value="CONVERTED">CONVERTED</option>
                <option value="LOST">LOST</option>
              </select>
              <textarea
                placeholder="Notes"
                className="w-full p-3 border rounded-xl outline-none focus:ring-2 focus:ring-blue-500 h-24"
                value={formData.notes}
                onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
              />
              <div className="flex gap-4 mt-6">
                <button type="button" onClick={() => setIsModalOpen(false)} className="flex-1 py-3 bg-gray-100 rounded-2xl font-bold hover:bg-gray-200 transition">
                  Cancel
                </button>
                <button type="submit" className="flex-1 py-3 bg-blue-600 text-white rounded-2xl font-bold shadow-lg hover:bg-blue-700 transition">
                  Save Lead
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}