import React, { useState, useEffect } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { READINESS_QUIZ, PART2_QUESTIONS, BADGES, getIcon } from './data/constants';
import { Phase, BadgeResult } from './types';
import { Layout } from './components/Layout';
import { IntroCard } from './components/IntroCard';
import { QuizMCQ } from './components/QuizMCQ';
import { QuizSpectrum } from './components/QuizSpectrum';
import { ProgressBar } from './components/ProgressBar';
import { Card } from './components/ui/Card';
import { Button } from './components/ui/Button';
import { Heart, RotateCcw, Bird, Feather } from 'lucide-react';

function App() {
    const [phase, setPhase] = useState<Phase>('intro');
    const [animState, setAnimState] = useState<'waiting' | 'bird-flying' | 'bird-dropping' | 'grounded' | 'opening' | 'letter-out' | 'reading'>('waiting');

    const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
    const [scorePart1, setScorePart1] = useState(0);
    const [scorePart2, setScorePart2] = useState(0);
    const [finalResult, setFinalResult] = useState<BadgeResult | null>(null);
    const [isTransitioning, setIsTransitioning] = useState(false);

    // Determine global theme based on phase/result
    const getTheme = () => {
        if (finalResult) {
            if (['Toxique', 'Trés Toxique'].includes(finalResult.level)) return 'toxic';
        }
        return 'love';
    };

    const handleStart = () => {
        setPhase('part1');
        setCurrentQuestionIndex(0);
    };

    const handleAnswerPart1 = (score: number) => {
        if (isTransitioning) return;
        setIsTransitioning(true);
        setScorePart1(prev => prev + score);

        setTimeout(() => {
            if (currentQuestionIndex < READINESS_QUIZ.length - 1) {
                setCurrentQuestionIndex(prev => prev + 1);
            } else {
                setPhase('part2');
                setCurrentQuestionIndex(0);
            }
            setIsTransitioning(false);
        }, 500);
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
        }, 500);
    };

    const calculateResult = () => {
        setPhase('calculating');
    };

    useEffect(() => {
        if (phase === 'calculating') {
            const totalScore = scorePart1 + scorePart2;
            const foundBadge = BADGES.find(b => totalScore >= b.minScore && totalScore <= b.maxScore) || BADGES[BADGES.length - 1];
            setFinalResult(foundBadge);

            setTimeout(() => {
                setPhase('result');
                setAnimState('bird-flying');
                // Animation sequence (synced with CSS durations)
                setTimeout(() => setAnimState('bird-dropping'), 3000);  // bird flight is 3s
                setTimeout(() => setAnimState('grounded'), 5000);       // bird flies away 2s + settle
            }, 2000);
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
        setTimeout(() => setAnimState('letter-out'), 800);
    };

    const handleReadLetter = () => {
        if (animState !== 'letter-out') return;
        setAnimState('reading');
    };

    // --- RENDERING ---

    return (
        <Layout theme={getTheme()}>

            {/* INTRO */}
            {phase === 'intro' && (
                <IntroCard onStart={handleStart} />
            )}

            {/* PART 1 */}
            {phase === 'part1' && (
                <div className="flex flex-col items-center justify-center min-h-screen py-12">
                    <ProgressBar current={currentQuestionIndex + 1} total={READINESS_QUIZ.length} label="La Genèse" />
                    <QuizMCQ
                        data={READINESS_QUIZ[currentQuestionIndex]}
                        onAnswer={handleAnswerPart1}
                        disabled={isTransitioning}
                    />
                </div>
            )}

            {/* INTERMISSION */}


            {/* PART 2 */}
            {phase === 'part2' && (
                <div className="flex flex-col items-center justify-center min-h-screen py-12">
                    <ProgressBar current={currentQuestionIndex + 1} total={PART2_QUESTIONS.length} label="La Résonance" />
                    <QuizSpectrum
                        data={PART2_QUESTIONS[currentQuestionIndex]}
                        onAnswer={handleAnswerPart2}
                        disabled={isTransitioning}
                    />
                </div>
            )}

            {/* CALCULATING */}
            {phase === 'calculating' && (
                <div className="min-h-screen bg-rose-50 flex flex-col items-center justify-center text-rose-900 overflow-hidden">
                    <div className="relative">
                        <div className="absolute inset-0 animate-ping rounded-full bg-rose-300 opacity-40 duration-1000"></div>
                        <Heart className="w-32 h-32 text-rose-500 fill-rose-500 animate-pulse relative z-10 drop-shadow-lg" />
                    </div>
                    <h2 className="mt-12 text-2xl font-serif tracking-[0.3em] text-rose-800 animate-pulse text-center px-6">
                        INTERPRÉTATION...
                    </h2>
                </div>
            )}

            {/* RESULT / BIRD SEQUENCE */}
            {phase === 'result' && finalResult && (() => {
                const totalScore = scorePart1 + scorePart2;
                const toxicPercentage = Math.round((totalScore / 70) * 100);
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
                                    z-40
                                    ${animState === 'bird-dropping' ? 'envelope-falling' : 'envelope-grounded'}
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
                                                <div className="font-handwriting text-xl text-amber-900 opacity-70">Saint Valentin 2026</div>
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
                    );
                }

                // --- FINAL READING VIEW (THE LETTER) ---
                return (
                    <div className="min-h-screen bg-rose-50 py-8 px-4 flex flex-col items-center justify-center relative bg-[url('https://www.transparenttextures.com/patterns/cream-paper.png')] content-fade-in">

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
                                        <div className="text-[10px] text-rose-800">2026</div>
                                    </div>
                                </div>
                            </div>

                            {/* Body */}
                            <div className="mb-12 relative">
                                <div className="flex items-center justify-center gap-3 mb-4">
                                    <span className={`px-4 py-1 rounded-full text-xs font-bold uppercase tracking-widest text-white shadow-sm ${['Blindé', 'Sain'].includes(finalResult.level) ? 'bg-emerald-500' : ['Neutre'].includes(finalResult.level) ? 'bg-amber-400' : ['Vulnérable'].includes(finalResult.level) ? 'bg-orange-500' : 'bg-red-600'}`}>
                                        {finalResult.level}
                                    </span>
                                </div>

                                <h1 className="font-handwriting text-5xl md:text-6xl text-center text-rose-950 mb-8 drop-shadow-sm">
                                    {finalResult.title}
                                </h1>

                                <p className="font-handwriting text-2xl md:text-3xl text-slate-800 leading-loose text-justify ink-text">
                                    Mon cher âme en quête,<br /><br />
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

                            {/* Intuitive Visual Scale */}
                            <div className="flex flex-col items-center justify-center mb-12 border-t-2 border-b-2 border-amber-900/5 py-8 w-full">
                                <span className="font-serif text-sm uppercase tracking-widest text-slate-500 mb-4">Ton Ouverture au Toxique</span>

                                <div className="w-full max-w-md relative h-8 bg-stone-200 rounded-full overflow-hidden shadow-inner flex">
                                    {/* The Scale Gradient */}
                                    <div className="w-1/3 h-full bg-emerald-200/50 flex items-center justify-center text-[10px] font-bold text-emerald-800 uppercase">Protégé</div>
                                    <div className="w-1/3 h-full bg-amber-200/50 flex items-center justify-center text-[10px] font-bold text-amber-800 uppercase">Vulnérable</div>
                                    <div className="w-1/3 h-full bg-red-200/50 flex items-center justify-center text-[10px] font-bold text-red-800 uppercase">Exposé</div>

                                    {/* The Indicator Pin */}
                                    <div
                                        className="absolute top-0 bottom-0 w-1 bg-slate-800 shadow-[0_0_10px_rgba(0,0,0,0.5)] z-10 transition-all duration-1000 ease-out"
                                        style={{ left: `${toxicPercentage}%` }}
                                    ></div>
                                </div>
                                <div className="mt-2 font-handwriting text-xl text-rose-900">
                                    {toxicPercentage < 33 ? "Ton cœur est bien gardé." : toxicPercentage < 66 ? "Tes défenses ont des failles." : "Porte grande ouverte aux toxiques."}
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

                        {/* Other Possible Paths (Color Coded & Clear) */}
                        <div className="mt-12 w-full max-w-4xl text-center opacity-80 hover:opacity-100 transition-opacity">
                            <p className="font-serif text-xs uppercase tracking-widest text-slate-500 mb-6">- Les autres chemins possibles -</p>
                            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                                {BADGES.filter(b => b.id !== finalResult.id).map(badge => {
                                    let levelColor = "text-slate-500";
                                    let borderColor = "border-slate-200";
                                    if (badge.level === 'Blindé') { levelColor = "text-emerald-700"; borderColor = "border-emerald-300 bg-emerald-50"; }
                                    if (badge.level === 'Sain') { levelColor = "text-emerald-600"; borderColor = "border-emerald-200 bg-emerald-50"; }
                                    if (badge.level === 'Neutre') { levelColor = "text-amber-600"; borderColor = "border-amber-200 bg-amber-50"; }
                                    if (badge.level === 'Vulnérable') { levelColor = "text-orange-600"; borderColor = "border-orange-200 bg-orange-50"; }
                                    if (badge.level === 'Toxique') { levelColor = "text-red-500"; borderColor = "border-red-200 bg-red-50"; }
                                    if (badge.level === 'Trés Toxique') { levelColor = "text-red-700"; borderColor = "border-red-300 bg-red-50"; }

                                    return (
                                        <div key={badge.id} className={`px-4 py-3 rounded border text-left flex flex-col gap-1 ${borderColor}`}>
                                            <div className="flex items-center gap-2 font-serif text-xs font-bold text-slate-700">
                                                {getIcon(badge.iconName, "w-4 h-4")} {badge.title}
                                            </div>
                                            <span className={`text-[10px] uppercase tracking-wider font-bold ${levelColor}`}>
                                                {badge.level}
                                            </span>
                                        </div>
                                    );
                                })}
                            </div>
                        </div>

                    </div>
                );
            })()}

        </Layout>
    );
}

export default App;
