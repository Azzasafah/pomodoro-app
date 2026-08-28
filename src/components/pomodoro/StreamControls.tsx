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
  themeMode = "dark",
  onToggleMic,
  onToggleCam,
}) => {
  const isLight = themeMode === "light"

  return (
    <div className="absolute bottom-2.5 left-1/2 z-30 flex -translate-x-1/2 gap-3">
      <div
        className={`flex items-center gap-4 rounded-full border px-4 py-1.5 shadow-2xl backdrop-blur-md transition-colors ${
          isLight
            ? "border-purple-200 bg-white/95 text-gray-700"
            : "border-white/10 bg-[#100d16]/90 text-gray-300"
        }`}
      >
        <button
          onClick={onToggleMic}
          className={`flex cursor-pointer items-center gap-1.5 text-xs font-semibold transition-colors ${
            isMicOn
              ? isLight
                ? "text-emerald-600 hover:text-emerald-700"
                : "text-emerald-400 hover:text-emerald-300"
              : isLight
                ? "text-red-500 hover:text-red-600"
                : "text-red-400 hover:text-red-300"
          }`}
          title="Toggle Microphone"
        >
          {isMicOn ? <Mic size={13} /> : <MicOff size={13} />}
          <span className="text-[11px]">{isMicOn ? "Mic Live" : "Muted"}</span>
        </button>

        <div
          className={`h-3.5 w-px ${isLight ? "bg-purple-200" : "bg-white/20"}`}
        ></div>

        <button
          onClick={onToggleCam}
          className={`flex cursor-pointer items-center gap-1.5 text-xs font-semibold transition-colors ${
            isCamOn
              ? isLight
                ? "text-purple-700 hover:text-purple-800"
                : "text-purple-300 hover:text-purple-200"
              : isLight
                ? "text-gray-400 hover:text-gray-500"
                : "text-gray-500 hover:text-gray-400"
          }`}
          title="Toggle Camera Stream"
        >
          {isCamOn ? <Video size={13} /> : <VideoOff size={13} />}
          <span className="text-[11px]">
            {isCamOn ? "Cam Live" : "Cam Off"}
          </span>
        </button>
      </div>
    </div>
  )
}
