import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Map as MapIcon, Shield, Search, Wrench, HeartPulse, ShieldCheck } from 'lucide-react';
import { modules } from '../../data/modules';

const DOMAINS = [
  { id: 'manage', name: 'Manage', icon: Wrench, description: 'Deploy, configure, and maintain endpoints and networks.' },
  { id: 'protect', name: 'Protect', icon: Shield, description: 'Prevent threats from executing or accessing data.' },
  { id: 'detect', name: 'Detect', icon: Search, description: 'Identify active threats, vulnerabilities, or anomalies.' },
  { id: 'respond', name: 'Respond', icon: HeartPulse, description: 'Take action to stop an active attack and secure the environment.' },
  { id: 'recover', name: 'Recover', icon: HeartPulse, description: 'Restore data and operations after a disruption.' },
  { id: 'human', name: 'Human Security', icon: ShieldCheck, description: 'Train users and protect credentials.' },
];

const MAPPINGS: Record<string, string[]> = {
  'manage': ['datto-rmm', 'kaseya-365'],
  'protect': ['datto-edr', 'inky', 'bullphish-id'],
  'detect': ['datto-edr', 'inky', 'darkweb-id'],
  'respond': ['datto-edr', 'datto-rmm'],
  'recover': ['datto-backup', 'datto-azure-backup', 'datto-file-protection', 'datto-saas-protection'],
  'human': ['inky', 'bullphish-id', 'darkweb-id'],
};

export function ProductMap() {
  const [activeDomain, setActiveDomain] = useState<string | null>(null);

  return (
    <div className="space-y-8 animate-fade-in pb-12">
      <header>
        <h1 className="text-3xl font-bold text-textMain flex items-center gap-3">
          <MapIcon className="text-primary" size={32} />
          Product Map
        </h1>
        <p className="text-textMuted mt-2 max-w-2xl">
          Understand how the Kaseya stack fits together conceptually. Products often span multiple areas depending on how they are used.
        </p>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {DOMAINS.map(domain => {
          const Icon = domain.icon;
          const isActive = activeDomain === domain.id;
          const domainModules = MAPPINGS[domain.id]?.map(id => modules.find(m => m.id === id)).filter(Boolean) || [];

          return (
            <div 
              key={domain.id} 
              className={`card transition-all cursor-pointer ${isActive ? 'ring-2 ring-primary shadow-lg' : 'hover:border-slate-300 dark:hover:border-slate-600'}`}
              onClick={() => setActiveDomain(isActive ? null : domain.id)}
            >
              <div className="flex items-center gap-3 mb-3">
                <div className={`p-2 rounded-lg ${isActive ? 'bg-primary text-white' : 'bg-slate-100 dark:bg-slate-800 text-textMain'}`}>
                  <Icon size={24} />
                </div>
                <h2 className="text-xl font-bold">{domain.name}</h2>
              </div>
              <p className="text-sm text-textMuted mb-4">{domain.description}</p>
              
              <div className="space-y-2 mt-4 pt-4 border-t border-border">
                {domainModules.map(m => m && (
                  <Link 
                    key={m.id} 
                    to={`/modules/${m.id}`}
                    className="flex items-center gap-2 p-2 rounded hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors"
                    onClick={(e) => e.stopPropagation()}
                  >
                    <div className={`w-3 h-3 rounded-full ${m.color}`} />
                    <span className="font-medium text-sm text-textMain">{m.name}</span>
                  </Link>
                ))}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
