'use client'

import { ChevronDown } from 'lucide-react'
import { useState } from 'react'

const FAQS = [
  {
    question: 'Preciso entender de tecnologia para contratar vocês?',
    answer:
      'Não. Nossa missão é exatamente fazer o processo técnico invisível para você. Começamos entendendo o seu negócio - o que você faz, como faz, onde perde tempo e o que quer melhorar. A parte técnica é nossa responsabilidade, não sua.',
  },
  {
    question: 'Quanto tempo leva para ter um sistema pronto?',
    answer:
      'Depende da complexidade. Automações simples ficam prontas em 1 a 2 semanas. Sistemas mais completos costumam levar de 4 a 10 semanas. O que garantimos é que você verá progresso a cada semana - não vai esperar meses para ver algo funcionando.',
  },
  {
    question: 'Qual é o investimento mínimo?',
    answer:
      'Cada projeto é orçado individualmente, porque projetos diferentes têm escopos diferentes. O diagnóstico inicial é gratuito - nele você entende o que precisa, estimamos o custo e você decide sem compromisso. Não existe surpresa de valor.',
  },
  {
    question: 'E depois que o sistema está pronto, e o suporte?',
    answer:
      'Todo projeto inclui um período de garantia pós-entrega. Também oferecemos planos de manutenção e evolução contínua para quem quer um parceiro de longo prazo - não só uma entrega pontual.',
  },
  {
    question: 'Vocês atendem empresas de que segmentos?',
    answer:
      'Atendemos empresas de varejo, logística, serviços, saúde, educação, alimentação, entre outros. O que importa não é o segmento - é ter um processo que pode ser melhorado com tecnologia. Se você tem esse problema, podemos ajudar.',
  },
  {
    question: 'Meus dados e os dados dos meus clientes ficam seguros?',
    answer:
      'Sim. Seguimos boas práticas de segurança em todos os projetos: dados criptografados, backups automáticos, controle de acesso por perfil de usuário e conformidade com a LGPD. Segurança não é opcional - está embutida desde o início.',
  },
]

export default function FAQ() {
  const [open, setOpen] = useState<number | null>(0)

  return (
    <section
      id="faq"
      className="section-pad"
      style={{ background: 'var(--bg-void)', borderTop: '1px solid var(--line)' }}
    >
      <div className="container-shell max-w-4xl">
        <div className="reveal mb-12 max-w-3xl md:mb-14">
          <p className="section-kicker mb-4">Dúvidas frequentes</p>
          <h2 className="section-title">Perguntas que todo cliente faz antes de começar.</h2>
        </div>

        <div className="reveal surface-card overflow-hidden rounded-2xl">
          {FAQS.map((faq, index) => {
            const selected = open === index

            return (
              <div
                key={faq.question}
                style={{
                  borderBottom: index < FAQS.length - 1 ? '1px solid var(--line)' : 'none',
                  background: selected ? 'rgba(255,102,0,0.035)' : 'transparent',
                }}
              >
                <button
                  type="button"
                  className="flex w-full items-center justify-between gap-5 px-5 py-5 text-left transition-colors duration-200 md:px-7"
                  onClick={() => setOpen(selected ? null : index)}
                  aria-expanded={selected}
                >
                  <span
                    className="font-display font-500 leading-snug"
                    style={{
                      fontSize: 'clamp(0.98rem, 1.5vw, 1.1rem)',
                      color: selected ? 'var(--text-primary)' : 'var(--text-secondary)',
                    }}
                  >
                    {faq.question}
                  </span>

                  <span
                    className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full border transition-all duration-300"
                    style={{
                      background: selected ? 'var(--accent)' : 'var(--bg-elevated)',
                      color: selected ? 'var(--text-inverse)' : 'var(--text-secondary)',
                      borderColor: selected ? 'transparent' : 'var(--line-bright)',
                      transform: selected ? 'rotate(180deg)' : 'rotate(0deg)',
                    }}
                    aria-hidden="true"
                  >
                    <ChevronDown size={17} />
                  </span>
                </button>

                <div
                  className="overflow-hidden transition-all duration-300"
                  style={{
                    maxHeight: selected ? '320px' : '0px',
                    opacity: selected ? 1 : 0,
                  }}
                >
                  <p className="px-5 pb-6 pr-16 text-sm leading-relaxed md:px-7" style={{ color: 'var(--text-secondary)', lineHeight: 1.75 }}>
                    {faq.answer}
                  </p>
                </div>
              </div>
            )
          })}
        </div>

        <div
          className="reveal mt-10 flex flex-col items-start justify-between gap-5 rounded-2xl p-6 sm:flex-row sm:items-center"
          style={{ background: 'var(--bg-surface)', border: '1px solid var(--line)' }}
        >
          <p className="max-w-xl text-sm leading-relaxed" style={{ color: 'var(--text-secondary)' }}>
            Ficou alguma dúvida que não está aqui? Fale diretamente com a equipe.
          </p>
          <a href="#contact" className="btn-secondary shrink-0">
            Falar com a equipe
          </a>
        </div>
      </div>
    </section>
  )
}
