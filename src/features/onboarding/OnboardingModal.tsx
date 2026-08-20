import { useState } from 'react';
import { ShieldCheck, Rocket, Brain, Map } from 'lucide-react';
import { useAppStore } from '../../store/useAppStore';

export function OnboardingModal() {
  const { hasCompletedOnboarding, completeOnboarding } = useAppStore();
  const [isOpen, setIsOpen] = useState(!hasCompletedOnboarding);

  if (!isOpen) return null;

  const handleStart = () => {
    completeOnboarding();
    setIsOpen(false);
  };

  const handleSkip = () => {
    completeOnboarding();
    setIsOpen(false);
  };

  return (
    <div className="fixed inset-0 z-[200] flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm animate-fade-in">
      <div className="bg-surface rounded-2xl shadow-2xl max-w-2xl w-full border border-border overflow-hidden flex flex-col md:flex-row">
        
        <div className="bg-primary p-8 md:w-2/5 flex flex-col justify-center text-white">
          <ShieldCheck size={48} className="mb-4" />
          <h2 className="text-2xl font-bold mb-2">Welcome to Field Ops</h2>
          <p className="text-primary-foreground text-sm opacity-90">
            Master the Kaseya product stack through interactive triage, scenario drills, and spaced repetition.
          </p>
        </div>

        <div className="p-8 md:w-3/5 flex flex-col justify-center bg-surface">
          <h3 className="text-xl font-bold text-textMain mb-4">Your Training Plan</h3>
          <p className="text-sm text-textMuted mb-6">
            We've set up your initial curriculum. Let's get started on mastering the Kaseya product stack.
          </p>

          <div className="space-y-4 mb-8">
            <div className="flex items-start gap-3">
              <Map className="text-blue-500 mt-1 shrink-0" size={18} />
              <div>
                <h4 className="font-semibold text-sm">Product Map</h4>
                <p className="text-xs text-textMuted">Understand how products connect conceptually.</p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <Rocket className="text-orange-500 mt-1 shrink-0" size={18} />
              <div>
                <h4 className="font-semibold text-sm">Scenario Drills</h4>
                <p className="text-xs text-textMuted">Practice real MSP ticket resolution.</p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <Brain className="text-purple-500 mt-1 shrink-0" size={18} />
              <div>
                <h4 className="font-semibold text-sm">Spaced Repetition</h4>
                <p className="text-xs text-textMuted">Retain product knowledge automatically.</p>
              </div>
            </div>
          </div>

          <div className="flex items-center justify-between mt-auto">
            <button onClick={handleSkip} className="text-sm font-medium text-textMuted hover:text-textMain px-2 py-1">
              Skip setup
            </button>
            <button onClick={handleStart} className="btn btn-primary px-6">
              Start Training
            </button>
          </div>
        </div>
        
      </div>
    </div>
  );
}
