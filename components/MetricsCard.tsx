interface MetricsCardProps { title: string; value: number; color?: string; }

export default function MetricsCard({ title, value, color = "text-black" }: MetricsCardProps) {
  return (
    <div className="bg-white p-6 rounded-3xl shadow-sm border border-gray-100 flex-1">
      <p className="text-gray-500 text-xs font-bold uppercase tracking-widest">{title}</p>
      <p className={`text-4xl font-black ${color}`}>{value}</p>
    </div>
  );
}