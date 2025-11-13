'use client'
import Image from "next/image";
import React from 'react';
import { Minus, Plus, Trash2 } from "lucide-react";
import { decreaseCartQuantity, increaseCartQuantity, removeCartItem, selectCartItems } from "@/redux/slices/cartSlice";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { selectSelectedIds, toggleSelectItem } from "@/redux/slices/selectedItemsSlice";
import { Checkbox } from "./ui/checkbox";
import Link from "next/link";



const CartCard = () => {
    const dispatch = useAppDispatch();
    const cartItems = useAppSelector(selectCartItems);
    const selectedItems = useAppSelector(selectSelectedIds)



    return (
        <div className="space-y-4 sm:space-y-6">
            {cartItems && cartItems.map((item) => (
                <label
                    key={item.productId}
                    htmlFor={String(item.productId)}
                    className={`flex flex-row border-b border-slate-300 py-4 rounded-lg transition-colors relative
        ${item.outOfStock ? "bg-gray-100 opacity-80" : "bg-white"}`}
                >
                    <div className="flex-shrink-0 flex items-start pt-1">
                        <Checkbox
                            className="rounded-full w-5 h-5 text-white border border-slate-400"
                            disabled={item.outOfStock}
                            id={String(item.productId)}
                            checked={selectedItems.includes(item.productId)}
                            onCheckedChange={() => dispatch(toggleSelectItem(item.productId))}
                        />
                        <div className="relative w-20 h-20 rounded-lg overflow-hidden flex-shrink-0 ml-2">
                            <Image
                                src={item.image}
                                alt={item.title}
                                layout="fill"
                                objectFit="cover"
                            />
                        </div>
                    </div>

                    <div className="flex-1 min-w-0 ml-4 sm:p-4 self-start">
                        <Link href={`/category/${item.slug}`}>
                            <h2 className={`line-clamp-2 text-base font-medium ${item.outOfStock ? "text-gray-400" : "text-gray-900"}`}>
                                {item.title}
                            </h2>
                        </Link>
                        <p className={`text-sm mt-1 line-clamp-1 ${item.outOfStock ? "text-gray-400" : "text-gray-500"}`}>
                            {item.desc}
                        </p>

                        <div className="flex flex-wrap items-center mt-2">
                            <span className={`line-through text-sm mr-2 ${item.outOfStock ? "text-gray-300" : "text-gray-500"}`}>
                                ETB {(item.price).toFixed(2)}
                            </span>
                            <span className={`text-md font-bold mr-2 ${item.outOfStock ? "text-gray-500" : "text-gray-900"}`}>
                                ETB {(item.price * (1 - item.discount)).toFixed(2)}
                            </span>
                            <span className={`text-sm font-semibold ${item.outOfStock ? "text-gray-400" : "text-gray-600"}`}>
                                Save ETB {(item.price * item.discount).toFixed(2)}
                            </span>
                        </div>
                        {item.outOfStock && (
                            <p className="mt-1 text-sm text-gray-500 italic">
                                Only {item.quantity} item{item.quantity > 1 ? "s" : ""} available
                            </p>
                        )}
                    </div>

                    <div className="space-y-2 flex justify-between items-center mt-4 flex-col">
                        <div className="flex items-center border border-slate-300 shadow-sm rounded-full">
                            <button
                                className="p-2 text-gray-600 hover:text-black"
                                disabled={item.outOfStock || item.quantity <= 1}
                                onClick={() => dispatch(decreaseCartQuantity(item.productId))}
                            >
                                <Minus className="h-4 w-4" />
                            </button>
                            <span className="w-6 text-center text-sm font-semibold">
                                {item.quantity}
                            </span>
                            <button
                                disabled={item.outOfStock || item.quantity === item.stock}
                                className={`p-2 rounded ${item.quantity === item.stock ? "text-gray-400 cursor-not-allowed" : "text-gray-600 hover:text-black"}`}
                                onClick={() => dispatch(increaseCartQuantity(item.productId))}
                            >
                                <Plus className="h-4 w-4" />
                            </button>
                        </div>
                        <button
                            className="text-gray-400 hover:text-gray-600"
                            disabled={item.outOfStock}
                            onClick={() => dispatch(removeCartItem(item.productId))}
                        >
                            <Trash2 className="h-5 w-5" />
                        </button>
                    </div>
                    {item.outOfStock && (
                        (item.availableStock ?? 0) > 0 ? (
                            <span className="absolute top-0 right-0 rounded-md bg-amber-100 px-2 py-1 text-xs font-medium text-amber-700">
                                Only {item.availableStock ?? 0} left
                            </span>
                        ) : (
                            <span className="absolute top-0 right-0 rounded-md bg-red-100 px-2 py-1 text-xs font-medium text-red-700">
                                Out of Stock
                            </span>
                        )
                    )}

                </label>
            ))}
        </div>

    )
}

export default CartCard;