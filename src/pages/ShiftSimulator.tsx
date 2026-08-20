
import { scenarios as aggregatedScenarios } from '../data/scenarios';
import type { Scenario } from '../data/types';
import { PlayCircle, Clock, CheckCircle2, ArrowRight } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useAppStore } from '../store/useAppStore';

export function ShiftSimulator() {
  const navigate = useNavigate();
  const { completedScenarios, activeShift, startShift, endShift } = useAppStore();

  const shiftQueue = activeShift ? activeShift.ticketIds.map(id => aggregatedScenarios.find(s => s.id === id)).filter(Boolean) as Scenario[] : [];

  // Generate a random shift queue
  const generateShift = () => {
    // Pick 3 random scenarios, preferably ones not completed yet
    const available = [...aggregatedScenarios].sort(() => 0.5 - Math.random());
    const uncompleted = available.filter(s => !completedScenarios.includes(s.id));
    
    // Mix uncompleted and completed to make a queue of 3
    let selected = uncompleted.slice(0, 3);
    if (selected.length < 3) {
      const needed = 3 - selected.length;
      const completed = available.filter(s => completedScenarios.includes(s.id));
      selected = [...selected, ...completed.slice(0, needed)];
    }
    
    startShift(selected.map(s => s.id));
  };

  const handleEndShift = () => {
    endShift();
  };

  const handleStartTicket = (scenarioId: string) => {
    navigate(`/scenarios/${scenarioId}`);
  };

  return (
    <div className="max-w-4xl mx-auto py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-textMain flex items-center gap-3">
          <PlayCircle className="text-indigo-500" size={32} />
          Shift Simulator
        </h1>
        <p className="text-textMuted mt-2">
          Experience a simulated MSP helpdesk shift. Tickets will arrive in your queue requiring triage, investigation, and resolution across the Kaseya stack.
        </p>
      </div>

      {!activeShift ? (
        <div className="bg-surface border border-border rounded-xl p-12 text-center shadow-sm">
          <Clock size={64} className="mx-auto text-indigo-400 mb-6 opacity-80" />
          <h2 className="text-2xl font-bold text-textMain mb-4">Clock In For Your Shift</h2>
          <p className="text-textMuted max-w-lg mx-auto mb-8">
            When you clock in, you will be assigned a queue of 3 random support tickets. You must resolve them by navigating the scenario drills. 
          </p>
          <button 
            onClick={generateShift}
            className="btn bg-indigo-600 hover:bg-indigo-700 text-white px-8 py-3 text-lg rounded-full shadow-lg hover:shadow-xl transition-all"
          >
            Start Shift
          </button>
        </div>
      ) : (
        <div className="space-y-6">
          <div className="flex items-center justify-between mb-2">
            <h2 className="text-xl font-bold text-textMain">Active Ticket Queue</h2>
            <span className="bg-indigo-100 text-indigo-800 text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wider">
              {shiftQueue.filter(s => !activeShift?.resolvedTicketIds.includes(s.id)).length} Remaining
            </span>
          </div>
          
          <div className="grid gap-4">
            {shiftQueue.map((scenario, index) => {
              const isCompleted = activeShift?.resolvedTicketIds.includes(scenario.id) ?? false;
              
              return (
                <div 
                  key={scenario.id} 
                  className={`bg-white border rounded-xl p-6 flex items-center gap-6 transition-all ${
                    isCompleted ? 'border-success/50 bg-success/5 opacity-70' : 'border-border shadow-sm hover:shadow-md hover:border-indigo-300 cursor-pointer'
                  }`}
                  onClick={() => !isCompleted && handleStartTicket(scenario.id)}
                >
                  <div className="flex-shrink-0">
                    {isCompleted ? (
                      <CheckCircle2 size={32} className="text-success" />
                    ) : (
                      <div className="w-10 h-10 rounded-full bg-indigo-100 text-indigo-600 flex items-center justify-center font-bold">
                        #{index + 1}
                      </div>
                    )}
                  </div>
                  
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-1">
                      <span className="text-xs font-bold text-textMuted uppercase">{scenario.moduleId}</span>
                      {isCompleted && <span className="text-xs font-bold text-success uppercase">Resolved</span>}
                    </div>
                    <h3 className={`text-lg font-bold ${isCompleted ? 'text-textMuted line-through' : 'text-textMain'}`}>
                      {scenario.title}
                    </h3>
                    <p className={`text-sm mt-1 line-clamp-1 ${isCompleted ? 'text-textMuted' : 'text-textMuted'}`}>
                      {scenario.description}
                    </p>
                  </div>
                  
                  {!isCompleted && (
                    <div className="flex-shrink-0">
                      <button className="flex items-center gap-2 text-indigo-600 font-semibold hover:text-indigo-800 bg-indigo-50 px-4 py-2 rounded-lg transition-colors">
                        Work Ticket <ArrowRight size={16} />
                      </button>
                    </div>
                  )}
                </div>
              );
            })}
          </div>

          {shiftQueue.every(s => activeShift?.resolvedTicketIds.includes(s.id)) && (
            <div className="mt-8 bg-success/10 border border-success/30 rounded-xl p-8 text-center animate-fade-in">
              <CheckCircle2 size={48} className="mx-auto text-success mb-4" />
              <h3 className="text-2xl font-bold text-textMain mb-2">Shift Complete!</h3>
              <p className="text-textMuted mb-6">Excellent work. The queue is clear.</p>
              <button 
                onClick={handleEndShift}
                className="btn btn-primary"
              >
                End Shift
              </button>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
