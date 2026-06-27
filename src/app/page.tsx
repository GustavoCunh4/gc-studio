import Header from '@/components/layout/Header'
import Footer from '@/components/layout/Footer'
import Hero from '@/components/sections/Hero'
import Problem from '@/components/sections/Problem'
import Services from '@/components/sections/Services'
import HowItWorks from '@/components/sections/HowItWorks'
import CaseStudies from '@/components/sections/CaseStudies'
import Results from '@/components/sections/Results'
import About from '@/components/sections/About'
import FAQ from '@/components/sections/FAQ'
import Contact from '@/components/sections/Contact'
import ScrollProgress from '@/components/ui/ScrollProgress'
import ClientProviders from '@/components/providers/ClientProviders'

export default function Home() {
  return (
    <ClientProviders>
      <ScrollProgress />
      <Header />
      <main>
        {/* 1. Captura atenção — proposta de valor */}
        <Hero />
        {/* 2. Diagnóstico — o cliente se reconhece nos problemas */}
        <Problem />
        {/* 3. Solução — o que fazemos para resolver */}
        <Services />
        {/* 4. Processo — como é trabalhar com a gente */}
        <HowItWorks />
        {/* 5. Prova — casos reais de resultado */}
        <CaseStudies />
        {/* 6. Social proof — depoimentos e números */}
        <Results />
        {/* 7. Credibilidade — quem somos e como trabalhamos */}
        <About />
        {/* 8. Objeções — perguntas e respostas */}
        <FAQ />
        {/* 9. Conversão — formulário de contato */}
        <Contact />
      </main>
      <Footer />
    </ClientProviders>
  )
}
