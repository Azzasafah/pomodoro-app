import React, { useState, type SyntheticEvent } from 'react';
import { CheckSquare, Plus, Trash2 } from 'lucide-react';
import type { TodoItem } from '@/types/pomodoro';

interface QuestLogProps {
  todos: TodoItem[];
  themeMode?: 'dark' | 'light';
  onAddTodo: (text: string) => void;
  onToggleTodo: (id: number) => void;
  onDeleteTodo: (id: number) => void;
}

export const QuestLog: React.FC<QuestLogProps> = ({
  todos,
  themeMode = 'dark',
  onAddTodo,
  onToggleTodo,
  onDeleteTodo
}) => {
  const [newQuestText, setNewQuestText] = useState('');
  const isLight = themeMode === 'light';

  const handleSubmit = (e: SyntheticEvent) => {
    e.preventDefault();
    if (!newQuestText.trim()) return;
    onAddTodo(newQuestText.trim());
    setNewQuestText('');
  };

  const completedCount = todos.filter((t) => t.completed).length;

  return (
    <div className="side-widget flex-[0.9] p-3.5 flex flex-col min-h-[220px]">
      <div
        className={`border-b pb-2 mb-3 flex justify-between items-center text-sm font-semibold ${
          isLight ? 'border-purple-200/70 text-purple-950' : 'border-white/10 text-gray-300'
        }`}
      >
        <div className="flex items-center gap-2">
          <CheckSquare
            size={16}
            className={isLight ? 'text-purple-600' : 'text-[#a385db]'}
          />
          <span>Quest Log (To-Do)</span>
        </div>
        <span
          className={`text-xs px-2.5 py-0.5 rounded-full border font-bold ${
            isLight
              ? 'bg-purple-100 border-purple-200 text-purple-800'
              : 'bg-black/60 border-white/10 text-purple-300'
          }`}
        >
          {completedCount}/{todos.length}
        </span>
      </div>

      {/* Todo Items Container */}
      <div className="flex-1 overflow-y-auto pr-1.5 space-y-2 mb-2 custom-scrollbar max-h-[160px] lg:max-h-[190px]">
        {todos.length === 0 ? (
          <div
            className={`h-full min-h-[80px] flex items-center justify-center text-xs italic text-center p-4 ${
              isLight ? 'text-purple-400' : 'text-gray-500'
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
              className={`todo-item flex items-center justify-between p-2.5 rounded-xl border transition-all ${
                todo.completed
                  ? isLight
                    ? 'border-transparent bg-purple-100/50 opacity-60'
                    : 'border-transparent bg-black/25 opacity-60'
                  : isLight
                  ? 'border-purple-200/70 bg-purple-50/80 hover:border-purple-300 text-[#2e2344]'
                  : 'border-white/5 bg-black/45 hover:border-purple-500/20 text-gray-200'
              }`}
            >
              <label className="flex items-center gap-3 overflow-hidden cursor-pointer flex-1 mr-2">
                <input
                  type="checkbox"
                  checked={todo.completed}
                  onChange={() => onToggleTodo(todo.id)}
                  className="todo-checkbox w-4 h-4 shrink-0"
                />
                <span
                  className={`text-xs sm:text-sm truncate select-text ${
                    todo.completed
                      ? isLight
                        ? 'line-through text-purple-400'
                        : 'line-through text-gray-500'
                      : isLight
                      ? 'text-[#2e2344] font-medium'
                      : 'text-gray-200'
                  }`}
                >
                  {todo.text}
                </span>
              </label>
              <button
                onClick={() => onDeleteTodo(todo.id)}
                className={`p-1.5 rounded-lg transition-colors shrink-0 cursor-pointer ${
                  isLight
                    ? 'text-gray-400 hover:text-red-500 hover:bg-red-50'
                    : 'text-gray-500 hover:text-red-400 hover:bg-white/5'
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
        className={`mt-auto pt-2 border-t flex gap-2 ${
          isLight ? 'border-purple-200/70' : 'border-white/10'
        }`}
      >
        <input
          type="text"
          value={newQuestText}
          onChange={(e) => setNewQuestText(e.target.value)}
          placeholder="Tambah quest baru..."
          className={`flex-1 border rounded-xl px-3 py-2 text-xs focus:outline-none transition-colors ${
            isLight
              ? 'bg-white border-purple-200/80 text-[#2e2344] placeholder:text-purple-400 focus:border-purple-500'
              : 'bg-black/60 border-white/10 text-white placeholder:text-gray-500 focus:border-[#a385db]'
          }`}
        />
        <button
          type="submit"
          disabled={!newQuestText.trim()}
          className={`px-3 py-2 rounded-xl border transition-colors disabled:opacity-40 disabled:cursor-not-allowed cursor-pointer ${
            isLight
              ? 'bg-purple-600 text-white border-purple-600 hover:bg-purple-700'
              : 'bg-[#a385db]/20 text-[#a385db] border-[#a385db]/50 hover:bg-[#a385db] hover:text-white'
          }`}
          title="Tambah Quest"
        >
          <Plus size={15} />
        </button>
      </form>
    </div>
  );
};
