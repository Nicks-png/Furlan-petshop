'use strict'

const { useState, useEffect, useRef } = React

// ── AnimatedHero (adaptado de 21st.dev — spring simulado via cubic-bezier) ────
function AnimatedHero() {
  const titles = ['cães e gatos', 'aves e peixes', 'sua família', 'seu melhor amigo', 'todos os pets']
  const [current, setCurrent] = useState(0)

  useEffect(() => {
    const id = setTimeout(() => setCurrent(i => (i + 1) % titles.length), 2000)
    return () => clearTimeout(id)
  }, [current])

  return React.createElement('div', { className: 'animated-hero' },

    React.createElement('p', { className: 'hero-loc' }, 'Vila Pirituba · São Paulo'),

    React.createElement('div', { className: 'animated-hero-titles' },
      React.createElement('h1', { className: 'animated-hero-h1' }, 'O melhor para'),
      React.createElement('div', { className: 'animated-hero-rotating' },
        titles.map((title, i) => {
          let transform, opacity
          if (i === current)    { transform = 'translateY(0)';     opacity = 1 }
          else if (i < current) { transform = 'translateY(-120%)'; opacity = 0 }
          else                  { transform = 'translateY(120%)';  opacity = 0 }
          return React.createElement('span', { key: i, style: { transform, opacity } }, title)
        })
      )
    ),

    React.createElement('p', { className: 'animated-hero-p' },
      'Rações, acessórios e produtos para todos os animais. Atendimento presencial, retirada e entrega em Vila Pirituba.'
    ),

    React.createElement('div', { className: 'animated-hero-actions' },
      React.createElement('a', { href: 'https://wa.me/5511390609851', target: '_blank', className: 'btn-primary' }, '💬 Chamar no WhatsApp'),
      React.createElement('a', { href: '#produtos', className: 'btn-ghost' }, 'Ver produtos')
    )
  )
}

// ── Dados ─────────────────────────────────────────────────────────────────────
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
function formatPreco(preco) {
  return preco.toFixed(2).replace('.', ',')
}

// ── ProdutoCard ───────────────────────────────────────────────────────────────
function ProdutoCard({ produto, onAdicionar }) {
  const [added, setAdded] = useState(false)

  function handleAdicionar() {
    onAdicionar(produto)
    setAdded(true)
    setTimeout(() => setAdded(false), 1200)
  }

  return React.createElement('div', { className: 'produto-card' },
    React.createElement('div', { className: 'produto-emoji' }, produto.emoji),
    React.createElement('div', { className: 'produto-nome' }, produto.nome),
    React.createElement('div', { className: 'produto-desc' }, produto.descricao),
    React.createElement('div', { className: 'produto-preco' }, `R$ ${formatPreco(produto.preco)}`),
    React.createElement('button', {
      className: `btn-comprar${added ? ' btn-comprar--added' : ''}`,
      onClick: handleAdicionar,
    }, added ? '✓ Adicionado!' : '🛒 Adicionar ao carrinho')
  )
}

// ── Carrinho (painel lateral) ─────────────────────────────────────────────────
function Carrinho({ itens, onRemover, onAlterarQtd, onEnviar, aberto, onToggle }) {
  const total = itens.reduce((s, i) => s + i.preco * i.qtd, 0)
  const count = itens.reduce((s, i) => s + i.qtd, 0)

  return React.createElement(React.Fragment, null,

    // FAB — botão flutuante
    React.createElement('button', { className: 'cart-fab', onClick: onToggle },
      React.createElement('span', { className: 'cart-fab-icon' }, '🛒'),
      count > 0 && React.createElement('span', { className: 'cart-badge' }, count)
    ),

    // Overlay escuro
    React.createElement('div', {
      className: `cart-overlay${aberto ? ' cart-overlay--open' : ''}`,
      onClick: onToggle,
    }),

    // Painel
    React.createElement('div', { className: `cart-panel${aberto ? ' cart-panel--open' : ''}` },

      // Cabeçalho
      React.createElement('div', { className: 'cart-header' },
        React.createElement('span', { className: 'cart-title' }, '🛒 Meu Carrinho'),
        React.createElement('button', { className: 'cart-close', onClick: onToggle }, '✕')
      ),

      // Lista de itens
      React.createElement('div', { className: 'cart-body' },
        itens.length === 0
          ? React.createElement('div', { className: 'cart-empty' },
              React.createElement('span', { style: { fontSize: '3rem' } }, '🐾'),
              React.createElement('p', null, 'Seu carrinho está vazio.'),
              React.createElement('p', { style: { fontSize: '.85rem', color: 'var(--ink3)' } }, 'Adicione produtos da loja!')
            )
          : itens.map(item =>
              React.createElement('div', { key: item.id, className: 'cart-item' },
                React.createElement('span', { className: 'cart-item-emoji' }, item.emoji),
                React.createElement('div', { className: 'cart-item-info' },
                  React.createElement('div', { className: 'cart-item-nome' }, item.nome),
                  React.createElement('div', { className: 'cart-item-subtotal' },
                    `R$ ${formatPreco(item.preco * item.qtd)}`
                  )
                ),
                React.createElement('div', { className: 'cart-item-qty' },
                  React.createElement('button', { className: 'qty-btn', onClick: () => onAlterarQtd(item.id, -1) }, '−'),
                  React.createElement('span', { className: 'qty-num' }, item.qtd),
                  React.createElement('button', { className: 'qty-btn', onClick: () => onAlterarQtd(item.id, 1) }, '+')
                )
              )
            )
      ),

      // Rodapé com total e botão
      itens.length > 0 && React.createElement('div', { className: 'cart-footer' },
        React.createElement('div', { className: 'cart-total' },
          React.createElement('span', null, 'Total do pedido'),
          React.createElement('span', { className: 'cart-total-val' }, `R$ ${formatPreco(total)}`)
        ),
        React.createElement('button', { className: 'btn-enviar-carrinho', onClick: onEnviar },
          '💬 Enviar pedido via WhatsApp'
        )
      )
    )
  )
}

