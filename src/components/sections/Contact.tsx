'use client'

import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { buildWhatsAppLink, buildDirectWhatsAppLink } from '@/lib/whatsapp'
import type { ContactFormData } from '@/types'

const schema = z.object({
  name: z.string().min(2, 'Nome obrigatório'),
  email: z.string().email('Email inválido'),
  whatsapp: z.string().optional(),
  company: z.string().optional(),
  message: z.string().min(10, 'Descreva seu desafio'),
  budget: z.string().min(1, 'Selecione uma faixa'),
  deadline: z.string().min(1, 'Selecione um prazo'),
})

const BUDGETS = ['Não sei ainda', 'Até R$ 5.000', 'R$ 5k–20k', 'R$ 20k–50k', 'Acima de R$ 50k']
const DEADLINES = ['Urgente (< 30 dias)', '1–3 meses', 'Sem prazo definido']

const inputBase: React.CSSProperties = {
  background: 'var(--bg-elevated)',
  border: '1px solid var(--line)',
  color: 'var(--text-primary)',
  borderRadius: '10px',
  width: '100%',
  padding: '12px 16px',
  fontSize: '14px',
  outline: 'none',
  transition: 'border-color 0.2s ease',
  fontFamily: 'var(--font-body)',
}

function FieldLabel({ children }: { children: React.ReactNode }) {
  return (
    <label className="block text-sm mb-2" style={{ color: 'var(--text-secondary)' }}>
      {children}
    </label>
  )
}

function FieldError({ message }: { message?: string }) {
  if (!message) return null
  return <p className="text-xs mt-1.5" style={{ color: '#f87171' }}>{message}</p>
}

type Step = 1 | 2 | 3

