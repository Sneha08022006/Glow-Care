import { Sparkles, Star, ArrowRight, Heart, Leaf, Flower2 } from 'lucide-react';
import heroImg from '@/assets/lumiere-hero.jpg';

interface HeroProps {
  onOpenAuth?: () => void;
}

export default function Hero({ onOpenAuth }: HeroProps) {
  return (
    <section
      id="home"
      className="relative overflow-hidden pt-28 pb-20 lg:pt-36 lg:pb-28 bg-gradient-to-b from-[#FFFDFB] via-[#FCF6F4] to-[#FFFDFB]"
    >
      {/* Background ambient lighting washes */}
      <div className="absolute inset-0 -z-10 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-[#F7E5E8]/60 via-[#FCF6F4]/40 to-transparent" />
      <div className="absolute -top-24 -left-24 w-[32rem] h-[32rem] rounded-full bg-[#F7E5E8]/50 blur-3xl animate-float-slow -z-10 pointer-events-none" />
      <div className="absolute top-48 -right-20 w-[28rem] h-[28rem] rounded-full bg-[#EED8DC]/50 blur-3xl animate-float-slower -z-10 pointer-events-none" />

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-10">
        <div className="grid lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          
          {/* LEFT: COPY & CALL-TO-ACTION */}
          <div className="lg:col-span-6 xl:col-span-7">
            
            {/* Top Brand Tag */}
            <div className="inline-flex items-center gap-2 rounded-full bg-white/80 backdrop-blur-md px-4 py-1.5 text-xs font-semibold text-[#9E4F63] ring-1 ring-[#9E4F63]/25 shadow-soft mb-4">
              <Sparkles className="w-3.5 h-3.5 text-[#9E4F63]" />
              <span className="font-brand tracking-widest text-[11px]">LUMIÈRE</span>
              <span className="text-ink/40">&bull;</span>
              <span>Beauty Lives in You</span>
            </div>

            {/* Handwritten Signature Script */}
            <h2 className="font-script text-5xl sm:text-6xl lg:text-7xl text-[#9E4F63] tracking-wide leading-tight select-none drop-shadow-xs">
              Glow Everyday You ♡
            </h2>

            {/* Main Editorial Headline */}
            <h1 className="mt-3 font-serif text-4xl sm:text-5xl lg:text-6xl font-semibold leading-[1.08] tracking-tight text-[#3A2E2B]">
              Science-backed luxury for a{' '}
              <span className="bg-gradient-to-r from-[#9E4F63] to-[#B26779] bg-clip-text text-transparent italic">
                more radiant you.
              </span>
            </h1>

            {/* Subtext */}
            <p className="mt-5 text-base sm:text-lg text-[#3A2E2B]/75 max-w-lg leading-relaxed">
              Skincare &bull; Makeup &bull; Selfcare. Experience dermatologist-prescribed clinical
              skincare with real ingredients tailored directly to your skin barrier.
            </p>

            {/* Actions */}
            <div className="mt-8 flex flex-wrap items-center gap-4">
              <a
                href="#quiz"
                className="group inline-flex items-center gap-2 rounded-full bg-[#9E4F63] hover:bg-[#883E51] text-white px-7 py-3.5 text-sm font-semibold shadow-soft-lg hover:shadow-xl hover:shadow-[#9E4F63]/25 transition-all duration-300 transform active:scale-95"
              >
                <span>Take the Skin Quiz</span>
                <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
              </a>

              <button
                type="button"
                onClick={onOpenAuth}
                className="inline-flex items-center gap-2 rounded-full bg-white/80 backdrop-blur-md px-6 py-3.5 text-sm font-semibold text-[#3A2E2B] ring-1 ring-[#9E4F63]/25 hover:bg-white hover:text-[#9E4F63] shadow-soft transition-all duration-300"
              >
                <span>Lumière Member Lounge ♡</span>
              </button>
            </div>

            {/* Social Proof */}
            <div className="mt-10 flex items-center gap-5">
              <div className="flex -space-x-3">
                {[
                  'https://images.pexels.com/photos/29755259/pexels-photo-29755259.jpeg?auto=compress&cs=tinysrgb&h=80&w=80',
                  'https://images.pexels.com/photos/9774655/pexels-photo-9774655.jpeg?auto=compress&cs=tinysrgb&h=80&w=80',
                  'https://images.pexels.com/photos/8140902/pexels-photo-8140902.jpeg?auto=compress&cs=tinysrgb&h=80&w=80',
                  'https://images.pexels.com/photos/13140394/pexels-photo-13140394.jpeg?auto=compress&cs=tinysrgb&h=80&w=80',
                ].map((src) => (
                  <img
                    key={src}
                    src={src}
                    alt="Happy customer"
                    className="w-10 h-10 rounded-full object-cover ring-2 ring-white shadow-xs"
                  />
                ))}
              </div>
              <div>
                <div className="flex items-center gap-1 text-[#9E4F63]">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-current" />
                  ))}
                </div>
                <p className="text-xs sm:text-sm text-[#3A2E2B]/75 mt-0.5">
                  Loved by <span className="font-semibold text-[#3A2E2B]">15,000+</span> radiant members
                </p>
              </div>
            </div>

          </div>

          {/* RIGHT: LUXURY VISUAL WITH FLOATING GLASS CARDS */}
          <div className="lg:col-span-6 xl:col-span-5 relative">
            <div className="relative mx-auto max-w-md lg:max-w-none">
              
              {/* Soft ambient back glow */}
              <div className="absolute inset-0 -m-6 rounded-[3rem] bg-gradient-to-br from-[#F7E5E8] to-[#EED8DC] blur-2xl opacity-75 pointer-events-none" />

              {/* Luxury Portrait Frame */}
              <div className="relative rounded-[2.5rem] overflow-hidden shadow-2xl ring-1 ring-white/90 bg-[#FAF3EE]">
                <img
                  src={heroImg}
                  alt="Lumière Beauty Editorial"
                  className="w-full h-[32rem] sm:h-[36rem] object-cover object-top hover:scale-105 transition-transform duration-1000"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#3A2E2B]/40 via-transparent to-transparent pointer-events-none" />
              </div>

              {/* Floating Handwritten Card: "Same Girl... Brighter Tomorrow ♡" */}
              <div className="absolute -left-4 sm:-left-8 bottom-12 z-20 transform -rotate-3 hover:rotate-0 transition-transform duration-500">
                <div className="bg-[#FFFDF9]/95 backdrop-blur-xl px-5 py-3.5 rounded-2xl shadow-xl border border-white/90 text-center max-w-[210px]">
                  <p className="font-script text-2xl text-[#9E4F63] leading-snug">
                    Same Girl...
                  </p>
                  <p className="font-script text-2xl text-[#9E4F63] leading-snug">
                    Brighter Tomorrow ♡
                  </p>
                </div>
              </div>

              {/* Floating Card: AI Accuracy */}
              <div className="absolute -right-3 sm:-right-6 top-8 rounded-2xl bg-white/90 backdrop-blur-xl px-5 py-3.5 shadow-xl ring-1 ring-[#F7E5E8] animate-float-slow">
                <p className="text-[10px] font-bold text-[#9E4F63] uppercase tracking-wider">Clinical Accuracy</p>
                <p className="font-serif text-2xl font-bold text-[#3A2E2B] leading-none mt-1">99.4%</p>
                <p className="text-[11px] text-[#3A2E2B]/60 mt-0.5">Dermatologist Verified</p>
              </div>

            </div>
          </div>

        </div>

        {/* 4 LUXURY BRAND VALUE BADGES (Across bottom of Hero) */}
        <div className="mt-16 pt-8 border-t border-[#F7E5E8] grid grid-cols-2 md:grid-cols-4 gap-6">
          <div className="flex items-center gap-3.5 bg-white/60 backdrop-blur rounded-2xl p-3.5 border border-white/80 shadow-xs">
            <span className="w-10 h-10 rounded-full bg-[#F7E5E8] text-[#9E4F63] flex items-center justify-center shrink-0">
              <Leaf className="w-5 h-5" />
            </span>
            <div>
              <h4 className="text-xs font-bold text-[#3A2E2B] uppercase tracking-wider">Clean Beauty</h4>
              <p className="text-[11px] text-[#3A2E2B]/65">100% Non-Toxic Formulations</p>
            </div>
          </div>

          <div className="flex items-center gap-3.5 bg-white/60 backdrop-blur rounded-2xl p-3.5 border border-white/80 shadow-xs">
            <span className="w-10 h-10 rounded-full bg-[#F7E5E8] text-[#9E4F63] flex items-center justify-center shrink-0">
              <Heart className="w-5 h-5" />
            </span>
            <div>
              <h4 className="text-xs font-bold text-[#3A2E2B] uppercase tracking-wider">Cruelty Free</h4>
              <p className="text-[11px] text-[#3A2E2B]/65">Never Tested on Animals</p>
            </div>
          </div>

          <div className="flex items-center gap-3.5 bg-white/60 backdrop-blur rounded-2xl p-3.5 border border-white/80 shadow-xs">
            <span className="w-10 h-10 rounded-full bg-[#F7E5E8] text-[#9E4F63] flex items-center justify-center shrink-0">
              <Flower2 className="w-5 h-5" />
            </span>
            <div>
              <h4 className="text-xs font-bold text-[#3A2E2B] uppercase tracking-wider">Naturally Inspired</h4>
              <p className="text-[11px] text-[#3A2E2B]/65">Botanical &amp; Peptide Actives</p>
            </div>
          </div>

          <div className="flex items-center gap-3.5 bg-white/60 backdrop-blur rounded-2xl p-3.5 border border-white/80 shadow-xs">
            <span className="w-10 h-10 rounded-full bg-[#F7E5E8] text-[#9E4F63] flex items-center justify-center shrink-0">
              <Sparkles className="w-5 h-5" />
            </span>
            <div>
              <h4 className="text-xs font-bold text-[#3A2E2B] uppercase tracking-wider">For a Better You</h4>
              <p className="text-[11px] text-[#3A2E2B]/65">Restores Your Natural Radiance</p>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
}
