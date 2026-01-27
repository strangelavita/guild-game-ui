import { clearAudit } from "../api/gameApi"

export default function AuditView({ state, refresh }) {
  const audit = state.lastAudit

  const continueGame = async () => {
    await clearAudit()
    refresh()
  }

  return (
    <div className="container py-5">
      <div className="row justify-content-center">
        <div className="col-lg-8">

          {/* Header */}
          <div className="mb-4 text-center">
            <h2 className="fw-bold">🏛 Weekly Audit</h2>
            <p className="text-muted mb-0">
              Your performance has been reviewed by the Guild.
            </p>
          </div>

          {/* Audit Summary */}
          <div className="card shadow-sm border-0 mb-4">
            <div className="card-header bg-dark text-white fw-semibold">
              📊 Performance Summary
            </div>

            <div className="card-body">
              <div className="row gy-2">
                <div className="col-6">
                  📄 <strong>Requested Quests:</strong> {audit.requested}
                </div>
                <div className="col-6">
                  📌 <strong>Assigned:</strong> {audit.assigned}
                </div>
                <div className="col-6">
                  ✅ <strong>Completed:</strong> {audit.completed}
                </div>
                <div className="col-6">
                  💀 <strong>Deaths:</strong> {audit.deaths}
                </div>
                <div className="col-12 mt-2">
                  💰 <strong>Guild Profit:</strong> {audit.guildProfit}g
                </div>
              </div>
            </div>
          </div>

          {/* Remarks */}
          <div className="card shadow-sm border-0 mb-4">
            <div className="card-header bg-secondary text-white fw-semibold">
              🗣️ Guild Master’s Remarks
            </div>

            <div className="card-body">
              {audit.comments.length > 0 ? (
                <ul className="list-group list-group-flush">
                  {audit.comments.map((c, i) => (
                    <li key={i} className="list-group-item">
                      {c}
                    </li>
                  ))}
                </ul>
              ) : (
                <p className="text-muted mb-0">
                  No additional comments were recorded.
                </p>
              )}
            </div>
          </div>

          {/* Action */}
          <div className="d-grid">
            <button
              type="button"
              className="btn btn-primary btn-lg"
              onClick={continueGame}
            >
              Begin Next Week
            </button>
          </div>

          {/* Flavor */}
          <p className="text-muted text-center mt-4 mb-0">
            “The guild does not forget. It only recalculates.”
          </p>
        </div>
      </div>
    </div>
  )
}
