'use client'
import '@/styles/globals.css'
import { Inter } from '@next/font/google'
import { RecoilRoot } from 'recoil'
const inter = Inter({ subsets: ['latin'] })

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html className={inter.className} lang="pl">
      <head></head>
      <RecoilRoot>
        <body className={'bg-gray-700 text-white overflow-x-hidden'}>{children}</body>
      </RecoilRoot>
    </html>
  )
}
