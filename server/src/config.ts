import 'dotenv/config'
import { z } from 'zod'

const Env = z.object({
  PORT: z.coerce.number().int().positive().default(4000),
  CORS_ORIGIN: z.string().default('http://localhost:5173')
})

export const env = Env.parse(process.env)