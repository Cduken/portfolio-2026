/* eslint-disable react-hooks/set-state-in-effect */
// hooks/useVisitorCount.ts
import { useState, useEffect } from 'react'

export function useVisitorCount() {
  const [count, setCount] = useState<number>(0)
  const [isLoading, setIsLoading] = useState<boolean>(true)

  useEffect(() => {
    const apiKey = import.meta.env.VITE_COUNTER_API_KEY
    
    if (!apiKey) {
      console.warn('API key not configured')
      setIsLoading(false)
      return
    }

    const hasVisited = sessionStorage.getItem('portfolio_visited')
    
    // Use CORS proxy to bypass restrictions
    const CORS_PROXY = 'https://cors-anywhere.herokuapp.com/'
    const endpoint = hasVisited
      ? 'https://api.counterapi.dev/v2/ernest-cabarrubiass-team-3615/first-counter-3615'
      : 'https://api.counterapi.dev/v2/ernest-cabarrubiass-team-3615/first-counter-3615/up'

    fetch(CORS_PROXY + endpoint, {
      method: hasVisited ? 'GET' : 'POST',
      headers: {
        'Authorization': `Bearer ${apiKey}`,
        'Content-Type': 'application/json',
        'X-Requested-With': 'XMLHttpRequest' // Required by cors-anywhere
      }
    })
      .then(res => {
        if (!res.ok) throw new Error(`HTTP ${res.status}`)
        return res.json()
      })
      .then(data => {
        if (data?.value !== undefined) {
          setCount(Number(data.value))
          if (!hasVisited) {
            sessionStorage.setItem('portfolio_visited', 'true')
          }
        }
      })
      .catch(err => {
        console.debug('Counter unavailable:', err.message)
        setCount(0)
      })
      .finally(() => {
        setIsLoading(false)
      })
  }, [])

  return { count, isLoading }
}