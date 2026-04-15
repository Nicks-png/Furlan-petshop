'use strict'

const { useState, useEffect, useRef } = React

// ── Dados ─────────────────────────────────────────────────────────────────────
const AVALIACOES = [
  { autor: 'Fabio Lopes',               texto: 'Melhor pet shop da região! Atendimento diferenciado, profissionais que realmente entendem de pets e ótimos preços. Sou cliente fiel!' },
  { autor: 'Valter Luis · Local Guide', texto: 'Pessoal muito atencioso, bons produtos e preços acessíveis. Faz entregas. Atendimento show de bola!' },
  { autor: 'Cliente Google Maps',       texto: 'Boa variedade de ração e alimentação, acessórios, para cães, gatos e aves.' },
  { autor: 'Cliente Google Maps',       texto: 'Muito atenciosos, entrega rápida, preços e produtos ótimos.' },
  { autor: 'Cliente Google Maps',       texto: 'Pet shop clássica da região com muitas opções para seus animais de estimação.' },
]

const CATEGORIAS = [
  { id: '',           label: 'Todos' },
  { id: 'caes',       label: 'Cães' },
  { id: 'gatos',      label: 'Gatos' },
  { id: 'aves',       label: 'Aves' },
  { id: 'peixes',     label: 'Peixes' },
  { id: 'acessorios', label: 'Acessórios' },
]

const CAT_LABEL = {
  caes: 'Cães', gatos: 'Gatos', aves: 'Aves',
  peixes: 'Peixes', acessorios: 'Acessórios',
}

// ── Helpers ───────────────────────────────────────────────────────────────────
function fmtPreco(p) { return 'R$ ' + p.toFixed(2).replace('.', ',') }

// ── AnimatedHero — dados ──────────────────────────────────────────────────────
const HERO_TITLES = ['cães e gatos', 'aves e peixes', 'toda a família', 'com carinho', 'todo pet']

// ── Inline SVG icons (substitui lucide-react dentro do React) ─────────────────
const IcoPlus = () => React.createElement('svg', {
  xmlns: 'http://www.w3.org/2000/svg', width: 13, height: 13,
  viewBox: '0 0 24 24', fill: 'none', stroke: 'currentColor',
  strokeWidth: 2.5, strokeLinecap: 'round', strokeLinejoin: 'round',
},
  React.createElement('line', { x1: 12, y1: 5, x2: 12, y2: 19 }),
  React.createElement('line', { x1: 5, y1: 12, x2: 19, y2: 12 })
)

const IcoMinus = () => React.createElement('svg', {
  xmlns: 'http://www.w3.org/2000/svg', width: 13, height: 13,
  viewBox: '0 0 24 24', fill: 'none', stroke: 'currentColor',
  strokeWidth: 2.5, strokeLinecap: 'round', strokeLinejoin: 'round',
},
  React.createElement('line', { x1: 5, y1: 12, x2: 19, y2: 12 })
)

const IcoX = () => React.createElement('svg', {
  xmlns: 'http://www.w3.org/2000/svg', width: 11, height: 11,
  viewBox: '0 0 24 24', fill: 'none', stroke: 'currentColor',
  strokeWidth: 2.5, strokeLinecap: 'round', strokeLinejoin: 'round',
},
  React.createElement('line', { x1: 18, y1: 6, x2: 6, y2: 18 }),
  React.createElement('line', { x1: 6, y1: 6, x2: 18, y2: 18 })
)

const IcoPhone = () => React.createElement('svg', {
  xmlns: 'http://www.w3.org/2000/svg', width: 15, height: 15,
  viewBox: '0 0 24 24', fill: 'none', stroke: 'currentColor',
  strokeWidth: 2, strokeLinecap: 'round', strokeLinejoin: 'round',
},
  React.createElement('path', { d: 'M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.69 12 19.79 19.79 0 0 1 1.61 3.41 2 2 0 0 1 3.6 1h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L7.91 8.5a16 16 0 0 0 6 6l.86-.86a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z' })
)

const IcoArrow = () => React.createElement('svg', {
  xmlns: 'http://www.w3.org/2000/svg', width: 15, height: 15,
  viewBox: '0 0 24 24', fill: 'none', stroke: 'currentColor',
  strokeWidth: 2, strokeLinecap: 'round', strokeLinejoin: 'round',
},
  React.createElement('line', { x1: 5, y1: 12, x2: 19, y2: 12 }),
  React.createElement('polyline', { points: '12 5 19 12 12 19' })
)

const IcoCart = () => React.createElement('svg', {
  xmlns: 'http://www.w3.org/2000/svg', width: 15, height: 15,
  viewBox: '0 0 24 24', fill: 'none', stroke: 'currentColor',
  strokeWidth: 2, strokeLinecap: 'round', strokeLinejoin: 'round',
},
  React.createElement('circle', { cx: 9, cy: 21, r: 1 }),
  React.createElement('circle', { cx: 20, cy: 21, r: 1 }),
  React.createElement('path', { d: 'M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6' })
)

