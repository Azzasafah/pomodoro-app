import React, { useRef, useState, type SyntheticEvent } from "react"
import {
  X,
  Sliders,
  Clock,
  Volume2,
  Upload,
  Play,
  Image as ImageIcon,
  Link as LinkIcon,
  RotateCcw,
  Check,
  Zap,
  Users,
  Sun,
  Moon,
  Palette,
} from "lucide-react"
import type { PomodoroSettings } from "@/types/pomodoro"
import { SOUND_OPTIONS, AVATAR_PRESETS } from "@/constants/pomodoro"
import { triggerSoundAlert } from "@/utils/audio"

interface SettingsModalProps {
  isOpen: boolean
  settings: PomodoroSettings
  onClose: () => void
  onUpdateSettings: (newSettings: PomodoroSettings) => void
}

export const SettingsModal: React.FC<SettingsModalProps> = ({
  isOpen,
  settings,
  onClose,
  onUpdateSettings,
}) => {
  const [audioFileName, setAudioFileName] = useState<string>("")
  const [customUrlInput, setCustomUrlInput] = useState<string>("")
  const [urlAppliedSuccess, setUrlAppliedSuccess] = useState<boolean>(false)
  const [avatarUploadSuccess, setAvatarUploadSuccess] = useState<boolean>(false)

  const fileInputRef = useRef<HTMLInputElement>(null)
  const imageInputRef = useRef<HTMLInputElement>(null)

  if (!isOpen) return null

  const isLight = settings.themeMode === "light"

  const handleAudioUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      if (file.size > 4 * 1024 * 1024) {
        alert(
          "Ukuran file audio terlalu besar (maks 4MB) agar dapat tersimpan permanen."
        )
        return
      }

      setAudioFileName(file.name)
      const reader = new FileReader()
      reader.onload = (event) => {
        const base64Audio = event.target?.result as string
        if (base64Audio) {
          onUpdateSettings({
            ...settings,
            customAudioUrl: base64Audio,
            sound: "custom-audio",
          })
        }
      }
      reader.readAsDataURL(file)
    }
  }

  const handleAvatarFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file && file.type.startsWith("image/")) {
      const reader = new FileReader()
      reader.onload = (event) => {
        const base64 = event.target?.result as string
        if (base64) {
          onUpdateSettings({
            ...settings,
            vtuberImage: base64,
          })
          setAvatarUploadSuccess(true)
          setTimeout(() => setAvatarUploadSuccess(false), 3000)
        }
      }
      reader.readAsDataURL(file)
    }
  }

  const handleApplyCustomUrl = (e: SyntheticEvent) => {
    e.preventDefault()
    if (!customUrlInput.trim()) return
    onUpdateSettings({
      ...settings,
      vtuberImage: customUrlInput.trim(),
    })
    setUrlAppliedSuccess(true)
    setTimeout(() => setUrlAppliedSuccess(false), 3000)
    setCustomUrlInput("")
  }

  const handleSelectPreset = (url: string) => {
    onUpdateSettings({
      ...settings,
      vtuberImage: url,
    })
  }

  const handleResetAvatar = () => {
    onUpdateSettings({
      ...settings,
      vtuberImage: "/chisa.png",
    })
  }

  const handleTestSound = () => {
    triggerSoundAlert(settings.sound, settings)
  }

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/85 p-4 backdrop-blur-xl transition-all"
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose()
      }}
    >
      <div className="custom-scrollbar relative max-h-[90vh] w-full max-w-xl overflow-y-auto rounded-3xl border border-white/20 bg-[#0c0c12] text-zinc-100 shadow-[0_0_60px_rgba(0,0,0,0.95)]">
        {/* Modal Header */}
        <div className="sticky top-0 z-10 flex items-center justify-between border-b border-white/10 bg-[#09090e]/95 p-5 backdrop-blur-xl">
          <div className="flex items-center gap-3">
            <div className="rounded-xl border border-white/20 bg-white/10 p-2 text-white shadow-inner">
              <Sliders size={18} />
            </div>
            <div>
              <h2 className="font-cyber text-sm font-black tracking-wider text-white sm:text-base">
                TERMINAL CONFIGURATION
              </h2>
              <p className="font-mono-tech text-[11px] text-zinc-400">
                [ 設定 ] Sesuaikan Companion Chisa, Timer, &amp; Audio Synth
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="cursor-pointer rounded-xl border border-white/10 bg-white/5 p-2 text-zinc-400 transition-colors hover:border-white/40 hover:bg-rose-500/20 hover:text-white"
            title="Tutup Modal"
          >
            <X size={18} />
          </button>
        </div>

        <div className="space-y-6 p-6">
          {/* Section 0: Theme Mode Selection (Light / Dark) */}
          <div>
            <h3 className="mb-3 flex items-center gap-2 font-cyber text-xs font-bold tracking-widest text-zinc-300 uppercase">
              <Palette size={14} className="text-white" />
              <span>Theme Mode // 画面モード</span>
            </h3>
            <div className="grid grid-cols-2 gap-3 rounded-2xl border border-white/10 bg-black/40 p-2.5">
              <button
                type="button"
                onClick={() => onUpdateSettings({ ...settings, themeMode: "light" })}
                className={`flex cursor-pointer items-center justify-center gap-2 rounded-xl px-4 py-3 font-cyber text-xs font-bold transition-all sm:text-sm ${
                  isLight
                    ? "border border-white bg-white text-black shadow-lg"
                    : "border border-white/10 bg-black/50 text-zinc-400 hover:bg-white/5 hover:text-white"
                }`}
              >
                <Sun size={16} className={isLight ? "text-black" : "text-zinc-400"} />
                <span>Light Mode (Clean Tech)</span>
              </button>

              <button
                type="button"
                onClick={() => onUpdateSettings({ ...settings, themeMode: "dark" })}
                className={`flex cursor-pointer items-center justify-center gap-2 rounded-xl px-4 py-3 font-cyber text-xs font-bold transition-all sm:text-sm ${
                  !isLight
                    ? "border border-white bg-white text-black shadow-lg"
                    : "border border-white/10 bg-black/50 text-zinc-400 hover:bg-white/5 hover:text-white"
                }`}
              >
                <Moon size={16} className={!isLight ? "text-black" : "text-zinc-400"} />
                <span>Dark Mode (Stealth)</span>
              </button>
            </div>
          </div>

          {/* Section 1: Character Mascot Selection (Chisa vs Duo vs Presets) */}
          <div>
            <div className="mb-3 flex items-center justify-between">
              <h3 className="flex items-center gap-2 font-cyber text-xs font-bold tracking-widest text-zinc-300 uppercase">
                <ImageIcon size={14} className="text-rose-400" />
                <span>Mascot &amp; Live2D Companion</span>
              </h3>
              {settings.vtuberImage !== "/chisa.png" && (
                <button
                  onClick={handleResetAvatar}
                  className="flex cursor-pointer items-center gap-1 rounded-lg border border-white/15 bg-white/5 px-2 py-1 font-mono-tech text-[10px] text-zinc-400 transition-colors hover:border-white/40 hover:bg-white/10 hover:text-white"
                  title="Kembalikan ke avatar default"
                >
                  <RotateCcw size={10} /> Reset Chisa Solo
                </button>
              )}
            </div>

            <div className="flex flex-col gap-4 rounded-2xl border border-white/10 bg-black/40 p-4">
              {/* Quick Select Buttons: Chisa Solo & Chisa Duo */}
              <div className="grid grid-cols-2 gap-3">
                <button
                  type="button"
                  onClick={() => handleSelectPreset("/chisa.png")}
                  className={`flex cursor-pointer items-center gap-3 rounded-2xl border p-3 text-left transition-all ${
                    settings.vtuberImage === "/chisa.png"
                      ? "border-white bg-white text-black shadow-[0_0_20px_rgba(255,255,255,0.25)] scale-[1.02]"
                      : "border-white/10 bg-black/50 text-zinc-300 hover:border-white/30 hover:bg-white/5"
                  }`}
                >
                  <div className="h-12 w-12 shrink-0 overflow-hidden rounded-xl border border-black/20 bg-zinc-900">
                    <img src="/chisa.png" alt="Chisa Solo" className="h-full w-full object-cover object-top" />
                  </div>
                  <div>
                    <div className="flex items-center gap-1 font-cyber text-xs font-black">
                      <Zap size={11} className={settings.vtuberImage === "/chisa.png" ? "text-rose-600" : "text-rose-400"} />
                      <span>CHISA SOLO</span>
                    </div>
                    <p className="font-mono-tech text-[10px] opacity-80">Focus Techwear</p>
                  </div>
                </button>

                <button
                  type="button"
                  onClick={() => handleSelectPreset("/love.png")}
                  className={`flex cursor-pointer items-center gap-3 rounded-2xl border p-3 text-left transition-all ${
                    settings.vtuberImage === "/love.png"
                      ? "border-white bg-white text-black shadow-[0_0_20px_rgba(255,255,255,0.25)] scale-[1.02]"
                      : "border-white/10 bg-black/50 text-zinc-300 hover:border-white/30 hover:bg-white/5"
                  }`}
                >
                  <div className="h-12 w-12 shrink-0 overflow-hidden rounded-xl border border-black/20 bg-zinc-900">
                    <img src="/love.png" alt="Chisa & Rover Duo" className="h-full w-full object-cover object-top" />
                  </div>
                  <div>
                    <div className="flex items-center gap-1 font-cyber text-xs font-black">
                      <Users size={11} className={settings.vtuberImage === "/love.png" ? "text-rose-600" : "text-rose-400"} />
                      <span>CHISA &amp; ROVER</span>
                    </div>
                    <p className="font-mono-tech text-[10px] opacity-80">Duo Relax Mode</p>
                  </div>
                </button>
              </div>

              {/* Current Active Avatar Preview */}
              <div className="flex items-center gap-3 rounded-xl border border-white/10 bg-black/50 p-3">
                <div className="relative h-14 w-14 shrink-0 overflow-hidden rounded-xl border border-white/30 bg-zinc-900">
                  <img
                    src={settings.vtuberImage}
                    alt="Active Avatar"
                    className="h-full w-full object-cover object-top"
                    onError={(e) => {
                      ;(e.currentTarget as HTMLImageElement).src = "/chisa.png"
                    }}
                  />
                </div>
                <div className="flex-1 font-sans text-xs">
                  <p className="font-bold text-white">Avatar Aktif di Stream</p>
                  <p className="font-mono-tech text-[10px] text-zinc-400">
                    Gunakan preset Neo Tokyo, upload gambar kustom dari laptop, atau link URL.
                  </p>
                </div>
              </div>

              {/* Upload Button */}
              <input
                type="file"
                accept="image/*"
                onChange={handleAvatarFileUpload}
                ref={imageInputRef}
                className="hidden"
              />

              <button
                onClick={() => imageInputRef.current?.click()}
                className="stream-btn flex w-full cursor-pointer items-center justify-center gap-2 rounded-xl border border-dashed border-white/30 bg-white/5 px-4 py-3 font-cyber text-xs font-bold text-zinc-200 transition-all hover:border-white hover:bg-white/10 hover:text-white"
              >
                <Upload size={14} className="text-white" />
                <span>Upload Custom Mascot Image (PNG / JPG / GIF)</span>
              </button>

              {avatarUploadSuccess && (
                <div className="flex items-center justify-center gap-1.5 rounded-xl border border-emerald-500/40 bg-emerald-500/10 px-3 py-1.5 font-mono-tech text-xs text-emerald-400">
                  <Check size={14} /> Avatar berhasil diunggah &amp; tersimpan!
                </div>
              )}

              {/* Paste Image URL */}
              <form
                onSubmit={handleApplyCustomUrl}
                className="flex gap-2 border-t border-white/10 pt-2"
              >
                <div className="relative flex-1">
                  <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3 text-zinc-500">
                    <LinkIcon size={13} />
                  </div>
                  <input
                    type="url"
                    value={customUrlInput}
                    onChange={(e) => setCustomUrlInput(e.target.value)}
                    placeholder="Atau tempel Link URL gambar online..."
                    className="w-full rounded-xl border border-white/10 bg-black/60 py-2 pr-3 pl-8.5 font-sans text-xs text-white placeholder:text-zinc-600 focus:border-white/40 focus:outline-none"
                  />
                </div>
                <button
                  type="submit"
                  disabled={!customUrlInput.trim()}
                  className="shrink-0 cursor-pointer rounded-xl border border-white bg-white px-3.5 py-2 font-bold text-black transition-all hover:bg-zinc-200 disabled:cursor-not-allowed disabled:border-white/10 disabled:bg-white/10 disabled:text-zinc-600"
                >
                  Terapkan
                </button>
              </form>

              {urlAppliedSuccess && (
                <div className="flex items-center justify-center gap-1.5 rounded-xl border border-emerald-500/40 bg-emerald-500/10 px-3 py-1.5 font-mono-tech text-xs text-emerald-400">
                  <Check size={14} /> Link avatar online berhasil diterapkan!
                </div>
              )}

              {/* Preset Gallery */}
              <div className="border-t border-white/10 pt-3">
                <p className="mb-2 font-mono-tech text-[10px] font-bold text-zinc-400">
                  PRESET COMPANION GALLERY:
                </p>
                <div className="grid grid-cols-6 gap-2">
                  {AVATAR_PRESETS.map((preset) => {
                    const isSelected = settings.vtuberImage === preset.url
                    return (
                      <button
                        key={preset.id}
                        type="button"
                        onClick={() => handleSelectPreset(preset.url)}
                        className={`relative aspect-square cursor-pointer overflow-hidden rounded-xl border p-0.5 transition-all ${
                          isSelected
                            ? "scale-105 border-white bg-white/20 ring-2 ring-white/50"
                            : "border-white/10 bg-black/50 hover:scale-105 hover:border-white/40"
                        }`}
                        title={preset.name}
                      >
                        <img
                          src={preset.url}
                          alt={preset.name}
                          className="h-full w-full rounded-lg object-cover"
                        />
                        {isSelected && (
                          <div className="absolute inset-0 flex items-center justify-center bg-white/30 backdrop-blur-[1px]">
                            <Check size={14} className="text-black font-extrabold" />
                          </div>
                        )}
                      </button>
                    )
                  })}
                </div>
              </div>
            </div>
          </div>

          {/* Section 2: Durasi Waktu */}
          <div>
            <h3 className="mb-3 flex items-center gap-1.5 border-t border-white/10 pt-4 font-cyber text-xs font-bold tracking-widest text-zinc-300 uppercase">
              <Clock size={14} className="text-white" />
              <span>Durasi Timer (Menit)</span>
            </h3>
            <div className="space-y-2.5">
              {[
                { id: "work" as const, label: "FOCUS DRIVE [集中]", defaultVal: 25 },
                { id: "shortBreak" as const, label: "SHORT RECHARGE [小休]", defaultVal: 5 },
                { id: "longBreak" as const, label: "AFK / EXTENDED BREAK [大休]", defaultVal: 15 },
              ].map((item) => (
                <div
                  key={item.id}
                  className="flex items-center justify-between rounded-2xl border border-white/10 bg-black/40 p-3 transition-all hover:border-white/20"
                >
                  <label className="font-mono-tech text-xs font-bold text-zinc-200">
                    {item.label}
                  </label>
                  <div className="flex items-center gap-2">
                    <input
                      type="number"
                      min="1"
                      max="180"
                      value={settings[item.id]}
                      onChange={(e) =>
                        onUpdateSettings({
                          ...settings,
                          [item.id]: Math.max(1, parseInt(e.target.value) || 1),
                        })
                      }
                      className="w-18 rounded-xl border border-white/15 bg-black/70 px-2 py-1.5 text-center font-mono-tech text-sm font-bold text-white focus:border-white/50 focus:outline-none"
                    />
                    <span className="font-mono-tech text-xs text-zinc-500">
                      mnt
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Section 3: Pemilihan Suara Notifikasi */}
          <div>
            <h3 className="mb-3 flex items-center gap-2 border-t border-white/10 pt-4 font-cyber text-xs font-bold tracking-widest text-zinc-300 uppercase">
              <Volume2 size={14} className="text-rose-400" />
              <span>Voice Alerts &amp; Notifications</span>
            </h3>

            <div className="space-y-2 rounded-2xl border border-white/10 bg-black/40 p-3">
              {SOUND_OPTIONS.map((sound) => (
                <div key={sound.id}>
                  <label
                    className={`flex cursor-pointer items-center gap-3 rounded-xl p-3 text-xs transition-colors ${
                      settings.sound === sound.id
                        ? "border border-white/40 bg-white/10 font-bold text-white"
                        : "text-zinc-400 hover:bg-white/5"
                    }`}
                  >
                    <input
                      type="radio"
                      name="sound"
                      value={sound.id}
                      checked={settings.sound === sound.id}
                      onChange={() =>
                        onUpdateSettings({ ...settings, sound: sound.id })
                      }
                      className="h-4 w-4 cursor-pointer accent-white"
                    />
                    <div>
                      <span className="font-sans font-medium text-zinc-100">{sound.label}</span>
                      {sound.description && (
                        <p className="font-mono-tech mt-0.5 text-[10px] text-zinc-500">
                          {sound.description}
                        </p>
                      )}
                    </div>
                  </label>

                  {/* Input Teks Khusus */}
                  {sound.id === "custom-text" &&
                    settings.sound === "custom-text" && (
                      <div className="mt-2 mb-2 ml-8 pr-2">
                        <textarea
                          value={settings.customText}
                          onChange={(e) =>
                            onUpdateSettings({
                              ...settings,
                              customText: e.target.value,
                            })
                          }
                          placeholder="Ketik pesan suara Text-To-Speech untuk timer selesai..."
                          className="w-full resize-none rounded-xl border border-white/15 bg-black/70 p-3 font-sans text-xs text-white placeholder:text-zinc-600 focus:border-white/50 focus:outline-none"
                          rows={2}
                        />
                      </div>
                    )}

                  {/* Input Upload Audio */}
                  {sound.id === "custom-audio" &&
                    settings.sound === "custom-audio" && (
                      <div className="mt-2 mb-2 ml-8 pr-2">
                        <input
                          type="file"
                          accept="audio/*"
                          onChange={handleAudioUpload}
                          ref={fileInputRef}
                          className="hidden"
                        />
                        <button
                          onClick={() => fileInputRef.current?.click()}
                          className="stream-btn flex w-full cursor-pointer items-center justify-center gap-2 rounded-xl border border-dashed border-white/30 bg-black/50 px-4 py-2.5 font-mono-tech text-xs text-zinc-300 transition-colors hover:border-white hover:text-white"
                        >
                          <Upload size={14} className="text-white" />
                          {audioFileName
                            ? "Ganti File Audio"
                            : "Upload File (MP3/WAV)"}
                        </button>
                        {audioFileName && (
                          <p className="mt-2 truncate rounded-lg border border-white/10 bg-black/60 py-1 text-center font-mono-tech text-xs text-rose-400">
                            🎵 {audioFileName}
                          </p>
                        )}
                      </div>
                    )}
                </div>
              ))}
            </div>

            <button
              onClick={handleTestSound}
              disabled={
                settings.sound === "custom-audio" && !settings.customAudioUrl
              }
              className="stream-btn mt-4 flex w-full cursor-pointer items-center justify-center gap-2 rounded-2xl border border-white bg-white py-3 font-cyber text-xs font-black tracking-wider text-black transition-all hover:bg-zinc-200 active:scale-98 disabled:cursor-not-allowed disabled:opacity-40"
            >
              <Play size={15} fill="currentColor" /> TEST AUDIO ALERT
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

