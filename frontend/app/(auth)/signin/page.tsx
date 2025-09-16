"use client"
import React from 'react'
import Link from 'next/link'
import { motion } from "framer-motion";
import { useForm, SubmitHandler } from 'react-hook-form'
import { SignInFormData, signInSchema } from '@/interface';
import { zodResolver } from '@hookform/resolvers/zod';
import { toast } from 'react-toastify';
import { useRouter } from 'next/navigation';
import { useAppDispatch } from '@/redux/hooks';
import { setUser } from '@/redux/slices/authSlice';
import GoogleButton from '@/components/ui/GoogleButton';



const SignIn = () => {
  const router = useRouter();
  const dispatch = useAppDispatch();

  const {
    register,
    handleSubmit,
    formState: { errors  , isSubmitting}
  } = useForm<SignInFormData>({
    resolver: zodResolver(signInSchema)
  })

  const onSubmit: SubmitHandler<SignInFormData> = async (data: SignInFormData) => {
    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/auth/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data)
      })

      const json = await response.json();

      if (!response.ok) {
        throw new Error(json.message || "Login failed")
      }

      toast.success("Login Successfully!");
      dispatch(setUser(json.user));
      router.push('/')

    } catch (error: any) {
      toast.error("Something went wrong");
    }
  }


  return (
    <div className=' my-16 p-6 md:p-10 '>
      <motion.div
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className=' max-w-[430px] mx-auto'>
        <h2 className='text-2xl md:text-3xl font-cinzel font-bold text-center my-10'>Sign in to you account</h2>
        <form onSubmit={handleSubmit(onSubmit)} className='space-y-5 md:space-y-6 '>
          <input type="email"  {...register("email")} placeholder='your email*' className='rounded-md px-4 py-2 border border-gray-500 w-full' />
          {errors.email && (
            <p className='text-red-500 text-sm text-center'>{errors.email.message}</p>
          )}
          <input type="password"  {...register("password")} placeholder='password' className='rounded-md px-4 py-2 border border-gray-500 w-full' />
           {errors.password && (
            <p className='text-red-500 text-sm text-center'>{errors.password.message}</p>
          )}
          <Link href='/forget-password' className="text-sm font-medium text-primary hover:underline block text-end leading-0">Forgot password ?</Link>
          <button className='cursor-pointer my-2 w-full px-3 py-1.5 rounded-md bg-primary text-white font-cinzel' disabled={isSubmitting}>Sign in</button>
        </form>
        <GoogleButton/>
         <p className="text-md text-gray-900 text-center my-8">
            Don’t have an account yet? <Link href="/signup" className="font-medium text-primary hover:underline ">Sign up</Link>
          </p>
      </motion.div>
    </div>
  )
}

export default SignIn
