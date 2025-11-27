import React, { useEffect, useState } from 'react';
import { X, Sparkles, Coffee, Gift } from 'lucide-react';
import { DayContent, LoadingState } from '../types';
import { generateDayContent } from '../services/gemini';

interface ContentModalProps {
  day: number | null;
  onClose: () => void;
  cachedContent?: DayContent;
  onContentGenerated: (day: number, content: DayContent) => void;
}

const ContentModal: React.FC<ContentModalProps> = ({ day, onClose, cachedContent, onContentGenerated }) => {
  const [status, setStatus] = useState<LoadingState>(LoadingState.IDLE);
  const [content, setContent] = useState<DayContent | null>(null);

  useEffect(() => {
    if (day === null) return;

    // Use cached content if available
    if (cachedContent) {
      setContent(cachedContent);
      setStatus(LoadingState.SUCCESS);
      return;
    }

    // Otherwise generate new content
    const fetchContent = async () => {
      setStatus(LoadingState.LOADING);
      try {
        const data = await generateDayContent(day);
        setContent(data);
        setStatus(LoadingState.SUCCESS);
        onContentGenerated(day, data);
      } catch (e) {
        setStatus(LoadingState.ERROR);
      }
    };

    fetchContent();
  }, [day, cachedContent, onContentGenerated]);

  if (day === null) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-black/70 backdrop-blur-sm transition-opacity" 
        onClick={onClose}
      />

      {/* Modal Card */}
      <div className="relative bg-xmas-cream text-xmas-night w-full max-w-md rounded-2xl shadow-[0_0_50px_rgba(248,178,41,0.3)] overflow-hidden transform transition-all scale-100 border-4 border-xmas-gold">
        
        {/* Decorative header */}
        <div className="bg-xmas-red p-4 flex justify-between items-center border-b-4 border-xmas-gold">
          <h2 className="text-xmas-gold font-serif text-2xl font-bold flex items-center gap-2">
            <Sparkles className="w-6 h-6 animate-spin-slow" />
            12月 {day} 日
          </h2>
          <button 
            onClick={onClose}
            className="text-xmas-gold hover:text-white transition-colors bg-black/20 rounded-full p-1"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        <div className="p-8 min-h-[300px] flex flex-col items-center justify-center text-center">
          
          {status === LoadingState.LOADING && (
            <div className="flex flex-col items-center gap-4 animate-pulse">
              <Gift className="w-16 h-16 text-xmas-green animate-bounce" />
              <p className="font-sans text-lg text-xmas-green">正在為您準備聖誕驚喜...</p>
              <p className="text-sm text-slate-500">Gemini AI 正在思考中</p>
            </div>
          )}

          {status === LoadingState.ERROR && (
            <div className="text-center">
              <p className="text-xmas-red font-bold text-xl mb-2">哎呀！雪橇好像卡住了。</p>
              <p>請稍後再試。</p>
              <button 
                onClick={onClose} 
                className="mt-4 px-4 py-2 bg-xmas-green text-white rounded-full font-bold"
              >
                關閉
              </button>
            </div>
          )}

          {status === LoadingState.SUCCESS && content && (
            <div className="space-y-6 animate-float">
              <h3 className="text-2xl font-serif font-bold text-xmas-green tracking-wide border-b-2 border-xmas-gold/30 pb-2 inline-block">
                {content.title}
              </h3>
              
              <p className="font-sans text-lg leading-relaxed text-slate-800">
                {content.message}
              </p>

              <div className="bg-white/50 rounded-xl p-4 mt-4 border border-xmas-gold/30 w-full">
                <div className="flex items-center justify-center gap-2 text-xmas-red font-bold mb-2">
                   <Coffee className="w-5 h-5" />
                   <span>今日小任務</span>
                </div>
                <p className="text-slate-700 italic">
                  "{content.activity}"
                </p>
              </div>
            </div>
          )}
        </div>
        
        {/* Footer decorations */}
        <div className="h-4 bg-stripes-red-green w-full" style={{
            backgroundImage: 'repeating-linear-gradient(45deg, #D42426, #D42426 10px, #165B33 10px, #165B33 20px)'
        }}></div>
      </div>
    </div>
  );
};

export default ContentModal;