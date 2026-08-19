import { Link } from 'react-router-dom';
import { useAppStore } from '../store/useAppStore';
import { PlayCircle, BrainCircuit, Activity, ShieldCheck } from 'lucide-react';
import { modules } from '../data/modules';

export function Home() {
  const { xp, reviewQueue, moduleProgress } = useAppStore();
  
  const now = new Date();
  const dueReviews = reviewQueue.filter(r => new Date(r.nextReviewDate) <= now).length;
  
  // Calculate field rank (simplified)
  const rank = xp < 500 ? 'Trainee' : xp < 2000 ? 'Technician' : 'Senior Tech';
  
  // Get active modules
  const activeModules = modules.filter(m => moduleProgress[m.id] > 0);

  return (
    <div className="space-y-8 animate-fade-in">
      <header>
        <h1 className="text-3xl font-bold text-textMain">Good morning, Josh.</h1>
        <p className="text-textMuted mt-1">Field Technician Rank: <span className="font-semibold text-primary">{rank}</span> • {xp} XP</p>
      </header>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        
        {/* Daily Review Card */}
        <div className="card border-l-4 border-l-primary flex flex-col justify-between">
          <div>
            <div className="flex items-center gap-3 mb-2">
              <div className="p-2 bg-blue-100 text-blue-700 rounded-lg">
                <BrainCircuit size={24} />
              </div>
              <h2 className="text-xl font-semibold">Today's Review</h2>
            </div>
            <p className="text-textMuted mb-6">
              {dueReviews > 0 
                ? `You have ${dueReviews} concepts due for spaced review.`
                : 'You are all caught up for today!'}
            </p>
          </div>
          
          <Link 
            to="/review" 
            className={`btn w-full ${dueReviews > 0 ? 'btn-primary' : 'btn-secondary'}`}
          >
            {dueReviews > 0 ? 'Start Review Session' : 'Practice Anyway'}
          </Link>
        </div>

        {/* Start Shift Card */}
        <div className="card border-l-4 border-l-orange-500 flex flex-col justify-between">
          <div>
            <div className="flex items-center gap-3 mb-2">
              <div className="p-2 bg-orange-100 text-orange-700 rounded-lg">
                <Activity size={24} />
              </div>
              <h2 className="text-xl font-semibold">Field Shift</h2>
            </div>
            <p className="text-textMuted mb-6">
              Jump into a mixed scenario shift. Test your triage skills across the entire product stack.
            </p>
          </div>
          
          <Link to="/shift" className="btn btn-outline w-full gap-2">
            <PlayCircle size={18} />
            Start a Shift
          </Link>
        </div>
        
      </div>

      <section>
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-semibold flex items-center gap-2">
            <ShieldCheck className="text-green-600" />
            Field Readiness
          </h2>
          <Link to="/modules" className="text-sm font-medium text-primary hover:underline">View All</Link>
        </div>
        
        {activeModules.length === 0 ? (
          <div className="bg-slate-50 border border-border border-dashed rounded-xl p-8 text-center">
            <p className="text-textMuted mb-4">You haven't started any product modules yet.</p>
            <Link to="/modules" className="btn btn-primary">Browse Training Modules</Link>
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
                  <div className="w-full bg-slate-200 h-2 rounded-full mt-2">
                    <div 
                      className={`h-full rounded-full ${m.color}`} 
                      style={{ width: `${moduleProgress[m.id]}%` }}
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
