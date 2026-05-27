import { Star } from 'lucide-react';
import { TESTIMONIALS } from '@/app/lib/mockData';

function StarRating({ count }: { count: number }) {
  return (
    <div className="flex gap-0.5">
      {Array.from({ length: count }).map((_, i) => (
        <Star key={i} className="w-4 h-4 text-amber-400 fill-amber-400" />
      ))}
    </div>
  );
}

export function TestimonialsSection() {
  return (
    <section id="testimonials" className="py-24 bg-gradient-to-br from-slate-50 to-purple-50/30">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        <div className="text-center mb-16">
          <span className="inline-block px-4 py-1.5 rounded-full bg-amber-100 text-amber-600 font-bold text-sm border border-amber-200 mb-4">
            ⭐ Customer Love
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 mb-4">
            Loved by{' '}
            <span className="bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
              50,000+
            </span>{' '}
            businesses
          </h2>
          <p className="text-slate-500 text-lg max-w-xl mx-auto">
            Don&#39;t take our word for it — here is what real customers say about LeadFlow.
          </p>
        </div>

        {/* Testimonial cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {TESTIMONIALS.map((t, i) => (
            <div
              key={t.id}
              className={`group relative bg-white rounded-3xl p-6 border border-slate-100 shadow-sm hover:shadow-2xl hover:-translate-y-2 transition-all duration-400 flex flex-col ${i === 0 ? 'md:col-span-2 lg:col-span-1' : ''}`}
            >
              {/* Quote mark */}
              <div className="text-5xl font-black text-indigo-100 leading-none mb-2 select-none">&ldquo;</div>

              <p className="text-slate-600 text-sm leading-relaxed flex-1 mb-6">
                {t.quote}
              </p>

              <div className="mt-auto">
                <StarRating count={t.rating} />
                <div className="flex items-center gap-3 mt-4 pt-4 border-t border-slate-100">
                  <div className={`w-10 h-10 rounded-full bg-gradient-to-br ${t.gradient} flex items-center justify-center text-white text-sm font-black shadow-lg flex-shrink-0`}>
                    {t.avatar}
                  </div>
                  <div>
                    <p className="font-bold text-slate-800 text-sm">{t.name}</p>
                    <p className="text-slate-400 text-xs">{t.role} · {t.company}</p>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Trust bar */}
        <div className="mt-16 flex flex-wrap justify-center items-center gap-8 p-8 rounded-3xl bg-white border border-slate-100 shadow-sm">
          {[
            { label: 'G2',          score: '4.9/5',  reviews: '1,200+ reviews' },
            { label: 'Capterra',    score: '4.8/5',  reviews: '800+ reviews'   },
            { label: 'Product Hunt',score: '#1',     reviews: 'Tool of the day' },
            { label: 'TrustPilot',  score: 'Excellent', reviews: '2,500+ reviews' },
          ].map((b) => (
            <div key={b.label} className="text-center">
              <p className="font-black text-slate-800 text-lg">{b.score}</p>
              <p className="text-indigo-600 font-bold text-sm">{b.label}</p>
              <p className="text-slate-400 text-xs">{b.reviews}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
