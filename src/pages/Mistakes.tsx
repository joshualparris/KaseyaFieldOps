import { useAppStore } from '../store/useAppStore';
import { XOctagon, CheckCircle2, AlertCircle } from 'lucide-react';

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
            <div key={mistake.id} className="bg-white border border-danger/30 rounded-xl p-6 shadow-sm">
              <div className="flex items-start justify-between mb-4">
                <div>
                  <span className="inline-block px-2 py-1 bg-danger/10 text-danger text-xs font-bold rounded-md mb-2 uppercase">
                    {mistake.activityType}
                  </span>
                  <h3 className="font-medium text-textMain">Expected: {mistake.expectedReasoning}</h3>
                </div>
                <button
                  onClick={() => resolveMistake(mistake.id)}
                  className="btn btn-secondary text-sm"
                >
                  Mark Understood
                </button>
              </div>
              <div className="bg-bgMuted p-4 rounded-lg mb-4">
                <p className="text-sm font-semibold text-danger mb-1">You answered:</p>
                <p className="text-sm text-textMuted">{mistake.userAnswer}</p>
              </div>
              <div>
                <p className="text-sm font-semibold text-textMain mb-1 flex items-center gap-2">
                  <AlertCircle size={16} className="text-primary" /> Explanation
                </p>
                <p className="text-sm text-textMuted">{mistake.explanation}</p>
              </div>
            </div>
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
