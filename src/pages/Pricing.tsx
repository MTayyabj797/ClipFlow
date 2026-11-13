import { useState } from 'react';
import { Check, Sparkles, Zap, Crown, Rocket } from 'lucide-react';
import { PLANS } from '@/data';
import type { Plan } from '@/types';
import { Badge } from '@/components/ui/Badge';
import { Button } from '@/components/ui/Button';
import { Segmented } from '@/components/ui/Segmented';

interface PricingProps {
  onChoosePlan: (plan: Plan, billing: 'monthly' | 'annual') => void;
}

const planIcons: Record<string, typeof Zap> = {
  creator: Zap,
  pro: Rocket,
  agency: Crown,
};

export function Pricing({ onChoosePlan }: PricingProps) {
  const [billing, setBilling] = useState<'monthly' | 'annual'>('monthly');

  return (
    <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
      {/* Header */}
      <div className="mb-8 text-center animate-slide-up">
        <Badge variant="brand" className="mb-3" icon={<Sparkles className="h-3 w-3" />}>
          Simple, transparent pricing
        </Badge>
        <h1 className="text-3xl font-extrabold tracking-tight text-white sm:text-4xl">
          Choose the plan that <span className="gradient-text">scales with you</span>
        </h1>
        <p className="mx-auto mt-3 max-w-xl text-sm text-slate-400">
          Start creating viral shorts today. Upgrade, downgrade, or cancel anytime — no hidden fees.
        </p>

        {/* Billing toggle */}
        <div className="mt-6 flex items-center justify-center gap-3">
          <Segmented
            options={[
              { id: 'monthly', label: 'Monthly' },
              { id: 'annual', label: 'Annual — Save 20%' },
            ]}
            value={billing}
            onChange={setBilling}
          />
        </div>
      </div>

      {/* Plans */}
      <div className="grid gap-6 lg:grid-cols-3">
        {PLANS.map((plan, i) => (
          <PlanCard
            key={plan.id}
            plan={plan}
            billing={billing}
            onChoose={() => onChoosePlan(plan, billing)}
            delay={i * 0.08}
          />
        ))}
      </div>

      {/* FAQ strip */}
      <div className="mt-12 grid gap-4 sm:grid-cols-3 animate-fade-in">
        {[
          { q: 'Can I switch plans?', a: 'Yes — upgrade or downgrade anytime. Changes apply at next billing cycle.' },
          { q: 'What happens if I run out of minutes?', a: 'You can purchase top-up minutes or upgrade to a higher tier instantly.' },
          { q: 'Is there a free trial?', a: 'Every plan comes with a 7-day money-back guarantee, no questions asked.' },
        ].map((item) => (
          <div key={item.q} className="rounded-xl glass p-4">
            <p className="text-sm font-semibold text-white">{item.q}</p>
            <p className="mt-1 text-xs text-slate-400">{item.a}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

function PlanCard({
  plan,
  billing,
  onChoose,
  delay,
}: {
  plan: Plan;
  billing: 'monthly' | 'annual';
  onChoose: () => void;
  delay: number;
}) {
  const Icon = planIcons[plan.id] ?? Zap;
  const price = billing === 'monthly' ? plan.monthly : Math.round(plan.annual / 12);
  const highlighted = plan.highlighted;

  return (
    <div
      className={`relative flex flex-col rounded-2xl border p-6 transition-all duration-300 animate-slide-up ${
        highlighted
          ? 'border-brand-400/40 bg-gradient-to-b from-brand-500/10 to-ink-850 shadow-glow-brand lg:scale-[1.03]'
          : 'border-ink-600 bg-ink-850 shadow-card hover:border-ink-500'
      }`}
      style={{ animationDelay: `${delay}s` }}
    >
      {plan.badge && (
        <div className="absolute -top-3 left-1/2 -translate-x-1/2">
          <Badge variant="brand" className="shadow-glow-brand">{plan.badge}</Badge>
        </div>
      )}

      {/* Header */}
      <div className="mb-5 flex items-center gap-3">
        <div
          className={`flex h-11 w-11 items-center justify-center rounded-xl ${
            highlighted ? 'bg-brand-gradient text-white shadow-glow-brand' : 'bg-ink-700 text-slate-300'
          }`}
        >
          <Icon className="h-5 w-5" />
        </div>
        <div>
          <h3 className="text-lg font-bold text-white">{plan.name}</h3>
          <p className="text-xs text-slate-500">{plan.tagline}</p>
        </div>
      </div>

      {/* Price */}
      <div className="mb-5">
        <div className="flex items-baseline gap-1">
          <span className="text-4xl font-extrabold text-white">${price}</span>
          <span className="text-sm text-slate-500">/mo</span>
        </div>
        <p className="mt-1 text-xs text-slate-500">
          {billing === 'annual' ? `Billed $${plan.annual}/year` : 'Billed monthly'}
        </p>
      </div>

      {/* Features */}
      <ul className="mb-6 space-y-2.5 flex-1">
        {plan.features.map((f) => (
          <li key={f} className="flex items-start gap-2 text-sm text-slate-300">
            <Check className={`mt-0.5 h-4 w-4 shrink-0 ${highlighted ? 'text-brand-400' : 'text-emerald-400'}`} />
            {f}
          </li>
        ))}
      </ul>

      {/* CTA */}
      <Button
        onClick={onChoose}
        variant={highlighted ? 'primary' : 'outline'}
        className="w-full"
        icon={highlighted ? <Sparkles className="h-4 w-4" /> : undefined}
      >
        {plan.id === 'creator' ? 'Get Started' : 'Upgrade'}
      </Button>
    </div>
  );
}
