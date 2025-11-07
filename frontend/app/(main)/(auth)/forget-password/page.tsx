'use client'
import React from 'react'
import { motion } from 'framer-motion'
import { useForm, SubmitHandler } from 'react-hook-form'
import { ForgetPasswordData, ForgetPasswordSchema } from '@/interface'
import { zodResolver } from '@hookform/resolvers/zod'
import Link from 'next/link'
import { toast } from 'react-toastify'
import api from '@/lib/api'
import { Button } from '@/components/ui/button'
import { InputField } from '@/components/ui/InputField'

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
            await api.post('/auth/forgot-password', data)
            toast.success("Password reset link sent! Please check your email");
        } catch (error) {
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

                    <InputField
                        label="Email *"
                        name="email"
                        register={register}
                        error={errors.email?.message}
                    />

                    <Button
                        type="submit"
                        disabled={isSubmitting}
                        className="cursor-pointer my-2 w-full px-3 py-1.5 rounded-md bg-primary text-white font-cinzel"
                    >
                        {isSubmitting ? "Resetting..." : "Reset Password"}
                    </Button>
                    <p className="text-md text-gray-900 text-center">
                        Go to <Link href="/login" className="font-medium text-primary hover:underline ">Login</Link>
                    </p>
                </form>
            </motion.div>
        </div>
    )
}

export default ForgetPassword
