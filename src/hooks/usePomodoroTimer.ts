import { useState, useEffect, useCallback } from "react"
import type {
  TimerMode,
  PomodoroSettings,
  ChatMessage,
  TodoItem,
} from "@/types/pomodoro"
import {
  DEFAULT_SETTINGS,
  INITIAL_TODOS,
  DUMMY_CHATS_POOL,
  THEMES,
} from "@/constants/pomodoro"
import { triggerSoundAlert } from "@/utils/audio"

const SETTINGS_STORAGE_KEY = "vtuber_pomodoro_settings_v1"
const TODOS_STORAGE_KEY = "vtuber_pomodoro_todos_v1"

export function usePomodoroTimer() {
  // Settings with LocalStorage persistence
  const [settings, setSettings] = useState<PomodoroSettings>(() => {
    if (typeof window !== "undefined") {
      try {
        const saved = localStorage.getItem(SETTINGS_STORAGE_KEY)
        if (saved) return { ...DEFAULT_SETTINGS, ...JSON.parse(saved) }
      } catch (e) {
        console.warn("Failed to load settings from storage:", e)
      }
    }
    return DEFAULT_SETTINGS
  })

  // Mode & Timer
  const [mode, setMode] = useState<TimerMode>("work")
  const [isActive, setIsActive] = useState<boolean>(false)
  const [timeLeft, setTimeLeft] = useState<number>(settings.work * 60)

  // Modals & UI States
  const [showSettings, setShowSettings] = useState<boolean>(false)
  const [showSuperchat, setShowSuperchat] = useState<boolean>(false)

  // Status controls
  const [isMicOn, setIsMicOn] = useState<boolean>(true)
  const [isCamOn, setIsCamOn] = useState<boolean>(true)

  // Quests (Todos) with LocalStorage persistence
  const [todos, setTodos] = useState<TodoItem[]>(() => {
    if (typeof window !== "undefined") {
      try {
        const saved = localStorage.getItem(TODOS_STORAGE_KEY)
        if (saved) return JSON.parse(saved)
      } catch (e) {
        console.warn("Failed to load todos from storage:", e)
      }
    }
    return INITIAL_TODOS
  })

  // Live Chat log
  const [chatLog, setChatLog] = useState<ChatMessage[]>([
    {
      id: 1,
      name: "NightBot 🤖",
      msg: "Selamat datang di Study Stream! Gunakan timer dan Quest Log di sebelah kanan untuk fokus. 📚✨",
      color: "#a855f7",
      badge: "MOD",
    },
  ])

  // Persist Settings
  useEffect(() => {
    try {
      localStorage.setItem(SETTINGS_STORAGE_KEY, JSON.stringify(settings))
    } catch (e) {
      console.warn("Failed to save settings:", e)
    }
  }, [settings])

  // Persist Todos
  useEffect(() => {
    try {
      localStorage.setItem(TODOS_STORAGE_KEY, JSON.stringify(todos))
    } catch (e) {
      console.warn("Failed to save todos:", e)
    }
  }, [todos])

  // Sync timeLeft when not active and mode or settings duration changes
  useEffect(() => {
    if (!isActive) {
      setTimeLeft((settings[mode] || 25) * 60)
    }
  }, [mode, settings, isActive])

  // Handle timer completion
  const handleTimerComplete = useCallback(() => {
    setIsActive(false)
    triggerSoundAlert(settings.sound, settings)
    setShowSuperchat(true)

    const modeLabels: Record<TimerMode, string> = {
      work: "Sesi Fokus Selesai!",
      shortBreak: "Waktu Rehat Selesai!",
      longBreak: "Waktu AFK Selesai!",
    }

    setChatLog((prev) => [
      ...prev.slice(-25),
      {
        id: Date.now(),
        name: "Superchat Alert 💰",
        msg: `Superchat Rp 50.000: ${modeLabels[mode]} Otsukare sama deshita~ 🎉`,
        color: "#f59e0b",
        badge: "VIP",
      },
    ])

    setTimeout(() => {
      setShowSuperchat(false)
    }, 6000)
  }, [mode, settings])

  // Main countdown timer and dummy chats interval
  useEffect(() => {
    let interval: ReturnType<typeof setInterval> | null = null
    let chatInterval: ReturnType<typeof setInterval> | null = null

    if (isActive && timeLeft > 0) {
      interval = setInterval(() => {
        setTimeLeft((prev) => prev - 1)
      }, 1000)

      // Automated viewer chats
      chatInterval = setInterval(() => {
        if (Math.random() > 0.35) {
          const randomChat =
            DUMMY_CHATS_POOL[
              Math.floor(Math.random() * DUMMY_CHATS_POOL.length)
            ]
          setChatLog((prev) => [
            ...prev.slice(-25),
            { ...randomChat, id: Date.now() + Math.random() },
          ])
        }
      }, 4500)
    } else if (isActive && timeLeft === 0) {
      handleTimerComplete()
    }

    return () => {
      if (interval) clearInterval(interval)
      if (chatInterval) clearInterval(chatInterval)
    }
  }, [isActive, timeLeft, handleTimerComplete])

  // Actions
  const toggleTimer = () => setIsActive((prev) => !prev)

  const resetTimer = () => {
    setIsActive(false)
    setTimeLeft((settings[mode] || 25) * 60)
  }

  const changeMode = (newMode: TimerMode) => {
    setMode(newMode)
    setIsActive(false)
    setTimeLeft((settings[newMode] || 25) * 60)

    const announceMessages: Record<TimerMode, string> = {
      work: "Memulai sesi Fokus belajar! 📚 Ayo siapkan catatanmu!",
      shortBreak:
        "Waktu Zatsudan/Rehat sebentar! ☕ Regangkan badan & minum air dulu yuk~",
      longBreak: "Istirahat panjang~ AFK bentar ya 💤 Tidur sejenak~",
    }

    setChatLog((prev) => [
      ...prev.slice(-25),
      {
        id: Date.now(),
        name: "NightBot 🤖",
        msg: announceMessages[newMode],
        color: "#a855f7",
        badge: "MOD",
      },
    ])
  }

  // Todo operations
  const addTodo = (text: string) => {
    setTodos((prev) => [...prev, { id: Date.now(), text, completed: false }])
  }

  const toggleTodo = (id: number) => {
    setTodos((prev) =>
      prev.map((t) => (t.id === id ? { ...t, completed: !t.completed } : t))
    )
  }

  const deleteTodo = (id: number) => {
    setTodos((prev) => prev.filter((t) => t.id !== id))
  }

  // Chat message send
  const sendUserChat = (text: string) => {
    setChatLog((prev) => [
      ...prev.slice(-25),
      {
        id: Date.now(),
        name: "You (Senpai) ⭐",
        msg: text,
        color: "#38bdf8",
        badge: "YOU",
      },
    ])
  }

  // Progress percentage
  const totalSeconds = (settings[mode] || 25) * 60
  const progress = Math.min(
    100,
    Math.max(0, ((totalSeconds - timeLeft) / totalSeconds) * 100)
  )

  const theme = THEMES[mode]

  const toggleThemeMode = () => {
    setSettings((prev) => ({
      ...prev,
      themeMode: prev.themeMode === "light" ? "dark" : "light",
    }))
  }

  return {
    mode,
    isActive,
    timeLeft,
    progress,
    theme,
    settings,
    showSettings,
    showSuperchat,
    isMicOn,
    isCamOn,
    todos,
    chatLog,
    toggleTimer,
    resetTimer,
    changeMode,
    setSettings,
    setShowSettings,
    setIsMicOn,
    setIsCamOn,
    addTodo,
    toggleTodo,
    deleteTodo,
    sendUserChat,
    toggleThemeMode,
  }
}
