'use client'

import { useState, useMemo, useEffect } from 'react'
import { Plus, Minus, X, ShoppingCart, CreditCard } from 'lucide-react'
import todosOsProdutos, { type Produto } from '@/src/data/produtos'

const CATEGORIAS = [
  { id: '',           label: 'Todos' },
  { id: 'caes',       label: 'Cães' },
  { id: 'gatos',      label: 'Gatos' },
  { id: 'aves',       label: 'Aves' },
  { id: 'peixes',     label: 'Peixes' },
  { id: 'acessorios', label: 'Acessórios' },
]

const CAT_LABEL: Record<string, string> = {
  caes: 'Cães', gatos: 'Gatos', aves: 'Aves',
  peixes: 'Peixes', acessorios: 'Acessórios',
}

function fmt(p: number) {
  return 'R$ ' + p.toFixed(2).replace('.', ',')
}

interface CartItem extends Produto { qtd: number }

function ProdutoCard({ produto, onAdd }: { produto: Produto; onAdd: (p: Produto) => void }) {
  const [added, setAdded] = useState(false)

  function handleClick() {
    onAdd(produto)
    setAdded(true)
    setTimeout(() => setAdded(false), 1000)
  }

  return (
    <div className="prod-card">
      <div className="prod-card-thumb">
        <span>{produto.emoji}</span>
      </div>
      <div className="prod-card-body">
        <div className="prod-card-badges">
          <span className="ci-cat-badge">{CAT_LABEL[produto.categoria] ?? produto.categoria}</span>
        </div>
        <p className="prod-card-name">{produto.nome}</p>
        <p className="prod-card-desc">{produto.descricao}</p>
        <div className="prod-card-footer">
          <span className="prod-card-price">{fmt(produto.preco)}</span>
          <button
            className={`prod-add-btn${added ? ' prod-add-btn--added' : ''}`}
            onClick={handleClick}
          >
            {added ? '✓ Adicionado' : <><Plus size={14} /> Adicionar</>}
          </button>
        </div>
      </div>
    </div>
  )
}

