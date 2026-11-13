import { type ReactNode } from 'react';

interface BadgeProps {
  children: ReactNode;
  variant?: 'default' | 'brand' | 'success' | 'warning' | 'error' | 'accent';
  className?: string;
  icon?: ReactNode;
}

const variants = {
  default: 'bg-ink-700 text-slate-300 border-white/5',
  brand: 'bg-brand-500/15 text-brand-200 border-brand-400/20',
  success: 'bg-emerald-500/15 text-emerald-300 border-emerald-400/20',
  warning: 'bg-amber-500/15 text-amber-300 border-amber-400/20',
  error: 'bg-red-500/15 text-red-300 border-red-400/20',
  accent: 'bg-accent-500/15 text-accent-400 border-accent-400/20',
};

export function Badge({ children, variant = 'default', className = '', icon }: BadgeProps) {
  return (
    <span
      className={`inline-flex items-center gap-1.5 rounded-full border px-2.5 py-0.5 text-xs font-semibold ${variants[variant]} ${className}`}
    >
      {icon}
      {children}
    </span>
  );
}
