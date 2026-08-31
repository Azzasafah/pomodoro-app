import React from "react"
import { Settings, Cpu, Radio, Sun, Moon } from "lucide-react"

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
      className={`z-20 flex w-full items-center justify-between border-b px-4 py-3 backdrop-blur-xl transition-colors ${
        isLight
          ? "border-black/10 bg-white/95 text-zinc-900"
          : "border-white/10 bg-[#0c0c12]/95 text-zinc-100"
      }`}
    >
      <div className="flex items-center gap-3">
        {/* LIVE Broadcast Badge */}
        <div className="flex items-center gap-1.5 rounded-full border border-rose-500/40 bg-rose-500/15 px-3 py-1 font-cyber text-[10px] font-black tracking-wider text-rose-500 shadow-[0_0_15px_rgba(244,63,94,0.2)]">
          <span className="h-2 w-2 animate-ping rounded-full bg-rose-500"></span>
          <span className="-ml-3.5 h-2 w-2 rounded-full bg-rose-500"></span>
          <span>LIVE BROADCAST</span>
        </div>

        {/* Stream Title with Japanese Kanji */}
        <div
          className={`flex max-w-[200px] items-center gap-2 truncate text-xs font-semibold sm:max-w-md sm:text-sm md:max-w-xl ${
            isLight ? "text-zinc-800" : "text-zinc-200"
          }`}
        >
          <Cpu
            size={15}
            className={`hidden shrink-0 sm:inline ${
              isLight ? "text-black" : "text-white"
            }`}
          />
          <span
            className={`font-cyber font-bold tracking-wide ${
              isLight ? "text-black" : "text-white"
            }`}
          >
            【NEO TOKYO 2099】
          </span>
          <span
            className={`font-jp hidden xs:inline ${
              isLight ? "text-zinc-500" : "text-zinc-400"
            }`}
          >
            電脳集中配信 // CHISA FOCUS LINK
          </span>
        </div>
      </div>

      <div className="flex items-center gap-2 sm:gap-2.5">
        {/* Animated Audio Equalizer Visualizer */}
        <div
          className={`hidden items-center gap-1 rounded-xl border px-3 py-1.5 sm:flex ${
            isLight
              ? "border-black/10 bg-black/5"
              : "border-white/10 bg-black/60"
          }`}
          title="Cyber Beats Audio Feed"
        >
          <Radio size={12} className="mr-1 text-rose-500" />
          <div className="flex items-end gap-[3px] h-3.5 w-7">
            <span
              className={`eq-bar-1 w-1 rounded-full ${
                isLight ? "bg-black" : "bg-white"
              }`}
            ></span>
            <span
              className={`eq-bar-2 w-1 rounded-full ${
                isLight ? "bg-zinc-600" : "bg-zinc-300"
              }`}
            ></span>
            <span className="eq-bar-3 w-1 bg-rose-500 rounded-full"></span>
            <span
              className={`eq-bar-4 w-1 rounded-full ${
                isLight ? "bg-black" : "bg-white"
              }`}
            ></span>
          </div>
          <span
            className={`font-mono-tech text-[9px] font-bold ml-1 ${
              isLight ? "text-zinc-600" : "text-zinc-400"
            }`}
          >
            LOFI_SYNTH
          </span>
        </div>

        {/* Theme Toggle Button (Light / Dark) */}
        <button
          onClick={onToggleTheme}
          className={`flex cursor-pointer items-center gap-1.5 rounded-xl border px-2.5 py-1.5 font-cyber text-xs font-bold shadow-sm transition-all active:scale-95 sm:text-sm ${
            isLight
              ? "border-black/10 bg-black/5 text-zinc-900 hover:bg-black hover:text-white"
              : "border-white/15 bg-black/60 text-zinc-200 hover:border-white hover:bg-white hover:text-black"
          }`}
          title={
            isLight
              ? "Switch to Dark Mode (Stealth)"
              : "Switch to Light Mode (Clean Tech)"
          }
        >
          {isLight ? <Moon size={14} /> : <Sun size={14} />}
          <span className="font-mono-tech hidden sm:inline text-xs">
            {isLight ? "DARK" : "LIGHT"}
          </span>
        </button>

        {/* Settings Terminal Button */}
        <button
          onClick={onOpenSettings}
          className={`flex cursor-pointer items-center gap-1.5 rounded-xl border px-3 py-1.5 font-cyber text-xs font-bold shadow-sm transition-all active:scale-95 sm:text-sm ${
            isLight
              ? "border-black/10 bg-black/5 text-zinc-900 hover:bg-black hover:text-white"
              : "border-white/15 bg-black/60 text-zinc-200 hover:border-white hover:bg-white hover:text-black"
          }`}
          title="Open Stream Settings"
        >
          <Settings size={14} className="text-inherit" />
          <span className="font-mono-tech hidden sm:inline text-xs">CONFIG</span>
        </button>
      </div>
    </header>
  )
}


