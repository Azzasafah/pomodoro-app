import React from "react"
import { Settings, Sparkles, Sun, Moon } from "lucide-react"

interface StreamHeaderProps {
  themeMode: "dark" | "light"
  onToggleTheme: () => void
  onOpenSettings: () => void
}

export const StreamHeader: React.FC<StreamHeaderProps> = ({
  themeMode,
  onToggleTheme,
  onOpenSettings,
}) => {
  const isLight = themeMode === "light"

  return (
    <header
      className={`z-20 flex w-full items-center justify-between rounded-t-[20px] border-b px-4 py-3 backdrop-blur-md transition-colors ${
        isLight
          ? "border-purple-200/60 bg-white/95 text-gray-800 shadow-sm"
          : "border-white/10 bg-[#100d16]/95 text-gray-200"
      }`}
    >
      <div className="flex items-center gap-3">
        <div
          className={`flex items-center gap-1.5 rounded-full border px-3 py-1 text-xs font-bold tracking-wider ${
            isLight
              ? "border-red-200 bg-red-50 text-red-600 shadow-sm"
              : "border-red-500/40 bg-red-500/20 text-red-400 shadow-[0_0_12px_rgba(239,68,68,0.35)]"
          }`}
        >
          <span className="h-2 w-2 animate-ping rounded-full bg-red-500"></span>
          <span className="-ml-3.5 h-2 w-2 rounded-full bg-red-500"></span>
          <span>LIVE</span>
        </div>
        <div
          className={`flex max-w-[180px] items-center gap-1.5 truncate text-xs font-medium sm:max-w-md sm:text-sm md:max-w-xl ${
            isLight ? "text-gray-700" : "text-gray-300"
          }`}
        >
          <Sparkles
            size={14}
            className={`hidden shrink-0 sm:inline ${
              isLight ? "text-purple-500" : "text-purple-400"
            }`}
          />
          <span>
            【POMODORO】☕ Lo-Fi Study Stream w/ Chat &amp; Todo | !fokus
          </span>
        </div>
      </div>

      <div className="flex items-center gap-2 sm:gap-2.5">
        {/* Lo-Fi Tag */}
        <div
          className={`hidden items-center gap-1.5 rounded-lg border px-2.5 py-1 text-xs font-medium sm:flex ${
            isLight
              ? "border-purple-200 bg-purple-50 text-purple-700"
              : "border-purple-500/30 bg-purple-950/60 text-purple-200"
          }`}
        >
          <span
            className={`h-1.5 w-1.5 animate-pulse rounded-full ${
              isLight ? "bg-purple-500" : "bg-purple-400"
            }`}
          ></span>
          <span>{isLight ? "Pastel Day" : "Lo-Fi Chill"}</span>
        </div>

        {/* Theme Toggle Button (Light/Dark) */}
        <button
          onClick={onToggleTheme}
          className={`flex cursor-pointer items-center gap-1.5 rounded-xl border px-2.5 py-1.5 text-xs shadow-sm transition-all active:scale-95 sm:text-sm ${
            isLight
              ? "border-purple-300/80 bg-purple-100/80 text-purple-800 hover:bg-purple-200"
              : "border-white/10 bg-white/5 text-amber-300 hover:bg-white/10"
          }`}
          title={
            isLight
              ? "Switch to Dark Mode (Malam)"
              : "Switch to Light Mode (Siang/Pastel)"
          }
        >
          {isLight ? <Moon size={15} /> : <Sun size={15} />}
          <span className="hidden font-semibold sm:inline">
            {isLight ? "Dark Mode" : "Light Mode"}
          </span>
        </button>

        {/* Settings Button */}
        <button
          onClick={onOpenSettings}
          className={`flex cursor-pointer items-center gap-1.5 rounded-xl border px-3 py-1.5 text-xs shadow-sm transition-all active:scale-95 sm:text-sm ${
            isLight
              ? "border-gray-300/80 bg-gray-100 text-gray-800 hover:bg-gray-200"
              : "border-white/10 bg-white/5 text-gray-300 hover:bg-white/10"
          }`}
          title="Open Stream Settings"
        >
          <Settings
            size={15}
            className={isLight ? "text-purple-600" : "text-[#b19cd9]"}
          />
          <span className="xs:inline hidden font-medium">Settings</span>
        </button>
      </div>
    </header>
  )
}
