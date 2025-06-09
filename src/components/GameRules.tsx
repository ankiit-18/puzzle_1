import React, { useState } from 'react';
import { HelpCircle, X, Brain, Eye, MousePointer, Target, Clock, Trophy } from 'lucide-react';

const GameRules: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      {/* Help Button */}
      <button
        onClick={() => setIsOpen(true)}
        className="fixed bottom-6 right-6 p-4 bg-white/10 backdrop-blur-xl rounded-full border border-white/20 text-white hover:bg-white/20 transition-all duration-300 shadow-2xl hover:scale-110 active:scale-95 z-40"
      >
        <HelpCircle className="w-6 h-6" />
      </button>

      {/* Rules Modal */}
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          {/* Backdrop */}
          <div 
            className="absolute inset-0 bg-black/50 backdrop-blur-sm"
            onClick={() => setIsOpen(false)}
          />
          
          {/* Modal */}
          <div className="relative bg-slate-900/95 backdrop-blur-xl rounded-3xl border border-white/20 p-8 max-w-2xl w-full max-h-[80vh] overflow-y-auto shadow-2xl">
            {/* Header */}
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center gap-3">
                <Brain className="w-8 h-8 text-purple-300" />
                <h2 className="text-2xl font-bold text-white">How to Play Memory Grid</h2>
              </div>
              <button
                onClick={() => setIsOpen(false)}
                className="p-2 rounded-xl bg-white/10 text-white hover:bg-white/20 transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Rules Content */}
            <div className="space-y-6 text-slate-300">
              {/* Game Overview */}
              <div className="bg-white/5 rounded-2xl p-6 border border-white/10">
                <h3 className="text-lg font-semibold text-white mb-3 flex items-center gap-2">
                  <Target className="w-5 h-5 text-purple-300" />
                  Game Objective
                </h3>
                <p className="leading-relaxed">
                  Test and improve your memory by memorizing a sequence of tiles, then recalling them in the exact same order after they've been shuffled.
                </p>
              </div>

              {/* Step 1 */}
              <div className="flex gap-4">
                <div className="flex-shrink-0 w-12 h-12 bg-purple-500/30 rounded-xl flex items-center justify-center">
                  <Brain className="w-6 h-6 text-purple-300" />
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-white mb-2">1. Memorize Phase</h3>
                  <p className="leading-relaxed">
                    Click on each tile in any order you choose. This creates your unique sequence to remember. 
                    Take your time to study the content and create a mental pattern or story to help you remember.
                  </p>
                </div>
              </div>

              {/* Step 2 */}
              <div className="flex gap-4">
                <div className="flex-shrink-0 w-12 h-12 bg-blue-500/30 rounded-xl flex items-center justify-center">
                  <Eye className="w-6 h-6 text-blue-300" />
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-white mb-2">2. Shuffle Phase</h3>
                  <p className="leading-relaxed">
                    After clicking all tiles, they will be automatically shuffled into new positions. 
                    The real challenge begins now - can you remember your sequence?
                  </p>
                </div>
              </div>

              {/* Step 3 */}
              <div className="flex gap-4">
                <div className="flex-shrink-0 w-12 h-12 bg-emerald-500/30 rounded-xl flex items-center justify-center">
                  <MousePointer className="w-6 h-6 text-emerald-300" />
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-white mb-2">3. Recall Phase</h3>
                  <p className="leading-relaxed">
                    Click the tiles in the exact same order you memorized them. One mistake ends the game, 
                    but perfect recall leads to victory and a chance to set a new best time!
                  </p>
                </div>
              </div>

              {/* Game Modes */}
              <div className="bg-white/5 rounded-2xl p-6 border border-white/10">
                <h3 className="text-lg font-semibold text-white mb-3">🎮 Game Modes</h3>
                <div className="space-y-3">
                  <div className="flex items-start gap-3">
                    <div className="w-2 h-2 bg-blue-400 rounded-full mt-2"></div>
                    <div>
                      <span className="font-medium text-blue-300">Photo Mode:</span>
                      <span className="ml-2">Memorize sequences of beautiful images</span>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="w-2 h-2 bg-green-400 rounded-full mt-2"></div>
                    <div>
                      <span className="font-medium text-green-300">Number Mode:</span>
                      <span className="ml-2">Challenge yourself with 4-digit numbers</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Scoring */}
              <div className="bg-white/5 rounded-2xl p-6 border border-white/10">
                <h3 className="text-lg font-semibold text-white mb-3 flex items-center gap-2">
                  <Trophy className="w-5 h-5 text-amber-300" />
                  Scoring & Records
                </h3>
                <div className="space-y-2 text-sm">
                  <div className="flex items-start gap-2">
                    <Clock className="w-4 h-4 text-amber-400 mt-0.5" />
                    <span>Your time is tracked from the start of memorization to completion</span>
                  </div>
                  <div className="flex items-start gap-2">
                    <Trophy className="w-4 h-4 text-amber-400 mt-0.5" />
                    <span>Best times are saved locally for each grid size (2×2 to 5×5)</span>
                  </div>
                  <div className="flex items-start gap-2">
                    <Target className="w-4 h-4 text-amber-400 mt-0.5" />
                    <span>Perfect recall is required - any mistake ends the game</span>
                  </div>
                </div>
              </div>

              {/* Tips */}
              <div className="bg-white/5 rounded-2xl p-6 border border-white/10">
                <h3 className="text-lg font-semibold text-white mb-3">💡 Pro Tips</h3>
                <ul className="space-y-2 text-sm">
                  <li className="flex items-start gap-2">
                    <div className="w-1.5 h-1.5 bg-purple-400 rounded-full mt-2 flex-shrink-0"></div>
                    <span>Start with smaller grids (2×2 or 3×3) to build your memory skills gradually</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <div className="w-1.5 h-1.5 bg-purple-400 rounded-full mt-2 flex-shrink-0"></div>
                    <span>Create mental stories or patterns to help remember sequences</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <div className="w-1.5 h-1.5 bg-purple-400 rounded-full mt-2 flex-shrink-0"></div>
                    <span>Try both photo and number modes to challenge different memory skills</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <div className="w-1.5 h-1.5 bg-purple-400 rounded-full mt-2 flex-shrink-0"></div>
                    <span>Focus on distinctive features when memorizing - colors, shapes, or number patterns</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <div className="w-1.5 h-1.5 bg-purple-400 rounded-full mt-2 flex-shrink-0"></div>
                    <span>If you lose, check the order comparison to see where you went wrong</span>
                  </li>
                </ul>
              </div>

              {/* Memory Techniques */}
              <div className="bg-gradient-to-r from-purple-500/10 to-blue-500/10 rounded-2xl p-6 border border-purple-400/30">
                <h3 className="text-lg font-semibold text-white mb-3">🧠 Memory Techniques</h3>
                <div className="space-y-3 text-sm">
                  <div>
                    <span className="font-medium text-purple-300">Chunking:</span>
                    <span className="ml-2">Group tiles into smaller, manageable chunks</span>
                  </div>
                  <div>
                    <span className="font-medium text-blue-300">Visualization:</span>
                    <span className="ml-2">Create vivid mental images connecting the tiles</span>
                  </div>
                  <div>
                    <span className="font-medium text-emerald-300">Association:</span>
                    <span className="ml-2">Link tiles to familiar objects or concepts</span>
                  </div>
                  <div>
                    <span className="font-medium text-amber-300">Repetition:</span>
                    <span className="ml-2">Mentally rehearse the sequence multiple times</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Created By */}
            <div className="text-center mt-10 text-sm text-slate-400">
              <span className="opacity-70">Created by </span>
              <span className="text-purple-300 font-medium">Ankit Kumar</span>
            </div>

            {/* Close Button */}
            <div className="flex justify-center mt-6">
              <button
                onClick={() => setIsOpen(false)}
                className="px-6 py-3 bg-purple-500/30 hover:bg-purple-500/40 border border-purple-400/50 rounded-xl text-purple-200 font-medium transition-colors"
              >
                Got it! Let's Play
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default GameRules;
