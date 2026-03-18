'use client'
import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid,
  Tooltip, Legend, ResponsiveContainer, ReferenceLine, Cell
} from 'recharts'

const TooltipStyle = {
  background: '#1a2744',
  border: '1px solid rgba(233,30,140,0.3)',
  borderRadius: 8,
  padding: '8px 12px',
  fontSize: 12
}

function CustomTooltip({ active, payload, label }) {
  if (!active || !payload?.length) return null
  const d = payload[0]?.payload
  const closeRate = d.created > 0 ? Math.round((d.closed / d.created) * 100) : 0
  const backlog = d.created - d.closed
  return (
    <div style={TooltipStyle}>
      <p style={{ color: '#fff', fontWeight: 600, marginBottom: 4 }}>{label}{d.partial ? ' (partial)' : ''}</p>
      <p style={{ color: '#E91E8C', fontSize: 12 }}>Created: {d.created.toLocaleString()}</p>
      <p style={{ color: '#7C3AED', fontSize: 12 }}>Closed: {d.closed.toLocaleString()}</p>
      <p style={{ color: closeRate >= 80 ? '#22c55e' : closeRate >= 60 ? '#facc15' : '#ef4444', fontSize: 12 }}>
        Close rate: {closeRate}%
      </p>
      <p style={{ color: backlog > 0 ? '#ef4444' : '#22c55e', fontSize: 12 }}>
        Net backlog: {backlog > 0 ? '+' : ''}{backlog.toLocaleString()}
      </p>
    </div>
  )
}

export default function MonthlyVolumeChart({ data }) {
  const avg = Math.round(data.filter(d => !d.partial).reduce((s, d) => s + d.created, 0) / data.filter(d => !d.partial).length)

  return (
    <ResponsiveContainer width="100%" height={380}>
      <BarChart data={data} margin={{ top: 10, right: 10, left: -10, bottom: 0 }}>
        <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" />
        <XAxis
          dataKey="label"
          tick={{ fill: '#999', fontSize: 11 }}
          axisLine={false}
          tickLine={false}
        />
        <YAxis
          tick={{ fill: '#999', fontSize: 11 }}
          axisLine={false}
          tickLine={false}
          tickFormatter={v => v >= 1000 ? `${(v / 1000).toFixed(1)}k` : v}
        />
        <Tooltip content={<CustomTooltip />} />
        <Legend
          wrapperStyle={{ fontSize: 12, color: '#999' }}
          iconType="square"
        />
        <ReferenceLine
          y={avg}
          stroke="#E91E8C"
          strokeDasharray="6 3"
          strokeOpacity={0.5}
          label={{ value: `Avg ${avg.toLocaleString()}`, position: 'right', fill: '#E91E8C', fontSize: 10 }}
        />
        <Bar dataKey="created" name="Created" fill="#E91E8C" opacity={0.8} radius={[4, 4, 0, 0]} />
        <Bar dataKey="closed" name="Closed" fill="#7C3AED" opacity={0.8} radius={[4, 4, 0, 0]} />
      </BarChart>
    </ResponsiveContainer>
  )
}
