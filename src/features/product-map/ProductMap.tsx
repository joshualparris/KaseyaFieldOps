import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Map as MapIcon, Shield, Search, Wrench, HeartPulse, ShieldCheck } from 'lucide-react';
import { modules } from '../../data/modules';

const DOMAINS = [
  { id: 'manage', name: 'Manage', icon: Wrench, description: 'Deploy, configure, and maintain endpoints and networks.' },
  { id: 'prevent', name: 'Prevent', icon: Shield, description: 'Prevent threats from executing, train users, and block malicious access.' },
  { id: 'respond', name: 'Respond', icon: HeartPulse, description: 'Take action to stop an active attack and secure the environment.' },
  { id: 'recover', name: 'Recover', icon: HeartPulse, description: 'Restore data and operations after a disruption.' },
  { id: 'human', name: 'Human Security', icon: ShieldCheck, description: 'Train users and protect credentials.' },
];

const MAPPINGS: Record<string, string[]> = {
  'manage': ['datto-rmm', 'kaseya-365'],
  'prevent': ['datto-edr', 'inky', 'bullphish-id', 'darkweb-id'],
  'respond': ['datto-edr', 'datto-rmm'],
  'recover': ['datto-backup', 'datto-azure-backup', 'datto-file-protection', 'datto-saas-protection'],
  'human': ['inky', 'bullphish-id', 'darkweb-id'],
};

export function ProductMap() {
  const [activeDomain, setActiveDomain] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedFilter, setSelectedFilter] = useState<string | null>(null);

  const filteredDomains = DOMAINS.filter(domain => {
    // Filter by selected category pill
    if (selectedFilter && domain.id !== selectedFilter) return false;
    
    // Filter by search query (domain name, description, or matching product name)
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      const domainMatches = domain.name.toLowerCase().includes(query) || domain.description.toLowerCase().includes(query);
      const productMatches = (MAPPINGS[domain.id] || []).some(id => {
        const prod = modules.find(m => m.id === id);
        return prod?.name.toLowerCase().includes(query);
      });
      if (!domainMatches && !productMatches) return false;
    }
    
    return true;
  });

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
      
      {/* Search and Filters */}
      <div className="flex flex-col sm:flex-row gap-4 mb-6">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-textMuted" size={18} aria-hidden="true" />
          <input
            type="text"
            placeholder="Search products or categories..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-4 py-2 bg-surface border border-border rounded-lg text-textMain focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
            aria-label="Search products or categories"
          />
        </div>
        <div className="flex flex-wrap gap-2">
          <button
            onClick={() => setSelectedFilter(null)}
            className={`px-3 py-1.5 rounded-full text-sm font-medium transition-colors ${!selectedFilter ? 'bg-primary text-white' : 'bg-slate-100 dark:bg-slate-800 text-textMuted hover:text-textMain'}`}
            aria-pressed={!selectedFilter}
          >
            All
          </button>
          {DOMAINS.map(d => (
            <button
              key={`filter-${d.id}`}
              onClick={() => setSelectedFilter(d.id)}
              className={`px-3 py-1.5 rounded-full text-sm font-medium transition-colors ${selectedFilter === d.id ? 'bg-primary text-white' : 'bg-slate-100 dark:bg-slate-800 text-textMuted hover:text-textMain'}`}
              aria-pressed={selectedFilter === d.id}
            >
              {d.name}
            </button>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredDomains.map(domain => {
          const Icon = domain.icon;
          const isActive = activeDomain === domain.id;
          const domainModules = MAPPINGS[domain.id]?.map(id => modules.find(m => m.id === id)).filter(Boolean) || [];

          // Highlight logic inside card for search
          const filteredModules = searchQuery 
            ? domainModules.filter(m => m?.name.toLowerCase().includes(searchQuery.toLowerCase()))
            : domainModules;

          return (
            <div 
              key={domain.id} 
              className={`card transition-all cursor-pointer ${isActive ? 'ring-2 ring-primary shadow-lg' : 'hover:border-slate-300 dark:hover:border-slate-600'}`}
              onClick={() => setActiveDomain(isActive ? null : domain.id)}
              onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); setActiveDomain(isActive ? null : domain.id); } }}
              tabIndex={0}
              role="button"
              aria-expanded={isActive}
            >
              <div className="flex items-center gap-3 mb-3">
                <div className={`p-2 rounded-lg ${isActive ? 'bg-primary text-white' : 'bg-slate-100 dark:bg-slate-800 text-textMain'}`}>
                  <Icon size={24} aria-hidden="true" />
                </div>
                <h2 className="text-xl font-bold">{domain.name}</h2>
              </div>
              <p className="text-sm text-textMuted mb-4">{domain.description}</p>
              
              <div className="space-y-2 mt-4 pt-4 border-t border-border">
                {filteredModules.map(m => m && (
                  <Link 
                    key={m.id} 
                    to={`/modules/${m.id}`}
                    className="flex items-center gap-2 p-2 rounded hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors focus:ring-2 focus:ring-primary focus:outline-none"
                    onClick={(e) => e.stopPropagation()}
                    aria-label={`View ${m.name} module details`}
                  >
                    <div className={`w-3 h-3 rounded-full ${m.color}`} aria-hidden="true" />
                    <span className="font-medium text-sm text-textMain">{m.name}</span>
                  </Link>
                ))}
                {searchQuery && filteredModules.length === 0 && (
                   <div className="text-sm text-textMuted italic p-2">No products match search</div>
                )}
              </div>
            </div>
          );
        })}
        {filteredDomains.length === 0 && (
          <div className="col-span-full py-12 text-center text-textMuted">
            <p>No domains or products match your search criteria.</p>
          </div>
        )}
      </div>
    </div>
  );
}
