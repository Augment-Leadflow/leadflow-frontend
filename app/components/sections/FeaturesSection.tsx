import { FEATURES } from '@/app/lib/mockData';

export function FeaturesSection() {
  return (
    <section id="features" className="py-24 bg-gradient-to-br from-slate-50 to-indigo-50/40">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Header */}
        <div className="text-center mb-16">
          <span className="inline-block px-4 py-1.5 rounded-full bg-indigo-100 text-indigo-600 font-bold text-sm border border-indigo-200 mb-4">
            Powerful Features
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 mb-4">
            Everything your sales team{' '}
            <span className="bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 bg-clip-text text-transparent">
              needs to win
            </span>
          </h2>
          <p className="text-slate-500 text-lg max-w-2xl mx-auto">
            From first contact to closed deal — LeadFlow covers your entire revenue operation in one unified platform.
          </p>
        </div>

        {/* Feature cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {FEATURES.map((f, i) => (
            <div
              key={f.title}
              className="group relative bg-white rounded-3xl p-8 border border-slate-100 hover:shadow-2xl hover:-translate-y-2 transition-all duration-400 overflow-hidden cursor-default"
            >
              {/* Hover gradient overlay */}
              <div className={`absolute inset-0 bg-gradient-to-br ${f.color} opacity-0 group-hover:opacity-5 transition-opacity duration-300 rounded-3xl`} />

              {/* Icon */}
              <div className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${f.color} flex items-center justify-center text-2xl mb-6 shadow-lg shadow-indigo-100 group-hover:scale-110 transition-transform duration-300`}>
                {f.icon}
              </div>

              <h3 className="text-xl font-black text-slate-800 mb-3">{f.title}</h3>
              <p className="text-slate-500 leading-relaxed text-sm">{f.description}</p>

              {/* Arrow indicator */}
              <div className="mt-6 flex items-center gap-2 text-indigo-500 font-semibold text-sm opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <span>Learn more</span>
                <span className="group-hover:translate-x-1 transition-transform">→</span>
              </div>

              {/* Card number */}
              <div className="absolute top-6 right-6 text-slate-100 text-5xl font-black select-none">
                {String(i + 1).padStart(2, '0')}
              </div>
            </div>
          ))}
        </div>

        {/* Bottom CTA strip */}
        <div className="mt-16 text-center p-10 rounded-3xl bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 relative overflow-hidden">
          <div className="absolute inset-0 opacity-10">
            <div className="absolute top-0 left-0 w-64 h-64 bg-white rounded-full blur-3xl -translate-x-1/2 -translate-y-1/2" />
            <div className="absolute bottom-0 right-0 w-64 h-64 bg-white rounded-full blur-3xl translate-x-1/2 translate-y-1/2" />
          </div>
          <div className="relative z-10">
            <p className="text-white text-2xl font-black mb-2">Ready to see it in action?</p>
            <p className="text-white/70 mb-6 text-sm">No credit card required. Set up in 5 minutes.</p>
            <a
              href="/register"
              className="inline-flex items-center gap-2 px-8 py-4 bg-white text-indigo-700 font-bold rounded-2xl hover:shadow-2xl hover:-translate-y-1 transition-all duration-300"
            >
             Boost Your Sales Now →
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
