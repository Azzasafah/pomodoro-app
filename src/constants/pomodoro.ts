import type {
  PomodoroSettings,
  SoundOption,
  TodoItem,
  ThemeColors,
  TimerMode,
} from "@/types/pomodoro"

export const DEFAULT_SETTINGS: PomodoroSettings = {
  work: 25,
  shortBreak: 5,
  longBreak: 15,
  sound: "vtuber-start",
  customText: "『任務完了』お疲れ様でした！Sesi fokus Neo Tokyo telah selesai!",
  customAudioUrl: null,
  vtuberImage: "/chisa.png",
  themeMode: "light",
}


export const INITIAL_TODOS: TodoItem[] = [
  { id: 1, text: "【任務01】Selesaikan Algoritma & Math Logic", completed: false },
  { id: 2, text: "【任務02】Review Code & Cyber Architecture", completed: false },
  { id: 3, text: "【補給】Recharge & Stay Hydrated 💧", completed: true },
]

export const AVATAR_PRESETS = [
  {
    id: "chisa-solo",
    name: "Chisa ⚡ (Solo Techwear)",
    url: "/chisa.png",
    subtitle: "UNIT-01 // FOCUS MODE",
  },
  {
    id: "chisa-duo",
    name: "Chisa & Rover ☕ (Duo Relax)",
    url: "/love.png",
    subtitle: "UNIT-02 // CO-OP MODE",
  },
  {
    id: "cyber-kitsune",
    name: "Cyber Kitsune 🦊",
    url: "https://api.dicebear.com/8.x/adventurer/svg?seed=CyberKitsune&backgroundColor=121217",
    subtitle: "AI COMPANION",
  },
  {
    id: "study-senpai",
    name: "Study Senpai 📚",
    url: "https://api.dicebear.com/8.x/adventurer/svg?seed=StudySenpai&backgroundColor=121217",
    subtitle: "TACTICAL MENTOR",
  },
  {
    id: "neko-chan",
    name: "Neko Operative 🐾",
    url: "https://api.dicebear.com/8.x/adventurer/svg?seed=NekoChan&backgroundColor=121217",
    subtitle: "RECON SCOUT",
  },
  {
    id: "pixel-robo",
    name: "Mecha Bot 🤖",
    url: "https://api.dicebear.com/8.x/bottts/svg?seed=PixelBot&backgroundColor=121217",
    subtitle: "CYBER CORE",
  },
]

export const SOUND_OPTIONS: SoundOption[] = [
  {
    id: "vtuber-start",
    label: '🎙️ "Ayo mulai fokus! (Chisa Voice)"',
    text: "Semuanya, sistem aktif! Ayo kita mulai sesi fokus belajarnya sekarang!",
    description: "Operator Voice: TTS Chisa Anime Bahasa Indonesia",
  },
  {
    id: "vtuber-break",
    label: '☕ "Otsukare Sama! (Break Time)"',
    text: "Otsukaresama! Kerja keras yang hebat. Istirahat sejenak dan minum air ya!",
    description: "Voice Alert: Rehat sejenak bersama Chisa & Rover",
  },
  {
    id: "custom-text",
    label: "💬 Text-to-Speech (Custom Command)",
    text: "",
    description: "Input audio synth kustom yang akan disuarakan",
  },
  {
    id: "custom-audio",
    label: "🎵 Upload Audio Sendiri (MP3 / WAV)",
    text: "",
    description: "Gunakan file audio lokal komputermu",
  },
  {
    id: "beep",
    label: "🔔 Cyber Chime (Neo Bell)",
    text: "",
    description: "Sintesis nada digital 4-tone Neo Tokyo",
  },
]

export const DUMMY_CHATS_POOL = [
  {
    name: "Chisa_Simp ⚡",
    msg: "Chisa-chan semangat banget hari ini! Let's go fokus~ ✨",
    color: "#ff2a5f",
    badge: "VIP" as const,
  },
  {
    name: "CyberGhost 🌌",
    msg: "Sesi Pomodoro 25 menit dimulai! Matikan notif HP 📵",
    color: "#e2e8f0",
  },
  {
    name: "NeoRunner_99 🏙️",
    msg: "Suasana Neo Tokyo-nya dapet banget, lofi beat mantap 🎧",
    color: "#f4f4f5",
  },
  {
    name: "Akira_草 🍵",
    msg: "Otsukare senpai! PR coding langsung kelar gas pol 💪",
    color: "#a1a1aa",
  },
  {
    name: "KuroNeko 🐾",
    msg: "Chisa di avatar imut banget wwwww 🖤🤍",
    color: "#ff2a5f",
  },
  {
    name: "Rover_Main ☕",
    msg: "Duo mode rover x chisa adem bener dilihatnya ✨",
    color: "#38bdf8",
    badge: "VIP" as const,
  },
  {
    name: "GhostInShell 💻",
    msg: "Module compile complete! Fokus sesi ke-2 jalan terus 🚀",
    color: "#e4e4e7",
  },
  {
    name: "ZatsudanLover 🌸",
    msg: "Jangan lupa stretch bahu & minum air senpai! 💧",
    color: "#fb7185",
  },
  {
    name: "System_Operator 🤖",
    msg: "NEO_TOKYO_SYNC: 99.8% OPTIMAL. Focus drive active.",
    color: "#ffffff",
    badge: "SYS" as const,
  },
]

export const THEMES: Record<TimerMode, ThemeColors> = {
  work: {
    border: "border-white/30",
    bg: "bg-white",
    text: "text-black font-extrabold",
    accent: "#ffffff",
    pillBg: "bg-white/15",
    pillBorder: "border-white/40",
    pillText: "text-white",
  },
  shortBreak: {
    border: "border-zinc-400/40",
    bg: "bg-zinc-200",
    text: "text-black font-extrabold",
    accent: "#e4e4e7",
    pillBg: "bg-white/10",
    pillBorder: "border-zinc-400/30",
    pillText: "text-zinc-300",
  },
  longBreak: {
    border: "border-rose-500/40",
    bg: "bg-white",
    text: "text-black font-extrabold",
    accent: "#ff2a5f",
    pillBg: "bg-rose-500/20",
    pillBorder: "border-rose-500/40",
    pillText: "text-rose-300",
  },
}

