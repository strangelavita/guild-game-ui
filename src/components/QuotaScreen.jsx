import { useState } from "react"
import { submitQuota } from "../api/gameApi"

export default function QuotaScreen({ state, refresh }) {
  const [fRank, setFRank] = useState(5)
  const [eRank, setERank] = useState(3)

  const submit = async () => {
    await submitQuota({
      requested: {
        F: fRank,
        E: eRank
      }
    })
    refresh()
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
    This week’s quests have been assigned to you based on your previous
    quota and the current availability within the guild.
  </p>

  <p className="text-muted mb-2">
    You may now request how many quests you would like to handle
    in the coming week.
  </p>

  <p className="text-muted mb-0">
    Declare your capacity responsibly. The guild will assign quests
    based on your requested quota and the quests currently available.
  </p>
</div>


              {/* F Rank */}
              <div className="d-flex align-items-center justify-content-between border rounded p-3 mb-3">
                <div>
                  <h5 className="mb-1">F-Rank Quests</h5>
                  <small className="text-muted">
                    Low risk, low reward
                  </small>
                </div>

                <div className="d-flex align-items-center gap-2">
                  <button
                    type="button"
                    className="btn btn-outline-secondary"
                    onClick={() => setFRank(Math.max(0, fRank - 1))}
                  >
                    −
                  </button>

                  <span className="fs-4 fw-bold px-3">
                    {fRank}
                  </span>

                  <button
                    type="button"
                    className="btn btn-outline-secondary"
                    onClick={() => setFRank(fRank + 1)}
                  >
                    +
                  </button>
                </div>
              </div>

              {/* E Rank */}
              <div className="d-flex align-items-center justify-content-between border rounded p-3 mb-3">
                <div>
                  <h5 className="mb-1">E-Rank Quests</h5>
                  <small className="text-muted">
                    Moderate risk, higher scrutiny
                  </small>
                </div>

                <div className="d-flex align-items-center gap-2">
                  <button
                    type="button"
                    className="btn btn-outline-secondary"
                    onClick={() => setERank(Math.max(0, eRank - 1))}
                  >
                    −
                  </button>

                  <span className="fs-4 fw-bold px-3">
                    {eRank}
                  </span>

                  <button
                    type="button"
                    className="btn btn-outline-secondary"
                    onClick={() => setERank(eRank + 1)}
                  >
                    +
                  </button>
                </div>
              </div>

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
