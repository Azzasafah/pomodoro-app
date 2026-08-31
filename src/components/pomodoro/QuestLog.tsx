import React, { useState, type SyntheticEvent } from "react"
import { Plus, Trash2, Crosshair, ListTodo } from "lucide-react"
import type { TodoItem } from "@/types/pomodoro"

interface QuestLogProps {
  todos: TodoItem[]
  themeMode?: "dark" | "light"
  onAddTodo: (text: string) => void
  onToggleTodo: (id: number) => void
  onDeleteTodo: (id: number) => void
}

export const QuestLog: React.FC<QuestLogProps> = ({
  todos,
  themeMode = "light",
  onAddTodo,
  onToggleTodo,
  onDeleteTodo,
}) => {
  const [newQuestText, setNewQuestText] = useState("")
  const isLight = themeMode === "light"

  const handleSubmit = (e: SyntheticEvent) => {
    e.preventDefault()
    if (!newQuestText.trim()) return
    onAddTodo(newQuestText.trim())
    setNewQuestText("")
  }

  const completedCount = todos.filter((t) => t.completed).length

  return (
    <div className="side-widget flex min-h-[220px] flex-[0.95] flex-col p-3.5 sm:p-4">
      {/* Header */}
      <div
        className={`mb-3 flex items-center justify-between border-b pb-2.5 ${
          isLight ? "border-black/10" : "border-white/10"
        }`}
      >
        <div className="flex items-center gap-2">
          <Crosshair size={14} className={isLight ? "text-black" : "text-white"} />
          <span
            className={`font-cyber text-xs font-bold tracking-wider ${
              isLight ? "text-zinc-900" : "text-white"
            }`}
          >
            QUEST TERMINAL
          </span>
          <span
            className={`font-jp text-[10px] ${
              isLight ? "text-zinc-500" : "text-zinc-400"
            }`}
          >
            [ 任務記録 ]
          </span>
        </div>
        <span
          className={`font-mono-tech rounded-full border px-2.5 py-0.5 text-[10px] font-bold shadow-sm ${
            isLight
              ? "border-black/10 bg-black/5 text-zinc-800"
              : "border-white/20 bg-black/80 text-zinc-200"
          }`}
        >
          {completedCount} / {todos.length} SYNCED
        </span>
      </div>

      {/* Todo Items Container */}
      <div className="custom-scrollbar mb-2 max-h-[160px] flex-1 space-y-2 overflow-y-auto pr-1.5 lg:max-h-[190px]">
        {todos.length === 0 ? (
          <div
            className={`flex h-full min-h-[80px] flex-col items-center justify-center p-4 text-center font-mono-tech text-xs ${
              isLight ? "text-zinc-400" : "text-zinc-500"
            }`}
          >
            <ListTodo
              size={20}
              className={`mb-1 ${isLight ? "text-zinc-400" : "text-zinc-600"}`}
            />
            <span>NO ACTIVE DIRECTIVES.</span>
            <span className="text-[10px] opacity-75">
              Input new directive below.
            </span>
          </div>
        ) : (
          todos.map((todo) => (
            <div
              key={todo.id}
              className={`todo-item flex items-center justify-between rounded-xl border p-2.5 transition-all ${
                todo.completed
                  ? isLight
                    ? "border-black/5 bg-black/[0.02] opacity-45"
                    : "border-white/5 bg-white/[0.02] opacity-45"
                  : isLight
                    ? "border-black/10 bg-black/[0.03] text-zinc-900 hover:border-black/20 hover:bg-black/[0.06]"
                    : "border-white/10 bg-black/40 text-zinc-200 hover:border-white/30 hover:bg-black/60"
              }`}
            >
              <label className="mr-2 flex flex-1 cursor-pointer items-center gap-2.5 overflow-hidden">
                <input
                  type="checkbox"
                  checked={todo.completed}
                  onChange={() => onToggleTodo(todo.id)}
                  className="todo-checkbox h-4 w-4 shrink-0"
                />
                <span
                  className={`truncate text-xs select-text sm:text-sm font-sans ${
                    todo.completed
                      ? isLight
                        ? "text-zinc-400 line-through"
                        : "text-zinc-500 line-through"
                      : isLight
                        ? "font-medium text-zinc-900"
                        : "font-medium text-zinc-100"
                  }`}
                >
                  {todo.text}
                </span>
              </label>
              <button
                onClick={() => onDeleteTodo(todo.id)}
                className="shrink-0 cursor-pointer rounded-lg p-1.5 text-zinc-400 transition-colors hover:bg-rose-500/20 hover:text-rose-500"
                title="Hapus Tugas"
              >
                <Trash2 size={13} />
              </button>
            </div>
          ))
        )}
      </div>

      {/* Add Todo Input */}
      <form
        onSubmit={handleSubmit}
        className={`mt-auto flex gap-2 border-t pt-2.5 ${
          isLight ? "border-black/10" : "border-white/10"
        }`}
      >
        <input
          type="text"
          value={newQuestText}
          onChange={(e) => setNewQuestText(e.target.value)}
          placeholder="Tambah quest / direktif baru..."
          className={`flex-1 rounded-xl border px-3 py-2 font-sans text-xs focus:outline-none ${
            isLight
              ? "border-black/10 bg-black/5 text-zinc-900 placeholder:text-zinc-400 focus:border-black/30"
              : "border-white/10 bg-black/60 text-white placeholder:text-zinc-600 focus:border-white/40"
          }`}
        />
        <button
          type="submit"
          disabled={!newQuestText.trim()}
          className={`flex cursor-pointer items-center justify-center rounded-xl border px-3 py-2 font-bold transition-all ${
            isLight
              ? "border-black bg-black text-white hover:bg-zinc-800 disabled:cursor-not-allowed disabled:border-black/10 disabled:bg-black/10 disabled:text-zinc-400"
              : "border-white bg-white text-black hover:bg-zinc-200 disabled:cursor-not-allowed disabled:border-white/10 disabled:bg-white/10 disabled:text-zinc-600"
          }`}
          title="Tambah Directive"
        >
          <Plus size={15} />
        </button>
      </form>
    </div>
  )
}


