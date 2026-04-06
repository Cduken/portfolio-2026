/* eslint-disable react-hooks/set-state-in-effect */
import { useState, useEffect } from 'react'

const BASE_URL = 'https://api.counterapi.dev/v2/ernest-cabarrubiass-team-3615/first-counter-3615'

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
    const endpoint = hasVisited ? BASE_URL : `${BASE_URL}/up`
    const method = hasVisited ? 'GET' : 'POST'

    fetch(endpoint, {
      method,
      headers: {
        'Authorization': `Bearer ${apiKey}`,
        'Content-Type': 'application/json',
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
      })
      .finally(() => {
        setIsLoading(false)
      })
  }, [])

  return { count, isLoading }
}