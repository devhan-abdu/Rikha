'use client'
import React from 'react'
import Image from 'next/image'
import { ArrowRight, Lock, ShieldCheck, Truck, Undo2 } from 'lucide-react'
import { product } from '@/constants/index'
import { useState } from 'react'
import ProductCard from '@/components/ProductCard'
import { motion } from "framer-motion";

const links = [
  "home >", "category >", "Iphone"
]

interface Review {
  name: string;
  numReview: number;
  comment: string;

}
const reviews = [
  { name: "Hanan", numReview: 4.5, comment: "Lorem ipsum dolor sit amet consectetur adipisicing elit" },
  { name: "Hanan", numReview: 4.5, comment: "Lorem ipsum dolor sit amet consectetur adipisicing elit" },
  { name: "Hanan", numReview: 4.5, comment: "Lorem ipsum dolor sit amet consectetur adipisicing elit" },
  { name: "Hanan", numReview: 4.5, comment: "Lorem ipsum dolor sit amet consectetur adipisicing elit" },
  { name: "Hanan", numReview: 4.5, comment: "Lorem ipsum dolor sit amet consectetur adipisicing elit" }

]

const page = () => {
  const [tab, setTab] = useState('rev')
  const [rating, setRating] = useState(5)


  return (
    <>
      <div className='link flex items-center justify-start gap-2 mb-4 pt-12 px-12'>
        {
          links.map(item => (
            <span className='text-xl'>{item}</span>
          ))
        }
      </div>

      <div className='px-6 py-12 md:px-12 '>
        <div className='grid grid-cols-1 md:grid-cols-2 justify-between gap-6'>

          <Image
            src={product.image}
            alt="Picture of the author"
            width={200}
            height={200}
            className='w-full px-6 py-2 border border-gray-500  hidden md:block'
          />

          <div className='flex flex-col gap-2'>
            <h1 className='font-cinzel text-2xl font-bold'>
              Lorem, ipsum dolor sit amet consectetur
            </h1>
            <div className="mt-2 flex items-center gap-2">
              <div className="flex items-center">
                <svg className="h-4 w-4 text-yellow-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M13.8 4.2a2 2 0 0 0-3.6 0L8.4 8.4l-4.6.3a2 2 0 0 0-1.1 3.5l3.5 3-1 4.4c-.5 1.7 1.4 3 2.9 2.1l3.9-2.3 3.9 2.3c1.5 1 3.4-.4 3-2.1l-1-4.4 3.4-3a2 2 0 0 0-1.1-3.5l-4.6-.3-1.8-4.2Z" />
                </svg>

                <svg className="h-4 w-4 text-yellow-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M13.8 4.2a2 2 0 0 0-3.6 0L8.4 8.4l-4.6.3a2 2 0 0 0-1.1 3.5l3.5 3-1 4.4c-.5 1.7 1.4 3 2.9 2.1l3.9-2.3 3.9 2.3c1.5 1 3.4-.4 3-2.1l-1-4.4 3.4-3a2 2 0 0 0-1.1-3.5l-4.6-.3-1.8-4.2Z" />
                </svg>

                <svg className="h-4 w-4 text-yellow-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M13.8 4.2a2 2 0 0 0-3.6 0L8.4 8.4l-4.6.3a2 2 0 0 0-1.1 3.5l3.5 3-1 4.4c-.5 1.7 1.4 3 2.9 2.1l3.9-2.3 3.9 2.3c1.5 1 3.4-.4 3-2.1l-1-4.4 3.4-3a2 2 0 0 0-1.1-3.5l-4.6-.3-1.8-4.2Z" />
                </svg>

                <svg className="h-4 w-4 text-yellow-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M13.8 4.2a2 2 0 0 0-3.6 0L8.4 8.4l-4.6.3a2 2 0 0 0-1.1 3.5l3.5 3-1 4.4c-.5 1.7 1.4 3 2.9 2.1l3.9-2.3 3.9 2.3c1.5 1 3.4-.4 3-2.1l-1-4.4 3.4-3a2 2 0 0 0-1.1-3.5l-4.6-.3-1.8-4.2Z" />
                </svg>

                <svg className="h-4 w-4 text-yellow-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M13.8 4.2a2 2 0 0 0-3.6 0L8.4 8.4l-4.6.3a2 2 0 0 0-1.1 3.5l3.5 3-1 4.4c-.5 1.7 1.4 3 2.9 2.1l3.9-2.3 3.9 2.3c1.5 1 3.4-.4 3-2.1l-1-4.4 3.4-3a2 2 0 0 0-1.1-3.5l-4.6-.3-1.8-4.2Z" />
                </svg>
              </div>

              <p className="text-sm font-medium text-gray-900 dark:text-white">5.0</p>
              <p className="text-sm font-medium text-gray-500 dark:text-gray-400">(455)</p>
            </div>
            <p className='text-gray-600 my-4 hidden md:block'>Lorem ipsum dolor sit amet consectetur adipisicing elit. Assumenda, excepturi exercitationem? Eligendi quidem eveniet quas dolorem a fugiat quia, doloribus pariatur dolor dolorum architecto quae!</p>

            <Image
              src={product.image}
              alt="Picture of the author"
              width={160}
              height={160}
              className='w-full px-6 py-2 border border-gray-500 my-8 md:hidden'
            />
            <p className="text-2xl font-extrabold leading-tight text-black dark:text-white mb-4">$1,699</p>
            <button type="button" className="inline-flex items-center self-start md:my-auto rounded-lg bg-primary px-6 py-2.5 text-sm font-medium text-white hover:bg-primary focus:outline-none focus:ring-4  focus:ring-primary-300 dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800 ">
              <svg className="-ms-2 me-2 h-5 w-5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
                <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 4h1.5L8 16m0 0h8m-8 0a2 2 0 1 0 0 4 2 2 0 0 0 0-4Zm8 0a2 2 0 1 0 0 4 2 2 0 0 0 0-4Zm.75-3H7.5M11 7H6.312M17 4v6m-3-3h6" />
              </svg>
              Add to cart
            </button>
          </div>
        </div>

        <p className='text-gray-600 my-4 block md:hidden'>Lorem ipsum dolor sit amet consectetur adipisicing elit. Assumenda, excepturi exercitationem? Eligendi quidem eveniet quas dolorem a fugiat quia, doloribus pariatur dolor dolorum architecto quae!</p>
        <div className="grid grid-cols-2 md:grid-cols-4 items-center justify-center gap-x-4 gap-y-6 py-6 md:pt-16 mx-auto  ">
          <div className='inline-flex flex-col  font-bold  items-center gap-1  '>
            <Truck />
            <span className=''>Free Delivery</span>
          </div>
          <div className='inline-flex flex-col  font-bold  items-center gap-1 '>
            <ShieldCheck />
            <span>1-Year Warranty</span>
          </div>
          <div className='inline-flex flex-col  font-bold  items-center gap-1 '>
            <Lock />
            <span>Secure Payment</span>
          </div>
          <div className='inline-flex flex-col  font-bold  items-center gap-1 '>
            <Undo2 />
            <span>7-Day Return Policy</span>
          </div>
        </div>
      </div>
      <div className=' px-8 md:px-12'>
        <div className="flex items-center gap-12 mb-10">
          <h2 onClick={() => setTab('desc')} className={`text-lg md:text-xl cursor-pointer  font-cinzel ${tab === 'desc' ? 'font-bold text-black' : 'font-normal text-gray-600'}`}>Description</h2>
          <h2 onClick={() => setTab('rev')} className={`text-lg md:text-xl cursor-pointer font-cinzel ${tab === 'rev' ? 'font-bold text-black' : 'font-normal text-gray-600'}`}>Review</h2>
        </div>
        {
          tab === 'desc' ? (
            <div className="mb-12">
              <p className="  w-[95%] max-w-[80vw] ">Lorem ipsum dolor, sit amet consectetur adipisicing elit. Iure facere reiciendis quaerat a maxime corrupti harum exercitationem nostrum dolor possimus?</p>

            </div>

          ) : (
            <div className='space-y-6'>
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 items-center justify-center">
                {
                  reviews.map((review, index) => (
                    <div className='px-4 py-4 rounded-md border border-gray-500 '>
                      <div className='flex flex-col'>
                        <h4 className='font-cinzel text-xl bold '>{review.name}</h4>
                        <p className='inline-flex items-center gap-2'><span className='bold'>{review.numReview}</span>
                          <svg className="h-4 w-4 text-yellow-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 24 24">
                            <path d="M13.8 4.2a2 2 0 0 0-3.6 0L8.4 8.4l-4.6.3a2 2 0 0 0-1.1 3.5l3.5 3-1 4.4c-.5 1.7 1.4 3 2.9 2.1l3.9-2.3 3.9 2.3c1.5 1 3.4-.4 3-2.1l-1-4.4 3.4-3a2 2 0 0 0-1.1-3.5l-4.6-.3-1.8-4.2Z" />
                          </svg>
                        </p>
                        <p className='mt-1.5 line-clamp-3'>{review.comment}</p>
                      </div>
                    </div>
                  ))
                }
              </div>
              <div className='py-12 space-y-4 flex flex-col items-center justify-center gap-2'>
                <h1 className=" font-cinzel font-semibold text-center text-xl">Share Your Experience </h1>
                <form action="" className=" flex flex-col gap-6 md:w-1/2 w-full" >
                  <input type="text" id="name" className=" px-3  py-2  border-b border-foreground-500/60  placeholder:text-gray-500 outline-none" placeholder="your name" />
                  <div className="flex gap-6 items-center">
                    <motion.span onClick={() => setRating(1)} whileTap={{ scale: 1.2 }} className={`text-lg font-bold cursor-pointer font-cinzel ${rating === 1 ? 'text-yellow-600' : 'text-yellow-300'}`}> <span className='text-black'>1</span> &#9733;</motion.span>
                    <motion.span onClick={() => setRating(2)} whileTap={{ scale: 1.2 }} className={`text-lg font-bold cursor-pointer font-cinzel ${rating === 2 ? 'text-yellow-600' : 'text-yellow-300'}`}><span className='text-black'>2</span> &#9733;</motion.span>
                    <motion.span onClick={() => setRating(3)} whileTap={{ scale: 1.2 }} className={`text-lg font-bold cursor-pointer font-cinzel ${rating === 3 ? 'text-yellow-600' : 'text-yellow-300'}`}><span className='text-black'>3</span> &#9733;</motion.span>
                    <motion.span onClick={() => setRating(4)} whileTap={{ scale: 1.2 }} className={`text-lg font-bold cursor-pointer font-cinzel ${rating === 4 ? 'text-yellow-600' : 'text-yellow-300'}`}><span className='text-black'>4</span> &#9733;</motion.span>
                    <motion.span onClick={() => setRating(5)} whileTap={{ scale: 1.2 }} className={`text-lg font-bold cursor-pointer font-cinzel ${rating === 5 ? 'text-yellow-600' : 'text-yellow-300'}`}><span className='text-black'>5</span> &#9733;</motion.span>
                  </div>
                  <textarea name="message" rows={4} id="message" className="mt-2 px-3 py-2 rounded-md span-col-2 border border-gray-500  placeholder:text-gray-500 outline-none text-gray-600 focus:outline-ring-1 focus:outline-ring-gray-300 col-span-2 min-h-24" placeholder="Message" />
                  <button className='rounded-md px-4 py-2 cursor-pointer  w-max self-start md:self-end text-white font-bold bg-primary'>Send Message</button>
                </form>
              </div>
            </div>
          )
        }
      </div>
      <div className='pb-12 bg-gray-100 '>
        <h1 className='text-2xl md:text-3xl font-bold capitalize font-cinzel text-center leading-24'>You may also like</h1>
        <div className="grid md:grid-cols-2 lg:grid-cols-4   gap-x-3 gap-y-6">

          {
            [1, 2, 3, 4].map(item => (
              <ProductCard key={item} />
            ))
          }
        </div>
      </div>
    </>
  )
}

export default page
