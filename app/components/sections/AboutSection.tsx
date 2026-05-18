import { Target, Users, Zap, ShieldCheck } from 'lucide-react';

const pillars = [
  { icon: Target,      title: 'Mission-Driven',   desc: 'Built to help sales teams focus on relationships, not admin work.',        color: 'from-indigo-500 to-purple-600' },
  { icon: Users,       title: 'Team-First',        desc: 'Designed for collaboration across teams of any size, globally.',            color: 'from-purple-500 to-pink-600'   },
  { icon: Zap,         title: 'Speed & Simplicity',desc: 'Onboard in minutes. Intuitive enough that training is optional.',          color: 'from-pink-500 to-rose-600'     },
  { icon: ShieldCheck, title: 'Enterprise-Grade',  desc: 'SOC 2 Type II, GDPR compliant. Your data is always safe with us.',         color: 'from-emerald-500 to-teal-600'  },
];

const timeline = [
  { year: '2021', event: 'Founded with a vision to simplify CRM for growing businesses.' },
  { year: '2022', event: 'Launched beta. 500 early adopters. Product-market fit confirmed.' },
  { year: '2023', event: 'Series A funding. 10,000 businesses on the platform.' },
  { year: '2024', event: 'AI lead scoring launched. Conversion rates up 40% for customers.' },
  { year: '2026', event: '50,000+ businesses worldwide. Expanding to 15 new markets.' },
];

export function AboutSection() {
  return (
    <section id="about" className="py-24 bg-white overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Section label */}
        <div className="text-center mb-16">
          <span className="inline-block px-4 py-1.5 rounded-full bg-indigo-50 text-indigo-600 font-bold text-sm border border-indigo-100 mb-4">
            About LeadFlow
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 mb-4">
            We are on a mission to make{' '}
            <span className="bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
              every lead count
            </span>
          </h2>
          <p className="text-slate-500 text-lg max-w-2xl mx-auto leading-relaxed">
            Founded by sales veterans and engineers, LeadFlow was built because we experienced first-hand how much revenue slips through the cracks of clunky CRMs.
          </p>
        </div>

        {/* Two columns */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start mb-20">

          {/* Left — story */}
          <div>
            <p className="text-slate-600 text-lg leading-relaxed mb-6">
              Traditional CRMs are powerful but painfully complex. Small and mid-sized sales teams end up spending more time updating the CRM than actually selling. LeadFlow fixes that.
            </p>
            <p className="text-slate-600 leading-relaxed mb-8">
              We built a platform that automates the busywork — lead capture, follow-up sequences, status updates — so your team can focus on building relationships and closing deals.
            </p>

            {/* Mini stats */}
            <div className="grid grid-cols-3 gap-4">
              {[
                { value: '50K+', label: 'Businesses' },
                { value: '5M+',  label: 'Leads Managed' },
                { value: '98%',  label: 'Satisfaction' },
              ].map((s) => (
                <div key={s.label} className="bg-gradient-to-br from-indigo-50 to-purple-50 rounded-2xl p-4 text-center border border-indigo-100">
                  <p className="text-3xl font-black bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">{s.value}</p>
                  <p className="text-slate-500 text-sm font-medium mt-1">{s.label}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Right — timeline */}
          <div className="space-y-4">
            <h3 className="text-xl font-black text-slate-800 mb-6">Our Journey</h3>
            {timeline.map((item, i) => (
              <div key={i} className="flex gap-4 group">
                <div className="flex flex-col items-center">
                  <div className="w-10 h-10 rounded-full bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center text-white text-xs font-black shadow-lg shadow-indigo-200 flex-shrink-0">
                    {item.year.slice(2)}
                  </div>
                  {i < timeline.length - 1 && (
                    <div className="w-0.5 h-full bg-gradient-to-b from-indigo-200 to-transparent mt-2" />
                  )}
                </div>
                <div className="pb-6">
                  <p className="text-indigo-600 font-black text-sm mb-0.5">{item.year}</p>
                  <p className="text-slate-600 text-sm leading-relaxed">{item.event}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Pillars grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {pillars.map((p) => (
            <div
              key={p.title}
              className="group p-6 rounded-3xl border border-slate-100 bg-white hover:shadow-xl hover:-translate-y-1 transition-all duration-300 cursor-default"
            >
              <div className={`w-12 h-12 rounded-2xl bg-gradient-to-br ${p.color} flex items-center justify-center mb-4 shadow-lg group-hover:scale-110 transition-transform duration-300`}>
                <p.icon className="w-6 h-6 text-white" />
              </div>
              <h4 className="font-bold text-slate-800 mb-2">{p.title}</h4>
              <p className="text-slate-500 text-sm leading-relaxed">{p.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
