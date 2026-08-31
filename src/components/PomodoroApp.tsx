import "@/styles/pomodoro.css"
import { usePomodoroTimer } from "@/hooks/usePomodoroTimer"
import { StreamHeader } from "@/components/pomodoro/StreamHeader"
import { AvatarDesk } from "@/components/pomodoro/AvatarDesk"
import { TimerDisplay } from "@/components/pomodoro/TimerDisplay"
import { QuestLog } from "@/components/pomodoro/QuestLog"
import { StreamChat } from "@/components/pomodoro/StreamChat"
import { StreamControls } from "@/components/pomodoro/StreamControls"
import { SuperchatAlert } from "@/components/pomodoro/SuperchatAlert"
import { SettingsModal } from "@/components/pomodoro/SettingsModal"

export default function PomodoroApp() {
  const {
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
  } = usePomodoroTimer()

  const isLight = settings.themeMode === "light"

  return (
    <div
      className={`app-wrapper ${
        isLight ? "light-mode" : "dark-mode"
      } flex items-center justify-center p-2 select-none sm:p-4 lg:p-6`}
    >
      {/* Main Stream Frame Container */}
      <div className="stream-frame relative flex min-h-[640px] w-full max-w-[1320px] flex-col lg:h-[88vh]">
        {/* Lo-Fi / CRT Scanline Overlay */}
        <div className="lofi-overlay"></div>

        {/* OBS Stream Top Header */}
        <StreamHeader
          themeMode={settings.themeMode}
          onToggleTheme={toggleThemeMode}
          onOpenSettings={() => setShowSettings(true)}
        />

        {/* Main Content Layout (Stream Stage 60% & Widgets 40%) */}
        <div className="relative z-10 flex w-full flex-1 flex-col gap-4 overflow-hidden p-3 sm:p-5 lg:flex-row">
          {/* LEFT: Stream Content (Avatar & Timer Center) */}
          <div className="relative flex flex-[1.2] flex-col items-center justify-center pt-2 sm:pt-4 lg:pt-6">
            {/* Live2D Desk (Chisa / Duo Mascot) */}
            <AvatarDesk
              avatarUrl={settings.vtuberImage}
              onAvatarChange={(newUrl) =>
                setSettings({ ...settings, vtuberImage: newUrl })
              }
            />

            {/* Center Digital Clock & Controls */}
            <TimerDisplay
              mode={mode}
              timeLeft={timeLeft}
              isActive={isActive}
              progress={progress}
              theme={theme}
              themeMode={settings.themeMode}
              onModeChange={changeMode}
              onToggleTimer={toggleTimer}
              onResetTimer={resetTimer}
            />

            {/* Superchat Pop-in Alert */}
            <SuperchatAlert show={showSuperchat} />
          </div>

          {/* RIGHT: Widgets (Quest Log & Live Chat) */}
          <div className="z-20 flex h-full flex-1 shrink-0 flex-col gap-4 lg:max-w-[400px]">
            {/* Quest Log (To-Do List) */}
            <QuestLog
              todos={todos}
              themeMode={settings.themeMode}
              onAddTodo={addTodo}
              onToggleTodo={toggleTodo}
              onDeleteTodo={deleteTodo}
            />

            {/* Live Stream Comms Chat */}
            <StreamChat
              chatLog={chatLog}
              themeMode={settings.themeMode}
              onSendMessage={sendUserChat}
            />
          </div>
        </div>

        {/* Bottom Stream Status (Mic & Camera Toggles) */}
        <StreamControls
          isMicOn={isMicOn}
          isCamOn={isCamOn}
          themeMode={settings.themeMode}
          onToggleMic={() => setIsMicOn(!isMicOn)}
          onToggleCam={() => setIsCamOn(!isCamOn)}
        />
      </div>

      {/* Stream Configuration Settings Modal */}
      <SettingsModal
        isOpen={showSettings}
        settings={settings}
        onClose={() => setShowSettings(false)}
        onUpdateSettings={setSettings}
      />
    </div>
  )
}

