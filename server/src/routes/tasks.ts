import { Router } from 'express'
import { z } from 'zod'
import { nanoid } from 'nanoid'

type Task = {
  id: string
  title: string
  done: boolean
}

const tasks: Task[] = [
  { id: nanoid(), title: 'Пример задачи', done: false }
]

const createSchema = z.object({
  title: z.string().min(1, 'title is required').max(100, 'title is too long')
})

const patchSchema = z.object({
  title: z.string().min(1).max(100).optional(),
  done: z.boolean().optional()
})

const router = Router()

router.get('/', (_req, res) => {
  res.json(tasks.slice().reverse())
})

router.post('/', (req, res) => {
  const parsed = createSchema.safeParse(req.body)
  if (!parsed.success) {
    return res.status(400).json({ error: parsed.error.flatten() })
  }
  const task: Task = { id: nanoid(), title: parsed.data.title, done: false }
  tasks.push(task)
  res.status(201).json(task)
})

router.patch('/:id', (req, res) => {
  const parsed = patchSchema.safeParse(req.body)
  if (!parsed.success) {
    return res.status(400).json({ error: parsed.error.flatten() })
  }
  const task = tasks.find(t => t.id === req.params.id)
  if (!task) return res.status(404).json({ error: 'Task not found' })

  if (typeof parsed.data.title !== 'undefined') task.title = parsed.data.title
  if (typeof parsed.data.done !== 'undefined') task.done = parsed.data.done

  res.json(task)
})

router.delete('/:id', (req, res) => {
  const idx = tasks.findIndex(t => t.id === req.params.id)
  if (idx === -1) return res.status(404).json({ error: 'Task not found' })
  tasks.splice(idx, 1)
  res.json({ ok: true })
})

export default router
