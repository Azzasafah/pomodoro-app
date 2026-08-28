<div align="center">

# ☕ 【POMODORO】Lo-Fi VTuber Study Stream
### *An Aesthetic, Gamified Focus Timer & Quest Log Stream Overlay*

[![Astro](https://img.shields.io/badge/Astro-5.18+-BC52EE.svg?style=for-the-badge&logo=astro&logoColor=white)](https://astro.build/)
[![React](https://img.shields.io/badge/React-19.2+-61DAFB.svg?style=for-the-badge&logo=react&logoColor=black)](https://react.dev/)
[![TypeScript](https://img.shields.io/badge/TypeScript-6.0+-3178C6.svg?style=for-the-badge&logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![TailwindCSS](https://img.shields.io/badge/Tailwind_CSS-v4.0-38B2AC.svg?style=for-the-badge&logo=tailwind-css&logoColor=white)](https://tailwindcss.com/)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg?style=for-the-badge)](https://opensource.org/licenses/MIT)

<p align="center">
  <b>Turn your daily coding, studying, and deep-work sessions into a cozy, interactive VTuber live broadcast!</b><br>
  Featuring interactive avatars, a gamified quest log, simulated live viewer chat, superchat celebrations, and full voice/audio alerts.
</p>

[✨ Live Demo](#-getting-started) • [🎮 Key Features](#-features) • [🛠️ Tech Stack](#-tech-stack) • [🚀 Quick Start](#-getting-started) • [⚙️ Customization](#-customization--settings)

---

</div>

## 📖 Overview

**Lo-Fi VTuber Study Stream Pomodoro** is a modern, gamified productivity web application built with **Astro 5**, **React 19**, and **Tailwind CSS v4**. 

Designed with an aesthetic broadcast overlay layout, it recreates the cozy atmosphere of a late-night Lo-Fi study stream. Complete with live stream statistics, an interactive avatar desk, simulated viewer chat, rewarding Superchat alerts, and an RPG-inspired quest tracker, it turns solo study grinds into engaging sessions.

---

## ✨ Features

### ⏱️ Triple-Cycle Pomodoro Timer
- **3 Focused Modes**: Seamlessly switch between **Focus (Work)**, **Short Break (Zatsudan/Coffee)**, and **Long Break (AFK/Rest)**.
- **Dynamic Color Themes**: Custom pastel palette and ambient glows adapted to each mode (*Sakura Pink*, *Sky Blue*, and *Lilac Purple*).
- **Smooth Visual Progress**: Circular SVG progress ring, pulsating glow rings, and a retro digital countdown display (`VT323` pixel font).

### 🎭 Interactive VTuber Avatar Desk
- **Floating Desk Mascot**: Animated mascot studying alongside you with gentle floating physics.
- **Preset Avatar Roster**: Choose from presets like *Lilac Adventurer*, *Neko Chan*, *Cyber Kitsune*, *Study Senpai*, *Cozy Barista*, and *Pixel Robo*.
- **Custom Avatar Support**: Upload your own character image (PNG, GIF, SVG) or provide any image URL.

### 📜 Gamified Quest Log (To-Do Tracker)
- **RPG Task Management**: Organize your daily goals as active study quests.
- **Interactive Checklists**: Smooth completion animations, strikethrough styling, and instant delete controls.
- **Zero Data Loss**: Auto-saves your quests instantly to browser `localStorage`.

### 💬 Simulated Live Stream Chat & Viewer Reactions
- **Dynamic Audience**: Automated chatters cheering on your study progress with badges (`MOD`, `VIP`, `BOT`, `SENPAI`).
- **Interactive Chat Input**: Send your own live messages directly into the stream feed.
- **Mode Announcements**: Automatic chat notifications when switching between focus and break modes.

### 💰 Rewarding Superchat Alerts
- **Celebration Banner**: Rewarding animated Superchat banner pops up when timer cycles finish.
- **Sound & Visual Sparkles**: Coin animations and congratulatory messages (*"Otsukare sama deshita~ 🎉"*).

### 🔔 Smart Audio & Text-to-Speech (TTS) Alerts
- **Built-in Vocal Presets**: Indonesian VTuber voice lines for session start & break alerts.
- **Browser Web Speech API**: Custom Text-to-Speech engine capable of reading your own custom text.
- **Custom Audio Upload**: Upload your preferred local sound or MP3 alert.
- **Synthesized School Chime**: Clean 4-tone melodic school bell.
- **In-App Audio Preview**: Test voice lines and audio triggers directly inside the settings modal.

### 🎨 Themes & Stream Control HUD
- **Dark Mode & Pastel Light Mode**: Switch between midnight cyber-lofi and dreamy pastel aesthetics.
- **Broadcast Status Bar**: Interactive Mic / Webcam toggles, LIVE duration counter, FPS, bitrate, and viewer counters.
- **Lo-Fi CRT Scanline Overlay**: Subtle CRT scanlines and ambient vignette for full stream immersion.

---

## 🛠️ Tech Stack

| Technology | Purpose |
| :--- | :--- |
| **[Astro 5](https://astro.build/)** | Next-generation web framework with high-performance island architecture |
| **[React 19](https://react.dev/)** | Reactive UI component layer and state management |
| **[TypeScript](https://www.typescriptlang.org/)** | Strict type safety across components, hooks, and utilities |
| **[Tailwind CSS v4](https://tailwindcss.com/)** | Cutting-edge utility-first CSS engine with `@theme` design tokens |
| **[Lucide React](https://lucide.dev/)** | Clean, modern iconography |
| **[Base UI / shadcn](https://ui.shadcn.com/)** | Accessible component primitives and styling structure |
| **[Web Audio & Speech API](https://developer.mozilla.org/)** | Native browser sound synthesis and Text-to-Speech audio cues |

---

## 📁 Project Structure

```text
pomodoro-app/
├── public/
│   └── favicon.svg              # App favicon
├── src/
│   ├── components/
│   │   ├── pomodoro/
│   │   │   ├── AvatarDesk.tsx       # VTuber desk mascot & upload trigger
│   │   │   ├── QuestLog.tsx         # Gamified to-do list widget
│   │   │   ├── SettingsModal.tsx    # Comprehensive settings dialog
│   │   │   ├── StreamChat.tsx       # Live chat stream simulator & input
│   │   │   ├── StreamControls.tsx   # Mic, Cam, & status toggle buttons
│   │   │   ├── StreamHeader.tsx     # OBS top bar with LIVE badges & stats
│   │   │   ├── SuperchatAlert.tsx   # Session completion celebration alert
│   │   │   └── TimerDisplay.tsx     # SVG radial progress & countdown clock
│   │   ├── ui/                      # Shared UI primitives (Buttons, etc.)
│   │   └── PomodoroApp.tsx          # Main stream frame container
│   ├── constants/
│   │   └── pomodoro.ts              # Presets, dummy chats, audio options & themes
│   ├── hooks/
│   │   └── usePomodoroTimer.ts      # Core timer engine, chat loop, & storage hook
│   ├── layouts/
│   │   └── main.astro               # HTML shell, SEO metadata, and Google Fonts
│   ├── pages/
│   │   └── index.astro              # Astro entry point mounting PomodoroApp
│   ├── styles/
│   │   ├── global.css               # Tailwind CSS v4 & theme variables
│   │   └── pomodoro.css             # Keyframe animations, scanlines & stream frames
│   ├── types/
│   │   └── pomodoro.ts              # TypeScript interfaces & types
│   └── utils/
│       ├── audio.ts                 # Audio synthesis, sound player & TTS triggers
│       └── utils.ts                 # Classname utility helpers (clsx & twMerge)
├── astro.config.mjs                 # Astro configuration
├── package.json                     # Project dependencies and scripts
├── tsconfig.json                    # TypeScript compiler options
└── README.md                        # Documentation
```

---

## 🚀 Getting Started

### Prerequisites
Make sure you have **Node.js** (v20.0.0 or higher) installed on your machine.

- [Node.js Download](https://nodejs.org/)

### 1. Clone the Repository
```bash
git clone https://github.com/your-username/pomodoro-app.git
cd pomodoro-app
```

### 2. Install Dependencies
```bash
npm install
# or
pnpm install
# or
yarn install
```

### 3. Run Development Server
```bash
npm run dev
```

Open [http://localhost:4321](http://localhost:4321) in your browser to start your study stream!

---

## 📜 Available Scripts

| Command | Description |
| :--- | :--- |
| `npm run dev` | Starts the Astro development server at `localhost:4321` |
| `npm run build` | Builds the production-ready static site to `./dist` |
| `npm run preview` | Previews the production build locally before deployment |
| `npm run typecheck` | Validates TypeScript and Astro components with `astro check` |
| `npm run lint` | Lints project files using ESLint |
| `npm run format` | Formats all code with Prettier and Tailwind CSS plugin |

---

## ⚙️ Customization & Settings

Click the **⚙️ Settings** button on the top right corner of the stream header to customize:

1. **⏱️ Timer Durations**: Adjust Focus, Short Break, and Long Break durations in minutes.
2. **🔔 Audio Alert Modes**:
   - *VTuber Voice (Indonesian)*: Native friendly voice lines.
   - *Text-to-Speech (TTS)*: Custom speech synthesizer reading any phrase you type.
   - *Local Audio Upload*: Load your own custom audio file (saved locally).
   - *School Chime*: 4-tone melody chime.
3. **🎭 Avatar Customization**: Select one of 6 avatar presets, paste a custom image URL, or upload a character portrait.
4. **🌓 Color Theme**: Toggle between Dark Mode and Light Pastel Mode.

All settings and tasks are saved automatically to your browser's `localStorage`.

---

## 🔒 Privacy & Performance

- **100% Client-Side & Local-First**: No data is sent to external servers. Your tasks, timer preferences, and uploaded audio remain private in your browser.
- **Zero Bloat & Blazing Fast**: Built on Astro's zero-JS-by-default architecture with targeted React islands for peak performance.

---

## 🤝 Contributing

Contributions, issues, and feature requests are welcome!

1. Fork the Project
2. Create your Feature Branch (`git checkout -b feature/AmazingFeature`)
3. Commit your Changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the Branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

---

## 📄 License

Distributed under the **MIT License**. See `LICENSE` for more information.

---

<div align="center">

Made with 💜 for students, developers, and VTuber fans everywhere.<br>
*Happy studying & otsukare sama deshita!* ✨

</div>
