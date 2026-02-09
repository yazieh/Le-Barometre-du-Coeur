import React from 'react';
import { QuestionMCQ } from '../types';
import { Ghost } from 'lucide-react';

interface QuizMCQProps {
  data: QuestionMCQ;
  onAnswer: (score: number) => void;
  disabled: boolean;
}

export const QuizMCQ: React.FC<QuizMCQProps> = ({ data, onAnswer, disabled }) => {
  return (
    <div className="w-full max-w-3xl mx-auto perspective-1000">
      <div className="relative bg-white/80 backdrop-blur-md rounded-xl p-1 border border-rose-200 shadow-[0_10px_40px_rgba(244,63,94,0.1)]">
        {/* Ornamental Corners - Gold */}
        <div className="absolute -top-1 -left-1 w-6 h-6 border-t-2 border-l-2 border-amber-400 z-10 rounded-tl-lg"></div>
        <div className="absolute -top-1 -right-1 w-6 h-6 border-t-2 border-r-2 border-amber-400 z-10 rounded-tr-lg"></div>
        <div className="absolute -bottom-1 -left-1 w-6 h-6 border-b-2 border-l-2 border-amber-400 z-10 rounded-bl-lg"></div>
        <div className="absolute -bottom-1 -right-1 w-6 h-6 border-b-2 border-r-2 border-amber-400 z-10 rounded-br-lg"></div>

        <div className="bg-white/90 rounded-lg p-6 md:p-10 relative overflow-hidden">
            {/* Background Texture Overlay */}
            <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cream-paper.png')] opacity-50 pointer-events-none"></div>
            
            <h3 className="relative text-xl md:text-3xl font-serif font-bold text-slate-800 mb-8 leading-relaxed text-center">
              <span className="block text-sm text-rose-500 tracking-[0.3em] uppercase mb-4 font-normal">Question {data.id}</span>
              {data.question}
            </h3>

            <div className="space-y-4 relative z-10">
              {data.options.map((option, idx) => (
                <button
                  key={option.id}
                  onClick={() => !disabled && onAnswer(option.score)}
                  disabled={disabled}
                  className={`
                    w-full text-left p-5 rounded-lg border transition-all duration-300 group flex items-center relative overflow-hidden
                    ${disabled 
                        ? 'opacity-50 cursor-not-allowed border-slate-200 bg-slate-50' 
                        : 'bg-white border-rose-100 hover:border-rose-300 hover:bg-rose-50 hover:shadow-md hover:-translate-y-0.5'
                    }
                  `}
                >
                  <div className={`
                    flex-shrink-0 w-10 h-10 rounded-full border-2 flex items-center justify-center mr-6 font-serif font-bold text-lg transition-colors
                    ${disabled ? 'border-slate-200 text-slate-400' : 'border-rose-200 text-rose-400 group-hover:border-rose-500 group-hover:text-rose-600 group-hover:bg-white'}
                  `}>
                    {option.id}
                  </div>
                  <span className={`text-lg font-medium transition-colors ${disabled ? 'text-slate-400' : 'text-slate-700 group-hover:text-rose-900'}`}>
                    {option.text}
                  </span>
                </button>
              ))}
            </div>

            {/* Skip Option */}
            <div className="mt-8 flex justify-center">
              <button
                onClick={() => !disabled && onAnswer(1)}
                disabled={disabled}
                className="text-slate-400 text-sm hover:text-rose-500 flex items-center gap-2 transition-colors py-2 px-4 rounded hover:bg-rose-50/50"
              >
                <Ghost className="w-4 h-4" />
                Passer cette question (Réponse Neutre)
              </button>
            </div>
        </div>
      </div>
    </div>
  );
};