'use client'
import React from 'react'
import type { Review } from '@/interface/index'
import { useState } from 'react';
import { motion } from "framer-motion";


 type Props ={
    reviews:Review[];
    desc:string;
 }
const Review = ({reviews, desc}:Props) => {
    const [tab, setTab] = useState('rev')
  const [rating, setRating] = useState(5)

  return (
     <div className=' px-8 md:px-12'>
        <div className="flex items-center gap-12 mb-6">
          <h2 onClick={() => setTab('desc')} className={`text-lg md:text-xl cursor-pointer  font-cinzel ${tab === 'desc' ? 'font-bold text-black' : 'font-normal text-gray-600'}`}>Description</h2>
          <h2 onClick={() => setTab('rev')} className={`text-lg md:text-xl cursor-pointer font-cinzel ${tab === 'rev' ? 'font-bold text-black' : 'font-normal text-gray-600'}`}>Review({reviews.length})</h2>
        </div>
        {
          tab === 'desc' ? (
            <div className="mb-12">
            <p className="  w-[95%] max-w-[80vw] ">{desc}</p>

            </div>

          ) : (
            <div className='space-y-6'>
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 items-center justify-center">
                {
                  reviews.map((review, ) => (
                    <div className='px-4 py-4 rounded-md border border-gray-500 'key={review.id}>
                      <div className='flex flex-col'>
                        <h4 className='font-cinzel text-xl bold '>{review.user.name}</h4>
                        <p className='inline-flex items-center gap-2'><span className='bold'>{review.rating}</span>
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
              <div className='pb-12 space-y-4 flex flex-col items-center justify-center gap-2'>
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
  )
}

export default Review
