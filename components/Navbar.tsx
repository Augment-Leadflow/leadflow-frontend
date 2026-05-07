'use client';
import { useRouter } from 'next/navigation';

export default function Navbar() {
  const router = useRouter();
  const handleLogout = () => {
    localStorage.removeItem('token');
    router.push('/login');
  };

  return (
    <nav className="bg-white shadow mb-6 p-4 flex justify-between items-center rounded-2xl">
      <h1 className="text-xl font-bold text-blue-600">LeadFlow CRM</h1>
      <button onClick={handleLogout} className="text-gray-600 hover:text-red-600 font-medium">Logout</button>
    </nav>
  );
}