'use client';

import { useState, useEffect } from 'react';
import { Mail, Phone, MapPin, Send, CheckCircle2, X } from 'lucide-react';

const contactInfo = [
  { icon: Mail,    label: 'Email Us',       value: 'leadflow.officiall@gmail.com', href: 'mailto:leadflow.officiall@gmail.com' },
  { icon: Phone,   label: 'Call Us',        value: '9876543210',       href: 'tel:+87654234'          },
  { icon: MapPin,  label: 'Visit Us',       value: 'Indore, Madhya Pradesh',  href: '#'                         },
];

export function ContactSection() {
  const [loading, setLoading] = useState(false);
  const [showThankYou, setShowThankYou] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [company, setCompany] = useState('');
  const [message, setMessage] = useState('');

  const handleFormSubmission = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setErrorMessage('');

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, email, phone, company, message }),
      });

      if (response.ok) {
        setShowThankYou(true);
        setName('');
        setEmail('');
        setPhone('');
        setCompany('');
        setMessage('');
      } else {
        setErrorMessage('Submission failed. Please try again later.');
      }
    } catch (err) {
      setErrorMessage('Network error. Check your connection.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <section id="contact" className="py-24 bg-white relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        <div className="text-center mb-16">
          <span className="inline-block px-4 py-1.5 rounded-full bg-emerald-100 text-emerald-600 font-bold text-sm border border-emerald-200 mb-4">
            Get In Touch
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 mb-4">
            Talk to our{' '}
            <span className="bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
              sales team
            </span>
          </h2>
          <p className="text-slate-500 text-lg max-w-xl mx-auto">
            Have questions? Our team responds within 24 hours. Or Boost Your Sales Now.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-5 gap-12">

          {/* Left — contact info */}
          <div className="lg:col-span-2 space-y-6">
            {contactInfo.map((c) => (
              <a
                key={c.label}
                href={c.href}
                className="group flex items-center gap-4 p-5 rounded-2xl border border-slate-100 bg-slate-50 hover:bg-white hover:shadow-lg hover:-translate-y-0.5 transition-all duration-300"
              >
                <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center flex-shrink-0 shadow-lg shadow-indigo-200 group-hover:scale-110 transition-transform duration-300">
                  <c.icon className="w-5 h-5 text-white" />
                </div>
                <div>
                  <p className="text-slate-500 text-xs font-bold uppercase tracking-wider">{c.label}</p>
                  <p className="text-slate-800 font-semibold text-sm mt-0.5 break-all">{c.value}</p>
                </div>
              </a>
            ))}

            {/* Extra info card */}
            <div className="p-6 rounded-2xl bg-gradient-to-br from-indigo-600 to-purple-700 text-white">
              <h4 className="font-black text-lg mb-2">Free 14-day trial</h4>
              <p className="text-indigo-200 text-sm leading-relaxed">
                No credit card required. Full access to all features. Cancel anytime.
              </p>
              <ul className="mt-4 space-y-2">
                {['Unlimited leads', 'Email automation', 'Analytics dashboard', 'Team collaboration'].map((pt) => (
                  <li key={pt} className="flex items-center gap-2 text-indigo-100 text-sm">
                    <CheckCircle2 className="w-4 h-4 text-emerald-300 flex-shrink-0" />
                    {pt}
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Right — form */}
          <div className="lg:col-span-3">
            <form onSubmit={handleFormSubmission} className="bg-slate-50 rounded-3xl p-8 border border-slate-100 space-y-5">
              
              {errorMessage && (
                <div className="p-4 bg-rose-50 border border-rose-100 text-rose-600 rounded-xl text-xs font-semibold flex items-center justify-between">
                  <span>{errorMessage}</span>
                  <X className="w-4 h-4 cursor-pointer text-rose-400" onClick={() => setErrorMessage('')} />
                </div>
              )}

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                <div className="space-y-1.5">
                  <label className="text-sm font-bold text-slate-700">Full Name *</label>
                  <input
                    type="text" required
                    value={name} onChange={(e) => setName(e.target.value)}
                    className="w-full p-3.5 bg-white border border-slate-200 rounded-xl outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all text-slate-700 text-sm"
                  />
                </div>
                <div className="space-y-1.5">
                  <label className="text-sm font-bold text-slate-700">Email *</label>
                  <input
                    type="email" required
                    value={email} onChange={(e) => setEmail(e.target.value)}
                    className="w-full p-3.5 bg-white border border-slate-200 rounded-xl outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all text-slate-700 text-sm"
                  />
                </div>
                <div className="space-y-1.5">
                  <label className="text-sm font-bold text-slate-700">Phone Number</label>
                  <input
                    type="tel"
                    value={phone} onChange={(e) => setPhone(e.target.value)}
                    className="w-full p-3.5 bg-white border border-slate-200 rounded-xl outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all text-slate-700 text-sm"
                  />
                </div>
                <div className="space-y-1.5">
                  <label className="text-sm font-bold text-slate-700">Business Requirements</label>
                  <input
                    type="text"
                    value={company} onChange={(e) => setCompany(e.target.value)}
                    className="w-full p-3.5 bg-white border border-slate-200 rounded-xl outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all text-slate-700 text-sm"
                  />
                </div>
              </div>
              <div className="space-y-1.5">
                <label className="text-sm font-bold text-slate-700">Message *</label>
                <textarea
                  required
                  value={message} onChange={(e) => setMessage(e.target.value)}
                  rows={4}
                  className="w-full p-3.5 bg-white border border-slate-200 rounded-xl outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all text-slate-700 text-sm resize-none"
                />
              </div>
              <button
                type="submit"
                disabled={loading}
                className="w-full py-4 bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 text-white font-bold rounded-xl shadow-lg shadow-indigo-500/30 hover:shadow-indigo-500/50 hover:-translate-y-0.5 transition-all duration-300 flex items-center justify-center gap-2 disabled:opacity-70"
              >
                {loading ? (
                  <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                ) : (
                  <Send className="w-5 h-5" />
                )}
                {loading ? 'Sending...' : 'Send Message'}
              </button>
            </form>
          </div>
        </div>
      </div>

      {/* Centered Thank You Modal */}
      {showThankYou && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm">
          <div className="bg-white w-full max-w-md rounded-3xl shadow-2xl p-8 border border-slate-100 text-center relative">
            <button
              onClick={() => setShowThankYou(false)}
              className="absolute top-4 right-4 p-1.5 text-slate-400 hover:text-slate-600 hover:bg-slate-100 rounded-full transition-colors"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-emerald-400 to-teal-500 text-white flex items-center justify-center mx-auto mb-6 shadow-xl shadow-emerald-200">
              <CheckCircle2 className="w-8 h-8" />
            </div>

            <h3 className="text-2xl font-black text-slate-900 tracking-tight">Thank You!</h3>
            <p className="text-indigo-600 font-bold text-sm mt-1">Submission Successful</p>
            
            <p className="text-slate-500 text-sm mt-4 leading-relaxed">
              Your inquiry has been processed and formatted into a structured summary layout. A copy has been routed directly to <span className="font-semibold text-slate-800">yogeshhammad949@gmail.com</span>.
            </p>

            <button
              type="button"
              onClick={() => setShowThankYou(false)}
              className="mt-6 w-full py-3 bg-slate-900 hover:bg-slate-800 text-white font-bold rounded-xl shadow-lg transition-colors text-sm"
            >
              Dismiss
            </button>
          </div>
        </div>
      )}
    </section>
  );
}
