'use client'

import { ArrowRight, Check, MessageCircle } from 'lucide-react'
import { useState } from 'react'
import { useForm, useWatch } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { buildWhatsAppLink, buildDirectWhatsAppLink } from '@/lib/whatsapp'

const schema = z.object({
  name: z.string().min(2, 'Digite seu nome'),
  email: z.string().email('Email inválido'),
  whatsapp: z.string().optional(),
  company: z.string().optional(),
  message: z.string().min(10, 'Conte um pouco mais sobre o seu desafio'),
  budget: z.string().optional(),
})

type FormData = z.infer<typeof schema>

const BUDGETS = ['Não sei ainda', 'Até R$ 5k', 'R$ 5k-20k', 'R$ 20k-50k', 'Acima de R$ 50k']

export default function Contact() {
  const [success, setSuccess] = useState(false)

  const {
    register,
    handleSubmit,
    control,
    setValue,
    formState: { errors },
  } = useForm<FormData>({ resolver: zodResolver(schema) })

  const budget = useWatch({ control, name: 'budget' })

  const onSubmit = (data: FormData) => {
    window.open(
      buildWhatsAppLink({ name: data.name, email: data.email, company: data.company, message: data.message, budget: data.budget }),
      '_blank',
      'noopener,noreferrer'
    )
    setSuccess(true)
  }

  return (
    <section
      id="contact"
      className="ambient-band section-pad"
      style={{ background: 'var(--bg-void)', borderTop: '1px solid var(--line)' }}
    >
      <div className="container-shell">
        <div className="grid grid-cols-1 items-start gap-12 lg:grid-cols-[minmax(0,0.75fr)_minmax(420px,0.85fr)] lg:gap-20">
          <div className="reveal flex flex-col gap-8">
            <div>
              <p className="section-kicker mb-4">Contato</p>
              <h2 className="section-title mb-5">
                Conta o seu desafio - a gente descobre a solução juntos.
              </h2>
              <p className="section-copy">
                Sem compromisso. A primeira conversa é gratuita e serve para você entender
                se faz sentido - não para assinar nada.
              </p>
            </div>

            <a
              href={buildDirectWhatsAppLink()}
              target="_blank"
              rel="noopener noreferrer"
              className="surface-card interactive-lift group flex items-center gap-4 rounded-2xl p-5"
            >
              <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl" style={{ background: '#25D366', color: 'white' }}>
                <MessageCircle size={21} aria-hidden="true" />
              </span>
              <span className="min-w-0">
                <span className="block font-display text-sm font-500 transition-colors group-hover:text-accent" style={{ color: 'var(--text-primary)' }}>
                  Prefere falar agora pelo WhatsApp?
                </span>
                <span className="mt-1 block text-xs" style={{ color: 'var(--text-dim)' }}>
                  Resposta rápida - clique para abrir
                </span>
              </span>
            </a>

            <div className="grid gap-3 text-sm sm:grid-cols-3 lg:grid-cols-1">
              {[
                { k: 'Email', v: 'contato@gcstudio.com.br' },
                { k: 'Base', v: 'Salvador, BA - Brasil' },
                { k: 'Resposta', v: 'Em até 24 horas úteis' },
              ].map((item) => (
                <div key={item.k} className="rounded-xl border p-4" style={{ borderColor: 'var(--line)', background: 'rgba(255,255,255,0.02)' }}>
                  <p className="font-mono text-xs" style={{ color: 'var(--text-dim)' }}>
                    {item.k}
                  </p>
                  <p className="mt-1 break-words" style={{ color: 'var(--text-secondary)' }}>
                    {item.v}
                  </p>
                </div>
              ))}
            </div>
          </div>

          <div className="surface-card reveal rounded-2xl p-5 md:p-7" style={{ transitionDelay: '100ms' }}>
            {success ? (
              <div className="flex min-h-[480px] flex-col items-center justify-center gap-6 py-12 text-center">
                <div
                  className="flex h-16 w-16 items-center justify-center rounded-2xl"
                  style={{ background: 'rgba(255,102,0,0.1)', color: 'var(--accent)' }}
                >
                  <Check size={28} aria-hidden="true" />
                </div>
                <div>
                  <h3 className="mb-2 font-display text-xl font-500" style={{ color: 'var(--text-primary)' }}>
                    Mensagem recebida!
                  </h3>
                  <p className="max-w-sm text-sm leading-relaxed" style={{ color: 'var(--text-secondary)' }}>
                    O WhatsApp abriu em paralelo. Respondemos em até 24 horas úteis.
                  </p>
                </div>
              </div>
            ) : (
              <form onSubmit={handleSubmit(onSubmit)} noValidate className="flex flex-col gap-5">
                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                  <div>
                    <label className="mb-1.5 block text-sm" style={{ color: 'var(--text-secondary)' }}>
                      Nome *
                    </label>
                    <input className="field-control" placeholder="Seu nome" autoComplete="name" {...register('name')} />
                    {errors.name && <p className="mt-1 text-xs" style={{ color: '#f87171' }}>{errors.name.message}</p>}
                  </div>
                  <div>
                    <label className="mb-1.5 block text-sm" style={{ color: 'var(--text-secondary)' }}>
                      Email *
                    </label>
                    <input className="field-control" type="email" placeholder="seu@email.com" autoComplete="email" {...register('email')} />
                    {errors.email && <p className="mt-1 text-xs" style={{ color: '#f87171' }}>{errors.email.message}</p>}
                  </div>
                </div>

                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                  <div>
                    <label className="mb-1.5 block text-sm" style={{ color: 'var(--text-secondary)' }}>
                      WhatsApp
                    </label>
                    <input className="field-control" placeholder="(71) 9 0000-0000" autoComplete="tel" {...register('whatsapp')} />
                  </div>
                  <div>
                    <label className="mb-1.5 block text-sm" style={{ color: 'var(--text-secondary)' }}>
                      Empresa
                    </label>
                    <input className="field-control" placeholder="Opcional" autoComplete="organization" {...register('company')} />
                  </div>
                </div>

                <div>
                  <label className="mb-1.5 block text-sm" style={{ color: 'var(--text-secondary)' }}>
                    Qual é o seu desafio? *
                  </label>
                  <textarea
                    className="field-control min-h-[132px] resize-none"
                    placeholder="Descreva o que você precisa resolver, mesmo que não saiba ainda como..."
                    {...register('message')}
                  />
                  {errors.message && <p className="mt-1 text-xs" style={{ color: '#f87171' }}>{errors.message.message}</p>}
                </div>

                <div>
                  <label className="mb-2 block text-sm" style={{ color: 'var(--text-secondary)' }}>
                    Faixa de investimento <span style={{ color: 'var(--text-dim)' }}>(opcional)</span>
                  </label>
                  <div className="grid grid-cols-1 gap-2 sm:grid-cols-2">
                    {BUDGETS.map((item) => {
                      const selected = budget === item

                      return (
                        <button
                          key={item}
                          type="button"
                          onClick={() => setValue('budget', selected ? undefined : item)}
                          className="min-h-11 rounded-xl px-3 py-2 text-left font-mono text-xs transition-all duration-150"
                          style={{
                            border: `1px solid ${selected ? 'var(--accent)' : 'var(--line)'}`,
                            background: selected ? 'rgba(255,102,0,0.08)' : 'var(--bg-elevated)',
                            color: selected ? 'var(--text-primary)' : 'var(--text-dim)',
                          }}
                        >
                          {item}
                        </button>
                      )
                    })}
                  </div>
                </div>

                <button type="submit" className="btn-primary w-full">
                  Abrir WhatsApp com mensagem
                  <ArrowRight size={16} aria-hidden="true" />
                </button>

                <p className="text-center text-xs" style={{ color: 'var(--text-dim)' }}>
                  Sem spam. Sem compromisso. Só uma conversa.
                </p>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  )
}
