'use client'
import React from 'react'
import Link from 'next/link';
import { LucideFacebook , LucideInstagram , LucideYoutube } from 'lucide-react';
import { navData } from '@/constants';
import { cn } from '@/lib/utils';
import { usePathname } from 'next/navigation';

const Footer = () => {
    const pathname = usePathname();
     const [year, setYear] = React.useState<number | null>(null);

  React.useEffect(() => {
    setYear(new Date().getFullYear());
  }, []);
  return (
    <footer className="flex items-center justify-center px-12 pt-12 mt-auto   shadow-xl  ">
    <div className="flex flex-col gap-6 items-center justify-center">
      <h1 className="text-4xl font-extrabold font-cinzel text-primary">Rikha</h1>
        <ul className="flex items-center justify-center gap-6 no-underline  flex-1">
                 {
                   navData.map((item) => {
                     return (
                       <li key={item.id}>
                         <Link href={item.path} className={cn('transition-colors text-lg font-poppins', { "text-primary": pathname === item.path })}>
                           {item.name}
                         </Link>
                       </li>
                     )
                   })
                 }
               </ul>
        <div className="flex space-x-4 ">
          <Link href="#" target="_blank" rel="noopener noreferrer">
            <LucideFacebook className="text-blue-600 text-2xl hover:text-blue-800 hover:scale-110 duration-300"  />
          </Link>
          <Link href="#" target="_blank" rel="noopener noreferrer">
            <LucideInstagram className="text-pink-500 text-2xl hover:text-pink-700 hover:scale-110 duration-300" />
          </Link>
          <Link href="#" target="_blank" rel="noopener noreferrer">
            <LucideYoutube className="text-red-600 text-2xl hover:text-red-800 hover:scale-110 duration-300" />
          </Link>
        </div>
        <div className=' p-4 mt-6 pt-4 border-t-2 w-full border-gray-600'>
        <p className='text-center'>Copyright @{year},<span className=' text-sm font-semibold'>Rikha</span> - All rights reserved.</p>
          
        </div>
    </div>
  </footer>
  )
}

export default Footer
