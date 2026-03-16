'use client'
import {
  LineChart, Line, BarChart, Bar, XAxis, YAxis, CartesianGrid,
  Tooltip, Legend, ResponsiveContainer
} from 'recharts'
import { formatWeekLabel } from '@/lib/utils'

const TooltipStyle = { background: '#1a2744', border: '1px solid rgba(233,30,140,0.3)', borderRadius: 8, padding: '8px 12px', fontSize: 12 }

export default function TrendCharts({ reports }) {
  // Build trend data (oldest → newest)
  const data = [...reports].reverse().map(r => ({
    week: formatWeekLabel(r.week_start),
    Created: r.metrics.created,
    Closed: r.metrics.closed,
    'Close Rate': Math.round((r.metrics.closed / r.metrics.created) * 100),
    'Open Queue': r.metrics.open_total,
    FRT: Math.round(r.metrics.frt_seconds / 60), // minutes
    'Zero-Touch': r.metrics.zero_touch_rate,
  }))

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      {/* Volume trend */}
      <div>
        <p className="text-xs text-gray-500 mb-3">Ticket Volume</p>
        <ResponsiveContainer width="100%" height={140}>
          <BarChart data={data} margin={{ left: -25, right: 4 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" />
            <XAxis dataKey="week" tick={{ fill: '#666', fontSize: 10 }} axisLine={false} tickLine={false} />
            <YAxis tick={{ fill: '#666', fontSize: 10 }} axisLine={false} tickLine={false} />
            <Tooltip contentStyle={TooltipStyle} />
            <Bar dataKey="Created" fill="#E91E8C" opacity={0.7} radius={[2,2,0,0]} />
            <Bar dataKey="Closed" fill="#7C3AED" opacity={0.7} radius={[2,2,0,0]} />
          </BarChart>
        </ResponsiveContainer>
      </div>

      {/* Close rate + queue */}
      <div>
        <p className="text-xs text-gray-500 mb-3">Close Rate % &amp; Queue</p>
        <ResponsiveContainer width="100%" height={140}>
          <LineChart data={data} margin={{ left: -25, right: 4 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" />
            <XAxis dataKey="week" tick={{ fill: '#666', fontSize: 10 }} axisLine={false} tickLine={false} />
            <YAxis yAxisId="left" tick={{ fill: '#666', fontSize: 10 }} axisLine={false} tickLine={false} />
            <YAxis yAxisId="right" orientation="right" tick={{ fill: '#666', fontSize: 10 }} axisLine={false} tickLine={false} />
            <Tooltip contentStyle={TooltipStyle} />
            <Line yAxisId="left" type="monotone" dataKey="Close Rate" stroke="#22c55e" strokeWidth={2} dot={{ fill: '#22c55e', r: 3 }} />
            <Line yAxisId="right" type="monotone" dataKey="Open Queue" stroke="#f97316" strokeWidth={2} dot={{ fill: '#f97316', r: 3 }} strokeDasharray="4 2" />
          </LineChart>
        </ResponsiveContainer>
      </div>

      {/* FRT trend */}
      <div>
        <p className="text-xs text-gray-500 mb-3">Avg First Response (min) &amp; Zero-Touch %</p>
        <ResponsiveContainer width="100%" height={140}>
          <LineChart data={data} margin={{ left: -25, right: 4 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" />
            <XAxis dataKey="week" tick={{ fill: '#666', fontSize: 10 }} axisLine={false} tickLine={false} />
            <YAxis yAxisId="left" tick={{ fill: '#666', fontSize: 10 }} axisLine={false} tickLine={false} />
            <YAxis yAxisId="right" orientation="right" tick={{ fill: '#666', fontSize: 10 }} axisLine={false} tickLine={false} />
            <Tooltip contentStyle={TooltipStyle} />
            <Line yAxisId="left" type="monotone" dataKey="FRT" stroke="#E91E8C" strokeWidth={2} dot={{ fill: '#E91E8C', r: 3 }} />
            <Line yAxisId="right" type="monotone" dataKey="Zero-Touch" stroke="#a78bfa" strokeWidth={2} dot={{ fill: '#a78bfa', r: 3 }} strokeDasharray="4 2" />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  )
}
