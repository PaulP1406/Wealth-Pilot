'use client'
import Link from 'next/link'
import { usePathname } from 'next/navigation'

export default function SideNav() {
  const pathname = usePathname()

  const Item = ({ href, label, emoji }: { href: string; label: string; emoji: string }) => {
    const active = pathname === href
    return (
      <Link
        href={href}
        aria-label={label}
        className={`flex items-center justify-center w-10 h-10 rounded-lg transition-colors border ${
          active ? 'bg-yellow-500/20 border-yellow-500 text-yellow-400' : 'bg-[#1f1f1f] border-[#3a3a3a] text-gray-300 hover:text-white hover:border-gray-500'
        }`}
        title={label}
      >
        <span className="text-lg" role="img" aria-hidden>
          {emoji}
        </span>
      </Link>
    )
  }

  return (
    <aside className="fixed left-4 top-24 z-40">
      <nav className="flex flex-col items-center gap-3 p-2 bg-[#2a2a2a] border border-gray-700 rounded-2xl shadow-lg">
        {/* 1) Logo */}
        <Item href="/" label="Home" emoji="🟡" />
        <div className="w-8 h-px bg-gray-700 my-1" />
        {/* 2) Dashboard */}
        <Item href="/dashboard" label="Dashboard" emoji="🏠" />
        {/* 3) Investment Simulator */}
        <Item href="/investment-simulator" label="Investment Simulator" emoji="📈" />
      </nav>
    </aside>
  )
}
