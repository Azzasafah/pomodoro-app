import React from "react"
import { Mic, MicOff, Video, VideoOff } from "lucide-react"

interface StreamControlsProps {
  isMicOn: boolean
  isCamOn: boolean
  themeMode?: "dark" | "light"
  onToggleMic: () => void
  onToggleCam: () => void
}

export const StreamControls: React.FC<StreamControlsProps> = ({
  isMicOn,
  isCamOn,
  themeMode = "light",
  onToggleMic,
  onToggleCam,
}) => {
  const isLight = themeMode === "light"

  return (
    <div className="absolute bottom-2.5 left-1/2 z-30 flex -translate-x-1/2 gap-3">
      <div
        className={`flex items-center gap-4 rounded-full border px-4 py-1.5 shadow-2xl backdrop-blur-xl transition-all ${
          isLight
            ? "border-black/10 bg-white/95 text-zinc-900 shadow-md"
            : "border-white/15 bg-[#09090e]/95 text-zinc-100 shadow-2xl"
        }`}
      >
        <button
          onClick={onToggleMic}
          className={`flex cursor-pointer items-center gap-1.5 font-mono-tech text-xs font-bold transition-all hover:scale-105 ${
            isMicOn
              ? isLight
                ? "text-zinc-900 hover:text-black"
                : "text-zinc-200 hover:text-white"
              : "text-rose-500 hover:text-rose-600"
          }`}
          title="Toggle Voice Feed"
        >
          {isMicOn ? (
            <Mic size={13} className={isLight ? "text-black" : "text-white"} />
          ) : (
            <MicOff size={13} />
          )}
          <span className="text-[10px] tracking-wider">
            {isMicOn ? "AUDIO: LIVE" : "AUDIO: MUTED"}
          </span>
        </button>

        <div
          className={`h-3.5 w-px ${
            isLight ? "bg-black/10" : "bg-white/15"
          }`}
        ></div>

        <button
          onClick={onToggleCam}
          className={`flex cursor-pointer items-center gap-1.5 font-mono-tech text-xs font-bold transition-all hover:scale-105 ${
            isCamOn
              ? isLight
                ? "text-zinc-900 hover:text-black"
                : "text-zinc-200 hover:text-white"
              : "text-zinc-400 hover:text-zinc-500"
          }`}
          title="Toggle Visual Feed"
        >
          {isCamOn ? (
            <Video size={13} className={isLight ? "text-black" : "text-white"} />
          ) : (
            <VideoOff size={13} />
          )}
          <span className="text-[10px] tracking-wider">
            {isCamOn ? "OPTIC: SYNCED" : "OPTIC: OFF"}
          </span>
        </button>
      </div>
    </div>
  )
}


