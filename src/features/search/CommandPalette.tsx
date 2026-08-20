import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Search, X, Layers } from 'lucide-react';
import { modules } from '../../data/modules';

export function CommandPalette() {
  const [isOpen, setIsOpen] = useState(false);
  const [query, setQuery] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.ctrlKey || e.metaKey) && e.key === 'k') {
        e.preventDefault();
        setIsOpen((prev) => !prev);
      }
      if (e.key === 'Escape') {
        setIsOpen(false);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  if (!isOpen) return null;

  // Simple search logic over modules
  const filteredModules = modules.filter(m => 
    m.name.toLowerCase().includes(query.toLowerCase()) ||
    m.description.toLowerCase().includes(query.toLowerCase())
  );

  const handleSelect = (path: string) => {
    navigate(path);
    setIsOpen(false);
    setQuery('');
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-start justify-center pt-16 sm:pt-24 bg-black/50 backdrop-blur-sm p-4">
      <div className="w-full max-w-xl bg-surface rounded-xl shadow-2xl border border-border overflow-hidden flex flex-col">
        <div className="flex items-center px-4 py-3 border-b border-border">
          <Search className="text-textMuted mr-3" size={20} />
          <input
            type="text"
            className="flex-1 bg-transparent border-none outline-none text-textMain placeholder-textMuted text-lg"
            placeholder="Search products, concepts, reference..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            autoFocus
          />
          <button onClick={() => setIsOpen(false)} className="text-textMuted hover:text-textMain">
            <X size={20} />
          </button>
        </div>
        
        <div className="max-h-96 overflow-y-auto p-2">
          {query.length > 0 && (
            <div className="mb-4">
              <h3 className="text-xs font-semibold text-textMuted uppercase tracking-wider px-3 mb-2">Products</h3>
              {filteredModules.length > 0 ? (
                filteredModules.map(m => (
                  <button
                    key={m.id}
                    onClick={() => handleSelect(`/modules/${m.id}`)}
                    className="w-full text-left px-3 py-2 rounded-md hover:bg-slate-100 dark:hover:bg-slate-800 flex items-center gap-3"
                  >
                    <Layers size={18} className="text-primary" />
                    <div>
                      <div className="font-medium text-textMain">{m.name}</div>
                      <div className="text-xs text-textMuted truncate">{m.description}</div>
                    </div>
                  </button>
                ))
              ) : (
                <div className="px-3 py-2 text-sm text-textMuted">No products found.</div>
              )}
            </div>
          )}
          
          {query.length === 0 && (
            <div className="py-8 text-center text-textMuted flex flex-col items-center">
              <Search size={32} className="mb-2 opacity-20" />
              <p>Type to search Kaseya stack, scenarios, or reference.</p>
              <div className="mt-4 flex gap-2 flex-wrap justify-center px-4">
                <span className="text-xs bg-slate-100 dark:bg-slate-800 px-2 py-1 rounded">restore OneDrive</span>
                <span className="text-xs bg-slate-100 dark:bg-slate-800 px-2 py-1 rounded">offline endpoint</span>
                <span className="text-xs bg-slate-100 dark:bg-slate-800 px-2 py-1 rounded">suspicious email</span>
              </div>
            </div>
          )}
        </div>
        <div className="bg-slate-50 dark:bg-slate-900 border-t border-border px-4 py-2 text-xs text-textMuted flex justify-between">
          <span>Search Field Ops</span>
          <span className="flex gap-1">
             <kbd className="bg-slate-200 dark:bg-slate-800 px-1 rounded">esc</kbd> to close
          </span>
        </div>
      </div>
    </div>
  );
}
