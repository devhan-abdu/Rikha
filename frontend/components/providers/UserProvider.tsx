"use client"

import { UserDetails } from "@/interface";
import { useAppDispatch } from "@/redux/hooks";
import { setUser } from "@/redux/slices/authSlice";
import { ReactNode, useEffect } from "react";

export function UserProvider({user, children}: { user: UserDetails, children: ReactNode}) {
    const dispatch = useAppDispatch();

    useEffect(() => {
        if(user) dispatch(setUser(user))
    }, [user, dispatch])

    return <>{children}</>
}