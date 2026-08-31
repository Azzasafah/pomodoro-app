import React, { useState, useRef, useEffect, type SyntheticEvent } from "react"
import { Terminal, Send } from "lucide-react"
import type { ChatMessage } from "@/types/pomodoro"

interface StreamChatProps {
  chatLog: ChatMessage[]
  themeMode?: "dark" | "light"
  onSendMessage: (text: string) => void
}

export const StreamChat: React.FC<StreamChatProps> = ({
  chatLog,
  themeMode = "light",
  onSendMessage,
}) => {
  const [chatText, setChatText] = useState("")
  const chatContainerRef = useRef<HTMLDivElement>(null)
  const isLight = themeMode === "light"

  useEffect(() => {
    if (chatContainerRef.current) {
      chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight
    }
  }, [chatLog])

  const handleSubmit = (e: SyntheticEvent) => {
    e.preventDefault()
    if (!chatText.trim()) return
    onSendMessage(chatText.trim())
    setChatText("")
  }

  return (
    <div className="side-widget flex min-h-[260px] flex-[1.15] flex-col p-3.5 sm:p-4">
      {/* Header */}
      <div
        className={`mb-2.5 flex items-center justify-between border-b pb-2.5 ${
          isLight ? "border-black/10" : "border-white/10"
        }`}
      >
        <div className="flex items-center gap-2">
          <Terminal size={14} className={isLight ? "text-black" : "text-white"} />
          <span
            className={`font-cyber text-xs font-bold tracking-wider ${
              isLight ? "text-zinc-900" : "text-white"
            }`}
          >
            LIVE COMMS
          </span>
          <span
            className={`font-jp text-[10px] ${
              isLight ? "text-zinc-500" : "text-zinc-400"
            }`}
          >
            [ 通信ログ ]
          </span>
        </div>
        <div className="flex items-center gap-1.5 font-mono-tech text-[10px] font-bold text-rose-500">
          <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-rose-500"></span>
          <span>ONLINE // 10.4K</span>
        </div>
      </div>

      {/* Chat Messages */}
      <div
        ref={chatContainerRef}
        className="custom-scrollbar max-h-[160px] flex-1 space-y-2 overflow-y-auto pr-1.5 pb-1.5 lg:max-h-[220px]"
      >
        {chatLog.map((chat) => (
          <div
            key={chat.id}
            className={`chat-msg rounded-xl border p-2.5 text-xs leading-relaxed break-words transition-all ${
              isLight
                ? "border-black/5 bg-black/[0.03] text-zinc-900 hover:border-black/15"
                : "border-white/5 bg-black/45 text-zinc-100 hover:border-white/15"
            }`}
          >
            <div className="mb-1 flex items-center gap-1.5">
              {chat.badge && (
                <span
                  className={`rounded border px-1.5 py-0.2 font-mono-tech text-[8px] font-black tracking-wider ${
                    chat.badge === "VIP"
                      ? isLight
                        ? "border-rose-500/40 bg-rose-500/10 text-rose-600"
                        : "border-rose-500/50 bg-rose-500/20 text-rose-300"
                      : chat.badge === "SYS"
                        ? isLight
                          ? "border-black/30 bg-black/10 text-black font-bold"
                          : "border-white/40 bg-white/20 text-white"
                        : chat.badge === "MOD"
                          ? isLight
                            ? "border-purple-500/30 bg-purple-500/10 text-purple-700 font-bold"
                            : "border-zinc-400/40 bg-zinc-300/10 text-zinc-200"
                          : isLight
                            ? "border-sky-500/30 bg-sky-500/10 text-sky-700 font-bold"
                            : "border-sky-400/40 bg-sky-400/20 text-sky-300"
                  }`}
                >
                  {chat.badge}
                </span>
              )}
              <span
                className="font-mono-tech text-[11px] font-bold tracking-wide"
                style={{
                  color:
                    isLight && chat.color === "#ffffff"
                      ? "#18181b"
                      : chat.color || (isLight ? "#18181b" : "#ffffff"),
                }}
              >
                {chat.name}
              </span>
            </div>
            <p
              className={`font-sans text-[11px] font-normal select-text sm:text-xs ${
                isLight ? "text-zinc-800" : "text-zinc-200"
              }`}
            >
              {chat.msg}
            </p>
          </div>
        ))}
      </div>

      {/* Interactive Chat Input */}
      <form
        onSubmit={handleSubmit}
        className={`mt-2 flex gap-2 border-t pt-2.5 ${
          isLight ? "border-black/10" : "border-white/10"
        }`}
      >
        <input
          type="text"
          value={chatText}
          onChange={(e) => setChatText(e.target.value)}
          placeholder="Kirim transmisi pesan..."
          className={`flex-1 rounded-xl border px-3 py-1.5 font-sans text-xs focus:outline-none ${
            isLight
              ? "border-black/10 bg-black/5 text-zinc-900 placeholder:text-zinc-400 focus:border-black/30"
              : "border-white/10 bg-black/60 text-white placeholder:text-zinc-600 focus:border-white/40"
          }`}
        />
        <button
          type="submit"
          disabled={!chatText.trim()}
          className={`flex cursor-pointer items-center justify-center rounded-xl border px-3 py-1.5 transition-all ${
            isLight
              ? "border-black bg-black text-white hover:bg-zinc-800 disabled:cursor-not-allowed disabled:border-black/10 disabled:bg-black/10 disabled:text-zinc-400"
              : "border-white bg-white text-black hover:bg-zinc-200 disabled:cursor-not-allowed disabled:border-white/10 disabled:bg-white/10 disabled:text-zinc-600"
          }`}
          title="Kirim Pesan"
        >
          <Send size={13} />
        </button>
      </form>
    </div>
  )
}


