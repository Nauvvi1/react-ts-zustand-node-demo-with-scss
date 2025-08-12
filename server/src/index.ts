import express from 'express'
import cors from 'cors'
import morgan from 'morgan'
import tasksRouter from './routes/tasks'

const app = express()

app.use(cors({ origin: ['http://localhost:5173'], credentials: false }))
app.use(express.json())
app.use(morgan('dev'))

app.get('/api/health', (_req, res) => {
  res.json({ ok: true, uptime: process.uptime() })
})

app.use('/api/tasks', tasksRouter)

// 404
app.use((_req, res) => {
  res.status(404).json({ error: 'Not found' })
})

const PORT = process.env.PORT ? Number(process.env.PORT) : 4000
app.listen(PORT, () => {
  console.log(`[server] Listening on http://localhost:${PORT}`)
})
