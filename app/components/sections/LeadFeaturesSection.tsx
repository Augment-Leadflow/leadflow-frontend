const solutions = [
  {
    tag: 'Lead Capture',
    headline: 'Capture Every Lead,\nFrom Every Source',
    desc: 'Stop letting leads fall through the cracks. LeadFlow automatically pulls prospects from your website, social media, cold emails, ads and 50+ integrations into one unified inbox.',
    points: [
      'Web form builder with instant CRM sync',
      'LinkedIn, Facebook & Google Ads integration',
      'Email parser — forwards become leads instantly',
      'API webhooks for custom sources',
    ],
    gradient: 'from-indigo-500 to-purple-600',
    bg: 'from-indigo-50 to-purple-50',
    mockup: (
      <div className="bg-white rounded-2xl shadow-xl border border-indigo-100 p-5 space-y-3">
        <p className="text-xs font-black uppercase tracking-widest text-indigo-400 mb-3">Incoming Leads</p>
        {[
          { src: '🔗 LinkedIn', name: 'Sarah Chen', status: 'NEW',       time: '2s ago'  },
          { src: '📧 Email',    name: 'Alex Kumar', status: 'NEW',       time: '1m ago'  },
          { src: '🌐 Website',  name: 'Priya R.',   status: 'NEW',       time: '5m ago'  },
          { src: '📱 Google',   name: 'Mark Singh', status: 'CONTACTED', time: '12m ago' },
        ].map((l, i) => (
          <div key={i} className="flex items-center justify-between p-3 rounded-xl bg-slate-50 border border-slate-100 hover:bg-indigo-50 transition-colors">
            <div>
              <p className="font-bold text-slate-700 text-sm">{l.name}</p>
              <p className="text-slate-400 text-xs">{l.src}</p>
            </div>
            <div className="text-right">
              <span className={`text-[10px] font-black px-2 py-0.5 rounded-full ${l.status === 'NEW' ? 'bg-indigo-100 text-indigo-600' : 'bg-purple-100 text-purple-600'}`}>{l.status}</span>
              <p className="text-slate-400 text-[10px] mt-0.5">{l.time}</p>
            </div>
          </div>
        ))}
      </div>
    ),
  },
  {
    tag: 'Pipeline Management',
    headline: 'See Your Entire\nPipeline at a Glance',
    desc: 'Visual Kanban boards let you drag deals through every stage. Instantly see where deals are stuck, who owns what, and which leads need immediate attention.',
    points: [
      'Drag-and-drop Kanban pipeline',
      'Custom stages per product or team',
      'Deal value and probability tracking',
      'Automated stage-change notifications',
    ],
    gradient: 'from-purple-500 to-pink-600',
    bg: 'from-purple-50 to-pink-50',
    mockup: (
      <div className="bg-white rounded-2xl shadow-xl border border-purple-100 p-5">
        <p className="text-xs font-black uppercase tracking-widest text-purple-400 mb-3">Pipeline Board</p>
        <div className="grid grid-cols-4 gap-2">
          {['New', 'Contacted', 'Converted', 'Lost'].map((col, ci) => (
            <div key={col} className="space-y-2">
              <p className="text-[10px] font-black uppercase tracking-wide text-slate-400">{col}</p>
              {[ci === 0 ? 3 : ci === 1 ? 2 : ci === 2 ? 1 : 1].flatMap((n) =>
                Array.from({ length: n }, (_, i) => (
                  <div key={i} className={`h-10 rounded-lg border ${ci === 0 ? 'bg-indigo-50 border-indigo-200' : ci === 1 ? 'bg-purple-50 border-purple-200' : ci === 2 ? 'bg-emerald-50 border-emerald-200' : 'bg-rose-50 border-rose-200'}`} />
                ))
              )}
            </div>
          ))}
        </div>
      </div>
    ),
  },
  {
    tag: 'Email Automation',
    headline: 'Follow Up Automatically,\nPersonally & at Scale',
    desc: 'Set up smart email sequences that send the right message at the right time — triggered by lead behaviour. Personalization tokens keep every email feeling 1-on-1.',
    points: [
      'Visual sequence builder (drag & drop)',
      'Behavioural triggers: opens, clicks, replies',
      'Personalisation tokens and dynamic content',
      'A/B testing with automatic winner selection',
    ],
    gradient: 'from-pink-500 to-rose-600',
    bg: 'from-pink-50 to-rose-50',
    mockup: (
      <div className="bg-white rounded-2xl shadow-xl border border-pink-100 p-5 space-y-3">
        <p className="text-xs font-black uppercase tracking-widest text-pink-400 mb-3">Email Sequence</p>
        {[
          { day: 'Day 1',  event: 'Welcome email sent',       done: true  },
          { day: 'Day 3',  event: 'Follow-up — features',     done: true  },
          { day: 'Day 7',  event: 'Case study shared',        done: false },
          { day: 'Day 14', event: 'Demo booking CTA',         done: false },
        ].map((s, i) => (
          <div key={i} className="flex items-center gap-3">
            <div className={`w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold flex-shrink-0 ${s.done ? 'bg-emerald-500 text-white' : 'bg-slate-100 text-slate-400 border border-dashed border-slate-300'}`}>
              {s.done ? '✓' : i + 1}
            </div>
            <div className="flex-1 p-2 rounded-xl bg-slate-50 border border-slate-100">
              <p className="text-[10px] text-indigo-500 font-bold">{s.day}</p>
              <p className="text-slate-600 text-xs font-medium">{s.event}</p>
            </div>
          </div>
        ))}
      </div>
    ),
  },
];

export function LeadFeaturesSection() {
  return (
    <section id="solutions" className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        <div className="text-center mb-20">
          <span className="inline-block px-4 py-1.5 rounded-full bg-purple-100 text-purple-600 font-bold text-sm border border-purple-200 mb-4">
            Platform Solutions
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 mb-4">
            The complete lead management{' '}
            <span className="bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
              toolkit
            </span>
          </h2>
          <p className="text-slate-500 text-lg max-w-2xl mx-auto">
            Three powerful pillars that cover your entire revenue pipeline — from first click to closed deal.
          </p>
        </div>

        <div className="space-y-24">
          {solutions.map((s, i) => (
            <div
              key={s.tag}
              className={`grid grid-cols-1 lg:grid-cols-2 gap-12 items-center ${i % 2 === 1 ? 'lg:grid-flow-col-dense' : ''}`}
            >
              {/* Text side */}
              <div className={i % 2 === 1 ? 'lg:col-start-2' : ''}>
                <span className={`inline-block px-3 py-1 rounded-full bg-gradient-to-r ${s.gradient} text-white text-xs font-bold mb-4`}>
                  {s.tag}
                </span>
                <h3 className="text-3xl sm:text-4xl font-black text-slate-900 mb-4 whitespace-pre-line leading-tight">
                  {s.headline}
                </h3>
                <p className="text-slate-500 leading-relaxed mb-6">{s.desc}</p>
                <ul className="space-y-3">
                  {s.points.map((pt) => (
                    <li key={pt} className="flex items-start gap-3">
                      <span className={`w-5 h-5 rounded-full bg-gradient-to-br ${s.gradient} flex items-center justify-center text-white text-[10px] font-black flex-shrink-0 mt-0.5 shadow`}>
                        ✓
                      </span>
                      <span className="text-slate-600 text-sm leading-relaxed">{pt}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Mockup side */}
              <div className={`${i % 2 === 1 ? 'lg:col-start-1 lg:row-start-1' : ''} bg-gradient-to-br ${s.bg} rounded-3xl p-8 border border-slate-100`}>
                {s.mockup}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
