import type { Metadata } from 'next'
import { Fraunces, Nunito } from 'next/font/google'
import './globals.css'

const fraunces = Fraunces({
  subsets: ['latin'],
  weight: ['900'],
  style: ['normal', 'italic'],
  variable: '--font-fraunces',
  display: 'swap',
})

const nunito = Nunito({
  subsets: ['latin'],
  weight: ['400', '600', '700', '800', '900'],
  variable: '--font-nunito',
  display: 'swap',
})

export const metadata: Metadata = {
  title: 'Furlan Pet Shop — Vila Pirituba, São Paulo',
  description:
    'Furlan Pet Shop em Vila Pirituba, SP. Rações, acessórios, produtos para cães, gatos, aves e peixes. Entrega disponível. (11) 3906-0985.',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="pt-BR">
      <body className={`${fraunces.variable} ${nunito.variable}`}>{children}</body>
    </html>
  )
}
