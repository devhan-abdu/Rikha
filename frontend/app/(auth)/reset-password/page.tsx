"use client"
import { motion } from "framer-motion";
import { useForm, SubmitHandler } from "react-hook-form"
import { ResetPasswordData, ResetPasswordSchema, SignInFormData, signInSchema, } from '@/interface';
import { zodResolver } from '@hookform/resolvers/zod';
import Link from 'next/link';
import { useSearchParams,useRouter } from "next/navigation";
import { toast } from "react-toastify";

const ResetPassword = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const token = searchParams.get('token');  
  const email = searchParams.get('email');
    if (!token || !email) {
        return <div className="text-center mt-10">Invalid password reset link.</div>;
    }

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting }
  } = useForm<ResetPasswordData>({
    resolver: zodResolver(ResetPasswordSchema),
  });

  const onSubmit: SubmitHandler<ResetPasswordData> = async ({password}) => {
    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/auth/reset-password/${token}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({email,password})
      });
      if (!response.ok) {
        throw new Error("Failed to reset password");
      }
      router.push('/signin');
      toast.success("Password reset successful! Please sign in with your new password.");
    } catch (error) {
      toast.error("Something went wrong. Please try again.");
    }
  }
  return (
    <div className='my-16 p-6 md:p-10 '>
      <motion.div
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className='space-y-2 max-w-[430px] mx-auto '>
        <h2 className='text-2xl md:text-3xl font-cinzel font-bold text-center '>Set a New Passwordd</h2>
        <p className='text-center text-gray-600 text-sm'>type your email so we can send you a password recovery email</p>
        <form onSubmit={handleSubmit(onSubmit)} className='mt-8 space-y-5 '>
          <input type="password"  {...register("password")} placeholder='enter new password*' className='rounded-md px-4 py-2 border border-gray-500 w-full' />
          {errors.password && (
            <p className='text-red-500 text-sm text-center'>{errors.password.message}</p>
          )}
          <input type="password"  {...register("confirmPassword")} placeholder='confirm password' className='rounded-md px-4 py-2 border border-gray-500 w-full' />
          {errors.confirmPassword && (
            <p className='text-red-500 text-sm text-center'>{errors.confirmPassword.message}</p>
          )}
          <button type='submit' disabled={isSubmitting} className='cursor-pointer my-2 w-full px-3 py-1.5 rounded-md bg-primary text-white font-cinzel '>Reset Password</button>
          <p className="text-md text-gray-900 text-center">
            Didn't get the email? <Link href="/forgot-password" className="text-primary underline">Try again</Link>
          </p>
        </form>
      </motion.div>
    </div>
  )
}

export default ResetPassword
