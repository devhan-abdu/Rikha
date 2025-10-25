import { configureStore } from "@reduxjs/toolkit";
import cartReducer from './slices/cartSlice'
import userReducer from './slices/authSlice'
import selectedItemsReducer from './slices/selectedItemsSlice'
export const store = configureStore({
    reducer:{
       cart:cartReducer,
       user:userReducer,
       selectedItems: selectedItemsReducer,
    }
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
export type AppStore = typeof store
