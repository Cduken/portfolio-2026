import { useState, useEffect } from "react";

export function useVisitorCount() {
  const [count, setCount] = useState<number | undefined>(undefined);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    const hasVisited = sessionStorage.getItem("portfolio_visited");
    const endpoint = hasVisited
      ? "/api/counter"
      : "/api/counter?increment=true";

    fetch(endpoint)
      .then((res) => {
        if (!res.ok) throw new Error(`HTTP ${res.status}`);
        return res.json();
      })
      .then((data) => {
        if (data?.value !== undefined) {
          setCount(Number(data.value));
          if (!hasVisited) {
            sessionStorage.setItem("portfolio_visited", "true");
          }
        }
      })
      .catch((err) => console.debug("Counter unavailable:", err.message))
      .finally(() => setIsLoading(false));
  }, []);

  return { count, isLoading };
}
