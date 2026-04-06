/* eslint-disable react-hooks/set-state-in-effect */
import { useState, useEffect } from 'react'

export function useVisitorCount() {
  const [count, setCount] = useState<number>(0)
  const [isLoading, setIsLoading] = useState<boolean>(true)
  const [error, setError] = useState<Error | null>(null)

  useEffect(() => {
    const apiKey = import.meta.env.VITE_COUNTER_API_KEY
    
    if (!apiKey) {
      console.error('VITE_COUNTER_API_KEY is not defined')
      setError(new Error('API key is not configured'))
      setIsLoading(false)
      return
    }

    // Check if this session has already incremented the counter
    const hasIncremented = sessionStorage.getItem('visitor_counted')
    
    const endpoint = hasIncremented
      ? 'https://api.counterapi.dev/v2/ernest-cabarrubiass-team-3615/first-counter-3615' // Just get value
      : 'https://api.counterapi.dev/v2/ernest-cabarrubiass-team-3615/first-counter-3615/up' // Increment and get value

    fetch(endpoint, {
      method: hasIncremented ? 'GET' : 'POST',
      headers: {
        'Authorization': `Bearer ${apiKey}`,
        'Content-Type': 'application/json'
      }
    })
      .then(res => {
        if (!res.ok) throw new Error(`HTTP ${res.status}`)
        return res.json()
      })
      .then(data => {
        if (data?.value !== undefined) {
          setCount(Number(data.value))
          // Mark that this session has incremented the counter
          if (!hasIncremented) {
            sessionStorage.setItem('visitor_counted', 'true')
          }
        }
      })
      .catch(err => {
        console.error('Visitor counter error:', err)
        setError(err)
        setCount(0)
      })
      .finally(() => {
        setIsLoading(false)
      })
  }, [])

  return { count, isLoading, error }
}