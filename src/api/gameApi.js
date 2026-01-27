const API = "https://noble-rejoicing-production.up.railway.app/api"

export const getState = () =>
  fetch(`${API}/state`).then(r => r.json())

export const newGame = (payload) =>
  fetch(`${API}/game/new`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload)
  })

export const submitQuota = (quota) =>
  fetch(`${API}/quota/submit`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(quota)
  })

export const nextVisitor = () =>
  fetch(`${API}/reception/next`, { method: "POST" })
    .then(r => r.json())

export const endDay = () =>
  fetch(`${API}/reception/end-day`, { method: "POST" })

export const assignQuest = (payload) =>
  fetch(`${API}/quests/assign`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload)
  })

export const simulateWeek = () =>
  fetch(`${API}/simulate/week`, { method: "POST" })
    .then(r => r.json())

export const clearAudit = () =>
  fetch(`${API}/audit/acknowledge`, {
    method: "POST"
  })


export const saveGame = (slot) =>
  fetch(`${API}/save/${slot}`, { method: "POST" })

export const loadGame = (slot) =>
  fetch(`${API}/save/load/${slot}`, { method: "POST" })

export const resetGame = () =>
  fetch(`${API}/state`, { method: "POST" })


