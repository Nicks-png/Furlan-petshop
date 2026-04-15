# CLAUDE.md — Furlan Pet Shop

## Visão geral

Site institucional + loja para o **Furlan Pet Shop** (Av. Mutinga, 2476 - Vila Pirituba, SP).
Dados reais: 4,5★ (253 avaliações Google), tel (11) 3906-0985, entrega disponível.

## Stack

- **Backend**: Node.js + Express (`server.js`)
- **Frontend**: HTML/CSS/JS estático em `public/`
- **Dados**: catálogo de produtos em `src/data/produtos.js` (sem banco de dados)
- **Repositório**: Nicks-png/Furlan-petshop (branch `main`)

## Estrutura de arquivos

```
Furlan-petshop/
├── server.js                  # Express — serve estático + API /api/produtos
├── package.json               # dependências: express, dotenv
├── .env                       # PORT (não versionado)
├── .gitignore
├── public/
│   ├── index.html             # SPA de uma página (5 seções)
│   ├── css/
│   │   └── style.css          # Design system: paleta bege/amarelo/marrom
│   └── js/
│       └── main.js            # Filtro de produtos (fetch API) + carrossel
└── src/
    └── data/
        └── produtos.js        # 18 produtos em 5 categorias
```

## Seções da página

| # | Seção | O que contém |
|---|-------|-------------|
| 1 | **Hero** | Slogan, botão WhatsApp, botão "Ver Produtos", badges (rating, entrega) |
| 2 | **Sobre** | Texto institucional, endereço, horário, telefone |
| 3 | **Produtos** | Cards com filtro por categoria + botão "Pedir via WhatsApp" |
| 4 | **Avaliações** | Carrossel com 5 depoimentos reais do Google Maps, nota 4,5★ |
| 5 | **Contato** | Endereço, tel, Instagram, mapa Google embed, botão WhatsApp |

## Paleta de cores

| Variável     | Valor     | Uso                     |
|--------------|-----------|-------------------------|
| `--bg`       | `#fdf6ee` | Fundo principal (bege)  |
| `--surface`  | `#fff8f0` | Cards e superfícies     |
| `--accent`   | `#e8a020` | Amarelo/ocre — destaque |
| `--accent-d` | `#c47a15` | Marrom dourado — hover  |
| `--brown`    | `#5c3d1e` | Marrom escuro           |
| `--text`     | `#3b2a14` | Texto principal         |
| `--text2`    | `#7a5c3a` | Texto secundário        |

## API

| Método | Rota                           | Descrição               |
|--------|--------------------------------|-------------------------|
| GET    | `/api/produtos`                | Lista todos os produtos |
| GET    | `/api/produtos?categoria=caes` | Filtra por categoria    |

## Categorias de produtos

`caes` · `gatos` · `aves` · `peixes` · `acessorios` — 18 produtos no total.

## Dados reais do estabelecimento

- **Nome**: Furlan Pet Shop
- **Endereço**: Av. Mutinga, 2476 — Vila Pirituba, São Paulo - SP, 05110-000
- **Telefone / WhatsApp**: (11) 3906-0985 → `wa.me/5511390609851`
- **Instagram**: @furlanpetshop (confirmar URL exata com o cliente)
- **Horário**: Segunda a Sábado · 09h às 19h (confirmar com cliente)
- **Serviços**: Compras na loja · Retirada · Entrega
- **Avaliação Google**: 4,5★ · 253 avaliações

## Comandos

```bash
npm install            # instalar dependências
npm start              # rodar em localhost:3000
PORT=3004 npm start    # rodar em porta alternativa
```

## Status de implementação

- [x] Estrutura de arquivos criada
- [x] Backend Express com API `/api/produtos` (mantido em `server.js`)
- [x] 18 produtos cadastrados em 5 categorias
- [x] Frontend completo: Hero, Sobre, Produtos, Avaliações, Contato
- [x] Filtro de categorias dinâmico (fetch API)
- [x] Carrossel de avaliações com navegação
- [x] Botões WhatsApp funcionais com mensagem pré-preenchida
- [x] Mapa Google embed
- [x] Responsivo (mobile)
- [x] Push no GitHub (branch `main`)
- [x] **Migração para Next.js 16 + Tailwind v3 + shadcn**
- [x] **Componente DemoBackground (MeshGradient) integrado no Hero**
- [x] **API migrada para Next.js route handler** (`app/api/produtos/route.ts`)
- [x] **TypeScript strict — 0 erros de compilação**
- [x] **Build Next.js bem-sucedido**
- [ ] Confirmar URL do Instagram com o cliente
- [ ] Confirmar horários completos com o cliente
- [ ] Deploy no Render (atualizar configuração)

## Estrutura Next.js

```
app/
├── layout.tsx         # Fonts Fraunces + Nunito via next/font
├── page.tsx           # Composição das seções
├── globals.css        # Tailwind + todo o CSS customizado
└── api/produtos/
    └── route.ts       # API route handler (GET /api/produtos)
components/
├── Nav.tsx
├── HeroSection.tsx    # "use client" — DemoBackground (ssr:false) + palavras animadas
├── SobreSection.tsx
├── ServicosSection.tsx
├── ProdutosSection.tsx  # "use client" — carrinho + fetch
├── AvaliacoesSection.tsx # "use client" — carrossel
├── CtaSection.tsx
├── ContatoSection.tsx
├── Footer.tsx
└── ui/
    ├── demo.tsx       # DemoBackground (MeshGradient / DotOrbit)
    └── background-paper-shaders.tsx  # ShaderPlane + EnergyRing (R3F)
lib/utils.ts           # cn() helper (clsx + tailwind-merge)
src/data/produtos.ts   # Dados tipados (Produto interface)
```

## Comandos

```bash
npm run dev    # Next.js dev server (porta 3001 se 3000 ocupada)
npm run build  # Build de produção
npm run start  # Next.js em produção
npm run server # Express legado (node server.js)
```

## Deploy (Render — atualizado)

1. Conectar repositório `Nicks-png/Furlan-petshop`
2. Build: `npm install && npm run build`
3. Start: `npm run start`
4. Variável de ambiente: `PORT=10000`
4. Variável de ambiente: `PORT=10000`
