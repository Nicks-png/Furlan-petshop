import { MapPin, Clock, Phone } from 'lucide-react'

function InstagramIcon() {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width={18} height={18} viewBox="0 0 24 24"
      fill="none" stroke="currentColor" strokeWidth={1.9} strokeLinecap="round" strokeLinejoin="round">
      <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
      <circle cx="12" cy="12" r="4" />
      <circle cx="17.5" cy="6.5" r="0.5" fill="currentColor" />
    </svg>
  )
}

export default function ContatoSection() {
  return (
    <section id="contato" className="sec-white">
      <div className="container">
        <p className="eyebrow fade-up">Localização</p>
        <h2 className="sec-title fade-up" style={{ transitionDelay: '.06s' }}>
          Venha nos visitar
        </h2>
        <div className="contato-grid">
          <div className="contato-info fade-up" style={{ transitionDelay: '.12s' }}>
            <div className="ci">
              <div className="ci-icon"><MapPin size={18} /></div>
              <div className="ci-body">
                <strong>Endereço</strong>
                <span>
                  Av. Mutinga, 2476 — Vila Pirituba
                  <br />
                  São Paulo - SP, 05110-000
                </span>
              </div>
            </div>
            <div className="ci">
              <div className="ci-icon"><Clock size={18} /></div>
              <div className="ci-body">
                <strong>Horário</strong>
                <span>Segunda a Sábado · 09h às 19h</span>
              </div>
            </div>
            <div className="ci">
              <div className="ci-icon"><Phone size={18} /></div>
              <div className="ci-body">
                <strong>Telefone</strong>
                <a href="tel:+551139060985">(11) 3906-0985</a>
              </div>
            </div>
            <div className="ci">
              <div className="ci-icon"><InstagramIcon /></div>
              <div className="ci-body">
                <strong>Instagram</strong>
                <a
                  href="https://instagram.com/furlanpetshop"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  @furlanpetshop
                </a>
              </div>
            </div>
            <a
              href="https://wa.me/5511390609851"
              target="_blank"
              rel="noopener noreferrer"
              className="btn-wa-big"
            >
              💬 Chamar no WhatsApp
            </a>
          </div>

          <div className="mapa-wrap fade-up" style={{ transitionDelay: '.20s' }}>
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3658.4!2d-46.748196!3d-23.487688!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x94cefeb4add91205%3A0xdf5315bfb42a0f4d!2sFurlan+Pet+Shop!5e0!3m2!1spt-BR!2sbr!4v1"
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            />
          </div>
        </div>
      </div>
    </section>
  )
}
