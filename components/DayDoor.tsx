import React from 'react';
import { Lock, Gift, Star } from 'lucide-react';

interface DayDoorProps {
  day: number;
  isOpen: boolean;
  isLocked: boolean;
  onOpen: (day: number) => void;
}

const DayDoor: React.FC<DayDoorProps> = ({ day, isOpen, isLocked, onOpen }) => {
  const handleClick = () => {
    if (!isLocked) {
      onOpen(day);
    }
  };

  return (
    <div
      onClick={handleClick}
      className={`
        relative aspect-square cursor-pointer transition-all duration-500 transform
        ${isLocked ? 'opacity-70 cursor-not-allowed' : 'hover:scale-105 hover:z-10 hover:shadow-[0_0_20px_rgba(248,178,41,0.5)]'}
        ${isOpen ? 'rotate-y-180' : ''}
        perspective-1000 group
      `}
      style={{ perspective: '1000px' }}
    >
      {/* Front of the Door (Closed) */}
      <div 
        className={`
          absolute inset-0 w-full h-full flex flex-col items-center justify-center
          rounded-xl border-2 shadow-xl backface-hidden transition-all duration-500
          ${isOpen ? 'opacity-0 rotate-y-180 pointer-events-none' : 'opacity-100 rotate-y-0'}
          ${isLocked 
            ? 'bg-slate-800 border-slate-700 text-slate-500' 
            : 'bg-gradient-to-br from-xmas-red to-red-800 border-xmas-gold text-xmas-gold'}
        `}
      >
        <span className="font-serif text-3xl md:text-4xl font-bold drop-shadow-md">
          {day}
        </span>
        {isLocked && <Lock className="w-5 h-5 mt-2 opacity-50" />}
        {!isLocked && !isOpen && (
          <div className="mt-2 animate-bounce-slow">
             <Star className="w-5 h-5 text-xmas-gold fill-xmas-gold" />
          </div>
        )}
      </div>

      {/* Back of the Door (Open/Revealed State Placeholder) */}
      {/* 
         We don't actually render the back content here physically because we use a Modal for the big reveal.
         However, visually, once "opened", we show a "claimed" state in the grid.
      */}
      <div 
         className={`
          absolute inset-0 w-full h-full flex items-center justify-center
          rounded-xl border-2 border-emerald-600 bg-emerald-900/80 backdrop-blur-sm
          shadow-inner backface-hidden transition-all duration-500
          ${isOpen ? 'opacity-100 rotate-y-0' : 'opacity-0 rotate-y-180'}
        `}
      >
        <Gift className="w-8 h-8 text-emerald-300 animate-pulse" />
        <span className="sr-only">已開啟</span>
      </div>
    </div>
  );
};

export default DayDoor;
