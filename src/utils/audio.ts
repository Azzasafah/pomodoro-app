import type { PomodoroSettings } from '@/types/pomodoro';
import { SOUND_OPTIONS } from '@/constants/pomodoro';

let audioContextInstance: AudioContext | null = null;

function getAudioContext(): AudioContext | null {
  if (typeof window === 'undefined') return null;
  try {
    const AudioContextClass = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
    if (!audioContextInstance && AudioContextClass) {
      audioContextInstance = new AudioContextClass();
    }
    if (audioContextInstance && audioContextInstance.state === 'suspended') {
      audioContextInstance.resume();
    }
    return audioContextInstance;
  } catch (error) {
    console.warn('AudioContext not supported or permission denied:', error);
    return null;
  }
}

/**
 * Play a pleasant 4-tone melodic school bell chime (C5 - E5 - G5 - C6) with sine oscillators.
 */
export function playSchoolBellChime(): void {
  const ctx = getAudioContext();
  if (!ctx) return;

  const notes = [
    { freq: 523.25, timeOffset: 0, duration: 0.5 },    // C5
    { freq: 659.25, timeOffset: 0.22, duration: 0.5 }, // E5
    { freq: 783.99, timeOffset: 0.44, duration: 0.5 }, // G5
    { freq: 1046.50, timeOffset: 0.66, duration: 1.0 } // C6
  ];

  const now = ctx.currentTime;

  notes.forEach(({ freq, timeOffset, duration }) => {
    const start = now + timeOffset;
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();

    osc.type = 'sine';
    osc.frequency.setValueAtTime(freq, start);

    // ADSR Envelope
    gain.gain.setValueAtTime(0, start);
    gain.gain.linearRampToValueAtTime(0.35, start + 0.04);
    gain.gain.exponentialRampToValueAtTime(0.001, start + duration);

    osc.connect(gain);
    gain.connect(ctx.destination);

    osc.start(start);
    osc.stop(start + duration);
  });
}

/**
 * Speak text using the Web Speech Synthesis API.
 */
export function speakTTS(text: string, lang = 'id-ID'): void {
  if (typeof window === 'undefined' || !('speechSynthesis' in window)) {
    console.warn('SpeechSynthesis is not supported in this browser.');
    return;
  }

  if (!text || !text.trim()) return;

  window.speechSynthesis.cancel();

  const utterance = new SpeechSynthesisUtterance(text.trim());
  utterance.lang = lang;
  utterance.rate = 1.05;
  utterance.pitch = 1.25;

  // Try to pick Indonesian voice if available
  const voices = window.speechSynthesis.getVoices();
  const idVoice = voices.find((v) => v.lang.startsWith('id') || v.lang.includes('ID'));
  if (idVoice) {
    utterance.voice = idVoice;
  }

  window.speechSynthesis.speak(utterance);
}

/**
 * Play a custom audio URL (MP3/WAV blob or remote).
 */
export function playCustomAudio(url: string | null): void {
  if (!url) return;
  try {
    const audio = new Audio(url);
    audio.play().catch((err) => {
      console.warn('Failed to play custom audio:', err);
    });
  } catch (error) {
    console.warn('Audio element error:', error);
  }
}

/**
 * Unified sound dispatcher for alerts.
 */
export function triggerSoundAlert(soundId: string, settings: PomodoroSettings): void {
  if (soundId === 'beep') {
    playSchoolBellChime();
  } else if (soundId === 'custom-audio') {
    playCustomAudio(settings.customAudioUrl);
  } else if (soundId === 'custom-text') {
    speakTTS(settings.customText || 'Waktu sesi pomodoro telah selesai!');
  } else {
    const config = SOUND_OPTIONS.find((s) => s.id === soundId);
    const textToSpeak = config?.text || 'Sesi selesai!';
    speakTTS(textToSpeak);
  }
}
