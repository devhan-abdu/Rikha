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
import { AxiosError } from "axios";


const EmailVerificationPage = () => {
	const [code, setCode] = useState<string[]>(["", "", "", "", "", ""]);
	const [submitted, setSubmitted] = useState(false)
	const inputRefs = useRef<HTMLInputElement[]>([]);
	const dispatch = useAppDispatch();
	const router = useRouter();

	const {
		handleSubmit,
		setValue,
		setError,
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
			dispatch(setUser(res.data.data))
			router.push("/");
		} catch (err) {
			const error = err as AxiosError<{ success: boolean, message: string }>
			setSubmitted(true);

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
		e.preventDefault();
		const pasted = e.clipboardData.getData("text").trim().slice(0, 6).split("");

		const newCode = [...code];
		pasted.forEach((char, i) => {
			newCode[i] = char;
		});

		setCode(newCode);
		setValue("otp", newCode.join(""));

		const nextIndex = Math.min(pasted.length, 6) - 1;
		inputRefs.current[nextIndex]?.focus();
	};


	useEffect(() => {
		if (code.every((c) => c !== "") && !submitted) {
			handleSubmit(onSubmit)();
			setSubmitted(true);
		}
	}, [code, submitted, handleSubmit, onSubmit]);


	return (
		<div className='max-w-md w-full mx-auto my-32'>
			<motion.div
				initial={{ opacity: 0, y: -50 }}
				animate={{ opacity: 1, y: 0 }}
				transition={{ duration: 0.5 }}
				className='bg-white p-8 rounded-2xl '
			>
				<h2 className='text-2xl font-bold text-center font-cinzel'>VERIFY YOUR EMAIL</h2>
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
