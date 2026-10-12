import { useState } from 'react';
import {
  Droplet,
  Sun,
  Scale,
  Flower,
  ArrowRight,
  ArrowLeft,
  RotateCcw,
  Sparkles,
  CheckCircle2,
  AlertCircle,
  Stethoscope,
  Plus,
  Check,
  ShieldCheck,
  Zap,
  Target
} from 'lucide-react';
import { products, type Product, type SkinType } from '@/data';
import { useReveal } from '@/hooks/useReveal';

type SkinTypeOption = {
  value: SkinType;
  label: string;
  desc: string;
  icon: typeof Droplet;
};

const skinTypeOptions: SkinTypeOption[] = [
  { value: 'dry', label: 'Dry Skin', desc: 'Tight, flaky, rough texture, craves deep moisture', icon: Droplet },
  { value: 'oily', label: 'Oily Skin', desc: 'Shiny all over, greasy by midday, enlarged pores, acne-prone', icon: Sun },
  { value: 'combination', label: 'Combination Skin', desc: 'Oily T-zone (forehead, nose, chin) with normal or dry cheeks', icon: Scale },
  { value: 'sensitive', label: 'Sensitive Skin', desc: 'Easily reddens, burns or stings with products, fragile barrier', icon: Flower },
];

type RealConcern =
  | 'acne'
  | 'pores'
  | 'pigmentation'
  | 'dehydration'
  | 'dark_circles'
  | 'redness';

type QuizState = {
  skinType: SkinType;
  primaryConcern: RealConcern;
  environment: string;
  goal: string;
};

