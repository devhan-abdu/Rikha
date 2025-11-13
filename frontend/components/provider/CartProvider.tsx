"use client"
import { useEffect, ReactNode, useCallback } from "react";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { selectUser } from "@/redux/slices/authSlice";
import api from "@/lib/api";
import { setCartItem } from "@/redux/slices/cartSlice";
import { Cart } from "@/interface";

export function CartProvider({ children }: { children: ReactNode }) {
    const user = useAppSelector(selectUser)
    const dispatch = useAppDispatch();

    const loadCart = useCallback(async () => {
        try {
            const cartString = localStorage.getItem("cart")
            let cartItems: Cart[] = cartString ? JSON.parse(cartString) : []

            if (user) {

                if (cartItems.length > 0) {
                    const response = await api.post('/cart-merge', cartItems)
                    cartItems = response.data.data
                    localStorage.removeItem("cart");
                } else {
                    const response = await api.get('/cart')
                    cartItems = response.data.data

                }
                dispatch(setCartItem(cartItems))
            }
        } catch (error) {
            console.error("Error fetching user:", error);
        }
    }, [user])

    useEffect(() => {
        loadCart()
    }, [loadCart])

    return <>{children}</>;
}
