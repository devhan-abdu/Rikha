"use client"
import { useEffect, ReactNode, useCallback } from "react";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { selectUser } from "@/redux/slices/authSlice";
import api from "@/lib/api";
import { setCartItem } from "@/redux/slices/cartSlice";
import { Cart } from "@/interface";
import { toast } from "react-toastify";

export function CartProvider({ children }: { children: ReactNode }) {
    const user = useAppSelector(selectUser)
    const dispatch = useAppDispatch();

    const loadCart = useCallback(async () => {
        try {
            const cartString = localStorage.getItem("cart")
            let cartItems: Cart[] = cartString ? JSON.parse(cartString) : []

            if (user) {

                if (cartItems.length > 0) {
                    const items = cartItems.map(item => ({ productId: item.productId, quantity: item.quantity }))
                    const response = await api.post('/cart/merge', { cartItems: items })
                    cartItems = response.data.data
                    localStorage.removeItem("cart");
                } else {
                    const response = await api.get('/cart')
                    cartItems = response.data.data

                }
            }

            dispatch(setCartItem(cartItems))
        } catch (error) {
            console.log(error)
            toast.error("Could not sync cart. please retry later")
        }
    }, [user, dispatch])

    useEffect(() => {
        loadCart()
    }, [loadCart])

    return <>{children}</>;
}
