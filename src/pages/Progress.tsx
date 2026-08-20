import { useAppStore } from '../store/useAppStore';
import { modules } from '../data/modules';
import { Activity, Star, CheckCircle, Shield } from 'lucide-react';

export function Progress() {
  const { xp, completedScenarios, competencies } = useAppStore();

  return (
    <div className="max-w-5xl mx-auto py-8">
      <div className="mb-8 flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-textMain flex items-center gap-3">
            <Activity className="text-primary" size={32} />
            Your Progress
          </h1>
          <p className="text-textMuted mt-2">Track your XP, completed scenarios, and module mastery.</p>
        </div>
        <div className="bg-surface border border-border px-6 py-4 rounded-xl flex items-center gap-4 shadow-sm">
          <Star className="text-yellow-500 fill-yellow-500" size={32} />
          <div>
            <div className="text-sm font-bold text-textMuted uppercase tracking-wider">Total XP</div>
            <div className="text-3xl font-black text-textMain">{xp.toLocaleString()}</div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
        <div className="bg-white border border-border rounded-xl p-6 shadow-sm">
          <h2 className="text-lg font-bold mb-6 flex items-center gap-2">
            <CheckCircle className="text-success" /> Scenarios Completed
          </h2>
          <div className="text-4xl font-black text-textMain mb-2">{completedScenarios.length}</div>
          <p className="text-textMuted text-sm">Keep drilling to improve your decision-making.</p>
        </div>
      </div>

      <h2 className="text-2xl font-bold text-textMain mb-6 flex items-center gap-2">
        <Shield className="text-primary" /> Module Mastery
      </h2>
      
      <div className="space-y-6">
        {modules.map((m: any) => {
          const comp = competencies[m.id];
          const progress = Math.min(100, Math.round(comp?.decisionMaking || 0));
          
          return (
            <div key={m.id} className="bg-white border border-border rounded-xl p-6 shadow-sm">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-3">
                  <div className={`w-10 h-10 rounded-lg ${m.color} flex items-center justify-center text-white font-bold`}>
                    {m.name.substring(0, 1)}
                  </div>
                  <h3 className="font-bold text-lg">{m.name}</h3>
                </div>
                <div className="text-right">
                  <div className="text-sm font-semibold text-textMuted">Overall Progress</div>
                  <div className="text-xl font-bold text-primary">{progress}%</div>
                </div>
              </div>
              
              <div className="w-full bg-bgMuted rounded-full h-2.5 mb-6">
                <div className="bg-primary h-2.5 rounded-full" style={{ width: `${progress}%` }}></div>
              </div>

              {comp && (
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {Object.entries(comp).map(([key, value]) => (
                    <div key={key} className="bg-surface rounded-lg p-3 border border-border">
                      <div className="text-xs text-textMuted capitalize mb-1">{key.replace(/([A-Z])/g, ' $1').trim()}</div>
                      <div className="font-bold text-sm">
                        <div className="flex items-center gap-2">
                          <div className="w-full bg-slate-200 dark:bg-slate-700 h-2 rounded-full overflow-hidden">
                            <div 
                              className={`h-full ${m.color}`} 
                              style={{ width: `${Math.min(100, (value as number) || 0)}%` }}
                            />
                          </div>
                        </div>
                        <div className="text-right ml-4">
                          <div className="font-bold text-textMain">{Math.min(100, Math.round(value as number) || 0)}%</div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
