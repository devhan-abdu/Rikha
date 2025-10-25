import { createSlice } from "@reduxjs/toolkit";
import { PayloadAction } from "@reduxjs/toolkit";
import { Cart } from "@/interface";
import { RootState } from "../store";

export interface CartSlice {
    cartItems: Cart[];
    totalQnt: number;
    totalPrice: number;
    totalDiscount: number;
}

const initialState: CartSlice = {
    cartItems: [],
    totalQnt: 0,
    totalPrice: 0,
    totalDiscount: 0,
}

const calculateTotals = (state: CartSlice) => {
    state.totalQnt = state.cartItems.reduce((acc, item) => acc + item.quantity, 0);
    state.totalPrice = state.cartItems.reduce((acc, item) => acc + (item.price * item.quantity), 0);
    state.totalDiscount = state.cartItems.reduce((acc, item) => acc + (item.price * (item.discount ?? 0) * item.quantity), 0)
}

const cartSlice = createSlice({
    name: 'cart',
    initialState,
    reducers: {
        addCartItem: (state, action: PayloadAction<Cart>) => {
            const item = action.payload
            const existingItem = state.cartItems.find((cartItems) => cartItems.productId === item.productId)
            if (existingItem) {
                if (existingItem.quantity < existingItem.stock) existingItem.quantity += 1;
            }
            else {
                if (item.stock > 0) state.cartItems.push({ ...item, quantity: 1 });
            }
            calculateTotals(state);
        },
        removeCartItem: (state, action: PayloadAction<number>) => {
            const id = action.payload
            state.cartItems = state.cartItems.filter((i) => id !== i.productId)
            calculateTotals(state);
        },
        increaseCartQuantity: (state, action: PayloadAction<number>) => {
            const id = action.payload;
            const item = state.cartItems.find(item => item.productId === id);
            if (item && item.quantity < item.stock) {
                item.quantity += 1;
                calculateTotals(state);
            }

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
            calculateTotals(state);
        },
        clearCart: () => ({ ...initialState })
    }
})

export const selectCartItems = (state: RootState) => state.cart.cartItems;
export const selectTotalQnt = (state: RootState) => state.cart.totalQnt;
export const selectTotalPrice = (state: RootState) => state.cart.totalPrice;
export const selectDiscount = (state: RootState) => state.cart.totalDiscount

export const { addCartItem, removeCartItem, increaseCartQuantity, decreaseCartQuantity, clearCart } = cartSlice.actions;
export default cartSlice.reducer;