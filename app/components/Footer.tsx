import Link from "next/link";
import { 
  ArrowRight, CheckCircle2, Shield, Zap, BarChart3, Users, 
  Star, Phone, Mail, MapPin 
} from "lucide-react";

const footerLinks = {
  platform: [
    { label: "Lead Capture", href: "#" },
    { label: "Sales Pipeline", href: "#" },
    { label: "Email Automation", href: "#" },
    { label: "Analytics Dashboard", href: "#" },
    { label: "Team Collaboration", href: "#" },
  ],
  resources: [
    { label: "Documentation", href: "#" },
    { label: "Guides & Tutorials", href: "#" },
    { label: "API Reference", href: "#" },
    { label: "Blog", href: "#" },
    { label: "Community Forum", href: "#" },
  ],
  company: [
    { label: "About Us", href: "#about" },
    { label: "Careers", href: "#" },
    { label: "Partners", href: "#" },
    { label: "Contact", href: "#contact" },
  ],
  legal: [
    { label: "Privacy Policy", href: "#" },
    { label: "Terms of Service", href: "#" },
    { label: "Cookie Policy", href: "#" },
    { label: "GDPR Compliance", href: "#" },
  ],
};

const features = [
  { icon: CheckCircle2, title: "Instant Setup", desc: "Get started in minutes, not weeks. Zero configuration required." },
  { icon: Shield, title: "Enterprise Security", desc: "SOC 2 Type II certified with bank-grade data protection." },
  { icon: Zap, title: "Lightning Fast", desc: "Sub-second response times even with millions of records." },
  { icon: BarChart3, title: "Smart Analytics", desc: "AI-driven insights that predict trends and opportunities." },
];

