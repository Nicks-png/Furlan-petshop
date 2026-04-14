'use strict'

const { useState, useEffect, useRef } = React

// ── Dados mock ────────────────────────────────────────────────────────────────
const PRODUTOS_PDV = [
  { id: 1,  emoji: '🐕', nome: 'Royal Canin Adulto 15kg', preco: 189.90, cat: 'caes' },
  { id: 2,  emoji: '🐕', nome: 'Pedigree Adulto 10kg',   preco: 89.90,  cat: 'caes' },
  { id: 3,  emoji: '🐕', nome: 'Osso Natural Grande',    preco: 18.90,  cat: 'caes' },
  { id: 4,  emoji: '🐕', nome: 'Coleira Couro M',        preco: 34.90,  cat: 'caes' },
  { id: 5,  emoji: '🐱', nome: 'Whiskas Adulto 3kg',     preco: 59.90,  cat: 'gatos' },
  { id: 6,  emoji: '🐱', nome: 'Ração Gourmet Frango',   preco: 44.90,  cat: 'gatos' },
  { id: 7,  emoji: '🐱', nome: 'Areia Higiênica 4kg',    preco: 29.90,  cat: 'gatos' },
  { id: 8,  emoji: '🐦', nome: 'Alpiste Selecionado 1kg',preco: 18.90,  cat: 'aves' },
  { id: 9,  emoji: '🐦', nome: 'Mistura p/ Calopsita',   preco: 22.90,  cat: 'aves' },
  { id: 10, emoji: '🐟', nome: 'Tetra Goldfish 100g',    preco: 22.90,  cat: 'peixes' },
  { id: 11, emoji: '🐟', nome: 'Ração Ciclídeos 200g',   preco: 31.90,  cat: 'peixes' },
  { id: 12, emoji: '🛁', nome: 'Shampoo Neutro 500ml',   preco: 27.90,  cat: 'acessorios' },
  { id: 13, emoji: '🛁', nome: 'Condicionador Pet 300ml',preco: 24.90,  cat: 'acessorios' },
  { id: 14, emoji: '🦴', nome: 'Snack Bifinho Frango',   preco: 12.90,  cat: 'caes' },
  { id: 15, emoji: '🧴', nome: 'Antipulgas Spray 200ml', preco: 38.90,  cat: 'acessorios' },
]

const PEDIDOS_MOCK = [
  { id: '#0042', cliente: 'Maria Souza',   itens: 'Royal Canin + Coleira', total: 224.80, forma: 'Pix',      status: 'concluido', hora: '14:32' },
  { id: '#0041', cliente: 'João Pereira',  itens: 'Whiskas 3kg x2',        total: 119.80, forma: 'Débito',   status: 'concluido', hora: '13:10' },
  { id: '#0040', cliente: 'Ana Lima',      itens: 'Areia + Ração Gourmet', total: 74.80,  forma: 'Dinheiro', status: 'pendente',  hora: '12:45' },
  { id: '#0039', cliente: 'Carlos Mota',   itens: 'Alpiste + Snack',       total: 31.80,  forma: 'Pix',      status: 'concluido', hora: '11:20' },
  { id: '#0038', cliente: 'Fernanda Costa',itens: 'Shampoo + Condicionador',total: 52.80, forma: 'Crédito',  status: 'cancelado', hora: '10:05' },
  { id: '#0037', cliente: 'Ricardo Alves', itens: 'Pedigree 10kg',         total: 89.90,  forma: 'Débito',   status: 'concluido', hora: '09:48' },
]

const CATS = [
  { id: '', label: 'Todos' },
  { id: 'caes', label: '🐕 Cães' },
  { id: 'gatos', label: '🐱 Gatos' },
  { id: 'aves', label: '🐦 Aves' },
  { id: 'peixes', label: '🐟 Peixes' },
  { id: 'acessorios', label: '🧴 Acessórios' },
]

// ── Helpers ───────────────────────────────────────────────────────────────────
function fmt(v) { return v.toFixed(2).replace('.', ',') }

