import { useState } from 'react';
import { Droplet, Sun, Scale, Flower, ArrowRight, ArrowLeft, RotateCcw, Sparkles } from 'lucide-react';
import type { SkinType } from '@/data';
import { useReveal } from '@/hooks/useReveal';

type Option = {
  value: SkinType;
  label: string;
  desc: string;
  icon: typeof Droplet;
};

const options: Option[] = [
  { value: 'dry', label: 'Dry', desc: 'Tight, flaky, craves moisture', icon: Droplet },
  { value: 'oily', label: 'Oily', desc: 'Shiny, prone to breakouts', icon: Sun },
  { value: 'combination', label: 'Combination', desc: 'Oily T-zone, drier cheeks', icon: Scale },
  { value: 'sensitive', label: 'Sensitive', desc: 'Reactive, easily red', icon: Flower },
];

type QuestionOption = { value: SkinType; label: string; desc: string };
type Question = { q: string; options: QuestionOption[] };

const questions: Question[] = [
  {
    q: 'How does your skin feel by midday?',
    options: [
      { value: 'dry', label: 'Tight and dry', desc: 'It feels parched and uncomfortable.' },
      { value: 'oily', label: 'Shiny all over', desc: 'I blot more than once a day.' },
      { value: 'combination', label: 'Oily T-zone only', desc: 'Forehead and nose shine, cheeks feel fine.' },
      { value: 'sensitive', label: 'Irritated or warm', desc: 'It feels reactive or looks flushed.' },
    ],
  },
  {
    q: 'How does your skin react to a new product?',
    options: [
      { value: 'dry', label: 'Feels even tighter', desc: 'I need extra moisturizer after.' },
      { value: 'oily', label: 'No issues, sometimes greasy', desc: 'Rich creams break me out.' },
      { value: 'combination', label: 'Mixed reaction', desc: 'Some areas love it, some rebel.' },
      { value: 'sensitive', label: 'Stings or reddens', desc: 'I have to be very careful.' },
    ],
  },
  {
    q: 'What is your main skin goal?',
    options: [
      { value: 'dry', label: 'Deep hydration', desc: 'Soft, plump, dewy skin.' },
      { value: 'oily', label: 'Balance and clarity', desc: 'Less shine, fewer breakouts.' },
      { value: 'combination', label: 'Even, balanced tone', desc: 'Harmony across all zones.' },
      { value: 'sensitive', label: 'Calm and soothed', desc: 'Less redness, stronger barrier.' },
    ],
  },
];

