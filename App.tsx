import React, { useState, useEffect, useRef } from 'react';
import { PART1_QUESTIONS, PART2_QUESTIONS, BADGES, getIcon } from './constants';
import { Phase, BadgeResult } from './types';
import { ProgressBar } from './components/ProgressBar';
import { QuizMCQ } from './components/QuizMCQ';
import { QuizSpectrum } from './components/QuizSpectrum';
import { Heart, ArrowRight, RotateCcw, Sparkles, Scroll, Bird, Feather } from 'lucide-react';
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from 'recharts';

function App() {
  const [phase, setPhase] = useState<Phase>('intro');
  
  // Animation States: 'waiting' -> 'bird-flying' -> 'bird-dropping' -> 'grounded' -> 'opening' -> 'letter-out' -> 'reading'
  const [animState, setAnimState] = useState<'waiting' | 'bird-flying' | 'bird-dropping' | 'grounded' | 'opening' | 'letter-out' | 'reading'>('waiting');

  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [scorePart1, setScorePart1] = useState(0);
  const [scorePart2, setScorePart2] = useState(0);
  const [finalResult, setFinalResult] = useState<BadgeResult | null>(null);
  const [isTransitioning, setIsTransitioning] = useState(false);

  useEffect(() => {
    if (phase !== 'result') {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  }, [phase, currentQuestionIndex]);

  const handleStart = () => {
    setPhase('part1');
    setCurrentQuestionIndex(0);
  };

  const handleAnswerPart1 = (score: number) => {
    if (isTransitioning) return;
    setIsTransitioning(true);
    setScorePart1(prev => prev + score);
    setTimeout(() => {
        if (currentQuestionIndex < PART1_QUESTIONS.length - 1) {
          setCurrentQuestionIndex(prev => prev + 1);
        } else {
          setPhase('intermission');
        }
        setIsTransitioning(false);
    }, 400); 
  };

  const startPart2 = () => {
    setPhase('part2');
    setCurrentQuestionIndex(0);
  };

  const handleAnswerPart2 = (val: number) => {
    if (isTransitioning) return;
    setIsTransitioning(true);
    const points = val - 1; 
    setScorePart2(prev => prev + points);
    setTimeout(() => {
        if (currentQuestionIndex < PART2_QUESTIONS.length - 1) {
          setCurrentQuestionIndex(prev => prev + 1);
        } else {
          calculateResult();
        }
        setIsTransitioning(false);
    }, 400);
  };

  const calculateResult = () => {
    setPhase('calculating');
  };

  useEffect(() => {
    if (phase === 'calculating') {
      const totalScore = scorePart1 + scorePart2;
      const foundBadge = BADGES.find(b => totalScore >= b.minScore && totalScore <= b.maxScore) || BADGES[BADGES.length - 1];
      setFinalResult(foundBadge);
      
      const timer = setTimeout(() => {
        setPhase('result');
        setAnimState('bird-flying');
        
        // Timeline for bird animation
        // 3s flight duration
        setTimeout(() => {
           setAnimState('bird-dropping');
        }, 2500); 

        // 1.5s drop duration
        setTimeout(() => {
           setAnimState('grounded');
        }, 4000);

      }, 2500);
      return () => clearTimeout(timer);
    }
  }, [phase, scorePart1, scorePart2]);

  const restart = () => {
    setScorePart1(0);
    setScorePart2(0);
    setCurrentQuestionIndex(0);
    setFinalResult(null);
    setAnimState('waiting');
    setPhase('intro');
  };

  const handleOpenEnvelope = () => {
    if (animState !== 'grounded') return;
    setAnimState('opening');
    
    // Flap opens (0.8s) -> Letter slides out
    setTimeout(() => {
        setAnimState('letter-out');
    }, 800);
  };

  const handleReadLetter = () => {
      if (animState !== 'letter-out') return;
      setAnimState('reading');
  };

  // --- RENDERERS ---

  if (phase === 'intro') {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center p-6 text-center bg-gradient-to-b from-[#fff1f2] via-white to-[#fff1f2] relative overflow-hidden">
        {/* Decorative Background */}
        <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cupid.png')] opacity-5 pointer-events-none"></div>
        
        <div className="max-w-3xl w-full relative z-10">
          <div className="animate-bounce mb-8 inline-block relative">
             <div className="absolute inset-0 blur-xl bg-rose-400/30 rounded-full animate-pulse"></div>
            <Heart className="w-24 h-24 text-rose-500 fill-rose-500 drop-shadow-xl relative z-10" />
          </div>
          <h1 className="text-5xl md:text-7xl font-serif font-bold text-slate-800 mb-6 leading-tight drop-shadow-sm tracking-wide">
            Le Baromètre <br /> du <span className="text-transparent bg-clip-text bg-gradient-to-r from-rose-500 to-amber-500">Cœur</span>
          </h1>
          <div className="h-px w-48 bg-gradient-to-r from-transparent via-rose-300 to-transparent mx-auto mb-8"></div>
          
          <p className="text-xl md:text-2xl text-slate-600 mb-12 max-w-2xl mx-auto leading-relaxed font-light italic">
            "En cette Saint-Valentin, ouvrez votre cœur à la vérité. Votre histoire est-elle un poème éternel ou un chapitre à clore ?"
          </p>

          <button 
            onClick={handleStart}
            className="group relative inline-flex items-center justify-center px-12 py-6 text-lg font-bold text-white transition-all duration-300 bg-gradient-to-r from-rose-500 to-rose-600 font-serif rounded-full hover:shadow-[0_0_20px_rgba(244,63,94,0.4)] hover:-translate-y-1 focus:outline-none"
          >
            Commencer le Rituel
            <ArrowRight className="ml-3 w-5 h-5 group-hover:translate-x-2 transition-transform" />
          </button>
        </div>
      </div>
    );
  }

  if (phase === 'part1') {
    const question = PART1_QUESTIONS[currentQuestionIndex];
    return (
      <div className="min-h-screen bg-gradient-to-b from-rose-50 to-white flex flex-col items-center py-12 px-4">
        <div className="w-full max-w-3xl">
          <ProgressBar current={currentQuestionIndex + 1} total={PART1_QUESTIONS.length} label="Chapitre I : L'Ombre et la Lumière" />
          <QuizMCQ data={question} onAnswer={handleAnswerPart1} disabled={isTransitioning} />
        </div>
      </div>
    );
  }

  if (phase === 'intermission') {
    return (
      <div className="min-h-screen bg-[#2e1065] flex flex-col items-center justify-center p-6 text-center text-white relative overflow-hidden">
        <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-10"></div>
        <div className="z-10 max-w-2xl">
            <Sparkles className="w-16 h-16 text-indigo-300 mx-auto mb-6 animate-spin-slow" />
            <h2 className="text-4xl md:text-6xl font-serif font-bold mb-6 text-indigo-100">
                Le Premier Voile est Levé
            </h2>
            <p className="text-indigo-200 text-xl mb-10 leading-relaxed font-light">
            Vos actes dessinent une forme, mais votre ressenti en détient la couleur. <br/>
            Plongez maintenant dans le <span className="text-white font-serif italic">Spectrum</span> pour révéler la vérité.
            </p>
            <button 
            onClick={startPart2}
            className="px-12 py-5 bg-white text-indigo-950 font-serif font-bold text-lg rounded shadow-lg hover:bg-indigo-50 hover:scale-105 transition-all duration-300"
            >
            Entrer dans le Spectrum
            </button>
        </div>
      </div>
    );
  }

  if (phase === 'part2') {
    const question = PART2_QUESTIONS[currentQuestionIndex];
    return (
      <div className="min-h-screen bg-gradient-to-b from-indigo-50 to-white flex flex-col items-center py-12 px-4">
        <div className="w-full max-w-3xl">
          <ProgressBar current={currentQuestionIndex + 1} total={PART2_QUESTIONS.length} label="Chapitre II : La Résonance" />
          <QuizSpectrum key={currentQuestionIndex} data={question} onAnswer={handleAnswerPart2} disabled={isTransitioning} />
        </div>
      </div>
    );
  }

  if (phase === 'calculating') {
    return (
      <div className="min-h-screen bg-rose-50 flex flex-col items-center justify-center text-rose-900 overflow-hidden">
        <div className="relative">
          <div className="absolute inset-0 animate-ping rounded-full bg-rose-300 opacity-40 duration-1000"></div>
          <Heart className="w-32 h-32 text-rose-500 fill-rose-500 animate-pulse relative z-10 drop-shadow-lg" />
        </div>
        <h2 className="mt-12 text-3xl font-serif tracking-[0.3em] text-rose-800 animate-pulse text-center">
            INTERPRÉTATION DES ASTRES...
        </h2>
      </div>
    );
  }

  if (phase === 'result' && finalResult) {
    const totalScore = scorePart1 + scorePart2;
    const toxicPercentage = Math.round((totalScore / 70) * 100);
    const healthyPercentage = 100 - toxicPercentage;
    
    // Determine which "Letter" view we are in
    const isBirdSequence = ['bird-flying', 'bird-dropping'].includes(animState);
    const isGroundSequence = ['grounded', 'opening', 'letter-out'].includes(animState);
    
    if (animState !== 'reading') {
        return (
            <div className="min-h-screen bg-rose-50 overflow-hidden relative w-full h-full">
                 {/* Magical Atmosphere */}
                 <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cupid.png')] opacity-10"></div>
                 <div className="absolute inset-0 bg-gradient-to-b from-blue-50/20 via-rose-100/30 to-rose-200/20 pointer-events-none"></div>

                 {/* 1. The Bird Flying Sequence */}
                 {isBirdSequence && (
                    <div className={`absolute top-0 left-0 z-50 ${animState === 'bird-flying' ? 'bird-flying' : 'bird-away'}`}>
                        <div className="relative">
                             <Bird className="w-24 h-24 text-indigo-800 fill-indigo-100 stroke-1 drop-shadow-lg" />
                             {/* Envelope held by bird */}
                             {animState === 'bird-flying' && (
                                <div className="absolute -bottom-6 left-6 w-12 h-8 bg-rose-100 border border-rose-300 rounded shadow-md transform -rotate-12 origin-top-right">
                                     <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-4 h-4 bg-rose-600 rounded-full"></div>
                                </div>
                             )}
                             {/* Wind Particles */}
                             <div className="absolute -right-10 top-0 w-20 h-2 bg-white/50 blur-sm rounded-full"></div>
                             <div className="absolute -right-6 top-8 w-12 h-1 bg-white/50 blur-sm rounded-full"></div>
                        </div>
                    </div>
                 )}

                 {/* 2. The Dropping/Grounded Envelope */}
                 {(animState === 'bird-dropping' || isGroundSequence) && (
                     <div className={`
                        absolute z-40
                        ${animState === 'bird-dropping' ? 'envelope-falling' : 'left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2'}
                     `}>
                        <div className={`envelope-container w-80 h-52 md:w-[450px] md:h-[300px] relative transition-all duration-1000 ${isGroundSequence ? 'scale-100' : ''}`}>
                            
                            {/* Envelope Back */}
                            <div className="absolute inset-0 bg-rose-200 rounded-lg shadow-2xl border border-rose-300"></div>

                            {/* THE LETTER INSIDE */}
                            <div 
                                onClick={handleReadLetter}
                                className={`
                                    letter-content absolute left-2 right-2 top-2 bottom-2 paper-texture shadow-md flex flex-col items-center justify-start p-6 border border-amber-100/50
                                    ${['letter-out'].includes(animState) ? 'extract' : ''}
                                `}
                            >
                                <div className="w-full flex justify-between items-center border-b border-amber-800/20 pb-2 mb-4">
                                    <div className="w-8 h-8 rounded-full border border-amber-800/30 flex items-center justify-center opacity-50">
                                        <Feather className="w-4 h-4 text-amber-900" />
                                    </div>
                                    <div className="font-handwriting text-xl text-amber-900 opacity-70">Saint Valentin 2025</div>
                                </div>
                                <div className="font-handwriting text-3xl text-amber-950 mb-2">Mon Cher...</div>
                                <div className="space-y-3 w-full opacity-40">
                                    <div className="h-1 bg-amber-900/30 w-full rounded"></div>
                                    <div className="h-1 bg-amber-900/30 w-11/12 rounded"></div>
                                    <div className="h-1 bg-amber-900/30 w-full rounded"></div>
                                    <div className="h-1 bg-amber-900/30 w-4/5 rounded"></div>
                                </div>
                                <div className="mt-auto text-xs font-serif uppercase tracking-widest text-rose-800 animate-pulse">
                                    {animState === 'letter-out' ? 'Lire la lettre' : ''}
                                </div>
                            </div>

                            {/* Envelope Front (Pocket) */}
                            <div className="absolute bottom-0 left-0 w-full h-full z-10 overflow-hidden rounded-lg pointer-events-none">
                                <div className="w-full h-full bg-rose-100/80 backdrop-blur-[0.5px]">
                                    <div className="absolute bottom-0 w-0 h-0 border-l-[160px] md:border-l-[225px] border-r-[160px] md:border-r-[225px] border-b-[160px] md:border-b-[220px] border-l-transparent border-r-transparent border-b-rose-200/90 filter drop-shadow-md"></div>
                                </div>
                            </div>

                            {/* Flap */}
                            <div className={`
                                flap absolute top-0 left-0 w-full h-1/2 z-20 origin-top
                                ${['opening', 'letter-out'].includes(animState) ? 'open' : ''}
                            `}>
                                 <div className="w-0 h-0 border-l-[160px] md:border-l-[225px] border-r-[160px] md:border-r-[225px] border-t-[140px] md:border-t-[190px] border-l-transparent border-r-transparent border-t-rose-300 filter drop-shadow-md"></div>
                            </div>

                            {/* Seal */}
                            <div 
                                onClick={handleOpenEnvelope}
                                className={`
                                    absolute top-[40%] left-1/2 -translate-x-1/2 -translate-y-1/2 z-30
                                    transition-all duration-500 cursor-pointer
                                    ${['opening', 'letter-out'].includes(animState) ? 'opacity-0 scale-150 pointer-events-none' : 'opacity-100'}
                                `}
                            >
                                 <div className="w-20 h-20 bg-rose-700 rounded-full border-4 border-rose-800 shadow-xl flex items-center justify-center seal-pulse group">
                                    <Heart className="w-10 h-10 text-rose-200 fill-rose-900 group-hover:scale-110 transition-transform" />
                                 </div>
                            </div>
                        </div>
                     </div>
                 )}
                 
                 {/* Helper Text */}
                 {animState === 'grounded' && (
                     <div className="absolute bottom-20 left-0 right-0 text-center animate-fade-in">
                        <p className="text-rose-800 font-serif tracking-widest text-sm animate-pulse">Une colombe vous a apporté un message...</p>
                     </div>
                 )}
            </div>
        )
    }

    // --- FINAL READING VIEW (THE LETTER) ---
    // This replaces the old dashboard with a full-screen letter interface
    
    return (
      <div className="min-h-screen bg-rose-50 py-8 px-4 flex flex-col items-center justify-center relative bg-[url('https://www.transparenttextures.com/patterns/cream-paper.png')] animate-[fadeIn_2s_ease-out]">
        
        {/* The Open Letter Parchment */}
        <div className="relative w-full max-w-4xl paper-texture shadow-[0_20px_60px_rgba(0,0,0,0.1)] p-8 md:p-16 transform rotate-[0.5deg] border border-stone-200">
            {/* Paper imperfections */}
            <div className="absolute top-0 left-0 w-full h-8 bg-gradient-to-b from-stone-200/20 to-transparent"></div>
            <div className="absolute bottom-0 right-0 w-32 h-32 bg-amber-100/30 blur-3xl rounded-full pointer-events-none"></div>

            {/* Header */}
            <div className="flex justify-between items-start mb-12 border-b-2 border-amber-900/10 pb-6">
                <div className="flex flex-col">
                    <span className="font-handwriting text-3xl md:text-4xl text-amber-950 mb-1">Le Verdict des Cœurs</span>
                    <span className="font-serif text-xs tracking-[0.3em] text-amber-800 uppercase">Analyse Spirituelle No. {Math.floor(Math.random() * 9999)}</span>
                </div>
                <div className="w-20 h-20 border-2 border-double border-rose-800/30 rounded-full flex items-center justify-center rotate-[-15deg] opacity-70">
                    <div className="text-center">
                        <div className="text-[10px] uppercase text-rose-800 font-bold">Poste</div>
                        <div className="text-xs font-serif text-rose-900">Amour</div>
                        <div className="text-[10px] text-rose-800">2025</div>
                    </div>
                </div>
            </div>

            {/* Body */}
            <div className="mb-12 relative">
                <h1 className="font-handwriting text-5xl md:text-6xl text-center text-rose-950 mb-8 drop-shadow-sm">
                    {finalResult.title}
                </h1>
                
                <p className="font-handwriting text-2xl md:text-3xl text-slate-800 leading-loose text-justify ink-text">
                    Mon cher âme en quête,<br/><br/>
                    {finalResult.description}
                </p>

                {/* The "Stamp" of the result */}
                <div className={`
                    absolute top-0 right-0 md:-right-8 translate-x-1/4 -translate-y-1/2
                    w-32 h-32 md:w-40 md:h-40 rounded-full border-4 border-rose-800/40 
                    flex items-center justify-center opacity-20 pointer-events-none rotate-12 mix-blend-multiply
                `}>
                    {getIcon(finalResult.iconName, "w-20 h-20 text-rose-900")}
                </div>
            </div>

            {/* Visual Data (Ink Style) */}
            <div className="flex flex-col md:flex-row gap-12 items-center justify-center mb-12 border-t-2 border-b-2 border-amber-900/5 py-8">
                
                {/* Ink Circle Chart */}
                <div className="flex flex-col items-center">
                    <div className="relative w-32 h-32">
                        <ResponsiveContainer width="100%" height="100%">
                           <PieChart>
                             <Pie
                               data={[
                                   { value: healthyPercentage, color: '#059669' }, 
                                   { value: toxicPercentage, color: '#be123c' }
                               ]}
                               cx="50%"
                               cy="50%"
                               innerRadius={40}
                               outerRadius={55}
                               dataKey="value"
                               stroke="none"
                             />
                           </PieChart>
                        </ResponsiveContainer>
                        <div className="absolute inset-0 flex items-center justify-center font-serif font-bold text-lg text-amber-900">
                           {healthyPercentage}%
                        </div>
                    </div>
                    <span className="font-handwriting text-xl text-emerald-700 mt-2">Lumière</span>
                </div>

                <div className="h-16 w-px bg-amber-900/20 hidden md:block"></div>

                {/* Ink Bar */}
                <div className="w-full max-w-xs">
                    <div className="flex justify-between font-handwriting text-xl text-rose-900 mb-2">
                        <span>Toxicité Latente</span>
                        <span>{toxicPercentage}%</span>
                    </div>
                    <div className="h-2 w-full bg-stone-200 rounded-full overflow-hidden">
                        <div 
                            className="h-full bg-rose-900/70 rounded-full"
                            style={{ width: `${toxicPercentage}%` }}
                        ></div>
                    </div>
                </div>
            </div>

            {/* Footer / Signature */}
            <div className="flex justify-between items-end mt-16">
                 <div>
                    <button 
                        onClick={restart}
                        className="font-serif text-xs tracking-widest uppercase text-slate-400 hover:text-rose-600 border-b border-transparent hover:border-rose-300 transition-colors pb-1 flex items-center gap-2"
                    >
                        <RotateCcw className="w-3 h-3" /> Recommencer
                    </button>
                 </div>
                 <div className="text-right">
                    <div className="font-handwriting text-3xl text-amber-900 transform -rotate-6">Le Destin</div>
                    <div className="w-32 h-0.5 bg-amber-900/30 mt-2"></div>
                 </div>
            </div>

        </div>
        
        {/* Other Possible Paths (Small at bottom) */}
        <div className="mt-12 w-full max-w-4xl text-center opacity-60 hover:opacity-100 transition-opacity">
            <p className="font-serif text-xs uppercase tracking-widest text-slate-500 mb-6">- Les autres chemins possibles -</p>
            <div className="flex justify-center gap-4 flex-wrap">
                {BADGES.filter(b => b.id !== finalResult.id).map(badge => (
                    <div key={badge.id} className="bg-white/50 px-3 py-2 rounded border border-rose-100 text-xs font-serif text-slate-500 flex items-center gap-2">
                         {getIcon(badge.iconName, "w-3 h-3")} {badge.title}
                    </div>
                ))}
            </div>
        </div>

      </div>
    );
  }

  return null;
}

export default App;