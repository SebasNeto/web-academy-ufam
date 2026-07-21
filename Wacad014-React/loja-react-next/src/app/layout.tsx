import type { Metadata } from 'next'
import 'bootstrap/dist/css/bootstrap.min.css'
import './globals.css'
import Navbar from '@/app/components/Navbar/Navbar'

export const metadata: Metadata = {
  title: 'WA Loja',
  description: 'Trabalho prático de React com Next.js',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang='pt-BR'>
      <body>
        <Navbar />
        <main>{children}</main>
      </body>
    </html>
  )
}

