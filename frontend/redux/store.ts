import { configureStore } from "@reduxjs/toolkit";
import cartReducer from './slices/cartSlice'
import userReducer from './slices/authSlice'
import selectedItemsReducer from './slices/selectedItemsSlice'
import { cartMiddleware } from "./middleware/cartMiddleware";

export const store = configureStore({
    reducer: {
        cart: cartReducer,
        user: userReducer,
        selectedItems: selectedItemsReducer,
    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware().concat(cartMiddleware)
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
export type AppStore = typeof store
