import React, { useState, useRef, useEffect, type SyntheticEvent } from "react"
import { MessageSquare, Send } from "lucide-react"
import type { ChatMessage } from "@/types/pomodoro"

interface StreamChatProps {
  chatLog: ChatMessage[]
  themeMode?: "dark" | "light"
  onSendMessage: (text: string) => void
}

export const StreamChat: React.FC<StreamChatProps> = ({
  chatLog,
  themeMode = "dark",
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
    <div className="side-widget flex min-h-[260px] flex-[1.1] flex-col p-3.5">
      <div
        className={`mb-2 flex items-center justify-between border-b pb-2 text-sm font-semibold ${
          isLight
            ? "border-purple-200/70 text-purple-950"
            : "border-white/10 text-gray-300"
        }`}
      >
        <div className="flex items-center gap-2">
          <MessageSquare
            size={16}
            className={isLight ? "text-purple-600" : "text-[#a385db]"}
          />
          <span>Live Stream Chat</span>
        </div>
        <span className="flex items-center gap-1 font-mono text-[10px] font-bold text-emerald-500">
          <span className="h-1.5 w-1.5 animate-ping rounded-full bg-emerald-500"></span>
          Online
        </span>
      </div>

      {/* Chat Messages */}
      <div
        ref={chatContainerRef}
        className="custom-scrollbar max-h-[160px] flex-1 space-y-2.5 overflow-y-auto pr-1.5 pb-2 lg:max-h-[220px]"
      >
        {chatLog.map((chat) => (
          <div
            key={chat.id}
            className={`chat-msg rounded-lg border p-2 text-xs leading-relaxed break-words transition-colors ${
              isLight
                ? "border-purple-100/90 bg-purple-50/80 text-[#372f4e]"
                : "border-white/[0.03] bg-black/20 text-gray-300"
            }`}
          >
            <div className="mb-0.5 flex items-center gap-1.5">
              {chat.badge && (
                <span
                  className={`py-0.2 rounded border px-1.5 text-[9px] font-bold ${
                    isLight
                      ? "border-purple-300 bg-purple-100 text-purple-800"
                      : "border-purple-400/30 bg-purple-500/30 text-purple-300"
                  }`}
                >
                  {chat.badge}
                </span>
              )}
              <span
                className="font-bold drop-shadow-sm"
                style={{
                  color:
                    isLight &&
                    (chat.color === "#ffd700" || chat.color === "#98fb98")
                      ? "#9333ea"
                      : chat.color,
                }}
              >
                {chat.name}
              </span>
            </div>
            <p
              className={`font-normal select-text ${isLight ? "text-gray-800" : "text-gray-300"}`}
            >
              {chat.msg}
            </p>
          </div>
        ))}
      </div>

      {/* Interactive Chat Input */}
      <form
        onSubmit={handleSubmit}
        className={`mt-2 flex gap-2 border-t pt-2 ${
          isLight ? "border-purple-200/70" : "border-white/10"
        }`}
      >
        <input
          type="text"
          value={chatText}
          onChange={(e) => setChatText(e.target.value)}
          placeholder="Kirim pesan ke chat..."
          className={`flex-1 rounded-xl border px-3 py-1.5 text-xs transition-colors focus:outline-none ${
            isLight
              ? "border-purple-200/80 bg-white text-[#2e2344] placeholder:text-purple-400 focus:border-purple-500"
              : "border-white/10 bg-black/60 text-white placeholder:text-gray-500 focus:border-[#a385db]"
          }`}
        />
        <button
          type="submit"
          disabled={!chatText.trim()}
          className={`cursor-pointer rounded-xl border px-2.5 py-1.5 transition-colors disabled:cursor-not-allowed disabled:opacity-40 ${
            isLight
              ? "border-purple-600 bg-purple-600 text-white hover:bg-purple-700"
              : "border-[#a385db]/50 bg-[#a385db]/20 text-[#a385db] hover:bg-[#a385db] hover:text-white"
          }`}
          title="Kirim pesan"
        >
          <Send size={13} />
        </button>
      </form>
    </div>
  )
}
