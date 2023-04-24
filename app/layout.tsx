import './globals.css'
import { Inter } from 'next/font/google'

const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  title: 'Stadtkapelle Radolfzell Bierpreis Rechner',
  description: 'Rechner der den Biergeplagten Stakadtkapellen Mitglieder bei der Preisberechnung am Bierstand hilft',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={`${inter.className} h-screen`}>{children}</body>
    </html>
  )
}
