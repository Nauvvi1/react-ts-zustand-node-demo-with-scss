import { create } from 'zustand'
import { api } from '../api'

export type Task = {
  id: string
  title: string
  done: boolean
}

type State = {
  tasks: Task[]
  loading: boolean
  fetchTasks: () => Promise<void>
  addTask: (title: string) => Promise<void>
  toggleDone: (id: string, done: boolean) => Promise<void>
  removeTask: (id: string) => Promise<void>
}

export const useTasks = create<State>((set, get) => ({
  tasks: [],
  loading: false,

  async fetchTasks() {
    set({ loading: true })
    try {
      const data = await api<Task[]>('/api/tasks')
      set({ tasks: data })
    } finally {
      set({ loading: false })
    }
  },

  async addTask(title: string) {
    const created = await api<Task>('/api/tasks', {
      method: 'POST',
      body: JSON.stringify({ title })
    })
    set({ tasks: [created, ...get().tasks] })
  },

  async toggleDone(id: string, done: boolean) {
    const updated = await api<Task>(`/api/tasks/${id}`, {
      method: 'PATCH',
      body: JSON.stringify({ done })
    })
    set({ tasks: get().tasks.map(t => (t.id === id ? updated : t)) })
  },

  async removeTask(id: string) {
    await api<{ ok: true }>(`/api/tasks/${id}`, { method: 'DELETE' })
    set({ tasks: get().tasks.filter(t => t.id !== id) })
  }
}))
