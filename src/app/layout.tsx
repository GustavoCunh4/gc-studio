import type { Metadata } from 'next'
import { Space_Grotesk, Space_Mono, Inter } from 'next/font/google'
import './globals.css'

const spaceGrotesk = Space_Grotesk({
  subsets: ['latin'],
  variable: '--font-display',
  weight: ['300', '400', '500', '600', '700'],
  display: 'swap',
})

const spaceMono = Space_Mono({
  subsets: ['latin'],
  variable: '--font-mono',
  weight: ['400', '700'],
  display: 'swap',
})

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-body',
  display: 'swap',
})

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL ?? 'https://gcstudio.com.br'),
  title: 'GC Studio — Software que trabalha por você',
  description:
    'Desenvolvemos software, automações e IA aplicada para empresas que precisam digitalizar e automatizar operações. Salvador, BA.',
  keywords: [
    'desenvolvimento de software',
    'automação de processos',
    'inteligência artificial',
    'sistemas web',
    'dashboards',
    'Next.js',
    'Salvador',
    'Bahia',
  ],
  authors: [{ name: 'Gustavo Cunha' }],
  creator: 'GC Studio',
  openGraph: {
    title: 'GC Studio — Software que trabalha por você',
    description:
      'Desenvolvemos software, automações e IA aplicada para empresas que precisam digitalizar e automatizar operações.',
    url: 'https://gcstudio.com.br',
    siteName: 'GC Studio',
    images: [
      {
        url: '/og-image.png',
        width: 1200,
        height: 630,
        alt: 'GC Studio — Software que trabalha por você',
      },
    ],
    locale: 'pt_BR',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'GC Studio — Software que trabalha por você',
    description:
      'Desenvolvemos software, automações e IA aplicada para empresas que precisam digitalizar e automatizar operações.',
    images: ['/og-image.png'],
  },
  robots: {
    index: true,
    follow: true,
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html
      lang="pt-BR"
      className={`${spaceGrotesk.variable} ${spaceMono.variable} ${inter.variable} h-full`}
    >
      <body className="min-h-full flex flex-col antialiased">{children}</body>
    </html>
  )
}
