import { clearAudit } from "../api/gameApi"
import { acknowledgePromotion } from "../api/gameApi"

export default function AuditView({ state, refresh }) {
  const audit = state.lastAudit
  const receptionist = state.receptionist
  const justPromoted = receptionist.justPromoted

  const continueGame = async () => {
    await clearAudit()
    refresh()
  }

  const acknowledge = async () => {
    await acknowledgePromotion()
    await refresh()
  }

  return (
    <div className="container py-5 position-relative">

      {/* 🔔 PROMOTION POPUP */}
      {justPromoted && (
        <div
          className="position-fixed top-0 start-0 w-100 h-100 d-flex align-items-center justify-content-center"
          style={{
            backgroundColor: "rgba(0,0,0,0.6)",
            zIndex: 1050
          }}
        >
          <div className="card shadow-lg border-0 text-center p-4" style={{ maxWidth: "420px" }}>
            <h3 className="fw-bold mb-3">🎉 Promotion Earned!</h3>

            <p className="mb-2">
              The Guild recognizes your performance.
            </p>

            <p className="fs-5 fw-semibold">
              New Rank: <span className="text-success">{receptionist.rank}</span>
            </p>

            <button
              className="btn btn-success btn-lg mt-3"
              onClick={acknowledge}
            >
              Acknowledge
            </button>
          </div>
        </div>
      )}

      {/* NORMAL AUDIT UI */}
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
              disabled={justPromoted} // 👈 block until acknowledged
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
