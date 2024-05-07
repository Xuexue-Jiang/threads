'use client'
import { sidebarLinks } from '@/constants'
import Link from 'next/link'
import Image from 'next/image'
import { usePathname } from 'next/navigation'
import { SignOutButton, SignedIn, useAuth } from '@clerk/nextjs'

const LeftSidebar = () => {
  return (
    <section className='custom-scroller leftsidebar'>
      <div className='flex w-full flex-1 flex-col gap-6 px-6'>
        {sidebarLinks.map((link) => {
          const pathName = usePathname()
          const { userId } = useAuth()
          const isActive = (link.route !== '/' && pathName.includes(link.route)) || pathName === link.route

          if(link.route === '/profile') link.route = `${link.route}/${userId}`

          return (
            <Link href={link.route} key={link.label} className={`leftsidebar_link ${isActive && 'bg-primary-500'}`}>
            <Image 
              src={link.imgURL} 
              alt={link.label} 
              width={24} 
              height={24}
              />
            <p className='text-light-1 max-lg:hidden'>
             {link.label}
            </p>
          </Link>
          )}
        )}
      </div>
      <div className="flex items-center mt-10 px-6 gap-4 p-4">
          <SignedIn>
            <SignOutButton redirectUrl='/sign-in'>
              <div className="flex cursor-pointer">
                <Image 
                  src='/assets/logout.svg'
                  alt="logout"
                  width={24}
                  height={24}
                />
              </div>
            </SignOutButton>
            <p className='text-light-2 max-lg:hidden'>Logout</p>
          </SignedIn>
        </div>
    </section>
  )
}

export default LeftSidebar