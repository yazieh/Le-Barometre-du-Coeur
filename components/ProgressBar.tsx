import React from 'react';

interface ProgressBarProps {
  current: number;
  total: number;
  label?: string;
}

export const ProgressBar: React.FC<ProgressBarProps> = ({ current, total, label }) => {
  const percentage = Math.min(100, Math.max(0, (current / total) * 100));
  
  return (
    <div className="w-full max-w-2xl mx-auto mb-8">
      <div className="flex justify-between text-xs uppercase tracking-[0.2em] text-rose-800/60 mb-2 font-bold font-serif">
        <span>{label || 'Quête en cours'}</span>
        <span>{current} / {total}</span>
      </div>
      <div className="h-3 w-full bg-white rounded-full border border-rose-200 relative shadow-inner">
        {/* Glow effect */}
        <div 
          className="absolute top-0 left-0 h-full bg-rose-300 blur-[2px] opacity-60 transition-all duration-700 ease-out rounded-full"
          style={{ width: `${percentage}%` }}
        />
        <div 
          className="relative h-full bg-gradient-to-r from-rose-400 via-rose-500 to-amber-400 rounded-full transition-all duration-700 ease-out"
          style={{ width: `${percentage}%` }}
        >
            <div className="absolute top-0 right-0 h-full w-2 bg-white/40 skew-x-[-20deg]"></div>
        </div>
      </div>
    </div>
  );
};