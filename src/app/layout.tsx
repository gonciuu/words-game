'use client'
import '@/styles/globals.css'
import { Inter } from '@next/font/google'
import { ToastContainer } from 'react-toastify'
import { RecoilRoot } from 'recoil'

import 'react-toastify/dist/ReactToastify.css'
const inter = Inter({ subsets: ['latin'] })

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html className={inter.className} lang="pl">
      <head></head>
      <body className={'bg-gray-700 text-white overflow-x-hidden'}>
        <RecoilRoot>
          {children}
          <ToastContainer toastStyle={{ backgroundColor: '#232323', color: 'white' }} />
        </RecoilRoot>
      </body>
    </html>
  )
}
