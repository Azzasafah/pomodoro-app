import React from 'react';
import { BookOpen, Coffee, Moon, Play, Pause, RotateCcw } from 'lucide-react';
import type { TimerMode, ThemeColors } from '@/types/pomodoro';

interface TimerDisplayProps {
  mode: TimerMode;
  timeLeft: number;
  isActive: boolean;
  progress: number;
  theme: ThemeColors;
  themeMode?: 'dark' | 'light';
  onModeChange: (newMode: TimerMode) => void;
  onToggleTimer: () => void;
  onResetTimer: () => void;
}

export const TimerDisplay: React.FC<TimerDisplayProps> = ({
  mode,
  timeLeft,
  isActive,
  progress,
  theme,
  themeMode = 'dark',
  onModeChange,
  onToggleTimer,
  onResetTimer
}) => {
  const isLight = themeMode === 'light';

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const getStatusText = () => {
    if (!isActive) return 'Paused / Siap';
    if (mode === 'work') return 'Sesi Fokus Berjalan';
    if (mode === 'shortBreak') return 'Rehat Pendek (Zatsudan)';
    return 'AFK / Rehat Panjang';
  };

  return (
    <div
      className={`rounded-[32px] p-6 sm:p-8 md:p-10 relative z-20 flex flex-col items-center max-w-md w-full mb-12 sm:mb-0 transition-all ${
        isLight
          ? 'bg-white/92 backdrop-blur-xl border border-purple-200/80 shadow-[0_20px_45px_rgba(147,112,219,0.15)] text-gray-900'
          : 'bg-[#1a1625]/90 backdrop-blur-xl border border-white/15 shadow-[0_20px_50px_rgba(0,0,0,0.6)] text-white'
      }`}
    >
      {/* Tabs Mode */}
      <div
        className={`flex gap-2 mb-6 p-1.5 rounded-2xl w-full border transition-colors ${
          isLight
            ? 'bg-purple-100/70 border-purple-200/80'
            : 'bg-black/50 border-white/10'
        }`}
      >
        {[
          { id: 'work' as const, label: 'Study', icon: <BookOpen size={14} /> },
          { id: 'shortBreak' as const, label: 'Rehat', icon: <Coffee size={14} /> },
          { id: 'longBreak' as const, label: 'AFK', icon: <Moon size={14} /> }
        ].map((m) => (
          <button
            key={m.id}
            onClick={() => onModeChange(m.id)}
            className={`flex-1 py-2 px-1 rounded-xl text-xs sm:text-sm font-semibold flex justify-center items-center gap-1.5 transition-all cursor-pointer ${
              mode === m.id
                ? `${theme.bg} ${theme.text} shadow-[0_0_18px_rgba(255,255,255,0.25)] font-bold scale-[1.02]`
                : isLight
                ? 'text-purple-900/70 hover:text-purple-950 hover:bg-white/80'
                : 'text-gray-400 hover:text-white hover:bg-white/10'
            }`}
          >
            {m.icon} <span>{m.label}</span>
          </button>
        ))}
      </div>

      {/* Digital Clock Style Timer */}
      <div className="text-center w-full my-2">
        <div
          className={`text-6xl sm:text-7xl md:text-8xl font-pixel font-bold tracking-widest transition-colors drop-shadow-[0_0_25px_rgba(255,255,255,0.15)] ${
            isActive
              ? isLight
                ? 'text-[#2e2344]'
                : 'text-white'
              : isLight
              ? 'text-purple-300'
              : 'text-gray-500'
          }`}
        >
          {formatTime(timeLeft)}
        </div>

        {/* Status Indicator */}
        <div className="mt-1 flex items-center justify-center gap-2">
          <span
            className={`inline-block w-2 h-2 rounded-full ${
              isActive ? 'bg-emerald-500 animate-pulse' : isLight ? 'bg-gray-400' : 'bg-gray-500'
            }`}
          ></span>
          <span
            className={`text-xs uppercase tracking-widest font-semibold ${
              isLight ? 'text-purple-800/80' : 'text-gray-400'
            }`}
          >
            {getStatusText()}
          </span>
        </div>

        {/* Progress Line */}
        <div
          className={`w-full h-2.5 mt-5 rounded-full overflow-hidden border p-[1px] ${
            isLight
              ? 'bg-purple-100 border-purple-200'
              : 'bg-black/70 border-white/10'
          }`}
        >
          <div
            className={`h-full ${theme.bg} rounded-full transition-all duration-1000 ease-linear shadow-[0_0_12px_currentColor]`}
            style={{ width: `${progress}%` }}
          ></div>
        </div>
      </div>

      {/* Controls */}
      <div className="flex gap-3 mt-6 sm:mt-8 w-full">
        <button
          onClick={onToggleTimer}
          className={`stream-btn flex-1 py-3.5 flex items-center justify-center gap-2 font-bold text-sm sm:text-base rounded-2xl cursor-pointer ${
            isActive
              ? isLight
                ? 'bg-red-100 text-red-700 border border-red-300 hover:bg-red-200'
                : 'bg-red-500/20 text-red-400 border border-red-500/50 hover:bg-red-500/30'
              : `${theme.bg} ${theme.text} border-2 border-transparent hover:brightness-105 shadow-lg`
          }`}
        >
          {isActive ? (
            <>
              <Pause size={18} /> Pause
            </>
          ) : (
            <>
              <Play size={18} fill="currentColor" /> Start Focus
            </>
          )}
        </button>

        <button
          onClick={onResetTimer}
          title="Reset Timer"
          className={`stream-btn w-14 py-3.5 flex items-center justify-center rounded-2xl border cursor-pointer active:scale-95 transition-colors ${
            isLight
              ? 'bg-purple-100/80 border-purple-200 text-purple-800 hover:bg-purple-200'
              : 'bg-black/50 border-white/10 text-gray-300 hover:bg-white/15 hover:text-white'
          }`}
        >
          <RotateCcw size={18} />
        </button>
      </div>
    </div>
  );
};
