import React, { useState, useRef, useEffect, type SyntheticEvent } from 'react';
import { MessageSquare, Send } from 'lucide-react';
import type { ChatMessage } from '@/types/pomodoro';

interface StreamChatProps {
  chatLog: ChatMessage[];
  themeMode?: 'dark' | 'light';
  onSendMessage: (text: string) => void;
}

export const StreamChat: React.FC<StreamChatProps> = ({
  chatLog,
  themeMode = 'dark',
  onSendMessage
}) => {
  const [chatText, setChatText] = useState('');
  const chatContainerRef = useRef<HTMLDivElement>(null);
  const isLight = themeMode === 'light';

  useEffect(() => {
    if (chatContainerRef.current) {
      chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight;
    }
  }, [chatLog]);

  const handleSubmit = (e: SyntheticEvent) => {
    e.preventDefault();
    if (!chatText.trim()) return;
    onSendMessage(chatText.trim());
    setChatText('');
  };

  return (
    <div className="side-widget flex-[1.1] p-3.5 flex flex-col min-h-[260px]">
      <div
        className={`border-b pb-2 mb-2 flex items-center justify-between text-sm font-semibold ${
          isLight ? 'border-purple-200/70 text-purple-950' : 'border-white/10 text-gray-300'
        }`}
      >
        <div className="flex items-center gap-2">
          <MessageSquare
            size={16}
            className={isLight ? 'text-purple-600' : 'text-[#a385db]'}
          />
          <span>Live Stream Chat</span>
        </div>
        <span className="text-[10px] text-emerald-500 flex items-center gap-1 font-mono font-bold">
          <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-ping"></span>
          Online
        </span>
      </div>

      {/* Chat Messages */}
      <div
        ref={chatContainerRef}
        className="flex-1 overflow-y-auto pr-1.5 space-y-2.5 pb-2 custom-scrollbar max-h-[160px] lg:max-h-[220px]"
      >
        {chatLog.map((chat) => (
          <div
            key={chat.id}
            className={`chat-msg text-xs leading-relaxed break-words p-2 rounded-lg border transition-colors ${
              isLight
                ? 'bg-purple-50/80 border-purple-100/90 text-[#372f4e]'
                : 'bg-black/20 border-white/[0.03] text-gray-300'
            }`}
          >
            <div className="flex items-center gap-1.5 mb-0.5">
              {chat.badge && (
                <span
                  className={`text-[9px] font-bold px-1.5 py-0.2 rounded border ${
                    isLight
                      ? 'bg-purple-100 text-purple-800 border-purple-300'
                      : 'bg-purple-500/30 text-purple-300 border-purple-400/30'
                  }`}
                >
                  {chat.badge}
                </span>
              )}
              <span
                className="font-bold drop-shadow-sm"
                style={{
                  color: isLight && (chat.color === '#ffd700' || chat.color === '#98fb98')
                    ? '#9333ea'
                    : chat.color
                }}
              >
                {chat.name}
              </span>
            </div>
            <p className={`font-normal select-text ${isLight ? 'text-gray-800' : 'text-gray-300'}`}>
              {chat.msg}
            </p>
          </div>
        ))}
      </div>

      {/* Interactive Chat Input */}
      <form
        onSubmit={handleSubmit}
        className={`mt-2 pt-2 border-t flex gap-2 ${
          isLight ? 'border-purple-200/70' : 'border-white/10'
        }`}
      >
        <input
          type="text"
          value={chatText}
          onChange={(e) => setChatText(e.target.value)}
          placeholder="Kirim pesan ke chat..."
          className={`flex-1 border rounded-xl px-3 py-1.5 text-xs focus:outline-none transition-colors ${
            isLight
              ? 'bg-white border-purple-200/80 text-[#2e2344] placeholder:text-purple-400 focus:border-purple-500'
              : 'bg-black/60 border-white/10 text-white placeholder:text-gray-500 focus:border-[#a385db]'
          }`}
        />
        <button
          type="submit"
          disabled={!chatText.trim()}
          className={`px-2.5 py-1.5 rounded-xl border transition-colors disabled:opacity-40 disabled:cursor-not-allowed cursor-pointer ${
            isLight
              ? 'bg-purple-600 text-white border-purple-600 hover:bg-purple-700'
              : 'bg-[#a385db]/20 text-[#a385db] border-[#a385db]/50 hover:bg-[#a385db] hover:text-white'
          }`}
          title="Kirim pesan"
        >
          <Send size={13} />
        </button>
      </form>
    </div>
  );
};