export function Footer() {
  return (
    <>
      {/* CTA Banner */}
      <div className="bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 text-white py-16 relative overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute -top-40 -left-20 w-96 h-96 bg-white rounded-full blur-3xl"></div>
          <div className="absolute bottom-0 right-0 w-96 h-96 bg-white rounded-full blur-3xl"></div>
        </div>
        
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
          <h3 className="text-3xl sm:text-4xl font-bold mb-4">Ready to Transform Your Sales?</h3>
          <p className="text-xl text-white/80 mb-8 max-w-2xl mx-auto">
            Join 50,000+ businesses that grew revenue with Leadflow. Start your free 14-day trial today.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Link
              href="/register"
              className="group flex items-center gap-2 px-8 py-4 bg-white text-indigo-600 font-bold rounded-xl hover:shadow-2xl hover:-translate-y-1 transition-all duration-300 text-lg"
            >
              Start Free Trial
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </Link>
            <span className="text-white/60 text-sm">No credit card required</span>
          </div>
        </div>
      </div>

      {/* Features Showcase */}
      <div className="bg-slate-900 py-16 border-y border-slate-800">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <div key={index} className="text-center p-6 rounded-2xl bg-slate-800/50 border border-slate-700/50 hover:border-slate-600 transition-all duration-300">
                <div className="w-14 h-14 mx-auto bg-gradient-to-r from-indigo-500 to-purple-500 rounded-xl flex items-center justify-center mb-4">
                  <feature.icon className="w-7 h-7 text-white" />
                </div>
                <h4 className="font-semibold text-white text-lg mb-2">{feature.title}</h4>
                <p className="text-slate-400 text-sm">{feature.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Main Footer Content */}
      <footer className="bg-slate-950 text-slate-300 pt-16 pb-8">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 mb-12">
            {/* Brand Column */}
            <div className="lg:col-span-2">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-12 h-12 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 rounded-xl flex items-center justify-center">
                  <svg className="w-7 h-7 text-white" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M12 2L2 7l10 5 10-5-10-5z"/>
                    <path d="M2 17l10 5 10-5"/>
                    <path d="M2 12l10 5 10-5"/>
                  </svg>
                </div>
                <span className="text-2xl font-bold bg-gradient-to-r from-indigo-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">Leadflow</span>
              </div>
              <p className="text-slate-400 mb-6 max-w-md leading-relaxed">
                The all-in-one platform for managing your leads, nurturing relationships, and driving revenue growth. Built for modern sales teams.
              </p>
              <div className="flex gap-4">
                <a href="#" className="w-10 h-10 bg-slate-800 hover:bg-indigo-600 rounded-lg flex items-center justify-center transition-all duration-300 hover:-translate-y-1" aria-label="Twitter">
                  <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 24 24"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/></svg>
                </a>
                <a href="#" className="w-10 h-10 bg-slate-800 hover:bg-pink-600 rounded-lg flex items-center justify-center transition-all duration-300 hover:-translate-y-1" aria-label="Instagram">
                  <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 24 24"><circle cx="12" cy="12" r="4"/><path d="M16.882 3h-9.764C3.533 3 3 3.533 3 4.218v9.564C3 14.467 3.533 15 4.218 15h9.764c.685 0 1.218-.533 1.218-1.218V4.218C18.1 3.533 17.567 3 16.882 3zM12 16.5c-2.481 0-4.5-2.019-4.5-4.5s2.019-4.5 4.5-4.5 4.5 2.019 4.5 4.5-2.019 4.5-4.5 4.5zm0-7.5c-1.654 0-3 1.346-3 3s1.346 3 3 3 3-1.346 3-3-1.346-3-3-3z"/><circle cx="16.707" cy="7.293" r=".5"/></svg>
                </a>
                <a href="#" className="w-10 h-10 bg-slate-800 hover:bg-blue-600 rounded-lg flex items-center justify-center transition-all duration-300 hover:-translate-y-1" aria-label="LinkedIn">
                  <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 24 24"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/></svg>
                </a>
              </div>
            </div>

            {/* Links Columns */}
            <div>
              <h4 className="font-semibold text-white text-sm uppercase tracking-wider mb-4">Platform</h4>
              <ul className="space-y-3">
                {footerLinks.platform.map((link, index) => (
                  <li key={index}>
                    <Link href={link.href} className="text-slate-400 hover:text-white text-sm transition-colors duration-200 flex items-center gap-2 group">
                      <ArrowRight className="w-3 h-3 opacity-0 group-hover:opacity-100 text-indigo-400 transition-opacity" />
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h4 className="font-semibold text-white text-sm uppercase tracking-wider mb-4">Resources</h4>
              <ul className="space-y-3">
                {footerLinks.resources.map((link, index) => (
                  <li key={index}>
                    <Link href={link.href} className="text-slate-400 hover:text-white text-sm transition-colors duration-200 flex items-center gap-2 group">
                      <ArrowRight className="w-3 h-3 opacity-0 group-hover:opacity-100 text-indigo-400 transition-opacity" />
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h4 className="font-semibold text-white text-sm uppercase tracking-wider mb-4">Company</h4>
              <ul className="space-y-3">
                {footerLinks.company.map((link, index) => (
                  <li key={index}>
                    <Link href={link.href} className="text-slate-400 hover:text-white text-sm transition-colors duration-200 flex items-center gap-2 group">
                      <ArrowRight className="w-3 h-3 opacity-0 group-hover:opacity-100 text-indigo-400 transition-opacity" />
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h4 className="font-semibold text-white text-sm uppercase tracking-wider mb-4">Legal</h4>
              <ul className="space-y-3">
                {footerLinks.legal.map((link, index) => (
                  <li key={index}>
                    <Link href={link.href} className="text-slate-400 hover:text-white text-sm transition-colors duration-200 flex items-center gap-2 group">
                      <ArrowRight className="w-3 h-3 opacity-0 group-hover:opacity-100 text-indigo-400 transition-opacity" />
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Bottom Bar */}
          <div className="border-t border-slate-800 pt-8 flex flex-col md:flex-row items-center justify-between gap-6">
            <p className="text-slate-500 text-sm">
              2026 Leadflow Inc. All rights reserved.
            </p>
            <div className="flex items-center gap-6">
              <a href="tel:+15551234567" className="flex items-center gap-2 text-slate-400 hover:text-white transition-colors duration-200 group">
                <div className="w-8 h-8 bg-slate-800 rounded-lg flex items-center justify-center group-hover:bg-indigo-600 transition-colors">
                  <Phone className="w-4 h-4 text-indigo-400 group-hover:text-white" />
                </div>
                <span className="text-sm">+1 (555) 123-4567</span>
              </a>
              <a href="mailto:hello@leadflow.com" className="flex items-center gap-2 text-slate-400 hover:text-white transition-colors duration-200 group">
                <div className="w-8 h-8 bg-slate-800 rounded-lg flex items-center justify-center group-hover:bg-pink-600 transition-colors">
                  <Mail className="w-4 h-4 text-pink-400 group-hover:text-white" />
                </div>
                <span className="text-sm">hello@leadflow.com</span>
              </a>
              <a href="#contact" className="flex items-center gap-2 text-slate-400 hover:text-white transition-colors duration-200 group">
                <div className="w-8 h-8 bg-slate-800 rounded-lg flex items-center justify-center group-hover:bg-emerald-600 transition-colors">
                  <MapPin className="w-4 h-4 text-emerald-400 group-hover:text-white" />
                </div>
                <span className="text-sm">San Francisco, CA</span>
              </a>
            </div>
          </div>
        </div>
      </footer>
    </>
  );
}
