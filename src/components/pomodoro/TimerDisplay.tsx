import React from "react"
import { BookOpen, Coffee, Moon, Play, Pause, RotateCcw } from "lucide-react"
import type { TimerMode, ThemeColors } from "@/types/pomodoro"

interface TimerDisplayProps {
  mode: TimerMode
  timeLeft: number
  isActive: boolean
  progress: number
  theme: ThemeColors
  themeMode?: "dark" | "light"
  onModeChange: (newMode: TimerMode) => void
  onToggleTimer: () => void
  onResetTimer: () => void
}

export const TimerDisplay: React.FC<TimerDisplayProps> = ({
  mode,
  timeLeft,
  isActive,
  progress,
  theme,
  themeMode = "dark",
  onModeChange,
  onToggleTimer,
  onResetTimer,
}) => {
  const isLight = themeMode === "light"

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60)
    const secs = seconds % 60
    return `${mins.toString().padStart(2, "0")}:${secs.toString().padStart(2, "0")}`
  }

  const getStatusText = () => {
    if (!isActive) return "Paused / Siap"
    if (mode === "work") return "Sesi Fokus Berjalan"
    if (mode === "shortBreak") return "Rehat Pendek (Zatsudan)"
    return "AFK / Rehat Panjang"
  }

  return (
    <div
      className={`relative z-20 mb-12 flex w-full max-w-md flex-col items-center rounded-[32px] p-6 transition-all sm:mb-0 sm:p-8 md:p-10 ${
        isLight
          ? "border border-purple-200/80 bg-white/92 text-gray-900 shadow-[0_20px_45px_rgba(147,112,219,0.15)] backdrop-blur-xl"
          : "border border-white/15 bg-[#1a1625]/90 text-white shadow-[0_20px_50px_rgba(0,0,0,0.6)] backdrop-blur-xl"
      }`}
    >
      {/* Tabs Mode */}
      <div
        className={`mb-6 flex w-full gap-2 rounded-2xl border p-1.5 transition-colors ${
          isLight
            ? "border-purple-200/80 bg-purple-100/70"
            : "border-white/10 bg-black/50"
        }`}
      >
        {[
          { id: "work" as const, label: "Study", icon: <BookOpen size={14} /> },
          {
            id: "shortBreak" as const,
            label: "Rehat",
            icon: <Coffee size={14} />,
          },
          { id: "longBreak" as const, label: "AFK", icon: <Moon size={14} /> },
        ].map((m) => (
          <button
            key={m.id}
            onClick={() => onModeChange(m.id)}
            className={`flex flex-1 cursor-pointer items-center justify-center gap-1.5 rounded-xl px-1 py-2 text-xs font-semibold transition-all sm:text-sm ${
              mode === m.id
                ? `${theme.bg} ${theme.text} scale-[1.02] font-bold shadow-[0_0_18px_rgba(255,255,255,0.25)]`
                : isLight
                  ? "text-purple-900/70 hover:bg-white/80 hover:text-purple-950"
                  : "text-gray-400 hover:bg-white/10 hover:text-white"
            }`}
          >
            {m.icon} <span>{m.label}</span>
          </button>
        ))}
      </div>

      {/* Digital Clock Style Timer */}
      <div className="my-2 w-full text-center">
        <div
          className={`font-pixel text-6xl font-bold tracking-widest drop-shadow-[0_0_25px_rgba(255,255,255,0.15)] transition-colors sm:text-7xl md:text-8xl ${
            isActive
              ? isLight
                ? "text-[#2e2344]"
                : "text-white"
              : isLight
                ? "text-purple-300"
                : "text-gray-500"
          }`}
        >
          {formatTime(timeLeft)}
        </div>

        {/* Status Indicator */}
        <div className="mt-1 flex items-center justify-center gap-2">
          <span
            className={`inline-block h-2 w-2 rounded-full ${
              isActive
                ? "animate-pulse bg-emerald-500"
                : isLight
                  ? "bg-gray-400"
                  : "bg-gray-500"
            }`}
          ></span>
          <span
            className={`text-xs font-semibold tracking-widest uppercase ${
              isLight ? "text-purple-800/80" : "text-gray-400"
            }`}
          >
            {getStatusText()}
          </span>
        </div>

        {/* Progress Line */}
        <div
          className={`mt-5 h-2.5 w-full overflow-hidden rounded-full border p-[1px] ${
            isLight
              ? "border-purple-200 bg-purple-100"
              : "border-white/10 bg-black/70"
          }`}
        >
          <div
            className={`h-full ${theme.bg} rounded-full shadow-[0_0_12px_currentColor] transition-all duration-1000 ease-linear`}
            style={{ width: `${progress}%` }}
          ></div>
        </div>
      </div>

      {/* Controls */}
      <div className="mt-6 flex w-full gap-3 sm:mt-8">
        <button
          onClick={onToggleTimer}
          className={`stream-btn flex flex-1 cursor-pointer items-center justify-center gap-2 rounded-2xl py-3.5 text-sm font-bold sm:text-base ${
            isActive
              ? isLight
                ? "border border-red-300 bg-red-100 text-red-700 hover:bg-red-200"
                : "border border-red-500/50 bg-red-500/20 text-red-400 hover:bg-red-500/30"
              : `${theme.bg} ${theme.text} border-2 border-transparent shadow-lg hover:brightness-105`
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
          className={`stream-btn flex w-14 cursor-pointer items-center justify-center rounded-2xl border py-3.5 transition-colors active:scale-95 ${
            isLight
              ? "border-purple-200 bg-purple-100/80 text-purple-800 hover:bg-purple-200"
              : "border-white/10 bg-black/50 text-gray-300 hover:bg-white/15 hover:text-white"
          }`}
        >
          <RotateCcw size={18} />
        </button>
      </div>
    </div>
  )
}
