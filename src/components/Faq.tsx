import { useState } from 'react';
import { Plus, Minus } from 'lucide-react';
import { faqs } from '@/data';
import { useReveal } from '@/hooks/useReveal';

export default function Faq() {
  const { ref, visible } = useReveal<HTMLDivElement>();
  const [open, setOpen] = useState<number | null>(0);

  return (
    <section className="relative py-24 lg:py-32">
      <div className="absolute inset-0 -z-10 bg-cream" />
      <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-10">
        <div className="text-center max-w-2xl mx-auto">
          <span className="text-xs font-semibold uppercase tracking-[0.2em] text-blush-500">
            FAQ
          </span>
          <h2 className="mt-3 font-serif text-3xl sm:text-5xl font-semibold text-ink">
            Questions, answered
          </h2>
          <p className="mt-3 sm:mt-4 text-xs sm:text-base text-ink/70 leading-relaxed">
            Everything you need to know about GlowCare and your routine.
          </p>
        </div>

        <div ref={ref} className={`reveal ${visible ? 'is-visible' : ''} mt-10 sm:mt-12 space-y-3.5 sm:space-y-4`}>
          {faqs.map((f, i) => {
            const isOpen = open === i;
            return (
              <div
                key={f.question}
                className={`rounded-3xl ring-1 transition-all duration-300 overflow-hidden ${
                  isOpen
                    ? 'bg-blush-50 ring-blush-200 shadow-soft'
                    : 'bg-cream ring-blush-100 hover:ring-blush-200'
                }`}
              >
                <button
                  onClick={() => setOpen(isOpen ? null : i)}
                  className="w-full flex items-center justify-between gap-3 p-4 sm:p-6 text-left"
                >
                  <span className="font-serif text-base sm:text-xl font-semibold text-ink">
                    {f.question}
                  </span>
                  <span
                    className={`grid place-items-center w-8 h-8 sm:w-9 sm:h-9 rounded-full shrink-0 transition-colors duration-300 ${
                      isOpen ? 'bg-blush-500 text-white' : 'bg-blush-100 text-blush-600'
                    }`}
                  >
                    {isOpen ? <Minus className="w-3.5 h-3.5" /> : <Plus className="w-3.5 h-3.5" />}
                  </span>
                </button>
                <div
                  className={`grid transition-all duration-400 ease-out ${
                    isOpen ? 'grid-rows-[1fr] opacity-100' : 'grid-rows-[0fr] opacity-0'
                  }`}
                >
                  <div className="overflow-hidden">
                    <p className="px-4 sm:px-6 pb-5 sm:pb-6 text-xs sm:text-sm text-ink/70 leading-relaxed">
                      {f.answer}
                    </p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
