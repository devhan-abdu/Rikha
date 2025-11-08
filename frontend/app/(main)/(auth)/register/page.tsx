"use client"
import React, { FC } from 'react'
import Link from 'next/link'
import { signUpSchema, SignUpFormData } from '@/interface'
import { SubmitHandler, useForm } from 'react-hook-form'
import { zodResolver } from "@hookform/resolvers/zod"
import { useRouter } from 'next/navigation'
import { motion } from "framer-motion";
import { toast } from 'react-toastify';
import OAuthButtons from '@/components/ui/OAuthButtons'
import api from '@/lib/api'
import { Button } from '@/components/ui/button'
import { InputField } from '@/components/ui/InputField'




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
      const { confirmPassword: __, ...sanitizedData } = data;
      await api.post("/auth/register", sanitizedData)
      localStorage.setItem("verify_email", data.email)

      toast.success('Sign up  successfully! pls verify your email');
      router.push('/verify-email')
    } catch (error) {
      console.log(error)
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
          <InputField
            label="User Name *"
            name="username"
            register={register("name")}
            error={errors.name?.message}
          />
          <InputField
            label="Email *"
            name="email"
            register={register("email")}
            error={errors.email?.message}
          />
          <InputField
            label="Password *"
            type="password"
            name="password"
            register={register("password")}
            error={errors.password?.message}
          />
          <InputField
            label="Confirm Password *"
            name="confirmPassword"
            type="password"
            register={register("confirmPassword")}
            error={errors.confirmPassword?.message}
          />
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
        <OAuthButtons />
        <p className="text-md text-gray-900 text-center my-8">
          Already have an account? <Link href="/signin" className="font-medium text-primary hover:underline ">Login here</Link>
        </p>
      </motion.div>
    </div>
  )
}

export default Register
