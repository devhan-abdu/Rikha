import { createSlice } from "@reduxjs/toolkit";
import { PayloadAction } from "@reduxjs/toolkit";
import { Cart } from "@/interface";
import { RootState } from "../store";

export interface CartSlice {
    cartItems: Cart[];
    totalQnt: number;
    totalPrice: number;
}

const initialState: CartSlice = {
    cartItems: [],
    totalQnt: 0,
    totalPrice: 0
}

const cartSlice = createSlice({
    name: 'cart',
    initialState,
    reducers: {
        addCartItem: (state, action: PayloadAction<Cart>) => {
            const item = action.payload
            const existingItem = state.cartItems.find((cartItems) => cartItems.productId === item.productId)
            if (existingItem) {
                existingItem.quantity += 1;
            }
            else {
                state.cartItems.push({ ...item, quantity: 1 })
            }
            state.totalQnt += 1;
            state.totalPrice += item.price;
        },
        removeCartItem: (state, action: PayloadAction<number>) => {
            const id = action.payload
            state.cartItems = state.cartItems.filter((i) => id !== i.productId)
            state.totalQnt = state.cartItems.reduce((count, item) => count + item.quantity, 0)
            state.totalPrice = state.cartItems.reduce((count, item) => count + item.quantity * item.price, 0)
        },
        increaseCartQuantity: (state, action: PayloadAction<number>) => {
            const id = action.payload;
            const existingItem = state.cartItems.find(item => item.productId === id);
            if (!existingItem) return;
            existingItem.quantity += 1;
            state.totalQnt += 1;
            state.totalPrice += existingItem.price;

        },
        decreaseCartQuantity: (state, action: PayloadAction<number>) => {
            const id = action.payload;
            const existingItem = state.cartItems.find(item => item.productId === id);
            if (!existingItem) return;
            if (existingItem.quantity > 1) {
                existingItem.quantity -= 1;
            }
            else {
                state.cartItems = state.cartItems.filter((i) => id !== i.productId)
            }
            state.totalQnt -= 1;
            state.totalPrice -= existingItem.price;
        },
    }
})

export const selectCartItems = (state: RootState) => state.cart.cartItems;
export const selectTotalQnt = (state: RootState) => state.cart.totalQnt;
export const selectTotalPrice = (state: RootState) => state.cart.totalPrice;

export const { addCartItem, removeCartItem, increaseCartQuantity, decreaseCartQuantity } = cartSlice.actions;
export default cartSlice.reducer;