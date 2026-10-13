import React, { useState } from 'react';
import { Mail, Lock, Eye, EyeOff, ArrowRight, Sparkles, Heart, Leaf, Flower2 } from 'lucide-react';
import heroImg from '@/assets/lumiere-hero.jpg';

export default function LumiereSection({
  onUserAuth,
}: {
  onUserAuth?: (user: { name: string; email: string }) => void;
}) {
  const [isSignUp, setIsSignUp] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [emailOrPhone, setEmailOrPhone] = useState('');
  const [password, setPassword] = useState('');
  const [fullName, setFullName] = useState('');
  const [statusMsg, setStatusMsg] = useState<string | null>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!emailOrPhone) {
      setStatusMsg('Please provide your email or phone number');
      return;
    }
    const name = fullName.trim() || emailOrPhone.split('@')[0] || 'Sneha';
    const user = { name, email: emailOrPhone };
    localStorage.setItem('glowcare_user', JSON.stringify(user));
    if (onUserAuth) onUserAuth(user);
    setStatusMsg(
      isSignUp
        ? `Welcome to GlowCare, ${name}! ♡`
        : `Signed in successfully. Welcome back, ${name}! ♡`
    );
  };

  const handleSocial = (provider: string) => {
    const user = { name: 'Sneha Kumari', email: 'sneha@glowcare.com' };
    localStorage.setItem('glowcare_user', JSON.stringify(user));
    if (onUserAuth) onUserAuth(user);
    setStatusMsg(`Connected via ${provider} ♡ Welcome back, Sneha!`);
  };

  return (
    <section id="lumiere-portal" className="relative py-20 lg:py-28 overflow-hidden bg-gradient-to-b from-[#FFFDFB] via-[#FAF3EE] to-[#FFFDFB]">
      {/* Background radial glows */}
      <div className="absolute top-1/4 -left-20 w-96 h-96 bg-[#F7E5E8]/70 rounded-full blur-3xl pointer-events-none -z-10" />
      <div className="absolute bottom-10 -right-20 w-[30rem] h-[30rem] bg-[#EED8DC]/60 rounded-full blur-3xl pointer-events-none -z-10" />

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        
        {/* Section Pill Badge */}
        <div className="text-center mb-10">
          <span className="inline-flex items-center gap-2 rounded-full bg-white/80 backdrop-blur px-5 py-2 text-xs font-semibold text-[#9E4F63] ring-1 ring-[#9E4F63]/25 shadow-soft">
            <Sparkles className="w-3.5 h-3.5 text-[#9E4F63]" />
            GlowCare Member Lounge &bull; Personalized AI Skincare Portal
          </span>
        </div>

        {/* THE MAIN LUXURY CARD (Exact Replica of your image) */}
        <div className="relative mx-auto max-w-5xl bg-[#FCF8F5] rounded-[2.5rem] sm:rounded-[3rem] shadow-2xl overflow-hidden border border-white/90 grid lg:grid-cols-12 min-h-[660px]">
          
          {/* LEFT COLUMN: THE AUTH FORM */}
          <div className="lg:col-span-6 xl:col-span-7 p-6 sm:p-10 md:p-12 flex flex-col justify-between relative bg-gradient-to-b from-[#FFFDFB] via-[#FCF6F4] to-[#F9EFEF]/60">
            
            {/* Top Brand & Title Header */}
            <div className="text-center pt-2">
              {/* Delicate Botanical Leaf Logo */}
              <div className="inline-flex flex-col items-center justify-center mb-3 group">
                <svg
                  viewBox="0 0 64 64"
                  className="w-10 h-10 text-[#9E4F63] transition-transform duration-700 group-hover:scale-110"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2.2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M32 10 C26 22, 22 34, 32 46 C42 34, 38 22, 32 10 Z" />
                  <path d="M24 24 C14 28, 12 40, 26 44 C26 34, 25 28, 24 24 Z" />
                  <path d="M40 24 C50 28, 52 40, 38 44 C38 34, 39 28, 40 24 Z" />
                  <line x1="32" y1="46" x2="32" y2="56" />
                </svg>

                <h2 className="font-brand text-lg sm:text-xl font-medium tracking-[0.28em] text-[#3A2E2B] mt-2">
                  G L O W C A R E
                </h2>
                <p className="text-[10px] sm:text-[11px] font-medium tracking-[0.24em] text-[#9E4F63] uppercase mt-0.5">
                  Beauty Lives in You
                </p>
              </div>

              {/* Handwritten Cursive Title */}
              <h1 className="font-script text-5xl sm:text-6xl text-[#9E4F63] tracking-wide leading-none mt-2 mb-1.5 select-none drop-shadow-sm">
                Glow Everyday You ♡
              </h1>

              {/* Subtitle */}
              <p className="text-xs sm:text-sm text-[#3A2E2B]/80 font-medium tracking-wide">
                Skincare &bull; Makeup &bull; Selfcare
              </p>
              <p className="text-[11px] sm:text-xs text-[#3A2E2B]/60 tracking-wider uppercase mt-0.5">
                A More Radiant You
              </p>
            </div>

            {/* Form */}
            <form onSubmit={handleSubmit} className="mt-6 sm:mt-7 max-w-md mx-auto w-full space-y-3.5">
              {statusMsg && (
                <div className="p-3 rounded-2xl bg-[#9E4F63]/10 border border-[#9E4F63]/25 text-[#9E4F63] text-xs font-medium text-center animate-fadeIn">
                  {statusMsg}
                </div>
              )}

              {isSignUp && (
                <div className="glass-input rounded-2xl px-4 py-3 flex items-center gap-3 transition-all">
                  <Sparkles className="w-4 h-4 text-[#9E4F63]" />
                  <input
                    type="text"
                    placeholder="Full Name"
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                    className="w-full bg-transparent text-sm text-[#3A2E2B] placeholder:text-[#3A2E2B]/45 outline-none"
                  />
                </div>
              )}

              {/* Input 1: Email or Phone */}
              <div className="glass-input rounded-2xl px-4 py-3 flex items-center gap-3 transition-all">
                <Mail className="w-4 h-4 text-[#9E4F63]/75" />
                <input
                  type="text"
                  placeholder="Email or Phone Number"
                  value={emailOrPhone}
                  onChange={(e) => setEmailOrPhone(e.target.value)}
                  className="w-full bg-transparent text-sm text-[#3A2E2B] placeholder:text-[#3A2E2B]/45 outline-none font-normal"
                />
              </div>

              {/* Input 2: Password with Eye Toggle */}
              <div className="glass-input rounded-2xl px-4 py-3 flex items-center gap-3 transition-all">
                <Lock className="w-4 h-4 text-[#9E4F63]/75" />
                <input
                  type={showPassword ? 'text' : 'password'}
                  placeholder="Password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full bg-transparent text-sm text-[#3A2E2B] placeholder:text-[#3A2E2B]/45 outline-none font-normal"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="text-[#3A2E2B]/50 hover:text-[#9E4F63] transition-colors p-1"
                  aria-label="Toggle password visibility"
                >
                  {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>

              {/* Forgot Password */}
              <div className="flex justify-end pr-1">
                <button
                  type="button"
                  onClick={() => setStatusMsg('Password reset instructions sent to your email ♡')}
                  className="text-[11px] sm:text-xs text-[#3A2E2B]/70 hover:text-[#9E4F63] transition-colors font-medium"
                >
                  Forgot Password?
                </button>
              </div>

              {/* Main Action Pill Button */}
              <button
                type="submit"
                className="w-full mt-2 py-3.5 px-6 rounded-full bg-[#9E4F63] hover:bg-[#883E51] text-white font-medium text-sm sm:text-base flex items-center justify-center gap-2 shadow-lg shadow-[#9E4F63]/25 hover:shadow-xl hover:shadow-[#9E4F63]/30 transition-all duration-300 transform active:scale-[0.99]"
              >
                <span>{isSignUp ? 'Sign Up' : 'Log In'}</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              {/* Social Divider */}
              <div className="relative py-2 flex items-center justify-center">
                <div className="w-full border-t border-[#3A2E2B]/10" />
                <span className="absolute bg-[#FCF8F5] px-4 text-[11px] text-[#3A2E2B]/60 font-medium">
                  or continue with
                </span>
              </div>

              {/* Social Login Buttons (Google, Apple, Facebook) */}
              <div className="flex items-center justify-center gap-4 pt-1">
                <button
                  type="button"
                  onClick={() => handleSocial('Google')}
                  className="w-11 h-11 rounded-full bg-white shadow-sm border border-white hover:border-[#9E4F63]/30 hover:scale-105 transition-all flex items-center justify-center"
                  title="Continue with Google"
                >
                  <svg className="w-5 h-5" viewBox="0 0 24 24">
                    <path
                      fill="#4285F4"
                      d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                    />
                    <path
                      fill="#34A853"
                      d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                    />
                    <path
                      fill="#FBBC05"
                      d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z"
                    />
                    <path
                      fill="#EA4335"
                      d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z"
                    />
                  </svg>
                </button>

                <button
                  type="button"
                  onClick={() => handleSocial('Apple')}
                  className="w-11 h-11 rounded-full bg-white shadow-sm border border-white hover:border-[#9E4F63]/30 hover:scale-105 transition-all flex items-center justify-center text-ink"
                  title="Continue with Apple"
                >
                  <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24">
                    <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.81-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M15.97 6.38c.62-.75 1.04-1.8 0.93-2.85-.9.04-1.99.6-2.63 1.35-.57.65-1.07 1.72-.94 2.74 1 .08 2.02-.49 2.64-1.24" />
                  </svg>
                </button>

                <button
                  type="button"
                  onClick={() => handleSocial('Facebook')}
                  className="w-11 h-11 rounded-full bg-white shadow-sm border border-white hover:border-[#9E4F63]/30 hover:scale-105 transition-all flex items-center justify-center text-[#1877F2]"
                  title="Continue with Facebook"
                >
                  <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24">
                    <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
                  </svg>
                </button>
              </div>

              {/* Toggle Sign Up / Log In */}
              <div className="text-center pt-2">
                <p className="text-xs text-[#3A2E2B]/75">
                  {isSignUp ? 'Already have an account? ' : "Don't have an account? "}
                  <button
                    type="button"
                    onClick={() => setIsSignUp(!isSignUp)}
                    className="text-[#9E4F63] hover:text-[#883E51] font-semibold underline underline-offset-2 ml-1"
                  >
                    {isSignUp ? 'Log In' : 'Sign Up'}
                  </button>
                </p>
              </div>
            </form>

            {/* 4 LUXURY TRUST BADGES */}
            <div className="mt-8 pt-5 border-t border-[#3A2E2B]/10 grid grid-cols-4 gap-2 text-center">
              <div className="flex flex-col items-center group">
                <span className="w-7 h-7 rounded-full bg-white/70 flex items-center justify-center text-[#9E4F63] mb-1 group-hover:scale-110 transition-transform shadow-xs">
                  <Leaf className="w-3.5 h-3.5" />
                </span>
                <span className="text-[10px] text-[#3A2E2B]/80 font-medium leading-tight">
                  Clean<br />Beauty
                </span>
              </div>

              <div className="flex flex-col items-center group">
                <span className="w-7 h-7 rounded-full bg-white/70 flex items-center justify-center text-[#9E4F63] mb-1 group-hover:scale-110 transition-transform shadow-xs">
                  <Heart className="w-3.5 h-3.5" />
                </span>
                <span className="text-[10px] text-[#3A2E2B]/80 font-medium leading-tight">
                  Cruelty<br />Free
                </span>
              </div>

              <div className="flex flex-col items-center group">
                <span className="w-7 h-7 rounded-full bg-white/70 flex items-center justify-center text-[#9E4F63] mb-1 group-hover:scale-110 transition-transform shadow-xs">
                  <Flower2 className="w-3.5 h-3.5" />
                </span>
                <span className="text-[10px] text-[#3A2E2B]/80 font-medium leading-tight">
                  Naturally<br />Inspired
                </span>
              </div>

              <div className="flex flex-col items-center group">
                <span className="w-7 h-7 rounded-full bg-white/70 flex items-center justify-center text-[#9E4F63] mb-1 group-hover:scale-110 transition-transform shadow-xs">
                  <Sparkles className="w-3.5 h-3.5" />
                </span>
                <span className="text-[10px] text-[#3A2E2B]/80 font-medium leading-tight">
                  For a<br />Better You
                </span>
              </div>
            </div>

            {/* Bottom Footnote Brand */}
            <div className="text-center pt-4">
              <span className="font-brand text-[10px] tracking-[0.25em] text-[#3A2E2B]/50 block">
                G L O W C A R E
              </span>
              <span className="text-[9px] tracking-[0.2em] text-[#9E4F63]/70 uppercase block mt-0.5">
                Beauty Lives in You
              </span>
            </div>
          </div>

          {/* RIGHT COLUMN: LUXURY EDITORIAL BEAUTY CAMPAIGN VISUAL */}
          <div className="hidden lg:block lg:col-span-6 xl:col-span-5 relative overflow-hidden bg-[#FAF3EE]">
            <img
              src={heroImg}
              alt="GlowCare Beauty Editorial"
              className="w-full h-full object-cover object-center transform scale-[1.02] hover:scale-105 transition-transform duration-1000"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent pointer-events-none" />
            <div className="absolute inset-0 bg-gradient-to-r from-[#FCF8F5]/40 via-transparent to-transparent pointer-events-none" />

            {/* Handwritten Card Accent on Marble (Exact detail from your photo!) */}
            <div className="absolute bottom-6 right-6 z-20 transform -rotate-3 hover:rotate-0 transition-transform duration-500">
              <div className="bg-[#FFFDF9]/95 backdrop-blur-md px-5 py-3 rounded-2xl shadow-xl border border-white/80 max-w-[210px] text-center">
                <p className="font-script text-2xl text-[#9E4F63] leading-snug">
                  Same Girl...
                </p>
                <p className="font-script text-2xl text-[#9E4F63] leading-snug">
                  Brighter Tomorrow ♡
                </p>
              </div>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
}
