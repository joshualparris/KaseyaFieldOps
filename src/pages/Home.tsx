import { Link } from 'react-router-dom';
import { useAppStore } from '../store/useAppStore';
import { BrainCircuit, Activity, ShieldCheck, Play, ArrowRight, XOctagon } from 'lucide-react';
import { modules } from '../data/modules';
import { generateDailySession } from '../lib/learning/daily';

export function Home() {
  const state = useAppStore();
  const { reviewQueue, completedScenarios } = state;
  
  const now = new Date();
  const dueReviews = reviewQueue.filter(r => new Date(r.nextReviewDate) <= now).length;
  // Let's count a module as active if the user has completed at least one scenario in it, or has competency
  const activeModules = modules.filter(m => 
    completedScenarios.some(id => id.startsWith(m.id)) || 
    (state.competencies[m.id] && Object.values(state.competencies[m.id]).some(val => val > 0))
  );

  const session = generateDailySession(state as any); // Type assertion if needed
  const firstTask = session.tasks[0];

  let targetUrl = '/modules';
  let taskTitle = 'Explore Modules';
  let taskDescription = 'Start your training journey by exploring the available product modules.';
  let buttonText = 'Browse Products';

  if (firstTask) {
    if (firstTask.type === 'review') {
      targetUrl = '/review';
      taskTitle = 'Spaced Repetition Review';
      taskDescription = 'You have concepts due for review. Strengthen your retention.';
      buttonText = 'Start Review';
    } else if (firstTask.type === 'mistake_repair') {
      targetUrl = '/mistakes';
      taskTitle = 'Mistake Repair';
      taskDescription = 'You have recent mistakes that need repair. Let\'s fix them.';
      buttonText = 'Repair Mistakes';
    } else if (firstTask.type === 'practical_activity') {
      targetUrl = `/scenarios/${firstTask.referenceId}`;
      taskTitle = 'Scenario Drill';
      taskDescription = 'Apply your knowledge in a practical scenario.';
      buttonText = 'Start Drill';
    } else if (firstTask.type === 'product_selection') {
      targetUrl = '/shift';
      taskTitle = 'Shift Simulator';
      taskDescription = 'Test your triage skills across the product stack.';
      buttonText = 'Enter Simulator';
    }
  }

  return (
    <div className="space-y-8 animate-fade-in pb-12">
      <header>
        <h1 className="text-3xl font-bold text-textMain tracking-tight">
          Good {now.getHours() < 12 ? 'morning' : now.getHours() < 18 ? 'afternoon' : 'evening'}, Josh.
        </h1>
      </header>
      
      <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
        
        {/* Today's Training - Primary Action */}
        <div className="md:col-span-8 card border-l-4 border-l-primary flex flex-col justify-between bg-gradient-to-r from-slate-50 to-white dark:from-slate-900 dark:to-slate-800">
          <div className="p-2">
            <h2 className="text-sm font-semibold text-textMuted uppercase tracking-wider mb-2">Today's Training</h2>
            <h3 className="text-2xl font-bold mb-2">{taskTitle}</h3>
            <p className="text-textMuted mb-6 max-w-lg">
              {taskDescription}
            </p>
            
            <Link to={targetUrl} className="btn btn-primary inline-flex gap-2">
              <Play size={18} />
              {buttonText}
            </Link>
          </div>
        </div>

        {/* Due for Review */}
        <div className="md:col-span-4 card flex flex-col justify-between hover:border-blue-300 transition-colors">
          <div>
            <div className="flex items-center gap-3 mb-2">
              <div className="p-2 bg-blue-100 dark:bg-blue-900 text-blue-700 dark:text-blue-300 rounded-lg">
                <BrainCircuit size={20} />
              </div>
              <h2 className="font-semibold">Due for Review</h2>
            </div>
            <div className="my-4">
              <span className="text-4xl font-bold text-textMain">{dueReviews}</span>
              <span className="text-textMuted ml-2">concepts</span>
            </div>
          </div>
          <Link to="/review" className={`btn w-full text-sm ${dueReviews > 0 ? 'btn-outline border-blue-200 text-blue-700' : 'btn-secondary'}`}>
            {dueReviews > 0 ? 'Start Review' : 'Practice Anyway'}
          </Link>
        </div>

        {/* Start a Shift */}
        <div className="md:col-span-4 card hover:border-orange-300 transition-colors">
          <div className="flex items-center gap-3 mb-3">
            <div className="p-2 bg-orange-100 dark:bg-orange-900 text-orange-700 dark:text-orange-300 rounded-lg">
              <Activity size={20} />
            </div>
            <h2 className="font-semibold">Start a Shift</h2>
          </div>
          <p className="text-sm text-textMuted mb-4">
            Test your triage skills across the entire product stack in a simulated environment.
          </p>
          <Link to="/shift" className="text-orange-600 dark:text-orange-400 text-sm font-semibold flex items-center gap-1 hover:underline">
            Enter Simulator <ArrowRight size={14} />
          </Link>
        </div>

        {/* Recent Mistakes */}
        <div className="md:col-span-4 card hover:border-red-300 transition-colors">
          <div className="flex items-center gap-3 mb-3">
            <div className="p-2 bg-red-100 dark:bg-red-900 text-red-700 dark:text-red-300 rounded-lg">
              <XOctagon size={20} />
            </div>
            <h2 className="font-semibold">Recent Mistakes</h2>
          </div>
          <p className="text-sm text-textMuted mb-4">
            Review decisions that led to incorrect outcomes in recent scenarios.
          </p>
          <Link to="/mistakes" className="text-red-600 dark:text-red-400 text-sm font-semibold flex items-center gap-1 hover:underline">
            View Mistake Bank <ArrowRight size={14} />
          </Link>
        </div>

        {/* Weak Spots */}
        <div className="md:col-span-4 card">
          <h2 className="font-semibold mb-3">Weak Spots</h2>
          <div className="text-sm text-textMuted flex items-center justify-center h-20 border border-dashed border-border rounded-lg bg-slate-50 dark:bg-slate-800">
            Not enough data yet. Complete more scenarios.
          </div>
        </div>

      </div>

      <section className="pt-4 border-t border-border mt-8">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-bold flex items-center gap-2">
            <ShieldCheck className="text-green-600" />
            Product Readiness
          </h2>
          <Link to="/modules" className="text-sm font-medium text-primary hover:underline">View All Products</Link>
        </div>
        
        {activeModules.length === 0 ? (
          <div className="bg-slate-50 dark:bg-slate-800 border border-border border-dashed rounded-xl p-8 text-center">
            <p className="text-textMuted mb-4">You haven't started any product modules yet.</p>
            <Link to="/modules" className="btn btn-primary">Browse Products</Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {activeModules.map(m => (
              <Link to={`/modules/${m.id}`} key={m.id} className="card hover:border-primary transition-colors flex items-center gap-4 p-4">
                <div className={`w-12 h-12 rounded-lg ${m.color} text-white flex items-center justify-center font-bold text-xl`}>
                  {m.name.charAt(0)}
                </div>
                <div className="flex-1">
                  <h3 className="font-semibold">{m.name}</h3>
                  <div className="w-full bg-slate-200 dark:bg-slate-700 h-2 rounded-full mt-2 overflow-hidden">
                    <div 
                      className={`h-full ${m.color}`} 
                      style={{ width: `${Math.min(100, (state.competencies[m.id]?.decisionMaking || 0))}%` }}
                    />
                  </div>
                </div>
              </Link>
            ))}
          </div>
        )}
      </section>
    </div>
  );
}
