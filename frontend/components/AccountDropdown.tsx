"use client";
import * as React from "react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { clearUser, selectIsLoading, selectUser } from "@/redux/slices/authSlice";
import { ArrowRight, Package, User, MapPin, Lock } from "lucide-react";
import api from "@/lib/api";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";

export function AccountDropdown() {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const user = useAppSelector(selectUser)
  const isLoading = useAppSelector(selectIsLoading)

  const handleLogout = async () => {
    try {
      await api.post("/auth/logout");
      toast.success("Successfully logged out");
      dispatch(clearUser());
      router.push("/");
    } catch (error) {
      console.error(error);
      toast.error("Something went wrong");
    }
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <div>
          {isLoading ? (
            <div className="h-10 w-10 rounded-full bg-gray-200 animate-pulse" />
          ) : (
            <Avatar className="cursor-pointer">
              <AvatarImage src={user?.avatarUrl} />
              <AvatarFallback className="uppercase bg-gray-100 font-cinzel border-primary/30 shadow-md">
                {user?.username?.slice(0, 2)}
              </AvatarFallback>
            </Avatar>
          )}
        </div>
      </DropdownMenuTrigger>


      <DropdownMenuContent
        align="end"
        className="bg-white border border-slate-200 shadow-lg py-2 w-64 "
      >
        <DropdownMenuItem className="flex items-center gap-2 ">
          <Avatar className="cursor-pointer">
            <AvatarImage src={user?.avatarUrl} />
            <AvatarFallback className="uppercase">
              {user?.username?.slice(0, 2)}
            </AvatarFallback>
          </Avatar>
          <div className="">
            <p className="text-md font-semibold ">{user?.username?.split(" ")[0]}</p>
            <p>{user?.email}</p>
          </div>
        </DropdownMenuItem>
        <DropdownMenuSeparator className="my-1" />
        <DropdownMenuItem className="flex items-center gap-2 hover:bg-gray-100" onSelect={() => router.push("/account/profile")}>
          <User size={16} /> Profile
        </DropdownMenuItem>

        <DropdownMenuItem className="flex items-center gap-2 hover:bg-gray-100" onSelect={() => router.push("/account/orders")}>
          <Package size={16} /> Orders
        </DropdownMenuItem>
        <DropdownMenuItem className="flex items-center gap-2 hover:bg-gray-100" onSelect={() => router.push("/account/address")}>
          <MapPin size={16} /> Address
        </DropdownMenuItem>

        <DropdownMenuItem className="flex items-center gap-2 hover:bg-gray-100" onSelect={() => router.push("/account/password")}>
          <Lock size={16} /> Password
        </DropdownMenuItem>

        <DropdownMenuSeparator className="my-1 " />

        <DropdownMenuItem
          className="flex items-center gap-2 text-red-600 hover:bg-red-100"
          onSelect={handleLogout}
        >
          Logout
          <ArrowRight size={16} />
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}