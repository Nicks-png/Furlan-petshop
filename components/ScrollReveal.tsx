'use client'

import { useEffect } from 'react'

export default function ScrollReveal() {
  useEffect(() => {
    // Fade-up reveal
    const show = (el: Element) => { el.classList.add('visible'); obs.unobserve(el) }
    const obs = new IntersectionObserver(
      (entries) => entries.forEach((e) => { if (e.isIntersecting) show(e.target) }),
      { threshold: 0, rootMargin: '60px 0px 60px 0px' }
    )
    document.querySelectorAll('.fade-up').forEach((el) => obs.observe(el))
    requestAnimationFrame(() => requestAnimationFrame(() => {
      document.querySelectorAll('.fade-up:not(.visible)').forEach((el) => {
        if (el.getBoundingClientRect().top < window.innerHeight + 60) show(el)
      })
    }))

    // Ativa máscara de fade após o usuário passar pela seção #produtos
    const main = document.querySelector('main')
    const produtos = document.getElementById('produtos')
    if (!main || !produtos) return

    const maskObs = new IntersectionObserver(
      ([entry]) => {
        // Quando produtos sai completamente pelo topo, ativa o fade
        if (!entry.isIntersecting && entry.boundingClientRect.bottom < 0) {
          main.classList.add('fade-active')
        } else {
          main.classList.remove('fade-active')
        }
      },
      { threshold: 0 }
    )
    maskObs.observe(produtos)

    return () => { obs.disconnect(); maskObs.disconnect() }
  }, [])

  return null
}
