import { useState } from "react"
import { submitQuota } from "../api/gameApi"

/**
 * Rank hierarchy (lowest → highest)
 * Must match backend enum names
 */
const RANK_ORDER = ["F", "E", "D", "C", "B", "A"]

export default function QuotaScreen({ state, refresh }) {
  const receptionistRank = state.receptionist.rank

  // Allowed ranks = own rank and below
  const allowedRanks = RANK_ORDER.filter(
    r => RANK_ORDER.indexOf(r) <= RANK_ORDER.indexOf(receptionistRank)
  )

  // Initialize quota state dynamically
  const [quota, setQuota] = useState(
    Object.fromEntries(allowedRanks.map(r => [r, 7]))
  )

  const changeQuota = (rank, delta) => {
    setQuota(q => ({
      ...q,
      [rank]: Math.max(0, q[rank] + delta)
    }))
  }

  const submit = async () => {
    await submitQuota({
      requested: quota
    })
    refresh()
  }

  const rankDescription = (rank) => {
    switch (rank) {
      case "F":
        return "Low risk, low reward"
      case "E":
        return "Moderate risk, higher scrutiny"
      case "D":
        return "High expectations, serious consequences"
      case "C":
        return "Strategic importance to the guild"
      case "B":
        return "Elite operations, minimal tolerance for failure"
      case "A":
        return "Critical missions of national significance"
      default:
        return ""
    }
  }

  return (
    <div className="container py-5">
      <div className="row justify-content-center">
        <div className="col-lg-6">
          <div className="card shadow border-0">
            <div className="card-body p-4">

              {/* Header */}
              <div className="mb-4">
                <h2 className="fw-bold mb-3">📅 Weekly Planning</h2>

                <p className="text-muted mb-2">
                  This week’s quests have been assigned to you based on your
                  previous quota and the current availability within the guild.
                </p>

                <p className="text-muted mb-2">
                  You may now request how many quests you would like to handle
                  in the coming week.
                </p>

                <p className="text-muted mb-0">
                  As a <strong>{receptionistRank}-Rank</strong> receptionist,
                  you may only request quests of your rank or below.
                </p>
              </div>

              {/* Quota Selection */}
              {allowedRanks.map(rank => (
                <div
                  key={rank}
                  className="d-flex align-items-center justify-content-between border rounded p-3 mb-3"
                >
                  <div>
                    <h5 className="mb-1">{rank}-Rank Quests</h5>
                    <small className="text-muted">
                      {rankDescription(rank)}
                    </small>
                  </div>

                  <div className="d-flex align-items-center gap-2">
                    <button
                      type="button"
                      className="btn btn-outline-secondary"
                      onClick={() => changeQuota(rank, -1)}
                    >
                      −
                    </button>

                    <span className="fs-4 fw-bold px-3">
                      {quota[rank]}
                    </span>

                    <button
                      type="button"
                      className="btn btn-outline-secondary"
                      onClick={() => changeQuota(rank, 1)}
                    >
                      +
                    </button>
                  </div>
                </div>
              ))}

              {/* Warning */}
              <div className="alert alert-warning">
                ⚠ Overcommitting increases failure rates, deaths, and audit penalties.
              </div>

              {/* Submit */}
              <div className="d-grid">
                <button
                  type="button"
                  className="btn btn-primary btn-lg"
                  onClick={submit}
                >
                  Submit to Guild
                </button>
              </div>

              {/* Flavor */}
              <p className="text-muted text-center mt-3 mb-0">
                The guild will not always honor your request.
              </p>

            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