function FloatingCart({
  itens, onAlterarQtd, onRemover, onEnviar,
}: {
  itens: CartItem[]
  onAlterarQtd: (id: number, delta: number) => void
  onRemover: (id: number) => void
  onEnviar: () => void
}) {
  const [open, setOpen] = useState(false)
  const [bump, setBump] = useState(false)
  const [naLoja, setNaLoja] = useState(false)

  const total = itens.reduce((s, i) => s + i.preco * i.qtd, 0)
  const count = itens.reduce((s, i) => s + i.qtd, 0)

  // Detecta se o usuário está na seção de produtos
  useEffect(() => {
    const el = document.getElementById('produtos')
    if (!el) return
    const obs = new IntersectionObserver(
      ([entry]) => setNaLoja(entry.isIntersecting),
      { threshold: 0.05 }
    )
    obs.observe(el)
    return () => obs.disconnect()
  }, [])

  useEffect(() => {
    if (itens.length === 0) setOpen(false)
  }, [itens.length])

  // Bloqueia scroll do body quando o drawer está aberto (iOS-safe)
  useEffect(() => {
    if (open) {
      const scrollY = window.scrollY
      document.body.style.position = 'fixed'
      document.body.style.top = `-${scrollY}px`
      document.body.style.width = '100%'
      document.body.classList.add('fcart-open')
    } else {
      const top = document.body.style.top
      document.body.style.position = ''
      document.body.style.top = ''
      document.body.style.width = ''
      document.body.classList.remove('fcart-open')
      if (top) window.scrollTo(0, -parseInt(top))
    }
    return () => {
      document.body.style.position = ''
      document.body.style.top = ''
      document.body.style.width = ''
      document.body.classList.remove('fcart-open')
    }
  }, [open])

  useEffect(() => {
    if (count > 0) {
      setBump(true)
      const t = setTimeout(() => setBump(false), 400)
      return () => clearTimeout(t)
    }
  }, [count])

  function handleEnviar() {
    setOpen(false)
    onEnviar()
  }

  return (
    <>
      {/* Backdrop */}
      {open && (
        <div className="fcart-backdrop fcart-backdrop--visible" onClick={() => setOpen(false)} />
      )}

      {/* Drawer */}
      <div className={`fcart-drawer${open ? ' fcart-drawer--open' : ''}`} aria-hidden={!open}>
        <div className="fcart-drawer-header">
          <span className="fcart-drawer-title">Seu pedido</span>
          <button className="fcart-close-btn" onClick={() => setOpen(false)} aria-label="Fechar">
            <X size={15} />
          </button>
        </div>

        <div className="fcart-drawer-body">
          {itens.length === 0 ? (
            <div className="fcart-empty">
              <span>🐾</span>
              <p>Carrinho vazio</p>
            </div>
          ) : (
            itens.map((item, idx) => (
              <div
                key={item.id}
                className="fcart-item"
                style={{ animationDelay: `${idx * 0.04}s` }}
              >
                <span className="fcart-item-emoji">{item.emoji}</span>
                <span className="fcart-item-name">{item.nome}</span>
                <div className="fcart-qty-ctrl">
                  <button className="fcart-qty-btn" onClick={() => onAlterarQtd(item.id, -1)}>
                    <Minus size={12} />
                  </button>
                  <span className="fcart-qty-num">{item.qtd}</span>
                  <button className="fcart-qty-btn" onClick={() => onAlterarQtd(item.id, 1)}>
                    <Plus size={12} />
                  </button>
                </div>
                <span className="fcart-item-sub">{fmt(item.preco * item.qtd)}</span>
                <button className="fcart-remove-btn" onClick={() => onRemover(item.id)} aria-label="Remover">
                  <X size={13} />
                </button>
              </div>
            ))
          )}
        </div>

        {itens.length > 0 && (
          <div className="fcart-drawer-footer">
            <div className="fcart-total-row">
              <span>Total do pedido</span>
              <span className="fcart-total-val">{fmt(total)}</span>
            </div>
            <button className="fcart-checkout-btn" onClick={handleEnviar}>
              <CreditCard size={15} /> Finalizar pelo WhatsApp
            </button>
          </div>
        )}
      </div>

      {/* Barra fixa — visível na seção Loja quando há itens */}
      <div
        className={`fcart-mobile-bar${naLoja && count > 0 && !open ? ' fcart-mobile-bar--visible' : ''}`}
        onClick={() => setOpen(true)}
        role="button"
        aria-label={`Ver carrinho — ${count} item${count !== 1 ? 's' : ''}`}
      >
        <div className="fcart-mobile-bar-left">
          <ShoppingCart size={18} />
          <span className="fcart-mobile-bar-count">{count}</span>
          <span className="fcart-mobile-bar-label">Ver carrinho</span>
        </div>
        <span className="fcart-mobile-bar-total">{fmt(total)}</span>
      </div>

      {/* FAB — visível fora da seção Loja */}
      <button
        className={`fcart-fab${bump ? ' fcart-fab--bump' : ''}${naLoja ? ' fcart-fab--hidden' : ''}`}
        onClick={() => setOpen((v) => !v)}
        aria-label="Abrir carrinho"
        aria-expanded={open}
      >
        {open ? <X size={20} /> : <ShoppingCart size={20} />}
        {count > 0 && !open && <span className="fcart-fab-badge">{count}</span>}
      </button>
    </>
  )
}