function hoje() {
  return new Date().toLocaleDateString('pt-BR', { weekday: 'long', day: '2-digit', month: 'long' })
}

// ── Toast ─────────────────────────────────────────────────────────────────────
function useToast() {
  const [msg, setMsg] = useState('')
  const [show, setShow] = useState(false)
  const t = useRef(null)

  function fire(text) {
    setMsg(text)
    setShow(true)
    clearTimeout(t.current)
    t.current = setTimeout(() => setShow(false), 2200)
  }

  const el = React.createElement('div', { className: `toast${show ? ' show' : ''}` }, msg)
  return [fire, el]
}

// ── Dashboard ─────────────────────────────────────────────────────────────────
function Dashboard({ onNav }) {
  const totalHoje  = PEDIDOS_MOCK.filter(p => p.status !== 'cancelado').reduce((s, p) => s + p.total, 0)
  const concluidos = PEDIDOS_MOCK.filter(p => p.status === 'concluido').length
  const ticket     = totalHoje / concluidos

  const stats = [
    { label: 'Vendas hoje',   value: `R$ ${fmt(totalHoje)}`, sub: `↑ 12% vs ontem`, cls: 'up' },
    { label: 'Pedidos',       value: concluidos,              sub: `${PEDIDOS_MOCK.filter(p=>p.status==='pendente').length} pendente(s)`, cls: '' },
    { label: 'Ticket médio',  value: `R$ ${fmt(ticket)}`,     sub: 'por pedido', cls: '' },
    { label: 'Cancelamentos', value: PEDIDOS_MOCK.filter(p=>p.status==='cancelado').length, sub: 'hoje', cls: 'down' },
  ]

  return React.createElement('div', null,

    // Stat cards
    React.createElement('div', { className: 'stat-grid' },
      stats.map((s, i) =>
        React.createElement('div', { key: i, className: 'stat-card' },
          React.createElement('div', { className: 'stat-card-label' }, s.label),
          React.createElement('div', { className: 'stat-card-value' }, s.value),
          React.createElement('div', { className: `stat-card-sub ${s.cls}` }, s.sub)
        )
      )
    ),

    // Tabela de pedidos recentes
    React.createElement('div', { className: 'card' },
      React.createElement('div', { className: 'card-header' },
        React.createElement('span', { className: 'card-title' }, 'Pedidos de hoje'),
        React.createElement('span', {
          className: 'card-action',
          onClick: () => onNav('pdv')
        }, '+ Nova venda')
      ),
      React.createElement('table', null,
        React.createElement('thead', null,
          React.createElement('tr', null,
            ['Pedido', 'Cliente', 'Itens', 'Forma', 'Total', 'Status', 'Hora'].map(h =>
              React.createElement('th', { key: h }, h)
            )
          )
        ),
        React.createElement('tbody', null,
          PEDIDOS_MOCK.map(p =>
            React.createElement('tr', { key: p.id },
              React.createElement('td', null, React.createElement('strong', null, p.id)),
              React.createElement('td', null, p.cliente),
              React.createElement('td', null, p.itens),
              React.createElement('td', null, p.forma),
              React.createElement('td', null, React.createElement('strong', null, `R$ ${fmt(p.total)}`)),
              React.createElement('td', null,
                React.createElement('span', { className: `badge-status ${p.status}` },
                  p.status === 'concluido' ? '✓ Concluído' :
                  p.status === 'pendente'  ? '⏳ Pendente' : '✕ Cancelado'
                )
              ),
              React.createElement('td', null, p.hora)
            )
          )
        )
      )
    )
  )
}

