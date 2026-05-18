'use client';

import { useEffect, useRef, useState } from 'react';
import { STATS } from '@/app/lib/mockData';

function useCountUp(target: number, decimals: number, triggered: boolean) {
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!triggered) return;
    const duration = 2000;
    const steps = 60;
    const step = target / steps;
    let current = 0;
    const timer = setInterval(() => {
      current = Math.min(current + step, target);
      setCount(parseFloat(current.toFixed(decimals)));
      if (current >= target) clearInterval(timer);
    }, duration / steps);
    return () => clearInterval(timer);
  }, [target, decimals, triggered]);

  return count;
}

function StatCard({ value, label, suffix, decimals }: {
  value: number; label: string; suffix: string; decimals: number;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const [triggered, setTriggered] = useState(false);
  const count = useCountUp(value, decimals, triggered);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) { setTriggered(true); observer.disconnect(); } },
      { threshold: 0.5 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <div ref={ref} className="group text-center p-8 rounded-3xl border border-white/10 bg-white/5 backdrop-blur hover:bg-white/10 transition-all duration-300">
      <p className="text-5xl sm:text-6xl font-black text-white mb-2">
        {decimals === 0 ? count.toLocaleString() : count.toFixed(decimals)}
        <span className="text-3xl font-black bg-gradient-to-r from-indigo-300 to-pink-300 bg-clip-text text-transparent">{suffix}</span>
      </p>
      <p className="text-slate-400 font-semibold text-sm uppercase tracking-widest">{label}</p>
    </div>
  );
}

export function StatsSection() {
  return (
    <section id="stats" className="py-24 relative overflow-hidden bg-slate-950">
      {/* Gradient blobs */}
      <div className="absolute top-[-20%] left-[-10%] w-[500px] h-[500px] rounded-full bg-indigo-600/20 blur-[120px]" />
      <div className="absolute bottom-[-20%] right-[-10%] w-[600px] h-[600px] rounded-full bg-pink-600/15 blur-[140px]" />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <span className="inline-block px-4 py-1.5 rounded-full bg-white/10 text-white/80 font-bold text-sm border border-white/20 mb-4">
            By the Numbers
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white mb-4">
            Trusted by sales teams{' '}
            <span className="bg-gradient-to-r from-indigo-400 to-pink-400 bg-clip-text text-transparent">
              worldwide
            </span>
          </h2>
          <p className="text-slate-400 text-lg max-w-xl mx-auto">
            Real numbers from real customers. No vanity metrics, just results.
          </p>
        </div>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
          {STATS.map((s) => (
            <StatCard key={s.label} value={s.value} label={s.label} suffix={s.suffix} decimals={s.decimals} />
          ))}
        </div>

        {/* Logos strip */}
        <div className="mt-16 pt-12 border-t border-white/10">
          <p className="text-center text-slate-500 text-sm font-semibold uppercase tracking-widest mb-8">
            Powering growth for teams at
          </p>
          <div className="flex flex-wrap justify-center items-center gap-8">
            {['TechNova', 'GrowthHub', 'StartScale', 'Apex Solutions', 'DataPulse', 'NexGen'].map((c) => (
              <span
                key={c}
                className="text-slate-500 font-black text-lg hover:text-slate-300 transition-colors duration-300 cursor-default"
              >
                {c}
              </span>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