export default function Contact() {
  const [step, setStep] = useState<Step>(1)
  const [submitting, setSubmitting] = useState(false)
  const [success, setSuccess] = useState(false)
  const [serverError, setServerError] = useState('')

  const {
    register,
    handleSubmit,
    watch,
    trigger,
    formState: { errors },
  } = useForm<ContactFormData>({ resolver: zodResolver(schema) })

  const values = watch()

  const goToStep2 = async () => {
    if (await trigger(['name', 'email'])) setStep(2)
  }

  const goToStep3 = async () => {
    if (await trigger(['message', 'budget', 'deadline'])) setStep(3)
  }

  const onSubmit = async (data: ContactFormData) => {
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

          {/* Left info */}
          <div className="flex flex-col gap-10">
            <div>
              <p
                className="font-mono text-xs tracking-[0.2em] uppercase mb-4"
                style={{ color: 'var(--accent)' }}
              >
                Contato
              </p>
              <h2
                className="font-display font-500 tracking-tight leading-tight mb-4"
                style={{ fontSize: 'clamp(1.75rem, 3.5vw, 3rem)', color: 'var(--text-primary)' }}
              >
                Vamos conversar sobre o seu projeto.
              </h2>
              <p className="text-base leading-relaxed" style={{ color: 'var(--text-secondary)' }}>
                Preencha o formulário e respondo em até 24h. Ou fala direto no WhatsApp.
              </p>
            </div>

            {/* WhatsApp */}
            <a
              href={buildDirectWhatsAppLink()}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-4 p-5 rounded-2xl border transition-all duration-200 hover:border-accent group self-start"
              style={{ border: '1px solid var(--line)', background: 'var(--bg-surface)' }}
            >
              <span
                className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0"
                style={{ background: '#25D366' }}
              >
                <svg width="18" height="18" viewBox="0 0 24 24" fill="white">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z"/>
                </svg>
              </span>
              <div>
                <p className="font-display font-500 text-sm group-hover:text-accent transition-colors" style={{ color: 'var(--text-primary)' }}>
                  Falar no WhatsApp agora
                </p>
                <p className="text-xs mt-0.5" style={{ color: 'var(--text-dim)' }}>
                  (71) 9 9115-6488
                </p>
              </div>
            </a>

            {/* Dados */}
            <div className="flex flex-col gap-4 pt-2">
              {[
                { k: 'Email', v: 'luiz.gustavo.cunha2003@gmail.com' },
                { k: 'Base', v: 'Salvador, BA — Brasil' },
                { k: 'Resposta', v: 'Até 24 horas úteis' },
              ].map((item) => (
                <div key={item.k} className="flex gap-4 text-sm">
                  <span className="font-mono text-xs w-16 flex-shrink-0 mt-0.5" style={{ color: 'var(--text-dim)' }}>
                    {item.k}
                  </span>
                  <span style={{ color: 'var(--text-secondary)' }}>{item.v}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Right: form */}
          <div
            className="rounded-2xl p-8 border"
            style={{ background: 'var(--bg-surface)', border: '1px solid var(--line)' }}
          >
            {success ? (
              <div className="flex flex-col items-center gap-6 py-10 text-center">
                <div
                  className="w-14 h-14 rounded-2xl flex items-center justify-center text-xl"
                  style={{ background: 'rgba(255,102,0,0.1)', color: 'var(--accent)' }}
                >
                  ✓
                </div>
                <div>
                  <h3 className="font-display text-xl font-500 mb-2" style={{ color: 'var(--text-primary)' }}>
                    Mensagem enviada!
                  </h3>
                  <p className="text-sm" style={{ color: 'var(--text-secondary)' }}>
                    O WhatsApp abriu em paralelo. Respondo em até 24h.
                  </p>
                </div>
              </div>
            ) : (
              <>
                {/* Steps */}
                <div className="flex items-center gap-1 mb-8">
                  {(['1', '2', '3'] as const).map((s, idx) => (
                    <div key={s} className="flex items-center gap-1">
                      <div
                        className="w-6 h-6 rounded-full flex items-center justify-center text-[11px] font-mono transition-all duration-300"
                        style={{
                          background: step > idx ? 'var(--accent)' : step === idx + 1 ? 'var(--accent)' : 'var(--bg-elevated)',
                          color: step >= idx + 1 ? 'var(--text-inverse)' : 'var(--text-dim)',
                          border: `1px solid ${step >= idx + 1 ? 'transparent' : 'var(--line)'}`,
                        }}
                      >
                        {step > idx + 1 ? '✓' : s}
                      </div>
                      {idx < 2 && (
                        <div
                          className="w-8 h-px"
                          style={{ background: step > idx + 1 ? 'var(--accent)' : 'var(--line)', transition: 'background 0.3s' }}
                        />
                      )}
                    </div>
                  ))}
                  <span className="ml-3 text-xs" style={{ color: 'var(--text-dim)' }}>
                    {step === 1 ? 'Identificação' : step === 2 ? 'O desafio' : 'Confirmar'}
                  </span>
                </div>

                <form onSubmit={handleSubmit(onSubmit)} noValidate>
                  {/* Step 1 */}
                  {step === 1 && (
                    <div className="flex flex-col gap-5">
                      <div>
                        <FieldLabel>Nome completo *</FieldLabel>
                        <input style={inputBase} placeholder="Seu nome" {...register('name')} />
                        <FieldError message={errors.name?.message} />
                      </div>
                      <div>
                        <FieldLabel>Email *</FieldLabel>
                        <input type="email" style={inputBase} placeholder="seu@email.com" {...register('email')} />
                        <FieldError message={errors.email?.message} />
                      </div>
                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <FieldLabel>WhatsApp</FieldLabel>
                          <input style={inputBase} placeholder="(71) 9 0000-0000" {...register('whatsapp')} />
                        </div>
                        <div>
                          <FieldLabel>Empresa</FieldLabel>
                          <input style={inputBase} placeholder="Opcional" {...register('company')} />
                        </div>
                      </div>
                      <button
                        type="button"
                        onClick={goToStep2}
                        className="w-full py-3.5 rounded-xl font-display font-medium text-sm mt-2 transition-all duration-200 hover:opacity-90 active:scale-[0.98]"
                        style={{ background: 'var(--accent)', color: 'var(--text-inverse)' }}
                      >
                        Próximo →
                      </button>
                    </div>
                  )}

                  {/* Step 2 */}
                  {step === 2 && (
                    <div className="flex flex-col gap-5">
                      <div>
                        <FieldLabel>Qual é o desafio? *</FieldLabel>
                        <textarea
                          style={{ ...inputBase, resize: 'none', minHeight: '100px' }}
                          placeholder="Descreva o problema que precisa resolver..."
                          {...register('message')}
                        />
                        <FieldError message={errors.message?.message} />
                      </div>

                      <div>
                        <FieldLabel>Orçamento aproximado *</FieldLabel>
                        <div className="flex flex-wrap gap-2">
                          {BUDGETS.map((b) => (
                            <label
                              key={b}
                              className="flex items-center gap-2 px-3 py-2 rounded-lg cursor-pointer text-sm transition-all duration-200"
                              style={{
                                border: `1px solid ${values.budget === b ? 'var(--accent)' : 'var(--line)'}`,
                                background: values.budget === b ? 'rgba(255,102,0,0.08)' : 'var(--bg-elevated)',
                                color: values.budget === b ? 'var(--text-primary)' : 'var(--text-secondary)',
                              }}
                            >
                              <input type="radio" value={b} className="sr-only" {...register('budget')} />
                              {b}
                            </label>
                          ))}
                        </div>
                        <FieldError message={errors.budget?.message} />
                      </div>

                      <div>
                        <FieldLabel>Prazo *</FieldLabel>
                        <div className="flex flex-wrap gap-2">
                          {DEADLINES.map((d) => (
                            <label
                              key={d}
                              className="flex items-center gap-2 px-3 py-2 rounded-lg cursor-pointer text-sm transition-all duration-200"
                              style={{
                                border: `1px solid ${values.deadline === d ? 'var(--accent)' : 'var(--line)'}`,
                                background: values.deadline === d ? 'rgba(255,102,0,0.08)' : 'var(--bg-elevated)',
                                color: values.deadline === d ? 'var(--text-primary)' : 'var(--text-secondary)',
                              }}
                            >
                              <input type="radio" value={d} className="sr-only" {...register('deadline')} />
                              {d}
                            </label>
                          ))}
                        </div>
                        <FieldError message={errors.deadline?.message} />
                      </div>

                      <div className="flex gap-3 mt-1">
                        <button
                          type="button"
                          onClick={() => setStep(1)}
                          className="flex-1 py-3 rounded-xl font-display text-sm border transition-all duration-200 hover:border-accent"
                          style={{ border: '1px solid var(--line)', color: 'var(--text-secondary)' }}
                        >
                          ← Voltar
                        </button>
                        <button
                          type="button"
                          onClick={goToStep3}
                          className="flex-2 px-8 py-3 rounded-xl font-display font-medium text-sm transition-all duration-200 hover:opacity-90 active:scale-[0.98]"
                          style={{ background: 'var(--accent)', color: 'var(--text-inverse)' }}
                        >
                          Revisar →
                        </button>
                      </div>
                    </div>
                  )}

                  {/* Step 3 */}
                  {step === 3 && (
                    <div className="flex flex-col gap-5">
                      <h3 className="font-display font-500 text-base" style={{ color: 'var(--text-primary)' }}>
                        Confira e envie
                      </h3>
                      <div
                        className="rounded-xl p-5 flex flex-col gap-3 text-sm border"
                        style={{ background: 'var(--bg-elevated)', border: '1px solid var(--line)' }}
                      >
                        {[
                          { k: 'Nome', v: values.name },
                          { k: 'Email', v: values.email },
                          { k: 'Empresa', v: values.company || '—' },
                          { k: 'Orçamento', v: values.budget },
                          { k: 'Prazo', v: values.deadline },
                        ].map((row) => (
                          <div key={row.k} className="flex gap-4">
                            <span className="w-16 flex-shrink-0 text-xs" style={{ color: 'var(--text-dim)' }}>{row.k}</span>
                            <span style={{ color: 'var(--text-secondary)' }}>{row.v}</span>
                          </div>
                        ))}
                        <div className="flex gap-4 pt-3" style={{ borderTop: '1px solid var(--line)' }}>
                          <span className="w-16 flex-shrink-0 text-xs mt-0.5" style={{ color: 'var(--text-dim)' }}>Mensagem</span>
                          <span className="leading-relaxed" style={{ color: 'var(--text-secondary)' }}>{values.message}</span>
                        </div>
                      </div>

                      {serverError && (
                        <p className="text-sm text-center" style={{ color: '#f87171' }}>{serverError}</p>
                      )}

                      <div className="flex gap-3">
                        <button
                          type="button"
                          onClick={() => setStep(2)}
                          className="flex-1 py-3 rounded-xl font-display text-sm border transition-all duration-200"
                          style={{ border: '1px solid var(--line)', color: 'var(--text-secondary)' }}
                        >
                          ← Editar
                        </button>
                        <button
                          type="submit"
                          disabled={submitting}
                          className="flex-2 px-8 py-3 rounded-xl font-display font-medium text-sm transition-all duration-200 hover:opacity-90 active:scale-[0.98] disabled:opacity-50"
                          style={{ background: 'var(--accent)', color: 'var(--text-inverse)' }}
                        >
                          {submitting ? 'Enviando...' : 'Enviar projeto ✓'}
                        </button>
                      </div>
                    </div>
                  )}
                </form>
              </>
            )}
          </div>
        </div>
      </div>
    </section>
  )
}
