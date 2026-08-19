import { useParams, Link, useNavigate } from 'react-router-dom';
import { modules } from '../data/modules';
import { scenarios } from '../data/scenarios';
import { useAppStore } from '../store/useAppStore';
import { ChevronLeft, Play, BookOpen, CheckCircle2 } from 'lucide-react';

export function ModuleView() {
  const { moduleId } = useParams();
  const navigate = useNavigate();
  const { completedScenarios, moduleProgress } = useAppStore();
  
  const module = modules.find(m => m.id === moduleId);
  const moduleScenarios = scenarios.filter(s => s.moduleId === moduleId);
  const progress = moduleProgress[moduleId || ''] || 0;

  if (!module) {
    return (
      <div className="text-center py-20">
        <h2 className="text-xl font-bold">Module not found</h2>
        <button onClick={() => navigate('/modules')} className="btn btn-secondary mt-4">Go Back</button>
      </div>
    );
  }

  return (
    <div className="space-y-8 animate-fade-in">
      <Link to="/modules" className="inline-flex items-center text-sm font-medium text-textMuted hover:text-textMain mb-2">
        <ChevronLeft size={16} className="mr-1" />
        Back to Modules
      </Link>
      
      <header className="flex items-start gap-6">
        <div className={`w-20 h-20 rounded-2xl ${module.color} flex items-center justify-center text-white text-3xl font-bold shrink-0 shadow-md`}>
          {module.name.charAt(0)}
        </div>
        <div>
          <h1 className="text-3xl font-bold text-textMain">{module.name}</h1>
          <p className="text-lg text-textMuted mt-1">{module.description}</p>
          
          <div className="flex items-center gap-4 mt-4">
            <div className="flex-1 max-w-xs bg-slate-200 h-2.5 rounded-full overflow-hidden">
              <div className={`h-full ${module.color}`} style={{ width: `${progress}%` }} />
            </div>
            <span className="text-sm font-semibold">{progress}% Mastery</span>
          </div>
        </div>
      </header>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* Scenarios List */}
        <div className="lg:col-span-2 space-y-4">
          <h2 className="text-xl font-bold flex items-center gap-2">
            <Play className="text-primary" />
            Scenario Drills
          </h2>
          
          {moduleScenarios.length === 0 ? (
            <div className="bg-slate-50 border border-border border-dashed rounded-xl p-8 text-center text-textMuted">
              No scenarios available for this module yet.
            </div>
          ) : (
            moduleScenarios.map(s => {
              const isCompleted = completedScenarios.includes(s.id);
              return (
                <Link 
                  key={s.id}
                  to={`/scenarios/${s.id}`}
                  className={`card flex items-start gap-4 transition-all hover:shadow-md ${isCompleted ? 'border-l-4 border-l-success' : 'border-l-4 border-l-transparent hover:border-l-primary'}`}
                >
                  <div className={`mt-1 ${isCompleted ? 'text-success' : 'text-slate-300'}`}>
                    <CheckCircle2 size={24} />
                  </div>
                  <div>
                    <h3 className="font-semibold text-lg">{s.title}</h3>
                    <p className="text-textMuted mt-1">{s.description}</p>
                  </div>
                </Link>
              );
            })
          )}
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          <div className="card bg-slate-50 border-none">
            <h3 className="font-bold mb-2 flex items-center gap-2">
              <BookOpen size={18} className="text-blue-500" />
              Orientation
            </h3>
            <p className="text-sm text-textMuted mb-4">
              Review the core concepts, UI terminology, and common use cases for {module.name}.
            </p>
            <button className="btn btn-secondary w-full text-sm">Review Orientation Cards</button>
          </div>
        </div>

      </div>
    </div>
  );
}
