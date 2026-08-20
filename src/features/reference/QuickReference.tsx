import { useState } from 'react';
import { Book, Search, Command, HelpCircle, ArrowRight, XOctagon } from 'lucide-react';
import { modules } from '../../data/modules';

type DecisionGuide = {
  id: string;
  title: string;
  scenario: string;
  options: {
    productName: string;
    isCorrect: boolean;
    reason: string;
    mistakeReason?: string;
  }[];
};

/**
 * DECISION_GUIDES
 * 
 * This array defines the "confusable pairs" decision-layer content. 
 * MSP technicians frequently confuse products that operate in similar domains 
 * (e.g., three different backup products, or two different email security tools).
 * 
 * Future Contributors: 
 * When adding new guides, ensure you highlight *why* the wrong product is often 
 * mistakenly chosen (`mistakeReason`). This provides targeted un-learning for 
 * common misconceptions rather than just stating what the correct product does.
 */

const DECISION_GUIDES: DecisionGuide[] = [
  {
    id: 'backup-confusion',
    title: 'The Backup Layers',
    scenario: 'A client deleted a folder, or a server died. Which backup product do you use?',
    options: [
      {
        productName: 'Datto Backup (BCDR)',
        isCorrect: true,
        reason: 'Use for entire servers/VMs. Restores full environments, images, or handles large-scale disaster recovery.'
      },
      {
        productName: 'Datto File Protection',
        isCorrect: false,
        reason: 'Use for workstation files (laptops/desktops) that are NOT in OneDrive.',
        mistakeReason: 'Mistake: Trying to use File Protection to restore a whole server, or deploying it when the client already uses OneDrive.'
      },
      {
        productName: 'Datto SaaS Protection',
        isCorrect: false,
        reason: 'Use for Microsoft 365 / Google Workspace data (Exchange, OneDrive, SharePoint).',
        mistakeReason: 'Mistake: Assuming BCDR backs up cloud emails, or thinking File Protection covers OneDrive.'
      }
    ]
  },
  {
    id: 'human-security',
    title: 'Human Security: Monitor vs Train',
    scenario: 'You want to improve a client\'s human security posture against phishing and credential theft.',
    options: [
      {
        productName: 'BullPhish ID',
        isCorrect: true,
        reason: 'Use to proactively TRAIN users and SIMULATE phishing attacks. It tests if they will click.'
      },
      {
        productName: 'DarkWeb ID',
        isCorrect: false,
        reason: 'Use to MONITOR the dark web for already compromised credentials.',
        mistakeReason: 'Mistake: Selling DarkWeb ID thinking it prevents phishing. It only alerts you AFTER a credential has been stolen.'
      }
    ]
  },
  {
    id: 'email-issues',
    title: 'Email Security vs Email Backup',
    scenario: 'A client reports an "email issue" - either a missing email or a suspicious one.',
    options: [
      {
        productName: 'INKY',
        isCorrect: true,
        reason: 'Use for active email FILTERING. Catches phishing, spam, and malicious links BEFORE or AS they arrive.'
      },
      {
        productName: 'Datto SaaS Protection',
        isCorrect: false,
        reason: 'Use to RESTORE an email that was accidentally deleted or maliciously purged.',
        mistakeReason: 'Mistake: Thinking SaaS Protection stops phishing, or trying to use INKY to retrieve an email a user deleted yesterday.'
      }
    ]
  },
  {
    id: 'm365-backup',
    title: 'Cloud Backup: Config vs Data',
    scenario: 'A client needs to back up their Microsoft cloud environment. Which product covers what?',
    options: [
      {
        productName: 'Datto SaaS Protection',
        isCorrect: true,
        reason: 'Use to backup user DATA: Emails (Exchange), Files (OneDrive/SharePoint), and Teams messages.'
      },
      {
        productName: 'Datto Backup for Entra ID',
        isCorrect: false,
        reason: 'Use to backup TENANT CONFIGURATION: Users, Groups, Roles, Conditional Access Policies.',
        mistakeReason: 'Mistake: Thinking SaaS Protection backs up conditional access policies, or thinking Entra ID backup covers OneDrive files. You often need both.'
      }
    ]
  }
];

