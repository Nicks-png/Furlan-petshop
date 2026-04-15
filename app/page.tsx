import Nav from '@/components/Nav'
import ScrollReveal from '@/components/ScrollReveal'
import HeroSection from '@/components/HeroSection'
import SobreSection from '@/components/SobreSection'
import ServicosSection from '@/components/ServicosSection'
import ProdutosSection from '@/components/ProdutosSection'
import AvaliacoesSection from '@/components/AvaliacoesSection'
import CtaSection from '@/components/CtaSection'
import ContatoSection from '@/components/ContatoSection'
import Footer from '@/components/Footer'

export default function Home() {
  return (
    <>
      <Nav />
      <main>
        <HeroSection />
        <ServicosSection />
        <ProdutosSection />
        <SobreSection />
        <AvaliacoesSection />
        <CtaSection />
        <ContatoSection />
      </main>
      <Footer />
      <ScrollReveal />
    </>
  )
}
