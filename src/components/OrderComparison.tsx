import React from 'react';
import { X, CheckCircle, XCircle, ArrowRight } from 'lucide-react';

interface Tile {
  content: string;
  id: string;
}

interface OrderComparisonProps {
  expectedOrder: string[];
  userOrder: string[];
  tiles: Tile[];
  mode: 'photo' | 'number';
  onClose: () => void;
}

const OrderComparison: React.FC<OrderComparisonProps> = ({
  expectedOrder,
  userOrder,
  tiles,
  mode,
  onClose
}) => {
  const getTileById = (content: string) => {
    return tiles.find(tile => tile.content === content);
  };

  const renderTileContent = (content: string, index: number, isCorrect?: boolean) => {
    const tile = getTileById(content);
    if (!tile) return null;

    return (
      <div className={`
        relative w-16 h-16 sm:w-20 sm:h-20 rounded-xl border-2 overflow-hidden
        ${isCorrect === true ? 'border-emerald-400 bg-emerald-500/20' : 
          isCorrect === false ? 'border-rose-400 bg-rose-500/20' : 
          'border-white/30 bg-white/10'}
        backdrop-blur-sm shadow-lg
      `}>
        {mode === 'photo' ? (
          <img
            src={content}
            alt={`Tile ${index + 1}`}
            className="w-full h-full object-cover"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center">
            <span className="text-sm font-bold text-white">
              {content}
            </span>
          </div>
        )}
        
        {/* Position number */}
        <div className="absolute -top-2 -left-2 w-6 h-6 bg-slate-800 border border-white/30 rounded-full flex items-center justify-center">
          <span className="text-xs font-bold text-white">{index + 1}</span>
        </div>

        {/* Correct/Incorrect indicator */}
        {isCorrect !== undefined && (
          <div className="absolute -top-1 -right-1">
            {isCorrect ? (
              <CheckCircle className="w-5 h-5 text-emerald-400" />
            ) : (
              <XCircle className="w-5 h-5 text-rose-400" />
            )}
          </div>
        )}
      </div>
    );
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-black/50 backdrop-blur-sm"
        onClick={onClose}
      />
      
      {/* Modal */}
      <div className="relative bg-slate-900/95 backdrop-blur-xl rounded-3xl border border-white/20 p-6 sm:p-8 max-w-4xl w-full max-h-[80vh] overflow-y-auto shadow-2xl">
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-3">
            <XCircle className="w-8 h-8 text-rose-300" />
            <h2 className="text-2xl font-bold text-white">Order Comparison</h2>
          </div>
          <button
            onClick={onClose}
            className="p-2 rounded-xl bg-white/10 text-white hover:bg-white/20 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Comparison Content */}
        <div className="space-y-8">
          {/* Expected Order */}
          <div>
            <h3 className="text-lg font-semibold text-emerald-300 mb-4 flex items-center gap-2">
              <CheckCircle className="w-5 h-5" />
              Expected Order (Your Memorized Sequence)
            </h3>
            <div className="flex flex-wrap gap-3 p-4 bg-emerald-500/10 border border-emerald-400/30 rounded-2xl">
              {expectedOrder.map((content, index) => renderTileContent(content, index))}
            </div>
          </div>

          {/* Arrow */}
          <div className="flex justify-center">
            <div className="flex items-center gap-2 text-slate-400">
              <div className="w-8 h-px bg-slate-400"></div>
              <ArrowRight className="w-6 h-6" />
              <div className="w-8 h-px bg-slate-400"></div>
            </div>
          </div>

          {/* User Order */}
          <div>
            <h3 className="text-lg font-semibold text-rose-300 mb-4 flex items-center gap-2">
              <XCircle className="w-5 h-5" />
              Your Order (What You Clicked)
            </h3>
            <div className="flex flex-wrap gap-3 p-4 bg-rose-500/10 border border-rose-400/30 rounded-2xl">
              {userOrder.map((content, index) => {
                const isCorrect = index < expectedOrder.length && content === expectedOrder[index];
                return renderTileContent(content, index, isCorrect);
              })}
            </div>
          </div>

          {/* Analysis */}
          <div className="bg-white/5 rounded-2xl p-6 border border-white/10">
            <h3 className="text-lg font-semibold text-white mb-3">📊 Analysis</h3>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-sm">
              <div className="text-center p-3 bg-emerald-500/20 rounded-xl border border-emerald-400/30">
                <div className="text-2xl font-bold text-emerald-300">
                  {userOrder.filter((content, index) => content === expectedOrder[index]).length}
                </div>
                <div className="text-emerald-200">Correct</div>
              </div>
              <div className="text-center p-3 bg-rose-500/20 rounded-xl border border-rose-400/30">
                <div className="text-2xl font-bold text-rose-300">
                  {userOrder.length - userOrder.filter((content, index) => content === expectedOrder[index]).length}
                </div>
                <div className="text-rose-200">Incorrect</div>
              </div>
              <div className="text-center p-3 bg-blue-500/20 rounded-xl border border-blue-400/30">
                <div className="text-2xl font-bold text-blue-300">
                  {Math.round((userOrder.filter((content, index) => content === expectedOrder[index]).length / expectedOrder.length) * 100)}%
                </div>
                <div className="text-blue-200">Accuracy</div>
              </div>
            </div>
          </div>

          {/* Tips */}
          <div className="bg-white/5 rounded-2xl p-6 border border-white/10">
            <h3 className="text-lg font-semibold text-white mb-3">💡 Tips for Next Time</h3>
            <ul className="space-y-2 text-sm text-slate-300">
              <li className="flex items-start gap-2">
                <div className="w-1.5 h-1.5 bg-purple-400 rounded-full mt-2 flex-shrink-0"></div>
                <span>Try creating a story or pattern to connect the tiles in your memorized order</span>
              </li>
              <li className="flex items-start gap-2">
                <div className="w-1.5 h-1.5 bg-purple-400 rounded-full mt-2 flex-shrink-0"></div>
                <span>Focus on distinctive features of each tile to make them more memorable</span>
              </li>
              <li className="flex items-start gap-2">
                <div className="w-1.5 h-1.5 bg-purple-400 rounded-full mt-2 flex-shrink-0"></div>
                <span>Practice with smaller grids first to build your memory skills</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Close Button */}
        <div className="flex justify-center mt-8">
          <button
            onClick={onClose}
            className="px-6 py-3 bg-white/10 hover:bg-white/20 border border-white/20 rounded-xl text-white font-medium transition-colors"
          >
            Try Again
          </button>
        </div>
      </div>
    </div>
  );
};

export default OrderComparison;