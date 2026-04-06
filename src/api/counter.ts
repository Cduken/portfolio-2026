// api/counter.ts
import type { VercelRequest, VercelResponse } from '@vercel/node'

const BASE_URL = 'https://api.counterapi.dev/v2/ernest-cabarrubiass-team-3615/views-counter'

export default async function handler(req: VercelRequest, res: VercelResponse) {
  const { increment } = req.query

  const endpoint = increment === 'true' ? `${BASE_URL}/up` : BASE_URL
  const method = increment === 'true' ? 'POST' : 'GET'

  try {
    const response = await fetch(endpoint, {
      method,
      headers: {
        'Authorization': `Bearer ${process.env.VITE_COUNTER_API_KEY}`,
        'Content-Type': 'application/json',
      }
    })
    const data = await response.json()
    res.status(200).json(data)
  } catch {
    res.status(500).json({ error: 'Counter unavailable' })
  }
}