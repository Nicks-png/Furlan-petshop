'use strict'

const { useState, useEffect, useRef } = React

// ── AuroraBackground (adaptado do 21st.dev — CSS puro, paleta quente) ────────
function AuroraBackground({ children, showRadialGradient = true }) {
  return React.createElement('div', { className: 'aurora-wrap' },
    React.createElement('div', {
      className: 'aurora-layer',
      style: showRadialGradient ? {} : { maskImage: 'none', WebkitMaskImage: 'none' },
    }),
    React.createElement('div', { className: 'aurora-content' }, children)
  )
}

// ── ContainerScroll (adaptado do 21st.dev — sem framer-motion, scroll nativo) ─
function ContainerScroll({ titleComponent, children }) {
  const containerRef = useRef(null)
  const cardRef      = useRef(null)
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768)

  useEffect(() => {
    const onResize = () => setIsMobile(window.innerWidth <= 768)
    window.addEventListener('resize', onResize)
    return () => window.removeEventListener('resize', onResize)
  }, [])

  useEffect(() => {
    const container = containerRef.current
    const card      = cardRef.current
    if (!container || !card) return

    function onScroll() {
      // progress: 0 quando page topo (scrollY=0), 1 quando container sai da tela
      const scrolled   = window.scrollY
      const offsetTop  = container.offsetTop
      const scrollable = container.offsetHeight
      const progress   = Math.min(1, Math.max(0, (scrolled - offsetTop * 0.1) / (scrollable * 0.6)))

      const rotate = 20 * (1 - progress)
      const scale  = isMobile
        ? 0.7  + progress * 0.2
        : 1.05 - progress * 0.05

      card.style.transform = `perspective(1000px) rotateX(${rotate}deg) scale(${scale})`
    }

    window.addEventListener('scroll', onScroll, { passive: true })
    onScroll()
    return () => window.removeEventListener('scroll', onScroll)
  }, [isMobile])

  const containerStyle = {
    display: 'flex', flexDirection: 'column', alignItems: 'center',
    justifyContent: 'flex-start', position: 'relative',
    padding: isMobile ? '2rem 1rem 3rem' : '4rem 2rem 5rem',
  }
  const innerStyle = {
    width: '100%', maxWidth: '1100px', position: 'relative',
  }
  const titleStyle = {
    maxWidth: '72rem', margin: '0 auto 2rem', textAlign: 'center',
    transition: 'transform .1s linear',
  }
  const cardStyle = {
    maxWidth: '72rem', margin: '2rem auto 0',
    height: isMobile ? '22rem' : '34rem', width: '100%',
    border: '4px solid #c4a265', padding: isMobile ? '0.5rem' : '1.5rem',
    background: 'linear-gradient(135deg, #3b2a14, #5c3d1e)',
    borderRadius: '30px',
    boxShadow: '0 0 #0000004d, 0 9px 20px #0000004a, 0 37px 37px #00000042, 0 84px 50px #00000026',
    transformOrigin: 'top center',
    transition: 'transform .05s linear',
    overflow: 'hidden',
  }
  const innerCardStyle = {
    height: '100%', width: '100%',
    overflow: 'hidden', borderRadius: '18px',
    background: 'var(--bg)',
  }

  return React.createElement('div', { style: containerStyle, ref: containerRef },
    React.createElement('div', { style: innerStyle },
      React.createElement('div', { style: titleStyle }, titleComponent),
      React.createElement('div', { style: cardStyle, ref: cardRef },
        React.createElement('div', { style: innerCardStyle }, children)
      )
    )
  )
}

