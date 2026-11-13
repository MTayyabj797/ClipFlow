import { useState } from 'react';
import { Bell, ChevronDown, Zap, Menu, X, Home, Cpu, CreditCard, Tag } from 'lucide-react';
import type { PageId } from '@/types';

interface NavbarProps {
  current: PageId;
  onNavigate: (page: PageId) => void;
}

const NAV_ITEMS: { id: PageId; label: string; icon: typeof Home }[] = [
  { id: 'home', label: 'Home', icon: Home },
  { id: 'models', label: 'AI Models', icon: Cpu },
  { id: 'pricing', label: 'Pricing', icon: Tag },
  { id: 'payment', label: 'Payment', icon: CreditCard },
];

export function Navbar({ current, onNavigate }: NavbarProps) {
  const [mobileOpen, setMobileOpen] = useState(false);

  const go = (id: PageId) => {
    onNavigate(id);
    setMobileOpen(false);
  };

  return (
    <header className="sticky top-0 z-40 border-b border-white/5 bg-ink-950/80 backdrop-blur-xl">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        {/* Logo */}
        <button onClick={() => go('home')} className="flex items-center gap-2.5 group">
          <div className="relative flex h-9 w-9 items-center justify-center rounded-xl bg-brand-gradient shadow-glow-brand transition-transform group-hover:scale-105">
            <Zap className="h-5 w-5 text-white" fill="white" />
          </div>
          <div className="flex flex-col leading-none">
            <span className="text-[15px] font-extrabold tracking-tight text-white">
              ClipFlow<span className="gradient-text"> AI</span>
            </span>
            <span className="hidden text-[10px] font-medium uppercase tracking-widest text-slate-500 sm:block">
              Viral Shorts Engine
            </span>
          </div>
        </button>

        {/* Desktop nav */}
        <nav className="hidden items-center gap-1 md:flex">
          {NAV_ITEMS.map((item) => {
            const Icon = item.icon;
            const active = current === item.id;
            return (
              <button
                key={item.id}
                onClick={() => go(item.id)}
                className={`relative inline-flex items-center gap-2 rounded-lg px-3.5 py-2 text-sm font-medium transition-all duration-200 ${
                  active ? 'text-white' : 'text-slate-400 hover:text-slate-200 hover:bg-white/5'
                }`}
              >
                {active && (
                  <span className="absolute inset-0 rounded-lg bg-brand-500/10 border border-brand-400/20" />
                )}
                <Icon className="relative h-4 w-4" />
                <span className="relative">{item.label}</span>
              </button>
            );
          })}
        </nav>

        {/* Right cluster */}
        <div className="flex items-center gap-2 sm:gap-3">
          {/* Plan badge */}
          <div className="hidden items-center gap-2 rounded-lg border border-brand-400/20 bg-brand-500/10 px-3 py-1.5 sm:flex">
            <Zap className="h-3.5 w-3.5 text-brand-300" fill="currentColor" />
            <span className="text-xs font-semibold text-brand-200">Pro</span>
            <span className="text-xs text-slate-500">140/200 min</span>
          </div>

          {/* Notifications */}
          <button className="relative rounded-lg p-2 text-slate-400 transition-colors hover:bg-white/5 hover:text-white">
            <Bell className="h-5 w-5" />
            <span className="absolute right-1.5 top-1.5 h-2 w-2 rounded-full bg-brand-400 ring-2 ring-ink-950" />
          </button>

          {/* Profile */}
          <button className="flex items-center gap-2 rounded-lg p-1 pr-2 transition-colors hover:bg-white/5">
            <div className="flex h-8 w-8 items-center justify-center rounded-full bg-gradient-to-br from-brand-400 to-accent-500 text-xs font-bold text-white">
              JD
            </div>
            <ChevronDown className="hidden h-4 w-4 text-slate-500 sm:block" />
          </button>

          {/* Mobile menu toggle */}
          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            className="rounded-lg p-2 text-slate-300 transition-colors hover:bg-white/5 md:hidden"
          >
            {mobileOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      {mobileOpen && (
        <nav className="border-t border-white/5 bg-ink-900 px-4 py-3 md:hidden animate-fade-in">
          {NAV_ITEMS.map((item) => {
            const Icon = item.icon;
            const active = current === item.id;
            return (
              <button
                key={item.id}
                onClick={() => go(item.id)}
                className={`flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-colors ${
                  active ? 'bg-brand-500/10 text-white' : 'text-slate-400 hover:bg-white/5'
                }`}
              >
                <Icon className="h-4 w-4" />
                {item.label}
              </button>
            );
          })}
          <div className="mt-2 flex items-center gap-2 rounded-lg border border-brand-400/20 bg-brand-500/10 px-3 py-2">
            <Zap className="h-3.5 w-3.5 text-brand-300" fill="currentColor" />
            <span className="text-xs font-semibold text-brand-200">Pro Plan — 140/200 min left</span>
          </div>
        </nav>
      )}
    </header>
  );
}
