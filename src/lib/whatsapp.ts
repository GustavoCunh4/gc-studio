const PHONE = process.env.NEXT_PUBLIC_WA_PHONE ?? '5571991156488'

export function buildWhatsAppLink(data: {
  name: string
  company?: string
  message: string
  budget?: string
}): string {
  const text = encodeURIComponent(
    `Olá Gustavo! Sou ${data.name}${data.company ? ` da ${data.company}` : ''}.\n\n` +
      `${data.message}\n\n` +
      `${data.budget ? `Orçamento estimado: ${data.budget}\n\n` : ''}` +
      `Vi seu site e quero conversar sobre isso.`
  )
  return `https://wa.me/${PHONE}?text=${text}`
}

export function buildDirectWhatsAppLink(): string {
  const text = encodeURIComponent(
    'Olá Gustavo! Vi seu site e quero conversar sobre um projeto.'
  )
  return `https://wa.me/${PHONE}?text=${text}`
}
