export interface Produto {
  id: number
  nome: string
  categoria: string
  preco: number
  descricao: string
  emoji: string
}

const produtos: Produto[] = [
  // Cães
  { id: 1,  nome: 'Ração Royal Canin Adulto 15kg',  categoria: 'caes',       preco: 189.90, descricao: 'Ração premium para cães adultos de raças médias.',    emoji: '🐕' },
  { id: 2,  nome: 'Ração Pedigree Filhote 3kg',      categoria: 'caes',       preco:  49.90, descricao: 'Nutrição completa para filhotes de cães.',             emoji: '🐶' },
  { id: 3,  nome: 'Petisco Ossinho Natural',          categoria: 'caes',       preco:  18.90, descricao: 'Osso natural para cães — bom para os dentes.',         emoji: '🦴' },
  { id: 4,  nome: 'Coleira Antipulgas',               categoria: 'caes',       preco:  34.90, descricao: 'Proteção contra pulgas e carrapatos por 8 meses.',    emoji: '🐕' },
  // Gatos
  { id: 5,  nome: 'Ração Whiskas Adulto 3kg',         categoria: 'gatos',      preco:  59.90, descricao: 'Ração completa para gatos adultos.',                  emoji: '🐱' },
  { id: 6,  nome: 'Areia Higiênica 4kg',              categoria: 'gatos',      preco:  24.90, descricao: 'Areia de alta absorção com neutralizador de odor.',   emoji: '🐈' },
  { id: 7,  nome: 'Brinquedo Ratinho com Catnip',     categoria: 'gatos',      preco:  14.90, descricao: 'Brinquedo interativo com catnip para gatos.',         emoji: '🐱' },
  { id: 8,  nome: 'Antipulgas Gatos Frontline',       categoria: 'gatos',      preco:  42.90, descricao: 'Proteção antipulgas para gatos acima de 2kg.',       emoji: '🐈' },
  // Aves
  { id: 9,  nome: 'Alpiste 500g',                     categoria: 'aves',       preco:  12.90, descricao: 'Alpiste selecionado para pássaros e canários.',       emoji: '🐦' },
  { id: 10, nome: 'Mistura para Calopsita 500g',       categoria: 'aves',       preco:  16.90, descricao: 'Mistura nutritiva especial para calopsitas.',         emoji: '🦜' },
  { id: 11, nome: 'Gaiola Pequena para Canário',       categoria: 'aves',       preco:  89.90, descricao: 'Gaiola espaçosa em arame niquelado.',                 emoji: '🐦' },
  // Peixes
  { id: 12, nome: 'Ração Tetra Goldfish 100g',         categoria: 'peixes',     preco:  22.90, descricao: 'Alimento em flocos para peixe dourado.',              emoji: '🐟' },
  { id: 13, nome: 'Condicionador de Água 120ml',       categoria: 'peixes',     preco:  18.90, descricao: 'Remove cloro e metais pesados da água.',              emoji: '🐠' },
  { id: 14, nome: 'Pedra de Oxigenação',               categoria: 'peixes',     preco:   8.90, descricao: 'Pedra porosa para oxigenação do aquário.',            emoji: '🐡' },
  // Acessórios
  { id: 15, nome: 'Comedouro Inox 500ml',              categoria: 'acessorios', preco:  19.90, descricao: 'Comedouro em aço inox antiferrujem.',                 emoji: '🥣' },
  { id: 16, nome: 'Cama Pet Pelúcia M',                categoria: 'acessorios', preco:  79.90, descricao: 'Cama macia em pelúcia para cães e gatos.',            emoji: '🛏️' },
  { id: 17, nome: 'Shampoo Neutro para Pets 500ml',    categoria: 'acessorios', preco:  27.90, descricao: 'Shampoo suave e neutro para banho em casa.',          emoji: '🛁' },
  { id: 18, nome: 'Guia Retratil 3m',                  categoria: 'acessorios', preco:  44.90, descricao: 'Guia retrátil com trava de segurança até 15kg.',      emoji: '🦮' },
]

export default produtos
