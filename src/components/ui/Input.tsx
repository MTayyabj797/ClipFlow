import { type InputHTMLAttributes, forwardRef } from 'react';

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  icon?: React.ReactNode;
  label?: string;
  hint?: string;
}

export const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ icon, label, hint, className = '', id, ...props }, ref) => {
    const inputId = id || label?.replace(/\s+/g, '-').toLowerCase();
    return (
      <div className="flex flex-col gap-1.5">
        {label && (
          <label htmlFor={inputId} className="text-sm font-medium text-slate-300">
            {label}
          </label>
        )}
        <div className="relative">
          {icon && <span className="pointer-events-none absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-500">{icon}</span>}
          <input
            ref={ref}
            id={inputId}
            className={`w-full rounded-xl bg-ink-800 border border-ink-600 text-white placeholder:text-slate-500 transition-all duration-200 focus:outline-none focus:border-brand-400 focus:ring-2 focus:ring-brand-400/20 ${
              icon ? 'pl-11 pr-4' : 'px-4'
            } h-11 ${className}`}
            {...props}
          />
        </div>
        {hint && <span className="text-xs text-slate-500">{hint}</span>}
      </div>
    );
  },
);
Input.displayName = 'Input';
