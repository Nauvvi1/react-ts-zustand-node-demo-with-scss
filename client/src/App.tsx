import React, { useEffect, useState } from 'react'
import { useTasks } from './store/useTasks'
import Home from './pages/Home'

export default function App() {
  const [ready, setReady] = useState(false)
  const fetchTasks = useTasks(s => s.fetchTasks)

  useEffect(() => {
    fetchTasks().finally(() => setReady(true))
  }, [fetchTasks])

  if (!ready) return <div className="splash">Загрузка…</div>
  return <Home />
}
