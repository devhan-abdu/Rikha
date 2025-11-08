"use client"

import { featchMe } from "@/lib/auth/featchme";
import { useAppDispatch } from "@/redux/hooks";
import { setLoading, setUser } from "@/redux/slices/authSlice";
import { ReactNode, useEffect } from "react";

export function UserProvider({ children }: { children: ReactNode }) {
    const dispatch = useAppDispatch();

    useEffect(() => {
        dispatch(setLoading(true));
        featchMe().then(user => {
            dispatch(setUser(user))
            dispatch(setLoading(false))
        })
    }, [dispatch])

    return <>{children}</>
}