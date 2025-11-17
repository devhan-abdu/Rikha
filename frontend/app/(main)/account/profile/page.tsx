"use client";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { InputField } from "@/components/ui/InputField";
import { ProfileData, ProfileSchema, UserDetails } from "@/interface";
import api from "@/lib/api";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { selectUser, setUser } from "@/redux/slices/authSlice";
import { zodResolver } from "@hookform/resolvers/zod";
import { X, Upload } from "lucide-react";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import { CldUploadWidget } from 'next-cloudinary';
import type { CloudinaryUploadWidgetResults } from "next-cloudinary";
import { AxiosError } from "axios";

export default function ProfilePage() {
  const dispatch = useAppDispatch();
  const user = useAppSelector(selectUser)


  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<ProfileData>({
    resolver: zodResolver(ProfileSchema),
    defaultValues: {
      firstName: "",
      lastName: "",
      email: "",
      username: "",
      phoneNumber: "",
    },
    values: user ? {
      firstName: user.firstName ?? "",
      lastName: user.lastName ?? "",
      email: user.email ?? "",
      username: user.username ?? "",
      phoneNumber: user.phoneNumber ?? ""
    } : undefined,

  });

  const [newAvatarUrl, setNewAvatarUrl] = useState<string | null>(null);
  const currentAvatar = newAvatarUrl ?? user?.avatarUrl ?? null
  console.log(newAvatarUrl, "new Avater url")




  const handleCloudinaryUpload = (result: CloudinaryUploadWidgetResults) => {
    if (result.event === "success" && result.info && typeof result.info !== "string") {
      console.log("the image url")
      const url = result.info.secure_url
      setNewAvatarUrl(url)
    }
  }


  const removeImage = () => {
    setNewAvatarUrl(null)
  };


  const onSubmit = async (data: ProfileData) => {
    try {

      const avatarUrl = newAvatarUrl ?? user?.avatarUrl ?? null

      const payload = { ...data, avatarUrl }

      const res = await api.patch("/user/me", payload)

      dispatch(setUser(res.data.data))

      toast.success("Profile updated successfully");
    } catch (err) {
      const error = err as AxiosError<{ success: boolean, message: string }>
      const message = error?.response?.data?.message || "Something went wrong";
      toast.error(`${message}`);
    }

  };


  return (
    <div className=" p-6 py-16  min-h-screen">
      <div className="rounded-xl  space-y-10 max-w-2xl mx-auto">
        <h2 className="text-2xl sm:text-3xl font-semibold font-cinzel text-center ">Profile Settings</h2>


        <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-8 ">
          <div className="flex flex-col items-center gap-3 mb-4">
            <div className="relative">
              <Avatar className="w-20 h-20">
                <AvatarImage src={currentAvatar || undefined} />
                <AvatarFallback className="uppercase text-2xl bg-gray-200 font-cinzel border border-slate-400 shadow-md">
                  {user?.username?.slice(0, 2)}
                </AvatarFallback>
              </Avatar>

              {newAvatarUrl && (
                <button type="button" onClick={removeImage} className="absolute -top-2 -right-2 bg-red-500 text-white p-1 rounded-full">
                  <X size={14} />
                </button>
              )}
            </div>

            <CldUploadWidget
              uploadPreset={process.env.NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET!}
              onSuccess={handleCloudinaryUpload}
              options={{
                multiple: false,
                folder: 'user-avatars',
              }}>
              {({ open }) => {
                return (
                  <Button
                    type="button"
                    onClick={() => open()}
                    variant="outline"
                    className="gap-3 hover:scale-105 transition-all shadow-md"
                  >
                    <Upload size={20} />
                    Change Photo
                  </Button>
                )
              }}
            </CldUploadWidget>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">

            <InputField label="First Name" name="firstName" register={register("firstName")} error={errors.firstName?.message} />
            <InputField label="Last Name" name="lastName" register={register("lastName")} error={errors.lastName?.message} />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">


            <InputField label="Email" name="email" register={register("email")} error={errors.email?.message} />
            <InputField label="username" name="username" register={register("username")} error={errors.username?.message} />
          </div>
          <div className="max-w-max">
            <InputField label="Phone Number" name="phoneNumber" register={register("phoneNumber")} error={errors.phoneNumber?.message} className="" />
          </div>


          <Button type="submit" disabled={isSubmitting} className="px-6 py-2 rounded-lg w-full md:w-40 mr-auto text-white">
            {isSubmitting ? "Saving..." : "Save Changes"}
          </Button>
        </form>
      </div>
    </div>
  );
}


