import React from 'react';
import { Settings, Sparkles, Sun, Moon } from 'lucide-react';

interface StreamHeaderProps {
  themeMode: 'dark' | 'light';
  onToggleTheme: () => void;
  onOpenSettings: () => void;
}

export const StreamHeader: React.FC<StreamHeaderProps> = ({
  themeMode,
  onToggleTheme,
  onOpenSettings
}) => {
  const isLight = themeMode === 'light';

  return (
    <header
      className={`w-full backdrop-blur-md border-b px-4 py-3 flex justify-between items-center z-20 rounded-t-[20px] transition-colors ${
        isLight
          ? 'bg-white/95 border-purple-200/60 shadow-sm text-gray-800'
          : 'bg-[#100d16]/95 border-white/10 text-gray-200'
      }`}
    >
      <div className="flex items-center gap-3">
        <div
          className={`flex items-center gap-1.5 px-3 py-1 rounded-full font-bold text-xs tracking-wider border ${
            isLight
              ? 'bg-red-50 text-red-600 border-red-200 shadow-sm'
              : 'bg-red-500/20 text-red-400 border-red-500/40 shadow-[0_0_12px_rgba(239,68,68,0.35)]'
          }`}
        >
          <span className="w-2 h-2 rounded-full bg-red-500 animate-ping"></span>
          <span className="w-2 h-2 rounded-full bg-red-500 -ml-3.5"></span>
          <span>LIVE</span>
        </div>
        <div
          className={`font-medium text-xs sm:text-sm truncate max-w-[180px] sm:max-w-md md:max-w-xl flex items-center gap-1.5 ${
            isLight ? 'text-gray-700' : 'text-gray-300'
          }`}
        >
          <Sparkles
            size={14}
            className={`shrink-0 hidden sm:inline ${
              isLight ? 'text-purple-500' : 'text-purple-400'
            }`}
          />
          <span>【POMODORO】☕ Lo-Fi Study Stream w/ Chat &amp; Todo | !fokus</span>
        </div>
      </div>

      <div className="flex items-center gap-2 sm:gap-2.5">
        {/* Lo-Fi Tag */}
        <div
          className={`hidden sm:flex items-center gap-1.5 px-2.5 py-1 rounded-lg text-xs font-medium border ${
            isLight
              ? 'bg-purple-50 border-purple-200 text-purple-700'
              : 'bg-purple-950/60 border-purple-500/30 text-purple-200'
          }`}
        >
          <span
            className={`w-1.5 h-1.5 rounded-full animate-pulse ${
              isLight ? 'bg-purple-500' : 'bg-purple-400'
            }`}
          ></span>
          <span>{isLight ? 'Pastel Day' : 'Lo-Fi Chill'}</span>
        </div>

        {/* Theme Toggle Button (Light/Dark) */}
        <button
          onClick={onToggleTheme}
          className={`transition-all flex items-center gap-1.5 text-xs sm:text-sm px-2.5 py-1.5 rounded-xl border shadow-sm active:scale-95 cursor-pointer ${
            isLight
              ? 'bg-purple-100/80 hover:bg-purple-200 text-purple-800 border-purple-300/80'
              : 'bg-white/5 hover:bg-white/10 text-amber-300 border-white/10'
          }`}
          title={isLight ? 'Switch to Dark Mode (Malam)' : 'Switch to Light Mode (Siang/Pastel)'}
        >
          {isLight ? <Moon size={15} /> : <Sun size={15} />}
          <span className="font-semibold hidden sm:inline">
            {isLight ? 'Dark Mode' : 'Light Mode'}
          </span>
        </button>

        {/* Settings Button */}
        <button
          onClick={onOpenSettings}
          className={`transition-all flex items-center gap-1.5 text-xs sm:text-sm px-3 py-1.5 rounded-xl border shadow-sm active:scale-95 cursor-pointer ${
            isLight
              ? 'bg-gray-100 hover:bg-gray-200 text-gray-800 border-gray-300/80'
              : 'bg-white/5 hover:bg-white/10 text-gray-300 border-white/10'
          }`}
          title="Open Stream Settings"
        >
          <Settings
            size={15}
            className={isLight ? 'text-purple-600' : 'text-[#b19cd9]'}
          />
          <span className="font-medium hidden xs:inline">Settings</span>
        </button>
      </div>
    </header>
  );
};
