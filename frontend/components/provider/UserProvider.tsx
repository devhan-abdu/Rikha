"use client"
import { useEffect, ReactNode } from "react";
import { useAppDispatch } from "@/redux/hooks";
import { setUser, setLoading } from "@/redux/slices/authSlice";
import { featchMe } from "@/lib/auth/featchme";

export function UserProvider({ children }: { children: ReactNode }) {
  const dispatch = useAppDispatch();

  useEffect(() => {
    const loadUser = async () => {
      dispatch(setLoading(true));
      try {
        const user = await featchMe();
        dispatch(setUser(user));
      } catch (error) {
        console.error("Error fetching user:", error);
      } finally {
        dispatch(setLoading(false));
      }
    };

    loadUser();
  }, [dispatch]);

  return <>{children}</>;
}
