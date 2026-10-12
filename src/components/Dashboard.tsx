import { useState } from 'react';
import { Sparkles, CheckCircle2, Circle, Sun, Moon, ArrowRight, RotateCcw, ShieldCheck } from 'lucide-react';
import { recommendations, type SkinType } from '@/data';

interface DashboardProps {
  currentSkinType: SkinType | null;
  onReset?: () => void;
}

export default function Dashboard({ currentSkinType, onReset }: DashboardProps) {
  const [completedSteps, setCompletedSteps] = useState<Record<string, boolean>>({});

  const toggleStep = (id: string) => {
    setCompletedSteps((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  const activeRec = currentSkinType ? recommendations[currentSkinType] : null;

  // Calculate routine progress
  const totalSteps = activeRec ? activeRec.routine.length : 0;
  const doneCount = activeRec
    ? activeRec.routine.filter((r) => completedSteps[`${currentSkinType}-${r.product}`]).length
    : 0;
  const progressPercent = totalSteps > 0 ? Math.round((doneCount / totalSteps) * 100) : 0;

  return (
    <section id="dashboard" className="py-20 bg-cream border-y border-blush-100/60 relative overflow-hidden">
      {/* Background glow effects */}
      <div className="absolute top-0 right-10 w-72 h-72 rounded-full bg-blush-100/50 blur-3xl -z-10" />
      <div className="absolute bottom-0 left-10 w-80 h-80 rounded-full bg-beige-100/50 blur-3xl -z-10" />

      <div className="max-w-7xl mx-auto px-6 lg:px-10">
        <div className="text-center max-w-2xl mx-auto mb-12">
          <span className="inline-flex items-center gap-2 rounded-full bg-white/80 backdrop-blur px-4 py-1.5 text-xs font-semibold text-blush-600 ring-1 ring-blush-200 shadow-soft">
            <Sparkles className="w-3.5 h-3.5" />
            Your Glow Command Center
          </span>
          <h2 className="mt-4 font-serif text-3xl sm:text-4xl font-semibold text-ink">
            Personalized Skin Dashboard
          </h2>
          <p className="mt-3 text-ink/70 text-sm sm:text-base">
            Track your daily routine, monitor your skin profile, and stay consistent with healthy skin habits.
          </p>
        </div>

        {currentSkinType && activeRec ? (
          <div className="grid lg:grid-cols-3 gap-8">
            {/* Skin Profile Card */}
            <div className="bg-white rounded-3xl p-6 sm:p-8 shadow-soft border border-blush-100 flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between mb-4">
                  <span className="text-4xl">{activeRec.emoji}</span>
                  <span className="text-xs font-semibold uppercase tracking-wider text-blush-600 bg-blush-50 px-3 py-1 rounded-full border border-blush-200">
                    Active Profile
                  </span>
                </div>
                <h3 className="font-serif text-2xl font-semibold text-ink capitalize">
                  {activeRec.label}
                </h3>
                <p className="mt-2 text-ink/70 text-sm leading-relaxed">
                  {activeRec.intro}
                </p>

                <div className="mt-6 pt-6 border-t border-blush-100">
                  <p className="text-xs font-semibold uppercase tracking-wider text-ink/50 mb-3">
                    Daily Progress
                  </p>
                  <div className="w-full bg-blush-50 rounded-full h-3 overflow-hidden border border-blush-100">
                    <div
                      className="bg-gradient-to-r from-blush-400 to-blush-600 h-full rounded-full transition-all duration-500"
                      style={{ width: `${progressPercent}%` }}
                    />
                  </div>
                  <div className="flex items-center justify-between text-xs text-ink/70 mt-2 font-medium">
                    <span>{doneCount} of {totalSteps} steps completed</span>
                    <span>{progressPercent}%</span>
                  </div>
                </div>
              </div>

              {onReset && (
                <button
                  onClick={onReset}
                  className="mt-8 inline-flex items-center justify-center gap-2 text-xs font-semibold text-ink/60 hover:text-blush-600 transition-colors pt-4 border-t border-blush-50"
                >
                  <RotateCcw className="w-3.5 h-3.5" />
                  Reset Skin Assessment
                </button>
              )}
            </div>

            {/* Routine Checklist Card */}
            <div className="lg:col-span-2 bg-white rounded-3xl p-6 sm:p-8 shadow-soft border border-blush-100">
              <div className="flex flex-wrap items-center justify-between gap-4 mb-6">
                <div>
                  <h3 className="font-serif text-xl sm:text-2xl font-semibold text-ink">
                    Today's Ritual Checklist
                  </h3>
                  <p className="text-xs text-ink/60 mt-1">
                    Check off steps as you complete your morning and evening routines.
                  </p>
                </div>
                <span className="inline-flex items-center gap-1.5 text-xs font-medium text-emerald-700 bg-emerald-50 px-3 py-1.5 rounded-full border border-emerald-200">
                  <ShieldCheck className="w-3.5 h-3.5" />
                  Barrier Protected
                </span>
              </div>

              <div className="space-y-3">
                {activeRec.routine.map((item, idx) => {
                  const key = `${currentSkinType}-${item.product}`;
                  const isDone = !!completedSteps[key];

                  return (
                    <div
                      key={key}
                      onClick={() => toggleStep(key)}
                      className={`cursor-pointer p-4 rounded-2xl border transition-all duration-300 flex items-start gap-4 ${
                        isDone
                          ? 'bg-blush-50/60 border-blush-200 text-ink/60'
                          : 'bg-cream/40 border-blush-100 hover:bg-cream hover:border-blush-300 text-ink'
                      }`}
                    >
                      <button
                        type="button"
                        aria-label={`Mark ${item.step} as done`}
                        className="mt-0.5 text-blush-500 hover:text-blush-600 transition-colors shrink-0"
                      >
                        {isDone ? (
                          <CheckCircle2 className="w-5 h-5 text-emerald-600" />
                        ) : (
                          <Circle className="w-5 h-5 text-blush-300" />
                        )}
                      </button>

                      <div className="flex-1">
                        <div className="flex items-center gap-2">
                          <span className="text-xs font-bold uppercase tracking-wider text-blush-600 bg-white px-2 py-0.5 rounded-md border border-blush-100">
                            {idx === 0 || idx === 3 ? (
                              <Sun className="w-3 h-3 inline mr-1 text-amber-500" />
                            ) : (
                              <Moon className="w-3 h-3 inline mr-1 text-indigo-400" />
                            )}
                            {item.step}
                          </span>
                          {item.brand && (
                            <span className="text-[10px] font-bold text-blush-600 bg-white px-1.5 py-0.5 rounded border border-blush-100">
                              {item.brand}
                            </span>
                          )}
                          <span className={`font-semibold text-sm ${isDone ? 'line-through text-ink/40' : 'text-ink'}`}>
                            {item.product}
                          </span>
                        </div>
                        <p className={`text-xs mt-1 leading-relaxed ${isDone ? 'text-ink/40' : 'text-ink/70'}`}>
                          {item.detail}
                        </p>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        ) : (
          /* Empty / Prompt State */
          <div className="max-w-2xl mx-auto bg-white rounded-3xl p-8 sm:p-12 shadow-soft border border-blush-100 text-center">
            <div className="w-16 h-16 mx-auto rounded-2xl bg-blush-50 flex items-center justify-center text-blush-600 mb-6">
              <Sparkles className="w-8 h-8" />
            </div>
            <h3 className="font-serif text-2xl font-semibold text-ink">
              Unlock Your Daily Skin Dashboard
            </h3>
            <p className="mt-3 text-ink/70 text-sm sm:text-base leading-relaxed">
              Take our quick 60-second Skin Quiz or scan your face with AI to reveal your personalized profile, tailored routine steps, and daily tracker.
            </p>

            <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
              <a
                href="#quiz"
                className="inline-flex items-center gap-2 rounded-full bg-ink text-cream px-6 py-3 text-sm font-semibold shadow-soft hover:bg-blush-600 transition-colors"
              >
                Take the Quiz
                <ArrowRight className="w-4 h-4" />
              </a>
              <a
                href="#scanner"
                className="inline-flex items-center gap-2 rounded-full bg-white text-ink px-6 py-3 text-sm font-semibold ring-1 ring-blush-200 hover:bg-blush-50 transition-colors"
              >
                Scan Your Face
              </a>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