// ── PDV ───────────────────────────────────────────────────────────────────────
function PDV() {
  const [busca, setBusca]     = useState('')
  const [cat, setCat]         = useState('')
  const [itens, setItens]     = useState([])
  const [pagamento, setPag]   = useState('Pix')
  const [fireToast, toastEl]  = useToast()

  const visíveis = PRODUTOS_PDV.filter(p => {
    const matchCat   = !cat || p.cat === cat
    const matchBusca = !busca || p.nome.toLowerCase().includes(busca.toLowerCase())
    return matchCat && matchBusca
  })

  function adicionar(prod) {
    setItens(prev => {
      const ex = prev.find(i => i.id === prod.id)
      if (ex) return prev.map(i => i.id === prod.id ? { ...i, qtd: i.qtd + 1 } : i)
      return [...prev, { ...prod, qtd: 1 }]
    })
  }

  function altQtd(id, d) {
    setItens(prev =>
      prev.map(i => i.id === id ? { ...i, qtd: i.qtd + d } : i).filter(i => i.qtd > 0)
    )
  }

  const subtotal = itens.reduce((s, i) => s + i.preco * i.qtd, 0)
  const desconto = 0
  const total    = subtotal - desconto

  function finalizar() {
    if (!itens.length) return
    fireToast(`✓ Venda de R$ ${fmt(total)} registrada!`)
    setItens([])
  }

  function enviarWpp() {
    if (!itens.length) return
    const linhas = itens.map(i => `• ${i.nome} x${i.qtd} — R$ ${fmt(i.preco * i.qtd)}`)
    const msg = ['Olá! Seu pedido Furlan Pet Shop:', '', ...linhas, '', `*Total: R$ ${fmt(total)}*`].join('\n')
    window.open(`https://wa.me/5511390609851?text=${encodeURIComponent(msg)}`, '_blank')
  }

  const PAGS = ['Dinheiro', 'Pix', 'Débito', 'Crédito']

  return React.createElement('div', { className: 'pdv-layout' },

    // Lado esquerdo — produtos
    React.createElement('div', { className: 'pdv-produtos' },
      React.createElement('div', { className: 'pdv-search' },
        React.createElement('input', {
          placeholder: 'Buscar produto...',
          value: busca,
          onChange: e => setBusca(e.target.value),
        })
      ),
      React.createElement('div', { className: 'pdv-cats' },
        CATS.map(c =>
          React.createElement('button', {
            key: c.id,
            className: `pdv-cat${cat === c.id ? ' active' : ''}`,
            onClick: () => setCat(c.id),
          }, c.label)
        )
      ),
      React.createElement('div', { className: 'pdv-grid' },
        visíveis.map(p =>
          React.createElement('div', {
            key: p.id,
            className: 'pdv-item',
            onClick: () => adicionar(p),
          },
            React.createElement('div', { className: 'pdv-item-emoji' }, p.emoji),
            React.createElement('div', { className: 'pdv-item-nome'  }, p.nome),
            React.createElement('div', { className: 'pdv-item-preco' }, `R$ ${fmt(p.preco)}`)
          )
        )
      )
    ),

    // Lado direito — carrinho
    React.createElement('div', { className: 'pdv-carrinho' },
      React.createElement('div', { className: 'pdv-carr-header' },
        React.createElement('span', null, `Venda atual · ${itens.reduce((s,i)=>s+i.qtd,0)} itens`),
        itens.length > 0 && React.createElement('span', {
          className: 'pdv-carr-clear',
          onClick: () => setItens([]),
        }, 'Limpar')
      ),

      React.createElement('div', { className: 'pdv-carr-items' },
        itens.length === 0
          ? React.createElement('div', { className: 'pdv-carr-empty' },
              React.createElement('span', { style: { fontSize: '2.5rem' } }, '🛒'),
              React.createElement('span', null, 'Nenhum item adicionado')
            )
          : itens.map(i =>
              React.createElement('div', { key: i.id, className: 'pdv-carr-item' },
                React.createElement('span', { className: 'pdv-carr-emoji' }, i.emoji),
                React.createElement('div', { className: 'pdv-carr-info' },
                  React.createElement('div', { className: 'pdv-carr-nome' }, i.nome),
                  React.createElement('div', { className: 'pdv-carr-sub'  }, `R$ ${fmt(i.preco)} × ${i.qtd}`)
                ),
                React.createElement('div', { className: 'pdv-carr-qty' },
                  React.createElement('button', { className: 'pdv-qty-btn', onClick: () => altQtd(i.id, -1) }, '−'),
                  React.createElement('span',  { className: 'pdv-qty-num' }, i.qtd),
                  React.createElement('button', { className: 'pdv-qty-btn', onClick: () => altQtd(i.id, 1)  }, '+')
                )
              )
            )
      ),

      React.createElement('div', { className: 'pdv-carr-footer' },
        React.createElement('div', { className: 'pdv-subtotais' },
          React.createElement('div', { className: 'pdv-linha' },
            React.createElement('span', null, 'Subtotal'),
            React.createElement('span', null, `R$ ${fmt(subtotal)}`)
          ),
          React.createElement('div', { className: 'pdv-linha' },
            React.createElement('span', null, 'Desconto'),
            React.createElement('span', null, `R$ ${fmt(desconto)}`)
          ),
          React.createElement('div', { className: 'pdv-linha total' },
            React.createElement('span', null, 'Total'),
            React.createElement('span', null, `R$ ${fmt(total)}`)
          )
        ),

        React.createElement('div', { className: 'pdv-pagamento' },
          React.createElement('div', { className: 'pdv-pag-label' }, 'Forma de pagamento'),
          React.createElement('div', { className: 'pdv-pag-ops'   },
            PAGS.map(p =>
              React.createElement('button', {
                key: p,
                className: `pdv-pag-btn${pagamento === p ? ' active' : ''}`,
                onClick: () => setPag(p),
              }, p)
            )
          )
        ),

        React.createElement('button', {
          className: 'btn-finalizar',
          onClick: finalizar,
          disabled: itens.length === 0,
        }, itens.length ? `Finalizar · R$ ${fmt(total)}` : 'Adicione produtos'),

        React.createElement('button', {
          className: 'btn-wpp-venda',
          onClick: enviarWpp,
          disabled: itens.length === 0,
        }, '💬 Enviar pedido via WhatsApp')
      )
    ),

    toastEl
  )
}

