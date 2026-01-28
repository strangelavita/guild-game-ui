// const API = "https://noble-rejoicing-production.up.railway.app/api"
export const API = "http://localhost:8080/api"

import { getStateId } from "../state/session"

function withStateId(url) {
  const stateId = getStateId()
  return `${url}?stateId=${stateId}`
}

/* ---------- STATE ---------- */

export const getState = () =>
  fetch(withStateId(`${API}/state`))
    .then(r => r.json())

/* ---------- GAME ---------- */

export const newGame = (payload) =>
  fetch(
    withStateId(`${API}/game/new`),
    {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload)
    }
  )


/* ---------- QUOTA ---------- */

export const submitQuota = (quota) =>
  fetch(
    withStateId(`${API}/quota/submit`),
    {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(quota)
    }
  )

/* ---------- RECEPTION ---------- */

export const nextVisitor = () =>
  fetch(
    withStateId(`${API}/reception/next`),
    { method: "POST" }
  ).then(r => r.json())

export const endDay = () =>
  fetch(
    withStateId(`${API}/reception/end-day`),
    { method: "POST" }
  )

/* ---------- QUESTS ---------- */

export const assignQuest = (payload) =>
  fetch(
    withStateId(`${API}/quests/assign`),
    {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload)
    }
  )

/* ---------- SIMULATION ---------- */

export const simulateWeek = () =>
  fetch(
    withStateId(`${API}/simulate/week`),
    { method: "POST" }
  ).then(r => r.json())

/* ---------- AUDIT ---------- */

export const clearAudit = () =>
  fetch(
    withStateId(`${API}/audit/acknowledge`),
    { method: "POST" }
  )

export const acknowledgePromotion = () =>
  fetch(
    withStateId(`${API}/audit/acknowledge/promotion`),
    { method: "POST" }
  )

/* ---------- SAVE / LOAD ---------- */

export const saveGame = async (slot) => {
  const res = await fetch(
    withStateId(`${API}/save/${slot}`),
    { method: "POST" }
  )
  if (!res.ok) throw new Error("Save failed")
}

export const loadGame = async (slot) => {
  const res = await fetch(
    withStateId(`${API}/save/load/${slot}`),
    { method: "POST" }
  )
  if (!res.ok) throw new Error("Load failed")
}

export const resetGame = async () => {
  const res = await fetch(
    withStateId(`${API}/state`),
    { method: "POST" }
  )
  if (!res.ok) throw new Error("Reset failed")
}

