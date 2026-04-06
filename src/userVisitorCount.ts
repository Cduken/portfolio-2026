import { useState, useEffect } from 'react'

export function useVisitorCount() {
  const [count, setCount] = useState<number>(0) // 👈 default to 0

  useEffect(() => {
    fetch('https://api.counterapi.dev/v1/ernest-cabarrubiass-team-3615/portfolio-views/up')
      .then(res => res.json())
      .then(data => {
        if (data?.value !== undefined) {
          setCount(Number(data.value))
        }
      })
      .catch(() => setCount(0)) // 👈 fallback to 0
  }, [])

  return count
}