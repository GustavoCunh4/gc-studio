'use client'

import dynamic from 'next/dynamic'

const Cursor = dynamic(() => import('@/components/ui/Cursor'), { ssr: false })
const LenisProvider = dynamic(
  () => import('@/components/providers/LenisProvider'),
  { ssr: false }
)

export default function ClientProviders({ children }: { children: React.ReactNode }) {
  return (
    <LenisProvider>
      <Cursor />
      {children}
    </LenisProvider>
  )
}