function CartSidebar({
  itens, onAlterarQtd, onRemover, onEnviar,
}: {
  itens: CartItem[]
  onAlterarQtd: (id: number, delta: number) => void
  onRemover: (id: number) => void
  onEnviar: () => void
}) {
  const total = itens.reduce((s, i) => s + i.preco * i.qtd, 0)

  return (
    <>
      <div className="fcart-drawer-header">
        <span className="fcart-drawer-title">Seu pedido</span>
      </div>
      <div className="fcart-drawer-body">
        {itens.length === 0 ? (
          <div className="fcart-empty">
            <span>🐾</span>
            <p>Carrinho vazio</p>
          </div>
        ) : (
          itens.map((item) => (
            <div key={item.id} className="fcart-item">
              <span className="fcart-item-emoji">{item.emoji}</span>
              <span className="fcart-item-name">{item.nome}</span>
              <div className="fcart-qty-ctrl">
                <button className="fcart-qty-btn" onClick={() => onAlterarQtd(item.id, -1)}><Minus size={12} /></button>
                <span className="fcart-qty-num">{item.qtd}</span>
                <button className="fcart-qty-btn" onClick={() => onAlterarQtd(item.id, 1)}><Plus size={12} /></button>
              </div>
              <span className="fcart-item-sub">{fmt(item.preco * item.qtd)}</span>
              <button className="fcart-remove-btn" onClick={() => onRemover(item.id)} aria-label="Remover"><X size={13} /></button>
            </div>
          ))
        )}
      </div>
      {itens.length > 0 && (
        <div className="fcart-drawer-footer">
          <div className="fcart-total-row">
            <span>Total</span>
            <span className="fcart-total-val">{fmt(total)}</span>
          </div>
          <button className="fcart-checkout-btn" onClick={onEnviar}>
            <CreditCard size={15} /> Finalizar pelo WhatsApp
          </button>
        </div>
      )}
    </>
  )
}

export default function ProdutosSection() {
  const [categoria, setCategoria] = useState('')
  const [carrinho, setCarrinho]   = useState<CartItem[]>([])

  const produtos = useMemo(
    () => categoria ? todosOsProdutos.filter((p) => p.categoria === categoria) : todosOsProdutos,
    [categoria]
  )

  function adicionar(produto: Produto) {
    setCarrinho((prev) => {
      const ex = prev.find((i) => i.id === produto.id)
      if (ex) return prev.map((i) => i.id === produto.id ? { ...i, qtd: i.qtd + 1 } : i)
      return [...prev, { ...produto, qtd: 1 }]
    })
  }

  function remover(id: number) {
    setCarrinho((prev) => prev.filter((i) => i.id !== id))
  }

  function alterarQtd(id: number, delta: number) {
    setCarrinho((prev) =>
      prev.map((i) => i.id === id ? { ...i, qtd: i.qtd + delta } : i).filter((i) => i.qtd > 0)
    )
  }

  function enviar() {
    const linhas = carrinho.map((i) => `• ${i.nome} x${i.qtd} — ${fmt(i.preco * i.qtd)}`)
    const total  = carrinho.reduce((s, i) => s + i.preco * i.qtd, 0)
    const msg    = ['Olá! Gostaria de fazer o seguinte pedido:', '', ...linhas, '', `*Total: ${fmt(total)}*`].join('\n')
    window.open(`https://wa.me/5511390609851?text=${encodeURIComponent(msg)}`, '_blank')
  }

  return (
    <>
      <section id="produtos" className="sec-cream">
        <div className="container">
          <p className="eyebrow fade-up">Loja</p>
          <h2 className="sec-title fade-up" style={{ transitionDelay: '.06s' }}>
            Produtos para seu pet
          </h2>
          <p className="sec-sub fade-up" style={{ transitionDelay: '.12s' }}>
            Selecione os produtos, monte seu pedido e finalize pelo WhatsApp
          </p>

          <div className="filtros">
            {CATEGORIAS.map((cat) => (
              <button
                key={cat.id}
                className={`filtro-btn${categoria === cat.id ? ' active' : ''}`}
                onClick={() => setCategoria(cat.id)}
              >
                {cat.label}
              </button>
            ))}
          </div>

          <div className="shop-layout">
            {/* Grid de produtos */}
            <div className="shop-products-col">
              <div className="prod-grid">
                {produtos.map((p) => <ProdutoCard key={p.id} produto={p} onAdd={adicionar} />)}
              </div>
            </div>

            {/* Carrinho lateral — só no desktop */}
            <div className="shop-cart-col">
              <CartSidebar
                itens={carrinho}
                onAlterarQtd={alterarQtd}
                onRemover={remover}
                onEnviar={enviar}
              />
            </div>
          </div>
        </div>
      </section>

      <FloatingCart
        itens={carrinho}
        onAlterarQtd={alterarQtd}
        onRemover={remover}
        onEnviar={enviar}
      />
    </>
  )
}
