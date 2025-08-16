import express from 'express'
import cors from 'cors'
import morgan from 'morgan'
import tasksRouter from './routes/tasks'
import { env } from './config'

const app = express()

app.use(cors({ origin: env.CORS_ORIGIN, credentials: false }))
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

app.listen(env.PORT, () => {
  console.log(`[server] Listening on http://localhost:${env.PORT}`)
})
