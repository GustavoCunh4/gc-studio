const PHONE = process.env.NEXT_PUBLIC_WA_PHONE ?? '5571991156488'

export function buildWhatsAppLink(data: {
  name: string
  email: string
  company?: string
  message: string
  budget?: string
}): string {
  const lines: string[] = [
    `Olá! Vim pelo site da GC Corporation.`,
    ``,
    `*Nome:* ${data.name}`,
    `*Email:* ${data.email}`,
  ]

  if (data.company) lines.push(`*Empresa:* ${data.company}`)
  if (data.budget) lines.push(`*Investimento estimado:* ${data.budget}`)

  lines.push(``, `*Desafio:*`, data.message)

  return `https://wa.me/${PHONE}?text=${encodeURIComponent(lines.join('\n'))}`
}

export function buildDirectWhatsAppLink(): string {
  const text = encodeURIComponent(
    'Olá Gustavo! Vi seu site e quero conversar sobre um projeto.'
  )
  return `https://wa.me/${PHONE}?text=${text}`
}
