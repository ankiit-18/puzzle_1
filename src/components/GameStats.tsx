import React from 'react';
import { Clock, Trophy, Target } from 'lucide-react';

interface GameStatsProps {
  currentTime: number;
  bestTime: number | null;
  gridSize: number;
  phase: 'idle' | 'memorize' | 'recall' | 'complete';
}

const GameStats: React.FC<GameStatsProps> = ({ 
  currentTime, 
  bestTime, 
  gridSize, 
  phase 
}) => {
  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  const isGameActive = phase === 'memorize' || phase === 'recall';

  return (
    <div className="flex justify-center mb-8 px-4">
      <div className="flex flex-col sm:flex-row gap-4 sm:gap-6">
        {/* Current Time */}
        <div className="bg-white/5 backdrop-blur-xl rounded-2xl border border-white/10 px-6 py-4 shadow-xl">
          <div className="flex items-center gap-3">
            <div className={`
              p-2 rounded-xl transition-colors duration-300
              ${isGameActive ? 'bg-blue-500/30 text-blue-300' : 'bg-white/10 text-slate-400'}
            `}>
              <Clock className="w-5 h-5" />
            </div>
            <div>
              <div className="text-sm text-slate-400 font-medium">Current Time</div>
              <div className={`
                text-xl font-bold transition-colors duration-300
                ${isGameActive ? 'text-blue-200' : 'text-slate-300'}
              `}>
                {formatTime(currentTime)}
              </div>
            </div>
          </div>
        </div>

        {/* Best Time */}
        <div className="bg-white/5 backdrop-blur-xl rounded-2xl border border-white/10 px-6 py-4 shadow-xl">
          <div className="flex items-center gap-3">
            <div className={`
              p-2 rounded-xl transition-colors duration-300
              ${bestTime ? 'bg-amber-500/30 text-amber-300' : 'bg-white/10 text-slate-400'}
            `}>
              <Trophy className="w-5 h-5" />
            </div>
            <div>
              <div className="text-sm text-slate-400 font-medium">Best Time ({gridSize}×{gridSize})</div>
              <div className={`
                text-xl font-bold transition-colors duration-300
                ${bestTime ? 'text-amber-200' : 'text-slate-500'}
              `}>
                {bestTime ? formatTime(bestTime) : '--:--'}
              </div>
            </div>
          </div>
        </div>

        {/* Grid Info */}
        <div className="bg-white/5 backdrop-blur-xl rounded-2xl border border-white/10 px-6 py-4 shadow-xl">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-xl bg-purple-500/30 text-purple-300">
              <Target className="w-5 h-5" />
            </div>
            <div>
              <div className="text-sm text-slate-400 font-medium">Challenge</div>
              <div className="text-xl font-bold text-purple-200">
                {gridSize * gridSize} Tiles
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default GameStats;