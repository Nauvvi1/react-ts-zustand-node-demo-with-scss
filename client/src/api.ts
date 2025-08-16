const BASE =
  (import.meta as any)?.env?.VITE_API_URL?.toString().replace(/\/$/, '') || ''

export async function api<T>(input: string, init?: RequestInit): Promise<T> {
  const url = input.startsWith('http') ? input : `${BASE}${input}`

  const res = await fetch(url, {
    headers: { 'Content-Type': 'application/json', ...(init?.headers || {}) },
    ...init
  })

  if (!res.ok) {
    try {
      const data = await res.json()
      const msg = (data && (data.error || data.message)) || ''
      throw new Error(msg || `HTTP ${res.status}`)
    } catch {
      const text = await res.text()
      throw new Error(text || `HTTP ${res.status}`)
    }
  }
  return res.json() as Promise<T>
}
