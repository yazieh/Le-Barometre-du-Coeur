import React, { useState } from 'react';
import { QuestionSpectrum } from '../types';
import { Ghost } from 'lucide-react';

interface QuizSpectrumProps {
  data: QuestionSpectrum;
  onAnswer: (score: number) => void;
  disabled: boolean;
}

export const QuizSpectrum: React.FC<QuizSpectrumProps> = ({ data, onAnswer, disabled }) => {
  const [value, setValue] = useState<number>(3);

  const handleConfirm = () => {
    if (!disabled) onAnswer(value);
  };

  const handleSkip = () => {
    if (!disabled) onAnswer(3);
  };

  return (
    <div className="w-full max-w-3xl mx-auto">
      <div className="relative bg-white/80 backdrop-blur-md rounded-xl p-1 border border-indigo-200 shadow-[0_10px_40px_rgba(99,102,241,0.1)]">
        {/* Ornamental Corners - Purple/Gold */}
        <div className="absolute -top-1 -left-1 w-6 h-6 border-t-2 border-l-2 border-indigo-300 z-10 rounded-tl-lg"></div>
        <div className="absolute -top-1 -right-1 w-6 h-6 border-t-2 border-r-2 border-indigo-300 z-10 rounded-tr-lg"></div>
        <div className="absolute -bottom-1 -left-1 w-6 h-6 border-b-2 border-l-2 border-indigo-300 z-10 rounded-bl-lg"></div>
        <div className="absolute -bottom-1 -right-1 w-6 h-6 border-b-2 border-r-2 border-indigo-300 z-10 rounded-br-lg"></div>

        <div className="bg-white/90 rounded-lg p-8 md:p-12 flex flex-col items-center relative overflow-hidden">
             {/* Background Texture Overlay */}
             <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cream-paper.png')] opacity-50 pointer-events-none"></div>

            <h3 className="text-sm font-serif tracking-[0.3em] text-indigo-400 uppercase mb-10 opacity-90 font-bold">
              Le Spectrum — Question {data.id}
            </h3>

            <div className="w-full mb-12 relative z-10">
              {/* Labels */}
              <div className="flex justify-between items-end mb-10 text-sm md:text-lg font-serif">
                <div className={`w-1/2 pr-4 text-left transition-all duration-300 ${value <= 2 ? 'text-emerald-600 font-bold' : 'text-slate-400'}`}>
                  {data.leftLabel}
                </div>
                <div className={`w-1/2 pl-4 text-right transition-all duration-300 ${value >= 4 ? 'text-rose-600 font-bold' : 'text-slate-400'}`}>
                  {data.rightLabel}
                </div>
              </div>

              {/* Slider Track Component - Pure CSS Alignment */}
              <div className="relative h-16 w-full max-w-xl mx-auto"> 
                 {/* The visual line - Centered vertically */}
                 <div className="absolute left-0 right-0 top-1/2 -translate-y-1/2 h-1 bg-slate-200 rounded-full"></div>
                 <div className="absolute left-0 right-0 top-1/2 -translate-y-1/2 h-1 bg-gradient-to-r from-emerald-400 via-indigo-300 to-rose-400 opacity-60 rounded-full"></div>
                 
                 {/* Clicks Container - Absolute positioning based on percentage for perfect symmetry */}
                 {[1, 2, 3, 4, 5].map((tick, index) => {
                    const positionPercent = index * 25; // 0, 25, 50, 75, 100
                    return (
                      <div 
                        key={tick}
                        onClick={() => !disabled && setValue(tick)}
                        className="absolute top-0 h-full w-12 -ml-6 cursor-pointer group flex flex-col items-center justify-center"
                        style={{ left: `${positionPercent}%` }}
                      >
                         {/* Tick mark */}
                         <div className={`w-3 h-3 rotate-45 transition-all duration-300 z-10 rounded-sm ${Math.abs(value - tick) < 0.1 ? 'bg-indigo-600 scale-125' : 'bg-slate-300 group-hover:bg-slate-400'}`}></div>
                         
                         {/* Number Label */}
                         <span className={`absolute top-12 text-xs font-serif font-bold transition-all duration-300 ${value === tick ? 'text-indigo-600 -translate-y-1' : 'text-slate-400 group-hover:text-slate-500'}`}>
                           {tick}
                         </span>
                      </div>
                    );
                 })}

                 {/* Magical Cursor (Thumb) - Perfectly aligned via matching percentages */}
                 <div 
                    className="absolute top-1/2 -translate-y-1/2 w-8 h-8 -ml-4 pointer-events-none transition-all duration-500 cubic-bezier(0.34, 1.56, 0.64, 1) flex items-center justify-center z-20"
                    style={{ left: `${(value - 1) * 25}%` }}
                 >
                    <div className={`
                        w-6 h-6 rotate-45 border-2 shadow-lg transition-colors duration-300 bg-white
                        ${value <= 2 ? 'border-emerald-500 text-emerald-500 shadow-emerald-200' : 
                          value >= 4 ? 'border-rose-500 text-rose-500 shadow-rose-200' : 
                          'border-indigo-500 text-indigo-500 shadow-indigo-200'}
                    `}>
                        <div className="w-2 h-2 bg-current absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full"></div>
                    </div>
                 </div>
              </div>
            </div>

            <button
              onClick={handleConfirm}
              disabled={disabled}
              className={`
                mt-4 px-12 py-4 font-serif font-bold text-lg uppercase tracking-widest rounded transition-all duration-300 relative overflow-hidden group border
                ${disabled 
                    ? 'bg-slate-100 text-slate-400 border-slate-200 cursor-not-allowed' 
                    : 'bg-white text-indigo-900 border-indigo-200 hover:shadow-[0_4px_20px_rgba(99,102,241,0.2)] hover:border-indigo-400'
                }
              `}
            >
              <span className="relative z-10">Confirmer le Destin</span>
              {!disabled && <div className="absolute inset-0 bg-indigo-50 transform scale-x-0 group-hover:scale-x-100 transition-transform origin-left duration-300"></div>}
            </button>

            {/* Skip Option */}
            <button
              onClick={handleSkip}
              disabled={disabled}
              className="mt-6 text-slate-400 text-sm hover:text-indigo-500 flex items-center gap-2 transition-colors"
            >
              <Ghost className="w-4 h-4" />
              L'esprit reste muet (Neutre)
            </button>
        </div>
      </div>
    </div>
  );
};