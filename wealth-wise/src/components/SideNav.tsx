'use client'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useEffect, useRef, useState } from 'react'

export default function SideNav() {
  const pathname = usePathname()
  const navRef = useRef<HTMLDivElement>(null)
  const [top, setTop] = useState<number>(() => {
    if (typeof window === 'undefined') return 96 // ~top-24
    const saved = window.localStorage.getItem('sidenav-top')
    return saved ? Number(saved) : 96
  })
  const startYRef = useRef(0)
  const startTopRef = useRef(0)
  const draggingRef = useRef(false)

  const clampTop = (value: number) => {
    const navEl = navRef.current
    const margin = 16 // space from edges
    const height = navEl?.offsetHeight ?? 200
    const max = Math.max(margin, (window.innerHeight - height - margin))
    return Math.min(Math.max(value, margin), max)
  }

  useEffect(() => {
    const onResize = () => setTop(t => clampTop(t))
    window.addEventListener('resize', onResize)
    return () => window.removeEventListener('resize', onResize)
  }, [])

  useEffect(() => {
    if (typeof window !== 'undefined') {
      window.localStorage.setItem('sidenav-top', String(top))
    }
  }, [top])

  const beginDrag = (clientY: number) => {
    draggingRef.current = true
    startYRef.current = clientY
    startTopRef.current = top
    document.body.style.userSelect = 'none'
  }

  const onMove = (clientY: number) => {
    if (!draggingRef.current) return
    const dy = clientY - startYRef.current
    setTop(clampTop(startTopRef.current + dy))
  }

  const endDrag = () => {
    draggingRef.current = false
    document.body.style.userSelect = ''
  }

  const handleMouseDown = (e: React.MouseEvent) => beginDrag(e.clientY)
  const handleTouchStart = (e: React.TouchEvent) => beginDrag(e.touches[0].clientY)

  useEffect(() => {
    const mm = (e: MouseEvent) => onMove(e.clientY)
    const tm = (e: TouchEvent) => onMove(e.touches[0]?.clientY ?? 0)
    const mu = () => endDrag()
    window.addEventListener('mousemove', mm)
    window.addEventListener('touchmove', tm, { passive: false })
    window.addEventListener('mouseup', mu)
    window.addEventListener('touchend', mu)
    return () => {
      window.removeEventListener('mousemove', mm)
      window.removeEventListener('touchmove', tm)
      window.removeEventListener('mouseup', mu)
      window.removeEventListener('touchend', mu)
    }
  }, [])

  const Item = ({ href, label, emoji }: { href: string; label: string; emoji: string }) => {
    const active = pathname === href
    return (
      <Link
        href={href}
        aria-label={label}
        className={`flex items-center justify-center w-12 h-12 rounded-full transition-colors border ${
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
    <aside className="fixed left-4 z-40" style={{ top }}>
      <nav
        ref={navRef}
        className="flex flex-col items-center gap-3 p-2 bg-[#2a2a2a] border border-gray-700 rounded-2xl shadow-lg cursor-grab active:cursor-grabbing select-none"
        onMouseDown={handleMouseDown}
        onTouchStart={handleTouchStart}
        aria-label="Side navigation"
      >
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

