'use client'

import { useState } from 'react'
import { useForm } from 'react-hook-form'
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

const BUDGETS = ['Não sei ainda', 'Até R$ 5k', 'R$ 5k–20k', 'R$ 20k–50k', 'Acima de R$ 50k']

const inputBase: React.CSSProperties = {
  background: 'var(--bg-elevated)',
  border: '1px solid var(--line)',
  color: 'var(--text-primary)',
  borderRadius: '10px',
  width: '100%',
  padding: '12px 16px',
  fontSize: '14px',
  outline: 'none',
  fontFamily: 'var(--font-body)',
}

export default function Contact() {
  const [submitting, setSubmitting] = useState(false)
  const [success, setSuccess] = useState(false)
  const [serverError, setServerError] = useState('')

  const {
    register,
    handleSubmit,
    watch,
    setValue,
    formState: { errors },
  } = useForm<FormData>({ resolver: zodResolver(schema) })

  const budget = watch('budget')

  const onSubmit = async (data: FormData) => {
    setSubmitting(true)
    setServerError('')
    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      })
      if (!res.ok) {
        const body = await res.json()
        setServerError(body.error ?? 'Erro ao enviar.')
        return
      }
      window.open(
        buildWhatsAppLink({ name: data.name, company: data.company, message: data.message, budget: data.budget }),
        '_blank',
        'noopener,noreferrer'
      )
      setSuccess(true)
    } catch {
      setServerError('Erro de conexão. Tente novamente.')
    } finally {
      setSubmitting(false)
    }
  }

  return (
    <section
      id="contact"
      className="py-28 md:py-40"
      style={{ background: 'var(--bg-void)', borderTop: '1px solid var(--line)' }}
    >
      <div className="max-w-6xl mx-auto px-6 md:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 items-start">

          {/* Left */}
          <div className="reveal flex flex-col gap-10">
            <div>
              <p className="font-mono text-xs tracking-[0.2em] uppercase mb-4" style={{ color: 'var(--accent)' }}>
                Contato
              </p>
              <h2
                className="font-display font-500 tracking-tight leading-tight mb-4"
                style={{ fontSize: 'clamp(1.75rem, 3.5vw, 3rem)', color: 'var(--text-primary)' }}
              >
                Conta o seu desafio — a gente descobre a solução juntos.
              </h2>
              <p className="text-base leading-relaxed" style={{ color: 'var(--text-secondary)' }}>
                Sem compromisso. A primeira conversa é gratuita e serve para você entender
                se faz sentido — não para assinar nada.
              </p>
            </div>

            {/* WhatsApp direct */}
            <a
              href={buildDirectWhatsAppLink()}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-4 p-5 rounded-2xl border transition-all duration-200 hover:border-accent group self-start"
              style={{ border: '1px solid var(--line)', background: 'var(--bg-surface)' }}
            >
              <span
                className="w-10 h-10 rounded-xl flex items-center justify-center shrink-0"
                style={{ background: '#25D366' }}
              >
                <svg width="18" height="18" viewBox="0 0 24 24" fill="white" aria-hidden="true">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z" />
                </svg>
              </span>
              <div>
                <p className="font-display font-500 text-sm group-hover:text-accent transition-colors" style={{ color: 'var(--text-primary)' }}>
                  Prefere falar agora pelo WhatsApp?
                </p>
                <p className="text-xs mt-0.5" style={{ color: 'var(--text-dim)' }}>
                  Resposta rápida — clique para abrir
                </p>
              </div>
            </a>

            {/* Info */}
            <div className="flex flex-col gap-3 text-sm">
              {[
                { k: 'Email', v: 'contato@gcstudio.com.br' },
                { k: 'Base', v: 'Salvador, BA — Brasil' },
                { k: 'Resposta', v: 'Em até 24 horas úteis' },
              ].map((item) => (
                <div key={item.k} className="flex gap-4">
                  <span className="font-mono text-xs w-16 shrink-0 mt-0.5" style={{ color: 'var(--text-dim)' }}>
                    {item.k}
                  </span>
                  <span style={{ color: 'var(--text-secondary)' }}>{item.v}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Right: form */}
          <div
            className="reveal rounded-2xl p-8 border"
            style={{ background: 'var(--bg-surface)', border: '1px solid var(--line)', transitionDelay: '100ms' }}
          >
            {success ? (
              <div className="flex flex-col items-center gap-6 py-12 text-center">
                <div
                  className="w-14 h-14 rounded-2xl flex items-center justify-center text-xl"
                  style={{ background: 'rgba(255,102,0,0.1)', color: 'var(--accent)' }}
                >
                  ✓
                </div>
                <div>
                  <h3 className="font-display text-xl font-500 mb-2" style={{ color: 'var(--text-primary)' }}>
                    Mensagem recebida!
                  </h3>
                  <p className="text-sm leading-relaxed" style={{ color: 'var(--text-secondary)' }}>
                    O WhatsApp abriu em paralelo. Respondemos em até 24 horas úteis.
                  </p>
                </div>
              </div>
            ) : (
              <form onSubmit={handleSubmit(onSubmit)} noValidate className="flex flex-col gap-5">

                <div className="grid grid-cols-2 gap-4">
                  <div className="col-span-2 sm:col-span-1">
                    <label className="block text-sm mb-1.5" style={{ color: 'var(--text-secondary)' }}>
                      Nome *
                    </label>
                    <input style={inputBase} placeholder="Seu nome" {...register('name')} />
                    {errors.name && (
                      <p className="text-xs mt-1" style={{ color: '#f87171' }}>{errors.name.message}</p>
                    )}
                  </div>
                  <div className="col-span-2 sm:col-span-1">
                    <label className="block text-sm mb-1.5" style={{ color: 'var(--text-secondary)' }}>
                      Email *
                    </label>
                    <input type="email" style={inputBase} placeholder="seu@email.com" {...register('email')} />
                    {errors.email && (
                      <p className="text-xs mt-1" style={{ color: '#f87171' }}>{errors.email.message}</p>
                    )}
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm mb-1.5" style={{ color: 'var(--text-secondary)' }}>
                      WhatsApp
                    </label>
                    <input style={inputBase} placeholder="(71) 9 0000-0000" {...register('whatsapp')} />
                  </div>
                  <div>
                    <label className="block text-sm mb-1.5" style={{ color: 'var(--text-secondary)' }}>
                      Empresa
                    </label>
                    <input style={inputBase} placeholder="Opcional" {...register('company')} />
                  </div>
                </div>

                <div>
                  <label className="block text-sm mb-1.5" style={{ color: 'var(--text-secondary)' }}>
                    Qual é o seu desafio? *
                  </label>
                  <textarea
                    style={{ ...inputBase, resize: 'none', minHeight: '110px' }}
                    placeholder="Descreva o que você precisa resolver, mesmo que não saiba ainda como..."
                    {...register('message')}
                  />
                  {errors.message && (
                    <p className="text-xs mt-1" style={{ color: '#f87171' }}>{errors.message.message}</p>
                  )}
                </div>

                {/* Budget (optional, inline) */}
                <div>
                  <label className="block text-sm mb-2" style={{ color: 'var(--text-secondary)' }}>
                    Faixa de investimento <span style={{ color: 'var(--text-dim)' }}>(opcional)</span>
                  </label>
                  <div className="flex flex-wrap gap-2">
                    {BUDGETS.map((b) => (
                      <button
                        key={b}
                        type="button"
                        onClick={() => setValue('budget', budget === b ? undefined : b)}
                        className="px-3 py-1.5 rounded-lg text-xs font-mono transition-all duration-150"
                        style={{
                          border: `1px solid ${budget === b ? 'var(--accent)' : 'var(--line)'}`,
                          background: budget === b ? 'rgba(255,102,0,0.08)' : 'var(--bg-elevated)',
                          color: budget === b ? 'var(--text-primary)' : 'var(--text-dim)',
                        }}
                      >
                        {b}
                      </button>
                    ))}
                  </div>
                </div>

                {serverError && (
                  <p className="text-sm text-center" style={{ color: '#f87171' }}>{serverError}</p>
                )}

                <button
                  type="submit"
                  disabled={submitting}
                  className="w-full py-4 rounded-xl font-display font-medium text-sm transition-all duration-200 hover:opacity-90 active:scale-[0.98] disabled:opacity-50"
                  style={{ background: 'var(--accent)', color: 'var(--text-inverse)' }}
                >
                  {submitting ? 'Enviando...' : 'Enviar mensagem →'}
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
