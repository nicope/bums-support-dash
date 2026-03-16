import { fmtSeconds } from '@/lib/utils'

function Delta({ current, prev, invert = false, fmt = (v) => v }) {
  if (!prev) return null
  const diff = current - prev
  const pct = prev > 0 ? Math.round((diff / prev) * 100) : 0
  if (diff === 0) return null
  const isPositive = invert ? diff < 0 : diff > 0
  return (
    <span className={`text-xs font-semibold ${isPositive ? 'text-green-400' : 'text-red-400'}`}>
      {diff > 0 ? '↑' : '↓'} {Math.abs(pct)}% vs prev
    </span>
  )
}

function KPI({ label, value, sub, delta }) {
  return (
    <div className="card flex flex-col gap-1">
      <p className="text-xs text-gray-400 uppercase tracking-wide font-medium">{label}</p>
      <p className="text-3xl font-bold text-white leading-none">{value}</p>
      {sub && <p className="text-xs text-pink-400 font-semibold">{sub}</p>}
      {delta}
    </div>
  )
}

export default function KPICards({ metrics, prevMetrics }) {
  const closeRate = Math.round((metrics.closed / metrics.created) * 100)
  const prevCloseRate = prevMetrics
    ? Math.round((prevMetrics.closed / prevMetrics.created) * 100)
    : null
  const queueDelta = metrics.created - metrics.closed

  return (
    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
      <KPI
        label="Created"
        value={metrics.created.toLocaleString()}
        sub="tickets this week"
        delta={<Delta current={metrics.created} prev={prevMetrics?.created} invert={true} />}
      />
      <KPI
        label="Closed"
        value={metrics.closed.toLocaleString()}
        sub={`${closeRate}% close rate`}
        delta={<Delta current={metrics.closed} prev={prevMetrics?.closed} />}
      />
      <KPI
        label="Open Queue"
        value={metrics.open_total.toLocaleString()}
        sub={`${queueDelta > 0 ? '+' : ''}${queueDelta} net this week`}
        delta={<Delta current={metrics.open_total} prev={prevMetrics?.open_total} invert={true} />}
      />
      <KPI
        label="First Response"
        value={fmtSeconds(metrics.frt_seconds)}
        sub="avg this week"
        delta={<Delta current={metrics.frt_seconds} prev={prevMetrics?.frt_seconds} invert={true} />}
      />
      <KPI
        label="Resolution"
        value={fmtSeconds(metrics.resolution_seconds)}
        sub="avg this week"
        delta={<Delta current={metrics.resolution_seconds} prev={prevMetrics?.resolution_seconds} invert={true} />}
      />
      <KPI
        label="Zero-Touch"
        value={`${metrics.zero_touch_rate}%`}
        sub="fully automated"
        delta={<Delta current={metrics.zero_touch_rate} prev={prevMetrics?.zero_touch_rate} />}
      />
    </div>
  )
}
