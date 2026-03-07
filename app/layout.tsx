import type { Metadata, Viewport } from 'next'
import { Inter, Geist_Mono } from 'next/font/google'
import './globals.css'

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
})

const geistMono = Geist_Mono({
  subsets: ['latin'],
  variable: '--font-geist-mono',
})

export const metadata: Metadata = {
  title: 'DreamFragment — Capture Dreams as NFTs on Base',
  description: 'Capture your dreams as AI-generated NFT fragments on Base. A Farcaster Mini App.',
  generator: 'v0.app',
  applicationName: 'DreamFragment',
  keywords: ['NFT', 'dreams', 'AI', 'Base', 'Farcaster', 'web3'],
  openGraph: {
    title: 'DreamFragment',
    description: 'Capture your dreams as AI-generated NFT fragments on Base',
    type: 'website',
    images: ['/images/hero-bg.jpg'],
  },
  other: {
    'fc:frame': JSON.stringify({
      version: '1',
      name: 'DreamFragment',
      iconUrl: 'REPLACE_WITH_YOUR_VERCEL_URL/icon.png',
      homeUrl: 'REPLACE_WITH_YOUR_VERCEL_URL',
      splashImageUrl: 'REPLACE_WITH_YOUR_VERCEL_URL/splash.png',
      splashBackgroundColor: '#0a0710',
      subtitle: 'Dream NFTs on Base',
      tagline: 'Mint your dreams on Base',
    }),
  },
}

export const viewport: Viewport = {
  themeColor: '#0a0710',
  width: 'device-width',
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" className="dark">
      <body className={`${inter.variable} ${geistMono.variable} font-sans antialiased`}>
        {children}
      </body>
    </html>
  )
}
