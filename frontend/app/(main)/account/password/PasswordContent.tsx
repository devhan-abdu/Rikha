"use client"
import { Button } from "@/components/ui/button"
import { InputField } from "@/components/ui/InputField"
import { ChangePasswordData, ChangePasswordSchema } from "@/interface"
import api from "@/lib/api"
import { zodResolver } from "@hookform/resolvers/zod"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { useForm } from "react-hook-form"
import { toast } from "react-toastify"


const PasswordContent = () => {
    const router = useRouter()

    const {
        register,
        handleSubmit,
        reset,
        formState: { errors, isSubmitting }
    } = useForm<ChangePasswordData>({
        resolver: zodResolver(ChangePasswordSchema)
    })

    const onSubmit = async (data: ChangePasswordData) => {
        try {
            const res = await api.patch("/user/change-password", data)
            toast.success(res.data.message)
            reset({
                password: "",
                newPassword: "",
                confirmNewPassword: ""
            })

            router.push("/login")

        } catch (err) {
            console.log(err)
            toast.error("Failed to update password");
        }
    }

    return (
        <div className="shadow-xl p-6 py-16  min-h-screen">
            <div className="rounded-xl  space-y-10 max-w-sm mx-auto ">
                <h2 className="text-3xl font-semibold font-cinzel text-center mb-6 ">Change Password</h2>
                <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4   ">
                    <div className="mb-2">
                        <InputField
                            label="Password *"
                            name="password"
                            register={register}
                            error={errors.password?.message}
                            type="password"
                        />
                        <Link href='/forget-password' className="text-sm font-medium text-blue-500 hover:underline block text-end mt-1">Forgot password ?</Link>
                    </div>
                    <InputField
                        label="New Password"
                        name="newPassword"
                        register={register}
                        error={errors.newPassword?.message}
                        type="password"
                    />
                    <InputField
                        label="Confirm Password"
                        name="confirmNewPassword"
                        register={register}
                        error={errors.confirmNewPassword?.message}
                        type="password"
                    />

                    <Button
                        type="submit"
                        disabled={isSubmitting}
                        className="bg-primary hover:opacity-90 text-white px-6 py-3 rounded-lg mt-2 w-max"
                    >
                        {isSubmitting ? "Updating Password..." : "Update Password"}
                    </Button>
                </form>
            </div>
        </div>
    )
}

export default PasswordContent
