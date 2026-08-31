import React from "react"
import { Flame, Coffee, Moon, Play, Pause, RotateCcw, Activity } from "lucide-react"
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
  themeMode = "light",
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
    if (!isActive) return "STANDBY // READY"
    if (mode === "work") return "FOCUS DRIVE // 集中モード"
    if (mode === "shortBreak") return "RECHARGE // 小休止中"
    return "AFK / SYSTEM IDLE // 大休止"
  }

  return (
    <div
      className={`relative z-20 mb-10 flex w-full max-w-md flex-col items-center rounded-3xl border p-6 backdrop-blur-2xl transition-all sm:mb-0 sm:p-8 ${
        isLight
          ? "border-black/10 bg-gradient-to-b from-white/95 via-[#f9f9fc]/95 to-[#f2f2f7]/95 text-zinc-900 shadow-[0_20px_50px_rgba(0,0,0,0.08)]"
          : "border-white/15 bg-gradient-to-b from-[#12121a]/95 via-[#0b0b10]/95 to-[#060609]/98 text-zinc-100 shadow-[0_20px_50px_rgba(0,0,0,0.8)]"
      }`}
    >
      {/* Top HUD Frame Details */}
      <div
        className={`mb-4 flex w-full items-center justify-between border-b pb-2 ${
          isLight ? "border-black/10" : "border-white/10"
        }`}
      >
        <div
          className={`flex items-center gap-1.5 font-mono-tech text-[10px] font-bold tracking-widest ${
            isLight ? "text-zinc-600" : "text-zinc-400"
          }`}
        >
          <Activity size={12} className="text-rose-500 animate-pulse" />
          <span>NEO_CHRONO // HUD v2.4</span>
        </div>
        <div
          className={`font-mono-tech text-[9px] ${
            isLight ? "text-zinc-500" : "text-zinc-500"
          }`}
        >
          [ TOKYO_SEC: 07 ]
        </div>
      </div>

      {/* Tabs Mode */}
      <div
        className={`mb-6 flex w-full gap-2 rounded-2xl border p-1.5 ${
          isLight ? "border-black/10 bg-black/5" : "border-white/10 bg-black/60"
        }`}
      >
        {[
          {
            id: "work" as const,
            label: "FOCUS",
            jp: "集中",
            icon: <Flame size={13} />,
          },
          {
            id: "shortBreak" as const,
            label: "BREAK",
            jp: "小休",
            icon: <Coffee size={13} />,
          },
          {
            id: "longBreak" as const,
            label: "AFK",
            jp: "大休",
            icon: <Moon size={13} />,
          },
        ].map((m) => (
          <button
            key={m.id}
            onClick={() => onModeChange(m.id)}
            className={`flex flex-1 cursor-pointer items-center justify-center gap-1 rounded-xl px-1.5 py-2.5 transition-all ${
              mode === m.id
                ? isLight
                  ? "bg-black text-white font-extrabold shadow-md scale-[1.02]"
                  : "bg-white text-black font-extrabold shadow-[0_0_20px_rgba(255,255,255,0.35)] scale-[1.02]"
                : isLight
                  ? "text-zinc-600 hover:bg-black/10 hover:text-black"
                  : "text-zinc-400 hover:bg-white/10 hover:text-white"
            }`}
          >
            <span className="shrink-0">{m.icon}</span>
            <span className="font-cyber text-[11px] font-bold sm:text-xs">
              {m.label}
            </span>
            <span className="font-jp text-[10px] opacity-70 hidden xs:inline">
              ({m.jp})
            </span>
          </button>
        ))}
      </div>

      {/* Digital Clock Display */}
      <div className="my-1 w-full text-center">
        <div className="relative inline-block">
          <div
            className={`font-cyber text-6xl font-black tracking-widest transition-all sm:text-7xl md:text-8xl select-none ${
              isActive
                ? isLight
                  ? "text-black drop-shadow-[0_0_20px_rgba(0,0,0,0.15)]"
                  : "text-white drop-shadow-[0_0_30px_rgba(255,255,255,0.35)]"
                : isLight
                  ? "text-zinc-400 drop-shadow-none"
                  : "text-zinc-500 drop-shadow-none"
            }`}
          >
            {formatTime(timeLeft)}
          </div>
        </div>

        {/* Status Indicator */}
        <div className="mt-2 flex items-center justify-center gap-2 font-mono-tech">
          <span
            className={`inline-block h-2 w-2 rounded-full ${
              isActive
                ? "animate-pulse bg-rose-500 shadow-[0_0_8px_#ff2a5f]"
                : isLight
                  ? "bg-zinc-300"
                  : "bg-zinc-600"
            }`}
          ></span>
          <span
            className={`text-[11px] font-bold tracking-widest uppercase ${
              isLight ? "text-zinc-700" : "text-zinc-300"
            }`}
          >
            {getStatusText()}
          </span>
        </div>

        {/* High-Tech Progress Meter */}
        <div className="mt-6 flex flex-col gap-1.5">
          <div
            className={`flex justify-between font-mono-tech text-[10px] ${
              isLight ? "text-zinc-600" : "text-zinc-400"
            }`}
          >
            <span>PROGRESS</span>
            <span
              className={`font-bold ${isLight ? "text-black" : "text-white"}`}
            >
              {Math.round(progress)}%
            </span>
          </div>
          <div
            className={`h-2.5 w-full overflow-hidden rounded-full border p-[1px] ${
              isLight
                ? "border-black/10 bg-black/10"
                : "border-white/15 bg-black/80"
            }`}
          >
            <div
              className={`h-full rounded-full transition-all duration-1000 ease-linear ${
                isLight
                  ? "bg-gradient-to-r from-zinc-700 via-black to-rose-500 shadow-sm"
                  : "bg-gradient-to-r from-zinc-300 via-white to-rose-400 shadow-[0_0_12px_rgba(255,255,255,0.5)]"
              }`}
              style={{ width: `${progress}%` }}
            ></div>
          </div>
        </div>
      </div>

      {/* Controls */}
      <div className="mt-6 flex w-full gap-3 sm:mt-8">
        <button
          onClick={onToggleTimer}
          className={`stream-btn flex flex-1 cursor-pointer items-center justify-center gap-2 rounded-2xl py-3.5 font-cyber text-xs font-black tracking-wider transition-all sm:text-sm ${
            isActive
              ? "border border-rose-500/50 bg-rose-500/20 text-rose-500 shadow-[0_0_20px_rgba(244,63,94,0.2)] hover:bg-rose-500/30"
              : isLight
                ? "border border-black bg-black text-white shadow-lg hover:bg-zinc-800"
                : "border border-white bg-white text-black shadow-[0_0_25px_rgba(255,255,255,0.4)] hover:bg-zinc-200"
          }`}
        >
          {isActive ? (
            <>
              <Pause size={16} /> PAUSE [停止]
            </>
          ) : (
            <>
              <Play size={16} fill="currentColor" /> START FOCUS [起動]
            </>
          )}
        </button>

        <button
          onClick={onResetTimer}
          title="Reset Timer"
          className={`stream-btn flex w-14 cursor-pointer items-center justify-center rounded-2xl border transition-all active:scale-95 ${
            isLight
              ? "border-black/10 bg-black/5 text-zinc-700 hover:border-black/30 hover:bg-black/10 hover:text-black"
              : "border-white/15 bg-black/60 text-zinc-300 hover:border-white/40 hover:bg-white/10 hover:text-white"
          }`}
        >
          <RotateCcw size={16} />
        </button>
      </div>
    </div>
  )
}