const IcoCredit = () => React.createElement('svg', {
  xmlns: 'http://www.w3.org/2000/svg', width: 15, height: 15,
  viewBox: '0 0 24 24', fill: 'none', stroke: 'currentColor',
  strokeWidth: 2, strokeLinecap: 'round', strokeLinejoin: 'round',
},
  React.createElement('rect', { x: 1, y: 4, width: 22, height: 16, rx: 2, ry: 2 }),
  React.createElement('line', { x1: 1, y1: 10, x2: 23, y2: 10 })
)

// ── AnimatedHero ──────────────────────────────────────────────────────────────
// Adaptado de: AnimatedHero (21st.dev)
// framer-motion spring → CSS transition cubic-bezier; shadcn Button → .btn-primary/.btn-ghost
function AnimatedHero() {
  const [titleNumber, setTitleNumber] = useState(0)

  useEffect(() => {
    const id = setTimeout(() => {
      setTitleNumber(n => (n + 1) % HERO_TITLES.length)
    }, 2200)
    return () => clearTimeout(id)
  }, [titleNumber])

  function star(filled, key) {
    return React.createElement('svg', {
      key, xmlns: 'http://www.w3.org/2000/svg', width: 17, height: 17,
      viewBox: '0 0 24 24',
      stroke: '#f59e0b', fill: filled ? '#f59e0b' : 'none',
      strokeWidth: 1.5,
    },
      React.createElement('polygon', { points: '12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2' })
    )
  }

  const AVATARS = [
    { initials: 'RC', color: '#e8920a' },
    { initials: 'AM', color: '#bf7209' },
    { initials: 'FL', color: '#5c3d1e' },
    { initials: 'JB', color: '#9a7250' },
  ]

  return React.createElement('div', { className: 'hero-content' },

    // Badge pill — Google rating
    React.createElement('div', { className: 'hero-badge fade-up' },
      React.createElement('span', { className: 'hero-badge-stars' }, '★★★★½'),
      React.createElement('span', null, '4,5 no Google · 253 avaliações')
    ),

    // Heading: static line + animated rotating word below
    React.createElement('h1', { className: 'hero-h1 fade-up', style: { transitionDelay: '.08s' } },
      React.createElement('span', { className: 'hero-h1-static' }, 'O melhor para'),
      React.createElement('span', { className: 'hero-rotating-wrap' },
        HERO_TITLES.map((title, i) =>
          React.createElement('span', {
            key: i,
            className: 'hero-rotating-word',
            style: {
              transform: `translateY(${i === titleNumber ? '0' : (i < titleNumber ? '-120%' : '120%')})`,
              opacity: i === titleNumber ? 1 : 0,
            },
          }, title)
        )
      )
    ),

    // Description
    React.createElement('p', { className: 'hero-sub fade-up', style: { transitionDelay: '.16s' } },
      'Rações, acessórios e tudo que seu pet precisa — com atendimento carinhoso, preços honestos e entrega no bairro de Vila Pirituba.'
    ),

    // CTAs
    React.createElement('div', { className: 'hero-actions fade-up', style: { transitionDelay: '.24s' } },
      React.createElement('a', { href: 'tel:+551139060985', className: 'btn-ghost btn-lg' },
        React.createElement(IcoPhone), ' Ligar agora'
      ),
      React.createElement('a', {
        href: 'https://wa.me/5511390609851', target: '_blank', className: 'btn-primary btn-lg',
      },
        'Falar no WhatsApp ', React.createElement(IcoArrow)
      )
    ),

    // Avatar group + review count
    React.createElement('div', { className: 'hero-reviews fade-up', style: { transitionDelay: '.32s' } },
      React.createElement('div', { className: 'avatar-group' },
        AVATARS.map((av, i) =>
          React.createElement('div', {
            key: i, className: 'av-circle',
            style: { '--c': av.color },
          }, av.initials)
        )
      ),
      React.createElement('div', { className: 'hero-reviews-meta' },
        React.createElement('div', { className: 'hero-review-stars' },
          [1,2,3,4].map(i => star(true, i)),
          star(false, 5)
        ),
        React.createElement('span', { className: 'hero-review-count' },
          'Adorado por +253 clientes no Google'
        )
      )
    )
  )
}

