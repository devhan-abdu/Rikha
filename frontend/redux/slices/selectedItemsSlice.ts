import { createSlice } from "@reduxjs/toolkit";
import { PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../store";

export interface CheckoutSlice {
   ids: number[],
}

const initialState: CheckoutSlice = {
    ids: [],
}


const selectedItemsSlice = createSlice({
    name: 'ids',
    initialState,
    reducers: {
        toggleSelectItem: (state, action: PayloadAction<number>) => {
            const itemId = action.payload;
            state.ids = state.ids.includes(itemId)
            ? state.ids.filter(id => id !== itemId)
            : [...state.ids, itemId]
        },
        selectAll: (state, action: PayloadAction<number[]>) => {
            state.ids = action.payload

        },     
        clearSelcted: (state) => {
            state.ids = [];
        },
    }
})

export const selectSelectedIds  = (state: RootState) => state.selectedItems.ids;

export const { toggleSelectItem, selectAll , clearSelcted} = selectedItemsSlice.actions;
export default selectedItemsSlice.reducer;