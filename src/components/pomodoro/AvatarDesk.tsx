import React, { useRef, useState } from "react"
import { Camera, Sparkles } from "lucide-react"

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

  return (
    <div
      className={`vtuber-desk group hidden transition-all duration-300 sm:flex ${
        isDragging ? "scale-105 border-purple-400 bg-purple-900/30" : ""
      }`}
      onDragOver={handleDragOver}
      onDragLeave={handleDragLeave}
      onDrop={handleDrop}
    >
      <div className="font-pixel absolute top-2 left-3 z-10 flex items-center gap-1 text-[10px] font-bold tracking-wider text-[#b19cd9] opacity-60">
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
        className="vtuber-image-container group/avatar relative cursor-pointer"
        onClick={() => fileInputRef.current?.click()}
        title="Klik atau Drag & Drop gambar untuk ganti Avatar VTuber"
      >
        <img
          src={avatarUrl}
          alt="VTuber Avatar"
          className="vtuber-animate"
          onError={(e) => {
            ;(e.currentTarget as HTMLImageElement).src =
              "https://api.dicebear.com/8.x/adventurer/svg?seed=Vtuber&backgroundColor=b19cd9"
          }}
        />

        {/* Hover Overlay to change avatar */}
        <div className="absolute inset-0 z-20 flex flex-col items-center justify-center gap-1 bg-black/60 text-white opacity-0 backdrop-blur-[2px] transition-opacity duration-200 group-hover/avatar:opacity-100">
          <div className="transform rounded-full bg-purple-600/80 p-2 shadow-lg transition-transform group-hover/avatar:scale-110">
            <Camera size={18} className="text-white" />
          </div>
          <span className="text-[10px] font-bold tracking-wide text-purple-200">
            Ganti Avatar
          </span>
          <span className="text-[8px] text-gray-300 opacity-80">
            (Klik / Drop Foto)
          </span>
        </div>

        <div className="font-pixel pointer-events-none absolute bottom-1 z-10 w-full text-center text-[10px] font-bold text-white/90 drop-shadow-[0_2px_4px_rgba(0,0,0,0.9)]">
          VTUBER
        </div>
      </div>
    </div>
  )
}
