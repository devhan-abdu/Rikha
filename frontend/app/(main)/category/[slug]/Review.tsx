'use client'
import React from 'react'
import type { Review } from '@/interface/index'
import { useState } from 'react';
import { motion } from "framer-motion";
import { useAppSelector } from '@/redux/hooks';
import { selectUser } from '@/redux/slices/authSlice';
import { Button } from '@/components/ui/button';
import { useRouter } from 'next/navigation';
import api from '@/lib/api';
import { toast } from 'react-toastify';


type Props = {
  reviews: Review[];
  productId: number,
  desc: string;
}
const Review = ({ reviews, desc, productId }: Props) => {
  const router = useRouter();
  const user = useAppSelector(selectUser);
  const [tab, setTab] = useState('desc')

  const [rating, setRating] = useState<number | null>(null)
  const [hoverRating, setHoverRating] = useState<number | null>(null);
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!rating || !message.trim()) {
      toast.error("Please provide both rating and comment");
      return;
    }

    setLoading(true)

    try {
      await api.post(`/products/${productId}/reviews`, {
        comment: message,
        rating,
      });
      toast.success("successfully added review")
      setMessage("");
      setRating(0);
    } catch (error) {
      console.log(error, "from the review")
      toast.error("Failed to add review")
    } finally {
      setLoading(false)
    }

  }



  return (
    <div className='px-6'>
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
          <div className='space-y-4'>
            <div className="max-w-fit mx-auto grid grid-cols-1 md:grid-cols-2 items-center justify-center gap-6">
              {reviews.map((review) => (

                <div className="bg-white " key={review.id}>
                  <div className="max-w-screen-xl p-4 mx-auto text-center lg:p-6">
                    <figure className="max-w-screen-md mx-auto">
                      <svg className="h-12 mx-auto mb-3 text-gray-400 dark:text-gray-600" viewBox="0 0 24 27" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M14.017 18L14.017 10.609C14.017 4.905 17.748 1.039 23 0L23.995 2.151C21.563 3.068 20 5.789 20 8H24V18H14.017ZM0 18V10.609C0 4.905 3.748 1.038 9 0L9.996 2.151C7.563 3.068 6 5.789 6 8H9.983L9.983 18L0 18Z" fill="currentColor" />
                      </svg>
                      <blockquote>
                        <p className="text-xl font-medium text-gray-900 dark:text-white">&quot;{review.comment}&quot;</p>
                      </blockquote>
                      <figcaption className="flex items-center justify-center mt-6 space-x-3">
                        <div className="h-10 w-10 rounded-full bg-gray-200 flex items-center justify-center text-gray-600 font-bold">
                          {review.user.name.charAt(0).toUpperCase()}
                        </div>
                        <div className="flex items-center divide-x-2 divide-gray-500 dark:divide-gray-700">
                          <div className="pr-3 font-medium text-gray-900 dark:text-white">  {review.user.name}</div>
                        </div>
                      </figcaption>
                    </figure>
                  </div>
                </div>
              ))}
            </div>

            <div className='pb-12 flex flex-col items-center justify-center gap-2'>
              {
                user ? (
                  <div className="w-full max-w-xl mx-auto  p-6 space-y-6">
                    <h2 className="font-cinzel text-2xl md:text-4xl font-semibold text-center">
                      Share Your Experience
                    </h2>

                    <form onSubmit={handleSubmit} className="flex flex-col gap-6">
                      <div className="flex flex-col items-center gap-3">
                        <label className="text-sm font-medium text-gray-600">
                          Your Rating
                        </label>
                        <div className="flex gap-3">
                          {[1, 2, 3, 4, 5].map((num) => (
                            <motion.button
                              key={num}
                              type="button"
                              whileTap={{ scale: 1.2 }}
                              onMouseEnter={() => setHoverRating(num)}
                              onMouseLeave={() => setHoverRating(null)}
                              onClick={() => setRating(num)}
                              className={`text-3xl font-bold transition-colors ${(hoverRating || rating) && num <= (hoverRating ?? rating!)
                                ? "text-yellow-400"
                                : "text-gray-300"
                                }`}
                            >
                              ★
                            </motion.button>
                          ))}
                        </div>
                      </div>

                      <div className="flex flex-col">
                        <label
                          htmlFor="message"
                          className="text-sm font-medium text-gray-600 mb-2"
                        >
                          Your Review
                        </label>
                        <textarea
                          id="message"
                          rows={4}
                          value={message}
                          onChange={(e) => setMessage(e.target.value)}
                          placeholder="Write your thoughts about this product..."
                          className="w-full px-4 py-3 rounded-xl border border-gray-300 text-gray-700 placeholder:text-gray-400 outline-none focus:ring-2 focus:ring-primary/40 focus:border-primary/50 transition"
                        />
                      </div>

                      <div className="flex justify-end">
                        <button
                          type="submit"
                          disabled={!rating || !message.trim() || loading}
                          className="bg-primary text-white font-semibold px-5 py-2 rounded-lg disabled:opacity-60 hover:bg-primary/90 transition-all"
                        >
                          {loading ? "Submitting..." : "Send Review"}
                        </button>
                      </div>
                    </form>
                  </div>
                ) : (
                  <>
                    <p className=" font-cinzel font-semibold text-center text-md">TO Share Your Experience Please Login</p>
                    <Button onClick={() => router.push('/login')} className='text-white px-4 py-1.5'>
                      Login
                    </Button>
                  </>
                )
              }

            </div>
          </div>
        )
      }
    </div>
  )
}

export default Review
