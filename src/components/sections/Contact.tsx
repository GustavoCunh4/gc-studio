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
  message: z.string().min(10, 'Descreva seu desafio (mínimo 10 caracteres)'),
  budget: z.string().min(1, 'Selecione uma faixa de orçamento'),
  deadline: z.string().min(1, 'Selecione um prazo'),
})

const BUDGETS = [
  'Não sei ainda',
  'Até R$ 5.000',
  'R$ 5.000 – R$ 20.000',
  'R$ 20.000 – R$ 50.000',
  'Acima de R$ 50.000',
]

const DEADLINES = ['Com urgência (< 30 dias)', '1–3 meses', 'Sem prazo definido']

function FieldError({ message }: { message?: string }) {
  if (!message) return null
  return <p className="text-xs mt-1" style={{ color: '#f87171' }}>{message}</p>
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
  } = useForm<ContactFormData>({
    resolver: zodResolver(schema),
  })

  const values = watch()

  const goToStep2 = async () => {
    const valid = await trigger(['name', 'email'])
    if (valid) setStep(2)
  }

  const goToStep3 = async () => {
    const valid = await trigger(['message', 'budget', 'deadline'])
    if (valid) setStep(3)
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
        setServerError(body.error ?? 'Erro ao enviar. Tente novamente.')
        setSubmitting(false)
        return
      }

      // Open WhatsApp in new tab
      const waLink = buildWhatsAppLink({
        name: data.name,
        company: data.company,
        message: data.message,
        budget: data.budget,
      })
      window.open(waLink, '_blank', 'noopener,noreferrer')

      setSuccess(true)
    } catch {
      setServerError('Erro de conexão. Tente novamente.')
    } finally {
      setSubmitting(false)
    }
  }

  const inputClass =
    'w-full px-4 py-3 rounded-xl text-sm font-body border outline-none transition-all duration-200 focus:border-accent'
  const inputStyle = {
    background: 'var(--bg-elevated)',
    border: '1px solid var(--line)',
    color: 'var(--text-primary)',
  }
  const labelClass = 'block text-xs font-mono uppercase tracking-widest mb-2'
  const labelStyle = { color: 'var(--text-secondary)' }

  return (
    <section
      id="contact"
      className="py-24 md:py-32"
      style={{ background: 'var(--bg-void)', borderTop: '1px solid var(--line)' }}
    >
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
          {/* Left */}
          <div className="flex flex-col gap-8">
            <div>
              <p className="font-mono text-xs tracking-widest mb-3" style={{ color: 'var(--accent)' }}>
                // Contato
              </p>
              <h2
                className="font-display text-3xl md:text-4xl font-500 tracking-tight mb-4"
                style={{ color: 'var(--text-primary)' }}
              >
                Vamos conversar sobre o seu projeto.
              </h2>
              <p className="text-base leading-relaxed" style={{ color: 'var(--text-secondary)' }}>
                Preencha o formulário e recebo no meu email. Respondo em até 24h. Se preferir, fala
                direto no WhatsApp.
              </p>
            </div>

            {/* WhatsApp direto */}
            <a
              href={buildDirectWhatsAppLink()}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-3 px-6 py-4 rounded-2xl border transition-all duration-200 hover:border-accent self-start group"
              style={{ border: '1px solid var(--line)', background: 'var(--bg-surface)' }}
            >
              <span
                className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0"
                style={{ background: '#25D366', color: '#fff' }}
              >
                <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z"/>
                </svg>
              </span>
              <div>
                <p className="font-display font-500 text-sm" style={{ color: 'var(--text-primary)' }}>
                  Prefere falar agora?
                </p>
                <p className="text-xs" style={{ color: 'var(--text-secondary)' }}>
                  Abrir WhatsApp →
                </p>
              </div>
            </a>

            {/* Info */}
            <div className="flex flex-col gap-3">
              {[
                { label: 'Email', value: 'luiz.gustavo.cunha2003@gmail.com' },
                { label: 'Localização', value: 'Salvador, BA — Brasil' },
                { label: 'Resposta', value: 'Até 24 horas úteis' },
              ].map((item) => (
                <div key={item.label} className="flex gap-4 text-sm">
                  <span className="font-mono w-24 flex-shrink-0" style={{ color: 'var(--text-dim)' }}>
                    {item.label}
                  </span>
                  <span style={{ color: 'var(--text-secondary)' }}>{item.value}</span>
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
              <div className="flex flex-col items-center gap-6 py-8 text-center">
                <div
                  className="w-16 h-16 rounded-2xl flex items-center justify-center text-2xl"
                  style={{ background: 'rgba(255,102,0,0.12)', border: '1px solid var(--line-accent)' }}
                >
                  ✓
                </div>
                <div>
                  <h3
                    className="font-display text-xl font-500 mb-2"
                    style={{ color: 'var(--text-primary)' }}
                  >
                    Mensagem enviada!
                  </h3>
                  <p className="text-sm" style={{ color: 'var(--text-secondary)' }}>
                    Recebi sua mensagem e o WhatsApp abrirá em seguida. Respondo em até 24h.
                  </p>
                </div>
              </div>
            ) : (
              <>
                {/* Step indicator */}
                <div className="flex items-center gap-2 mb-8">
                  {([1, 2, 3] as const).map((s) => (
                    <div key={s} className="flex items-center gap-2">
                      <div
                        className="w-6 h-6 rounded-full flex items-center justify-center text-xs font-mono transition-all duration-300"
                        style={{
                          background: step >= s ? 'var(--accent)' : 'var(--bg-elevated)',
                          color: step >= s ? 'var(--text-inverse)' : 'var(--text-dim)',
                          border: `1px solid ${step >= s ? 'transparent' : 'var(--line)'}`,
                        }}
                      >
                        {step > s ? '✓' : s}
                      </div>
                      {s < 3 && (
                        <div
                          className="w-12 h-px"
                          style={{
                            background: step > s ? 'var(--accent)' : 'var(--line)',
                            transition: 'background 0.3s ease',
                          }}
                        />
                      )}
                    </div>
                  ))}
                  <span className="ml-3 text-xs font-mono" style={{ color: 'var(--text-dim)' }}>
                    {step === 1 ? 'Identificação' : step === 2 ? 'O desafio' : 'Confirmação'}
                  </span>
                </div>

                <form onSubmit={handleSubmit(onSubmit)} noValidate>
                  {/* Step 1 */}
                  {step === 1 && (
                    <div className="flex flex-col gap-5">
                      <div>
                        <label className={labelClass} style={labelStyle} htmlFor="name">
                          Nome completo *
                        </label>
                        <input
                          id="name"
                          className={inputClass}
                          style={inputStyle}
                          placeholder="Seu nome"
                          {...register('name')}
                        />
                        <FieldError message={errors.name?.message} />
                      </div>
                      <div>
                        <label className={labelClass} style={labelStyle} htmlFor="email">
                          Email *
                        </label>
                        <input
                          id="email"
                          type="email"
                          className={inputClass}
                          style={inputStyle}
                          placeholder="seu@email.com"
                          {...register('email')}
                        />
                        <FieldError message={errors.email?.message} />
                      </div>
                      <div>
                        <label className={labelClass} style={labelStyle} htmlFor="whatsapp">
                          WhatsApp
                        </label>
                        <input
                          id="whatsapp"
                          className={inputClass}
                          style={inputStyle}
                          placeholder="(71) 9 0000-0000"
                          {...register('whatsapp')}
                        />
                      </div>
                      <div>
                        <label className={labelClass} style={labelStyle} htmlFor="company">
                          Empresa / projeto
                        </label>
                        <input
                          id="company"
                          className={inputClass}
                          style={inputStyle}
                          placeholder="Nome da empresa ou projeto"
                          {...register('company')}
                        />
                      </div>
                      <button
                        type="button"
                        onClick={goToStep2}
                        className="w-full py-3 rounded-xl font-display font-medium text-sm transition-all duration-200 hover:opacity-90 active:scale-95 mt-2"
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
                        <label className={labelClass} style={labelStyle} htmlFor="message">
                          Qual é o seu desafio? *
                        </label>
                        <textarea
                          id="message"
                          className={inputClass}
                          style={{ ...inputStyle, resize: 'none', minHeight: '120px' }}
                          placeholder="Descreva o problema que você quer resolver..."
                          {...register('message')}
                        />
                        <FieldError message={errors.message?.message} />
                      </div>

                      <div>
                        <label className={labelClass} style={labelStyle}>
                          Orçamento aproximado *
                        </label>
                        <div className="flex flex-col gap-2">
                          {BUDGETS.map((b) => (
                            <label
                              key={b}
                              className="flex items-center gap-3 px-4 py-3 rounded-xl cursor-pointer border transition-all duration-200"
                              style={{
                                border: `1px solid ${values.budget === b ? 'var(--accent)' : 'var(--line)'}`,
                                background: values.budget === b ? 'rgba(255,102,0,0.06)' : 'var(--bg-elevated)',
                              }}
                            >
                              <input
                                type="radio"
                                value={b}
                                className="sr-only"
                                {...register('budget')}
                              />
                              <span
                                className="w-4 h-4 rounded-full border-2 flex items-center justify-center flex-shrink-0"
                                style={{
                                  borderColor: values.budget === b ? 'var(--accent)' : 'var(--line-bright)',
                                }}
                              >
                                {values.budget === b && (
                                  <span
                                    className="w-2 h-2 rounded-full"
                                    style={{ background: 'var(--accent)' }}
                                  />
                                )}
                              </span>
                              <span className="text-sm" style={{ color: 'var(--text-secondary)' }}>
                                {b}
                              </span>
                            </label>
                          ))}
                        </div>
                        <FieldError message={errors.budget?.message} />
                      </div>

                      <div>
                        <label className={labelClass} style={labelStyle}>
                          Prazo desejado *
                        </label>
                        <div className="flex flex-col gap-2">
                          {DEADLINES.map((d) => (
                            <label
                              key={d}
                              className="flex items-center gap-3 px-4 py-3 rounded-xl cursor-pointer border transition-all duration-200"
                              style={{
                                border: `1px solid ${values.deadline === d ? 'var(--accent)' : 'var(--line)'}`,
                                background: values.deadline === d ? 'rgba(255,102,0,0.06)' : 'var(--bg-elevated)',
                              }}
                            >
                              <input
                                type="radio"
                                value={d}
                                className="sr-only"
                                {...register('deadline')}
                              />
                              <span
                                className="w-4 h-4 rounded-full border-2 flex items-center justify-center flex-shrink-0"
                                style={{
                                  borderColor: values.deadline === d ? 'var(--accent)' : 'var(--line-bright)',
                                }}
                              >
                                {values.deadline === d && (
                                  <span
                                    className="w-2 h-2 rounded-full"
                                    style={{ background: 'var(--accent)' }}
                                  />
                                )}
                              </span>
                              <span className="text-sm" style={{ color: 'var(--text-secondary)' }}>
                                {d}
                              </span>
                            </label>
                          ))}
                        </div>
                        <FieldError message={errors.deadline?.message} />
                      </div>

                      <div className="flex gap-3 mt-2">
                        <button
                          type="button"
                          onClick={() => setStep(1)}
                          className="flex-1 py-3 rounded-xl font-display font-medium text-sm border transition-all duration-200 hover:border-accent"
                          style={{ border: '1px solid var(--line)', color: 'var(--text-secondary)' }}
                        >
                          ← Voltar
                        </button>
                        <button
                          type="button"
                          onClick={goToStep3}
                          className="flex-1 py-3 rounded-xl font-display font-medium text-sm transition-all duration-200 hover:opacity-90 active:scale-95"
                          style={{ background: 'var(--accent)', color: 'var(--text-inverse)' }}
                        >
                          Revisar →
                        </button>
                      </div>
                    </div>
                  )}

                  {/* Step 3: Summary */}
                  {step === 3 && (
                    <div className="flex flex-col gap-5">
                      <h3
                        className="font-display font-500 text-lg"
                        style={{ color: 'var(--text-primary)' }}
                      >
                        Revise antes de enviar
                      </h3>

                      <div
                        className="rounded-xl p-5 flex flex-col gap-3 border text-sm"
                        style={{ background: 'var(--bg-elevated)', border: '1px solid var(--line)' }}
                      >
                        {[
                          { label: 'Nome', value: values.name },
                          { label: 'Email', value: values.email },
                          { label: 'WhatsApp', value: values.whatsapp || '—' },
                          { label: 'Empresa', value: values.company || '—' },
                          { label: 'Orçamento', value: values.budget },
                          { label: 'Prazo', value: values.deadline },
                        ].map((row) => (
                          <div key={row.label} className="flex gap-3">
                            <span className="font-mono text-xs w-20 flex-shrink-0 mt-0.5" style={{ color: 'var(--text-dim)' }}>
                              {row.label}
                            </span>
                            <span style={{ color: 'var(--text-secondary)' }}>{row.value}</span>
                          </div>
                        ))}
                        <div className="flex gap-3 pt-3" style={{ borderTop: '1px solid var(--line)' }}>
                          <span className="font-mono text-xs w-20 flex-shrink-0 mt-0.5" style={{ color: 'var(--text-dim)' }}>
                            Mensagem
                          </span>
                          <span className="leading-relaxed" style={{ color: 'var(--text-secondary)' }}>
                            {values.message}
                          </span>
                        </div>
                      </div>

                      {serverError && (
                        <p className="text-sm text-center" style={{ color: '#f87171' }}>
                          {serverError}
                        </p>
                      )}

                      <div className="flex gap-3">
                        <button
                          type="button"
                          onClick={() => setStep(2)}
                          className="flex-1 py-3 rounded-xl font-display font-medium text-sm border transition-all duration-200 hover:border-accent"
                          style={{ border: '1px solid var(--line)', color: 'var(--text-secondary)' }}
                        >
                          ← Editar
                        </button>
                        <button
                          type="submit"
                          disabled={submitting}
                          className="flex-1 py-3 rounded-xl font-display font-medium text-sm transition-all duration-200 hover:opacity-90 active:scale-95 disabled:opacity-60"
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
