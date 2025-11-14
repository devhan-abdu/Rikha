"use client"
import React from 'react'
import Link from 'next/link'
import { motion } from "framer-motion";
import { useForm, SubmitHandler } from 'react-hook-form'
import { SignInFormData, signInSchema } from '@/interface';
import { zodResolver } from '@hookform/resolvers/zod';
import { toast } from 'react-toastify';
import { useRouter, useSearchParams } from 'next/navigation';
import { useAppDispatch } from '@/redux/hooks';
import { setUser } from '@/redux/slices/authSlice';
import OAuthButtons from '@/components/ui/OAuthButtons';
import api from '@/lib/api';
import { Button } from '@/components/ui/button';
import { InputField } from '@/components/ui/InputField';
import { AxiosError } from 'axios';



const LoginContent = () => {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const searchParams = useSearchParams();

  const {
    register,
    handleSubmit,
    setError,
    formState: { errors, isSubmitting }
  } = useForm<SignInFormData>({
    resolver: zodResolver(signInSchema),
    shouldFocusError: true,
  })

  const onSubmit: SubmitHandler<SignInFormData> = async (data: SignInFormData) => {
    try {
      const res = await api.post('/auth/login', data)
      const user = res.data.data;
      dispatch(setUser(user))
      toast.success("Login Successfully!");
      const redirectTo = searchParams.get('redirect') || '/';
      router.push(redirectTo)
    } catch (err) {
      const error = err as AxiosError<{ success: boolean, message: string }>

      if (!error?.response?.status) {
        toast.error("Network error: Could not connect to the server.")
        return
      }

      if (error?.response.status >= 400 && error?.response.status < 500) {
        setError("root", {
          type: "manual",
          message: error?.response.data.message || "Invalid Credential"
        });
        return

      }
      if (error?.response.status >= 500) {
        toast.error("An internal server error occurred. Please try again later.");
        return
      }
      toast.error("An unexpected error occurred.");
    }
  }


  return (
    <div className=' my-16 p-6 md:p-10 '>
      <motion.div
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className=' max-w-[430px] mx-auto'>
        <h2 className='text-2xl  font-cinzel font-bold text-center my-10 '>SIGN IN TO YOUR ACCOUNT</h2>
        <form onSubmit={handleSubmit(onSubmit)} className='space-y-5 md:space-y-6 '>
          <InputField
            label="Email *"
            name="email"
            register={register("email")}
            error={errors.email?.message}
          />
          <InputField
            label="Password *"
            name="password"
            type="password"
            register={register("password")}
            error={errors.password?.message}
          />
          <div>
            <Link href='/forget-password' className="text-sm font-medium text-primary hover:underline block text-end leading-0">Forgot password ?</Link>
            {errors.root && <p className="text-red-500 text-xs ">{errors.root.message}</p>}
          </div>


          <Button
            className="cursor-pointer my-2 w-full px-3 py-1.5 rounded-md bg-primary text-white font-cinzel text-md"
            disabled={isSubmitting}
          >
            {isSubmitting ? 'Signing in...' : 'Sign in'}
          </Button>
        </form>
        <OAuthButtons />
        <p className="text-md text-gray-900 text-center my-8">
          Don&rsquo;t have an account yet? <Link href="/register" className="font-medium text-primary hover:underline ">Sign up</Link>
        </p>
      </motion.div>
    </div>
  )
}

export default LoginContent