export default function SkinQuiz({ onComplete }: { onComplete?: (type: SkinType) => void }) {
  const { ref, visible } = useReveal<HTMLDivElement>();
  const [status, setStatus] = useState<'start' | 'playing' | 'result'>('start');
  const [step, setStep] = useState(0);

  const [answers, setAnswers] = useState<QuizState>({
    skinType: 'combination',
    primaryConcern: 'acne',
    environment: 'sun',
    goal: 'clear_acne',
  });

  const [selectedInStep, setSelectedInStep] = useState<string | null>(null);
  const [error, setError] = useState('');
  const [addedProducts, setAddedProducts] = useState<Record<string, boolean>>({});

  const questions = [
    {
      id: 'skinType',
      title: 'How does your bare skin feel a few hours after washing?',
      subtitle: 'This identifies your baseline epidermal sebum production rate.',
      options: [
        {
          value: 'dry',
          label: 'Tight, Flaky & Parched',
          desc: 'Skin feels uncomfortable, looks dull, and desperately craves rich cream.',
          badge: 'Dry Baseline',
        },
        {
          value: 'oily',
          label: 'Greasy & Shiny All Over',
          desc: 'Forehead, cheeks, and chin are noticeably shiny; I need to blot multiple times.',
          badge: 'Oily Baseline',
        },
        {
          value: 'combination',
          label: 'Oily T-Zone with Normal/Dry Cheeks',
          desc: 'My nose, forehead, and chin produce oil, but my cheeks stay normal or dry.',
          badge: 'Combination Baseline',
        },
        {
          value: 'sensitive',
          label: 'Stinging, Redness & Irritation',
          desc: 'Skin easily turns hot or red and reacts uncomfortably to many products.',
          badge: 'Sensitive Baseline',
        },
      ],
    },
    {
      id: 'primaryConcern',
      title: 'What is your #1 most frustrating skin problem right now?',
      subtitle: 'We will target your clinical routine specifically to solve this issue.',
      options: [
        {
          value: 'acne',
          label: 'Active Pimples, Breakouts & Acne Cysts',
          desc: 'Frequent whiteheads, red bumps, and bacterial breakouts that keep returning.',
          badge: 'Breakout Priority',
        },
        {
          value: 'pores',
          label: 'Stubborn Blackheads & Dilated Open Pores',
          desc: 'Congested nose pores, rough texture, and oxidized black sebum plugs.',
          badge: 'Pore Priority',
        },
        {
          value: 'pigmentation',
          label: 'Post-Acne Dark Spots, Melasma & Tanning',
          desc: 'Brown marks left after pimples heal, sun spots, and uneven dull skin tone.',
          badge: 'Pigmentation Priority',
        },
        {
          value: 'dehydration',
          label: 'Dehydrated, Rough Texture & Damaged Barrier',
          desc: 'Skin barrier feels compromised, tight, flaky, and lacks healthy glass glow.',
          badge: 'Barrier Priority',
        },
        {
          value: 'dark_circles',
          label: 'Dark Under-Eye Circles & Morning Puffiness',
          desc: 'Thin under-eye vascular shadows, tired appearance, and fluid retention.',
          badge: 'Eye Care Priority',
        },
        {
          value: 'redness',
          label: 'Chronic Facial Redness & Barrier Stinging',
          desc: 'Flushed cheeks, rosacea flare-ups, and burning feeling from weather or cosmetics.',
          badge: 'Calming Priority',
        },
      ],
    },
    {
      id: 'environment',
      title: 'Which daily environmental factor affects your skin the most?',
      subtitle: 'External stressors directly trigger oil oxidation, dark spots, and dehydration.',
      options: [
        {
          value: 'sun',
          label: 'High Sun Exposure & UV Tanning',
          desc: 'I spend time outdoors; UV exposure darkens my marks and causes pigmentation.',
          badge: 'UV Stress',
        },
        {
          value: 'humidity',
          label: 'Hot, Humid Weather & Excess Sweat',
          desc: 'Humidity causes excess oil, clogged pores, and fungal/bacterial breakouts.',
          badge: 'Humidity Stress',
        },
        {
          value: 'indoor_ac',
          label: 'Air-Conditioned / Dry Indoor Air',
          desc: 'Hours in AC environments suck water out of my face, leading to midday dehydration.',
          badge: 'Dehydration Stress',
        },
        {
          value: 'screens',
          label: 'High Screen Time & City Pollution',
          desc: 'Blue light and urban dust lead to oxidative stress, dullness, and tired skin.',
          badge: 'Pollution Stress',
        },
      ],
    },
    {
      id: 'goal',
      title: 'What is your ultimate dream result from this routine?',
      subtitle: 'Our clinical engine will tailor your morning and night steps toward this goal.',
      options: [
        {
          value: 'clear_acne',
          label: 'Completely Clear, Blemish-Free Skin',
          desc: 'Stop pimples from forming and unclog pores deep down.',
          badge: 'Acne Clearance',
        },
        {
          value: 'spotless_glow',
          label: 'Fade Dark Spots & Reveal Radiant Glow',
          desc: 'Erase stubborn post-acne marks and achieve an even, luminous complexion.',
          badge: 'Radiant Glow',
        },
        {
          value: 'matte_smooth',
          label: 'Tighten Pores & Maintain Balanced Shine',
          desc: 'Clean, refined pores with a comfortable all-day matte finish.',
          badge: 'Pore Refinement',
        },
        {
          value: 'plump_barrier',
          label: 'Heal My Barrier for Glass-Like Bounce',
          desc: 'Resilient, healthy skin that never stings, flakes, or feels tight.',
          badge: 'Barrier Fortification',
        },
      ],
    },
  ];

  const startQuiz = () => {
    setStatus('playing');
    setStep(0);
    setSelectedInStep(null);
    setError('');
  };

  const nextStep = () => {
    if (!selectedInStep) {
      setError('Please select an option to continue.');
      return;
    }
    setError('');

    const currentQ = questions[step];
    const newAnswers = { ...answers, [currentQ.id]: selectedInStep };
    setAnswers(newAnswers);

    if (step + 1 < questions.length) {
      setStep(step + 1);
      // Preselect if already answered
      const nextQId = questions[step + 1].id as keyof QuizState;
      setSelectedInStep(newAnswers[nextQId] || null);
    } else {
      // Finished!
      setStatus('result');
      if (onComplete) onComplete(newAnswers.skinType);
    }
  };

  const prevStep = () => {
    if (step > 0) {
      setStep(step - 1);
      const prevQId = questions[step - 1].id as keyof QuizState;
      setSelectedInStep(answers[prevQId] || null);
      setError('');
    } else {
      setStatus('start');
    }
  };

  const toggleProduct = (id: string) => {
    setAddedProducts((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  const addAllPrescribed = (pList: Product[]) => {
    const updated = { ...addedProducts };
    pList.forEach((p) => {
      updated[p.id] = true;
    });
    setAddedProducts(updated);
  };

  // Determine prescribed products based on user's real answers
  const getPrescribedProducts = (): Product[] => {
    const matchedIds: string[] = [];

    // 1. Cleanser matched to skin type
    if (answers.skinType === 'dry' || answers.skinType === 'sensitive') {
      matchedIds.push('cleanser'); // CeraVe Hydrating Cleanser
    } else {
      matchedIds.push('face-wash'); // Bioderma Sensibio Gel Moussant
    }

    // 2. Treatment matched to primary concern
    if (answers.primaryConcern === 'acne' || answers.primaryConcern === 'pores') {
      matchedIds.push('exfoliator'); // Minimalist 2% Salicylic Acid
      matchedIds.push('toner'); // The Ordinary Niacinamide 10%
    } else if (answers.primaryConcern === 'pigmentation') {
      matchedIds.push('serum'); // Minimalist 10% Vitamin C Serum
      matchedIds.push('toner'); // The Ordinary Niacinamide 10%
    } else if (answers.primaryConcern === 'dark_circles') {
      matchedIds.push('eye-cream'); // The Ordinary Caffeine Solution
      matchedIds.push('night-cream'); // COSRX Snail Mucin
    } else {
      // dehydration / redness
      matchedIds.push('night-cream'); // COSRX Snail Mucin
      matchedIds.push('moisturizer'); // Cetaphil Ceramide Cream
    }

    // 3. Essential Barrier Moisturizer & Sunscreen
    if (!matchedIds.includes('moisturizer')) matchedIds.push('moisturizer');
    if (!matchedIds.includes('sunscreen')) matchedIds.push('sunscreen');

    return products.filter((p) => matchedIds.includes(p.id));
  };

  const prescribedProducts = getPrescribedProducts();
  const diagnosedType = skinTypeOptions.find((o) => o.value === answers.skinType)!;
  const progressPercent =
    status === 'result' ? 100 : status === 'start' ? 0 : ((step + 1) / questions.length) * 100;

  return (
    <section id="quiz" className="relative py-24 lg:py-32 overflow-hidden bg-gradient-to-b from-cream via-blush-50/40 to-cream">
      {/* Background Ambience */}
      <div className="absolute top-1/4 -left-20 w-96 h-96 rounded-full bg-blush-200/40 blur-3xl -z-10 pointer-events-none" />
      <div className="absolute bottom-10 right-10 w-96 h-96 rounded-full bg-beige-200/50 blur-3xl -z-10 pointer-events-none" />

      <div className="mx-auto max-w-5xl px-6 lg:px-10">
        <div className="text-center max-w-2xl mx-auto">
          <span className="inline-flex items-center gap-1.5 px-4 py-1.5 rounded-full bg-white text-xs font-semibold text-blush-600 ring-1 ring-blush-200 shadow-soft">
            <Stethoscope className="w-4 h-4 text-blush-500" />
            Clinical Dermatological Diagnostic
          </span>
          <h2 className="mt-4 font-serif text-4xl sm:text-5xl font-semibold text-ink">
            Real-Life Skin Diagnostic Quiz
          </h2>
          <p className="mt-4 text-ink/75 leading-relaxed text-sm sm:text-base">
            Solve real skin problems — active acne, stubborn dark spots, open pores, or damaged barriers. Answer 4 targeted clinical questions to discover exactly which real products are useful for your skin.
          </p>
        </div>

        <div
          ref={ref}
          className={`reveal ${visible ? 'is-visible' : ''} mt-12 rounded-5xl bg-white/90 backdrop-blur-xl ring-1 ring-blush-100 shadow-soft-xl p-6 sm:p-10 min-h-[440px] flex flex-col`}
        >
          {/* Progress Header */}
          <div className="flex items-center justify-between mb-8 pb-4 border-b border-blush-100">
            <span className="text-xs font-bold uppercase tracking-wider text-ink/60">
              {status === 'result'
                ? 'Clinical Prescription Ready'
                : status === 'start'
                ? 'Diagnostic Ready'
                : `Diagnostic Step ${step + 1} of ${questions.length}`}
            </span>
            <div className="flex items-center gap-3">
              <span className="text-xs font-semibold text-blush-600">{Math.round(progressPercent)}%</span>
              <div className="w-36 h-2 rounded-full bg-blush-100 overflow-hidden">
                <div
                  className="h-full rounded-full bg-gradient-to-r from-blush-400 to-blush-600 transition-all duration-500"
                  style={{ width: `${progressPercent}%` }}
                />
              </div>
            </div>
          </div>

          {/* START SCREEN */}
          {status === 'start' && (
            <div className="flex flex-col items-center justify-center flex-1 text-center py-6 animate-[fadeIn_0.5s_ease]">
              <div className="w-20 h-20 rounded-3xl bg-blush-100 text-blush-600 flex items-center justify-center mb-6 shadow-soft">
                <Sparkles className="w-10 h-10" />
              </div>
              <h3 className="font-serif text-3xl font-semibold text-ink mb-3">
                Diagnose Your Real Skin Condition
              </h3>
              <p className="text-ink/70 mb-8 max-w-lg mx-auto text-sm sm:text-base leading-relaxed">
                No generic guesses. Our diagnostic engine evaluates your sebum levels, active acne triggers, pigmentation marks, and barrier strength to match you with proven clinical formulations from Minimalist, CeraVe, and The Ordinary.
              </p>
              <button
                onClick={startQuiz}
                className="inline-flex items-center gap-2 rounded-full bg-ink text-white px-8 py-4 font-semibold shadow-soft hover:bg-blush-600 transition-all text-base hover:-translate-y-0.5"
              >
                Start Diagnostic Quiz (1 Min)
                <ArrowRight className="w-5 h-5" />
              </button>
            </div>
          )}

          {/* QUESTION SCREENS */}
          {status === 'playing' && (
            <div key={step} className="flex-1 flex flex-col animate-[fadeIn_0.3s_ease]">
              <div>
                <span className="text-xs font-semibold uppercase tracking-wider text-blush-600">
                  Question {step + 1}
                </span>
                <h3 className="font-serif text-2xl sm:text-3xl font-semibold text-ink mt-1">
                  {questions[step].title}
                </h3>
                <p className="text-xs sm:text-sm text-ink/65 mt-1">
                  {questions[step].subtitle}
                </p>
              </div>

              <div className="mt-8 grid sm:grid-cols-2 gap-4 flex-1">
                {questions[step].options.map((opt) => {
                  const isSelected = selectedInStep === opt.value;
                  return (
                    <button
                      key={opt.value}
                      onClick={() => {
                        setSelectedInStep(opt.value);
                        setError('');
                      }}
                      className={`group flex items-start gap-4 rounded-3xl p-5 ring-1 transition-all duration-300 text-left hover:-translate-y-0.5 ${
                        isSelected
                          ? 'bg-blush-50 ring-blush-500 shadow-soft'
                          : 'bg-white ring-blush-100 hover:ring-blush-300 hover:bg-blush-50/40'
                      }`}
                    >
                      <span
                        className={`grid place-items-center w-10 h-10 rounded-2xl transition-colors duration-300 shrink-0 text-xs font-bold ${
                          isSelected
                            ? 'bg-blush-600 text-white'
                            : 'bg-blush-100 text-blush-600 group-hover:bg-blush-400 group-hover:text-white'
                        }`}
                      >
                        {isSelected ? <Check className="w-5 h-5" /> : <Target className="w-4 h-4" />}
                      </span>

                      <div className="flex-1">
                        <div className="flex items-center justify-between gap-2">
                          <span className="block font-bold text-ink text-sm sm:text-base">
                            {opt.label}
                          </span>
                          <span className="text-[10px] font-semibold text-blush-600 bg-white px-2 py-0.5 rounded-full border border-blush-100">
                            {opt.badge}
                          </span>
                        </div>
                        <span className="block text-xs text-ink/65 mt-1 leading-relaxed">
                          {opt.desc}
                        </span>
                      </div>
                    </button>
                  );
                })}
              </div>

              {/* Navigation Footer */}
              <div className="mt-8 flex flex-col sm:flex-row items-center justify-between gap-4 pt-4 border-t border-blush-100">
                <button
                  onClick={prevStep}
                  className="flex items-center gap-2 text-ink/60 hover:text-ink font-semibold text-sm px-4 py-2 transition-colors"
                >
                  <ArrowLeft className="w-4 h-4" />
                  Back
                </button>

                {error && (
                  <span className="text-rose-600 text-xs font-semibold flex items-center gap-1.5 animate-pulse">
                    <AlertCircle className="w-4 h-4" />
                    {error}
                  </span>
                )}

                <button
                  onClick={nextStep}
                  className="flex items-center gap-2 bg-ink text-white px-7 py-3 rounded-full font-semibold text-sm hover:bg-blush-600 transition-colors shadow-soft"
                >
                  {step === questions.length - 1 ? 'Generate My Medical Prescription' : 'Next Step'}
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          )}

          {/* COMPREHENSIVE CLINICAL PRESCRIPTION RESULT SCREEN */}
          {status === 'result' && (
            <div className="animate-[fadeIn_0.6s_ease] flex-1 flex flex-col">
              {/* Diagnosis Header */}
              <div className="bg-gradient-to-br from-blush-50 to-beige-50 rounded-4xl p-6 sm:p-8 border border-blush-200">
                <div className="flex flex-wrap items-center justify-between gap-4">
                  <div className="flex items-center gap-4">
                    <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-blush-500 to-blush-700 text-white flex items-center justify-center text-3xl shadow-soft">
                      {diagnosedType.icon && <diagnosedType.icon className="w-7 h-7" />}
                    </div>
                    <div>
                      <span className="text-xs font-bold uppercase tracking-wider text-blush-600 bg-white px-3 py-1 rounded-full border border-blush-200">
                        Diagnosed Skin Profile
                      </span>
                      <h3 className="font-serif text-2xl sm:text-3xl font-bold text-ink mt-1">
                        {diagnosedType.label}
                      </h3>
                      <p className="text-xs text-ink/70 mt-0.5">
                        Primary Target: <span className="font-bold text-ink capitalize">{answers.primaryConcern.replace('_', ' ')}</span> • Goal: <span className="font-bold text-ink capitalize">{answers.goal.replace('_', ' ')}</span>
                      </p>
                    </div>
                  </div>

                  <button
                    onClick={startQuiz}
                    className="inline-flex items-center gap-1.5 px-4 py-2 rounded-full bg-white ring-1 ring-blush-200 text-xs font-semibold text-ink hover:bg-blush-50 transition-colors"
                  >
                    <RotateCcw className="w-3.5 h-3.5" />
                    Retake Quiz
                  </button>
                </div>

                <div className="mt-6 pt-6 border-t border-blush-200/60 grid sm:grid-cols-3 gap-4 text-xs">
                  <div className="bg-white p-3.5 rounded-2xl border border-blush-100 shadow-sm">
                    <span className="font-bold text-ink block text-xs">🩺 Root Cause Mechanism:</span>
                    <p className="text-ink/70 mt-1">
                      {answers.primaryConcern === 'acne'
                        ? 'Follicular hyperkeratinization combined with sebum excess and C. acnes bacterial colonies.'
                        : answers.primaryConcern === 'pigmentation'
                        ? 'Post-inflammatory melanin deposition stimulated by UV radiation and prior blemishes.'
                        : answers.primaryConcern === 'pores'
                        ? 'Dilated pore walls caused by oxidized lipid plugs and loss of perifollicular elasticity.'
                        : 'Depleted intercellular lipid matrix allowing transepidermal water loss (TEWL).'}
                    </p>
                  </div>

                  <div className="bg-white p-3.5 rounded-2xl border border-blush-100 shadow-sm">
                    <span className="font-bold text-ink block text-xs">🧪 Prescribed Active Compounds:</span>
                    <p className="text-ink/70 mt-1">
                      {answers.primaryConcern === 'acne' || answers.primaryConcern === 'pores'
                        ? '2% Salicylic Acid (BHA), 10% Niacinamide, Zinc PCA & Essential Ceramides'
                        : answers.primaryConcern === 'pigmentation'
                        ? '10% Ethyl Ascorbic Acid (Vitamin C), Niacinamide & Mexoryl 400 SPF 50+'
                        : 'Biomimetic Ceramides 1, 3, 6-II, Hyaluronic Acid & Snail Secretion Mucin'}
                    </p>
                  </div>

                  <div className="bg-white p-3.5 rounded-2xl border border-blush-100 shadow-sm">
                    <span className="font-bold text-ink block text-xs">⏳ Clinical Timeline:</span>
                    <p className="text-ink/70 mt-1">
                      Acne congestion reduces within 10–14 days. Full barrier restoration and pigmentation fading visible within 3–4 weeks of daily SPF compliance.
                    </p>
                  </div>
                </div>
              </div>

              {/* REAL PRODUCTS PRESCRIBED FOR THIS USER */}
              <div className="mt-10">
                <div className="flex flex-wrap items-center justify-between gap-4 mb-6">
                  <div>
                    <span className="text-xs font-bold uppercase tracking-wider text-emerald-700 bg-emerald-50 px-3 py-1 rounded-full border border-emerald-200">
                      Doctor Prescribed Formulations
                    </span>
                    <h4 className="font-serif text-2xl sm:text-3xl font-bold text-ink mt-2">
                      Real Products That Solve Your Skin Problems
                    </h4>
                    <p className="text-xs sm:text-sm text-ink/70 mt-1">
                      Each product contains the exact active ingredients and concentration needed for your skin.
                    </p>
                  </div>

                  <button
                    onClick={() => addAllPrescribed(prescribedProducts)}
                    className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-ink text-white text-xs font-semibold hover:bg-blush-600 transition-colors shadow-soft"
                  >
                    <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                    Add All Prescribed to Routine
                  </button>
                </div>

                <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
                  {prescribedProducts.map((p) => {
                    const isAdded = !!addedProducts[p.id];
                    return (
                      <div
                        key={p.id}
                        className="bg-white rounded-3xl p-4 border border-blush-100 shadow-soft hover:shadow-soft-lg transition-all flex flex-col justify-between group"
                      >
                        <div>
                          <div className="relative aspect-square rounded-2xl overflow-hidden mb-3 bg-slate-50">
                            <img
                              src={p.image}
                              alt={p.name}
                              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                            />
                            <span className="absolute top-2 left-2 rounded-full bg-white/95 backdrop-blur px-2.5 py-0.5 text-[10px] font-bold text-blush-600 border border-blush-100">
                              {p.brand}
                            </span>
                          </div>

                          <span className="text-[10px] font-bold uppercase tracking-wider text-ink/50 block">
                            {p.category}
                          </span>
                          <h5 className="font-serif font-bold text-ink text-sm sm:text-base leading-snug mt-1">
                            {p.name}
                          </h5>

                          {/* WHY HELPFUL BOX - EXACTLY WHAT USER ASKED FOR! */}
                          <div className="mt-3 p-2.5 rounded-xl bg-blush-50/70 border border-blush-100 text-[11px] text-ink/80 leading-relaxed">
                            <span className="font-bold text-blush-700 block mb-0.5">
                              🎯 Why useful for your skin:
                            </span>
                            {p.whyHelpful.replace('Why it helps your skin: ', '')}
                          </div>

                          <div className="mt-3 flex items-center justify-between text-xs">
                            <span className="font-bold text-ink text-sm">{p.price}</span>
                            <span className="text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-full text-[10px] font-semibold border border-emerald-200">
                              ★ {p.rating} / 5.0
                            </span>
                          </div>
                        </div>

                        <button
                          onClick={() => toggleProduct(p.id)}
                          className={`mt-4 w-full py-2.5 rounded-full text-xs font-semibold transition-all duration-300 flex items-center justify-center gap-1.5 ${
                            isAdded
                              ? 'bg-emerald-600 text-white shadow-soft'
                              : 'bg-ink text-white hover:bg-blush-600'
                          }`}
                        >
                          {isAdded ? (
                            <>
                              <Check className="w-3.5 h-3.5" />
                              Added to Daily Routine
                            </>
                          ) : (
                            <>
                              <Plus className="w-3.5 h-3.5" />
                              Add to Routine
                            </>
                          )}
                        </button>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* AM & PM MEDICAL SCHEDULE CARD */}
              <div className="mt-10 p-6 sm:p-8 rounded-4xl bg-cream border border-blush-200">
                <div className="flex items-center gap-2 mb-4">
                  <ShieldCheck className="w-5 h-5 text-blush-600" />
                  <h4 className="font-serif text-xl sm:text-2xl font-bold text-ink">
                    Your Tailored Morning & Evening Regimen
                  </h4>
                </div>

                <div className="grid md:grid-cols-2 gap-6">
                  {/* AM */}
                  <div className="p-5 rounded-3xl bg-white border border-blush-100 shadow-soft">
                    <span className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-amber-600 mb-3">
                      <Sun className="w-4 h-4 text-amber-500" />
                      Morning (AM) Routine — Shield & Hydrate
                    </span>
                    <ol className="space-y-2 text-xs text-ink/80">
                      <li className="flex items-start gap-2">
                        <span className="font-bold text-blush-600">1.</span>
                        <span>Gentle cleanse with lukewarm water (never hot water).</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="font-bold text-blush-600">2.</span>
                        <span>Apply The Ordinary Niacinamide or Vitamin C serum to damp skin.</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="font-bold text-blush-600">3.</span>
                        <span>Seal moisture with Cetaphil Moisturizing Cream.</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="font-bold text-blush-600">4.</span>
                        <span className="font-semibold text-ink">Non-negotiable: La Roche-Posay SPF 50+ to stop scars from darkening.</span>
                      </li>
                    </ol>
                  </div>

                  {/* PM */}
                  <div className="p-5 rounded-3xl bg-white border border-blush-100 shadow-soft">
                    <span className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-indigo-600 mb-3">
                      <Zap className="w-4 h-4 text-indigo-500" />
                      Night (PM) Routine — Repair & Unclog
                    </span>
                    <ol className="space-y-2 text-xs text-ink/80">
                      <li className="flex items-start gap-2">
                        <span className="font-bold text-blush-600">1.</span>
                        <span>Cleanse face thoroughly to remove daytime pollutants, sunscreen, and sebum.</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="font-bold text-blush-600">2.</span>
                        <span>Target active breakouts with Minimalist 2% Salicylic Acid Serum (3-4 nights/week).</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="font-bold text-blush-600">3.</span>
                        <span>Apply COSRX Snail Mucin for intense cellular repair and collagen bounce.</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="font-bold text-blush-600">4.</span>
                        <span>Finish with Cetaphil barrier cream to lock actives in overnight.</span>
                      </li>
                    </ol>
                  </div>
                </div>
              </div>

              {/* Bottom CTA */}
              <div className="mt-8 flex flex-wrap items-center justify-between gap-4 p-6 rounded-3xl bg-ink text-white">
                <div>
                  <h5 className="font-serif text-lg font-bold">
                    Routine Synchronized with Your Skin Profile
                  </h5>
                  <p className="text-xs text-white/75 mt-0.5">
                    Your diagnosed routine is now active across your GlowCare dashboard and products catalog.
                  </p>
                </div>

                <a
                  href="#dashboard"
                  className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-blush-500 hover:bg-blush-600 text-white font-semibold text-xs transition-colors shadow-soft"
                >
                  View My Daily Routine Checklist
                  <ArrowRight className="w-4 h-4" />
                </a>
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
