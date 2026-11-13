import { type ReactNode } from 'react';

interface SegmentedProps<T extends string> {
  options: { id: T; label: string; icon?: ReactNode }[];
  value: T;
  onChange: (value: T) => void;
  className?: string;
}

export function Segmented<T extends string>({ options, value, onChange, className = '' }: SegmentedProps<T>) {
  return (
    <div className={`inline-flex rounded-xl bg-ink-800 p-1 border border-white/5 ${className}`}>
      {options.map((opt) => (
        <button
          key={opt.id}
          onClick={() => onChange(opt.id)}
          className={`inline-flex items-center gap-1.5 rounded-lg px-3.5 py-1.5 text-sm font-medium transition-all duration-200 ${
            value === opt.id
              ? 'bg-brand-gradient text-white shadow-glow-brand'
              : 'text-slate-400 hover:text-slate-200'
          }`}
        >
          {opt.icon}
          {opt.label}
        </button>
      ))}
    </div>
  );
}
