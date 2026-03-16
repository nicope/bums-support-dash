import { getAllReports, getLatestReport, fmtSeconds, formatWeekLabel } from '@/lib/reports'
import Link from 'next/link'
import KPICards from '@/components/KPICards'
import DailyVolumeChart from '@/components/DailyVolumeChart'
import AgentTable from '@/components/AgentTable'
import IssueBreakdown from '@/components/IssueBreakdown'
import TrendCharts from '@/components/TrendCharts'
import KnowledgeGaps from '@/components/KnowledgeGaps'
import AIAgentCard from '@/components/AIAgentCard'
import Nav from '@/components/Nav'

export default function Dashboard() {
  const latest = getLatestReport()
  const allReports = getAllReports()

  if (!latest) {
    return (
      <main className="min-h-screen flex items-center justify-center">
        <p className="text-gray-400">No report data available yet.</p>
      </main>
    )
  }

  const closeRate = Math.round((latest.metrics.closed / latest.metrics.created) * 100)
  const prevReport = allReports[1] || null

  return (
    <div className="min-h-screen" style={{ background: '#0f0f1a' }}>
      <Nav active="dashboard" />

      <main className="max-w-7xl mx-auto px-6 py-8">
        {/* Header */}
        <div className="flex items-start justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold text-white mb-1">
              Support Dashboard
            </h1>
            <p className="text-gray-400 text-sm">
              Week of{' '}
              <span className="text-pink-400 font-semibold">
                {formatWeekLabel(latest.week_start)} – {formatWeekLabel(latest.week_end)}
              </span>
              {' '}· {allReports.length} week{allReports.length !== 1 ? 's' : ''} of data
            </p>
          </div>
          {latest.pdf_filename && (
            <a
              href={`/reports/${latest.pdf_filename}`}
              className="flex items-center gap-2 text-sm font-medium px-4 py-2 rounded-lg border border-pink-500/40 text-pink-400 hover:bg-pink-500/10 transition-colors"
              target="_blank"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
              </svg>
              Download PDF
            </a>
          )}
        </div>

        {/* KPI Cards */}
        <KPICards metrics={latest.metrics} prevMetrics={prevReport?.metrics} />

        {/* Main grid: charts */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mt-6">
          <div className="lg:col-span-2 card">
            <p className="section-title">Daily Ticket Volume</p>
            <DailyVolumeChart daily={latest.daily} />
          </div>
          <div className="card">
            <p className="section-title">AI Agent — Angela</p>
            <AIAgentCard ai={latest.ai_agent} />
          </div>
        </div>

        {/* Trends (only shown when ≥2 weeks of data) */}
        {allReports.length >= 2 && (
          <div className="mt-6 card">
            <p className="section-title">Trends — All Weeks</p>
            <TrendCharts reports={allReports} />
          </div>
        )}

        {/* Agent + Issues grid */}
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-6 mt-6">
          <div className="lg:col-span-3 card">
            <p className="section-title">Agent Performance</p>
            <AgentTable agents={latest.agents} />
          </div>
          <div className="lg:col-span-2 card">
            <p className="section-title">Top Issue Categories</p>
            <IssueBreakdown issues={latest.top_issues} />
          </div>
        </div>

        {/* Knowledge Gaps */}
        <div className="mt-6 card">
          <p className="section-title">AI Knowledge Gaps</p>
          <KnowledgeGaps gaps={latest.knowledge_gaps} />
        </div>
      </main>
    </div>
  )
}
