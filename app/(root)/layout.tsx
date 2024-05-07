import Bottombar from '@/components/shared/Bottombar'
import LeftSidebar from '@/components/shared/LeftSidebar'
import RightSidebar from '@/components/shared/RightSidebar'
import Topbar from '@/components/shared/Topbar'
import { ClerkProvider } from '@clerk/nextjs'
import type { Metadata } from 'next'
import { Inter } from "next/font/google"
import '../globals.css'


export const metadata: Metadata = {
  title: 'Threads',
  description: 'A Next.js 13 Mera Threads Application'
}

const inter = Inter({ 
  subsets: ['latin'],
  display: 'swap'
})

export default function RootLayout({ 
  children 
}: { 
  children: React.ReactNode 
}) {
  return (
    <ClerkProvider>
      <html lang="en">
        <body className={inter.className}>
          <Topbar />
          <main className='flex flex-row'>
            <LeftSidebar />
            <section className='main-container'>
              <div className='w-full max-w-4xl'>
                {children} 
              </div>
            </section>
            <RightSidebar />
          </main>
          <Bottombar />
        </body>
      </html>
    </ClerkProvider>
  )
}