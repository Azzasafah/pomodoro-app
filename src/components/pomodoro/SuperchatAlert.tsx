import React from "react"
import { Zap, Sparkles } from "lucide-react"

interface SuperchatAlertProps {
  show: boolean
  message?: string
  amount?: string
}

export const SuperchatAlert: React.FC<SuperchatAlertProps> = ({
  show,
  message = "お疲れ様でした！Sesi Fokus Selesai!",
  amount = "SUPERCHAT ¥5,000 [Rp 500.000] 🎉",
}) => {
  if (!show) return null

  return (
    <div className="sc-alert absolute top-[10%] z-50 flex items-center gap-3 rounded-2xl border-2 border-white/60 bg-gradient-to-r from-black/95 via-[#1a111a]/95 to-black/95 p-3.5 pr-6 shadow-[0_0_40px_rgba(255,42,95,0.45)] backdrop-blur-2xl sm:top-[12%]">
      <div className="flex h-10 w-10 items-center justify-center rounded-xl border border-rose-500/50 bg-rose-500/20 text-rose-300 shadow-inner">
        <Zap size={20} className="animate-bounce" />
      </div>
      <div>
        <div className="flex items-center gap-1.5 font-mono-tech text-[10px] font-bold text-rose-400">
          <span>『SUPERCHAT DETECTED』</span>
          <Sparkles size={10} />
        </div>
        <p className="font-cyber text-xs font-bold text-white tracking-wide">{message}</p>
        <p className="font-mono-tech text-[11px] font-semibold text-zinc-300">{amount}</p>
      </div>
    </div>
  )
}

