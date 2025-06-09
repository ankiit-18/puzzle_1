import React from 'react';
import { Play, Grid, Image, Hash } from 'lucide-react';

interface GameControlsProps {
  gridSize: number;
  mode: 'photo' | 'number';
  onGridSizeChange: (size: number) => void;
  onModeChange: (mode: 'photo' | 'number') => void;
  onStartGame: () => void;
  gameInProgress: boolean;
}

const GameControls: React.FC<GameControlsProps> = ({
  gridSize,
  mode,
  onGridSizeChange,
  onModeChange,
  onStartGame,
  gameInProgress
}) => {
  return (
    <div className="flex flex-col items-center gap-6 mb-8 px-4">
      {/* Control Panel */}
      <div className="bg-white/5 backdrop-blur-xl rounded-2xl border border-white/10 p-6 shadow-2xl">
        <div className="flex flex-col sm:flex-row items-center gap-6">
          {/* Grid Size Control */}
          <div className="flex flex-col items-center gap-3">
            <div className="flex items-center gap-2 text-slate-300">
              <Grid className="w-5 h-5" />
              <span className="font-medium">Grid Size</span>
            </div>
            <div className="flex gap-2">
              {[2, 3, 4, 5].map((size) => (
                <button
                  key={size}
                  onClick={() => onGridSizeChange(size)}
                  disabled={gameInProgress}
                  className={`
                    w-12 h-12 rounded-xl border-2 font-bold transition-all duration-200
                    ${gridSize === size
                      ? 'border-purple-400 bg-purple-500/30 text-purple-200 shadow-lg'
                      : 'border-white/20 bg-white/10 text-white hover:border-white/40 hover:bg-white/20'
                    }
                    ${gameInProgress ? 'opacity-50 cursor-not-allowed' : 'hover:scale-105 active:scale-95'}
                  `}
                >
                  {size}×{size}
                </button>
              ))}
            </div>
          </div>

          {/* Mode Control */}
          <div className="flex flex-col items-center gap-3">
            <div className="flex items-center gap-2 text-slate-300">
              <span className="font-medium">Mode</span>
            </div>
            <div className="flex gap-2">
              <button
                onClick={() => onModeChange('photo')}
                disabled={gameInProgress}
                className={`
                  flex items-center gap-2 px-4 py-3 rounded-xl border-2 font-medium transition-all duration-200
                  ${mode === 'photo'
                    ? 'border-blue-400 bg-blue-500/30 text-blue-200 shadow-lg'
                    : 'border-white/20 bg-white/10 text-white hover:border-white/40 hover:bg-white/20'
                  }
                  ${gameInProgress ? 'opacity-50 cursor-not-allowed' : 'hover:scale-105 active:scale-95'}
                `}
              >
                <Image className="w-4 h-4" />
                Photos
              </button>
              <button
                onClick={() => onModeChange('number')}
                disabled={gameInProgress}
                className={`
                  flex items-center gap-2 px-4 py-3 rounded-xl border-2 font-medium transition-all duration-200
                  ${mode === 'number'
                    ? 'border-blue-400 bg-blue-500/30 text-blue-200 shadow-lg'
                    : 'border-white/20 bg-white/10 text-white hover:border-white/40 hover:bg-white/20'
                  }
                  ${gameInProgress ? 'opacity-50 cursor-not-allowed' : 'hover:scale-105 active:scale-95'}
                `}
              >
                <Hash className="w-4 h-4" />
                Numbers
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Start Game Button */}
      <button
        onClick={onStartGame}
        disabled={gameInProgress}
        className={`
          flex items-center gap-3 px-8 py-4 rounded-2xl border-2 font-bold text-lg
          transition-all duration-300 shadow-2xl
          ${gameInProgress
            ? 'border-gray-500 bg-gray-600/30 text-gray-400 cursor-not-allowed opacity-50'
            : 'border-emerald-400 bg-emerald-500/30 text-emerald-200 hover:bg-emerald-500/40 hover:border-emerald-300 hover:scale-105 active:scale-95'
          }
          backdrop-blur-xl
        `}
      >
        <Play className="w-6 h-6" />
        {gameInProgress ? 'Game in Progress...' : 'Start New Game'}
      </button>
    </div>
  );
};

export default GameControls;