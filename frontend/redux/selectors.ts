import { createSelector } from "@reduxjs/toolkit";
import { selectSelectedIds } from "@/redux/slices/selectedItemsSlice"
import { selectCartItems } from "./slices/cartSlice";

export const selectCheckoutItems = createSelector(
    [selectSelectedIds, selectCartItems],
    (selectedIds, cartItems) => (
        cartItems.filter(item => selectedIds.includes(item.productId))
    )
);

export const selectCheckoutTotals = createSelector(
    [selectCheckoutItems],
    (items) => {
        const totalQnt = items.reduce((acc, item) => acc + item.quantity, 0);
        const totalPrice = items.reduce((acc, item) => acc + ( item.price * item.quantity ), 0);
        const totalDiscount = items.reduce((acc, item) => acc + item.price * item.discount * item.quantity, 0)

        return { totalQnt, totalPrice, totalDiscount };
    }

)