// ── Estoque ───────────────────────────────────────────────────────────────────
const ESTOQUE_INICIAL = PRODUTOS_PDV.map((p, i) => ({
  ...p,
  qtd:    [12, 5, 20, 8, 3, 15, 7, 30, 22, 18, 11, 9, 14, 25, 6][i],
  minimo: [5,  5, 10, 5, 5,  5, 5, 10,  5,  5,  5, 5,  5, 10, 5][i],
  custo:  parseFloat((p.preco * 0.55).toFixed(2)),
}))

const CAT_LABELS = { caes: '🐕 Cães', gatos: '🐱 Gatos', aves: '🐦 Aves', peixes: '🐟 Peixes', acessorios: '🧴 Acessórios' }

function statusEstoque(qtd, minimo) {
  if (qtd === 0)        return { label: 'Sem estoque', cls: 'est-zerado' }
  if (qtd <= minimo)    return { label: 'Estoque baixo', cls: 'est-baixo' }
  return                       { label: 'Normal', cls: 'est-ok' }
}

function Estoque() {
  const [itens, setItens]   = useState(ESTOQUE_INICIAL)
  const [filtro, setFiltro] = useState('')
  const [cat, setCat]       = useState('')
  const [editId, setEditId] = useState(null)
  const [editVal, setEditVal] = useState('')
  const [fireToast, toastEl] = useToast()

  const visíveis = itens.filter(p => {
    const matchCat   = !cat || p.cat === cat
    const matchNome  = !filtro || p.nome.toLowerCase().includes(filtro.toLowerCase())
    return matchCat && matchNome
  })

  const semEstoque = itens.filter(p => p.qtd === 0).length
  const baixo      = itens.filter(p => p.qtd > 0 && p.qtd <= p.minimo).length
  const valorTotal = itens.reduce((s, p) => s + p.custo * p.qtd, 0)

  function salvarQtd(id) {
    const n = parseInt(editVal)
    if (isNaN(n) || n < 0) return
    setItens(prev => prev.map(p => p.id === id ? { ...p, qtd: n } : p))
    fireToast('✓ Estoque atualizado')
    setEditId(null)
  }

  function ajustar(id, delta) {
    setItens(prev => prev.map(p => p.id === id ? { ...p, qtd: Math.max(0, p.qtd + delta) } : p))
  }

  return React.createElement('div', null,

    // Cards de resumo
    React.createElement('div', { className: 'stat-grid', style: { gridTemplateColumns: 'repeat(3,1fr)' } },
      React.createElement('div', { className: 'stat-card' },
        React.createElement('div', { className: 'stat-card-label' }, 'Produtos cadastrados'),
        React.createElement('div', { className: 'stat-card-value' }, itens.length),
        React.createElement('div', { className: 'stat-card-sub' }, '5 categorias')
      ),
      React.createElement('div', { className: 'stat-card' },
        React.createElement('div', { className: 'stat-card-label' }, 'Alertas de estoque'),
        React.createElement('div', { className: 'stat-card-value' }, baixo + semEstoque),
        React.createElement('div', { className: `stat-card-sub ${baixo + semEstoque > 0 ? 'down' : 'up'}` },
          semEstoque > 0 ? `${semEstoque} zerado(s) · ${baixo} baixo(s)` : baixo > 0 ? `${baixo} abaixo do mínimo` : 'Tudo normal'
        )
      ),
      React.createElement('div', { className: 'stat-card' },
        React.createElement('div', { className: 'stat-card-label' }, 'Valor em estoque (custo)'),
        React.createElement('div', { className: 'stat-card-value' }, `R$ ${fmt(valorTotal)}`),
        React.createElement('div', { className: 'stat-card-sub' }, 'preço de custo estimado')
      ),
    ),

    // Filtros
    React.createElement('div', { className: 'est-toolbar' },
      React.createElement('input', {
        className: 'est-search',
        placeholder: '🔍  Buscar produto...',
        value: filtro,
        onChange: e => setFiltro(e.target.value),
      }),
      React.createElement('div', { className: 'pdv-cats', style: { margin: 0 } },
        [{ id: '', label: 'Todos' }, ...Object.entries(CAT_LABELS).map(([id, label]) => ({ id, label }))].map(c =>
          React.createElement('button', {
            key: c.id,
            className: `pdv-cat${cat === c.id ? ' active' : ''}`,
            onClick: () => setCat(c.id),
          }, c.label)
        )
      )
    ),

    // Tabela
    React.createElement('div', { className: 'card', style: { marginTop: '1rem' } },
      React.createElement('table', null,
        React.createElement('thead', null,
          React.createElement('tr', null,
            ['Produto', 'Categoria', 'Preço venda', 'Custo unit.', 'Mínimo', 'Qtd em estoque', 'Status', ''].map(h =>
              React.createElement('th', { key: h }, h)
            )
          )
        ),
        React.createElement('tbody', null,
          visíveis.map(p => {
            const st = statusEstoque(p.qtd, p.minimo)
            const editando = editId === p.id

            return React.createElement('tr', { key: p.id },
              // Produto
              React.createElement('td', null,
                React.createElement('div', { style: { display: 'flex', alignItems: 'center', gap: '.5rem' } },
                  React.createElement('span', { style: { fontSize: '1.3rem' } }, p.emoji),
                  React.createElement('strong', null, p.nome)
                )
              ),
              // Categoria
              React.createElement('td', null, CAT_LABELS[p.cat]),
              // Preço venda
              React.createElement('td', null, `R$ ${fmt(p.preco)}`),
              // Custo
              React.createElement('td', null, React.createElement('span', { style: { color: 'var(--ink3)' } }, `R$ ${fmt(p.custo)}`)),
              // Mínimo
              React.createElement('td', null, p.minimo),
              // Qtd — modo edição ou normal
              React.createElement('td', null,
                editando
                  ? React.createElement('div', { style: { display: 'flex', gap: '.4rem', alignItems: 'center' } },
                      React.createElement('input', {
                        type: 'number', min: 0,
                        className: 'est-input',
                        value: editVal,
                        onChange: e => setEditVal(e.target.value),
                        onKeyDown: e => { if (e.key === 'Enter') salvarQtd(p.id); if (e.key === 'Escape') setEditId(null) },
                        autoFocus: true,
                      }),
                      React.createElement('button', { className: 'est-btn-ok', onClick: () => salvarQtd(p.id) }, '✓'),
                      React.createElement('button', { className: 'est-btn-cancel', onClick: () => setEditId(null) }, '✕')
                    )
                  : React.createElement('div', { style: { display: 'flex', alignItems: 'center', gap: '.5rem' } },
                      React.createElement('button', { className: 'pdv-qty-btn', onClick: () => ajustar(p.id, -1) }, '−'),
                      React.createElement('strong', { style: { minWidth: '28px', textAlign: 'center', fontSize: '.95rem' } }, p.qtd),
                      React.createElement('button', { className: 'pdv-qty-btn', onClick: () => ajustar(p.id, 1) }, '+')
                    )
              ),
              // Status
              React.createElement('td', null,
                React.createElement('span', { className: `badge-status ${st.cls}` }, st.label)
              ),
              // Ação
              React.createElement('td', null,
                React.createElement('button', {
                  className: 'est-btn-edit',
                  onClick: () => { setEditId(p.id); setEditVal(String(p.qtd)) },
                }, 'Editar')
              )
            )
          })
        )
      )
    ),

    toastEl
  )
}