// ── Loja ──────────────────────────────────────────────────────────────────────
function Loja() {
  const [categoria, setCategoria] = useState('')
  const [produtos, setProdutos] = useState([])
  const [loading, setLoading] = useState(true)
  const [carrinho, setCarrinho] = useState([])
  const [carrinhoAberto, setCarrinhoAberto] = useState(false)

  useEffect(() => {
    setLoading(true)
    const url = categoria ? `/api/produtos?categoria=${categoria}` : '/api/produtos'
    fetch(url)
      .then(r => r.json())
      .then(data => { setProdutos(data); setLoading(false) })
  }, [categoria])

  function adicionarAoCarrinho(produto) {
    setCarrinho(prev => {
      const existe = prev.find(i => i.id === produto.id)
      if (existe) return prev.map(i => i.id === produto.id ? { ...i, qtd: i.qtd + 1 } : i)
      return [...prev, { ...produto, qtd: 1 }]
    })
  }

  function removerDoCarrinho(id) {
    setCarrinho(prev => prev.filter(i => i.id !== id))
  }

  function alterarQtd(id, delta) {
    setCarrinho(prev =>
      prev.map(i => i.id === id ? { ...i, qtd: i.qtd + delta } : i).filter(i => i.qtd > 0)
    )
  }

  function enviarCarrinho() {
    const linhas = carrinho.map(i =>
      `• ${i.nome} x${i.qtd} — R$ ${formatPreco(i.preco * i.qtd)}`
    )
    const total = carrinho.reduce((s, i) => s + i.preco * i.qtd, 0)
    const msg = [
      'Olá! Gostaria de fazer o seguinte pedido:',
      '',
      ...linhas,
      '',
      `*Total: R$ ${formatPreco(total)}*`,
    ].join('\n')
    window.open(`https://wa.me/5511390609851?text=${encodeURIComponent(msg)}`, '_blank')
  }

  return React.createElement('div', null,
    // Filtros
    React.createElement('div', { className: 'filtros' },
      CATEGORIAS.map(cat =>
        React.createElement('button', {
          key: cat.id,
          className: `filtro-btn${categoria === cat.id ? ' active' : ''}`,
          onClick: () => setCategoria(cat.id),
        }, cat.label)
      )
    ),
    // Grid de produtos
    loading
      ? React.createElement('p', { style: { textAlign: 'center', color: 'var(--ink3)', padding: '2rem' } }, 'Carregando...')
      : React.createElement('div', { className: 'produtos-grid' },
          produtos.map(p => React.createElement(ProdutoCard, { key: p.id, produto: p, onAdicionar: adicionarAoCarrinho }))
        ),
    // Carrinho flutuante
    React.createElement(Carrinho, {
      itens: carrinho,
      onRemover: removerDoCarrinho,
      onAlterarQtd: alterarQtd,
      onEnviar: enviarCarrinho,
      aberto: carrinhoAberto,
      onToggle: () => setCarrinhoAberto(o => !o),
    })
  )
}

// ── ReviewCard + Carrossel ────────────────────────────────────────────────────
function ReviewCard({ avaliacao }) {
  return React.createElement('div', { className: 'review-card' },
    React.createElement('div', { className: 'review-stars' }, '★★★★★'),
    React.createElement('p', { className: 'review-text' }, `"${avaliacao.texto}"`),
    React.createElement('div', { className: 'review-author' }, avaliacao.autor)
  )
}

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
    React.createElement('div', { className: 'rating-header' },
      React.createElement('div', { className: 'rating-big' }, '4,5'),
      React.createElement('div', { className: 'rating-right' },
        React.createElement('div', { className: 'rating-stars' }, '★★★★½'),
        React.createElement('div', { className: 'rating-count' }, '253 avaliações no Google Maps')
      )
    ),
    React.createElement('div', { className: 'carrossel' },
      React.createElement('div', { className: 'cards-track', ref: trackRef },
        AVALIACOES.map((av, i) => React.createElement(ReviewCard, { key: i, avaliacao: av }))
      )
    ),
    React.createElement('div', { className: 'carrossel-btns' },
      React.createElement('button', { className: 'carr-btn', onClick: () => mover(-1) }, '◀'),
      React.createElement('button', { className: 'carr-btn', onClick: () => mover(1) }, '▶')
    )
  )
}

// ── Scroll fade-in ────────────────────────────────────────────────────────────
;(function () {
  const observer = new IntersectionObserver(entries => {
    entries.forEach(e => {
      if (e.isIntersecting) {
        e.target.classList.add('visible')
        observer.unobserve(e.target)
      }
    })
  }, { threshold: 0.08, rootMargin: '0px 0px -40px 0px' })

  function init() {
    document.querySelectorAll('.fade-up').forEach(el => observer.observe(el))
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
