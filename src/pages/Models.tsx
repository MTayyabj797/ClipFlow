import { Check, Cpu, Gauge, Target, Zap, Sparkles, Crown } from 'lucide-react';
import { AI_MODELS } from '@/data';
import type { AIModel } from '@/types';
import { Badge } from '@/components/ui/Badge';
import { Button } from '@/components/ui/Button';

interface ModelsProps {
  selected: string;
  onSelect: (id: string) => void;
}

function RatingBar({ label, value, icon }: { label: string; value: number; icon: React.ReactNode }) {
  return (
    <div>
      <div className="mb-1.5 flex items-center justify-between text-xs">
        <span className="flex items-center gap-1.5 text-slate-400">
          {icon}
          {label}
        </span>
        <span className="font-semibold text-slate-300">{value}/5</span>
      </div>
      <div className="flex gap-1">
        {[1, 2, 3, 4, 5].map((n) => (
          <div
            key={n}
            className={`h-1.5 flex-1 rounded-full transition-colors ${
              n <= value ? 'bg-brand-gradient' : 'bg-ink-600'
            }`}
          />
        ))}
      </div>
    </div>
  );
}

export function Models({ selected, onSelect }: ModelsProps) {
  return (
    <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
      {/* Header */}
      <div className="mb-10 text-center animate-slide-up">
        <Badge variant="brand" className="mb-3" icon={<Cpu className="h-3 w-3" />}>
          AI Processing Engine
        </Badge>
        <h1 className="text-3xl font-extrabold tracking-tight text-white sm:text-4xl">
          Choose Your <span className="gradient-text">AI Engine</span>
        </h1>
        <p className="mx-auto mt-3 max-w-2xl text-sm text-slate-400">
          The model you select drives virality scoring, smart-cropping accuracy, caption timing, and overall output quality.
          Upgrade anytime — pricing is billed per minute of source video processed.
        </p>
      </div>

      {/* Model cards */}
      <div className="grid gap-6 lg:grid-cols-3">
        {AI_MODELS.map((model, i) => (
          <ModelCard
            key={model.id}
            model={model}
            selected={selected === model.id}
            onSelect={() => onSelect(model.id)}
            delay={i * 0.08}
          />
        ))}
      </div>

      {/* Comparison note */}
      <div className="mt-8 rounded-2xl glass p-5 text-center animate-fade-in">
        <p className="text-sm text-slate-400">
          <Sparkles className="mr-1.5 inline h-4 w-4 text-brand-300" />
          All models include AI virality scoring, auto-captions, and smart vertical reframing.
          Higher tiers add emotion detection, b-roll, and multi-speaker awareness.
        </p>
      </div>
    </div>
  );
}

function ModelCard({
  model,
  selected,
  onSelect,
  delay,
}: {
  model: AIModel;
  selected: boolean;
  onSelect: () => void;
  delay: number;
}) {
  const isHighlight = model.highlight;

  return (
    <div
      className={`relative rounded-2xl border p-6 transition-all duration-300 animate-slide-up ${
        selected
          ? 'border-brand-400/40 bg-brand-500/5 shadow-glow-brand'
          : isHighlight
          ? 'border-brand-400/20 bg-ink-850 shadow-card hover:shadow-card-hover'
          : 'border-ink-600 bg-ink-850 shadow-card hover:border-ink-500'
      }`}
      style={{ animationDelay: `${delay}s` }}
    >
      {model.badge && (
        <div className="absolute -top-3 left-1/2 -translate-x-1/2">
          <Badge variant="brand" className="shadow-glow-brand" icon={<Crown className="h-3 w-3" />}>
            {model.badge}
          </Badge>
        </div>
      )}

      {/* Header */}
      <div className="mb-4 flex items-start justify-between">
        <div>
          <h3 className="text-lg font-bold text-white">{model.name}</h3>
          <p className="text-xs font-medium uppercase tracking-wider text-brand-300">{model.tagline}</p>
        </div>
        <div
          className={`flex h-11 w-11 items-center justify-center rounded-xl ${
            model.id === 'lite'
              ? 'bg-slate-500/15 text-slate-300'
              : model.id === 'pro'
              ? 'bg-brand-500/15 text-brand-300'
              : 'bg-accent-500/15 text-accent-400'
          }`}
        >
          {model.id === 'lite' ? <Zap className="h-5 w-5" /> : model.id === 'pro' ? <Cpu className="h-5 w-5" /> : <Crown className="h-5 w-5" />}
        </div>
      </div>

      <p className="mb-5 text-sm leading-relaxed text-slate-400">{model.description}</p>

      {/* Ratings */}
      <div className="mb-5 space-y-3">
        <RatingBar label="Speed" value={model.speed} icon={<Gauge className="h-3 w-3" />} />
        <RatingBar label="Accuracy" value={model.accuracy} icon={<Target className="h-3 w-3" />} />
      </div>

      {/* Features */}
      <ul className="mb-6 space-y-2">
        {model.features.map((f) => (
          <li key={f} className="flex items-center gap-2 text-sm text-slate-300">
            <Check className="h-4 w-4 shrink-0 text-brand-400" />
            {f}
          </li>
        ))}
      </ul>

      {/* Price */}
      <div className="mb-5 rounded-xl border border-ink-600 bg-ink-800/50 px-4 py-3">
        <div className="flex items-baseline justify-between">
          <span className="text-xs text-slate-500">Usage pricing</span>
          <span className={`text-lg font-bold ${model.pricePerMinute === 0 ? 'text-emerald-400' : 'text-white'}`}>
            {model.priceLabel}
          </span>
        </div>
      </div>

      {/* CTA */}
      <Button
        onClick={onSelect}
        variant={selected ? 'primary' : isHighlight ? 'primary' : 'outline'}
        className="w-full"
        icon={selected ? <Check className="h-4 w-4" /> : undefined}
      >
        {selected ? 'Selected' : 'Select Model'}
      </Button>
    </div>
  );
}
