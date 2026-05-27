'use client';

import Link from 'next/link';
import { ArrowRight, Play, Sparkles } from 'lucide-react';

// Compact Interactive Pipeline Mockup - Re-engineered for Off-White Canvas contrast
function IngestionDashboardMockup() {
  return (
    <div className="relative w-full max-w-sm mx-auto mt-8 lg:mt-0 px-2 sm:px-0">
      
      {/* Central High-Contrast Premium White Glass Card */}
      <div className="bg-white/80 backdrop-blur-2xl border border-slate-200/80 rounded-3xl p-6 shadow-xl shadow-slate-200/50 relative z-10">
        
        {/* Metric Header Row */}
        <div className="flex items-center justify-between mb-5">
          <span className="text-slate-500 text-xs font-bold uppercase tracking-wider">Pipeline Engine</span>
          <span className="bg-emerald-50 text-emerald-600 text-xs font-bold px-2.5 py-0.5 rounded-full border border-emerald-200">
            ↑ 24% Velocity
          </span>
        </div>

        {/* Eye-catching Colorful Data Bars */}
        <div className="flex items-end gap-2.5 h-24 mb-5 px-1">
          {[45, 75, 55, 95, 65, 100, 80].map((val, idx) => (
            <div 
              key={idx} 
              className="flex-1 rounded-t-md bg-gradient-to-t from-indigo-600 via-purple-500 to-pink-500 shadow-sm shadow-indigo-100"
              style={{ height: `${val}%` }} 
            />
          ))}
        </div>

        {/* Key Funnel Breakdowns */}
        <div className="grid grid-cols-3 gap-2">
          {[
            { label: 'Ingested', value: '48', color: 'text-indigo-600', border: 'border-indigo-100', bg: 'bg-indigo-50/30' },
            { label: 'Scored', value: '127', color: 'text-purple-600', border: 'border-purple-100', bg: 'bg-purple-50/30' },
            { label: 'Closed', value: '36', color: 'text-emerald-600', border: 'border-emerald-100', bg: 'bg-emerald-50/30' },
          ].map((item) => (
            <div key={item.label} className={`rounded-xl p-2.5 text-center border ${item.border} ${item.bg}`}>
              <p className={`text-xl font-black ${item.color}`}>{item.value}</p>
              <p className="text-slate-500 text-[9px] font-bold uppercase tracking-wider mt-0.5">{item.label}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Floating Sub-card Notification Badge */}
      <div className="absolute -top-3 -right-2 bg-gradient-to-r from-emerald-500 to-teal-500 rounded-xl px-3.5 py-2 shadow-lg shadow-emerald-200 border border-emerald-400/20 z-20 hidden sm:block">
        <p className="text-white text-[11px] font-bold flex items-center gap-1.5">
          <span className="w-1.5 h-1.5 rounded-full bg-white animate-ping" />
          Lead Qualified
        </p>
      </div>

      {/* Secondary Floating Micro Badge */}
      <div className="absolute -bottom-3 -left-2 bg-white border border-slate-200 rounded-xl px-3.5 py-2 shadow-lg shadow-slate-200/60 z-20 hidden sm:block">
        <p className="text-slate-800 text-[11px] font-bold flex items-center gap-1">
          🔥 <span className="bg-gradient-to-r from-orange-600 to-red-600 bg-clip-text text-transparent">12 High-Intent Signals</span>
        </p>
      </div>

    </div>
  );
}

export function HeroSection() {
  return (
    <section
      id="home"
      className="relative min-h-screen flex items-center bg-[#faf9f6] text-slate-800 overflow-hidden pt-24 pb-12 sm:py-32"
    >
      {/* ── 🌟 Colorful Fluid Ambient Light Flares (Gives the Eye-Catching Pop) ── */}
      <div className="absolute top-[-10%] left-[-5%] w-[600px] h-[600px] rounded-full bg-gradient-to-br from-indigo-300/20 to-purple-400/10 blur-[120px] pointer-events-none" />
      <div className="absolute bottom-[-10%] right-[-5%] w-[600px] h-[600px] rounded-full bg-gradient-to-br from-pink-300/20 to-purple-400/20 blur-[140px] pointer-events-none" />

      {/* Minimal Structural Precision Alignment Grid Lines */}
      <div className="absolute inset-0 opacity-[0.03] pointer-events-none" style={{
        backgroundImage: 'linear-gradient(rgba(15, 23, 42, 1) 1px, transparent 1px), linear-gradient(90deg, rgba(15, 23, 42, 1) 1px, transparent 1px)',
        backgroundSize: '60px 60px',
      }} />

      <div className="relative z-10 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">

          {/* Left Text Block Container Column */}
          <div className="lg:col-span-7 space-y-6 text-center lg:text-left">
            
            {/* Tag Notification Header Capsule */}
            <span className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-indigo-50 border border-indigo-100 shadow-sm text-indigo-600 font-bold text-xs tracking-wider uppercase mx-auto lg:mx-0">
              <Sparkles className="w-3.5 h-3.5 text-indigo-500" /> Pipeline Acceleration Engine
            </span>
            
            {/* Primary Action Title Header Group */}
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black text-slate-900 tracking-tight leading-[1.1]">
              Smart Leads.<br />
              <span className="bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-500 bg-clip-text text-transparent">
                Smarter Decisions.
              </span>
            </h1>
            
            {/* Context Sub-paragraph Description */}
            <p className="text-slate-600 text-sm sm:text-base lg:text-lg leading-relaxed max-w-xl mx-auto lg:mx-0 font-medium">
              Leadflow scores every prospect using deep predictive behavior modeling, enabling your sales infrastructure to prioritize high-value intent instantly for maximum revenue impact.
            </p>

            {/* Sub-action Interaction Anchors */}
            <div className="flex flex-wrap items-center justify-center lg:justify-start gap-4 pt-2">
              <Link
                href="/register"
                className="group flex items-center gap-2 px-6 py-3 bg-slate-900 text-white font-bold rounded-xl shadow-lg shadow-slate-900/10 hover:bg-slate-800 hover:-translate-y-0.5 transition-all duration-150 text-sm"
              >
                <span>Maximize Your Revenue</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
              </Link>
              <Link
                href="#features"
                className="flex items-center gap-2 px-6 py-3 text-slate-700 font-semibold rounded-xl border border-slate-200 bg-white hover:bg-slate-50 hover:border-slate-300 shadow-sm transition-all duration-150 text-sm"
                onClick={(e) => {
                  e.preventDefault();
                  document.getElementById('features')?.scrollIntoView({ behavior: 'smooth' });
                }}
              >
                <Play className="w-3.5 h-3.5 fill-current text-slate-500" />
                <span>See How It Works</span>
              </Link>
            </div>

            {/* Social Trust Metrics Strip Layout */}
            <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-3.5 pt-6 border-t border-slate-200 max-w-md mx-auto lg:mx-0">
              <div className="flex -space-x-2">
                {['SC', 'MJ', 'PN', 'DP'].map((initials, index) => (
                  <div 
                    key={index} 
                    className="w-8 h-8 rounded-full bg-gradient-to-br from-indigo-500 via-purple-500 to-pink-500 flex items-center justify-center text-white text-[10px] font-bold border-2 border-[#faf9f6] shadow-sm"
                  >
                    {initials}
                  </div>
                ))}
              </div>
              <p className="text-slate-500 text-xs font-bold uppercase tracking-wider">
                Trusted by <span className="text-indigo-600 font-black">50,000+ Operators</span> worldwide
              </p>
            </div>

          </div>

          {/* Right Side Visual Module - Embedded Ingestion Dashboard Mockup */}
          <div className="lg:col-span-5 flex justify-center items-center">
            <IngestionDashboardMockup />
          </div>

        </div>
      </div>
    </section>
  );
}