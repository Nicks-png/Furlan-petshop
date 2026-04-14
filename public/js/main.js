'use strict'

const { useState, useEffect, useRef } = React

// ── Dados de avaliações ───────────────────────────────────────────────────────
const AVALIACOES = [
  { autor: 'Fabio Lopes', texto: 'Melhor pet shop da região! Atendimento diferenciado, profissionais que realmente entendem de pets e ótimos preços. Sou cliente fiel!' },
  { autor: 'Valter Luis · Local Guide', texto: 'Pessoal muito atencioso, bons produtos e preços acessíveis. Faz entregas. Atendimento show de bola!' },
  { autor: 'Cliente Google Maps', texto: 'Boa variedade de ração e alimentação, acessórios, para cães, gatos e aves.' },
  { autor: 'Cliente Google Maps', texto: 'Muito atenciosos, entrega rápida, preços e produtos ótimos.' },
  { autor: 'Cliente Google Maps', texto: 'Pet shop clássica da região com muitas opções para seus animais de estimação.' },
]

const CATEGORIAS = [
  { id: '', label: 'Todos' },
  { id: 'caes',       label: '🐕 Cães' },
  { id: 'gatos',      label: '🐱 Gatos' },
  { id: 'aves',       label: '🐦 Aves' },
  { id: 'peixes',     label: '🐟 Peixes' },
  { id: 'acessorios', label: '🛒 Acessórios' },
]

// ── Helpers ───────────────────────────────────────────────────────────────────
function pedirWhatsApp(nome, preco) {
  const msg = encodeURIComponent(`Olá! Tenho interesse no produto: *${nome}* (R$ ${preco})`)
  window.open(`https://wa.me/5511390609851?text=${msg}`, '_blank')
}

function formatPreco(preco) {
  return preco.toFixed(2).replace('.', ',')
}

// ── Componente: ProdutoCard ───────────────────────────────────────────────────
function ProdutoCard({ produto }) {
  return React.createElement('div', { className: 'produto-card' },
    React.createElement('div', { className: 'produto-emoji' }, produto.emoji),
    React.createElement('div', { className: 'produto-nome' }, produto.nome),
    React.createElement('div', { className: 'produto-desc' }, produto.descricao),
    React.createElement('div', { className: 'produto-preco' }, `R$ ${formatPreco(produto.preco)}`),
    React.createElement('button', {
      className: 'btn-comprar',
      onClick: () => pedirWhatsApp(produto.nome, formatPreco(produto.preco))
    }, 'Pedir via WhatsApp')
  )
}

// ── Componente: Loja ──────────────────────────────────────────────────────────
function Loja() {
  const [categoria, setCategoria] = useState('')
  const [produtos, setProdutos] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    setLoading(true)
    const url = categoria ? `/api/produtos?categoria=${categoria}` : '/api/produtos'
    fetch(url)
      .then(r => r.json())
      .then(data => { setProdutos(data); setLoading(false) })
  }, [categoria])

  return React.createElement('div', null,
    // Filtros
    React.createElement('div', { className: 'filtros' },
      CATEGORIAS.map(cat =>
        React.createElement('button', {
          key: cat.id,
          className: `filtro-btn${categoria === cat.id ? ' active' : ''}`,
          onClick: () => setCategoria(cat.id)
        }, cat.label)
      )
    ),
    // Grid
    loading
      ? React.createElement('p', { style: { textAlign: 'center', color: 'var(--text2)' } }, 'Carregando...')
      : React.createElement('div', { className: 'produtos-grid' },
          produtos.map(p => React.createElement(ProdutoCard, { key: p.id, produto: p }))
        )
  )
}

// ── Componente: ReviewCard ────────────────────────────────────────────────────
function ReviewCard({ avaliacao }) {
  return React.createElement('div', { className: 'review-card' },
    React.createElement('div', { className: 'review-stars' }, '★★★★★'),
    React.createElement('p', { className: 'review-text' }, `"${avaliacao.texto}"`),
    React.createElement('div', { className: 'review-author' }, avaliacao.autor)
  )
}

// ── Componente: Carrossel ─────────────────────────────────────────────────────
function Carrossel() {
  const [idx, setIdx] = useState(0)
  const trackRef = useRef(null)

  function mover(dir) {
    setIdx(prev => (prev + dir + AVALIACOES.length) % AVALIACOES.length)
  }

  useEffect(() => {
    const track = trackRef.current
    if (!track) return
    const card = track.querySelector('.review-card')
    if (!card) return
    const cardW = card.offsetWidth + 24
    track.style.transform = `translateX(-${idx * cardW}px)`
  }, [idx])

  return React.createElement('div', null,
    React.createElement('div', { className: 'carrossel' },
      React.createElement('div', { className: 'cards-track', ref: trackRef },
        AVALIACOES.map((av, i) =>
          React.createElement(ReviewCard, { key: i, avaliacao: av })
        )
      )
    ),
    React.createElement('div', { className: 'carrossel-btns' },
      React.createElement('button', { className: 'carr-btn', onClick: () => mover(-1) }, '◀'),
      React.createElement('button', { className: 'carr-btn', onClick: () => mover(1) }, '▶')
    )
  )
}

// ── Montar componentes nos containers do HTML ─────────────────────────────────
ReactDOM.createRoot(document.getElementById('react-loja')).render(React.createElement(Loja))
ReactDOM.createRoot(document.getElementById('react-carrossel')).render(React.createElement(Carrossel))
