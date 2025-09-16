// "use client"
// import { motion } from "framer-motion";
// import { useForm , SubmitHandler} from "react-hook-form"
// import { ResetPasswordData, ResetPasswordSchema, SignInFormData, signInSchema,  } from '@/interface';
// import { zodResolver } from '@hookform/resolvers/zod';
// import Link from 'next/link';
// import { useParams } from "next/navigation";


// const ResetPassword = () => {
//   const {token} = useParams();

//   const {
//     register,
//     handleSubmit,
//     formState: {errors, isSubmitting}
//   } = useForm<ResetPasswordData>({
//     resolver: zodResolver(ResetPasswordSchema),
//   });

//   const onSubmit: SubmitHandler<ResetPasswordData> = async (data: ResetPasswordData) => {
//     try {
//        const email = localStorage.getItem('reset-email');
//        const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/auth/reset-password/${token}`, {
//         method: "POST",
//         headers: {
//           "Content-Type": "application/json"
//         },
//         body:JSON.stringify({password:data.password, email})
//        })

//        const json = await response.json();
       
//     } catch(error) {

//     }
//   }
//   return (
//       <div className='my-16 p-6 md:p-10 '>
//             <motion.div
//                 initial={{ opacity: 0, y: -50 }}
//                 animate={{ opacity: 1, y: 0 }}
//                 transition={{ duration: 0.5 }}
//                 className='space-y-2 max-w-[430px] mx-auto '>
//                 <h2 className='text-2xl md:text-3xl font-cinzel font-bold text-center '>Set a New Passwordd</h2>
//                 <p className='text-center text-gray-600 text-sm'>type your email so we can send you a password recovery email</p>
//                 <form onSubmit={handleSubmit(onSubmit)} className='mt-8 space-y-5 '>
//                     <input type="email"  {...register("password")} placeholder='your email*' className='rounded-md px-4 py-2 border border-gray-500 w-full' />
//                     {errors.password && (
//                         <p className='text-red-500 text-sm text-center'>{errors.password.message}</p>
//                     )}
//                     <input type="password"  {...register("confirmPassword")} placeholder='your email*' className='rounded-md px-4 py-2 border border-gray-500 w-full' />
//                     {errors.confirmPassword && (
//                         <p className='text-red-500 text-sm text-center'>{errors.confirmPassword.message}</p>
//                     )}
//                     <button type='submit' disabled={isSubmitting} className='cursor-pointer my-2 w-full px-3 py-1.5 rounded-md bg-primary text-white font-cinzel '>Reset Password</button>
//                     <p className="text-md text-gray-900 text-center">
//                         Didn't get the email? <Link href="/forgot-password" className="text-blue-600 underline">Try again</Link>
//                     </p>
//                 </form>
//             </motion.div>
//         </div>
//   )
// }

// export default ResetPassword
