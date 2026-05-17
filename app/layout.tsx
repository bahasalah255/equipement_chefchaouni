import type { Metadata } from 'next'
import { Inter, Space_Grotesk } from 'next/font/google'
import { Analytics } from '@vercel/analytics/next'
import './globals.css'

const inter = Inter({ 
  subsets: ["latin"],
  variable: '--font-inter'
});

const spaceGrotesk = Space_Grotesk({ 
  subsets: ["latin"],
  variable: '--font-space-grotesk'
});

export const metadata: Metadata = {
  title: 'Equipement Chefchaouni | Outillage & Visserie à Casablanca',
  description: 'Votre partenaire de confiance pour l\'outillage professionnel et la visserie au Maroc. Plus de 15 ans d\'expérience à Casablanca, Aïn Sebaâ.',
  keywords: ['outillage', 'visserie', 'Casablanca', 'Maroc', 'équipement industriel', 'Chefchaouni'],
  openGraph: {
    title: 'Equipement Chefchaouni | Outillage & Visserie',
    description: 'Votre partenaire de confiance pour l\'outillage professionnel et la visserie au Maroc.',
    locale: 'fr_MA',
    type: 'website',
  },
  icons: {
    icon: [
      {
        url: '/icon-light-32x32.png',
        media: '(prefers-color-scheme: light)',
      },
      {
        url: '/icon-dark-32x32.png',
        media: '(prefers-color-scheme: dark)',
      },
      {
        url: '/icon.svg',
        type: 'image/svg+xml',
      },
    ],
    apple: '/apple-icon.png',
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="fr">
      <body className={`${inter.variable} ${spaceGrotesk.variable} font-sans antialiased`}>
        {children}
        <Analytics />
      </body>
    </html>
  )
}
