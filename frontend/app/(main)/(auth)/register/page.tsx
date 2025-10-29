"use client"
import React, { FC } from 'react'
import Link from 'next/link'
import { signUpSchema, SignUpFormData } from '@/interface'
import { SubmitHandler, useForm } from 'react-hook-form'
import { zodResolver } from "@hookform/resolvers/zod"
import { useRouter } from 'next/navigation'
import { motion } from "framer-motion";
import { toast } from 'react-toastify';
import GoogleButton from '@/components/ui/GoogleButton'
import api from '@/lib/api'
import { Button } from '@/components/ui/button'




const Register: FC = () => {
  const router = useRouter();

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<SignUpFormData>({
    resolver: zodResolver(signUpSchema)
  })

  const onSubmit: SubmitHandler<SignUpFormData> = async (data: SignUpFormData) => {
    try {
      const { confirmPassword, ...sanitizedData } = data
      await api.post("/auth/register", sanitizedData)
      localStorage.setItem("verify_email", data.email)

      toast.success('Sign up  successfully! pls verify your email');
      router.push('/verify-email')
    } catch (error: any) {
      const message = error.response?.data?.message || "Something went wrong";
      toast.error(message);
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
          <Button
            type="submit"
            className="cursor-pointer my-2 w-full px-3 py-1.5 rounded-md bg-primary text-white font-cinzel"
            disabled={isSubmitting}
          >
            {isSubmitting ? "Creating an account..." : "Create an account"}
          </Button>
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

export default Register
