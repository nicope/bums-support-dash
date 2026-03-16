const SEVERITY = {
  Critical: { bg: 'rgba(239,68,68,0.15)', text: '#f87171', dot: '#ef4444' },
  High:     { bg: 'rgba(249,115,22,0.15)', text: '#fb923c', dot: '#f97316' },
  Medium:   { bg: 'rgba(234,179,8,0.15)',  text: '#fbbf24', dot: '#eab308' },
  Low:      { bg: 'rgba(34,197,94,0.15)',  text: '#4ade80', dot: '#22c55e' },
}

export default function IssueBreakdown({ issues }) {
  const max = Math.max(...issues.map(i => i.volume))

  return (
    <div className="space-y-3">
      {issues.map((issue, i) => {
        const sev = SEVERITY[issue.severity] || SEVERITY.Low
        const pct = Math.round((issue.volume / max) * 100)
        return (
          <div key={issue.label} className="flex items-center gap-3">
            <span className="text-xs text-gray-600 w-4 text-right flex-shrink-0">{i + 1}</span>
            <div className="flex-1 min-w-0">
              <div className="flex items-center justify-between mb-1">
                <span className="text-sm text-white font-medium truncate pr-2">{issue.category}</span>
                <div className="flex items-center gap-2 flex-shrink-0">
                  <span className="text-xs font-bold text-white">{issue.volume}</span>
                  <span
                    className="text-xs font-bold px-1.5 py-0.5 rounded-full"
                    style={{ background: sev.bg, color: sev.text }}
                  >
                    {issue.severity}
                  </span>
                </div>
              </div>
              <div className="h-1.5 rounded-full w-full" style={{ background: 'rgba(255,255,255,0.07)' }}>
                <div
                  className="h-1.5 rounded-full transition-all"
                  style={{ width: `${pct}%`, background: sev.dot }}
                />
              </div>
            </div>
          </div>
        )
      })}
    </div>
  )
}
