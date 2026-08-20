import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Settings, Play, Flag, CheckCircle, XCircle, ArrowLeft, ArrowRight, Save, Clock } from 'lucide-react';
import { aggregatedModules } from '../data/products';
import { generateExamSession } from '../lib/learning/exam';
import type { ExamQuestion, ExamConfig } from '../lib/learning/exam';
import { useAppStore } from '../store/useAppStore';

function getReadinessScore(competency: any): number {
  if (!competency) return 0;
  const values = [
    competency.knowledge,
    competency.recognition,
    competency.investigation,
    competency.decisionMaking,
    competency.procedure,
    competency.documentation,
    competency.retention
  ];
  const sum = values.reduce((a, b) => a + (b || 0), 0);
  return Math.round(sum / values.length);
}

type UserAnswer = {
  questionId: string;
  selectedOptionId?: string; // For MC
  isCorrect?: boolean; // For flashcard self-assessment or derived from MC
};

export function FieldTestSimulator() {
  const navigate = useNavigate();
  const { addMistake, updateCompetency, competencies } = useAppStore();

  const [phase, setPhase] = useState<'setup' | 'exam' | 'review' | 'aar'>(() => 
    (sessionStorage.getItem('exam_phase') as any) || 'setup'
  );
  
  // Setup State
  const [config, setConfig] = useState<ExamConfig>(() => 
    JSON.parse(sessionStorage.getItem('exam_config') || 'null') || {
      moduleIds: aggregatedModules.map(m => m.id),
      questionCount: 10,
      isTimed: false,
      timeLimitMinutes: 15,
    }
  );

  // Exam State
  const [questions, setQuestions] = useState<ExamQuestion[]>(() => 
    JSON.parse(sessionStorage.getItem('exam_questions') || '[]')
  );
  const [currentIndex, setCurrentIndex] = useState(() => 
    Number(sessionStorage.getItem('exam_index') || 0)
  );
  const [answers, setAnswers] = useState<Record<string, UserAnswer>>(() => 
    JSON.parse(sessionStorage.getItem('exam_answers') || '{}')
  );
  const [flagged, setFlagged] = useState<Set<string>>(() => 
    new Set(JSON.parse(sessionStorage.getItem('exam_flagged') || '[]'))
  );
  const [timeLeft, setTimeLeft] = useState<number>(() => 
    Number(sessionStorage.getItem('exam_time') || 0)
  );

  const currentQ = questions[currentIndex];

  useEffect(() => {
    sessionStorage.setItem('exam_phase', phase);
    sessionStorage.setItem('exam_config', JSON.stringify(config));
    sessionStorage.setItem('exam_questions', JSON.stringify(questions));
    sessionStorage.setItem('exam_index', currentIndex.toString());
    sessionStorage.setItem('exam_answers', JSON.stringify(answers));
    sessionStorage.setItem('exam_flagged', JSON.stringify([...flagged]));
    sessionStorage.setItem('exam_time', timeLeft.toString());
  }, [phase, config, questions, currentIndex, answers, flagged, timeLeft]);

  useEffect(() => {
    let timer: number | undefined;
    if (phase === 'exam' && config.isTimed && timeLeft > 0) {
      timer = setInterval(() => {
        setTimeLeft(prev => {
          if (prev <= 1) {
            submitExam();
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    }
    return () => clearInterval(timer);
  }, [phase, config.isTimed, timeLeft]);

  const startExam = () => {
    if (config.moduleIds.length === 0) return;
    const sessionQuestions = generateExamSession(config);
    if (sessionQuestions.length === 0) return;
    
    setQuestions(sessionQuestions);
    setAnswers({});
    setFlagged(new Set());
    if (config.isTimed) {
      setTimeLeft((config.timeLimitMinutes || 15) * 60);
    }
    setCurrentIndex(0);
    setPhase('exam');
  };

  const submitExam = () => {
    // Process results into the learning engine
    questions.forEach(q => {
      const ans = answers[q.id];
      let isCorrect = false;
      let userAnswerText = 'Did not answer';
      let expectedText = q.correctAnswerText || 'Correct Option';

      if (q.type === 'multiple_choice' && ans?.selectedOptionId) {
        const selected = q.options?.find(o => o.id === ans.selectedOptionId);
        const correct = q.options?.find(o => o.isCorrect);
        if (selected?.isCorrect) isCorrect = true;
        userAnswerText = selected?.text || userAnswerText;
        expectedText = correct?.text || expectedText;
      } else if (q.type === 'flashcard') {
        isCorrect = !!ans?.isCorrect;
        userAnswerText = isCorrect ? 'Self-reported correct' : 'Self-reported incorrect';
      }

      if (isCorrect) {
        updateCompetency(q.moduleId, 'knowledge', 2);
        updateCompetency(q.moduleId, 'decisionMaking', 1);
      } else {
        // Log mistake
        addMistake({
          date: new Date().toISOString(),
          moduleId: q.moduleId,
          activityType: 'scenario', // Treat exam as scenario-like for mistakes
          userAnswer: userAnswerText,
          expectedReasoning: expectedText,
          explanation: q.type === 'multiple_choice' ? (q.options?.find(o => o.id === ans?.selectedOptionId)?.feedback || 'Incorrect selection') : 'Missed flashcard concept',
          confidenceBeforeAnswer: 'guessing',
          severity: 'medium',
        });
        updateCompetency(q.moduleId, 'knowledge', -1);
      }
    });

    setPhase('aar');
  };

  const toggleFlag = () => {
    const newFlagged = new Set(flagged);
    if (newFlagged.has(currentQ.id)) {
      newFlagged.delete(currentQ.id);
    } else {
      newFlagged.add(currentQ.id);
    }
    setFlagged(newFlagged);
  };

  const handleSelectOption = (optionId: string) => {
    setAnswers({
      ...answers,
      [currentQ.id]: { questionId: currentQ.id, selectedOptionId: optionId }
    });
  };

  const handleFlashcardSelfAssess = (isCorrect: boolean) => {
    setAnswers({
      ...answers,
      [currentQ.id]: { questionId: currentQ.id, isCorrect }
    });
    if (currentIndex < questions.length - 1) {
      setCurrentIndex(currentIndex + 1);
    } else {
      setPhase('review');
    }
  };

  const formatTime = (seconds: number) => {
    const m = Math.floor(seconds / 60);
    const s = seconds % 60;
    return `${m}:${s < 10 ? '0' : ''}${s}`;
  };

  if (phase === 'setup') {
    return (
      <div className="max-w-3xl mx-auto py-8 px-4">
        <h1 className="text-3xl font-bold mb-8 flex items-center gap-3">
          <Settings className="text-primary" />
          Field Test Simulator Setup
        </h1>

        <div className="bg-white rounded-xl shadow-sm border border-border p-6 mb-8 space-y-6">
          <div>
            <h3 className="font-semibold text-lg mb-3">Include Modules</h3>
            <div className="grid grid-cols-1 gap-3">
              {aggregatedModules.map(m => {
                const readiness = getReadinessScore(competencies[m.id]);
                let readinessColor = 'text-danger';
                if (readiness >= 80) readinessColor = 'text-success';
                else if (readiness >= 50) readinessColor = 'text-warning';

                return (
                  <label key={m.id} className="flex items-center justify-between p-3 border border-border rounded-lg hover:bg-bgMuted cursor-pointer">
                    <div className="flex items-center gap-3">
                      <input 
                        type="checkbox" 
                        className="w-5 h-5 text-primary"
                        checked={config.moduleIds.includes(m.id)}
                        onChange={(e) => {
                          if (e.target.checked) {
                            setConfig({ ...config, moduleIds: [...config.moduleIds, m.id] });
                          } else {
                            setConfig({ ...config, moduleIds: config.moduleIds.filter(id => id !== m.id) });
                          }
                        }}
                      />
                      <span className="font-medium">{m.name}</span>
                    </div>
                    <div className={`text-sm font-bold ${readinessColor}`}>
                      Readiness: {readiness}%
                    </div>
                  </label>
                );
              })}
            </div>
          </div>

          <div>
            <h3 className="font-semibold text-lg mb-3">Session Length</h3>
            <div className="flex gap-4">
              {[10, 25, 50].map(count => (
                <button
                  key={count}
                  onClick={() => setConfig({ ...config, questionCount: count })}
                  className={`flex-1 py-3 border-2 rounded-lg font-medium transition-colors ${config.questionCount === count ? 'border-primary bg-primary/10 text-primary' : 'border-border text-textMuted hover:border-primary/50'}`}
                >
                  {count} Questions
                </button>
              ))}
            </div>
          </div>

          <div>
            <h3 className="font-semibold text-lg mb-3">Timing</h3>
            <label className="flex items-center gap-3 mb-4 cursor-pointer">
              <input 
                type="checkbox" 
                className="w-5 h-5 text-primary"
                checked={config.isTimed}
                onChange={(e) => setConfig({ ...config, isTimed: e.target.checked })}
              />
              <span className="font-medium">Enable Timer</span>
            </label>
            
            {config.isTimed && (
              <div className="flex items-center gap-3">
                <span className="text-textMuted">Time Limit:</span>
                <select 
                  className="border border-border rounded-lg p-2"
                  value={config.timeLimitMinutes}
                  onChange={(e) => setConfig({ ...config, timeLimitMinutes: Number(e.target.value) })}
                >
                  <option value={10}>10 Minutes</option>
                  <option value={15}>15 Minutes</option>
                  <option value={30}>30 Minutes</option>
                  <option value={60}>60 Minutes</option>
                </select>
              </div>
            )}
          </div>
        </div>

        <button 
          onClick={startExam}
          disabled={config.moduleIds.length === 0}
          className="w-full btn btn-primary py-4 text-lg flex justify-center items-center gap-2"
        >
          <Play fill="currentColor" size={20} />
          Start Simulation
        </button>
      </div>
    );
  }

  if (phase === 'aar') {
    // Score calculation
    let correctCount = 0;
    questions.forEach(q => {
      const ans = answers[q.id];
      if (q.type === 'multiple_choice' && ans?.selectedOptionId) {
        const selected = q.options?.find(o => o.id === ans.selectedOptionId);
        if (selected?.isCorrect) correctCount++;
      } else if (q.type === 'flashcard' && ans?.isCorrect) {
        correctCount++;
      }
    });
    const scorePct = Math.round((correctCount / questions.length) * 100);

    return (
      <div className="max-w-4xl mx-auto py-8 px-4">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold flex items-center gap-3">
            <CheckCircle className="text-success" />
            After-Action Report
          </h1>
          <button onClick={() => {
            sessionStorage.removeItem('exam_phase');
            navigate('/');
          }} className="btn bg-white border border-border text-textMain hover:bg-bgMuted">
            Return to Dashboard
          </button>
        </div>

        <div className="bg-white rounded-xl shadow-sm border border-border p-6 mb-8 text-center">
          <h2 className="text-5xl font-bold mb-2">
            <span className={scorePct >= 80 ? 'text-success' : scorePct >= 60 ? 'text-warning' : 'text-danger'}>
              {scorePct}%
            </span>
          </h2>
          <p className="text-textMuted font-medium text-lg">
            {correctCount} out of {questions.length} correct
          </p>
        </div>

        <div className="space-y-6">
          <h3 className="font-bold text-xl mb-4">Question Breakdown</h3>
          {questions.map((q, i) => {
            const ans = answers[q.id];
            let isCorrect = false;
            
            if (q.type === 'multiple_choice') {
              isCorrect = !!q.options?.find(o => o.id === ans?.selectedOptionId)?.isCorrect;
            } else {
              isCorrect = !!ans?.isCorrect;
            }

            return (
              <div key={q.id} className={`bg-white rounded-xl shadow-sm border-2 overflow-hidden ${isCorrect ? 'border-success/30' : 'border-danger/30'}`}>
                <div className="p-4 bg-bgMuted border-b border-border flex justify-between items-start">
                  <div className="font-semibold text-lg flex items-center gap-2">
                    <span className="bg-white text-textMuted px-2 py-1 rounded text-sm font-bold shadow-sm">Q{i + 1}</span>
                    {q.questionText}
                  </div>
                  {isCorrect ? <CheckCircle className="text-success shrink-0" /> : <XCircle className="text-danger shrink-0" />}
                </div>
                
                <div className="p-4">
                  {q.type === 'multiple_choice' && q.options ? (
                    <div className="space-y-3">
                      {q.options.map(opt => {
                        const isSelected = ans?.selectedOptionId === opt.id;
                        return (
                          <div key={opt.id} className={`p-3 rounded-lg border ${opt.isCorrect ? 'bg-success/10 border-success text-green-900' : isSelected ? 'bg-danger/10 border-danger text-red-900' : 'bg-gray-50 border-gray-200 text-gray-700'}`}>
                            <div className="flex gap-2 items-start">
                              <div className="shrink-0 mt-1">
                                {opt.isCorrect ? <CheckCircle size={16} className="text-success" /> : isSelected ? <XCircle size={16} className="text-danger" /> : <div className="w-4 h-4 rounded-full border-2 border-gray-300" />}
                              </div>
                              <div>
                                <span className="font-medium block mb-1">{opt.text}</span>
                                <span className="text-sm opacity-80 block border-t border-black/10 pt-1 mt-1">{opt.feedback}</span>
                              </div>
                            </div>
                          </div>
                        )
                      })}
                    </div>
                  ) : (
                    <div className="space-y-3">
                      <div className="p-3 bg-gray-50 rounded-lg border border-border">
                        <span className="text-sm text-textMuted font-bold uppercase tracking-wider block mb-1">Answer</span>
                        <p className="font-medium text-textMain">{q.correctAnswerText}</p>
                      </div>
                      <p className="text-sm text-textMuted mt-2">Self-reported as: <strong className={isCorrect ? 'text-success' : 'text-danger'}>{isCorrect ? 'Correct' : 'Incorrect'}</strong></p>
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    );
  }

  // Common wrapper for Exam and Review phases
  return (
    <div className="min-h-screen bg-bgMuted flex flex-col">
      {/* Header */}
      <header className="bg-white border-b border-border p-4 shrink-0 flex items-center justify-between sticky top-0 z-10">
        <div className="flex items-center gap-4">
          <span className="font-bold text-lg text-primary">Field Test Simulator</span>
          <div className="bg-bgMuted px-3 py-1 rounded-full text-sm font-semibold text-textMuted">
            {phase === 'exam' ? `Question ${currentIndex + 1} of ${questions.length}` : 'Review Screen'}
          </div>
        </div>
        <div className="flex items-center gap-4">
          {config.isTimed && (
            <div className={`flex items-center gap-2 font-mono font-bold text-lg ${timeLeft < 60 ? 'text-danger animate-pulse' : 'text-textMain'}`}>
              <Clock size={20} />
              {formatTime(timeLeft)}
            </div>
          )}
          <button 
            onClick={() => setPhase(phase === 'exam' ? 'review' : 'exam')}
            className="btn bg-white border border-border hover:bg-gray-50 text-sm py-2"
          >
            {phase === 'exam' ? 'Review All' : 'Back to Exam'}
          </button>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 max-w-4xl w-full mx-auto p-4 sm:p-8 flex flex-col">
        {phase === 'exam' && currentQ && (
          <div className="flex-1 flex flex-col">
            <div className="bg-white shadow-sm border border-border rounded-xl p-6 sm:p-10 flex-1 flex flex-col">
              
              <div className="flex justify-between items-start mb-8">
                <h2 className="text-2xl font-semibold text-textMain leading-relaxed">
                  {currentQ.questionText}
                </h2>
                <button 
                  onClick={toggleFlag}
                  className={`shrink-0 p-3 rounded-lg transition-colors flex items-center gap-2 border ${flagged.has(currentQ.id) ? 'bg-orange-100 border-orange-300 text-orange-700' : 'bg-white border-border text-textMuted hover:bg-gray-50'}`}
                >
                  <Flag fill={flagged.has(currentQ.id) ? 'currentColor' : 'none'} size={20} />
                  <span className="hidden sm:inline font-medium">{flagged.has(currentQ.id) ? 'Flagged' : 'Flag'}</span>
                </button>
              </div>

              {currentQ.type === 'multiple_choice' && currentQ.options ? (
                <div className="space-y-3 mt-auto">
                  {currentQ.options.map(opt => {
                    const isSelected = answers[currentQ.id]?.selectedOptionId === opt.id;
                    return (
                      <button
                        key={opt.id}
                        onClick={() => handleSelectOption(opt.id)}
                        className={`w-full text-left p-4 rounded-xl border-2 transition-all ${isSelected ? 'border-primary bg-primary/5 shadow-sm' : 'border-border hover:border-primary/40 hover:bg-gray-50'}`}
                      >
                        <div className="flex gap-4 items-center">
                          <div className={`w-6 h-6 rounded-full border-2 flex items-center justify-center shrink-0 ${isSelected ? 'border-primary' : 'border-gray-300'}`}>
                            {isSelected && <div className="w-3 h-3 rounded-full bg-primary" />}
                          </div>
                          <span className={`font-medium text-lg ${isSelected ? 'text-primary font-semibold' : 'text-textMain'}`}>
                            {opt.text}
                          </span>
                        </div>
                      </button>
                    );
                  })}
                </div>
              ) : (
                <div className="mt-auto space-y-6">
                  <div className="p-6 bg-blue-50 rounded-xl border border-blue-100">
                    <p className="text-center text-blue-900 font-medium mb-4">This is a recall question. Think of your answer, then self-assess.</p>
                    <div className="flex justify-center gap-4">
                      <button onClick={() => handleFlashcardSelfAssess(false)} className="btn border border-danger text-danger hover:bg-red-50">I didn't know it</button>
                      <button onClick={() => handleFlashcardSelfAssess(true)} className="btn bg-primary text-white hover:bg-primaryHover">I knew it</button>
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Navigation Footer */}
            <div className="mt-6 flex justify-between items-center">
              <button 
                onClick={() => setCurrentIndex(Math.max(0, currentIndex - 1))}
                disabled={currentIndex === 0}
                className="btn bg-white border border-border disabled:opacity-50 flex items-center gap-2 py-3"
              >
                <ArrowLeft size={18} /> Previous
              </button>
              
              {currentIndex < questions.length - 1 ? (
                <button 
                  onClick={() => setCurrentIndex(currentIndex + 1)}
                  className="btn bg-primary text-white hover:bg-primaryHover flex items-center gap-2 py-3 px-6"
                >
                  Next <ArrowRight size={18} />
                </button>
              ) : (
                <button 
                  onClick={() => setPhase('review')}
                  className="btn bg-success text-white hover:bg-green-600 flex items-center gap-2 py-3 px-6"
                >
                  Finish <ArrowRight size={18} />
                </button>
              )}
            </div>
          </div>
        )}

        {phase === 'review' && (
          <div className="bg-white rounded-xl shadow-sm border border-border p-8">
            <h2 className="text-2xl font-bold mb-6">Review & Submit</h2>
            <p className="text-textMuted mb-8">Review your answers before finalizing the exam. Flagged questions are highlighted.</p>
            
            <div className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-5 gap-3 mb-10">
              {questions.map((q, i) => {
                const isAnswered = !!answers[q.id];
                const isFlagged = flagged.has(q.id);
                return (
                  <button
                    key={q.id}
                    onClick={() => {
                      setCurrentIndex(i);
                      setPhase('exam');
                    }}
                    className={`relative p-3 rounded-lg border-2 text-center font-bold transition-colors ${
                      isFlagged ? 'border-orange-400 bg-orange-50 text-orange-800' : 
                      isAnswered ? 'border-success bg-green-50 text-green-800' : 'border-gray-300 bg-gray-50 text-gray-500 hover:border-gray-400'
                    }`}
                  >
                    Q{i + 1}
                    {isFlagged && <Flag size={14} className="absolute top-1 right-1 text-orange-500" fill="currentColor" />}
                  </button>
                )
              })}
            </div>

            <div className="flex justify-between items-center pt-6 border-t border-border">
              <button onClick={() => setPhase('exam')} className="btn bg-white border border-border text-textMain py-3 px-6">Return to Exam</button>
              <button onClick={submitExam} className="btn bg-primary text-white text-lg py-3 px-8 flex items-center gap-2 shadow-md hover:bg-primaryHover">
                <Save size={20} />
                Submit Exam
              </button>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}
