"use client"
import { motion } from "framer-motion";
import { useForm, SubmitHandler } from "react-hook-form"
import { ResetPasswordData, ResetPasswordSchema, } from '@/interface';
import { zodResolver } from '@hookform/resolvers/zod';
import Link from 'next/link';
import { useRouter, useSearchParams } from "next/navigation";
import { toast } from "react-toastify";
import api from "@/lib/api";
import { useAppDispatch } from "@/redux/hooks";
import { setUser } from "@/redux/slices/authSlice";
import { Button } from "@/components/ui/button";
import { InputField } from "@/components/ui/InputField";
import { AxiosError } from "axios";

const ResetPasswordForm = () => {
  const searchParams = useSearchParams();
  const router = useRouter();
  const token = searchParams.get('token');
  const email = searchParams.get('email');
  const dispatch = useAppDispatch();



  const {
    register,
    handleSubmit,
    setError,
    formState: { errors, isSubmitting }
  } = useForm<ResetPasswordData>({
    resolver: zodResolver(ResetPasswordSchema),
  });

  if (!token || !email) {
    return <div className="text-center mt-10 h-[60px] flex flex-col items-center justify-center gap-4">
      <p className="text-xl">Invalid password reset link</p>
      <Link href="/register" className="text-primary">Back to Sign Up</Link>
    </div>;
  }

  const onSubmit: SubmitHandler<ResetPasswordData> = async ({ password }) => {
    try {
      const res = await api.put(`/auth/reset-password/${token}`, { email, password });
      const user = res.data.data;
      dispatch(setUser(user))
      toast.success("Password reset successful");
      router.push("/login")
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
    <div className='my-16 p-6 md:p-10 '>
      <motion.div
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className='space-y-2 max-w-[430px] mx-auto '>
        <h2 className='text-2xl  font-cinzel font-bold text-center'>
          SET A NEW PASSWORD
        </h2>
        <p className='text-center text-gray-600 text-sm'>
          Enter your new password below to update your account credentials.
        </p>

        <form onSubmit={handleSubmit(onSubmit)} className='mt-8 space-y-5 '>
          <InputField
            label="Password *"
            name="password"
            type="password"
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
          {
            errors.root && (
              <div className='text-red-500 -mt-5'>{errors.root.message}</div>
            )
          }
          <Button type='submit' disabled={isSubmitting} className='cursor-pointer my-2 w-full px-3 py-1.5 rounded-md bg-primary text-white font-cinzel '> {isSubmitting ? "Resetting..." : "Reset Password"}</Button>
          <p className="text-md text-gray-900 text-center">
            Don&rsquo;t get the email? <Link href="/forget-password" className="text-primary ">Try again</Link>
          </p>
        </form>
      </motion.div>
    </div>
  )
}

export default ResetPasswordForm
