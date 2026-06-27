'use client'

import { useState } from 'react'

const FAQS = [
  {
    question: 'Preciso entender de tecnologia para contratar vocês?',
    answer:
      'Não. Nossa missão é exatamente fazer o processo técnico invisível para você. Começamos entendendo o seu negócio — o que você faz, como faz, onde perde tempo e o que quer melhorar. A parte técnica é nossa responsabilidade, não sua.',
  },
  {
    question: 'Quanto tempo leva para ter um sistema pronto?',
    answer:
      'Depende da complexidade. Automações simples ficam prontas em 1 a 2 semanas. Sistemas mais completos costumam levar de 4 a 10 semanas. O que garantimos é que você verá progresso a cada semana — não vai esperar meses para ver algo funcionando.',
  },
  {
    question: 'Qual é o investimento mínimo?',
    answer:
      'Cada projeto é orçado individualmente, porque projetos diferentes têm escopos diferentes. O diagnóstico inicial é gratuito — nele você entende o que precisa, estimamos o custo e você decide sem compromisso. Não existe surpresa de valor.',
  },
  {
    question: 'E depois que o sistema está pronto, e o suporte?',
    answer:
      'Todo projeto inclui um período de garantia pós-entrega. Também oferecemos planos de manutenção e evolução contínua para quem quer um parceiro de longo prazo — não só uma entrega pontual.',
  },
  {
    question: 'Vocês atendem empresas de que segmentos?',
    answer:
      'Atendemos empresas de varejo, logística, serviços, saúde, educação, alimentação, entre outros. O que importa não é o segmento — é ter um processo que pode ser melhorado com tecnologia. Se você tem esse problema, podemos ajudar.',
  },
  {
    question: 'Meus dados e os dados dos meus clientes ficam seguros?',
    answer:
      'Sim. Seguimos boas práticas de segurança em todos os projetos: dados criptografados, backups automáticos, controle de acesso por perfil de usuário e conformidade com a LGPD. Segurança não é opcional — está embutida desde o início.',
  },
]

export default function FAQ() {
  const [open, setOpen] = useState<number | null>(null)

  return (
    <section
      id="faq"
      className="py-28 md:py-40"
      style={{ background: 'var(--bg-void)', borderTop: '1px solid var(--line)' }}
    >
      <div className="max-w-3xl mx-auto px-6 md:px-8">

        {/* Header */}
        <div className="reveal mb-14">
          <p className="font-mono text-xs tracking-[0.2em] uppercase mb-4" style={{ color: 'var(--accent)' }}>
            Dúvidas frequentes
          </p>
          <h2
            className="font-display font-500 tracking-tight leading-tight"
            style={{ fontSize: 'clamp(1.75rem, 4vw, 3rem)', color: 'var(--text-primary)' }}
          >
            Perguntas que todo cliente faz antes de começar.
          </h2>
        </div>

        {/* Accordion */}
        <div className="reveal flex flex-col">
          {FAQS.map((faq, i) => (
            <div
              key={i}
              className="transition-colors duration-150"
              style={{
                borderBottom: '1px solid var(--line)',
                background: open === i ? 'rgba(255,102,0,0.03)' : 'transparent',
                borderRadius: open === i ? '0' : '0',
              }}
            >
              <button
                className="w-full flex items-center justify-between gap-6 py-6 px-1 text-left group"
                onClick={() => setOpen(open === i ? null : i)}
                aria-expanded={open === i}
              >
                <span
                  className="font-display font-500 leading-snug transition-colors duration-150"
                  style={{
                    fontSize: 'clamp(0.9375rem, 1.5vw, 1.0625rem)',
                    color: open === i ? 'var(--text-primary)' : 'var(--text-secondary)',
                  }}
                >
                  {faq.question}
                </span>

                {/* Toggle button */}
                <span
                  className="shrink-0 w-8 h-8 rounded-full flex items-center justify-center transition-all duration-300 font-display text-base font-500"
                  style={{
                    background: open === i ? 'var(--accent)' : 'var(--bg-elevated)',
                    color: open === i ? '#fff' : 'var(--text-secondary)',
                    border: open === i ? '1px solid transparent' : '1px solid var(--line-bright)',
                    transform: open === i ? 'rotate(45deg)' : 'rotate(0deg)',
                  }}
                  aria-hidden="true"
                >
                  +
                </span>
              </button>

              <div
                className="overflow-hidden transition-all duration-300 ease-in-out"
                style={{
                  maxHeight: open === i ? '400px' : '0px',
                  opacity: open === i ? 1 : 0,
                }}
              >
                <p
                  className="text-base leading-relaxed pb-7 px-1 pr-16"
                  style={{ color: 'var(--text-secondary)', lineHeight: 1.75 }}
                >
                  {faq.answer}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* Bottom CTA */}
        <div className="reveal mt-14 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-5 p-7 rounded-2xl" style={{ background: 'var(--bg-surface)', border: '1px solid var(--line)' }}>
          <p className="text-sm leading-relaxed" style={{ color: 'var(--text-secondary)' }}>
            Ficou alguma dúvida que não está aqui? Fale diretamente com a equipe.
          </p>
          <a
            href="#contact"
            className="shrink-0 inline-flex px-6 py-3 rounded-full font-display font-medium text-sm border transition-all duration-200 hover:border-accent hover:text-accent active:scale-[0.97]"
            style={{ border: '1px solid var(--line-bright)', color: 'var(--text-primary)' }}
          >
            Falar com a equipe →
          </a>
        </div>
      </div>
    </section>
  )
}
