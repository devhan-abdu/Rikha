import { Middleware } from "@reduxjs/toolkit";
import {
    addCartItem,
    clearCart,
    decreaseCartQuantity,
    increaseCartQuantity,
    removeCartItem,
    updateCartQuantity,
    setCartItem,
} from "../slices/cartSlice";
import api from "@/lib/api";
import { toast } from "react-toastify";


export const cartMiddleware: Middleware = (store) => (next) => async (action: any) => {
    const state = store.getState();
    const user = state.user.user;

    if (!user) {
        const result = next(action);
        localStorage.setItem("cart", JSON.stringify(store.getState().cart.cartItems));
        return result;
    }

    switch (action.type) {
        case addCartItem.type: {
            next(action);
            const item = action.payload;

            try {
                const response = await api.post("/cart", {
                    productId: item.productId,
                    quantity: 1,
                });

                next(setCartItem(response.data.data));
            } catch (error) {
                toast.error("Failed to add item to cart");
            }
            break;
        }

        case updateCartQuantity.type: {
            next(action);
            const { productId, quantity } = action.payload;

            try {
                const response = await api.patch(`/cart/${productId}`, { quantity });
                next(setCartItem(response.data.data));
            } catch {
                toast.error("Failed to update cart quantity");
            }
            break;
        }

        case increaseCartQuantity.type:
        case decreaseCartQuantity.type: {
            next(action);
            const { cartItems } = store.getState().cart;
            const item = cartItems.find((i: any) => i.productId === action.payload);
            if (!item) break;

            try {
                const response = await api.patch(`/cart/${item.productId}`, { quantity: item.quantity });
                next(setCartItem(response.data.data));
            } catch {
                toast.error("Failed to update item quantity");
            }
            break;
        }

        case removeCartItem.type: {
            next(action);
            const productId = action.payload;

            try {
                const response = await api.delete(`/cart/${productId}`);
                next(setCartItem(response.data.data));
            } catch {
                toast.error("Failed to remove cart item");
            }
            break;
        }
        case clearCart.type: {
            next(action);
            try {
                await api.delete("/cart");
            } catch {
                toast.error("Failed to clear cart");
            }
            break;
        }

        default:
            next(action);
    }
};
