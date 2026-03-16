// Client-safe utility functions (no Node.js APIs)

export function fmtSeconds(secs) {
  if (!secs) return '—'
  secs = Math.round(secs)
  if (secs < 60) return `${secs}s`
  if (secs < 3600) return `${Math.floor(secs / 60)}m`
  if (secs < 86400) {
    const h = Math.floor(secs / 3600)
    const m = Math.floor((secs % 3600) / 60)
    return m ? `${h}h ${m}m` : `${h}h`
  }
  const d = Math.floor(secs / 86400)
  const h = Math.floor((secs % 86400) / 3600)
  return h ? `${d}d ${h}h` : `${d}d`
}

export function formatWeekLabel(weekStart) {
  const d = new Date(weekStart + 'T12:00:00Z')
  return d.toLocaleDateString('en-US', { month: 'short', day: 'numeric', timeZone: 'UTC' })
}
