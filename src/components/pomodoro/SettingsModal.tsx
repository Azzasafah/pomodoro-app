import React, { useRef, useState, type SyntheticEvent } from "react"
import {
  X,
  MonitorPlay,
  BookOpen,
  Volume2,
  Upload,
  Play,
  Image as ImageIcon,
  Link as LinkIcon,
  RotateCcw,
  Check,
  Sparkles,
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
      // Check file size (recommend <= 4MB for localStorage)
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
      vtuberImage:
        "https://api.dicebear.com/8.x/adventurer/svg?seed=Vtuber&backgroundColor=b19cd9",
    })
  }

  const handleTestSound = () => {
    triggerSoundAlert(settings.sound, settings)
  }

  const toggleThemeMode = (mode: "dark" | "light") => {
    onUpdateSettings({
      ...settings,
      themeMode: mode,
    })
  }

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 p-4 backdrop-blur-md transition-all"
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose()
      }}
    >
      <div
        className={`custom-scrollbar relative max-h-[90vh] w-full max-w-lg overflow-y-auto rounded-3xl border shadow-2xl transition-all ${
          isLight
            ? "border-purple-300 bg-[#fcfaff] text-gray-900 shadow-purple-900/10"
            : "border-[#5c458f] bg-[#1a1625] text-white shadow-black/80"
        }`}
      >
        {/* Modal Header */}
        <div
          className={`sticky top-0 z-10 flex items-center justify-between rounded-t-3xl border-b p-5 backdrop-blur transition-colors ${
            isLight
              ? "border-purple-200 bg-white/95 text-gray-900"
              : "border-white/10 bg-[#100d16]/95 text-white"
          }`}
        >
          <div className="flex items-center gap-3">
            <div
              className={`rounded-xl border p-2 ${
                isLight
                  ? "border-purple-300 bg-purple-100 text-purple-700"
                  : "border-purple-500/30 bg-purple-600/20 text-[#a385db]"
              }`}
            >
              <MonitorPlay size={20} />
            </div>
            <div>
              <h2 className="text-lg font-bold">Stream Configuration</h2>
              <p
                className={`text-xs ${isLight ? "text-gray-500" : "text-gray-400"}`}
              >
                Sesuaikan tema tampilan, timer, avatar VTuber, &amp; alert
                stream
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className={`cursor-pointer rounded-xl p-2 transition-colors ${
              isLight
                ? "text-gray-400 hover:bg-gray-100 hover:text-gray-800"
                : "bg-white/5 text-gray-400 hover:bg-red-500/20 hover:text-red-400 hover:text-white"
            }`}
            title="Tutup Modal"
          >
            <X size={18} />
          </button>
        </div>

        <div className="space-y-6 p-6">
          {/* Section 0: Theme Mode Selection (Light / Dark) */}
          <div>
            <h3
              className={`mb-3 flex items-center gap-2 text-xs font-bold tracking-widest uppercase ${
                isLight ? "text-purple-700" : "text-[#a385db]"
              }`}
            >
              <Palette size={14} /> Tema Tampilan Stream
            </h3>
            <div
              className={`grid grid-cols-2 gap-3 rounded-2xl border p-2.5 ${
                isLight
                  ? "border-purple-200/80 bg-purple-50/70"
                  : "border-white/5 bg-black/40"
              }`}
            >
              <button
                type="button"
                onClick={() => toggleThemeMode("dark")}
                className={`flex cursor-pointer items-center justify-center gap-2 rounded-xl px-4 py-3 text-xs font-bold transition-all sm:text-sm ${
                  !isLight
                    ? "border border-purple-400/40 bg-[#5c458f] text-white shadow-lg"
                    : "border border-gray-200 bg-white/80 text-gray-700 hover:bg-white"
                }`}
              >
                <Moon
                  size={16}
                  className={!isLight ? "text-purple-300" : "text-gray-500"}
                />
                <span>Dark Mode (Malam)</span>
              </button>

              <button
                type="button"
                onClick={() => toggleThemeMode("light")}
                className={`flex cursor-pointer items-center justify-center gap-2 rounded-xl px-4 py-3 text-xs font-bold transition-all sm:text-sm ${
                  isLight
                    ? "border border-purple-500 bg-purple-600 text-white shadow-lg"
                    : "border border-white/10 bg-white/5 text-gray-300 hover:bg-white/10"
                }`}
              >
                <Sun
                  size={16}
                  className={isLight ? "text-amber-300" : "text-gray-400"}
                />
                <span>Light Mode (Pastel)</span>
              </button>
            </div>
          </div>

          {/* Section 1: Custom VTuber Avatar Settings */}
          <div>
            <div className="mb-3 flex items-center justify-between border-t border-purple-200/40 pt-2">
              <h3
                className={`flex items-center gap-2 text-xs font-bold tracking-widest uppercase ${
                  isLight ? "text-purple-700" : "text-[#a385db]"
                }`}
              >
                <ImageIcon size={14} /> Custom Avatar VTuber / Live2D
              </h3>
              {settings.vtuberImage !==
                "https://api.dicebear.com/8.x/adventurer/svg?seed=Vtuber&backgroundColor=b19cd9" && (
                <button
                  onClick={handleResetAvatar}
                  className={`flex cursor-pointer items-center gap-1 rounded-lg border px-2 py-1 text-[11px] transition-colors ${
                    isLight
                      ? "border-gray-300 bg-white text-gray-600 hover:text-gray-900"
                      : "border-white/10 bg-white/5 text-gray-400 hover:bg-white/10 hover:text-white"
                  }`}
                  title="Kembalikan ke avatar default"
                >
                  <RotateCcw size={11} /> Reset Default
                </button>
              )}
            </div>

            <div
              className={`flex flex-col gap-4 rounded-2xl border p-4 ${
                isLight
                  ? "border-purple-200/80 bg-purple-50/70"
                  : "border-white/5 bg-black/40"
              }`}
            >
              {/* Current Preview */}
              <div
                className={`flex items-center gap-4 rounded-xl border p-3 ${
                  isLight
                    ? "border-purple-200 bg-white shadow-sm"
                    : "border-white/5 bg-black/30"
                }`}
              >
                <div
                  className={`group relative h-16 w-16 shrink-0 overflow-hidden rounded-2xl border-2 shadow-lg ${
                    isLight
                      ? "border-purple-400 bg-purple-100"
                      : "border-[#a385db]/50 bg-black/60"
                  }`}
                >
                  <img
                    src={settings.vtuberImage}
                    alt="Preview"
                    className="h-full w-full object-cover"
                    onError={(e) => {
                      ;(e.currentTarget as HTMLImageElement).src =
                        "https://api.dicebear.com/8.x/adventurer/svg?seed=Vtuber&backgroundColor=b19cd9"
                    }}
                  />
                  <div className="pointer-events-none absolute inset-0 flex items-center justify-center bg-black/40 opacity-0 transition-opacity group-hover:opacity-100">
                    <Sparkles
                      size={14}
                      className="animate-pulse text-purple-300"
                    />
                  </div>
                </div>
                <div className="flex-1 text-xs leading-relaxed">
                  <p
                    className={`font-semibold ${isLight ? "text-purple-900" : "text-purple-200"}`}
                  >
                    Avatar Aktif di Stream
                  </p>
                  <p
                    className={`mt-0.5 text-[11px] ${isLight ? "text-gray-500" : "text-gray-400"}`}
                  >
                    Mendukung file gambar lokal (PNG, JPG, GIF, WebP) atau link
                    URL online.
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
                className={`stream-btn group flex w-full cursor-pointer items-center justify-center gap-2 rounded-xl border-2 border-dashed px-4 py-3 text-xs transition-all sm:text-sm ${
                  isLight
                    ? "border-purple-400 bg-white text-purple-900 shadow-sm hover:border-purple-600 hover:shadow"
                    : "border-[#a385db]/60 bg-[#1a1625] text-gray-200 hover:border-[#a385db] hover:text-white"
                }`}
              >
                <Upload
                  size={16}
                  className={`transition-transform group-hover:scale-110 ${
                    isLight ? "text-purple-600" : "text-[#a385db]"
                  }`}
                />
                <span className="font-semibold">
                  Upload Gambar dari Komputer (PNG / JPG / GIF)
                </span>
              </button>

              {avatarUploadSuccess && (
                <div className="flex items-center justify-center gap-1.5 rounded-xl border border-emerald-300 bg-emerald-100/90 px-3 py-1.5 text-xs font-medium text-emerald-600">
                  <Check size={14} /> Avatar berhasil diunggah &amp; tersimpan!
                </div>
              )}

              {/* Option 2: Paste Image URL */}
              <form
                onSubmit={handleApplyCustomUrl}
                className={`flex gap-2 border-t pt-1 ${
                  isLight ? "border-purple-200" : "border-white/10"
                }`}
              >
                <div className="relative flex-1">
                  <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-2.5 text-gray-400">
                    <LinkIcon size={13} />
                  </div>
                  <input
                    type="url"
                    value={customUrlInput}
                    onChange={(e) => setCustomUrlInput(e.target.value)}
                    placeholder="Atau tempel Link URL gambar online..."
                    className={`w-full rounded-xl border py-2 pr-3 pl-8 text-xs transition-colors focus:outline-none ${
                      isLight
                        ? "border-purple-200 bg-white text-gray-900 placeholder:text-gray-400 focus:border-purple-500"
                        : "border-white/10 bg-black/60 text-white placeholder:text-gray-500 focus:border-[#a385db]"
                    }`}
                  />
                </div>
                <button
                  type="submit"
                  disabled={!customUrlInput.trim()}
                  className={`shrink-0 cursor-pointer rounded-xl px-3.5 py-2 text-xs font-semibold transition-colors disabled:cursor-not-allowed disabled:opacity-40 ${
                    isLight
                      ? "bg-purple-600 text-white hover:bg-purple-700"
                      : "border border-[#a385db]/50 bg-[#a385db]/20 text-[#a385db] hover:bg-[#a385db] hover:text-white"
                  }`}
                >
                  Terapkan
                </button>
              </form>

              {urlAppliedSuccess && (
                <div className="flex items-center justify-center gap-1.5 rounded-xl border border-emerald-300 bg-emerald-100/90 px-3 py-1.5 text-xs font-medium text-emerald-600">
                  <Check size={14} /> Link avatar online berhasil diterapkan!
                </div>
              )}

              {/* Preset Gallery */}
              <div
                className={`border-t pt-2 ${isLight ? "border-purple-200" : "border-white/10"}`}
              >
                <p
                  className={`mb-2.5 text-[11px] font-semibold ${
                    isLight ? "text-purple-900" : "text-gray-400"
                  }`}
                >
                  Pilih Cepat Avatar Preset:
                </p>
                <div className="grid grid-cols-6 gap-2">
                  {AVATAR_PRESETS.map((preset) => {
                    const isSelected = settings.vtuberImage === preset.url
                    return (
                      <button
                        key={preset.id}
                        type="button"
                        onClick={() => handleSelectPreset(preset.url)}
                        className={`relative aspect-square cursor-pointer overflow-hidden rounded-xl border-2 p-0.5 transition-all ${
                          isSelected
                            ? isLight
                              ? "scale-105 border-purple-600 bg-purple-100 ring-2 ring-purple-400/50"
                              : "scale-105 border-[#a385db] bg-black/50 ring-2 ring-[#a385db]/50"
                            : isLight
                              ? "border-purple-200 bg-white hover:scale-102 hover:border-purple-400"
                              : "border-white/10 bg-black/50 hover:scale-102 hover:border-purple-400/60"
                        }`}
                        title={preset.name}
                      >
                        <img
                          src={preset.url}
                          alt={preset.name}
                          className="h-full w-full rounded-lg object-cover"
                        />
                        {isSelected && (
                          <div className="absolute inset-0 flex items-center justify-center bg-purple-600/40">
                            <Check
                              size={14}
                              className="text-white drop-shadow-md"
                            />
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
            <h3
              className={`mb-3 flex items-center gap-1.5 border-t pt-2 text-xs font-bold tracking-widest uppercase ${
                isLight
                  ? "border-purple-200/40 text-purple-700"
                  : "border-white/10 text-[#a385db]"
              }`}
            >
              <BookOpen size={14} /> Durasi Timer Scene (Menit)
            </h3>
            <div className="space-y-2.5">
              {[
                { id: "work" as const, label: "Study (Sesi Fokus)" },
                { id: "shortBreak" as const, label: "Zatsudan (Rehat Pendek)" },
                {
                  id: "longBreak" as const,
                  label: "AFK / BRB (Rehat Panjang)",
                },
              ].map((item) => (
                <div
                  key={item.id}
                  className={`flex items-center justify-between rounded-2xl border p-3 transition-all ${
                    isLight
                      ? "border-purple-200/80 bg-purple-50/70 hover:border-purple-400"
                      : "border-white/5 bg-black/40 hover:border-purple-500/20"
                  }`}
                >
                  <label
                    className={`text-xs font-semibold sm:text-sm ${
                      isLight ? "text-gray-800" : "text-gray-300"
                    }`}
                  >
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
                      className={`w-18 rounded-xl border px-2 py-1.5 text-center text-sm font-bold transition-colors focus:outline-none ${
                        isLight
                          ? "border-purple-200 bg-white text-gray-900 focus:border-purple-600"
                          : "border-white/15 bg-black/60 text-white focus:border-[#a385db]"
                      }`}
                    />
                    <span
                      className={`text-xs ${isLight ? "text-gray-500" : "text-gray-400"}`}
                    >
                      mnt
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Section 3: Pemilihan Suara Notifikasi */}
          <div>
            <h3
              className={`mb-3 flex items-center gap-2 border-t pt-2 text-xs font-bold tracking-widest uppercase ${
                isLight
                  ? "border-purple-200/40 text-purple-700"
                  : "border-white/10 text-[#a385db]"
              }`}
            >
              <Volume2 size={14} /> Alerts &amp; Notifications
            </h3>

            <div
              className={`space-y-1.5 rounded-2xl border p-2.5 ${
                isLight
                  ? "border-purple-200/80 bg-purple-50/70"
                  : "border-white/5 bg-black/40"
              }`}
            >
              {SOUND_OPTIONS.map((sound) => (
                <div key={sound.id}>
                  <label
                    className={`flex cursor-pointer items-center gap-3 rounded-xl p-3 text-xs transition-colors sm:text-sm ${
                      settings.sound === sound.id
                        ? isLight
                          ? "border border-purple-300 bg-purple-200/80 font-bold text-purple-950"
                          : "border border-purple-500/30 bg-[#7a54c7]/25 font-semibold text-[#c4b5fd]"
                        : isLight
                          ? "text-gray-700 hover:bg-purple-100/50"
                          : "text-gray-400 hover:bg-white/5"
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
                      className="h-4 w-4 cursor-pointer accent-purple-600"
                    />
                    <div>
                      <span>{sound.label}</span>
                      {sound.description && (
                        <p
                          className={`mt-0.5 text-[11px] font-normal ${
                            isLight ? "text-gray-500" : "text-gray-400"
                          }`}
                        >
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
                          className={`w-full resize-none rounded-xl border p-3 text-xs transition-colors focus:outline-none sm:text-sm ${
                            isLight
                              ? "border-purple-200 bg-white text-gray-900 focus:border-purple-600"
                              : "border-white/15 bg-black/60 text-white focus:border-[#a385db]"
                          }`}
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
                          className={`stream-btn flex w-full cursor-pointer items-center justify-center gap-2 rounded-xl border border-dashed px-4 py-3 text-xs transition-colors sm:text-sm ${
                            isLight
                              ? "border-purple-300 bg-white text-purple-900 hover:bg-purple-100"
                              : "border-[#a385db]/60 bg-[#1a1625] text-gray-300 hover:text-white"
                          }`}
                        >
                          <Upload
                            size={15}
                            className={
                              isLight ? "text-purple-600" : "text-[#a385db]"
                            }
                          />
                          {audioFileName
                            ? "Ganti File Audio"
                            : "Upload File (MP3/WAV)"}
                        </button>
                        {audioFileName && (
                          <p
                            className={`mt-2 truncate rounded-lg border py-1.5 text-center text-xs ${
                              isLight
                                ? "border-purple-200 bg-purple-100 text-purple-900"
                                : "border-white/5 bg-black/40 text-[#a385db]"
                            }`}
                          >
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
              className={`stream-btn mt-4 flex w-full cursor-pointer items-center justify-center gap-2 rounded-2xl py-3 text-xs font-bold transition-all active:scale-98 disabled:cursor-not-allowed disabled:opacity-50 sm:text-sm ${
                isLight
                  ? "bg-purple-600 text-white shadow-md hover:bg-purple-700"
                  : "border-2 border-[#a385db] bg-transparent text-[#a385db] hover:bg-[#a385db] hover:text-[#1a1625]"
              }`}
            >
              <Play size={16} fill="currentColor" /> TEST ALERT SOUND
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
