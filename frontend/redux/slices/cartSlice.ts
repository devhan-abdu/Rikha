import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Cart } from "@/interface";
import { RootState } from "../store";

export interface CartSlice {
    cartItems: Cart[];
    totalQnt: number;
    totalPrice: number;
    totalDiscount: number;
    lastAction?: string | null;
}

const initialState: CartSlice = {
    cartItems: [],
    totalQnt: 0,
    totalPrice: 0,
    totalDiscount: 0,
    lastAction: null,
};

const calculateTotals = (state: CartSlice) => {
    state.totalQnt = state.cartItems.reduce((acc, item) => acc + item.quantity, 0);
    state.totalPrice = state.cartItems.reduce((acc, item) => acc + (item.price * item.quantity), 0);
    state.totalDiscount = state.cartItems.reduce(
        (acc, item) => acc + (item.price * (item.discount ?? 0) * item.quantity),
        0
    );
};

const cartSlice = createSlice({
    name: "cart",
    initialState,
    reducers: {
        setCartItem: (state, action: PayloadAction<Cart[]>) => {
            state.cartItems = action.payload;
            calculateTotals(state);
        },

        addCartItem: (state, action: PayloadAction<Cart>) => {
            const item = action.payload;
            const existingItem = state.cartItems.find(i => i.productId === item.productId);

            if (existingItem) {
                if (existingItem.quantity < existingItem.stock) existingItem.quantity += 1;
            } else {
                if (item.stock > 0) state.cartItems.push({ ...item, quantity: 1 });
            }

            calculateTotals(state);
            state.lastAction = "addCartItem";
        },

        removeCartItem: (state, action: PayloadAction<number>) => {
            state.cartItems = state.cartItems.filter(i => i.productId !== action.payload);
            calculateTotals(state);
            state.lastAction = "removeCartItem";
        },

        updateCartQuantity: (state, action: PayloadAction<{ productId: number; quantity: number }>) => {
            const { productId, quantity } = action.payload;
            const item = state.cartItems.find(i => i.productId === productId);
            if (item) {
                item.quantity = quantity;
                calculateTotals(state);
                state.lastAction = "updateCartQuantity";
            }
        },

        increaseCartQuantity: (state, action: PayloadAction<number>) => {
            const item = state.cartItems.find(i => i.productId === action.payload);
            if (item && item.quantity < item.stock) {
                item.quantity += 1;
                calculateTotals(state);
                state.lastAction = "increaseCartQuantity";
            }
        },

        decreaseCartQuantity: (state, action: PayloadAction<number>) => {
            const item = state.cartItems.find(i => i.productId === action.payload);
            if (!item) return;
            if (item.quantity > 1) item.quantity -= 1;
            else state.cartItems = state.cartItems.filter(i => i.productId !== action.payload);
            calculateTotals(state);
            state.lastAction = "decreaseCartQuantity";
        },
        clearCart: () => ({ ...initialState }),


    },
});

export const selectCartItems = (state: RootState) => state.cart.cartItems;
export const selectTotalQnt = (state: RootState) => state.cart.totalQnt;
export const selectTotalPrice = (state: RootState) => state.cart.totalPrice;
export const selectDiscount = (state: RootState) => state.cart.totalDiscount;

export const {
    addCartItem,
    removeCartItem,
    increaseCartQuantity,
    decreaseCartQuantity,
    clearCart,
    setCartItem,
    updateCartQuantity,
} = cartSlice.actions;

export default cartSlice.reducer;
