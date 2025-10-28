"use client"

import { Product, ProductDetail } from "@/interface"
import { useAppDispatch, useAppSelector } from "@/redux/hooks"
import { addCartItem, selectCartItems } from "@/redux/slices/cartSlice";

const AddToCartButton = ({ product }: { product: ProductDetail | Product }) => {
    const dispatch = useAppDispatch();

    const cartItems = useAppSelector(selectCartItems);
    const existingCartItem = cartItems.find(item => item.productId === product.id);
    const canAdd = !existingCartItem || existingCartItem.quantity < product.stock

    const addToCart = () => {
        const cartItem = {
            productId: product.id,
            title: product.title,
            desc: product.shortDesc,
            quantity: 1,
            image: product.image,
            price: product.price,
            discount: product.discount,
            stock: product.stock,
        }
        dispatch(addCartItem(cartItem))
    }
    return (
        <button
            onClick={() => addToCart()}
            type="button"
            disabled={!canAdd || product.stock <= 0}
            className={`w-full flex items-center justify-center gap-2 rounded-lg  px-4 py-2.5 text-sm font-medium text-white 
            ${(!canAdd || product.stock <= 0) ? "cursor-not-allowed bg-gray-300 text-gray-600" : "cursor-pointer bg-primary hover:bg-primary/90 focus:outline-none focus:ring-4 focus:ring-primary-300  "
                }
            `}
        >
             <svg
              className="h-5 w-5"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M4 4h1.5L8 16h8m-8 0a2 2 0 100 4 2 2 0 000-4zm8 0a2 2 0 100 4 2 2 0 000-4zM17 4v6m-3-3h6"
              />
            </svg>
            {(!canAdd || product.stock <= 0) ? "Out of Stock" : "Add to Cart"}
        </button>
    )
}

export default AddToCartButton
