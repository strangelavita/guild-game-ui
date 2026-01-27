import { useState } from "react"
import { assignQuest } from "../api/gameApi"

const RANK_ORDER = {
  S: 6,
  A: 5,
  B: 4,
  C: 3,
  D: 2,
  E: 1,
  F: 0,
}

const riskIcons = (risk) => {
  if (risk < 0.2) return "💀"
  if (risk < 0.4) return "💀💀"
  return "💀💀💀"
}

export default function QuestModal({ visitor, state, refresh, close }) {
  const [selectedQuest, setSelectedQuest] = useState(null)
  const [bonus, setBonus] = useState(0)

  const adventurerRank = visitor.rank

  const availableQuests = state.weeklyQuests.filter(q =>
    RANK_ORDER[adventurerRank] >= RANK_ORDER[q.difficulty]
  )

  const assign = async () => {
    await assignQuest({
      questInstanceId: selectedQuest,
      adventurerId: visitor.id,
      bonusReward: bonus
    })

    await refresh()
    close()
  }

  return (
    <div
      style={{
        position: "fixed",
        inset: 0,
        background: "rgba(0,0,0,0.6)",
        zIndex: 1050
      }}
      className="d-flex align-items-center justify-content-center"
    >
      <div
        className="card shadow-lg border-0 d-flex flex-column"
        style={{
          width: 520,
          maxHeight: "85vh"
        }}
      >
        {/* Header */}
        <div className="card-header bg-dark text-white">
          <h5 className="mb-0">
            📜 Assign Quest — {visitor.name}
          </h5>
        </div>

        {/* Scrollable Body */}
        <div
          className="card-body overflow-auto"
          style={{ flex: 1 }}
        >
          {/* Quest List */}
          <div className="mb-3">
            <h6 className="fw-semibold">Available Quests</h6>

            <div className="list-group">
              {availableQuests.map(q => (
                <label
                  key={q.id}
                  className={`list-group-item list-group-item-action ${
                    selectedQuest === q.id ? "active" : ""
                  }`}
                  style={{ cursor: "pointer" }}
                >
                  <input
                    type="radio"
                    name="quest"
                    className="form-check-input me-2"
                    checked={selectedQuest === q.id}
                    onChange={() => setSelectedQuest(q.id)}
                  />

                  {/* Title */}
                  <strong className="d-block">
                    {q.title}
                  </strong>

                  {/* Meta row */}
                  <div className="small text-muted d-flex justify-content-between mt-1">
                    <span>
                      Difficulty: <strong>{q.difficulty}</strong> · Reward: {q.baseReward}g
                    </span>

                    <span title={`Base Risk: ${q.baseRisk}`}>
                      {riskIcons(q.baseRisk)}
                    </span>
                  </div>

                  {/* Description */}
                  <div className="small mt-2 fst-italic text-secondary">
                    {q.description}
                  </div>
                </label>
              ))}
            </div>
          </div>

          {/* Bonus */}
          <div className="border rounded p-3">
            <h6 className="fw-semibold mb-2">💰 Bonus Pay</h6>

            <div className="d-flex align-items-center justify-content-between">
              <small className="text-muted">
                Extra gold may improve success — or expectations.
              </small>

              <div className="d-flex align-items-center gap-2">
                <button
                  type="button"
                  className="btn btn-outline-secondary btn-sm"
                  onClick={() => setBonus(Math.max(0, bonus - 10))}
                >
                  −
                </button>

                <span className="fw-bold px-2">
                  {bonus}g
                </span>

                <button
                  type="button"
                  className="btn btn-outline-secondary btn-sm"
                  onClick={() => setBonus(bonus + 10)}
                >
                  +
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="card-footer d-flex justify-content-between">
          <button
            type="button"
            className="btn btn-outline-secondary"
            onClick={close}
          >
            Cancel
          </button>

          <button
            type="button"
            className="btn btn-danger"
            disabled={!selectedQuest}
            onClick={assign}
          >
            Confirm Assignment
          </button>
        </div>
      </div>
    </div>
  )
}
