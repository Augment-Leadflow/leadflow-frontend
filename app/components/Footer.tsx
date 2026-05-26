'use client';

import Link from "next/link";
import { 
  ArrowRight, CheckCircle2, Shield, Zap, BarChart3, Phone, Mail, MapPin, AlertCircle
} from "lucide-react";
import { useState } from "react";

const footerLinks = {
  platform: [
    { label: "Lead Capture", href: "#features" },
    { label: "Sales Pipeline", href: "#features" },
    { label: "Email Automation", href: "#features" },
    { label: "Analytics Dashboard", href: "#features" },
    { label: "Team Collaboration", href: "#features" },
  ],
  resources: [
    { label: "Documentation", href: "/docs" },
    { label: "Guides & Tutorials", href: "/tutorials" },
    { label: "API Reference", href: "/api-docs" },
    { label: "Blog", href: "/blog" },
    { label: "Community Forum", href: "/forum" },
  ],
  company: [
    { label: "About Us", href: "#about" },
    { label: "Careers", href: "/careers" },
    { label: "Partners", href: "/partners" },
    { label: "Contact", href: "#contact" },
  ],
};

const features = [
  { icon: CheckCircle2, title: "Instant Setup", desc: "Get started in minutes, not weeks. Zero configuration required." },
  { icon: Shield, title: "Enterprise Security", desc: "SOC 2 Type II certified with bank-grade data protection." },
  { icon: Zap, title: "Lightning Fast", desc: "Sub-second response times even with millions of records." },
  { icon: BarChart3, title: "Smart Analytics", desc: "AI-driven insights that predict trends and opportunities." },
];

