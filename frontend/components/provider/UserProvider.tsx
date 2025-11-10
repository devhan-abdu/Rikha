"use client"
import { useEffect, ReactNode } from "react";
import { useAppDispatch } from "@/redux/hooks";
import { setUser, setLoading } from "@/redux/slices/authSlice";
import { fetchMe } from "@/lib/auth/fetchme";

export function UserProvider({ children }: { children: ReactNode }) {
  const dispatch = useAppDispatch();

  useEffect(() => {
    const loadUser = async () => {
      dispatch(setLoading(true));
      try {
        const user = await fetchMe();
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
