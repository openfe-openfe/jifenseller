import storage from 'best-storage'

const HIST= '_hist_'
export function saveHis(query) {
  let history = storage.get(HIST, query)

  storage.set(HIST, history)
  return history
}

