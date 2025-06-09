import React, { useState, useEffect, useCallback } from 'react';
import GameGrid from './components/GameGrid';
import GameControls from './components/GameControls';
import GameStats from './components/GameStats';
import GameRules from './components/GameRules';
import OrderComparison from './components/OrderComparison';
import { useSound } from './hooks/useSound';
import { imageUrls } from './data/imageUrls';
import { Brain, Sparkles, Star } from 'lucide-react';

type GamePhase = 'idle' | 'memorize' | 'recall' | 'complete';
type GameMode = 'photo' | 'number';

interface Tile {
  content: string;
  id: string;
}

function App() {
  const [gridSize, setGridSize] = useState(3);
  const [mode, setMode] = useState<GameMode>('photo');
  const [tiles, setTiles] = useState<Tile[]>([]);
  const [memoryOrder, setMemoryOrder] = useState<string[]>([]);
  const [userOrder, setUserOrder] = useState<string[]>([]);
  const [disabledTiles, setDisabledTiles] = useState<Set<string>>(new Set());
  const [gamePhase, setGamePhase] = useState<GamePhase>('idle');
  const [currentTime, setCurrentTime] = useState(0);
  const [bestTimes, setBestTimes] = useState<{ [key: number]: number }>({});
  const [timerInterval, setTimerInterval] = useState<NodeJS.Timeout | null>(null);
  const [gameResult, setGameResult] = useState<{ won: boolean; message: string } | null>(null);
  const [showOrderComparison, setShowOrderComparison] = useState(false);

  const { playSound } = useSound();

  // Load best times from localStorage
  useEffect(() => {
    const savedTimes: { [key: number]: number } = {};
    for (let size = 2; size <= 5; size++) {
      const saved = localStorage.getItem(`bestTime_${size}`);
      if (saved) {
        savedTimes[size] = parseInt(saved);
      }
    }
    setBestTimes(savedTimes);
  }, []);

  // Timer logic
  useEffect(() => {
    if (gamePhase === 'memorize' || gamePhase === 'recall') {
      const interval = setInterval(() => {
        setCurrentTime(prev => prev + 1);
      }, 1000);
      setTimerInterval(interval);
      return () => clearInterval(interval);
    } else if (timerInterval) {
      clearInterval(timerInterval);
      setTimerInterval(null);
    }
  }, [gamePhase]);

  const generateTiles = useCallback(() => {
    const total = gridSize * gridSize;
    const newTiles: Tile[] = [];

    if (mode === 'photo') {
      const shuffledImages = [...imageUrls].sort(() => Math.random() - 0.5);
      const selectedImages = shuffledImages.slice(0, total);
      selectedImages.forEach((img, index) => {
        newTiles.push({
          content: img,
          id: `photo-${index}`
        });
      });
    } else {
      for (let i = 0; i < total; i++) {
        const num = Math.floor(1000 + Math.random() * 9000);
        newTiles.push({
          content: num.toString(),
          id: `number-${i}`
        });
      }
    }

    return newTiles;
  }, [gridSize, mode]);

  const startGame = useCallback(() => {
    const newTiles = generateTiles();
    setTiles(newTiles);
    setMemoryOrder([]);
    setUserOrder([]);
    setDisabledTiles(new Set());
    setGamePhase('memorize');
    setCurrentTime(0);
    setGameResult(null);
    setShowOrderComparison(false);
  }, [generateTiles]);

  const shuffleTiles = useCallback(() => {
    setTiles(prev => [...prev].sort(() => Math.random() - 0.5));
    setDisabledTiles(new Set());
    setGamePhase('recall');
  }, []);

  const handleTileClick = useCallback((content: string) => {
    playSound('click');

    if (gamePhase === 'memorize') {
      setMemoryOrder(prev => [...prev, content]);
      setDisabledTiles(prev => new Set([...prev, content]));

      // Check if all tiles have been clicked
      if (memoryOrder.length + 1 === tiles.length) {
        setTimeout(() => {
          shuffleTiles();
        }, 500);
      }
    } else if (gamePhase === 'recall') {
      const newUserOrder = [...userOrder, content];
      setUserOrder(newUserOrder);
      setDisabledTiles(prev => new Set([...prev, content]));

      const expectedContent = memoryOrder[newUserOrder.length - 1];

      if (content !== expectedContent) {
        // Game lost
        setGamePhase('complete');
        playSound('lose');
        setGameResult({ 
          won: false, 
          message: `Game Over! You got ${newUserOrder.length - 1} correct.` 
        });
        setShowOrderComparison(true);
      } else if (newUserOrder.length === memoryOrder.length) {
        // Game won
        setGamePhase('complete');
        playSound('win');
        
        // Save best time
        const currentBest = bestTimes[gridSize];
        if (!currentBest || currentTime < currentBest) {
          const newBestTimes = { ...bestTimes, [gridSize]: currentTime };
          setBestTimes(newBestTimes);
          localStorage.setItem(`bestTime_${gridSize}`, currentTime.toString());
        }

        setGameResult({ 
          won: true, 
          message: `Congratulations! Perfect memory!` 
        });
      }
    }
  }, [gamePhase, memoryOrder, userOrder, tiles.length, shuffleTiles, playSound, currentTime, bestTimes, gridSize]);

  return (
    <div className="min-h-screen relative overflow-hidden">
      {/* Sophisticated Background */}
      <div className="fixed inset-0 bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900"></div>
      
      {/* Animated Background Elements */}
      <div className="fixed inset-0">
        {/* Floating orbs */}
        <div className="absolute top-20 left-20 w-72 h-72 bg-purple-500/10 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute top-40 right-32 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl animate-pulse delay-1000"></div>
        <div className="absolute bottom-32 left-1/3 w-80 h-80 bg-indigo-500/10 rounded-full blur-3xl animate-pulse delay-2000"></div>
        
        {/* Subtle pattern overlay */}
        <div className="absolute inset-0 bg-[url('data:image/svg+xml,%3Csvg%20width%3D%2260%22%20height%3D%2260%22%20viewBox%3D%220%200%2060%2060%22%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%3E%3Cg%20fill%3D%22none%22%20fill-rule%3D%22evenodd%22%3E%3Cg%20fill%3D%22%23ffffff%22%20fill-opacity%3D%220.02%22%3E%3Ccircle%20cx%3D%2230%22%20cy%3D%2230%22%20r%3D%221%22%2F%3E%3C%2Fg%3E%3C%2Fg%3E%3C%2Fsvg%3E')] opacity-40"></div>
        
        {/* Gradient mesh overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-black/10"></div>
      </div>
      
      <div className="relative z-10 text-white">
        {/* Elegant Header */}
        <header className="text-center py-12 sm:py-16">
          <div className="flex items-center justify-center gap-4 mb-6">
            <div className="relative">
              <Brain className="w-12 h-12 sm:w-16 sm:h-16 text-purple-300 drop-shadow-lg" />
              <div className="absolute -top-1 -right-1">
                <Star className="w-4 h-4 text-yellow-300 animate-pulse" />
              </div>
            </div>
            <div className="text-center">
              <h1 className="text-5xl sm:text-6xl lg:text-7xl font-light tracking-wide bg-gradient-to-r from-white via-purple-200 to-blue-200 bg-clip-text text-transparent">
                Memory
              </h1>
              <div className="text-2xl sm:text-3xl lg:text-4xl font-extralight tracking-[0.3em] text-purple-300/80 -mt-2">
                GRID
              </div>
            </div>
            <div className="relative">
              <Sparkles className="w-10 h-10 sm:w-14 sm:h-14 text-blue-300 drop-shadow-lg" />
              <div className="absolute -bottom-1 -left-1">
                <Star className="w-3 h-3 text-purple-300 animate-pulse delay-500" />
              </div>
            </div>
          </div>
          <p className="text-lg sm:text-xl text-slate-300 max-w-2xl mx-auto px-4 font-light leading-relaxed">
            Elevate your cognitive abilities with this sophisticated memory challenge
          </p>
          <div className="mt-4 w-24 h-px bg-gradient-to-r from-transparent via-purple-400 to-transparent mx-auto"></div>
        </header>

        {/* Game Stats */}
        <GameStats
          currentTime={currentTime}
          bestTime={bestTimes[gridSize] || null}
          gridSize={gridSize}
          phase={gamePhase}
        />

        {/* Game Controls */}
        <GameControls
          gridSize={gridSize}
          mode={mode}
          onGridSizeChange={setGridSize}
          onModeChange={setMode}
          onStartGame={startGame}
          gameInProgress={gamePhase !== 'idle' && gamePhase !== 'complete'}
        />

        {/* Game Result */}
        {gameResult && (
          <div className="flex justify-center mb-8">
            <div className={`
              relative px-8 py-6 rounded-2xl border font-medium text-lg
              backdrop-blur-xl shadow-2xl
              ${gameResult.won 
                ? 'bg-emerald-500/20 border-emerald-400/50 text-emerald-200' 
                : 'bg-rose-500/20 border-rose-400/50 text-rose-200'
              }
            `}>
              <div className="absolute inset-0 bg-gradient-to-r from-white/5 to-white/10 rounded-2xl"></div>
              <div className="relative flex items-center gap-3">
                {gameResult.won ? (
                  <Star className="w-6 h-6 text-emerald-300" />
                ) : (
                  <div className="w-6 h-6 rounded-full bg-rose-400/30 flex items-center justify-center">
                    <div className="w-3 h-3 rounded-full bg-rose-400"></div>
                  </div>
                )}
                {gameResult.message}
              </div>
            </div>
          </div>
        )}

        {/* Order Comparison - Show when game is lost */}
        {showOrderComparison && !gameResult?.won && (
          <OrderComparison
            expectedOrder={memoryOrder}
            userOrder={userOrder}
            tiles={tiles}
            mode={mode}
            onClose={() => setShowOrderComparison(false)}
          />
        )}

        {/* Game Grid */}
        {tiles.length > 0 && (
          <GameGrid
            size={gridSize}
            tiles={tiles}
            mode={mode}
            onTileClick={handleTileClick}
            disabledTiles={disabledTiles}
          />
        )}

        {/* Elegant Instructions */}
        {gamePhase === 'memorize' && (
          <div className="text-center py-6">
            <div className="inline-flex items-center gap-3 px-6 py-3 bg-amber-500/20 border border-amber-400/30 rounded-full backdrop-blur-xl">
              <div className="w-2 h-2 bg-amber-400 rounded-full animate-pulse"></div>
              <p className="text-amber-200 font-medium">
                Memorize the sequence ({memoryOrder.length}/{tiles.length})
              </p>
            </div>
          </div>
        )}

        {gamePhase === 'recall' && (
          <div className="text-center py-6">
            <div className="inline-flex items-center gap-3 px-6 py-3 bg-emerald-500/20 border border-emerald-400/30 rounded-full backdrop-blur-xl">
              <div className="w-2 h-2 bg-emerald-400 rounded-full animate-pulse"></div>
              <p className="text-emerald-200 font-medium">
                Recall the sequence ({userOrder.length}/{memoryOrder.length})
              </p>
            </div>
          </div>
        )}
      </div>

      {/* Game Rules */}
      <GameRules />
    </div>
  );
}

export default App;