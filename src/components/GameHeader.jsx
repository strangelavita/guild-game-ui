import { useState } from "react"
import { saveGame, loadGame, resetGame } from "../api/gameApi"

export default function GameHeader({ refresh }) {
  const [slot, setSlot] = useState("slot1")
  const [busy, setBusy] = useState(false)
  const [toast, setToast] = useState(null)

  const showToast = (message, type = "success") => {
    setToast({ message, type })
    setTimeout(() => setToast(null), 3000)
  }

  const handleSave = async () => {
    try {
      setBusy(true)
      await saveGame(slot)
      showToast(`Game saved to ${slot}`, "success")
    } finally {
      setBusy(false)
    }
  }

  const handleLoad = async () => {
    try {
      setBusy(true)
      await loadGame(slot)
      await refresh()
      showToast(`Game loaded from ${slot}`, "primary")
    } finally {
      setBusy(false)
    }
  }

  const handleReset = async () => {
    const ok = window.confirm(
      "This will reset the current game.\nAre you sure?"
    )
    if (!ok) return

    try {
      setBusy(true)
      await resetGame()
      showToast("Game reset. Restarting...", "danger")

      setTimeout(() => {
        window.location.reload()
      }, 1000)
    } finally {
      setBusy(false)
    }
  }

  return (
    <>
      {/* FIXED HEADER */}
      <nav
        className="navbar navbar-expand-lg navbar-dark bg-dark px-3 fixed-top"
        style={{ zIndex: 1030 }}
      >
        <span className="navbar-brand fw-bold">
          🏛 Adventurer Guild
        </span>

        <div className="ms-auto d-flex align-items-center gap-2">
          <select
            className="form-select form-select-sm"
            style={{ width: "100px" }}
            value={slot}
            onChange={e => setSlot(e.target.value)}
            disabled={busy}
          >
            <option value="slot1">Slot 1</option>
            <option value="slot2">Slot 2</option>
            <option value="slot3">Slot 3</option>
          </select>

          <button
            className="btn btn-sm btn-outline-success"
            onClick={handleSave}
            disabled={busy}
          >
            💾 Save
          </button>

          <button
            className="btn btn-sm btn-outline-primary"
            onClick={handleLoad}
            disabled={busy}
          >
            📂 Load
          </button>

          <button
            className="btn btn-sm btn-outline-danger"
            onClick={handleReset}
            disabled={busy}
          >
            🔄 Reset
          </button>
        </div>
      </nav>

      {/* TOAST */}
      {toast && (
        <div
          className={`toast show position-fixed bottom-0 end-0 m-3 text-bg-${toast.type}`}
          role="alert"
          aria-live="assertive"
          aria-atomic="true"
          style={{ zIndex: 1100 }}
        >
          <div className="toast-body">
            {toast.message}
          </div>
        </div>
      )}
    </>
  )
}
