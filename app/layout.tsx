import { Analytics } from '@vercel/analytics/next'
import type { Metadata, Viewport } from 'next'
import { Bebas_Neue, Montserrat } from 'next/font/google'
import './globals.css'
import { seoConfig } from '@/src/config/seo'

const bebasNeue = Bebas_Neue({
  weight: ['400'],
  subsets: ['latin'],
  variable: '--font-bebas',
  display: 'swap',
})

const montserrat = Montserrat({
  weight: ['400', '500', '600', '700'],
  subsets: ['latin'],
  variable: '--font-montserrat',
  display: 'swap',
})

export const metadata: Metadata = {
  title: {
    template: `%s | ${seoConfig.siteName}`,
    default: seoConfig.title,
  },
  description: seoConfig.description,
  keywords: ['real estate', 'properties', 'buy', 'rent', 'Argentina'],
  authors: [{ name: seoConfig.author }],
  creator: seoConfig.author,
  generator: 'Next.js',
  icons: {
    icon: '/favicon.png',
    apple: '/favicon.png',
  },
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: seoConfig.siteUrl,
    siteName: seoConfig.siteName,
    title: seoConfig.title,
    description: seoConfig.description,
  },
}

export const viewport: Viewport = {
  colorScheme: 'light dark',
  themeColor: [
    { media: '(prefers-color-scheme: light)', color: 'white' },
    { media: '(prefers-color-scheme: dark)', color: 'black' },
  ],
  width: 'device-width',
  initialScale: 1,
  maximumScale: 5,
  userScalable: true,
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" className={`${bebasNeue.variable} ${montserrat.variable}`}>
      <body className="antialiased font-montserrat">
        {children}
        {process.env.NODE_ENV === 'production' && <Analytics />}
      </body>
    </html>
  )
}
