import { useEffect, useState } from 'react';
import { Menu, X, Sparkles, User, LogOut } from 'lucide-react';

const links = [
  { label: 'Home', href: '#home' },
  { label: 'Products', href: '#products' },
  { label: 'Skin Quiz', href: '#quiz' },
  { label: 'Face Scan', href: '#scanner' },
  { label: 'AI Routine', href: '#recommendation' },
  { label: 'Member Lounge', href: '#lumiere-portal' },
  { label: 'About', href: '#about' },
  { label: 'Contact', href: '#contact' },
];

interface NavbarProps {
  onOpenAuth?: () => void;
  currentUser?: { name: string; email: string } | null;
  onLogout?: () => void;
}

export default function Navbar({ onOpenAuth, currentUser, onLogout }: NavbarProps) {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <header
      className={`fixed top-0 inset-x-0 z-50 transition-all duration-500 ${
        scrolled
          ? 'bg-[#FFFDFB]/90 backdrop-blur-xl shadow-soft border-b border-[#F7E5E8]'
          : 'bg-transparent'
      }`}
    >
      <nav className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-10 flex items-center justify-between h-20">
        
        {/* Brand with Botanical Logo */}
        <a href="#home" className="flex items-center gap-3 group">
          <span className="grid place-items-center w-10 h-10 rounded-2xl bg-gradient-to-br from-[#9E4F63] to-[#B26779] text-white shadow-soft transition-transform duration-500 group-hover:rotate-12">
            <svg
              viewBox="0 0 64 64"
              className="w-5 h-5 text-white"
              fill="none"
              stroke="currentColor"
              strokeWidth="2.4"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M32 10 C26 22, 22 34, 32 46 C42 34, 38 22, 32 10 Z" />
              <path d="M24 24 C14 28, 12 40, 26 44 C26 34, 25 28, 24 24 Z" />
              <path d="M40 24 C50 28, 52 40, 38 44 C38 34, 39 28, 40 24 Z" />
            </svg>
          </span>
          <div className="flex flex-col">
            <span className="font-brand text-xl font-bold tracking-[0.2em] text-[#3A2E2B]">
              GLOWCARE
            </span>
            <span className="text-[10px] tracking-[0.22em] text-[#9E4F63] uppercase -mt-0.5 font-medium">
              Beauty Lives in You
            </span>
          </div>
        </a>

        {/* Desktop Links */}
        <ul className="hidden xl:flex items-center gap-1">
          {links.map((l) => (
            <li key={l.href}>
              <a
                href={l.href}
                className="relative px-3.5 py-2 text-xs font-medium text-[#3A2E2B]/75 hover:text-[#9E4F63] transition-colors duration-300 after:absolute after:left-3.5 after:right-3.5 after:bottom-1 after:h-0.5 after:rounded-full after:bg-[#9E4F63] after:scale-x-0 hover:after:scale-x-100 after:transition-transform after:duration-300 after:origin-left"
              >
                {l.label}
              </a>
            </li>
          ))}
        </ul>

        {/* Right Action Buttons */}
        <div className="hidden lg:flex items-center gap-3">
          {currentUser ? (
            <div className="flex items-center gap-2 bg-white/80 backdrop-blur border border-[#F7E5E8] rounded-full px-4 py-1.5 shadow-sm">
              <span className="w-7 h-7 rounded-full bg-[#9E4F63] text-white flex items-center justify-center text-xs font-semibold">
                {currentUser.name.charAt(0).toUpperCase()}
              </span>
              <span className="text-xs font-medium text-[#3A2E2B]">
                {currentUser.name} ♡
              </span>
              <button
                onClick={onLogout}
                className="text-[#3A2E2B]/50 hover:text-[#9E4F63] transition-colors p-1"
                title="Log Out"
              >
                <LogOut className="w-3.5 h-3.5" />
              </button>
            </div>
          ) : (
            <button
              onClick={onOpenAuth}
              className="inline-flex items-center gap-1.5 rounded-full bg-white/80 hover:bg-white text-[#9E4F63] border border-[#9E4F63]/30 px-4 py-2 text-xs font-semibold shadow-xs hover:shadow-soft transition-all duration-300"
            >
              <User className="w-3.5 h-3.5" />
              Sign In
            </button>
          )}

          <a
            href="#quiz"
            className="rounded-full bg-[#9E4F63] hover:bg-[#883E51] text-white px-5 py-2.5 text-xs font-semibold shadow-soft hover:shadow-md transition-all duration-300 flex items-center gap-1.5"
          >
            <Sparkles className="w-3.5 h-3.5" />
            Take Skin Quiz
          </a>
        </div>

        {/* Mobile Toggle */}
        <button
          onClick={() => setOpen((v) => !v)}
          className="lg:hidden grid place-items-center w-10 h-10 rounded-xl bg-[#F7E5E8] text-[#3A2E2B]"
          aria-label="Toggle menu"
        >
          {open ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
        </button>
      </nav>

      {/* Mobile menu */}
      <div
        className={`lg:hidden overflow-hidden transition-all duration-500 ${
          open ? 'max-h-[32rem]' : 'max-h-0'
        }`}
      >
        <ul className="px-6 pb-6 pt-2 space-y-1 bg-[#FFFDFB]/98 backdrop-blur-xl border-t border-[#F7E5E8]">
          {links.map((l) => (
            <li key={l.href}>
              <a
                href={l.href}
                onClick={() => setOpen(false)}
                className="block px-4 py-2.5 rounded-xl text-[#3A2E2B]/80 hover:bg-[#F7E5E8] hover:text-[#9E4F63] text-sm font-medium transition-colors"
              >
                {l.label}
              </a>
            </li>
          ))}
          
          <li className="pt-2 flex flex-col gap-2">
            {currentUser ? (
              <div className="flex items-center justify-between p-3 rounded-xl bg-[#F7E5E8]/60">
                <span className="text-xs font-medium text-[#3A2E2B]">
                  Signed in as <b>{currentUser.name}</b>
                </span>
                <button
                  onClick={onLogout}
                  className="text-xs text-[#9E4F63] font-semibold flex items-center gap-1"
                >
                  <LogOut className="w-3.5 h-3.5" /> Log Out
                </button>
              </div>
            ) : (
              <button
                onClick={() => {
                  setOpen(false);
                  if (onOpenAuth) onOpenAuth();
                }}
                className="w-full text-center rounded-full bg-white text-[#9E4F63] border border-[#9E4F63]/30 px-5 py-2.5 font-semibold text-xs shadow-xs"
              >
                Sign In / Member Portal
              </button>
            )}

            <a
              href="#quiz"
              onClick={() => setOpen(false)}
              className="block text-center rounded-full bg-[#9E4F63] text-white px-5 py-2.5 font-semibold text-xs shadow-soft"
            >
              Take the Skin Quiz
            </a>
          </li>
        </ul>
      </div>
    </header>
  );
}
