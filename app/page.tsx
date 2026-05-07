'use client';
import { useEffect, useState, useMemo } from 'react';
import { useRouter } from 'next/navigation';
import { fetchLeads } from '@/lib/api';
import Navbar from '@/components/Navbar';
import MetricsCard from '@/components/MetricsCard';

export default function DashboardPage() {
  const [leads, setLeads] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [search, setSearch] = useState('');
  const router = useRouter();

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) {
      router.push('/login'); // Requirement: Redirect if token missing
      return;
    }
    loadData();
  }, []);

  const loadData = async () => {
    try {
      setLoading(true);
      const data = await fetchLeads();
      setLeads(data);
    } catch (err) {
      setError('Failed to load leads from server');
    } finally {
      setLoading(false);
    }
  };

  const filteredLeads = useMemo(() => {
    return leads.filter((l: any) => 
      l.name?.toLowerCase().includes(search.toLowerCase()) || l.phone?.includes(search)
    );
  }, [leads, search]);

  if (loading) return <div className="p-10 text-center font-bold animate-pulse">Connecting...</div>;

  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <Navbar />
      
      <div className="max-w-6xl mx-auto space-y-6">
        <div className="flex justify-between items-center">
          <input 
            type="text" 
            placeholder="Search leads..." 
            className="p-3 rounded-xl border w-80 outline-none focus:ring-2 focus:ring-blue-500"
            onChange={(e) => setSearch(e.target.value)}
          />
          <button onClick={() => router.push('/dashboard/new')} className="bg-blue-600 text-white px-6 py-3 rounded-xl font-bold shadow-lg">
            + New Lead
          </button>
        </div>

        <div className="flex gap-6">
          <MetricsCard title="Total Leads" value={leads.length} />
          <MetricsCard title="Converted" value={leads.filter((l: any) => l.status === 'CONVERTED').length} color="text-green-600" />
        </div>

        {error && <div className="p-4 bg-red-100 text-red-600 rounded-xl">{error}</div>}

        {/* This is where your table logic goes - it stays clean! */}
        <div className="bg-white rounded-[2rem] shadow-xl overflow-hidden border">
           {/* Paste your Table mapping code here */}
        </div>
      </div>
    </div>
  );
}