'use client'

import { useState, useEffect, useRef } from 'react'

const AVALIACOES = [
  { autor: 'Fabio Lopes',               texto: 'Melhor pet shop da região! Atendimento diferenciado, profissionais que realmente entendem de pets e ótimos preços. Sou cliente fiel!' },
  { autor: 'Valter Luis · Local Guide', texto: 'Pessoal muito atencioso, bons produtos e preços acessíveis. Faz entregas. Atendimento show de bola!' },
  { autor: 'Cliente Google Maps',       texto: 'Boa variedade de ração e alimentação, acessórios, para cães, gatos e aves.' },
  { autor: 'Cliente Google Maps',       texto: 'Muito atenciosos, entrega rápida, preços e produtos ótimos.' },
  { autor: 'Cliente Google Maps',       texto: 'Pet shop clássica da região com muitas opções para seus animais de estimação.' },
]

function ReviewCard({ av }: { av: { autor: string; texto: string } }) {
  return (
    <div className="review-card">
      <div className="review-stars">★★★★★</div>
      <p className="review-text">&ldquo;{av.texto}&rdquo;</p>
      <div className="review-author">{av.autor}</div>
    </div>
  )
}

export default function AvaliacoesSection() {
  const [idx, setIdx] = useState(0)
  const trackRef = useRef<HTMLDivElement>(null)

  function mover(dir: number) {
    setIdx((prev) => (prev + dir + AVALIACOES.length) % AVALIACOES.length)
  }

  useEffect(() => {
    const track = trackRef.current
    if (!track) return
    const card = track.querySelector('.review-card') as HTMLElement | null
    if (!card) return
    track.style.transform = `translateX(-${idx * (card.offsetWidth + 19)}px)`
  }, [idx])

  return (
    <section id="avaliacoes" className="sec-cream">
      <div className="container">
        <p className="eyebrow fade-up">Clientes</p>
        <h2 className="sec-title fade-up" style={{ transitionDelay: '.06s' }}>
          O que dizem nossos clientes
        </h2>

        <div className="rating-header">
          <div className="rating-big">4,5</div>
          <div className="rating-right">
            <div className="rating-stars">★★★★½</div>
            <div className="rating-count">253 avaliações no Google Maps</div>
          </div>
        </div>

        <div className="carrossel">
          <div className="cards-track" ref={trackRef}>
            {AVALIACOES.map((av, i) => (
              <ReviewCard key={i} av={av} />
            ))}
          </div>
        </div>

        <div className="carrossel-btns">
          <button className="carr-btn" onClick={() => mover(-1)}>◀</button>
          <button className="carr-btn" onClick={() => mover(1)}>▶</button>
        </div>
      </div>
    </section>
  )
}
