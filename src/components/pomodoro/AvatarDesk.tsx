import React, { useRef, useState } from 'react';
import { Camera, Sparkles } from 'lucide-react';

interface AvatarDeskProps {
  avatarUrl: string;
  onAvatarChange?: (newUrl: string) => void;
}

export const AvatarDesk: React.FC<AvatarDeskProps> = ({ avatarUrl, onAvatarChange }) => {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [isDragging, setIsDragging] = useState(false);

  const processFile = (file: File) => {
    if (!file.type.startsWith('image/')) return;
    const reader = new FileReader();
    reader.onload = (event) => {
      const base64Url = event.target?.result as string;
      if (base64Url && onAvatarChange) {
        onAvatarChange(base64Url);
      }
    };
    reader.readAsDataURL(file);
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      processFile(file);
    }
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    const file = e.dataTransfer.files?.[0];
    if (file) {
      processFile(file);
    }
  };

  return (
    <div
      className={`vtuber-desk hidden sm:flex group transition-all duration-300 ${
        isDragging ? 'border-purple-400 scale-105 bg-purple-900/30' : ''
      }`}
      onDragOver={handleDragOver}
      onDragLeave={handleDragLeave}
      onDrop={handleDrop}
    >
      <div className="absolute top-2 left-3 text-[#b19cd9] text-[10px] font-bold font-pixel tracking-wider opacity-60 z-10 flex items-center gap-1">
        <span>Live2D_Src</span>
        <Sparkles size={10} className="text-purple-400" />
      </div>

      <input
        type="file"
        accept="image/*"
        ref={fileInputRef}
        onChange={handleFileChange}
        className="hidden"
      />

      <div
        className="vtuber-image-container relative cursor-pointer group/avatar"
        onClick={() => fileInputRef.current?.click()}
        title="Klik atau Drag & Drop gambar untuk ganti Avatar VTuber"
      >
        <img
          src={avatarUrl}
          alt="VTuber Avatar"
          className="vtuber-animate"
          onError={(e) => {
            (e.currentTarget as HTMLImageElement).src =
              'https://api.dicebear.com/8.x/adventurer/svg?seed=Vtuber&backgroundColor=b19cd9';
          }}
        />

        {/* Hover Overlay to change avatar */}
        <div className="absolute inset-0 bg-black/60 backdrop-blur-[2px] opacity-0 group-hover/avatar:opacity-100 transition-opacity duration-200 flex flex-col items-center justify-center gap-1 z-20 text-white">
          <div className="bg-purple-600/80 p-2 rounded-full shadow-lg transform group-hover/avatar:scale-110 transition-transform">
            <Camera size={18} className="text-white" />
          </div>
          <span className="text-[10px] font-bold tracking-wide text-purple-200">
            Ganti Avatar
          </span>
          <span className="text-[8px] text-gray-300 opacity-80">(Klik / Drop Foto)</span>
        </div>

        <div className="absolute bottom-1 w-full text-center text-white/90 text-[10px] font-bold font-pixel drop-shadow-[0_2px_4px_rgba(0,0,0,0.9)] z-10 pointer-events-none">
          VTUBER
        </div>
      </div>
    </div>
  );
};
