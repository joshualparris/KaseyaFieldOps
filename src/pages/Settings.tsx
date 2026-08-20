import { useAppStore } from '../store/useAppStore';
import { Settings as SettingsIcon, AlertTriangle } from 'lucide-react';
import { useState } from 'react';

export function Settings() {
  const { resetProgress, schemaVersion } = useAppStore();
  const [showConfirm, setShowConfirm] = useState(false);

  const handleReset = () => {
    resetProgress();
    setShowConfirm(false);
  };

  return (
    <div className="max-w-3xl mx-auto py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-textMain flex items-center gap-3">
          <SettingsIcon className="text-slate-500" size={32} />
          Settings
        </h1>
        <p className="text-textMuted mt-2">Manage your app preferences and data.</p>
      </div>

      <div className="bg-white border border-border rounded-xl shadow-sm overflow-hidden mb-8">
        <div className="p-6 border-b border-border">
          <h2 className="text-lg font-bold text-textMain mb-4">Application Data</h2>
          <div className="grid grid-cols-2 gap-4 text-sm">
            <div>
              <span className="text-textMuted block mb-1">Storage Schema Version</span>
              <span className="font-mono font-medium bg-slate-100 px-2 py-1 rounded">v{schemaVersion}</span>
            </div>
          </div>
        </div>

        <div className="p-6 bg-red-50/50">
          <h2 className="text-lg font-bold text-danger mb-2 flex items-center gap-2">
            <AlertTriangle size={20} /> Danger Zone
          </h2>
          <p className="text-sm text-textMuted mb-4">
            Resetting your progress will delete all XP, completed scenarios, review history, and mastery tracking. This action cannot be undone.
          </p>
          
          {showConfirm ? (
            <div className="flex items-center gap-3 bg-red-100 p-4 rounded-lg border border-red-200">
              <span className="text-sm font-semibold text-red-800">Are you absolutely sure?</span>
              <button onClick={handleReset} className="btn bg-danger text-white hover:bg-red-700 text-sm px-4">
                Yes, Reset Everything
              </button>
              <button onClick={() => setShowConfirm(false)} className="btn btn-secondary text-sm px-4">
                Cancel
              </button>
            </div>
          ) : (
            <button onClick={() => setShowConfirm(true)} className="btn border border-danger text-danger hover:bg-danger hover:text-white transition-colors">
              Reset All Progress
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
