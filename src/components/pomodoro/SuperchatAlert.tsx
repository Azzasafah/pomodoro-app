import React from "react"

interface SuperchatAlertProps {
  show: boolean
  message?: string
  amount?: string
}

export const SuperchatAlert: React.FC<SuperchatAlertProps> = ({
  show,
  message = "Otsukare Sama Deshita!",
  amount = "Superchat Rp 50.000: Sesi Selesai! 🎉",
}) => {
  if (!show) return null

  return (
    <div className="sc-alert absolute top-[10%] z-50 flex items-center gap-3 rounded-2xl border-2 border-yellow-100 bg-gradient-to-r from-amber-400 via-yellow-400 to-amber-300 p-3.5 pr-8 shadow-[0_10px_45px_rgba(245,158,11,0.6)] sm:top-[12%]">
      <div className="animate-bounce rounded-full bg-white/40 p-2 text-2xl shadow-inner">
        💰
      </div>
      <div>
        <p className="text-sm font-bold text-[#1e1a2b]">{message}</p>
        <p className="text-xs font-semibold text-[#1e1a2b]/90">{amount}</p>
      </div>
    </div>
  )
}
