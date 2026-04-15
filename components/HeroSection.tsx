'use client'

import { useState, useEffect } from 'react'
import { Phone, ArrowRight, MapPin, Clock, Truck } from 'lucide-react'

const HERO_TITLES = ['cães e gatos', 'aves e peixes', 'toda a família', 'com carinho', 'todo pet']

const AVATARS = [
  { initials: 'RC', color: '#e8920a' },
  { initials: 'AM', color: '#bf7209' },
  { initials: 'FL', color: '#5c3d1e' },
  { initials: 'JB', color: '#9a7250' },
]

function StarIcon({ filled }: { filled: boolean }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={17}
      height={17}
      viewBox="0 0 24 24"
      stroke="#f59e0b"
      fill={filled ? '#f59e0b' : 'none'}
      strokeWidth={1.5}
    >
      <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
    </svg>
  )
}

export default function HeroSection() {
  const [titleIndex, setTitleIndex] = useState(0)

  useEffect(() => {
    const id = setTimeout(() => {
      setTitleIndex((n) => (n + 1) % HERO_TITLES.length)
    }, 2200)
    return () => clearTimeout(id)
  }, [titleIndex])

  return (
    <section id="hero">
      {/* Hero content */}
      <div className="hero-wrap container">
        <div className="hero-content">
          {/* Badge */}
          <div className="hero-badge fade-up">
            <span className="hero-badge-stars">★★★★½</span>
            <span>4,5 no Google · 253 avaliações</span>
          </div>

          {/* Heading */}
          <h1 className="hero-h1 fade-up" style={{ transitionDelay: '.08s' }}>
            <span className="hero-h1-static">O melhor para</span>
            <span className="hero-rotating-wrap">
              {HERO_TITLES.map((title, i) => (
                <span
                  key={i}
                  className="hero-rotating-word"
                  style={{
                    transform: `translateY(${
                      i === titleIndex ? '0' : i < titleIndex ? '-120%' : '120%'
                    })`,
                    opacity: i === titleIndex ? 1 : 0,
                  }}
                >
                  {title}
                </span>
              ))}
            </span>
          </h1>

          {/* Sub */}
          <p className="hero-sub fade-up" style={{ transitionDelay: '.16s' }}>
            Rações, acessórios e tudo que seu pet precisa — com atendimento carinhoso,
            preços honestos e entrega no bairro de Vila Pirituba.
          </p>

          {/* CTAs */}
          <div className="hero-actions fade-up" style={{ transitionDelay: '.24s' }}>
            <a href="tel:+551139060985" className="btn-ghost btn-lg">
              <Phone size={15} /> Ligar agora
            </a>
            <a
              href="https://wa.me/5511390609851"
              target="_blank"
              rel="noopener noreferrer"
              className="btn-primary btn-lg"
            >
              Falar no WhatsApp <ArrowRight size={15} />
            </a>
          </div>

          {/* Avatar group */}
          <div className="hero-reviews fade-up" style={{ transitionDelay: '.32s' }}>
            <div className="avatar-group">
              {AVATARS.map((av, i) => (
                <div
                  key={i}
                  className="av-circle"
                  style={{ ['--c' as string]: av.color }}
                >
                  {av.initials}
                </div>
              ))}
            </div>
            <div className="hero-reviews-meta">
              <div className="hero-review-stars">
                {[1, 2, 3, 4].map((i) => (
                  <StarIcon key={i} filled />
                ))}
                <StarIcon filled={false} />
              </div>
              <span className="hero-review-count">Adorado por +253 clientes no Google</span>
            </div>
          </div>
        </div>
      </div>

      {/* Info bar */}
      <div className="hero-bar">
        <div className="container hero-bar-inner">
          <div className="bar-item">
            <MapPin size={14} /> <span>Av. Mutinga, 2476</span>
          </div>
          <div className="bar-sep" />
          <div className="bar-item">
            <Clock size={14} /> <span>Seg–Sáb · 09h às 19h</span>
          </div>
          <div className="bar-sep" />
          <div className="bar-item">
            <Phone size={14} /> <a href="tel:+551139060985">(11) 3906-0985</a>
          </div>
          <div className="bar-sep" />
          <div className="bar-item">
            <Truck size={14} /> <span>Retirada e entrega</span>
          </div>
        </div>
      </div>
    </section>
  )
}
