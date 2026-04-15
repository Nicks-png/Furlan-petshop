import { Scissors, Heart, Star, Droplets, ShoppingBag, Truck } from 'lucide-react'

const SERVICOS = [
  {
    icon: <Scissors size={24} />,
    title: 'Banho & Tosa',
    desc: 'Deixe seu pet limpo, cheiroso e bem cuidado com atendimento especializado.',
    delay: '.04s',
  },
  {
    icon: <Heart size={24} />,
    title: 'Rações para Cães',
    desc: 'Marcas premium e econômicas para todas as raças, tamanhos e idades.',
    delay: '.1s',
  },
  {
    icon: <Star size={24} />,
    title: 'Rações para Gatos',
    desc: 'Alimentação balanceada para seu felino: seca, úmida e petiscos.',
    delay: '.16s',
  },
  {
    icon: <Droplets size={24} />,
    title: 'Aves & Peixes',
    desc: 'Rações, sementes, aquários e acessórios para todos os tipos de pets.',
    delay: '.22s',
  },
  {
    icon: <ShoppingBag size={24} />,
    title: 'Acessórios & Brinquedos',
    desc: 'Coleiras, camas, transportadoras, brinquedos e muito mais.',
    delay: '.28s',
  },
  {
    icon: <Truck size={24} />,
    title: 'Entrega em Domicílio',
    desc: 'Compre pelo WhatsApp e receba no conforto da sua casa, sem sair do sofá.',
    delay: '.34s',
  },
]

export default function ServicosSection() {
  return (
    <section id="servicos" className="sec-white">
      <div className="container">
        <p className="eyebrow fade-up">O que oferecemos</p>
        <h2 className="sec-title fade-up" style={{ transitionDelay: '.06s' }}>
          Serviços e produtos para
          <br />
          todos os animais
        </h2>
        <p className="sec-sub fade-up" style={{ transitionDelay: '.12s' }}>
          Da ração ao acessório, temos tudo para o seu pet estar sempre bem
        </p>
        <div className="servicos-grid">
          {SERVICOS.map((s) => (
            <div key={s.title} className="servico-card fade-up" style={{ transitionDelay: s.delay }}>
              <div className="sc-icon">{s.icon}</div>
              <h3>{s.title}</h3>
              <p>{s.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
