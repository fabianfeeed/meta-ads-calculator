import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Meta-Ads Budget & KPI Calculator',
  description: 'Calcula tu inversión publicitaria necesaria en Meta (Facebook/Instagram) Ads, ROAS objetivo y monitorea tus KPIs operativos.',
  keywords: ['Meta Ads', 'Facebook Ads', 'Instagram Ads', 'ROAS', 'KPI', 'Calculadora', 'Publicidad Digital'],
  authors: [{ name: 'Meta-Ads Calculator Team' }],
  viewport: 'width=device-width, initial-scale=1',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="es">
      <body className={inter.className}>
        {children}
      </body>
    </html>
  )
}

