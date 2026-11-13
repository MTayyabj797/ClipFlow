import { useState } from 'react';
import { Navbar } from '@/components/Navbar';
import { Home } from '@/pages/Home';
import { Models } from '@/pages/Models';
import { Pricing } from '@/pages/Pricing';
import { Payment } from '@/pages/Payment';
import { PLANS } from '@/data';
import type { PageId, Plan } from '@/types';

function App() {
  const [page, setPage] = useState<PageId>('home');
  const [selectedModel, setSelectedModel] = useState('pro');
  const [selectedPlan, setSelectedPlan] = useState<Plan>(
    PLANS.find((p) => p.highlighted) ?? PLANS[1],
  );
  const [billing, setBilling] = useState<'monthly' | 'annual'>('monthly');

  const navigate = (p: PageId) => {
    setPage(p);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const choosePlan = (plan: Plan, cycle: 'monthly' | 'annual') => {
    setSelectedPlan(plan);
    setBilling(cycle);
    navigate('payment');
  };

  return (
    <div className="min-h-screen">
      <Navbar current={page} onNavigate={navigate} />

      <main>
        {page === 'home' && <Home selectedModel={selectedModel} onNavigate={navigate} />}

        {page === 'models' && (
          <Models selected={selectedModel} onSelect={setSelectedModel} />
        )}

        {page === 'pricing' && (
          <Pricing onChoosePlan={choosePlan} />
        )}

        {page === 'payment' && (
          <Payment plan={selectedPlan} billing={billing} onBack={() => navigate('home')} />
        )}
      </main>

      {/* Footer */}
      <footer className="border-t border-white/5 px-4 py-8 sm:px-6 lg:px-8">
        <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-4 text-center sm:flex-row sm:text-left">
          <p className="text-xs text-slate-500">
            © 2026 ClipFlow AI · Turn long videos into viral shorts
          </p>
          <div className="flex items-center gap-4 text-xs text-slate-600">
            <span>Terms</span>
            <span>Privacy</span>
            <span>Security</span>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default App;
