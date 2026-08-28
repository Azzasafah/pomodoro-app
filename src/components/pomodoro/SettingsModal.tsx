import React, { useRef, useState, type SyntheticEvent } from 'react';
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
  Palette
} from 'lucide-react';
import type { PomodoroSettings } from '@/types/pomodoro';
import { SOUND_OPTIONS, AVATAR_PRESETS } from '@/constants/pomodoro';
import { triggerSoundAlert } from '@/utils/audio';

interface SettingsModalProps {
  isOpen: boolean;
  settings: PomodoroSettings;
  onClose: () => void;
  onUpdateSettings: (newSettings: PomodoroSettings) => void;
}

export const SettingsModal: React.FC<SettingsModalProps> = ({
  isOpen,
  settings,
  onClose,
  onUpdateSettings
}) => {
  const [audioFileName, setAudioFileName] = useState<string>('');
  const [customUrlInput, setCustomUrlInput] = useState<string>('');
  const [urlAppliedSuccess, setUrlAppliedSuccess] = useState<boolean>(false);
  const [avatarUploadSuccess, setAvatarUploadSuccess] = useState<boolean>(false);

  const fileInputRef = useRef<HTMLInputElement>(null);
  const imageInputRef = useRef<HTMLInputElement>(null);

  if (!isOpen) return null;

  const isLight = settings.themeMode === 'light';

  const handleAudioUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      // Check file size (recommend <= 4MB for localStorage)
      if (file.size > 4 * 1024 * 1024) {
        alert('Ukuran file audio terlalu besar (maks 4MB) agar dapat tersimpan permanen.');
        return;
      }

      setAudioFileName(file.name);
      const reader = new FileReader();
      reader.onload = (event) => {
        const base64Audio = event.target?.result as string;
        if (base64Audio) {
          onUpdateSettings({
            ...settings,
            customAudioUrl: base64Audio,
            sound: 'custom-audio'
          });
        }
      };
      reader.readAsDataURL(file);
    }
  };

  const handleAvatarFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file && file.type.startsWith('image/')) {
      const reader = new FileReader();
      reader.onload = (event) => {
        const base64 = event.target?.result as string;
        if (base64) {
          onUpdateSettings({
            ...settings,
            vtuberImage: base64
          });
          setAvatarUploadSuccess(true);
          setTimeout(() => setAvatarUploadSuccess(false), 3000);
        }
      };
      reader.readAsDataURL(file);
    }
  };

  const handleApplyCustomUrl = (e: SyntheticEvent) => {
    e.preventDefault();
    if (!customUrlInput.trim()) return;
    onUpdateSettings({
      ...settings,
      vtuberImage: customUrlInput.trim()
    });
    setUrlAppliedSuccess(true);
    setTimeout(() => setUrlAppliedSuccess(false), 3000);
    setCustomUrlInput('');
  };

  const handleSelectPreset = (url: string) => {
    onUpdateSettings({
      ...settings,
      vtuberImage: url
    });
  };

  const handleResetAvatar = () => {
    onUpdateSettings({
      ...settings,
      vtuberImage:
        'https://api.dicebear.com/8.x/adventurer/svg?seed=Vtuber&backgroundColor=b19cd9'
    });
  };

  const handleTestSound = () => {
    triggerSoundAlert(settings.sound, settings);
  };

  const toggleThemeMode = (mode: 'dark' | 'light') => {
    onUpdateSettings({
      ...settings,
      themeMode: mode
    });
  };

  return (
    <div
      className="fixed inset-0 bg-black/70 backdrop-blur-md flex items-center justify-center z-50 p-4 transition-all"
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
    >
      <div
        className={`border rounded-3xl w-full max-w-lg relative max-h-[90vh] overflow-y-auto shadow-2xl custom-scrollbar transition-all ${
          isLight
            ? 'bg-[#fcfaff] border-purple-300 text-gray-900 shadow-purple-900/10'
            : 'bg-[#1a1625] border-[#5c458f] text-white shadow-black/80'
        }`}
      >
        {/* Modal Header */}
        <div
          className={`sticky top-0 backdrop-blur border-b p-5 flex justify-between items-center z-10 rounded-t-3xl transition-colors ${
            isLight
              ? 'bg-white/95 border-purple-200 text-gray-900'
              : 'bg-[#100d16]/95 border-white/10 text-white'
          }`}
        >
          <div className="flex items-center gap-3">
            <div
              className={`p-2 rounded-xl border ${
                isLight
                  ? 'bg-purple-100 border-purple-300 text-purple-700'
                  : 'bg-purple-600/20 border-purple-500/30 text-[#a385db]'
              }`}
            >
              <MonitorPlay size={20} />
            </div>
            <div>
              <h2 className="text-lg font-bold">Stream Configuration</h2>
              <p className={`text-xs ${isLight ? 'text-gray-500' : 'text-gray-400'}`}>
                Sesuaikan tema tampilan, timer, avatar VTuber, &amp; alert stream
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className={`transition-colors p-2 rounded-xl cursor-pointer ${
              isLight
                ? 'text-gray-400 hover:text-gray-800 hover:bg-gray-100'
                : 'text-gray-400 hover:text-white bg-white/5 hover:bg-red-500/20 hover:text-red-400'
            }`}
            title="Tutup Modal"
          >
            <X size={18} />
          </button>
        </div>

        <div className="p-6 space-y-6">
          {/* Section 0: Theme Mode Selection (Light / Dark) */}
          <div>
            <h3
              className={`text-xs font-bold uppercase tracking-widest mb-3 flex items-center gap-2 ${
                isLight ? 'text-purple-700' : 'text-[#a385db]'
              }`}
            >
              <Palette size={14} /> Tema Tampilan Stream
            </h3>
            <div
              className={`grid grid-cols-2 gap-3 p-2.5 rounded-2xl border ${
                isLight
                  ? 'bg-purple-50/70 border-purple-200/80'
                  : 'bg-black/40 border-white/5'
              }`}
            >
              <button
                type="button"
                onClick={() => toggleThemeMode('dark')}
                className={`py-3 px-4 rounded-xl font-bold text-xs sm:text-sm flex items-center justify-center gap-2 transition-all cursor-pointer ${
                  !isLight
                    ? 'bg-[#5c458f] text-white shadow-lg border border-purple-400/40'
                    : 'bg-white/80 text-gray-700 hover:bg-white border border-gray-200'
                }`}
              >
                <Moon size={16} className={!isLight ? 'text-purple-300' : 'text-gray-500'} />
                <span>Dark Mode (Malam)</span>
              </button>

              <button
                type="button"
                onClick={() => toggleThemeMode('light')}
                className={`py-3 px-4 rounded-xl font-bold text-xs sm:text-sm flex items-center justify-center gap-2 transition-all cursor-pointer ${
                  isLight
                    ? 'bg-purple-600 text-white shadow-lg border border-purple-500'
                    : 'bg-white/5 text-gray-300 hover:bg-white/10 border border-white/10'
                }`}
              >
                <Sun size={16} className={isLight ? 'text-amber-300' : 'text-gray-400'} />
                <span>Light Mode (Pastel)</span>
              </button>
            </div>
          </div>

          {/* Section 1: Custom VTuber Avatar Settings */}
          <div>
            <div className="flex items-center justify-between mb-3 pt-2 border-t border-purple-200/40">
              <h3
                className={`text-xs font-bold uppercase tracking-widest flex items-center gap-2 ${
                  isLight ? 'text-purple-700' : 'text-[#a385db]'
                }`}
              >
                <ImageIcon size={14} /> Custom Avatar VTuber / Live2D
              </h3>
              {settings.vtuberImage !==
                'https://api.dicebear.com/8.x/adventurer/svg?seed=Vtuber&backgroundColor=b19cd9' && (
                <button
                  onClick={handleResetAvatar}
                  className={`flex items-center gap-1 text-[11px] transition-colors px-2 py-1 rounded-lg border cursor-pointer ${
                    isLight
                      ? 'bg-white text-gray-600 hover:text-gray-900 border-gray-300'
                      : 'bg-white/5 text-gray-400 hover:text-white border-white/10 hover:bg-white/10'
                  }`}
                  title="Kembalikan ke avatar default"
                >
                  <RotateCcw size={11} /> Reset Default
                </button>
              )}
            </div>

            <div
              className={`p-4 rounded-2xl border flex flex-col gap-4 ${
                isLight
                  ? 'bg-purple-50/70 border-purple-200/80'
                  : 'bg-black/40 border-white/5'
              }`}
            >
              {/* Current Preview */}
              <div
                className={`flex items-center gap-4 p-3 rounded-xl border ${
                  isLight
                    ? 'bg-white border-purple-200 shadow-sm'
                    : 'bg-black/30 border-white/5'
                }`}
              >
                <div
                  className={`w-16 h-16 rounded-2xl overflow-hidden border-2 shrink-0 shadow-lg relative group ${
                    isLight ? 'border-purple-400 bg-purple-100' : 'border-[#a385db]/50 bg-black/60'
                  }`}
                >
                  <img
                    src={settings.vtuberImage}
                    alt="Preview"
                    className="w-full h-full object-cover"
                    onError={(e) => {
                      (e.currentTarget as HTMLImageElement).src =
                        'https://api.dicebear.com/8.x/adventurer/svg?seed=Vtuber&backgroundColor=b19cd9';
                    }}
                  />
                  <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 flex items-center justify-center transition-opacity pointer-events-none">
                    <Sparkles size={14} className="text-purple-300 animate-pulse" />
                  </div>
                </div>
                <div className="text-xs flex-1 leading-relaxed">
                  <p className={`font-semibold ${isLight ? 'text-purple-900' : 'text-purple-200'}`}>
                    Avatar Aktif di Stream
                  </p>
                  <p className={`text-[11px] mt-0.5 ${isLight ? 'text-gray-500' : 'text-gray-400'}`}>
                    Mendukung file gambar lokal (PNG, JPG, GIF, WebP) atau link URL online.
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
                className={`w-full stream-btn border-2 border-dashed py-3 px-4 text-xs sm:text-sm rounded-xl flex items-center justify-center gap-2 cursor-pointer group transition-all ${
                  isLight
                    ? 'bg-white border-purple-400 hover:border-purple-600 text-purple-900 shadow-sm hover:shadow'
                    : 'bg-[#1a1625] border-[#a385db]/60 hover:border-[#a385db] text-gray-200 hover:text-white'
                }`}
              >
                <Upload
                  size={16}
                  className={`group-hover:scale-110 transition-transform ${
                    isLight ? 'text-purple-600' : 'text-[#a385db]'
                  }`}
                />
                <span className="font-semibold">
                  Upload Gambar dari Komputer (PNG / JPG / GIF)
                </span>
              </button>

              {avatarUploadSuccess && (
                <div className="flex items-center justify-center gap-1.5 text-xs text-emerald-600 bg-emerald-100/90 py-1.5 px-3 rounded-xl border border-emerald-300 font-medium">
                  <Check size={14} /> Avatar berhasil diunggah &amp; tersimpan!
                </div>
              )}

              {/* Option 2: Paste Image URL */}
              <form
                onSubmit={handleApplyCustomUrl}
                className={`flex gap-2 pt-1 border-t ${
                  isLight ? 'border-purple-200' : 'border-white/10'
                }`}
              >
                <div className="relative flex-1">
                  <div className="absolute inset-y-0 left-0 pl-2.5 flex items-center pointer-events-none text-gray-400">
                    <LinkIcon size={13} />
                  </div>
                  <input
                    type="url"
                    value={customUrlInput}
                    onChange={(e) => setCustomUrlInput(e.target.value)}
                    placeholder="Atau tempel Link URL gambar online..."
                    className={`w-full border rounded-xl pl-8 pr-3 py-2 text-xs focus:outline-none transition-colors ${
                      isLight
                        ? 'bg-white border-purple-200 text-gray-900 placeholder:text-gray-400 focus:border-purple-500'
                        : 'bg-black/60 border-white/10 text-white placeholder:text-gray-500 focus:border-[#a385db]'
                    }`}
                  />
                </div>
                <button
                  type="submit"
                  disabled={!customUrlInput.trim()}
                  className={`px-3.5 py-2 rounded-xl text-xs font-semibold transition-colors disabled:opacity-40 disabled:cursor-not-allowed cursor-pointer shrink-0 ${
                    isLight
                      ? 'bg-purple-600 text-white hover:bg-purple-700'
                      : 'bg-[#a385db]/20 text-[#a385db] border border-[#a385db]/50 hover:bg-[#a385db] hover:text-white'
                  }`}
                >
                  Terapkan
                </button>
              </form>

              {urlAppliedSuccess && (
                <div className="flex items-center justify-center gap-1.5 text-xs text-emerald-600 bg-emerald-100/90 py-1.5 px-3 rounded-xl border border-emerald-300 font-medium">
                  <Check size={14} /> Link avatar online berhasil diterapkan!
                </div>
              )}

              {/* Preset Gallery */}
              <div
                className={`pt-2 border-t ${isLight ? 'border-purple-200' : 'border-white/10'}`}
              >
                <p
                  className={`text-[11px] font-semibold mb-2.5 ${
                    isLight ? 'text-purple-900' : 'text-gray-400'
                  }`}
                >
                  Pilih Cepat Avatar Preset:
                </p>
                <div className="grid grid-cols-6 gap-2">
                  {AVATAR_PRESETS.map((preset) => {
                    const isSelected = settings.vtuberImage === preset.url;
                    return (
                      <button
                        key={preset.id}
                        type="button"
                        onClick={() => handleSelectPreset(preset.url)}
                        className={`relative rounded-xl overflow-hidden aspect-square border-2 transition-all p-0.5 cursor-pointer ${
                          isSelected
                            ? isLight
                              ? 'border-purple-600 ring-2 ring-purple-400/50 scale-105 bg-purple-100'
                              : 'border-[#a385db] ring-2 ring-[#a385db]/50 scale-105 bg-black/50'
                            : isLight
                            ? 'border-purple-200 hover:border-purple-400 hover:scale-102 bg-white'
                            : 'border-white/10 hover:border-purple-400/60 hover:scale-102 bg-black/50'
                        }`}
                        title={preset.name}
                      >
                        <img
                          src={preset.url}
                          alt={preset.name}
                          className="w-full h-full object-cover rounded-lg"
                        />
                        {isSelected && (
                          <div className="absolute inset-0 bg-purple-600/40 flex items-center justify-center">
                            <Check size={14} className="text-white drop-shadow-md" />
                          </div>
                        )}
                      </button>
                    );
                  })}
                </div>
              </div>
            </div>
          </div>

          {/* Section 2: Durasi Waktu */}
          <div>
            <h3
              className={`text-xs font-bold uppercase tracking-widest mb-3 flex items-center gap-1.5 pt-2 border-t ${
                isLight ? 'text-purple-700 border-purple-200/40' : 'text-[#a385db] border-white/10'
              }`}
            >
              <BookOpen size={14} /> Durasi Timer Scene (Menit)
            </h3>
            <div className="space-y-2.5">
              {[
                { id: 'work' as const, label: 'Study (Sesi Fokus)' },
                { id: 'shortBreak' as const, label: 'Zatsudan (Rehat Pendek)' },
                { id: 'longBreak' as const, label: 'AFK / BRB (Rehat Panjang)' }
              ].map((item) => (
                <div
                  key={item.id}
                  className={`flex justify-between items-center p-3 rounded-2xl border transition-all ${
                    isLight
                      ? 'bg-purple-50/70 border-purple-200/80 hover:border-purple-400'
                      : 'bg-black/40 border-white/5 hover:border-purple-500/20'
                  }`}
                >
                  <label
                    className={`text-xs sm:text-sm font-semibold ${
                      isLight ? 'text-gray-800' : 'text-gray-300'
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
                          [item.id]: Math.max(1, parseInt(e.target.value) || 1)
                        })
                      }
                      className={`w-18 border rounded-xl text-center py-1.5 px-2 text-sm font-bold focus:outline-none transition-colors ${
                        isLight
                          ? 'bg-white border-purple-200 text-gray-900 focus:border-purple-600'
                          : 'bg-black/60 border-white/15 text-white focus:border-[#a385db]'
                      }`}
                    />
                    <span className={`text-xs ${isLight ? 'text-gray-500' : 'text-gray-400'}`}>
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
              className={`text-xs font-bold uppercase tracking-widest mb-3 flex items-center gap-2 pt-2 border-t ${
                isLight ? 'text-purple-700 border-purple-200/40' : 'text-[#a385db] border-white/10'
              }`}
            >
              <Volume2 size={14} /> Alerts &amp; Notifications
            </h3>

            <div
              className={`space-y-1.5 p-2.5 rounded-2xl border ${
                isLight
                  ? 'bg-purple-50/70 border-purple-200/80'
                  : 'bg-black/40 border-white/5'
              }`}
            >
              {SOUND_OPTIONS.map((sound) => (
                <div key={sound.id}>
                  <label
                    className={`flex items-center gap-3 p-3 cursor-pointer transition-colors text-xs sm:text-sm rounded-xl ${
                      settings.sound === sound.id
                        ? isLight
                          ? 'bg-purple-200/80 text-purple-950 font-bold border border-purple-300'
                          : 'bg-[#7a54c7]/25 text-[#c4b5fd] font-semibold border border-purple-500/30'
                        : isLight
                        ? 'text-gray-700 hover:bg-purple-100/50'
                        : 'text-gray-400 hover:bg-white/5'
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
                      className="w-4 h-4 accent-purple-600 cursor-pointer"
                    />
                    <div>
                      <span>{sound.label}</span>
                      {sound.description && (
                        <p
                          className={`text-[11px] font-normal mt-0.5 ${
                            isLight ? 'text-gray-500' : 'text-gray-400'
                          }`}
                        >
                          {sound.description}
                        </p>
                      )}
                    </div>
                  </label>

                  {/* Input Teks Khusus */}
                  {sound.id === 'custom-text' && settings.sound === 'custom-text' && (
                    <div className="ml-8 mt-2 mb-2 pr-2">
                      <textarea
                        value={settings.customText}
                        onChange={(e) =>
                          onUpdateSettings({
                            ...settings,
                            customText: e.target.value
                          })
                        }
                        placeholder="Ketik pesan suara Text-To-Speech untuk timer selesai..."
                        className={`w-full border p-3 rounded-xl text-xs sm:text-sm focus:outline-none resize-none transition-colors ${
                          isLight
                            ? 'bg-white border-purple-200 text-gray-900 focus:border-purple-600'
                            : 'bg-black/60 border-white/15 text-white focus:border-[#a385db]'
                        }`}
                        rows={2}
                      />
                    </div>
                  )}

                  {/* Input Upload Audio */}
                  {sound.id === 'custom-audio' && settings.sound === 'custom-audio' && (
                    <div className="ml-8 mt-2 mb-2 pr-2">
                      <input
                        type="file"
                        accept="audio/*"
                        onChange={handleAudioUpload}
                        ref={fileInputRef}
                        className="hidden"
                      />
                      <button
                        onClick={() => fileInputRef.current?.click()}
                        className={`w-full stream-btn border border-dashed py-3 px-4 text-xs sm:text-sm rounded-xl flex items-center justify-center gap-2 cursor-pointer transition-colors ${
                          isLight
                            ? 'bg-white border-purple-300 text-purple-900 hover:bg-purple-100'
                            : 'bg-[#1a1625] border-[#a385db]/60 text-gray-300 hover:text-white'
                        }`}
                      >
                        <Upload
                          size={15}
                          className={isLight ? 'text-purple-600' : 'text-[#a385db]'}
                        />
                        {audioFileName ? 'Ganti File Audio' : 'Upload File (MP3/WAV)'}
                      </button>
                      {audioFileName && (
                        <p
                          className={`text-xs truncate mt-2 text-center py-1.5 rounded-lg border ${
                            isLight
                              ? 'bg-purple-100 text-purple-900 border-purple-200'
                              : 'bg-black/40 text-[#a385db] border-white/5'
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
              disabled={settings.sound === 'custom-audio' && !settings.customAudioUrl}
              className={`stream-btn w-full mt-4 py-3 rounded-2xl font-bold text-xs sm:text-sm flex justify-center items-center gap-2 cursor-pointer active:scale-98 disabled:opacity-50 disabled:cursor-not-allowed transition-all ${
                isLight
                  ? 'bg-purple-600 text-white hover:bg-purple-700 shadow-md'
                  : 'bg-transparent border-2 border-[#a385db] text-[#a385db] hover:bg-[#a385db] hover:text-[#1a1625]'
              }`}
            >
              <Play size={16} fill="currentColor" /> TEST ALERT SOUND
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
