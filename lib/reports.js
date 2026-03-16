import fs from 'fs'
import path from 'path'

// Re-export utils for convenience in server components
export { fmtSeconds, formatWeekLabel } from './utils.js'

const DATA_DIR = path.join(process.cwd(), 'data')

export function getAllReports() {
  const files = fs.readdirSync(DATA_DIR)
    .filter(f => f.endsWith('.json'))
    .sort()
    .reverse() // newest first
  return files.map(f => {
    const raw = fs.readFileSync(path.join(DATA_DIR, f), 'utf8')
    return JSON.parse(raw)
  })
}

export function getLatestReport() {
  const all = getAllReports()
  return all[0] || null
}

export function getReport(weekStart) {
  const file = path.join(DATA_DIR, `${weekStart}.json`)
  if (!fs.existsSync(file)) return null
  return JSON.parse(fs.readFileSync(file, 'utf8'))
}
