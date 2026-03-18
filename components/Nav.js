'use client'
import Link from 'next/link'

export default function Nav({ active }) {
  return (
    <nav style={{ background: '#16213E', borderBottom: '1px solid rgba(233,30,140,0.2)' }}>
      <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-2 h-2 rounded-full bg-pink-500 animate-pulse" />
          <span className="font-bold text-white text-lg tracking-tight">Bums &amp; Roses</span>
          <span className="text-gray-500 text-sm">/ Support</span>
        </div>
        <div className="flex items-center gap-1">
          <Link
            href="/"
            className={`px-4 py-1.5 rounded-lg text-sm font-medium transition-colors ${
              active === 'dashboard'
                ? 'bg-pink-500/20 text-pink-400'
                : 'text-gray-400 hover:text-white hover:bg-white/5'
            }`}
          >
            Dashboard
          </Link>
          <Link
            href="/monthly"
            className={`px-4 py-1.5 rounded-lg text-sm font-medium transition-colors ${
              active === 'monthly'
                ? 'bg-pink-500/20 text-pink-400'
                : 'text-gray-400 hover:text-white hover:bg-white/5'
            }`}
          >
            By Month
          </Link>
          <Link
            href="/reports"
            className={`px-4 py-1.5 rounded-lg text-sm font-medium transition-colors ${
              active === 'reports'
                ? 'bg-pink-500/20 text-pink-400'
                : 'text-gray-400 hover:text-white hover:bg-white/5'
            }`}
          >
            All Reports
          </Link>
        </div>
      </div>
    </nav>
  )
}
