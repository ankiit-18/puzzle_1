import React from 'react';

interface Tile {
  content: string;
  id: string;
}

interface GameGridProps {
  size: number;
  tiles: Tile[];
  mode: 'photo' | 'number';
  onTileClick: (content: string) => void;
  disabledTiles: Set<string>;
}

const GameGrid: React.FC<GameGridProps> = ({ 
  size, 
  tiles, 
  mode, 
  onTileClick, 
  disabledTiles 
}) => {
  const gridCols = {
    2: 'grid-cols-2',
    3: 'grid-cols-3',
    4: 'grid-cols-4',
    5: 'grid-cols-5'
  };

  const tileSize = {
    2: 'w-32 h-32 sm:w-40 sm:h-40',
    3: 'w-24 h-24 sm:w-32 sm:h-32',
    4: 'w-20 h-20 sm:w-24 sm:h-24',
    5: 'w-16 h-16 sm:w-20 sm:h-20'
  };

  return (
    <div className="flex justify-center px-4 mb-8">
      <div className={`
        grid gap-3 sm:gap-4 p-6 sm:p-8 
        bg-white/5 backdrop-blur-xl rounded-3xl border border-white/10
        shadow-2xl
        ${gridCols[size as keyof typeof gridCols]}
      `}>
        {tiles.map((tile) => {
          const isDisabled = disabledTiles.has(tile.content);
          
          return (
            <button
              key={tile.id}
              onClick={() => !isDisabled && onTileClick(tile.content)}
              disabled={isDisabled}
              className={`
                ${tileSize[size as keyof typeof tileSize]}
                relative overflow-hidden rounded-2xl border-2
                transition-all duration-300 ease-out
                ${isDisabled 
                  ? 'border-emerald-400/50 bg-emerald-500/20 scale-95 opacity-60' 
                  : 'border-white/20 bg-white/10 hover:bg-white/20 hover:border-white/40 hover:scale-105 active:scale-95'
                }
                backdrop-blur-sm shadow-lg hover:shadow-xl
                group
              `}
            >
              {/* Tile Content */}
              {mode === 'photo' ? (
                <img
                  src={tile.content}
                  alt="Memory tile"
                  className="w-full h-full object-cover"
                />
              ) : (
                <div className="w-full h-full flex items-center justify-center">
                  <span className="text-lg sm:text-xl font-bold text-white group-hover:text-purple-200 transition-colors">
                    {tile.content}
                  </span>
                </div>
              )}
              
              {/* Overlay effects */}
              <div className="absolute inset-0 bg-gradient-to-br from-white/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>
              
              {/* Disabled state overlay */}
              {isDisabled && (
                <div className="absolute inset-0 bg-emerald-400/20 flex items-center justify-center">
                  <div className="w-6 h-6 bg-emerald-400 rounded-full flex items-center justify-center">
                    <div className="w-2 h-2 bg-white rounded-full"></div>
                  </div>
                </div>
              )}
            </button>
          );
        })}
      </div>
    </div>
  );
};

export default GameGrid;