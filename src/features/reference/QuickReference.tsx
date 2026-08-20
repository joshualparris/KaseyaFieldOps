import { useState } from 'react';
import { Book, Search, Command, GitCompare } from 'lucide-react';
import { modules } from '../../data/modules';

export function QuickReference() {
  const [query, setQuery] = useState('');
  
  const comparisons = [
    { id: 'rmm-vs-edr', title: 'Datto RMM vs Datto EDR', desc: 'Management vs Security.' },
    { id: 'edr-vs-av', title: 'EDR vs Traditional AV', desc: 'Behavioral vs Signature-based.' },
    { id: 'file-vs-backup', title: 'File Protection vs Datto Backup', desc: 'Workstation files vs Server imaging.' },
    { id: 'saas-vs-azure', title: 'SaaS Protection vs Azure Backup', desc: 'M365/Google vs Azure VM workloads.' },
    { id: 'inky-vs-bullphish', title: 'INKY vs BullPhish ID', desc: 'Active email filtering vs User training.' }
  ];

  const filteredModules = modules.filter(m => 
    m.name.toLowerCase().includes(query.toLowerCase()) || 
    (m.problemSolved && m.problemSolved.toLowerCase().includes(query.toLowerCase()))
  );

  return (
    <div className="space-y-8 animate-fade-in pb-12">
      <header>
        <h1 className="text-3xl font-bold text-textMain flex items-center gap-3">
          <Book className="text-primary" size={32} />
          Quick Reference
        </h1>
        <p className="text-textMuted mt-2 max-w-2xl">
          Fast lookup for terminology, comparisons, and workflows. Using this section does not impact your mastery score or spaced repetition schedule.
        </p>
      </header>

      <div className="relative mb-8">
        <Search className="absolute left-3 top-3 text-textMuted" size={20} />
        <input 
          type="text" 
          placeholder="Search references, terms, commands..." 
          className="w-full bg-surface border border-border rounded-lg pl-10 pr-4 py-3 outline-none focus:ring-2 focus:ring-primary"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />
        <div className="absolute right-3 top-3 text-xs text-textMuted flex items-center gap-1 border border-border px-1.5 py-0.5 rounded bg-slate-50 dark:bg-slate-800">
          <Command size={12} /> K
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-6">
          <h2 className="text-xl font-bold border-b border-border pb-2">Product Summaries</h2>
          <div className="space-y-4">
            {filteredModules.map(m => (
              <div key={m.id} className="card p-4">
                <div className="flex items-center gap-2 mb-2">
                  <div className={`w-3 h-3 rounded-full ${m.color}`} />
                  <h3 className="font-bold text-lg">{m.name}</h3>
                </div>
                <p className="text-sm text-textMain mb-2">{m.description}</p>
                <div className="text-xs text-textMuted">
                  <span className="font-semibold text-slate-500">Core Action: </span> 
                  {m.actualUseCases?.[0] || 'Pending workflow documentation.'}
                </div>
              </div>
            ))}
          </div>
        </div>
        
        <div className="space-y-6">
          <h2 className="text-xl font-bold border-b border-border pb-2 flex items-center gap-2">
            <GitCompare size={20} className="text-blue-500" />
            Direct Comparisons
          </h2>
          <div className="space-y-3">
            {comparisons.map(comp => (
              <div key={comp.id} className="card p-3 hover:border-primary cursor-pointer transition-colors">
                <h4 className="font-semibold text-sm">{comp.title}</h4>
                <p className="text-xs text-textMuted mt-1">{comp.desc}</p>
              </div>
            ))}
          </div>

          <div className="card bg-amber-50 dark:bg-amber-950/20 border-amber-200 dark:border-amber-900 mt-6">
            <h3 className="font-bold text-amber-800 dark:text-amber-500 text-sm mb-2">Need to practice?</h3>
            <p className="text-xs text-amber-700 dark:text-amber-400 mb-3">
              If you find yourself looking up the same concepts repeatedly, add them to your review queue.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
