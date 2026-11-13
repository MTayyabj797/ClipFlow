import { useState } from 'react';
import {
  CreditCard,
  Wallet,
  Bitcoin,
  Lock,
  ShieldCheck,
  Check,
  ArrowLeft,
  Sparkles,
  Receipt,
  Zap,
} from 'lucide-react';
import type { PaymentMethod, Plan } from '@/types';
import { Badge } from '@/components/ui/Badge';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { Segmented } from '@/components/ui/Segmented';

interface PaymentProps {
  plan: Plan;
  billing: 'monthly' | 'annual';
  onBack: () => void;
}

export function Payment({ plan, billing, onBack }: PaymentProps) {
  const [method, setMethod] = useState<PaymentMethod>('card');
  const [processing, setProcessing] = useState(false);
  const [done, setDone] = useState(false);

  const subtotal = billing === 'monthly' ? plan.monthly : plan.annual;
  const tax = Math.round(subtotal * 0.08 * 100) / 100;
  const total = Math.round((subtotal + tax) * 100) / 100;

  const handlePay = () => {
    setProcessing(true);
    setTimeout(() => {
      setProcessing(false);
      setDone(true);
    }, 1800);
  };

  if (done) {
    return (
      <div className="mx-auto flex min-h-[60vh] max-w-md flex-col items-center justify-center px-4 text-center animate-scale-in">
        <div className="mb-5 flex h-20 w-20 items-center justify-center rounded-full bg-emerald-500/15 shadow-glow-brand">
          <Check className="h-10 w-10 text-emerald-400" strokeWidth={3} />
        </div>
        <h2 className="text-2xl font-bold text-white">Payment Successful!</h2>
        <p className="mt-2 text-sm text-slate-400">
          Your <span className="font-semibold text-white">{plan.name}</span> plan is now active.
          {billing === 'annual' ? ' You saved 20% with annual billing.' : ''}
        </p>
        <Button className="mt-6" onClick={onBack} icon={<Sparkles className="h-4 w-4" />}>
          Start Creating Shorts
        </Button>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-6xl px-4 py-8 sm:px-6 lg:px-8">
      {/* Back */}
      <button
        onClick={onBack}
        className="mb-6 inline-flex items-center gap-2 text-sm text-slate-400 transition-colors hover:text-white"
      >
        <ArrowLeft className="h-4 w-4" />
        Back to pricing
      </button>

      <div className="mb-6">
        <h1 className="text-2xl font-bold text-white">Secure Checkout</h1>
        <p className="text-sm text-slate-500">Complete your purchase to activate your plan</p>
      </div>

      <div className="grid gap-6 lg:grid-cols-[1fr_380px]">
        {/* Payment form */}
        <div className="rounded-2xl glass-strong p-6 animate-slide-up">
          {/* Method selector */}
          <label className="mb-3 block text-sm font-semibold text-slate-200">Payment Method</label>
          <Segmented<PaymentMethod>
            className="w-full flex-wrap"
            options={[
              { id: 'card', label: 'Credit Card', icon: <CreditCard className="h-3.5 w-3.5" /> },
              { id: 'paypal', label: 'PayPal', icon: <Wallet className="h-3.5 w-3.5" /> },
              { id: 'crypto', label: 'Crypto', icon: <Bitcoin className="h-3.5 w-3.5" /> },
            ]}
            value={method}
            onChange={setMethod}
          />

          {/* Card form */}
          {method === 'card' && (
            <div className="mt-6 space-y-4 animate-fade-in">
              <Input label="Cardholder Name" placeholder="John Doe" />
              <div className="relative">
                <Input label="Card Number" placeholder="4242 4242 4242 4242" maxLength={19} />
                <CreditCard className="absolute right-3.5 top-[38px] h-5 w-5 text-slate-500" />
              </div>
              <div className="grid grid-cols-3 gap-3">
                <Input label="Expiry" placeholder="MM/YY" maxLength={5} />
                <Input label="CVC" placeholder="123" maxLength={4} />
                <Input label="Zip Code" placeholder="94103" maxLength={10} />
              </div>
              <div className="flex items-center gap-2 rounded-xl border border-ink-600 bg-ink-800/50 px-4 py-3">
                <Lock className="h-4 w-4 text-brand-300" />
                <span className="text-xs text-slate-400">Card details are encrypted and processed securely via Stripe.</span>
              </div>
            </div>
          )}

          {method === 'paypal' && (
            <div className="mt-6 rounded-xl border border-ink-600 bg-ink-800/50 p-8 text-center animate-fade-in">
              <Wallet className="mx-auto h-10 w-10 text-[#0070ba]" />
              <p className="mt-3 text-sm text-slate-300">You'll be redirected to PayPal to complete your purchase securely.</p>
            </div>
          )}

          {method === 'crypto' && (
            <div className="mt-6 space-y-4 animate-fade-in">
              <div className="rounded-xl border border-ink-600 bg-ink-800/50 p-4">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-slate-400">Credits Balance</span>
                  <span className="text-sm font-bold text-white">$240.00</span>
                </div>
              </div>
              <p className="text-xs text-slate-500">
                Pay with USDC, BTC, or ETH. Your credits balance will be debited automatically.
              </p>
              <Input label="Wallet Address" placeholder="0x..." />
            </div>
          )}

          {/* Trust badges */}
          <div className="mt-6 flex flex-wrap items-center gap-4 border-t border-ink-700 pt-5">
            <div className="flex items-center gap-2 text-xs text-slate-400">
              <ShieldCheck className="h-4 w-4 text-emerald-400" />
              256-bit SSL Secure Checkout
            </div>
            <div className="flex items-center gap-2 text-xs text-slate-400">
              <Zap className="h-4 w-4 text-brand-300" />
              Cancel anytime
            </div>
            <div className="flex items-center gap-2 text-xs text-slate-400">
              <Receipt className="h-4 w-4 text-slate-400" />
              Instant receipt
            </div>
          </div>
        </div>

        {/* Order summary */}
        <aside className="rounded-2xl glass p-6 animate-slide-up h-fit lg:sticky lg:top-20" style={{ animationDelay: '0.1s' }}>
          <h2 className="mb-4 text-sm font-bold uppercase tracking-wider text-slate-400">Order Summary</h2>

          <div className="mb-4 flex items-center gap-3 rounded-xl border border-ink-600 bg-ink-800/50 p-4">
            <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-brand-gradient shadow-glow-brand">
              <Sparkles className="h-5 w-5 text-white" />
            </div>
            <div>
              <p className="text-sm font-bold text-white">{plan.name} Plan</p>
              <p className="text-xs text-slate-500">
                {billing === 'annual' ? 'Annual billing' : 'Monthly billing'}
              </p>
            </div>
            {plan.badge && <Badge variant="brand" className="ml-auto">{plan.badge}</Badge>}
          </div>

          {/* Line items */}
          <div className="space-y-2.5 text-sm">
            <div className="flex justify-between">
              <span className="text-slate-400">Subtotal</span>
              <span className="text-slate-200">${subtotal.toFixed(2)}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-slate-400">Tax (8%)</span>
              <span className="text-slate-200">${tax.toFixed(2)}</span>
            </div>
            {billing === 'annual' && (
              <div className="flex justify-between text-emerald-400">
                <span>Annual savings (20%)</span>
                <span>−${(plan.monthly * 12 - plan.annual).toFixed(2)}</span>
              </div>
            )}
          </div>

          <div className="my-4 border-t border-ink-700" />

          <div className="flex items-baseline justify-between">
            <span className="text-sm font-semibold text-white">Total Due Today</span>
            <span className="text-2xl font-extrabold text-white">${total.toFixed(2)}</span>
          </div>

          <Button
            className="mt-5 w-full"
            size="lg"
            loading={processing}
            onClick={handlePay}
            icon={!processing && <Lock className="h-4 w-4" />}
          >
            {processing ? 'Processing...' : 'Complete Purchase & Activate Plan'}
          </Button>

          <p className="mt-3 text-center text-xs text-slate-500">
            By completing this purchase, you agree to our Terms of Service.
          </p>
        </aside>
      </div>
    </div>
  );
}
