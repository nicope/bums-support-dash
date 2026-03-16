'use client'
import {
  ComposedChart, Bar, Line, XAxis, YAxis, CartesianGrid,
  Tooltip, Legend, ResponsiveContainer
} from 'recharts'

const CustomTooltip = ({ active, payload, label }) => {
  if (!active || !payload?.length) return null
  return (
    <div style={{ background: '#1a2744', border: '1px solid rgba(233,30,140,0.3)', borderRadius: 8, padding: '10px 14px' }}>
      <p style={{ color: '#aaa', fontSize: 12, marginBottom: 6 }}>{label}</p>
      {payload.map(p => (
        <p key={p.name} style={{ color: p.color, fontSize: 13, fontWeight: 600 }}>
          {p.name}: {p.value}
        </p>
      ))}
      {payload.length === 2 && (
        <p style={{ color: payload[1].value - payload[0].value >= 0 ? '#4ade80' : '#f87171', fontSize: 12, marginTop: 4 }}>
          Delta: {payload[1].value - payload[0].value >= 0 ? '+' : ''}{payload[1].value - payload[0].value}
        </p>
      )}
    </div>
  )
}

export default function DailyVolumeChart({ daily }) {
  const data = daily.days.map((day, i) => ({
    day: `${day} ${daily.dates[i]}`,
    Created: daily.created[i],
    Closed: daily.closed[i],
  }))

  return (
    <ResponsiveContainer width="100%" height={220}>
      <ComposedChart data={data} margin={{ top: 4, right: 8, left: -20, bottom: 0 }}>
        <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" />
        <XAxis dataKey="day" tick={{ fill: '#888', fontSize: 11 }} axisLine={false} tickLine={false} />
        <YAxis tick={{ fill: '#888', fontSize: 11 }} axisLine={false} tickLine={false} />
        <Tooltip content={<CustomTooltip />} />
        <Legend wrapperStyle={{ fontSize: 12, color: '#aaa' }} />
        <Bar dataKey="Created" fill="#E91E8C" opacity={0.7} radius={[3, 3, 0, 0]} />
        <Bar dataKey="Closed" fill="#7C3AED" opacity={0.7} radius={[3, 3, 0, 0]} />
        <Line type="monotone" dataKey="Closed" stroke="#a78bfa" strokeWidth={2} dot={false} legendType="none" />
      </ComposedChart>
    </ResponsiveContainer>
  )
}
