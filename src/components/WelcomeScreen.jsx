import { useState } from "react"
import { newGame } from "../api/gameApi"

export default function WelcomeScreen({ refresh }) {
  const [name, setName] = useState("")
  const [showHowToPlay, setShowHowToPlay] = useState(false)

  const startCareer = async () => {
    if (!name.trim()) return

    await newGame({
      receptionistName: name,
      adventurerCount: 10,
      questCount: 15
    })

    refresh()
  }

  return (
    <div className="container py-5">
      <div className="row justify-content-center">
        <div className="col-lg-8">
          <div className="card shadow-lg border-0">
            <div className="card-body p-5">

              {/* Header */}
              <div className="text-center mb-4">
                <h1 className="fw-bold">🏛 Adventurer Guild Reception</h1>
                <p className="text-muted mt-2">
                  A management RPG where paperwork decides fate.
                </p>
              </div>

              {/* Intro */}
              <p className="lead">
                Welcome to the guild. As a <strong>receptionist</strong>, your role
                is not to fight monsters — but to decide who does.
              </p>

              <p>
                You assign quests, evaluate results, manage payouts, and balance
                risk against reward. Every signature you make shapes careers,
                reputations… and lives.
              </p>

              {/* Core Gameplay */}
              <h5 className="mt-4">📜 Your Responsibilities</h5>
              <ul className="list-group list-group-flush mb-4">
                <li className="list-group-item">
                  Assign quests based on adventurer rank and personality
                </li>
                <li className="list-group-item">
                  Decide payouts and manage guild profits
                </li>
                <li className="list-group-item">
                  Handle weekly quotas and unpredictable allocations
                </li>
                <li className="list-group-item">
                  Build trust to become a personal receptionist
                </li>
              </ul>

              {/* Stakes */}
              <div className="alert alert-warning">
                <strong>⚠ Your decisions have consequences</strong>
                <ul className="mb-0 mt-2">
                  <li>Deaths are permanent</li>
                  <li>Failures damage trust and reputation</li>
                  <li>Weekly audits determine salary, rank, and future access</li>
                </ul>
              </div>

              {/* How to Play Toggle */}
              <div className="text-center mt-4">
                <button
                  className="btn btn-outline-secondary"
                  onClick={() => setShowHowToPlay(!showHowToPlay)}
                >
                  {showHowToPlay ? "Hide How to Play" : "How to Play"}
                </button>
              </div>

              {/* How to Play Section */}
              {showHowToPlay && (
                <div className="mt-4 border rounded p-4 bg-light">
                  <h5 className="fw-bold mb-3">📘 How to Play</h5>

                  <ol className="mb-0">
                    <li className="mb-2">
                      Set a weekly quota. Quests will be generated based on how
                      much work you commit to handling.
                    </li>
                    <li className="mb-2">
                      Assign suitable quests to adventurers based on their rank
                      and traits.
                    </li>
                    <li className="mb-2">
                      Their success is your success — completions boost fame,
                      trust, and profit.
                    </li>
                    <li className="mb-2">
                      Feeling overwhelmed? You can always advance to the next
                      day to rest and reset.
                    </li>
                    <li className="mb-2">
                      There is a daily work limit. Poor planning will force
                      rushed decisions later.
                    </li>
                    <li className="mb-2 text-muted">
                      <strong>(In Progress)</strong> Promotions unlock advanced
                      quests and elite adventurers based on your performance.
                    </li>
                    <li className="mb-2 text-muted">
                      <strong>(In Progress)</strong> Adventurers may choose you
                      as their personal receptionist, guaranteeing weekly visits
                      and massive reputation gains.
                    </li>
                    <li className="mb-0">
                      Assigning a dangerous quest can result in death. Lost
                      adventurers are gone forever.
                    </li>
                    <li className="mb-2 text-muted">
                      <strong>(In Progress)</strong> Special weekly quests which will require more than one adventurers.
                    </li>
                  </ol>
                </div>
              )}

              {/* Name Input */}
              <div className="mt-4">
                <label className="form-label fw-semibold">
                  Receptionist Name
                </label>
                <input
                  type="text"
                  className="form-control form-control-lg"
                  placeholder="Enter your name"
                  value={name}
                  onChange={e => setName(e.target.value)}
                />
              </div>

              {/* Action */}
              <div className="d-grid mt-4">
                <button
                  type="button"
                  className="btn btn-primary btn-lg"
                  onClick={startCareer}
                >
                  Begin Your Career
                </button>
              </div>

              {/* Footer Flavor */}
              <p className="text-muted text-center mt-4 mb-0">
                “The guild remembers everything.”
              </p>

            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
