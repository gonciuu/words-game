import '@/styles/globals.css'
import { Inter } from '@next/font/google'
const inter = Inter({ subsets: ['latin'] })

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html className={inter.className} lang="pl">
      <head></head>
      <body className={'bg-gray-700 text-white overflow-x-hidden'}>{children}</body>
    </html>
  )
}
