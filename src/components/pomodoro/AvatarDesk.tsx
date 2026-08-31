import React, { useRef, useState } from "react"
import { Camera, Zap, Users } from "lucide-react"

interface AvatarDeskProps {
  avatarUrl: string
  onAvatarChange?: (newUrl: string) => void
}

export const AvatarDesk: React.FC<AvatarDeskProps> = ({
  avatarUrl,
  onAvatarChange,
}) => {
  const fileInputRef = useRef<HTMLInputElement>(null)
  const [isDragging, setIsDragging] = useState(false)

  const isDuo = avatarUrl.includes("love.png")
  const isChisa = avatarUrl.includes("chisa.png")

  const processFile = (file: File) => {
    if (!file.type.startsWith("image/")) return
    const reader = new FileReader()
    reader.onload = (event) => {
      const base64Url = event.target?.result as string
      if (base64Url && onAvatarChange) {
        onAvatarChange(base64Url)
      }
    }
    reader.readAsDataURL(file)
  }

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      processFile(file)
    }
  }

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault()
    setIsDragging(true)
  }

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault()
    setIsDragging(false)
  }

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault()
    setIsDragging(false)
    const file = e.dataTransfer.files?.[0]
    if (file) {
      processFile(file)
    }
  }

  const handleQuickToggleCompanion = (e: React.MouseEvent) => {
    e.stopPropagation()
    if (!onAvatarChange) return
    if (isChisa) {
      onAvatarChange("/love.png")
    } else {
      onAvatarChange("/chisa.png")
    }
  }

  return (
    <div
      className={`vtuber-desk group hidden transition-all duration-300 sm:flex ${
        isDragging ? "scale-105 border-white bg-white/10" : ""
      }`}
      onDragOver={handleDragOver}
      onDragLeave={handleDragLeave}
      onDrop={handleDrop}
    >
      {/* Top HUD Identification */}
      <div className="font-mono-tech absolute -top-3.5 left-2 z-20 flex items-center gap-1.5 rounded-full border border-white/20 bg-black/90 px-2.5 py-0.5 text-[9px] font-bold tracking-wider text-zinc-300 backdrop-blur-md">
        <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-rose-500"></span>
        <span>{isDuo ? "DUO // CHISA × ROVER" : isChisa ? "LIVE2D // CHISA_01" : "LIVE2D // OPERATOR"}</span>
      </div>

      <input
        type="file"
        accept="image/*"
        ref={fileInputRef}
        onChange={handleFileChange}
        className="hidden"
      />

      <div
        className="vtuber-image-container group/avatar relative cursor-pointer"
        onClick={() => fileInputRef.current?.click()}
        title="Klik atau Drag & Drop gambar untuk ganti Avatar Mascot"
      >
        {/* Cyber Reticle Top-Right */}
        <div className="pointer-events-none absolute top-1.5 right-1.5 z-20 font-mono-tech text-[8px] font-bold text-white/50">
          [ 99.8% SYNC ]
        </div>

        {/* Character Image */}
        <img
          src={avatarUrl}
          alt="VTuber Chisa Companion"
          className="vtuber-animate"
          onError={(e) => {
            ;(e.currentTarget as HTMLImageElement).src = "/chisa.png"
          }}
        />

        {/* Hover Overlay to change avatar */}
        <div className="absolute inset-0 z-30 flex flex-col items-center justify-center gap-1.5 bg-black/80 text-white opacity-0 backdrop-blur-[3px] transition-opacity duration-200 group-hover/avatar:opacity-100">
          <div className="transform rounded-full border border-white/30 bg-white/10 p-2 shadow-lg transition-transform group-hover/avatar:scale-110">
            <Camera size={16} className="text-white" />
          </div>
          <span className="font-cyber text-[10px] font-bold tracking-wider text-white">
            CUSTOM AVATAR
          </span>
          <span className="font-mono-tech text-[8px] text-zinc-400">
            (Klik / Drop Image)
          </span>
        </div>

        {/* Bottom Tag */}
        <div className="font-cyber pointer-events-none absolute bottom-1.5 z-20 flex w-full items-center justify-between px-2 text-[9px] font-extrabold text-white/90 drop-shadow-[0_2px_4px_rgba(0,0,0,0.9)]">
          <span className="tracking-widest text-zinc-300">
            {isDuo ? "DUO MODE" : "SOLO UNIT"}
          </span>
          <span className="font-mono-tech text-[8px] text-rose-400">
            ⚡ ACTIVE
          </span>
        </div>
      </div>

      {/* Quick Toggle Button between Chisa Solo & Duo Mode */}
      <button
        type="button"
        onClick={handleQuickToggleCompanion}
        className="absolute -right-2.5 -top-2.5 z-30 flex h-7 w-7 cursor-pointer items-center justify-center rounded-full border border-white/30 bg-[#0d0d14] text-white shadow-lg transition-all hover:scale-110 hover:border-white hover:bg-white hover:text-black"
        title={isChisa ? "Switch to Chisa & Rover (Duo Relax Mode)" : "Switch to Chisa (Solo Focus Mode)"}
      >
        {isChisa ? <Users size={13} /> : <Zap size={13} />}
      </button>
    </div>
  )
}