// ── InteractiveCheckout — ProdutoItem ─────────────────────────────────────────
// Adaptado de: InteractiveCheckout (21st.dev)
// Usa emoji como thumbnail em vez de <Image> (Next.js) — sem build step
function ProdutoItem({ produto, onAdicionar }) {
  const [added, setAdded] = useState(false)

  function handleClick() {
    onAdicionar(produto)
    setAdded(true)
    setTimeout(() => setAdded(false), 1000)
  }

  return React.createElement('div', { className: 'ci-product' },
    React.createElement('div', { className: 'ci-product-left' },
      // Thumbnail — emoji em container (equivalente ao <Image> do componente original)
      React.createElement('div', { className: 'ci-thumb' }, produto.emoji),
      React.createElement('div', { className: 'ci-product-info' },
        React.createElement('div', { className: 'ci-product-top' },
          React.createElement('span', { className: 'ci-product-name' }, produto.nome),
          React.createElement('span', { className: 'ci-cat-badge' },
            CAT_LABEL[produto.categoria] || produto.categoria
          )
        ),
        React.createElement('div', { className: 'ci-product-meta' },
          React.createElement('span', null, fmtPreco(produto.preco)),
          React.createElement('span', null, '·'),
          React.createElement('span', null, produto.descricao)
        )
      )
    ),
    React.createElement('button', {
      className: `ci-add-btn${added ? ' ci-add-btn--added' : ''}`,
      onClick: handleClick,
    },
      added
        ? React.createElement(React.Fragment, null, '✓ Ok!')
        : React.createElement(React.Fragment, null, React.createElement(IcoPlus), ' Add')
    )
  )
}

// ── InteractiveCheckout — CartInline ──────────────────────────────────────────
// Substitui o painel flutuante por painel inline sticky (lado direito)
// Equivalente ao painel de carrinho do InteractiveCheckout original
function CartInline({ itens, onAlterarQtd, onRemover, onEnviar }) {
  const total = itens.reduce((s, i) => s + i.preco * i.qtd, 0)
  const count = itens.reduce((s, i) => s + i.qtd, 0)

  return React.createElement('div', { className: 'ci-cart' },

    // Header
    React.createElement('div', { className: 'ci-cart-header' },
      React.createElement(IcoCart),
      React.createElement('span', { className: 'ci-cart-title' }, `Carrinho (${count})`)
    ),

    // Body — lista de itens
    React.createElement('div', { className: 'ci-cart-body' },
      itens.length === 0
        ? React.createElement('div', { className: 'ci-cart-empty' },
            React.createElement('span', { style: { fontSize: '2rem' } }, '🐾'),
            React.createElement('p', null, 'Carrinho vazio'),
            React.createElement('p', { style: { fontSize: '.76rem' } }, 'Adicione produtos ao lado')
          )
        : itens.map(item =>
            React.createElement('div', { key: item.id, className: 'ci-cart-item' },
              React.createElement('div', { className: 'ci-cart-item-body' },
                // Nome + remover
                React.createElement('div', { className: 'ci-cart-item-row' },
                  React.createElement('span', { className: 'ci-cart-item-name' }, item.nome),
                  React.createElement('button', {
                    className: 'ci-remove-btn',
                    onClick: () => onRemover(item.id),
                    title: 'Remover',
                  }, React.createElement(IcoX))
                ),
                // Qty + subtotal
                React.createElement('div', { className: 'ci-cart-qty-row' },
                  React.createElement('div', { className: 'ci-qty-ctrl' },
                    React.createElement('button', {
                      className: 'ci-qty-btn',
                      onClick: () => onAlterarQtd(item.id, -1),
                    }, React.createElement(IcoMinus)),
                    React.createElement('span', { className: 'ci-qty-num' }, item.qtd),
                    React.createElement('button', {
                      className: 'ci-qty-btn',
                      onClick: () => onAlterarQtd(item.id, 1),
                    }, React.createElement(IcoPlus))
                  ),
                  React.createElement('span', { className: 'ci-item-sub' },
                    fmtPreco(item.preco * item.qtd)
                  )
                )
              )
            )
          )
    ),

    // Footer — total + checkout
    itens.length > 0 && React.createElement('div', { className: 'ci-cart-footer' },
      React.createElement('div', { className: 'ci-cart-total' },
        React.createElement('span', null, 'Total'),
        React.createElement('span', { className: 'ci-total-val' }, fmtPreco(total))
      ),
      React.createElement('button', { className: 'ci-checkout-btn', onClick: onEnviar },
        React.createElement(IcoCredit),
        ' Enviar pedido via WhatsApp'
      )
    )
  )
}

