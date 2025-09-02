'use client'
import React from 'react'
import { motion } from 'framer-motion'
import { useForm, SubmitHandler } from 'react-hook-form'
import { ForgetPasswordData, ForgetPasswordSchema } from '@/interface'
import { zodResolver } from '@hookform/resolvers/zod'
import Link from 'next/link'
import { toast } from 'react-toastify'

const ForgetPassword = () => {

    const {
        register,
        handleSubmit,
        formState: { errors, isSubmitting }
    } = useForm<ForgetPasswordData>({
        resolver: zodResolver(ForgetPasswordSchema)
    });

    const onSubmit: SubmitHandler<ForgetPasswordData> = async (data: ForgetPasswordData) => {
        try {
            const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/auth/forgot-password`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(data)
            });

            const json = await response.json();
            if (!response.ok) {
                throw new Error(json.message || "unable to send password reste email");
            }
            toast.success("Password reset link sent! Please check your email");

        } catch (error: any) {
            toast.error("Something went wrong ")
        }
    }


    return (
        <div className='my-16 p-6 md:p-10 '>
            <motion.div
                initial={{ opacity: 0, y: -50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className='space-y-2 max-w-[430px] mx-auto '>
                <h2 className='text-2xl md:text-3xl font-cinzel font-bold text-center '>Reset Password</h2>
                <p className='text-center text-gray-600 text-sm'>type your email so we can send you a password recovery email</p>
                <form onSubmit={handleSubmit(onSubmit)} className='mt-8 space-y-5 '>
                    <input type="email"  {...register("email")} placeholder='your email*' className='rounded-md px-4 py-2 border border-gray-500 w-full' />
                    {errors.email && (
                        <p className='text-red-500 text-sm text-center'>{errors.email.message}</p>
                    )}
                    <button type='submit' disabled={isSubmitting} className='cursor-pointer my-2 w-full px-3 py-1.5 rounded-md bg-primary text-white font-cinzel '>Reset Password</button>
                    <p className="text-md text-gray-900 text-center">
                        Go to <Link href="/signin" className="font-medium text-primary hover:underline ">Sign In</Link>
                    </p>
                </form>
            </motion.div>
        </div>
    )
}

export default ForgetPassword
