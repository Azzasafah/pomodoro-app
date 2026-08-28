import React, { useState, type SyntheticEvent } from "react"
import { CheckSquare, Plus, Trash2 } from "lucide-react"
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
  themeMode = "dark",
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
    <div className="side-widget flex min-h-[220px] flex-[0.9] flex-col p-3.5">
      <div
        className={`mb-3 flex items-center justify-between border-b pb-2 text-sm font-semibold ${
          isLight
            ? "border-purple-200/70 text-purple-950"
            : "border-white/10 text-gray-300"
        }`}
      >
        <div className="flex items-center gap-2">
          <CheckSquare
            size={16}
            className={isLight ? "text-purple-600" : "text-[#a385db]"}
          />
          <span>Quest Log (To-Do)</span>
        </div>
        <span
          className={`rounded-full border px-2.5 py-0.5 text-xs font-bold ${
            isLight
              ? "border-purple-200 bg-purple-100 text-purple-800"
              : "border-white/10 bg-black/60 text-purple-300"
          }`}
        >
          {completedCount}/{todos.length}
        </span>
      </div>

      {/* Todo Items Container */}
      <div className="custom-scrollbar mb-2 max-h-[160px] flex-1 space-y-2 overflow-y-auto pr-1.5 lg:max-h-[190px]">
        {todos.length === 0 ? (
          <div
            className={`flex h-full min-h-[80px] items-center justify-center p-4 text-center text-xs italic ${
              isLight ? "text-purple-400" : "text-gray-500"
            }`}
          >
            Belum ada tugas di Quest Log.
            <br />
            Tambahkan tugas barumu di bawah!
          </div>
        ) : (
          todos.map((todo) => (
            <div
              key={todo.id}
              className={`todo-item flex items-center justify-between rounded-xl border p-2.5 transition-all ${
                todo.completed
                  ? isLight
                    ? "border-transparent bg-purple-100/50 opacity-60"
                    : "border-transparent bg-black/25 opacity-60"
                  : isLight
                    ? "border-purple-200/70 bg-purple-50/80 text-[#2e2344] hover:border-purple-300"
                    : "border-white/5 bg-black/45 text-gray-200 hover:border-purple-500/20"
              }`}
            >
              <label className="mr-2 flex flex-1 cursor-pointer items-center gap-3 overflow-hidden">
                <input
                  type="checkbox"
                  checked={todo.completed}
                  onChange={() => onToggleTodo(todo.id)}
                  className="todo-checkbox h-4 w-4 shrink-0"
                />
                <span
                  className={`truncate text-xs select-text sm:text-sm ${
                    todo.completed
                      ? isLight
                        ? "text-purple-400 line-through"
                        : "text-gray-500 line-through"
                      : isLight
                        ? "font-medium text-[#2e2344]"
                        : "text-gray-200"
                  }`}
                >
                  {todo.text}
                </span>
              </label>
              <button
                onClick={() => onDeleteTodo(todo.id)}
                className={`shrink-0 cursor-pointer rounded-lg p-1.5 transition-colors ${
                  isLight
                    ? "text-gray-400 hover:bg-red-50 hover:text-red-500"
                    : "text-gray-500 hover:bg-white/5 hover:text-red-400"
                }`}
                title="Hapus tugas"
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
        className={`mt-auto flex gap-2 border-t pt-2 ${
          isLight ? "border-purple-200/70" : "border-white/10"
        }`}
      >
        <input
          type="text"
          value={newQuestText}
          onChange={(e) => setNewQuestText(e.target.value)}
          placeholder="Tambah quest baru..."
          className={`flex-1 rounded-xl border px-3 py-2 text-xs transition-colors focus:outline-none ${
            isLight
              ? "border-purple-200/80 bg-white text-[#2e2344] placeholder:text-purple-400 focus:border-purple-500"
              : "border-white/10 bg-black/60 text-white placeholder:text-gray-500 focus:border-[#a385db]"
          }`}
        />
        <button
          type="submit"
          disabled={!newQuestText.trim()}
          className={`cursor-pointer rounded-xl border px-3 py-2 transition-colors disabled:cursor-not-allowed disabled:opacity-40 ${
            isLight
              ? "border-purple-600 bg-purple-600 text-white hover:bg-purple-700"
              : "border-[#a385db]/50 bg-[#a385db]/20 text-[#a385db] hover:bg-[#a385db] hover:text-white"
          }`}
          title="Tambah Quest"
        >
          <Plus size={15} />
        </button>
      </form>
    </div>
  )
}
