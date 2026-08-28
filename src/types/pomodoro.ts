export type TimerMode = 'work' | 'shortBreak' | 'longBreak';

export interface PomodoroSettings {
  work: number;
  shortBreak: number;
  longBreak: number;
  sound: string;
  customText: string;
  customAudioUrl: string | null;
  vtuberImage: string;
  themeMode: 'dark' | 'light';
}

export interface ChatMessage {
  id: number | string;
  name: string;
  msg: string;
  color: string;
  badge?: 'MOD' | 'VIP' | 'YOU' | 'SYS';
}

export interface TodoItem {
  id: number;
  text: string;
  completed: boolean;
}

export interface SoundOption {
  id: string;
  label: string;
  text: string;
  description?: string;
}

export interface ThemeColors {
  border: string;
  bg: string;
  text: string;
  accent: string;
  pillBg: string;
  pillBorder: string;
  pillText: string;
}
