import { useState } from "react"
import { nextVisitor, endDay, simulateWeek } from "../api/gameApi"
import QuestModal from "./QuestModal"

export default function DeskView({ state, refresh }) {
  const visitor = state.currentVisitor
  const receptionist = state.receptionist
  const [showModal, setShowModal] = useState(false)

  const handleEndDay = async () => {
    await endDay()
    await refresh()

    const nextDay = state.day + 1
    if (nextDay % 7 === 0) {
      await simulateWeek()
      await refresh()
    }
  }

  return (
    <div className="container py-4">

      {/* HEADER */}
      <div className="mb-4">
        <h2 className="fw-bold mb-1">
          🗓 Week {state.week}, Day {state.day}
        </h2>
        <p className="text-muted mb-0">
          The desk is open. Decisions will be remembered.
        </p>
      </div>

      {/* RECEPTIONIST PANEL */}
      {receptionist && (
        <div className="card mb-4 shadow-sm border-0">
          <div className="card-header bg-dark text-white fw-semibold">
            🧑 Receptionist on Duty
          </div>

          <div className="card-body">
            <div className="row align-items-center">
              <div className="col-md-4 mb-3 mb-md-0">
                <h5 className="mb-1">{receptionist.name}</h5>
                <span className="badge bg-primary">
                  Rank {receptionist.rank}
                </span>
              </div>

              <div className="col-md-8">
                <div className="row gy-2">
                  <div className="col-6">
                    💰 <strong>Salary:</strong> {receptionist.salary} / week
                  </div>
                  <div className="col-6">
                    🏛 <strong>Guild Rep:</strong>{" "}
                    {receptionist.guildReputation.toFixed(1)}
                  </div>
                  <div className="col-6">
                    🤝 <strong>Trust:</strong>{" "}
                    {receptionist.adventurerTrust.toFixed(1)}
                  </div>
                  <div className="col-6">
                    🌟 <strong>Public Fame:</strong>{" "}
                    {receptionist.publicFame.toFixed(1)}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* VISITOR CARD */}
      <div className="card mb-4 shadow-sm border-0">
        <div className="card-header bg-secondary text-white fw-semibold">
          🛡️ Adventurer at the Desk
        </div>

        <div className="card-body">
          {visitor ? (
            <>
              <div className="d-flex justify-content-between align-items-start mb-2">
                <div>
                  <h5 className="mb-1">{visitor.name}</h5>
                  <span className="badge bg-success">
                    Rank {visitor.rank}
                  </span>
                </div>
              </div>

              <p className="mb-3">
  <strong>About:</strong>{" "}
  {visitor.background || "An unremarkable past."}
</p>

              <button
                type="button"
                className="btn btn-primary"
                onClick={() => setShowModal(true)}
              >
                Assign Quest
              </button>
            </>
          ) : (
            <p className="text-muted mb-0">
              No adventurer is currently waiting.
            </p>
          )}
        </div>
      </div>

      {/* ACTION BUTTONS */}
      <div className="d-flex justify-content-between align-items-center">
        <button
          type="button"
          className="btn btn-outline-secondary"
          onClick={() => nextVisitor().then(refresh)}
        >
          Call Next Adventurer
        </button>

        <button
          type="button"
          className="btn btn-danger"
          onClick={handleEndDay}
        >
          End Day
        </button>
      </div>

      {/* MODAL */}
      {showModal && (
        <QuestModal
          visitor={visitor}
          state={state}
          refresh={refresh}
          close={() => setShowModal(false)}
        />
      )}
    </div>
  )
}