export function QuickReference() {
  const [query, setQuery] = useState('');
  const [expandedGuide, setExpandedGuide] = useState<string | null>(null);

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
        <Search className="absolute left-3 top-3 text-textMuted" size={20} aria-hidden="true" />
        <input 
          type="text" 
          placeholder="Search references, terms, commands..." 
          className="w-full bg-surface border border-border rounded-lg pl-10 pr-4 py-3 outline-none focus:ring-2 focus:ring-primary"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          aria-label="Search quick reference"
        />
        <div className="absolute right-3 top-3 text-xs text-textMuted flex items-center gap-1 border border-border px-1.5 py-0.5 rounded bg-slate-50 dark:bg-slate-800" aria-hidden="true">
          <Command size={12} /> K
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-6">
          <h2 className="text-xl font-bold border-b border-border pb-2 flex items-center gap-2">
            <HelpCircle size={20} className="text-orange-500" aria-hidden="true" />
            Which Tool Do I Use?
          </h2>
          <p className="text-sm text-textMuted mb-4">
            MSP techs frequently confuse adjacent products. Use these guides to clarify boundaries.
          </p>
          <div className="space-y-4">
            {DECISION_GUIDES.map(guide => {
              const isExpanded = expandedGuide === guide.id;
              return (
                <div 
                  key={guide.id} 
                  className={`card p-4 transition-all ${isExpanded ? 'ring-2 ring-primary border-transparent' : 'hover:border-slate-300 dark:hover:border-slate-600 cursor-pointer'}`} 
                  onClick={() => !isExpanded && setExpandedGuide(guide.id)}
                  role="button"
                  tabIndex={isExpanded ? -1 : 0}
                  aria-expanded={isExpanded}
                  onKeyDown={(e) => {
                    if (!isExpanded && (e.key === 'Enter' || e.key === ' ')) {
                      e.preventDefault();
                      setExpandedGuide(guide.id);
                    }
                  }}
                >
                  <div className="flex justify-between items-start mb-2">
                    <h3 className="font-bold text-lg">{guide.title}</h3>
                    {isExpanded && (
                      <button 
                        onClick={(e) => { e.stopPropagation(); setExpandedGuide(null); }} 
                        className="text-xs text-textMuted hover:text-textMain px-2 py-1 rounded focus:ring-2 focus:ring-primary focus:outline-none"
                        aria-label={`Close ${guide.title} guide`}
                      >
                        Close
                      </button>
                    )}
                  </div>
                  <p className="text-sm text-textMain font-medium mb-3">{guide.scenario}</p>
                  
                  {isExpanded ? (
                    <div className="space-y-3 mt-4 pt-4 border-t border-border">
                      {guide.options.map((opt, i) => (
                        <div key={i} className="bg-slate-50 dark:bg-slate-800 p-3 rounded-lg border border-border">
                          <div className="font-semibold text-primary mb-1">{opt.productName}</div>
                          <p className="text-sm text-textMuted mb-2">{opt.reason}</p>
                          {opt.mistakeReason && (
                            <div className="flex items-start gap-2 mt-2 pt-2 border-t border-border/50 text-xs text-red-600 dark:text-red-400">
                              <XOctagon size={14} className="shrink-0 mt-0.5" aria-hidden="true" />
                              <span>{opt.mistakeReason}</span>
                            </div>
                          )}
                        </div>
                      ))}
                    </div>
                  ) : (
                    <div className="text-xs text-textMuted flex gap-2 items-center text-primary">
                      View decision guide <ArrowRight size={14} aria-hidden="true" />
                    </div>
                  )}
                </div>
              )
            })}
          </div>

          <h2 className="text-xl font-bold border-b border-border pb-2 mt-8">Product Summaries</h2>
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
