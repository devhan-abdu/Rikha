"use client"
import { motion } from "framer-motion";
import { useForm, SubmitHandler } from "react-hook-form"
import { ResetPasswordData, ResetPasswordSchema, } from '@/interface';
import { zodResolver } from '@hookform/resolvers/zod';
import Link from 'next/link';
import { useSearchParams } from "next/navigation";
import { toast } from "react-toastify";
import api from "@/lib/api";
import { useAppDispatch } from "@/redux/hooks";
import { setUser } from "@/redux/slices/authSlice";
import { Button } from "@/components/ui/button";

const ResetPassword = () => {
  const searchParams = useSearchParams();
  const token = searchParams.get('token');
  const email = searchParams.get('email');
  const dispatch = useAppDispatch();

  if (!token || !email) {
    return <div className="text-center mt-10 h-[60px] flex flex-col items-center justify-center gap-4">
      <p className="text-xl">Invalid password reset link</p>
      <Link href="/register" className="text-primary">Back to Sign Up</Link>
    </div>;
  }

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting }
  } = useForm<ResetPasswordData>({
    resolver: zodResolver(ResetPasswordSchema),
  });

  const onSubmit: SubmitHandler<ResetPasswordData> = async ({ password }) => {
    try {
      const res = await api.put(`/auth/reset-password/${token}`, { email, password });
      const { user } = res.data;
      dispatch(setUser(user))
      toast.success("Password reset successful");
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
        <h2 className='text-2xl md:text-3xl font-cinzel font-bold text-center '>Set a New Password</h2>
        <p className='text-center text-gray-600 text-sm'>type your email so we can send you a password recovery email</p>
        <form onSubmit={handleSubmit(onSubmit)} className='mt-8 space-y-5 '>
          <div>
            <input type="password"  {...register("password")} placeholder='enter new password*' className='rounded-md px-4 py-2 border border-gray-500 w-full' />
            {errors.password && (
              <p className='text-red-500 text-sm mt-1'>{errors.password.message}</p>
            )}
          </div>

          <div>
            <input type="password"  {...register("confirmPassword")} placeholder='confirm password' className='rounded-md px-4 py-2 border border-gray-500 w-full' />
            {errors.confirmPassword && (
              <p className='text-red-500 text-sm mt-1'>{errors.confirmPassword.message}</p>
            )}
          </div>

          <Button type='submit' disabled={isSubmitting} className='cursor-pointer my-2 w-full px-3 py-1.5 rounded-md bg-primary text-white font-cinzel '> {isSubmitting ? "Resetting..." : "Reset Password"}</Button>
          <p className="text-md text-gray-900 text-center">
            Don&rsquo;t get the email? <Link href="/forgot-password" className="text-primary ">Try again</Link>
          </p>
        </form>
      </motion.div>
    </div>
  )
}

export default ResetPassword
