import { fmtSeconds } from '@/lib/utils'

export default function AgentTable({ agents }) {
  const maxClosed = Math.max(...agents.map(a => a.closed))

  return (
    <div className="overflow-x-auto">
      <table className="w-full text-sm">
        <thead>
          <tr className="text-xs text-gray-500 uppercase tracking-wide border-b border-white/5">
            <th className="text-left pb-3 pr-4 font-medium">Agent</th>
            <th className="text-right pb-3 px-3 font-medium">Closed</th>
            <th className="text-right pb-3 px-3 font-medium">Share</th>
            <th className="text-right pb-3 px-3 font-medium">Replied</th>
            <th className="text-right pb-3 px-3 font-medium">FRT</th>
            <th className="text-right pb-3 pl-3 font-medium">Avg RT</th>
          </tr>
        </thead>
        <tbody>
          {agents.map((agent, i) => {
            const isAI = agent.name.includes('AI')
            const barPct = Math.round((agent.closed / maxClosed) * 100)
            return (
              <tr key={agent.name} className="border-b border-white/5 last:border-0">
                <td className="py-3 pr-4">
                  <div className="flex items-center gap-2">
                    <div
                      className="w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold flex-shrink-0"
                      style={{
                        background: isAI ? 'rgba(139,92,246,0.2)' : 'rgba(233,30,140,0.15)',
                        color: isAI ? '#a78bfa' : '#E91E8C',
                      }}
                    >
                      {agent.name[0]}
                    </div>
                    <div>
                      <p className={`font-medium ${isAI ? 'text-gray-400' : 'text-white'}`}>
                        {agent.name}
                      </p>
                      <div className="w-20 h-1 rounded-full mt-1" style={{ background: 'rgba(255,255,255,0.08)' }}>
                        <div
                          className="h-1 rounded-full"
                          style={{
                            width: `${barPct}%`,
                            background: isAI ? '#7C3AED' : '#E91E8C',
                          }}
                        />
                      </div>
                    </div>
                  </div>
                </td>
                <td className="py-3 px-3 text-right font-bold text-white">{agent.closed}</td>
                <td className="py-3 px-3 text-right text-gray-400">{agent.share}%</td>
                <td className="py-3 px-3 text-right text-gray-400">{agent.replied}</td>
                <td className="py-3 px-3 text-right text-gray-400">{fmtSeconds(agent.frt_seconds)}</td>
                <td className="py-3 pl-3 text-right text-gray-400">{fmtSeconds(agent.avg_response_seconds)}</td>
              </tr>
            )
          })}
        </tbody>
      </table>
    </div>
  )
}
