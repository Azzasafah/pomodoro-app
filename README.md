<div align="center">

# ⚡ 【NEO TOKYO 2099】電脳集中配信
### *Aesthetic Cyberpunk Anime Pomodoro Stream & Tactical Quest Terminal*

[![Astro](https://img.shields.io/badge/Astro-5.18+-BC52EE.svg?style=for-the-badge&logo=astro&logoColor=white)](https://astro.build/)
[![React](https://img.shields.io/badge/React-19.2+-61DAFB.svg?style=for-the-badge&logo=react&logoColor=black)](https://react.dev/)
[![TypeScript](https://img.shields.io/badge/TypeScript-6.0+-3178C6.svg?style=for-the-badge&logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![TailwindCSS](https://img.shields.io/badge/Tailwind_CSS-v4.0-38B2AC.svg?style=for-the-badge&logo=tailwind-css&logoColor=white)](https://tailwindcss.com/)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg?style=for-the-badge)](https://opensource.org/licenses/MIT)

<p align="center">
  <b>Ubah rutinitas belajar dan coding-mu menjadi siaran langsung ala Cyberpunk Anime VTuber di Neo Tokyo 2099!</b><br>
  Dilengkapi maskot Live2D Chisa & Rover, digital HUD clock, quest terminal, live comms chat, superchat reward, serta voice synth alerts.
</p>

[✨ Fitur Utama](#-fitur-utama) • [🎭 Maskot Chisa & Duo](#-maskot-live2d-chisa--rover) • [🎨 Tema & Estetika](#-tema--estetika-neo-tokyo) • [🛠️ Tech Stack](#%EF%B8%8F-tech-stack) • [🚀 Cara Menjalankan](#-cara-menjalankan)

---

</div>

## 📖 Ringkasan / Overview

**Neo Tokyo 2099 Pomodoro Stream** adalah aplikasi produktivitas berbasis web bertema *Cyberpunk Anime / Techwear* yang dibangun menggunakan **Astro 5**, **React 19**, dan **Tailwind CSS v4**.

Menggabungkan estetika antarmuka siaran langsung (OBS broadcast frame), tipografi futuristik Jepang/Cyber (*Orbitron*, *Space Grotesk*, *JetBrains Mono*, *Noto Sans JP*), serta maskot anime interaktif **Chisa (`chisa.png`)** dan **Chisa & Rover Duo (`love.png`)** untuk menciptakan suasana fokus yang imersif dan menyenangkan.

---

## 🎭 Maskot Live2D: Chisa & Rover

Aplikasi ini menyertakan integrasi karakter anime:

| Karakter | Mode | Deskripsi |
| :--- | :--- | :--- |
| **Chisa ⚡ (`/chisa.png`)** | `SOLO // UNIT-01` | Chisa dalam balutan sailor techwear bersiap untuk sesi fokus belajar intensif. |
| **Chisa & Rover ☕ (`/love.png`)** | `DUO // CO-OP` | Chisa & Rover menikmati minuman energi untuk waktu istirahat (recharge & zatsudan). |

> 💡 **Quick Switcher**: Klik tombol cepat di pojok kanan atas meja avatar atau menu **CONFIG** untuk berganti karakter instan, atau upload gambar kustom sendiri!

---

## ✨ Fitur Utama

### ⏱️ 1. Digital HUD Chronometer (Pomodoro Timer)
- **3 Siklus Mode Fokus**:
  - `[ 集中 FOCUS ]` (Default 25 menit): Sesi fokus kerja/belajar tanpa distraksi.
  - `[ 小休 BREAK ]` (Default 5 menit): Istirahat singkat & regangkan badan.
  - `[ 大休 AFK ]` (Default 15 menit): Istirahat panjang / makan & rehidrasi.
- **Segmented Glowing Progress Meter**: Indikator persentase penyelesaian sesi dengan animasi linear presisi.
- **Status Taktis HUD**: Menampilkan status transmisi (`FOCUS DRIVE`, `RECHARGE`, `AFK IDLE`).

### 📜 2. Quest Terminal `[ 任務記録 ]` (To-Do List)
- **Manajemen Tugas Cyber**: Catat semua target belajar dan coding harian.
- **Checkbox Interaktif**: Animasi checklist tajam dengan coretan status selesai.
- **Auto-Sync LocalStorage**: Semua tugas tersimpan otomatis di browser tanpa risiko hilang.

### 💬 3. Live Comms Chat `[ 通信ログ ]` (Simulated Audience)
- **Simulasi Interaksi Penonton**: Komentar dinamis dari penonton dengan role badge (`VIP`, `SYS`, `MOD`, `YOU`).
- **Interactive Chat Input**: Ketik dan kirim pesanmu sendiri langsung ke feed siaran.
- **Pengumuman Otomatis**: Bot siaran otomatis menyapa saat timer berganti mode.

### 💰 4. Superchat Pop-in Alert `『SUPERCHAT DETECTED』`
- Animasi alert bergaya cyberpunk saat menyelesaikan satu siklus timer.
- Notifikasi reward Rp 50.000 dengan ucapan *"Otsukaresama deshita~ 🎉"*.

### 🔊 5. Voice Alerts & Cyber Synth
- **Chisa Anime Voice (Bahasa Indonesia)**: Peringatan suara ramah saat memulai dan menyelesaikan sesi.
- **Custom TTS (Text-to-Speech)**: Suarakan kalimat motivasi kustommu sendiri.
- **Upload Audio Lokal**: Dukungan file audio MP3/WAV milikmu sendiri.
- **4-Tone Cyber Chime**: Nada lonceng digital futuristik.

---

## 🎨 Tema & Estetika Neo Tokyo

Aplikasi ini mendukung dua mode tema visual:

1. **Light Mode (Default - Clean Tech / Cyber Platinum)**:
   - Palet platinum terang (`#f0f0f5`) dengan kontras teks hitam stark (`#09090b`), grid micro halus, dan bayangan lembut yang elegan.
2. **Dark Mode (Stealth Obsidian / Cyberpunk)**:
   - Palet hitam obsidian (`#060609`) dengan aksen teks putih, garis cyber tipis, dan scanlines CRT retro.

> 🌓 **1-Click Theme Toggle**: Beralih tema secara instan kapan saja melalui tombol **`LIGHT / DARK`** di header atau menu **`CONFIG`**.

---

## 🛠️ Tech Stack

- **Framework**: [Astro v5.18+](https://astro.build/) (Islands Architecture)
- **UI & Logic**: [React 19](https://react.dev/)
- **Styling**: [Tailwind CSS v4](https://tailwindcss.com/) & Vanilla CSS Design System
- **Icons**: [Lucide React](https://lucide.dev/)
- **Tipografi**: Orbitron, Space Grotesk, JetBrains Mono, & Noto Sans JP
- **Storage**: Browser `localStorage` (Local-First & Privacy-Focused)

---

## 📁 Struktur Proyek

```text
pomodoro-app/
├── public/
│   ├── chisa.png                # Solo Mascot: Chisa Techwear
│   ├── love.png                 # Duo Mascot: Chisa & Rover
│   └── favicon.svg              # App Favicon
├── src/
│   ├── components/
│   │   ├── pomodoro/
│   │   │   ├── AvatarDesk.tsx       # Live2D desk, breathing animation & companion switch
│   │   │   ├── QuestLog.tsx         # Tactical Quest Terminal (To-Do List)
│   │   │   ├── SettingsModal.tsx    # Terminal configuration dialog & mascot selector
│   │   │   ├── StreamChat.tsx       # Live Comms stream chat terminal & input
│   │   │   ├── StreamControls.tsx   # Floating mic & optic HUD status toggles
│   │   │   ├── StreamHeader.tsx     # Broadcast bar, theme toggle & audio visualizer
│   │   │   ├── SuperchatAlert.tsx   # Cyber celebration reward pop-up
│   │   │   └── TimerDisplay.tsx     # Neo Tokyo digital chronometer & controls
│   │   └── PomodoroApp.tsx          # Master layout container
│   ├── constants/
│   │   └── pomodoro.ts              # Presets, default settings, chats & theme tokens
│   ├── hooks/
│   │   └── usePomodoroTimer.ts      # Core Pomodoro engine, tick loop & storage sync
│   ├── layouts/
│   │   └── main.astro               # HTML head, Google Fonts & SEO metadata
│   ├── pages/
│   │   └── index.astro              # Astro page entrypoint
│   ├── styles/
│   │   ├── global.css               # Tailwind CSS v4 setup & theme variables
│   │   └── pomodoro.css             # Neo Tokyo Light/Dark styling, CRT scanlines & animations
│   ├── types/
│   │   └── pomodoro.ts              # TypeScript interfaces & types
│   └── utils/
│       ├── audio.ts                 # Web Audio API synth, player & speech synthesis
│       └── utils.ts                 # Classname utility helpers (clsx & twMerge)
├── package.json
└── README.md
```

---

## 🚀 Cara Menjalankan

### Kebutuhan Sistem
- **Node.js** v20.0.0 atau lebih baru
- npm / pnpm / yarn

### Langkah Instalasi
1. Masuk ke direktori proyek:
   ```bash
   cd pomodoro-app
   ```
2. Pasang dependensi:
   ```bash
   npm install
   ```
3. Jalankan server lokal:
   ```bash
   npm run dev
   ```
4. Buka browser di [http://localhost:4321](http://localhost:4321).

### Script yang Tersedia
- `npm run dev`: Menjalankan server pengembangan Astro.
- `npm run build`: Membangun bundle produksi statis ke folder `./dist`.
- `npm run preview`: Melihat preview dari build produksi.
- `npm run typecheck`: Validasi tipe TypeScript dan komponen Astro (`astro check`).

---

## 🔒 Privasi & Keamanan Data

- **100% Client-Side & Local-First**: Semua pengaturan timer, riwayat quest, dan foto avatar tersimpan aman di browser kamu tanpa dikirim ke server luar manapun.
- **Performa Tinggi**: Menggunakan arsitektur Astro Islands dengan konsumsi memori minimal.

---

<div align="center">

Dibuat untuk para developer, pelajar, dan penggemar anime / VTuber.<br>
*Selamat belajar dan berfokus ria! お疲れ様でした！* ⚡✨

</div>
