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
                <label key={item.productId} className="flex flex-row border-b border-slate-300  py-4 " htmlFor={String(item.productId)}>

                    <div className="flex-shrink-0 flex items-start pt-1">
                        <Checkbox className='rounded-full w-5 h-5 text-white border border-slate-400 ' id={String(item.productId)} checked={selectedItems.includes(item.productId)}
                            onCheckedChange={() => dispatch(toggleSelectItem(item.productId))}
                        />
                        <div className='relative w-20 h-20   rounded-lg overflow-hidden flex-shrink-0'>
                            <Image
                                src={item.image}
                                alt={item.title}
                                layout='fill'
                                objectFit='cover'
                            />
                        </div>
                    </div>

                    <div className="flex-1 min-w-0 ml-4 sm:p-4  self-start">
                        <Link href={`/category/${item.slug}`}>
                            <h2 className="line-clamp-2 text-base font-medium text-gray-900">
                                {item.title}
                            </h2>
                        </Link>
                        <p className="text-sm text-gray-500 mt-1 line-clamp-1">
                            {item.desc}
                        </p>

                        <div className="flex flex-wrap items-center mt-2">
                            <span className="line-through text-sm text-gray-500 mr-2">
                                ETB{(item.price).toFixed(2)}
                            </span>
                            <span className="text-md font-bold text-gray-900 mr-2">
                                ETB {(item.price * (1 - item.discount)).toFixed(2)}
                            </span>
                            <span className="text-sm text-red-600 font-semibold">
                                Save ETB{(item.price * item.discount).toFixed(2)}
                            </span>
                        </div>
                    </div>

                    <div className="  space-y-2 flex  justify-between items-center mt-4  flex-col ">
                        <div className="flex items-center border border-slate-300 shadow-sm rounded-full">
                            <button
                                className="p-2 text-gray-600 hover:text-black"
                                onClick={() => dispatch(decreaseCartQuantity(item.productId))}
                            >
                                <Minus className="h-4 w-4" />
                            </button>
                            <span className="w-6 text-center text-sm font-semibold">{item.quantity}</span>
                            <button
                                disabled={item.quantity === item.stock}
                                className={`p-2 rounded ${item.quantity === item.stock ? "text-gray-400 cursor-not-allowed" : "text-gray-600 hover:text-black"}`} onClick={() => dispatch(increaseCartQuantity(item.productId))}
                            >
                                <Plus className="h-4 w-4" />
                            </button>
                        </div>
                        <button
                            className="text-red-400 hover:text-red-600 "
                            onClick={() => dispatch(removeCartItem(item.productId))}
                        >
                            <Trash2 className="h-5 w-5" />
                        </button>
                    </div>
                </label>
            ))}
        </div>
    )
}

export default CartCard;