// ── App ───────────────────────────────────────────────────────────────────────
const VIEWS = [
  { id: 'dashboard', label: 'Dashboard', icon: '📊' },
  { id: 'pdv',       label: 'PDV',       icon: '🛒' },
  { id: 'pedidos',   label: 'Pedidos',   icon: '📋' },
  { id: 'estoque',   label: 'Estoque',   icon: '📦' },
]

const PAGE_TITLES = { dashboard: 'Dashboard', pdv: 'Ponto de Venda', pedidos: 'Pedidos', estoque: 'Estoque' }

function App() {
  const [view, setView] = useState('dashboard')

  return React.createElement('div', { className: 'admin-layout' },

    // Sidebar
    React.createElement('aside', { className: 'sidebar' },
      React.createElement('div', { className: 'sidebar-brand' },
        React.createElement('div', { className: 'sidebar-brand-name' }, '🐾 Furlan'),
        React.createElement('div', { className: 'sidebar-brand-sub'  }, 'Painel de Vendas')
      ),
      React.createElement('nav', { className: 'sidebar-nav' },
        VIEWS.map(v =>
          React.createElement('div', {
            key: v.id,
            className: `nav-item${view === v.id ? ' active' : ''}`,
            onClick: () => setView(v.id),
          },
            React.createElement('span', { className: 'nav-icon' }, v.icon),
            v.label
          )
        )
      ),
      React.createElement('div', { className: 'sidebar-footer' },
        React.createElement('a', { href: '/' }, '← Voltar ao site')
      )
    ),

    // Main
    React.createElement('div', { className: 'main' },
      React.createElement('div', { className: 'topbar' },
        React.createElement('span', { className: 'topbar-title' }, PAGE_TITLES[view]),
        React.createElement('div', { className: 'topbar-right' },
          React.createElement('span', { className: 'topbar-date' }, hoje()),
          React.createElement('div', { className: 'topbar-user' }, 'F')
        )
      ),
      React.createElement('div', { className: 'page' },
        view === 'dashboard' && React.createElement(Dashboard, { onNav: setView }),
        view === 'pdv'       && React.createElement(PDV),
        view === 'pedidos'   && React.createElement(Dashboard, { onNav: setView }),
        view === 'estoque'   && React.createElement(Estoque)
      )
    )
  )
}

ReactDOM.createRoot(document.getElementById('admin-root')).render(React.createElement(App))

