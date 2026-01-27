import { useGameState } from "./hooks/useGameState"
import QuotaScreen from "./components/QuotaScreen"
import DeskView from "./components/DeskView"
import AuditView from "./components/AuditView"
import WelcomeScreen from "./components/WelcomeScreen"
import GameHeader from "./components/GameHeader"

export default function App() {
  const { state, refresh } = useGameState()

  return (
    <>
      <GameHeader refresh={refresh} />

      <main className="pt-5">
      {!state && <WelcomeScreen refresh={refresh} />}

      {state && !state.quotaSubmitted && (
        <QuotaScreen state={state} refresh={refresh} />
      )}

      {state && state.lastAudit && (
        <AuditView state={state} refresh={refresh} />
      )}

      {state && state.quotaSubmitted && !state.lastAudit && (
        <DeskView state={state} refresh={refresh} />
      )}
    </main>
    </>
  )
}
