import React, { useState } from 'react'
import TaskItem from '../components/TaskItem'
import { useTasks } from '../store/useTasks'

export default function Home() {
  const { tasks, loading, addTask, toggleDone, removeTask } = useTasks()
  const [title, setTitle] = useState('')

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!title.trim()) return
    await addTask(title.trim())
    setTitle('')
  }

  return (
    <div className="page">
      <header className="header">
        <div className="container">
          <h1 className="title">Demo: React + Zustand + Node</h1>
          <p className="subtitle">Минималистичный CRUD со стейт‑менеджментом и Express API</p>
        </div>
      </header>

      <main>
        <div className="container">
          <section className="card">
            <form onSubmit={handleSubmit} className="form-row" aria-label="Добавить задачу">
              <input
                className="input"
                value={title}
                onChange={e => setTitle(e.target.value)}
                placeholder="Новая задача…"
                aria-label="Название задачи"
              />
              <button type="submit" className="btn btn--primary">
                Добавить
              </button>
            </form>
          </section>

          <section className="card" aria-live="polite">
            {loading && <div>Загрузка…</div>}
            {!loading && tasks.length === 0 && <div>Пока пусто. Добавьте первую задачу.</div>}

            <ul className="tasks">
              {tasks.map(t => (
                <TaskItem key={t.id} task={t} onToggle={toggleDone} onDelete={removeTask} />
              ))}
            </ul>
          </section>
        </div>
      </main>

      <footer className="footer">
        <div className="container">MIT © Nauvvi1</div>
      </footer>
    </div>
  )
}
