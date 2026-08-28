import React from 'react';

interface SuperchatAlertProps {
  show: boolean;
  message?: string;
  amount?: string;
}

export const SuperchatAlert: React.FC<SuperchatAlertProps> = ({
  show,
  message = 'Otsukare Sama Deshita!',
  amount = 'Superchat Rp 50.000: Sesi Selesai! 🎉'
}) => {
  if (!show) return null;

  return (
    <div className="absolute top-[10%] sm:top-[12%] sc-alert z-50 bg-gradient-to-r from-amber-400 via-yellow-400 to-amber-300 p-3.5 pr-8 rounded-2xl shadow-[0_10px_45px_rgba(245,158,11,0.6)] border-2 border-yellow-100 flex items-center gap-3">
      <div className="bg-white/40 p-2 rounded-full text-2xl shadow-inner animate-bounce">
        💰
      </div>
      <div>
        <p className="font-bold text-[#1e1a2b] text-sm">{message}</p>
        <p className="text-xs font-semibold text-[#1e1a2b]/90">{amount}</p>
      </div>
    </div>
  );
};
