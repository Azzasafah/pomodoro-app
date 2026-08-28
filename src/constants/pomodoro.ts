import type { PomodoroSettings, SoundOption, TodoItem, ThemeColors, TimerMode } from '@/types/pomodoro';

export const DEFAULT_SETTINGS: PomodoroSettings = {
  work: 25,
  shortBreak: 5,
  longBreak: 15,
  sound: 'vtuber-start',
  customText: 'Terima kasih atas superchatnya! Sesi fokus telah selesai!',
  customAudioUrl: null,
  vtuberImage: 'https://api.dicebear.com/8.x/adventurer/svg?seed=Vtuber&backgroundColor=b19cd9',
  themeMode: 'dark'
};

export const INITIAL_TODOS: TodoItem[] = [
  { id: 1, text: 'Beresin PR Matematika', completed: false },
  { id: 2, text: 'Review Catatan Kuliah', completed: false },
  { id: 3, text: 'Minum Air (Stay Hydrated 💧)', completed: true }
];

export const AVATAR_PRESETS = [
  {
    id: 'default',
    name: 'Lilac Adventurer',
    url: 'https://api.dicebear.com/8.x/adventurer/svg?seed=Vtuber&backgroundColor=b19cd9'
  },
  {
    id: 'neko',
    name: 'Neko Chan 🐾',
    url: 'https://api.dicebear.com/8.x/adventurer/svg?seed=NekoChan&backgroundColor=ffc0cb'
  },
  {
    id: 'cyber',
    name: 'Cyber Kitsune 🦊',
    url: 'https://api.dicebear.com/8.x/adventurer/svg?seed=CyberKitsune&backgroundColor=87ceeb'
  },
  {
    id: 'scholar',
    name: 'Study Senpai 📚',
    url: 'https://api.dicebear.com/8.x/adventurer/svg?seed=StudySenpai&backgroundColor=ffd700'
  },
  {
    id: 'cozy',
    name: 'Cozy Barista ☕',
    url: 'https://api.dicebear.com/8.x/lorelei/svg?seed=CozyBarista&backgroundColor=ff9ecd'
  },
  {
    id: 'pixel',
    name: 'Pixel Robo 🤖',
    url: 'https://api.dicebear.com/8.x/bottts/svg?seed=PixelBot&backgroundColor=7a54c7'
  }
];

export const SOUND_OPTIONS: SoundOption[] = [
  {
    id: 'vtuber-start',
    label: '🎙️ "Ayo mulai belajar!"',
    text: 'Semuanya, siapkan catatannya ya! Ayo kita mulai sesi fokusnya!',
    description: 'Suara TTS VTuber berbahasa Indonesia'
  },
  {
    id: 'vtuber-break',
    label: '☕ "Otsukare! (Rehat)"',
    text: 'Otsukare! Kerja bagus semuanya. Istirahat dulu yuk, minum air jangan lupa!',
    description: 'Suara TTS ramah untuk waktu istirahat'
  },
  {
    id: 'custom-text',
    label: '💬 Text-to-Speech (Custom)',
    text: '',
    description: 'Ketik pesan teks sendiri yang akan dibacakan oleh suara TTS'
  },
  {
    id: 'custom-audio',
    label: '🎵 Upload MP3/Audio Sendiri',
    text: '',
    description: 'Gunakan file audio lokal dari komputermu'
  },
  {
    id: 'beep',
    label: '🔔 Lonceng Sekolah (Chime)',
    text: '',
    description: 'Sintesis nada melodi 4-nada lonceng sekolah ceria'
  }
];

export const DUMMY_CHATS_POOL = [
  { name: "Nekomata 🐾", msg: "Semangat belajarnya!! Let's go~ ✨", color: "#ff9ecd" },
  { name: "SkyBlue 🌌", msg: "Pomodoro-nya sisa bentar lagi gan 🔥", color: "#87ceeb" },
  { name: "Pochi_kun 🐶", msg: "Lofi nya enak banget buat fokus www", color: "#ffd700" },
  { name: "Anon_123 ☕", msg: "Otsukare~ jangan lupa minum air 🥤", color: "#98fb98" },
  { name: "Kusa_ 草", msg: "Fokus fokus! PR siap kelar 💪", color: "#ffa07a" },
  { name: "Sakura_M 🌸", msg: "Sesi pomodoro ke-3 hari ini! Mantap", color: "#f472b6" },
  { name: "HoloFan 🎧", msg: "Bg music lofi-nya calming parah 🎧", color: "#c084fc" },
  { name: "ZatsudanLover", msg: "Senpai, jangan lupa regangkan bahu ya!", color: "#38bdf8" },
  { name: "MidnightCoder", msg: "Selesai 1 modul coding malam ini 💻✨", color: "#a78bfa" }
];

export const THEMES: Record<TimerMode, ThemeColors> = {
  work: {
    border: 'border-[#ff9ecd]',
    bg: 'bg-[#ff9ecd]',
    text: 'text-[#1e1a2b]',
    accent: '#ff9ecd',
    pillBg: 'bg-[#ff9ecd]/20',
    pillBorder: 'border-[#ff9ecd]/40',
    pillText: 'text-[#ff9ecd]'
  },
  shortBreak: {
    border: 'border-[#87ceeb]',
    bg: 'bg-[#87ceeb]',
    text: 'text-[#1e1a2b]',
    accent: '#87ceeb',
    pillBg: 'bg-[#87ceeb]/20',
    pillBorder: 'border-[#87ceeb]/40',
    pillText: 'text-[#87ceeb]'
  },
  longBreak: {
    border: 'border-[#b19cd9]',
    bg: 'bg-[#b19cd9]',
    text: 'text-[#1e1a2b]',
    accent: '#b19cd9',
    pillBg: 'bg-[#b19cd9]/20',
    pillBorder: 'border-[#b19cd9]/40',
    pillText: 'text-[#b19cd9]'
  }
};
