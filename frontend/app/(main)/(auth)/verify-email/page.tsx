"use client";

import { useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { useForm, SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { verifyEmailSchema, VerifyEmailData } from "@/interface";
import { motion } from "framer-motion";
import { toast } from 'react-toastify';
import { setUser } from "@/redux/slices/authSlice";
import { useAppDispatch } from "@/redux/hooks";
import api from "@/lib/api";


const EmailVerificationPage = () => {
	const [code, setCode] = useState<string[]>(["", "", "", "", "", ""]);
	const inputRefs = useRef<HTMLInputElement[]>([]);
	const dispatch = useAppDispatch();
	const router = useRouter();

	const {
		handleSubmit,
		setValue,
		formState: { errors, isSubmitting },
	} = useForm<VerifyEmailData>({
		resolver: zodResolver(verifyEmailSchema),
	});

	const onSubmit: SubmitHandler<VerifyEmailData> = async ({ otp }) => {
		try {
			const email = localStorage.getItem("verify_email");
			if (!email) throw new Error("No email found in localStorage");
			const res = await api.post('/auth/verify-email', { email, otp });

			localStorage.removeItem("verify_email");
			toast.success('Email verified successfully!');
			dispatch(setUser(res.data.user))
			router.push("/");
		} catch (error) {
			console.log(error)
			toast.error("Something went wrong");
		}
	};

	const handleChange = (index: number, value: string) => {
		const newCode = [...code];
		newCode[index] = value.slice(-1);
		setCode(newCode);
		setValue("otp", newCode.join(""));

		if (value && index < 5) {
			inputRefs.current[index + 1]?.focus();
		}
	};

	const handleKeyDown = (index: number, e: React.KeyboardEvent<HTMLInputElement>) => {
		if (e.key === "Backspace" && !code[index] && index > 0) {
			inputRefs.current[index - 1]?.focus();
		}
	};

	const handlePaste = (e: React.ClipboardEvent<HTMLInputElement>) => {
		const pasted = e.clipboardData.getData("text").slice(0, 6).split("");
		const newCode = Array(6).fill("");
		pasted.forEach((char, i) => (newCode[i] = char));
		setCode(newCode);
		setValue("otp", newCode.join(""));
		const nextIndex = pasted.length >= 6 ? 5 : pasted.length;
		inputRefs.current[nextIndex]?.focus();
	};

	useEffect(() => {
		if (code.every((c) => c !== "")) {
			handleSubmit(onSubmit)();
		}
	}, [code, handleSubmit, onSubmit]);

	return (
		<div className='max-w-md w-full mx-auto my-32'>
			<motion.div
				initial={{ opacity: 0, y: -50 }}
				animate={{ opacity: 1, y: 0 }}
				transition={{ duration: 0.5 }}
				className='bg-white p-8 rounded-2xl '
			>
				<h2 className='text-3xl font-bold text-center font-cinzel'>Verify Your Email</h2>
				<p className='text-center text-gray-700 mb-6'>
					Enter the 6-digit code sent to your email.
				</p>

				<form onSubmit={handleSubmit(onSubmit)} className='space-y-6'>
					<div className='flex justify-between gap-2'>
						{code.map((digit, index) => (
							<input
								key={index}
								ref={(el) => { inputRefs.current[index] = el! }}
								type='text'
								maxLength={1}
								value={digit}
								onChange={(e) => handleChange(index, e.target.value)}
								onKeyDown={(e) => handleKeyDown(index, e)}
								onPaste={handlePaste}
								className='w-12 h-12 text-center text-2xl bg-gray-700 text-white rounded border border-gray-500 focus:outline-none focus:ring-2 '
							/>
						))}
					</div>

					{errors.otp && (
						<p className='text-red-500 text-sm text-center'>{errors.otp.message}</p>
					)}

					<motion.button
						whileHover={{ scale: 1.05 }}
						whileTap={{ scale: 0.95 }}
						type="submit"
						disabled={isSubmitting || code.some((c) => c === "")}
						className="w-full bg-primary text-white py-3 rounded shadow disabled:opacity-50"
					>
						{isSubmitting ? "Verifying..." : "Verify Email"}
					</motion.button>

				</form>
			</motion.div>
		</div>
	);
};

export default EmailVerificationPage;
