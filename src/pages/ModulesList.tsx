import { Link } from 'react-router-dom';
import { modules } from '../data/modules';
import { useAppStore } from '../store/useAppStore';
import * as Icons from 'lucide-react';

export function ModulesList() {
  const { moduleProgress } = useAppStore();

  return (
    <div className="space-y-6 animate-fade-in">
      <div>
        <h1 className="text-3xl font-bold">Product Modules</h1>
        <p className="text-textMuted mt-2">Master the stack. Work through orientation and field scenarios for each product.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {modules.sort((a, b) => a.order - b.order).map(m => {
          const progress = moduleProgress[m.id] || 0;
          // @ts-ignore
          const IconComponent = Icons[m.iconName] || Icons.Box;

          return (
            <Link 
              key={m.id} 
              to={`/modules/${m.id}`}
              className="card hover:border-primary transition-all flex flex-col group cursor-pointer"
            >
              <div className="flex items-start justify-between mb-4">
                <div className={`p-3 rounded-xl ${m.color} text-white`}>
                  <IconComponent size={24} />
                </div>
                {progress > 0 && (
                  <span className="text-xs font-semibold bg-slate-100 text-slate-600 px-2 py-1 rounded-full">
                    {progress}% Mastery
                  </span>
                )}
              </div>
              
              <h2 className="text-xl font-bold group-hover:text-primary transition-colors">{m.name}</h2>
              <p className="text-sm text-textMuted mt-2 mb-6 flex-1">{m.description}</p>
              
              <div className="w-full bg-slate-100 h-1.5 rounded-full overflow-hidden">
                <div 
                  className={`h-full ${m.color} transition-all duration-1000`} 
                  style={{ width: `${progress}%` }} 
                />
              </div>
            </Link>
          );
        })}
      </div>
    </div>
  );
}
