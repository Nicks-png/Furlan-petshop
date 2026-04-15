'use client'

import { useEffect, useRef } from 'react'

export default function Nav() {
  const navRef = useRef<HTMLElement>(null)

  useEffect(() => {
    const onScroll = () => {
      if (!navRef.current) return
      // Começa a desaparecer aos 40px, some completamente aos 160px
      const opacity = Math.max(0, 1 - window.scrollY / 160)
      navRef.current.style.opacity = String(opacity)
      navRef.current.style.pointerEvents = opacity < 0.05 ? 'none' : 'auto'
    }
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <nav id="nav" ref={navRef}>
      <a href="#hero" className="nav-logo">
        <span className="logo-mark">FURLAN</span>
        <span className="logo-sub">Pet Shop</span>
      </a>
      <div className="nav-links">
        <a href="#sobre">Sobre</a>
        <a href="#servicos">Serviços</a>
        <a href="#produtos">Produtos</a>
        <a href="#avaliacoes">Avaliações</a>
        <a href="#contato">Contato</a>
      </div>
      <div className="nav-right">
        <a href="/admin.html" className="nav-admin">Painel</a>
        <a
          href="https://wa.me/5511390609851"
          target="_blank"
          rel="noopener noreferrer"
          className="nav-wa"
        >
          WhatsApp
        </a>
      </div>
    </nav>
  )
}
