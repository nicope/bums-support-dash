export default function KnowledgeGaps({ gaps }) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
      {gaps.map((gap, i) => (
        <div
          key={i}
          className="flex items-start gap-3 rounded-lg p-3"
          style={{ background: 'rgba(249,115,22,0.08)', border: '1px solid rgba(249,115,22,0.2)' }}
        >
          <div
            className="w-5 h-5 rounded-full flex items-center justify-center text-xs font-bold flex-shrink-0 mt-0.5"
            style={{ background: 'rgba(249,115,22,0.2)', color: '#fb923c' }}
          >
            ?
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-sm text-white">"{gap.query}"</p>
            <p className="text-xs text-gray-500 mt-0.5">
              First seen {new Date(gap.first_seen + 'T12:00:00Z').toLocaleDateString('en-US', { month: 'short', day: 'numeric', timeZone: 'UTC' })}
              {' · '}
              <span style={{ color: '#fb923c' }}>No KB match</span>
            </p>
          </div>
        </div>
      ))}
      {gaps.length === 0 && (
        <p className="text-sm text-gray-500 col-span-2">No knowledge gaps this week. 🎉</p>
      )}
    </div>
  )
}
