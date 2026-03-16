import { getAllReports, fmtSeconds, formatWeekLabel } from '@/lib/reports'
import Link from 'next/link'
import Nav from '@/components/Nav'

export default function ReportsArchive() {
  const reports = getAllReports()

  return (
    <div className="min-h-screen" style={{ background: '#0f0f1a' }}>
      <Nav active="reports" />
      <main className="max-w-7xl mx-auto px-6 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-white mb-1">Reports Archive</h1>
          <p className="text-gray-400 text-sm">{reports.length} week{reports.length !== 1 ? 's' : ''} of support data</p>
        </div>

        <div className="space-y-3">
          {reports.map((r, i) => {
            const closeRate = Math.round((r.metrics.closed / r.metrics.created) * 100)
            const queueDelta = r.metrics.created - r.metrics.closed
            const isLatest = i === 0
            return (
              <div key={r.week_start} className="card flex items-center justify-between gap-6 flex-wrap">
                <div className="flex items-center gap-4">
                  {isLatest && (
                    <span className="text-xs font-bold px-2 py-0.5 rounded-full bg-pink-500/20 text-pink-400">
                      Latest
                    </span>
                  )}
                  <div>
                    <p className="font-semibold text-white">
                      Week of {formatWeekLabel(r.week_start)} – {formatWeekLabel(r.week_end)}
                    </p>
                    <p className="text-xs text-gray-500 mt-0.5">{r.week_start}</p>
                  </div>
                </div>

                {/* Mini stats */}
                <div className="flex items-center gap-8 text-sm flex-wrap">
                  <div className="text-center">
                    <p className="text-white font-bold">{r.metrics.created}</p>
                    <p className="text-gray-500 text-xs">Created</p>
                  </div>
                  <div className="text-center">
                    <p className="text-white font-bold">{r.metrics.closed}</p>
                    <p className="text-gray-500 text-xs">Closed</p>
                  </div>
                  <div className="text-center">
                    <p className={`font-bold ${closeRate >= 80 ? 'text-green-400' : closeRate >= 60 ? 'text-yellow-400' : 'text-red-400'}`}>
                      {closeRate}%
                    </p>
                    <p className="text-gray-500 text-xs">Close Rate</p>
                  </div>
                  <div className="text-center">
                    <p className={`font-bold ${queueDelta > 0 ? 'text-red-400' : 'text-green-400'}`}>
                      {queueDelta > 0 ? '+' : ''}{queueDelta}
                    </p>
                    <p className="text-gray-500 text-xs">Queue Δ</p>
                  </div>
                  <div className="text-center">
                    <p className="text-white font-bold">{fmtSeconds(r.metrics.frt_seconds)}</p>
                    <p className="text-gray-500 text-xs">Avg FRT</p>
                  </div>
                </div>

                {/* Actions */}
                <div className="flex items-center gap-3">
                  {r.pdf_filename && (
                    <a
                      href={`/reports/${r.pdf_filename}`}
                      target="_blank"
                      className="text-sm text-pink-400 hover:text-pink-300 flex items-center gap-1 transition-colors"
                    >
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                      </svg>
                      PDF
                    </a>
                  )}
                </div>
              </div>
            )
          })}
        </div>
      </main>
    </div>
  )
}
