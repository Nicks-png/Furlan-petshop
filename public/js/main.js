'use strict'

// ── Produtos ──────────────────────────────────────────────────────────────────
const grid = document.getElementById('produtos-grid')
const filtros = document.querySelectorAll('.filtro-btn')

async function carregarProdutos(categoria = '') {
  const url = categoria ? `/api/produtos?categoria=${categoria}` : '/api/produtos'
  const res = await fetch(url)
  const produtos = await res.json()

  grid.innerHTML = produtos.map(p => `
    <div class="produto-card">
      <div class="produto-emoji">${p.emoji}</div>
      <div class="produto-nome">${p.nome}</div>
      <div class="produto-desc">${p.descricao}</div>
      <div class="produto-preco">R$ ${p.preco.toFixed(2).replace('.', ',')}</div>
      <button class="btn-comprar" onclick="pedirWhatsApp('${p.nome}', '${p.preco.toFixed(2)}')">
        Pedir via WhatsApp
      </button>
    </div>
  `).join('')
}

filtros.forEach(btn => {
  btn.addEventListener('click', () => {
    filtros.forEach(b => b.classList.remove('active'))
    btn.classList.add('active')
    carregarProdutos(btn.dataset.cat)
  })
})

function pedirWhatsApp(nome, preco) {
  const msg = encodeURIComponent(`Olá! Tenho interesse no produto: *${nome}* (R$ ${preco.replace('.', ',')})`)
  window.open(`https://wa.me/5511390609851?text=${msg}`, '_blank')
}

// ── Carrossel ─────────────────────────────────────────────────────────────────
const track = document.getElementById('cards-track')
const btnPrev = document.getElementById('carr-prev')
const btnNext = document.getElementById('carr-next')
let idx = 0

function moverCarrossel(dir) {
  const cards = track.querySelectorAll('.review-card')
  const total = cards.length
  idx = (idx + dir + total) % total
  const cardW = cards[0].offsetWidth + 24 // gap 1.5rem ≈ 24px
  track.style.transform = `translateX(-${idx * cardW}px)`
}

btnPrev.addEventListener('click', () => moverCarrossel(-1))
btnNext.addEventListener('click', () => moverCarrossel(1))

// ── Init ──────────────────────────────────────────────────────────────────────
carregarProdutos()
