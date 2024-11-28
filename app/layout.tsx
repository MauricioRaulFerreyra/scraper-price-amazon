import NavBar from '@/components/NavBar'
import type { Metadata } from 'next'
import { Inter, Space_Grotesk } from 'next/font/google'
import './globals.css'

const inter = Inter({ subsets: ['latin'] })
const spaceGrotesk = Space_Grotesk({
  subsets: ['latin'],
  weight: ['300', '400', '500', '600', '700']
})

export const metadata: Metadata = {
  title: 'Pricewise',
  description: 'Track product prices effortlessly and save money on your online shopping',
  icons: {
    icon: '/favicon.ico'
  }
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang='en'>
      <body className={inter.className && spaceGrotesk.className}>
        <main className='mx-auto max-w-10xl'>
          <NavBar />
          {children}
        </main>
      </body>
    </html>
  )
}
