
export function getStateId() {
  let id = localStorage.getItem("stateId")

  if (!id) {
    id = crypto.randomUUID()
    localStorage.setItem("stateId", id)
  }

  return id
}