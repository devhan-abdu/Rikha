"use client"

import { fetchMe } from "@/lib/auth/fetchme";
import { useAppDispatch } from "@/redux/hooks";
import { setUser } from "@/redux/slices/authSlice";
import { ReactNode, useEffect } from "react";

export function UserProvider({ children }: { children: ReactNode }) {
    const dispatch = useAppDispatch();

    useEffect(() => {
        const fetch = async () => {
            const user = await fetchMe();
            dispatch(setUser(user))
        }
        fetch();
    }, [])

    return <>{children}</>
}