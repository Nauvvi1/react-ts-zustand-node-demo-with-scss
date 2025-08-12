import React from 'react'
import type { Task } from '../store/useTasks'

interface Props {
  task: Task
  onToggle: (id: string, done: boolean) => void
  onDelete: (id: string) => void
}

export default function TaskItem({ task, onToggle, onDelete }: Props) {
  return (
    <li className="task">
      <input
        className="task__checkbox"
        type="checkbox"
        checked={task.done}
        onChange={e => onToggle(task.id, e.target.checked)}
        aria-label={`Готово: ${task.title}`}
      />
      <span className={task.done ? 'task__title task__title--done' : 'task__title'}>
        {task.title}
      </span>
      <button
        className="btn btn--icon"
        title="Удалить"
        aria-label="Удалить"
        onClick={() => onDelete(task.id)}
      >
        ✕
      </button>
    </li>
  )
}
