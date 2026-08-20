import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAppStore } from '../store/useAppStore';
import { deck } from '../data/deck';
import { modules } from '../data/modules';
import { BrainCircuit, Check, X, RotateCcw } from 'lucide-react';
import type { ConfidenceLevel } from '../data/types';

export function ReviewSession() {
  const navigate = useNavigate();
  const { reviewQueue, processReviewResult } = useAppStore();
  
  const now = new Date();
  
  // Find cards due today, plus cards we've never seen before (up to a daily limit)
  const [sessionCards, setSessionCards] = useState<typeof deck>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isFlipped, setIsFlipped] = useState(false);
  const [sessionComplete, setSessionComplete] = useState(false);
  const [confidence, setConfidence] = useState<ConfidenceLevel | null>(null);
  
  useEffect(() => {
    // Initialize session
    const dueItems = reviewQueue.filter(r => new Date(r.nextReviewDate) <= now);
    const dueCardIds = dueItems.map(d => d.itemId);
    
    // Mix due cards with some new cards if queue is small
    const dueCards = deck.filter(c => dueCardIds.includes(c.id));
    
    // Add up to 5 new cards if we have fewer than 10 reviews
    let newCards: typeof deck = [];
    if (dueCards.length < 10) {
      const seenCardIds = reviewQueue.map(r => r.itemId);
      newCards = deck.filter(c => !seenCardIds.includes(c.id)).slice(0, 10 - dueCards.length);
    }
    
    const combined = [...dueCards, ...newCards].sort(() => Math.random() - 0.5); // Shuffle
    
    if (combined.length === 0) {
      setSessionComplete(true);
    } else {
      setSessionCards(combined);
    }
  }, []);

  if (sessionComplete) {
    return (
      <div className="max-w-md mx-auto mt-20 text-center animate-fade-in">
        <div className="w-20 h-20 bg-green-100 text-success rounded-full flex items-center justify-center mx-auto mb-6">
          <Check size={40} />
        </div>
        <h2 className="text-2xl font-bold mb-2">Session Complete!</h2>
        <p className="text-textMuted mb-8">You're all caught up for now. Check back tomorrow for more reviews.</p>
        <button onClick={() => navigate('/')} className="btn btn-primary w-full">Return Home</button>
      </div>
    );
  }

  if (sessionCards.length === 0) {
    return <div className="p-8 text-center">Loading session...</div>;
  }

  const currentCard = sessionCards[currentIndex];
  const module = modules.find(m => m.id === currentCard.moduleId);

  const handleFlip = () => {
    if (!isFlipped && confidence) setIsFlipped(true);
  };

  const handleScore = (rating: 'again' | 'hard' | 'good' | 'easy') => {
    processReviewResult({
      itemId: currentCard.id,
      itemType: 'flashcard',
      moduleId: currentCard.moduleId,
      rating,
      confidence
    });
    
    if (currentIndex + 1 < sessionCards.length) {
      setIsFlipped(false);
      setConfidence(null);
      setCurrentIndex(currentIndex + 1);
    } else {
      setSessionComplete(true);
    }
  };

  return (
    <div className="max-w-2xl mx-auto animate-fade-in">
      <div className="flex items-center justify-between mb-8">
        <h1 className="text-2xl font-bold flex items-center gap-2">
          <BrainCircuit className="text-primary" />
          Review Queue
        </h1>
        <div className="text-sm font-medium bg-slate-100 px-3 py-1 rounded-full text-slate-600">
          Card {currentIndex + 1} of {sessionCards.length}
        </div>
      </div>

      {/* Flashcard */}
      <div 
        className={`relative w-full min-h-[300px] perspective-1000 mb-8 text-left outline-none block bg-transparent p-0`}
      >
        <div className={`w-full h-full min-h-[300px] transition-all duration-500 transform-style-3d shadow-lg rounded-2xl ${isFlipped ? 'rotate-y-180' : ''}`}>
          
          {/* Front */}
          <div className="absolute inset-0 w-full h-full backface-hidden bg-white border-2 border-border rounded-2xl p-8 flex flex-col">
            <div className="mb-4">
              <span className={`text-xs font-bold px-2 py-1 rounded-md text-white ${module?.color || 'bg-slate-600'}`}>
                {module?.name || 'General'}
              </span>
            </div>
            <div className="flex-1 flex items-center justify-center text-center">
              <h2 className="text-2xl font-semibold text-textMain leading-tight">
                {currentCard.question}
              </h2>
            </div>
            <div className="text-center text-textMuted text-sm mt-8">
              {!isFlipped && (
                <div className="space-y-4">
                  <p className="font-semibold text-textMain">How confident are you?</p>
                  <div className="flex flex-wrap justify-center gap-2">
                    {[
                      { id: 'guessing', label: 'Guessing 🤔' },
                      { id: 'somewhat', label: 'Somewhat 😐' },
                      { id: 'confident', label: 'Confident 🙂' },
                      { id: 'highly', label: 'Highly Confident 😎' }
                    ].map(c => (
                      <button
                        key={c.id}
                        onClick={(e) => {
                          e.stopPropagation();
                          setConfidence(c.id as ConfidenceLevel);
                        }}
                        className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                          confidence === c.id 
                            ? 'bg-primary text-white' 
                            : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                        }`}
                      >
                        {c.label}
                      </button>
                    ))}
                  </div>
                  
                  <button 
                    onClick={handleFlip}
                    disabled={!confidence}
                    className={`mt-6 px-6 py-2 rounded-lg font-semibold flex items-center justify-center gap-2 mx-auto transition-colors ${
                      confidence ? 'bg-primary text-white hover:bg-primaryHover' : 'bg-slate-200 text-slate-400 cursor-not-allowed'
                    }`}
                  >
                    <RotateCcw size={16} /> Reveal Answer
                  </button>
                </div>
              )}
            </div>
          </div>

          {/* Back */}
          <div className="absolute inset-0 w-full h-full backface-hidden bg-slate-50 border-2 border-primary rounded-2xl p-8 flex flex-col rotate-y-180">
            <div className="mb-4 text-primary font-semibold text-sm">Answer</div>
            <div className="flex-1 flex items-center justify-center text-center">
              <p className="text-xl text-textMain leading-relaxed">
                {currentCard.answer}
              </p>
            </div>
          </div>

        </div>
      </div>

      {/* Controls */}
      <div className={`transition-opacity duration-300 ${isFlipped ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}>
        <p className="text-center text-textMuted mb-4 font-medium">How did you do?</p>
        <div className="grid grid-cols-4 gap-2">
          <button 
            onClick={(e) => { e.stopPropagation(); handleScore('again'); }}
            className="btn py-4 bg-white border-2 border-danger text-danger hover:bg-red-50 text-sm flex items-center justify-center gap-1"
          >
            <X size={16}/> Again
          </button>
          <button 
            onClick={(e) => { e.stopPropagation(); handleScore('hard'); }}
            className="btn py-4 bg-white border-2 border-warning text-warning hover:bg-orange-50 text-sm flex items-center justify-center gap-1"
          >
            Hard
          </button>
          <button 
            onClick={(e) => { e.stopPropagation(); handleScore('good'); }}
            className="btn py-4 bg-white border-2 border-success text-success hover:bg-green-50 text-sm flex items-center justify-center gap-1"
          >
            Good
          </button>
          <button 
            onClick={(e) => { e.stopPropagation(); handleScore('easy'); }}
            className="btn py-4 bg-primary text-white hover:bg-primaryHover text-sm flex items-center justify-center gap-1"
          >
            <Check size={16}/> Easy
          </button>
        </div>
      </div>
      
    </div>
  );
}