// ── Preview do card (conteúdo dentro do scroll 3D) ────────────────────────────
function LojaPreview() {
  const PREVIEW = [
    { emoji: '🐕', nome: 'Royal Canin Adulto 15kg', preco: 'R$ 189,90', cat: 'Cães' },
    { emoji: '🐱', nome: 'Whiskas Adulto 3kg',      preco: 'R$ 59,90',  cat: 'Gatos' },
    { emoji: '🐦', nome: 'Alpiste Selecionado 500g', preco: 'R$ 12,90', cat: 'Aves' },
    { emoji: '🐟', nome: 'Tetra Goldfish 100g',      preco: 'R$ 22,90', cat: 'Peixes' },
    { emoji: '🛁', nome: 'Shampoo Neutro 500ml',     preco: 'R$ 27,90', cat: 'Acessórios' },
    { emoji: '🦴', nome: 'Osso Natural',             preco: 'R$ 18,90', cat: 'Cães' },
  ]
  const wrapStyle = {
    padding: '1.2rem', height: '100%',
    display: 'flex', flexDirection: 'column', gap: '1rem',
  }
  const headerStyle = {
    display: 'flex', alignItems: 'center', gap: '.5rem',
    fontSize: '.85rem', fontWeight: 700, color: 'var(--text2)',
    borderBottom: '1px solid var(--border)', paddingBottom: '.6rem',
  }
  const gridStyle = {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fill, minmax(140px, 1fr))',
    gap: '.7rem', flex: 1, overflow: 'hidden',
  }
  const cardStyle = {
    background: 'var(--surface)', borderRadius: 'var(--rs)',
    padding: '.8rem', textAlign: 'center',
    border: '1px solid var(--border)',
  }

  return React.createElement('div', { style: wrapStyle },
    React.createElement('div', { style: headerStyle },
      React.createElement('span', null, '🛒'),
      React.createElement('span', null, 'Nossos Produtos — Furlan Pet Shop')
    ),
    React.createElement('div', { style: gridStyle },
      PREVIEW.map((p, i) =>
        React.createElement('div', { key: i, style: cardStyle },
          React.createElement('div', { style: { fontSize: '2rem', marginBottom: '.3rem' } }, p.emoji),
          React.createElement('div', { style: { fontSize: '.78rem', fontWeight: 700, color: 'var(--text)', marginBottom: '.2rem' } }, p.nome),
          React.createElement('div', { style: { fontSize: '.7rem', color: 'var(--text2)', marginBottom: '.3rem' } }, p.cat),
          React.createElement('div', { style: { fontSize: '.85rem', fontWeight: 800, color: 'var(--accent-d)' } }, p.preco)
        )
      )
    )
  )
}

// ── HeroScroll (monta o ContainerScroll no Hero) ──────────────────────────────
function HeroScroll() {
  const titleComponent = React.createElement('div', null,
    React.createElement('div', {
      style: {
        display: 'inline-block', background: 'var(--accent)', color: '#fff',
        padding: '.3rem .9rem', borderRadius: '50px',
        fontSize: '.8rem', fontWeight: 700, letterSpacing: '.05em', marginBottom: '1.2rem',
      }
    }, '🐾 Vila Pirituba, São Paulo'),
    React.createElement('h1', {
      style: {
        fontSize: 'clamp(2rem, 5vw, 3.2rem)', fontWeight: 900,
        color: 'var(--brown)', lineHeight: 1.15, marginBottom: '.8rem',
      }
    }, 'Tudo que seu pet precisa, aqui perto!'),
    React.createElement('p', {
      style: { color: 'var(--text2)', fontSize: '1.1rem', maxWidth: '500px', margin: '0 auto 2rem' }
    }, 'Rações, acessórios e produtos para cães, gatos, aves e peixes. Retirada e entrega.'),
    React.createElement('div', { style: { display: 'flex', gap: '1rem', justifyContent: 'center', flexWrap: 'wrap' } },
      React.createElement('a', {
        href: 'https://wa.me/5511390609851', target: '_blank',
        style: {
          background: '#25D366', color: '#fff', padding: '.8rem 1.8rem',
          borderRadius: '50px', fontWeight: 700, fontSize: '1rem',
          textDecoration: 'none', display: 'inline-block',
        }
      }, '💬 Fale pelo WhatsApp'),
      React.createElement('a', {
        href: '#produtos',
        style: {
          background: 'transparent', color: 'var(--brown)',
          border: '2px solid var(--brown)', padding: '.75rem 1.8rem',
          borderRadius: '50px', fontWeight: 700, fontSize: '1rem',
          textDecoration: 'none', display: 'inline-block',
        }
      }, 'Ver Produtos')
    )
  )

  return React.createElement(AuroraBackground, null,
    React.createElement(ContainerScroll, { titleComponent },
      React.createElement(LojaPreview)
    )
  )
}

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
ReactDOM.createRoot(document.getElementById('react-hero')).render(React.createElement(HeroScroll))
ReactDOM.createRoot(document.getElementById('react-loja')).render(React.createElement(Loja))
ReactDOM.createRoot(document.getElementById('react-carrossel')).render(React.createElement(Carrossel))
