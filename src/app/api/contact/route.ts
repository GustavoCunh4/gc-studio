import { Resend } from 'resend'
import { NextRequest, NextResponse } from 'next/server'
import { z } from 'zod'

const schema = z.object({
  name: z.string().min(2, 'Nome obrigatório'),
  email: z.string().email('Email inválido'),
  whatsapp: z.string().optional(),
  company: z.string().optional(),
  message: z.string().min(10, 'Descreva o desafio'),
  budget: z.string().optional(),
  deadline: z.string().optional(),
})

export async function POST(req: NextRequest) {
  try {
    const body = await req.json()
    const data = schema.parse(body)

    const apiKey = process.env.RESEND_API_KEY
    if (!apiKey) {
      console.error('RESEND_API_KEY not set')
      return NextResponse.json({ error: 'Configuração de email ausente' }, { status: 500 })
    }
    const resend = new Resend(apiKey)

    const { error } = await resend.emails.send({
      from: 'GC Studio <onboarding@resend.dev>',
      to: ['luiz.gustavo.cunha2003@gmail.com'],
      subject: `Novo projeto: ${data.company || data.name}`,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 24px; background: #060608; color: #f0ede8;">
          <div style="margin-bottom: 24px; padding-bottom: 24px; border-bottom: 1px solid #222;">
            <h1 style="font-size: 20px; font-weight: 600; margin: 0; color: #ff6600;">Novo contato pelo site</h1>
          </div>
          <table style="width: 100%; border-collapse: collapse;">
            <tr><td style="padding: 8px 0; color: #8a8795; font-size: 13px; width: 120px;">Nome</td><td style="padding: 8px 0; font-size: 14px;">${data.name}</td></tr>
            <tr><td style="padding: 8px 0; color: #8a8795; font-size: 13px;">Email</td><td style="padding: 8px 0; font-size: 14px;"><a href="mailto:${data.email}" style="color: #ff6600;">${data.email}</a></td></tr>
            ${data.whatsapp ? `<tr><td style="padding: 8px 0; color: #8a8795; font-size: 13px;">WhatsApp</td><td style="padding: 8px 0; font-size: 14px;">${data.whatsapp}</td></tr>` : ''}
            ${data.company ? `<tr><td style="padding: 8px 0; color: #8a8795; font-size: 13px;">Empresa</td><td style="padding: 8px 0; font-size: 14px;">${data.company}</td></tr>` : ''}
            <tr><td style="padding: 8px 0; color: #8a8795; font-size: 13px;">Orçamento</td><td style="padding: 8px 0; font-size: 14px;">${data.budget}</td></tr>
            <tr><td style="padding: 8px 0; color: #8a8795; font-size: 13px;">Prazo</td><td style="padding: 8px 0; font-size: 14px;">${data.deadline}</td></tr>
          </table>
          <div style="margin-top: 24px; padding: 16px; background: #0d0d10; border-radius: 8px; border: 1px solid #222;">
            <p style="margin: 0 0 8px; font-size: 13px; color: #8a8795;">Mensagem</p>
            <p style="margin: 0; font-size: 14px; line-height: 1.6; white-space: pre-wrap;">${data.message}</p>
          </div>
          <p style="margin-top: 24px; font-size: 12px; color: #4a4858;">Enviado via gcstudio.com.br</p>
        </div>
      `,
    })

    if (error) {
      console.error('Resend error:', error)
      return NextResponse.json({ error: 'Erro ao enviar email' }, { status: 500 })
    }

    return NextResponse.json({ success: true })
  } catch (err) {
    if (err instanceof z.ZodError) {
      return NextResponse.json({ error: err.issues[0]?.message ?? 'Dados inválidos' }, { status: 422 })
    }
    console.error('Contact route error:', err)
    return NextResponse.json({ error: 'Erro interno' }, { status: 500 })
  }
}
