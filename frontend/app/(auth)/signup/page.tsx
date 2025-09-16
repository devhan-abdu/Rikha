"use client"
import React, { FC } from 'react'
import Link from 'next/link'
import { signUpSchema, SignUpFormData } from '@/interface'
import { SubmitHandler, useForm } from 'react-hook-form'
import { zodResolver } from "@hookform/resolvers/zod"
import { useRouter } from 'next/navigation'
import { motion } from "framer-motion";
import { toast } from 'react-toastify';
import  GoogleButton  from '@/components/ui/GoogleButton'




const SignUp: FC = () => {
  const router = useRouter();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<SignUpFormData>({
    resolver: zodResolver(signUpSchema)
  })

  const onSubmit: SubmitHandler<SignUpFormData> = async (data: SignUpFormData) => {
    try {
      const { confirmPassword, ...sanitizedData } = data

      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/auth/register`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(sanitizedData),
      });

      const json = await response.json();
      if (!response.ok) {
        throw new Error(json.message || "Registration failed");
      }
      localStorage.setItem("verify_email", data.email)
      toast.success('Sign up  successfully! pls verify your email');

      router.push('/verify-email')
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
        <h2 className='text-2xl md:text-3xl font-cinzel font-bold text-center my-8'>Create an account</h2>
        <form className='space-y-5 md:space-y-6 ' onSubmit={handleSubmit(onSubmit)}>
          <input type="text" placeholder='username*' id='username' {...register("name")} className='rounded-md px-4 py-2 border border-gray-600 w-full' />
          {
            errors.name && (
              <div className='text-red-500 -mt-5'>{errors.name.message}</div>
            )
          }
          <input type="email" placeholder='email*' id='email' {...register("email")} className='rounded-md px-4 py-2 border border-gray-600 w-full' />
          {
            errors.email && (
              <div className='text-red-500 -mt-5'>{errors.email.message}</div>
            )
          }
          <input type="password" placeholder='password' id='password' {...register("password")} className='rounded-md px-4 py-2 border border-gray-600 w-full' />
          {
            errors.password && (
              <div className='text-red-500 -mt-5'>{errors.password.message}</div>
            )
          }
          <input type="password" placeholder='confirmPassword' id='confirmPassword' {...register("confirmPassword")} className='rounded-md px-4 py-2 border border-gray-600 w-full' />
          {
            errors.confirmPassword && (
              <div className='text-red-500 -mt-5'>{errors.confirmPassword.message}</div>
            )
          }
          <button type='submit' className='cursor-pointer my-2 w-full px-3 py-1.5 rounded-md bg-primary text-white font-cinzel'>Create an account</button>
          {
            errors.root && (
              <div className='text-red-500 -mt-5'>{errors.root.message}</div>
            )
          }
        </form>
        <GoogleButton />
        <p className="text-md text-gray-900 text-center my-8">
          Already have an account? <Link href="/signin" className="font-medium text-primary hover:underline ">Login here</Link>
        </p>
      </motion.div>
    </div>
  )
}

export default SignUp
