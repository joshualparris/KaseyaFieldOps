import { useState } from 'react';
import { useAppStore } from '../store/useAppStore';
import { XOctagon, CheckCircle2, AlertCircle } from 'lucide-react';
import type { Mistake } from '../data/types';

export function Mistakes() {
  const { mistakeBank, resolveMistake } = useAppStore();

  const unresolved = mistakeBank.filter(m => !m.resolved);
  const resolved = mistakeBank.filter(m => m.resolved);

  return (
    <div className="max-w-4xl mx-auto py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-textMain flex items-center gap-3">
          <XOctagon className="text-danger" size={32} />
          Mistake Bank
        </h1>
        <p className="text-textMuted mt-2">
          Review your incorrect answers and misconceptions. The learning engine will automatically schedule these for repair during daily sessions.
        </p>
      </div>

      <h2 className="text-xl font-semibold mb-4 text-textMain">Unresolved Mistakes ({unresolved.length})</h2>
      {unresolved.length === 0 ? (
        <div className="bg-surface border border-border rounded-xl p-8 text-center text-textMuted mb-8">
          <CheckCircle2 size={48} className="mx-auto text-success mb-4 opacity-50" />
          <p>Great job! You have no unresolved mistakes.</p>
        </div>
      ) : (
        <div className="space-y-4 mb-8">
          {unresolved.map(mistake => (
            <MistakeItem key={mistake.id} mistake={mistake} onResolve={resolveMistake} />
          ))}
        </div>
      )}

      <h2 className="text-xl font-semibold mb-4 text-textMain mt-12">Resolved History ({resolved.length})</h2>
      <div className="space-y-4 opacity-75">
        {resolved.map(mistake => (
          <div key={mistake.id} className="bg-surface border border-border rounded-xl p-4">
            <h3 className="font-medium text-textMuted text-sm strike-through">
              {mistake.expectedReasoning}
            </h3>
            <p className="text-xs text-textMuted mt-1">Repaired {mistake.repairCount} times.</p>
          </div>
        ))}
      </div>
    </div>
  );
}

function MistakeItem({ mistake, onResolve }: { mistake: Mistake, onResolve: (id: string) => void }) {
  const [reflection, setReflection] = useState('');

  return (
    <div className="bg-white border border-danger/30 rounded-xl p-6 shadow-sm">
      <div className="flex items-start justify-between mb-4">
        <div>
          <span className="inline-block px-2 py-1 bg-danger/10 text-danger text-xs font-bold rounded-md mb-2 uppercase">
            {mistake.activityType}
          </span>
          <h3 className="font-medium text-textMain">Expected: {mistake.expectedReasoning}</h3>
        </div>
      </div>
      <div className="bg-bgMuted p-4 rounded-lg mb-4">
        <p className="text-sm font-semibold text-danger mb-1">You answered:</p>
        <p className="text-sm text-textMuted">{mistake.userAnswer}</p>
      </div>
      <div className="mb-4">
        <p className="text-sm font-semibold text-textMain mb-1 flex items-center gap-2">
          <AlertCircle size={16} className="text-primary" /> Explanation
        </p>
        <p className="text-sm text-textMuted">{mistake.explanation}</p>
      </div>
      <div className="mt-4 pt-4 border-t border-border">
        <p className="text-sm font-semibold mb-2">Write down why the expected reasoning is correct to resolve this mistake:</p>
        <textarea
          className="w-full border border-border rounded-lg p-3 text-sm mb-3 focus:border-primary focus:ring-1 focus:ring-primary outline-none"
          rows={3}
          placeholder="I need to remember that..."
          value={reflection}
          onChange={(e) => setReflection(e.target.value)}
        />
        <div className="flex justify-end">
          <button
            onClick={() => onResolve(mistake.id)}
            disabled={reflection.trim().length < 10}
            className={`btn text-sm ${reflection.trim().length >= 10 ? 'btn-primary' : 'bg-slate-200 text-slate-400 cursor-not-allowed'}`}
          >
            Mark Understood
          </button>
        </div>
      </div>
    </div>
  );
}
