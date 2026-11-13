interface ProgressBarProps {
  value: number;
  className?: string;
  animated?: boolean;
}

export function ProgressBar({ value, className = '', animated = false }: ProgressBarProps) {
  const clamped = Math.min(100, Math.max(0, value));
  return (
    <div className={`h-2 w-full overflow-hidden rounded-full bg-ink-600 ${className}`}>
      <div
        className={`h-full rounded-full bg-brand-gradient transition-all duration-500 ${
          animated ? 'shimmer-bar' : ''
        }`}
        style={{ width: `${clamped}%` }}
      />
    </div>
  );
}
