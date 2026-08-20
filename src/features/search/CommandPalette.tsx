import { useEffect, useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { Search, X, Layers, Navigation } from 'lucide-react';
import { modules } from '../../data/modules';

const SHORTCUTS = [
  { id: 'home', name: 'Home', path: '/', description: 'Go to the training dashboard' },
  { id: 'map', name: 'Product Map', path: '/product-map', description: 'View the product relationship map' },
  { id: 'ref', name: 'Quick Reference', path: '/quick-reference', description: 'Product comparisons and decision guides' },
];

export function CommandPalette() {
  const [isOpen, setIsOpen] = useState(false);
  const [query, setQuery] = useState('');
  const [selectedIndex, setSelectedIndex] = useState(0);
  const navigate = useNavigate();
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.ctrlKey || e.metaKey) && e.key === 'k') {
        e.preventDefault();
        setIsOpen((prev) => !prev);
      }
      if (e.key === 'Escape' && isOpen) {
        setIsOpen(false);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen]);

  useEffect(() => {
    if (isOpen) {
      setTimeout(() => inputRef.current?.focus(), 10);
      setQuery('');
      setSelectedIndex(0);
    }
  }, [isOpen]);

  const filteredModules = modules.filter(m => 
    m.name.toLowerCase().includes(query.toLowerCase()) ||
    m.description.toLowerCase().includes(query.toLowerCase())
  );

  const filteredShortcuts = SHORTCUTS.filter(s =>
    s.name.toLowerCase().includes(query.toLowerCase()) ||
    s.description.toLowerCase().includes(query.toLowerCase())
  );

  const combinedResults = [
    ...(query.length > 0 ? filteredShortcuts.map(s => ({ ...s, type: 'shortcut' })) : []),
    ...(query.length > 0 ? filteredModules.map(m => ({ ...m, type: 'module', path: `/modules/${m.id}` })) : [])
  ];

  const handleSelect = (path: string) => {
    navigate(path);
    setIsOpen(false);
    setQuery('');
  };

  const handleInputKeyDown = (e: React.KeyboardEvent) => {
    if (combinedResults.length === 0) return;
    
    if (e.key === 'ArrowDown') {
      e.preventDefault();
      setSelectedIndex((prev) => (prev + 1) % combinedResults.length);
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      setSelectedIndex((prev) => (prev - 1 + combinedResults.length) % combinedResults.length);
    } else if (e.key === 'Enter') {
      e.preventDefault();
      handleSelect(combinedResults[selectedIndex].path);
    }
  };

  useEffect(() => {
    setSelectedIndex(0);
  }, [query]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-start justify-center pt-16 sm:pt-24 bg-black/50 backdrop-blur-sm p-4" role="dialog" aria-modal="true" aria-label="Command Palette">
      <div className="w-full max-w-xl bg-surface rounded-xl shadow-2xl border border-border overflow-hidden flex flex-col" role="document">
        <div className="flex items-center px-4 py-3 border-b border-border">
          <Search className="text-textMuted mr-3" size={20} aria-hidden="true" />
          <input
            ref={inputRef}
            type="text"
            className="flex-1 bg-transparent border-none outline-none text-textMain placeholder-textMuted text-lg"
            placeholder="Search products, concepts, or shortcuts..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            onKeyDown={handleInputKeyDown}
            autoFocus
            aria-label="Search command palette"
            aria-expanded={combinedResults.length > 0}
            aria-controls="command-palette-results"
            aria-activedescendant={combinedResults.length > 0 ? `item-${selectedIndex}` : undefined}
          />
          <button onClick={() => setIsOpen(false)} className="text-textMuted hover:text-textMain p-1 rounded focus:ring-2 focus:ring-primary focus:outline-none" aria-label="Close command palette">
            <X size={20} />
          </button>
        </div>
        
        <div className="max-h-96 overflow-y-auto p-2" id="command-palette-results" role="listbox">
          {query.length > 0 && (
            <div className="mb-4">
              {combinedResults.length > 0 ? (
                combinedResults.map((item, idx) => (
                  <button
                    key={item.id}
                    id={`item-${idx}`}
                    role="option"
                    aria-selected={selectedIndex === idx}
                    onClick={() => handleSelect(item.path)}
                    className={`w-full text-left px-3 py-2 rounded-md flex items-center gap-3 transition-colors ${
                      selectedIndex === idx ? 'bg-slate-200 dark:bg-slate-700' : 'hover:bg-slate-100 dark:hover:bg-slate-800'
                    }`}
                    onMouseMove={() => setSelectedIndex(idx)}
                  >
                    {item.type === 'shortcut' ? (
                      <Navigation size={18} className="text-blue-500 shrink-0" aria-hidden="true" />
                    ) : (
                      <Layers size={18} className="text-primary shrink-0" aria-hidden="true" />
                    )}
                    <div className="overflow-hidden">
                      <div className="font-medium text-textMain truncate">{item.name}</div>
                      <div className="text-xs text-textMuted truncate">{item.description}</div>
                    </div>
                  </button>
                ))
              ) : (
                <div className="px-3 py-2 text-sm text-textMuted">No matches found.</div>
              )}
            </div>
          )}
          
          {query.length === 0 && (
            <div className="py-8 text-center text-textMuted flex flex-col items-center">
              <Search size={32} className="mb-2 opacity-20" aria-hidden="true" />
              <p>Type to search Kaseya stack, scenarios, or reference.</p>
              <div className="mt-4 flex gap-2 flex-wrap justify-center px-4">
                <span className="text-xs bg-slate-100 dark:bg-slate-800 px-2 py-1 rounded border border-slate-200 dark:border-slate-700">Product Map</span>
                <span className="text-xs bg-slate-100 dark:bg-slate-800 px-2 py-1 rounded border border-slate-200 dark:border-slate-700">INKY</span>
                <span className="text-xs bg-slate-100 dark:bg-slate-800 px-2 py-1 rounded border border-slate-200 dark:border-slate-700">Datto SaaS</span>
              </div>
            </div>
          )}
        </div>
        <div className="bg-slate-50 dark:bg-slate-900 border-t border-border px-4 py-2 text-xs text-textMuted flex justify-between">
          <span>Search Field Ops</span>
          <span className="flex gap-4">
             <span className="flex items-center gap-1"><kbd className="bg-slate-200 dark:bg-slate-800 px-1 rounded border border-slate-300 dark:border-slate-700">↑↓</kbd> to navigate</span>
             <span className="flex items-center gap-1"><kbd className="bg-slate-200 dark:bg-slate-800 px-1 rounded border border-slate-300 dark:border-slate-700">enter</kbd> to select</span>
             <span className="flex items-center gap-1"><kbd className="bg-slate-200 dark:bg-slate-800 px-1 rounded border border-slate-300 dark:border-slate-700">esc</kbd> to close</span>
          </span>
        </div>
      </div>
    </div>
  );
}
