# CLAUDE.md — Furlan Pet Shop

## Contexto
Site institucional + loja para o **Furlan Pet Shop** (Av. Mutinga, 2476 - Vila Pirituba, SP).
Dados reais: 4,5★ (253 avaliações), tel (11) 3906-0985, Instagram, entrega disponível.

## Decisões
- **Estilo**: Quente/aconchegante — bege, amarelo, marrom, sensação de loja local
- **Seções**: Produtos/Loja + Avaliações (+ Hero, Sobre, Contato)
- **Stack**: Node.js + Express (backend)
- **Repositório**: Nicks-png/Furlan-petshop

## Estrutura de arquivos

```
Furlan-petshop/
├── server.js              # Express — serve estático + rotas API
├── package.json
├── .env                   # PORT
├── public/
│   ├── index.html         # Página principal (SPA de uma página)
│   ├── css/
│   │   └── style.css      # Design system: paleta bege/amarelo/marrom
│   └── js/
│       └── main.js        # Filtro de produtos, carrossel avaliações
└── src/
    └── data/
        └── produtos.js    # Catálogo estático de produtos
```

## Seções da página (ordem)

1. **Hero** — Logo + nome, slogan, botão WhatsApp e botão "Ver Produtos"
2. **Sobre** — Breve texto sobre o pet shop + endereço + horários
3. **Produtos/Loja** — Cards com filtro por categoria (cães, gatos, aves, peixes, acessórios)
4. **Avaliações** — Carrossel com 5 depoimentos reais do Google Maps (4,5★ · 253)
5. **Contato** — Endereço, telefone, link Instagram, mapa Google embed, botão WhatsApp

## Paleta de cores

| Variável       | Valor     | Uso                        |
|----------------|-----------|----------------------------|
| `--bg`         | `#fdf6ee` | Fundo principal (bege)     |
| `--surface`    | `#fff8f0` | Cards e superfícies        |
| `--accent`     | `#e8a020` | Amarelo/ocre — destaque    |
| `--accent-d`   | `#c47a15` | Marrom dourado — hover     |
| `--brown`      | `#5c3d1e` | Marrom escuro              |
| `--text`       | `#3b2a14` | Texto principal            |
| `--text2`      | `#7a5c3a` | Texto secundário           |

## Dados reais

- **Nome**: Furlan Pet Shop
- **Endereço**: Av. Mutinga, 2476 - Vila Pirituba, São Paulo - SP, 05110-000
- **Telefone**: (11) 3906-0985
- **WhatsApp**: 11 3906-0985
- **Instagram**: instagram.com/furlanpetshop (confirmar URL)
- **Horário**: seg–sáb 09h–19h (confirmar dias completos)
- **Serviços**: Compras na loja · Retirada · Entrega

## API

| Método | Rota                          | Descrição               |
|--------|-------------------------------|-------------------------|
| GET    | `/api/produtos`               | Lista todos os produtos |
| GET    | `/api/produtos?categoria=caes`| Filtra por categoria    |

## Categorias de produtos

`caes` · `gatos` · `aves` · `peixes` · `acessorios`

## Avaliações (carrossel)

1. **Fabio Lopes** ⭐⭐⭐⭐⭐ — "Melhor pet shop da região! Atendimento diferenciado, profissionais que realmente entendem de pets e ótimos preços."
2. **Valter Luis** ⭐⭐⭐⭐⭐ — "Pessoal muito atencioso, bons produtos e preços acessíveis. Faz entregas. Atendimento show de bola!"
3. ⭐⭐⭐⭐⭐ — "Boa variedade de ração e alimentação, acessórios, para cães, gatos e aves."
4. ⭐⭐⭐⭐⭐ — "Muito atenciosos, entrega rápida, preços e produtos ótimos."
5. ⭐⭐⭐⭐⭐ — "Pet shop clássica da região com muitas opções para seus animais de estimação."

## Comandos

```bash
npm install      # instalar dependências
npm start        # rodar em localhost:3000
```

## Deploy

- Push em `master` → deploy automático (Render ou GitHub Pages)
- Variável de ambiente: `PORT=3000`
