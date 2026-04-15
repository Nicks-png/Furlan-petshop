import { Award, Tag, Truck } from 'lucide-react'

export default function SobreSection() {
  return (
    <section id="sobre" className="sec-white">
      <div className="container">
        <div className="sobre-grid">
          <div className="sobre-left fade-up">
            <p className="eyebrow">Quem somos</p>
            <h2 className="sec-title">
              A pet shop de confiança
              <br />
              de Vila Pirituba
            </h2>
            <p className="body-text">
              Referência no bairro, o Furlan Pet Shop atende cães, gatos, aves, peixes e muito mais
              — com produtos de qualidade, preços honestos e gente que realmente entende de bicho.
            </p>
            <p className="body-text">
              Nossa missão é simples: você encontra tudo que seu pet precisa, sem complicação e com
              muito carinho.
            </p>
            <div className="feature-list">
              <div className="feature-row">
                <span className="feat-icon">
                  <Award size={18} />
                </span>
                <div>
                  <strong>Qualidade garantida</strong>
                  <span>Rações e acessórios das melhores marcas</span>
                </div>
              </div>
              <div className="feature-row">
                <span className="feat-icon">
                  <Tag size={18} />
                </span>
                <div>
                  <strong>Preços acessíveis</strong>
                  <span>Bons produtos para todos os bolsos</span>
                </div>
              </div>
              <div className="feature-row">
                <span className="feat-icon">
                  <Truck size={18} />
                </span>
                <div>
                  <strong>Entrega no bairro</strong>
                  <span>Peça pelo WhatsApp e receba em casa</span>
                </div>
              </div>
            </div>
          </div>

          <div className="sobre-right fade-up" style={{ transitionDelay: '.12s' }}>
            <div className="stats-grid">
              <div className="stat-card">
                <div className="stat-num">4,5★</div>
                <div className="stat-lbl">Nota no Google</div>
              </div>
              <div className="stat-card">
                <div className="stat-num">253</div>
                <div className="stat-lbl">Avaliações de clientes</div>
              </div>
              <div className="stat-card">
                <div className="stat-num">+5</div>
                <div className="stat-lbl">Anos no bairro</div>
              </div>
              <div className="stat-card">
                <div className="stat-num">5</div>
                <div className="stat-lbl">Tipos de animais</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
