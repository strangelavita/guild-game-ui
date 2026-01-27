import { useEffect, useState } from "react"
import { getState } from "../api/gameApi"

export function useGameState() {
  const [state, setState] = useState(null)
  const [error, setError] = useState(null)

  const refresh = async () => {
    try {
      const data = await getState()
      setState(data)
    } catch (e) {
      console.error("Failed to load game state", e)
      setError("Backend not reachable")
    }
  }

  useEffect(() => {
    // DO NOT make useEffect async
    refresh()
  }, [])

  return { state, refresh, error }
}
