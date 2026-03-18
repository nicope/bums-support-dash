import { getMonthlyData } from '@/lib/reports'
import Nav from '@/components/Nav'
import MonthlyVolumeChart from '@/components/MonthlyVolumeChart'

export default function MonthlyPage() {
  const monthly = getMonthlyData()

  if (!monthly || !monthly.months?.length) {
    return (
      <div className="min-h-screen" style={{ background: '#0f0f1a' }}>
        <Nav active="monthly" />
        <main className="max-w-7xl mx-auto px-6 py-8">
          <p className="text-gray-400">No monthly data available yet.</p>
        </main>
      </div>
    )
  }

  const full = monthly.months.filter(m => !m.partial)
  const totalCreated = full.reduce((s, m) => s + m.created, 0)
  const totalClosed = full.reduce((s, m) => s + m.closed, 0)
  const avgCreated = Math.round(totalCreated / full.length)
  const avgClosed = Math.round(totalClosed / full.length)
  const peakMonth = full.reduce((max, m) => m.created > max.created ? m : max, full[0])
  const lowMonth = full.reduce((min, m) => m.created < min.created ? m : min, full[0])
  const overallCloseRate = Math.round((totalClosed / totalCreated) * 100)
  const netBacklog = totalCreated - totalClosed

  return (
    <div className="min-h-screen" style={{ background: '#0f0f1a' }}>
      <Nav active="monthly" />

      <main className="max-w-7xl mx-auto px-6 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-white mb-1">
            By Month
          </h1>
          <p className="text-gray-400 text-sm">
            Ticket volume over{' '}
            <span className="text-pink-400 font-semibold">{monthly.months.length} months</span>
            {' '}· {monthly.months[0]?.label} – {monthly.months[monthly.months.length - 1]?.label}
            {' '}· <span className="text-gray-500">Updated {monthly.generated}</span>
          </p>
        </div>

        {/* KPI row */}
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4 mb-6">
          {[
            { label: 'Avg Created / mo', value: avgCreated.toLocaleString(), color: '#E91E8C' },
            { label: 'Avg Closed / mo', value: avgClosed.toLocaleString(), color: '#7C3AED' },
            { label: 'Close Rate', value: `${overallCloseRate}%`, color: overallCloseRate >= 80 ? '#22c55e' : overallCloseRate >= 60 ? '#facc15' : '#ef4444' },
            { label: 'Net Backlog', value: `+${netBacklog.toLocaleString()}`, color: '#f97316' },
            { label: 'Peak Month', value: peakMonth.label, sub: `${peakMonth.created.toLocaleString()} tickets`, color: '#E91E8C' },
            { label: 'Lowest Month', value: lowMonth.label, sub: `${lowMonth.created.toLocaleString()} tickets`, color: '#22c55e' },
          ].map((kpi, i) => (
            <div key={i} className="card text-center">
              <p className="text-gray-500 text-xs mb-1">{kpi.label}</p>
              <p className="text-xl font-bold" style={{ color: kpi.color }}>{kpi.value}</p>
              {kpi.sub && <p className="text-gray-500 text-xs mt-0.5">{kpi.sub}</p>}
            </div>
          ))}
        </div>

        {/* Main chart */}
        <div className="card">
          <p className="section-title">Monthly Ticket Volume</p>
          <MonthlyVolumeChart data={monthly.months} />
          {(() => {
            const partial = monthly.months.find(m => m.partial)
            if (!partial) return null
            const throughDate = partial.through || monthly.generated
            return (
              <p className="text-gray-600 text-xs mt-3 text-center">
                * {partial.label.replace('*', '')} is a partial month (data through {throughDate})
              </p>
            )
          })()}
        </div>

        {/* Table */}
        <div className="card mt-6">
          <p className="section-title">Month-by-Month Breakdown</p>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="text-left text-gray-500 text-xs uppercase tracking-wider">
                  <th className="pb-3 pr-4">Month</th>
                  <th className="pb-3 pr-4 text-right">Created</th>
                  <th className="pb-3 pr-4 text-right">Closed</th>
                  <th className="pb-3 pr-4 text-right">Close Rate</th>
                  <th className="pb-3 pr-4 text-right">Net Change</th>
                  <th className="pb-3 text-right">vs Avg</th>
                </tr>
              </thead>
              <tbody>
                {monthly.months.map((m, i) => {
                  const cr = m.created > 0 ? Math.round((m.closed / m.created) * 100) : 0
                  const net = m.created - m.closed
                  const vsAvg = m.partial ? null : Math.round(((m.created - avgCreated) / avgCreated) * 100)
                  return (
                    <tr key={m.month} className={`border-t border-white/5 ${i % 2 === 0 ? '' : 'bg-white/[0.02]'}`}>
                      <td className="py-2.5 pr-4 font-medium text-white">
                        {m.label}
                        {m.partial && <span className="text-xs text-gray-500 ml-1">(partial)</span>}
                      </td>
                      <td className="py-2.5 pr-4 text-right text-white">{m.created.toLocaleString()}</td>
                      <td className="py-2.5 pr-4 text-right text-white">{m.closed.toLocaleString()}</td>
                      <td className="py-2.5 pr-4 text-right">
                        <span className={cr >= 80 ? 'text-green-400' : cr >= 60 ? 'text-yellow-400' : 'text-red-400'}>
                          {cr}%
                        </span>
                      </td>
                      <td className="py-2.5 pr-4 text-right">
                        <span className={net > 0 ? 'text-red-400' : 'text-green-400'}>
                          {net > 0 ? '+' : ''}{net.toLocaleString()}
                        </span>
                      </td>
                      <td className="py-2.5 text-right">
                        {vsAvg !== null ? (
                          <span className={vsAvg > 0 ? 'text-pink-400' : 'text-blue-400'}>
                            {vsAvg > 0 ? '+' : ''}{vsAvg}%
                          </span>
                        ) : (
                          <span className="text-gray-600">—</span>
                        )}
                      </td>
                    </tr>
                  )
                })}
              </tbody>
            </table>
          </div>
        </div>
      </main>
    </div>
  )
}
