import Header from '@/components/layout/Header'
import Footer from '@/components/layout/Footer'
import Hero from '@/components/sections/Hero'
import Problem from '@/components/sections/Problem'
import Services from '@/components/sections/Services'
import HowItWorks from '@/components/sections/HowItWorks'
import Results from '@/components/sections/Results'
import CaseStudies from '@/components/sections/CaseStudies'
import About from '@/components/sections/About'
import TechStack from '@/components/sections/TechStack'
import Contact from '@/components/sections/Contact'
import ScrollProgress from '@/components/ui/ScrollProgress'
import ClientProviders from '@/components/providers/ClientProviders'

export default function Home() {
  return (
    <ClientProviders>
      <ScrollProgress />
      <Header />
      <main>
        <Hero />
        <Problem />
        <Services />
        <HowItWorks />
        <Results />
        <CaseStudies />
        <About />
        <TechStack />
        <Contact />
      </main>
      <Footer />
    </ClientProviders>
  )
}
