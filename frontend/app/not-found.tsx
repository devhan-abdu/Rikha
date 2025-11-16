'use client'
import Link from 'next/link';
import { motion } from 'framer-motion';
import Header from '@/components/Header';
import { ArrowRight } from 'lucide-react';
export default function NotFound() {

  return (
    <>
      <Header />
      <main className='text-montserrat text-foreground-500 flex flex-col items-start justify-center gap-12 h-[60vh] px-6'>
        <motion.div className='text-left '
          initial={{ x: -100, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ duration: 0.5 }}
        >
          <p className='text-3xl sm:text-4xl lg:text-5xl font-bold mb-3 font-cinzel '>PAGE NOT FOUND!</p>
          <p className='text-base  lowercase mb-6 sm:mb-12 '> The requested URL was not found on this Server</p>

        </motion.div>
        <div className='self-center'>
           <Link href="/" className='text-sm sm:text-base flex items-center gap-1 font-cinzel font-semibold text-primary hover:scale-105 transition-all duration-300'>
             BACK TO HOME
             <ArrowRight/>
           </Link>
        </div>
      </main>
    </>


  );
}