export function Footer() {
  // ── 🌟 NEW: Interactive Coming Soon Micro-Toast State ──
  const [toast, setToast] = useState({ show: false, label: "" });

  const triggerToast = (label: string) => {
    setToast({ show: true, label });
    setTimeout(() => setToast({ show: false, label: "" }), 3000);
  };

  const handleSmoothScroll = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    if (href.startsWith('#')) {
      e.preventDefault();
      const id = href.replace('#', '');
      const element = document.getElementById(id);
      if (element) {
        const headerOffset = 80;
        const elementPosition = element.getBoundingClientRect().top;
        const offsetPosition = elementPosition + window.pageYOffset - headerOffset;
        window.scrollTo({ top: offsetPosition, behavior: "smooth" });
      } else {
        // Fallback agar landing page ke id sections abhi register nahi hue hain
        window.scrollTo({ top: 0, behavior: "smooth" });
      }
    }
  };

  return (
    <>
      {/* ── 🌟 NEW: Dynamic Floating Coming Soon Micro-Toast Notice ── */}
      {toast.show && (
        <div className="fixed bottom-6 right-6 z-50 flex items-center gap-2.5 bg-slate-900 border border-slate-800 text-white px-4 py-3 rounded-xl shadow-2xl animate-in fade-in slide-in-from-bottom-2 duration-200">
          <AlertCircle className="w-4 h-4 text-indigo-400" />
          <p className="text-xs font-semibold">The <span className="text-indigo-400">{toast.label}</span> workspace dashboard module is launching next week!</p>
        </div>
      )}

      {/* ── 🚀 Action Value Callout Banner ── */}
      <div className="bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 text-white py-16 relative overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute -top-40 -left-20 w-96 h-96 bg-white rounded-full blur-3xl"></div>
          <div className="absolute bottom-0 right-0 w-96 h-96 bg-white rounded-full blur-3xl"></div>
        </div>
        
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
          <h3 className="text-3xl sm:text-4xl font-extrabold mb-4 tracking-tight">Ready to Transform Your Sales?</h3>
          <p className="text-lg text-white/90 mb-8 max-w-2xl mx-auto font-medium">
            Join 50,000+ businesses that grew revenue with Leadflow. Boost your sales today.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Link
              href="/register"
              className="group flex items-center gap-2 px-8 py-4 bg-white text-indigo-600 font-bold rounded-xl hover:shadow-2xl hover:-translate-y-0.5 active:scale-[0.98] transition-all duration-200 text-base"
            >
              <span>Get Started Free</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </Link>
            <span className="text-white/70 text-xs font-semibold uppercase tracking-wider">No credit card required</span>
          </div>
        </div>
      </div>

      {/* ── Features Metric Badges ── */}
      <div className="bg-slate-900 py-12 border-y border-slate-800/60">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {features.map((feature, index) => (
              <div 
                key={index} 
                onClick={() => triggerToast(feature.title)}
                className="flex items-start gap-4 p-5 rounded-2xl bg-slate-950/40 border border-slate-800/80 hover:border-indigo-500/30 hover:bg-slate-950/80 transition-all duration-200 cursor-pointer group"
              >
                <div className="w-10 h-10 bg-gradient-to-br from-indigo-500/10 to-purple-500/10 border border-indigo-500/20 rounded-xl flex items-center justify-center flex-shrink-0 group-hover:scale-105 transition-transform">
                  <feature.icon className="w-5 h-5 text-indigo-400 group-hover:text-indigo-300 transition-colors" />
                </div>
                <div>
                  <h4 className="font-bold text-white text-sm mb-1 group-hover:text-indigo-400 transition-colors">{feature.title}</h4>
                  <p className="text-slate-400 text-xs leading-relaxed">{feature.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ── Main Dashboard Footer Area ── */}
      <footer className="bg-slate-950 text-slate-300 pt-16 pb-8 border-t border-slate-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          {/* Main Links Matrix */}
          <div className="grid grid-cols-2 lg:grid-cols-5 gap-8 mb-16">
            
            {/* Brand Presentation Identity Card */}
            <div className="col-span-2 space-y-5">
              <div className="flex items-center gap-2.5">
                <div className="w-9 h-9 bg-gradient-to-tr from-emerald-400 to-teal-500 rounded-xl flex items-center justify-center shadow-md shadow-emerald-500/20">
                  <svg className="w-4 h-4 text-slate-950" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 13.5l10.5-11.25L12 10.5h8.25L9.75 21.75 12 13.5H3.75z" />
                  </svg>
                </div>
                <span className="text-xl font-black text-white tracking-tight uppercase">Leadflow</span>
              </div>
              <p className="text-slate-400 text-sm max-w-sm leading-relaxed">
                The all-in-one platform for managing your leads, nurturing relationships, and driving revenue growth. Built for modern sales teams.
              </p>
              
              {/* Branded Social Links with Real External Routing targets */}
              <div className="flex gap-2.5 pt-2">
                <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="w-9 h-9 bg-slate-900 border border-white/5 hover:bg-[#1877F2] hover:border-transparent rounded-xl flex items-center justify-center transition-all duration-200 hover:-translate-y-0.5 text-slate-400 hover:text-white" aria-label="Facebook">
                  <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M22 12c0-5.52-4.48-10-10-10S2 6.48 2 12c0 4.84 3.44 8.87 8 9.8V15H8v-3h2V9.5C10 7.57 11.57 6 13.5 6H16v3h-2c-.55 0-1 .45-1 1v2h3v3h-3v6.95c4.56-.93 8-4.96 8-9.95z" />
                  </svg>
                </a>
                <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="w-9 h-9 bg-slate-900 border border-white/5 hover:bg-[#E1306C] hover:border-transparent rounded-xl flex items-center justify-center transition-all duration-200 hover:-translate-y-0.5 text-slate-400 hover:text-white" aria-label="Instagram">
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24">
                    <rect x="2" y="2" width="20" h="20" rx="5" ry="5" />
                    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
                    <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
                  </svg>
                </a>
                <a href="https://x.com" target="_blank" rel="noopener noreferrer" className="w-9 h-9 bg-slate-900 border border-white/5 hover:bg-[#000000] hover:border-transparent rounded-xl flex items-center justify-center transition-all duration-200 hover:-translate-y-0.5 text-slate-400 hover:text-white" aria-label="Twitter">
                  <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
                  </svg>
                </a>
                <a href="https://whatsapp.com" target="_blank" rel="noopener noreferrer" className="w-9 h-9 bg-slate-900 border border-white/5 hover:bg-[#25D366] hover:border-transparent rounded-xl flex items-center justify-center transition-all duration-200 hover:-translate-y-0.5 text-slate-400 hover:text-white" aria-label="WhatsApp">
                  <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L0 24l6.335-1.662c1.746.953 3.71 1.458 5.704 1.459h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
                  </svg>
                </a>
              </div>
            </div>

            {/* Platform links */}
            <div className="space-y-4">
              <h4 className="font-bold text-white text-xs uppercase tracking-widest text-indigo-400">Platform</h4>
              <ul className="space-y-2.5 text-sm">
                {footerLinks.platform.map((link, idx) => (
                  <li key={idx}>
                    <Link href={link.href} onClick={(e) => handleSmoothScroll(e, link.href)} className="text-slate-400 hover:text-indigo-400 transition-colors duration-150 block py-0.5">
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Resources Links with Micro Toast Interactivity */}
            <div className="space-y-4">
              <h4 className="font-bold text-white text-xs uppercase tracking-widest text-purple-400">Resources</h4>
              <ul className="space-y-2.5 text-sm">
                {footerLinks.resources.map((link, idx) => (
                  <li key={idx}>
                    <button 
                      onClick={() => triggerToast(link.label)} 
                      className="text-slate-400 hover:text-purple-400 text-left transition-colors duration-150 block py-0.5 w-full focus:outline-none"
                    >
                      {link.label}
                    </button>
                  </li>
                ))}
              </ul>
            </div>

            {/* Company links */}
            <div className="space-y-4">
              <h4 className="font-bold text-white text-xs uppercase tracking-widest text-pink-400">Company</h4>
              <ul className="space-y-2.5 text-sm">
                {footerLinks.company.map((link, idx) => (
                  <li key={idx}>
                    {link.href.startsWith('#') ? (
                      <Link href={link.href} onClick={(e) => handleSmoothScroll(e, link.href)} className="text-slate-400 hover:text-pink-400 transition-colors duration-150 block py-0.5">
                        {link.label}
                      </Link>
                    ) : (
                      <button 
                        onClick={() => triggerToast(link.label)} 
                        className="text-slate-400 hover:text-pink-400 text-left transition-colors duration-150 block py-0.5 w-full focus:outline-none"
                      >
                        {link.label}
                      </button>
                    )}
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Bottom Metabar Row Details */}
          <div className="border-t border-slate-900 pt-8 flex flex-col md:flex-row items-center justify-between gap-6">
            <p className="text-slate-500 text-xs font-medium uppercase tracking-wider">
              &copy; 2026 Leadflow Inc. All rights reserved.
            </p>
            
            {/* Contact Details Info Links */}
            <div className="flex flex-wrap items-center justify-center gap-y-4 gap-x-6 text-slate-400">
              <a href="tel:+15551234567" className="flex items-center gap-2 hover:text-emerald-400 transition-colors text-xs font-semibold group">
                <Phone className="w-3.5 h-3.5 text-slate-500 group-hover:text-emerald-400 transition-colors" />
                <span>+1 (555) 123-4567</span>
              </a>
              <a href="mailto:hello@leadflow.com" className="flex items-center gap-2 hover:text-indigo-400 transition-colors text-xs font-semibold group">
                <Mail className="w-3.5 h-3.5 text-slate-500 group-hover:text-indigo-400 transition-colors" />
                <span>hello@leadflow.com</span>
              </a>
              <a href="#contact" onClick={(e) => handleSmoothScroll(e, '#contact')} className="flex items-center gap-2 hover:text-pink-400 transition-colors text-xs font-semibold group">
                <MapPin className="w-3.5 h-3.5 text-slate-500 group-hover:text-pink-400 transition-colors" />
                <span>San Francisco, CA</span>
              </a>
            </div>
          </div>

          {/* ── 🌟 NEW: Legal Terms Inline Row ── */}
          <div className="mt-4 pt-4 border-t border-slate-900/40 flex flex-wrap justify-center gap-x-6 gap-y-2 text-[11px] text-slate-600 font-medium uppercase tracking-wide">
            <button onClick={() => triggerToast("Privacy Policy")} className="hover:text-slate-400 transition-colors">Privacy Policy</button>
            <button onClick={() => triggerToast("Terms of Service")} className="hover:text-slate-400 transition-colors">Terms of Service</button>
            <button onClick={() => triggerToast("Cookie Policy")} className="hover:text-slate-400 transition-colors">Cookie Policy</button>
            <button onClick={() => triggerToast("GDPR Compliance")} className="hover:text-slate-400 transition-colors">GDPR Compliance</button>
          </div>

        </div>
      </footer>
    </>
  );
}