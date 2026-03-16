function Gauge({ value, label, color = '#E91E8C' }) {
  return (
    <div className="flex flex-col items-center gap-1">
      <div className="relative w-16 h-16">
        <svg viewBox="0 0 36 36" className="w-16 h-16 -rotate-90">
          <circle cx="18" cy="18" r="15.9" fill="none" stroke="rgba(255,255,255,0.07)" strokeWidth="3" />
          <circle
            cx="18" cy="18" r="15.9"
            fill="none"
            stroke={color}
            strokeWidth="3"
            strokeDasharray={`${value} 100`}
            strokeLinecap="round"
          />
        </svg>
        <div className="absolute inset-0 flex items-center justify-center">
          <span className="text-sm font-bold text-white">{value}%</span>
        </div>
      </div>
      <span className="text-xs text-gray-400 text-center leading-tight">{label}</span>
    </div>
  )
}

export default function AIAgentCard({ ai }) {
  return (
    <div>
      <div className="flex items-center justify-around py-2">
        <Gauge value={ai.involvement_rate} label="Involvement" color="#E91E8C" />
        <Gauge value={ai.success_rate} label="Auto-resolved" color="#22c55e" />
        <Gauge value={ai.handover_rate} label="Handed over" color="#f97316" />
      </div>
      <div className="mt-4 pt-4 border-t border-white/5">
        <div className="flex items-center justify-between text-sm">
          <span className="text-gray-400">Tickets fully resolved by AI</span>
          <span className="font-bold text-white">{ai.tickets_resolved}</span>
        </div>
        <p className="text-xs text-gray-600 mt-3 leading-relaxed">
          High handover rate ({ai.handover_rate}%) indicates most AI-touched conversations require human escalation.
          Adding knowledge base content for identified gaps should improve autonomous resolution.
        </p>
      </div>
    </div>
  )
}