export default function SkinQuiz({ onComplete }: { onComplete?: (type: SkinType) => void }) {
  const { ref, visible } = useReveal<HTMLDivElement>();
  const [status, setStatus] = useState<'start' | 'playing' | 'result'>('start');
  const [step, setStep] = useState(0);
  const [answers, setAnswers] = useState<SkinType[]>([]);
  const [selectedInStep, setSelectedInStep] = useState<SkinType | null>(null);
  const [result, setResult] = useState<SkinType | null>(null);
  const [error, setError] = useState('');

  const startQuiz = () => {
    setStatus('playing');
    setStep(0);
    setAnswers([]);
    setResult(null);
    setSelectedInStep(null);
    setError('');
  };

  const nextStep = () => {
    if (!selectedInStep) {
      setError('Please select an answer to continue.');
      return;
    }
    setError('');
    
    const nextAnswers = [...answers, selectedInStep];
    
    if (step + 1 < questions.length) {
      setAnswers(nextAnswers);
      setStep(step + 1);
      setSelectedInStep(null); // Reset for next step
    } else {
      // Calculate result
      const tally = nextAnswers.reduce((acc, v) => {
        acc[v] = (acc[v] || 0) + 1;
        return acc;
      }, {} as Record<SkinType, number>);
      
      const winner = (Object.entries(tally) as [SkinType, number][]).sort(
        (a, b) => b[1] - a[1]
      )[0][0];
      
      setResult(winner);
      setStatus('result');
      if (onComplete) onComplete(winner);
    }
  };

  const prevStep = () => {
    if (step > 0) {
      setStep(step - 1);
      // Try to recover the answer they picked previously
      const prevAns = answers[step - 1];
      if (prevAns) setSelectedInStep(prevAns);
      setAnswers(answers.slice(0, -1));
      setError('');
    } else {
      setStatus('start');
    }
  };

  const progress = status === 'result' ? 100 : status === 'start' ? 0 : (step / questions.length) * 100;
  const resultOption = options.find((o) => o.value === result);

  return (
    <section id="quiz" className="relative py-24 lg:py-32 overflow-hidden">
      <div className="absolute inset-0 -z-10 bg-gradient-to-b from-cream via-blush-50 to-cream" />
      <div className="absolute -bottom-20 left-1/3 w-96 h-96 rounded-full bg-blush-200/50 blur-3xl -z-10" />

      <div className="mx-auto max-w-5xl px-6 lg:px-10">
        <div className="text-center max-w-2xl mx-auto">
          <span className="text-xs font-semibold uppercase tracking-[0.2em] text-blush-500">
            Skin Quiz
          </span>
          <h2 className="mt-3 font-serif text-4xl sm:text-5xl font-semibold text-ink">
            Find your skin type
          </h2>
          <p className="mt-4 text-ink/70 leading-relaxed">
            Answer three quick questions and our AI will match you to the
            perfect routine. No guesswork, just glow.
          </p>
        </div>

        <div
          ref={ref}
          className={`reveal ${visible ? 'is-visible' : ''} mt-12 rounded-5xl bg-cream/80 backdrop-blur-xl ring-1 ring-blush-100 shadow-soft-lg p-6 sm:p-10 min-h-[400px] flex flex-col`}
        >
          {/* Progress */}
          <div className="flex items-center justify-between mb-8">
            <span className="text-sm font-medium text-ink/60">
              {status === 'result' ? 'Result' : status === 'start' ? 'Ready' : `Question ${step + 1} of ${questions.length}`}
            </span>
            <div className="w-40 h-2 rounded-full bg-blush-100 overflow-hidden">
              <div
                className="h-full rounded-full bg-gradient-to-r from-blush-400 to-blush-600 transition-all duration-500"
                style={{ width: `${progress}%` }}
              />
            </div>
          </div>

          {status === 'start' && (
            <div className="flex flex-col items-center justify-center flex-1 animate-[fadeIn_0.5s_ease] text-center">
              <div className="w-20 h-20 rounded-full bg-blush-100 text-blush-600 flex items-center justify-center mb-6">
                <Sparkles className="w-10 h-10" />
              </div>
              <h3 className="font-serif text-3xl font-semibold text-ink mb-4">Ready to find your match?</h3>
              <p className="text-ink/70 mb-8 max-w-md mx-auto">Take our 1-minute quiz to get a personalized skincare routine designed specifically for your skin's unique needs.</p>
              <button 
                onClick={startQuiz}
                className="inline-flex items-center gap-2 rounded-full bg-ink text-cream px-8 py-4 font-semibold shadow-soft hover:bg-blush-600 transition-colors text-lg"
              >
                Start the Skin Quiz
                <ArrowRight className="w-5 h-5" />
              </button>
            </div>
          )}

          {status === 'playing' && (
            <div key={step} className="animate-[fadeIn_0.3s_ease] flex-1 flex flex-col">
              <h3 className="font-serif text-2xl sm:text-3xl font-semibold text-ink">
                {questions[step].q}
              </h3>
              <div className="mt-8 grid sm:grid-cols-2 gap-4 flex-1">
                {questions[step].options.map((opt) => {
                  const Icon = options.find((o) => o.value === opt.value)!.icon;
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
                          ? 'bg-blush-50 ring-blush-400 shadow-md' 
                          : 'bg-white ring-blush-100 hover:ring-blush-300 hover:bg-blush-50/50'
                      }`}
                    >
                      <span className={`grid place-items-center w-12 h-12 rounded-2xl transition-colors duration-300 shrink-0 ${
                        isSelected ? 'bg-blush-500 text-white' : 'bg-blush-100 text-blush-600 group-hover:bg-blush-400 group-hover:text-white'
                      }`}>
                        <Icon className="w-5 h-5" />
                      </span>
                      <span>
                        <span className="block font-semibold text-ink">{opt.label}</span>
                        <span className="block text-sm text-ink/60 mt-0.5">{opt.desc}</span>
                      </span>
                    </button>
                  );
                })}
              </div>
              
              <div className="mt-8 flex flex-col sm:flex-row items-center justify-between gap-4 pt-4 border-t border-blush-100/50">
                <button 
                  onClick={prevStep}
                  className="flex items-center gap-2 text-ink/60 hover:text-ink font-medium px-4 py-2 transition-colors"
                >
                  <ArrowLeft className="w-4 h-4" />
                  Back
                </button>
                
                {error && <span className="text-red-500 text-sm font-medium animate-pulse">{error}</span>}
                
                <button 
                  onClick={nextStep}
                  className="flex items-center gap-2 bg-ink text-cream px-6 py-2.5 rounded-full font-medium hover:bg-blush-600 transition-colors"
                >
                  {step === questions.length - 1 ? 'See Results' : 'Next Question'}
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          )}

          {status === 'result' && resultOption && (
            <div className="text-center animate-[fadeIn_0.6s_ease] flex-1 flex flex-col justify-center">
              <div className="mx-auto grid place-items-center w-20 h-20 rounded-full bg-gradient-to-br from-blush-300 to-blush-500 text-white shadow-soft animate-soft-pulse">
                <resultOption.icon className="w-9 h-9" />
              </div>
              <p className="mt-5 text-sm font-semibold uppercase tracking-[0.2em] text-blush-500">
                Your skin type is
              </p>
              <h3 className="mt-1 font-serif text-4xl font-semibold text-ink">
                {resultOption.label}
              </h3>
              <p className="mt-2 text-ink/70 max-w-md mx-auto">{resultOption.desc}</p>

              <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
                <a
                  href="#recommendation"
                  className="group inline-flex items-center gap-2 rounded-full bg-ink text-cream px-7 py-3.5 font-semibold shadow-soft hover:bg-blush-600 transition-colors"
                >
                  <Sparkles className="w-4 h-4" />
                  See my AI routine
                  <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                </a>
                <button
                  onClick={startQuiz}
                  className="inline-flex items-center gap-2 rounded-full bg-white px-6 py-3.5 font-semibold text-ink ring-1 ring-blush-200 hover:bg-blush-50 transition-colors"
                >
                  <RotateCcw className="w-4 h-4" />
                  Restart quiz
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
