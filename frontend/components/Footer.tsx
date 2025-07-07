import React from 'react'
import Link from 'next/link';
import { LucideFacebook , LucideInstagram , LucideYoutube } from 'lucide-react';

const Footer = () => {
    const year = new Date().getFullYear()
  return (
    <footer className="flex items-center justify-center px-12 pt-12">
    <div className="flex flex-col gap-6 items-center justify-center">
      <h1 className="text-4xl font-extrabold font-cinzel text-primary">Rikha</h1>
        <div className="flex space-x-4 text-[#666] ">
         <Link href="https://www.pinterest.com" >
            About
          </Link>
          <Link href="https://www.pinterest.com" >
            About
          </Link>
          <Link href="https://www.pinterest.com" >
            About
          </Link>
          <Link href="https://www.pinterest.com" >
           Contact
          </Link>
          <Link href="https://www.pinterest.com" >
           Login
          </Link>
        </div>
        <div className="flex space-x-4">
          <Link href="https://www.facebook.com" target="_blank" rel="noopener noreferrer">
            <LucideFacebook className="text-blue-600 text-2xl hover:text-blue-800 hover:scale-110 duration-300"  />
          </Link>
          <Link href="https://www.instagram.com" target="_blank" rel="noopener noreferrer">
            <LucideInstagram className="text-pink-500 text-2xl hover:text-pink-700 hover:scale-110 duration-300" />
          </Link>
          <Link href="https://www.pinterest.com" target="_blank" rel="noopener noreferrer">
            <LucideYoutube className="text-red-600 text-2xl hover:text-red-800 hover:scale-110 duration-300" />
          </Link>
        </div>
        <div className='text-[#666] p-4 mt-6 pt-4 border-t-2 w-full'>
        <p className='text-center'>Copyright @{year},<span className='font-cinzel text-sm font-semibold'>Rikha</span> - All rights reserved.</p>
          
        </div>
    </div>
  </footer>
  )
}

export default Footer