// ── InteractiveCheckout — Loja ────────────────────────────────────────────────
function Loja() {
  const [categoria, setCategoria] = useState('')
  const [produtos, setProdutos]   = useState([])
  const [loading, setLoading]     = useState(true)
  const [carrinho, setCarrinho]   = useState([])

  useEffect(() => {
    setLoading(true)
    const url = categoria ? `/api/produtos?categoria=${categoria}` : '/api/produtos'
    fetch(url)
      .then(r => r.json())
      .then(data => { setProdutos(data); setLoading(false) })
  }, [categoria])

  function adicionar(produto) {
    setCarrinho(prev => {
      const ex = prev.find(i => i.id === produto.id)
      if (ex) return prev.map(i => i.id === produto.id ? { ...i, qtd: i.qtd + 1 } : i)
      return [...prev, { ...produto, qtd: 1 }]
    })
  }

  function remover(id) {
    setCarrinho(prev => prev.filter(i => i.id !== id))
  }

  function alterarQtd(id, delta) {
    setCarrinho(prev =>
      prev.map(i => i.id === id ? { ...i, qtd: i.qtd + delta } : i).filter(i => i.qtd > 0)
    )
  }

  function enviar() {
    const linhas = carrinho.map(i => `• ${i.nome} x${i.qtd} — ${fmtPreco(i.preco * i.qtd)}`)
    const total  = carrinho.reduce((s, i) => s + i.preco * i.qtd, 0)
    const msg    = [
      'Olá! Gostaria de fazer o seguinte pedido:',
      '',
      ...linhas,
      '',
      `*Total: ${fmtPreco(total)}*`,
    ].join('\n')
    window.open(`https://wa.me/5511390609851?text=${encodeURIComponent(msg)}`, '_blank')
  }

  return React.createElement('div', { className: 'ci-layout' },

    // ── Coluna esquerda: filtros + lista de produtos
    React.createElement('div', { className: 'ci-products-col' },
      React.createElement('div', { className: 'filtros' },
        CATEGORIAS.map(cat =>
          React.createElement('button', {
            key: cat.id,
            className: `filtro-btn${categoria === cat.id ? ' active' : ''}`,
            onClick: () => setCategoria(cat.id),
          }, cat.label)
        )
      ),
      loading
        ? React.createElement('p', {
            style: { textAlign: 'center', color: 'var(--text3)', padding: '2.5rem' }
          }, 'Carregando...')
        : React.createElement('div', { className: 'ci-product-list' },
            produtos.map(p =>
              React.createElement(ProdutoItem, { key: p.id, produto: p, onAdicionar: adicionar })
            )
          )
    ),

    // ── Coluna direita: carrinho inline sticky
    React.createElement(CartInline, {
      itens: carrinho,
      onAlterarQtd: alterarQtd,
      onRemover: remover,
      onEnviar: enviar,
    })
  )
}

// ── ReviewCard ────────────────────────────────────────────────────────────────
function ReviewCard({ av }) {
  return React.createElement('div', { className: 'review-card' },
    React.createElement('div', { className: 'review-stars' }, '★★★★★'),
    React.createElement('p',   { className: 'review-text' }, `"${av.texto}"`),
    React.createElement('div', { className: 'review-author' }, av.autor)
  )
}

// ── Carrossel ─────────────────────────────────────────────────────────────────
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
    track.style.transform = `translateX(-${idx * (card.offsetWidth + 19)}px)`
  }, [idx])

  return React.createElement('div', null,

    React.createElement('div', { className: 'rating-header' },
      React.createElement('div', { className: 'rating-big' }, '4,5'),
      React.createElement('div', { className: 'rating-right' },
        React.createElement('div', { className: 'rating-stars' }, '★★★★½'),
        React.createElement('div', { className: 'rating-count' }, '253 avaliações no Google Maps')
      )
    ),

    React.createElement('div', { className: 'carrossel' },
      React.createElement('div', { className: 'cards-track', ref: trackRef },
        AVALIACOES.map((av, i) => React.createElement(ReviewCard, { key: i, av }))
      )
    ),

    React.createElement('div', { className: 'carrossel-btns' },
      React.createElement('button', { className: 'carr-btn', onClick: () => mover(-1) }, '◀'),
      React.createElement('button', { className: 'carr-btn', onClick: () => mover(1) }, '▶')
    )
  )
}

// ── Scroll fade-up ────────────────────────────────────────────────────────────
;(function () {
  const obs = new IntersectionObserver(entries => {
    entries.forEach(e => {
      if (e.isIntersecting) {
        e.target.classList.add('visible')
        obs.unobserve(e.target)
      }
    })
  }, { threshold: 0.08, rootMargin: '0px 0px -40px 0px' })

  function init() {
    document.querySelectorAll('.fade-up').forEach(el => obs.observe(el))
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init)
  } else {
    init()
  }
})()

// ── Montar ────────────────────────────────────────────────────────────────────
ReactDOM.createRoot(document.getElementById('react-hero')).render(React.createElement(AnimatedHero))
ReactDOM.createRoot(document.getElementById('react-loja')).render(React.createElement(Loja))
ReactDOM.createRoot(document.getElementById('react-carrossel')).render(React.createElement(Carrossel))

// ── Ícones Lucide (substitui <i data-lucide="..."> por SVG inline) ────────────
if (typeof lucide !== 'undefined') lucide.createIcons()
