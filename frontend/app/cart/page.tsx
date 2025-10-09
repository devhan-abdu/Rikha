'use client'
import React from 'react'
import Image from 'next/image';
import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';
import { useAppDispatch, useAppSelector } from '@/redux/hooks'
import { selectTotalPrice, selectTotalQnt, selectCartItems } from '@/redux/slices/cartSlice'
import { removeCartItem, decreaseCartQuantity, increaseCartQuantity } from '@/redux/slices/cartSlice'
import Common from '@/components/Common';

const page = () => {
    const dispatch = useAppDispatch();
    const cartItems = useAppSelector(selectCartItems)
    const totalPrice = useAppSelector(selectTotalPrice)
    const totalQnt = useAppSelector(selectTotalQnt)

    return (
        <>
            <Common header="Your Cart" image="/images/cart.png" />

            <div className='flex items-center justify-between gap-4 pt-12 pb-6 px-6'>
                <div className="inline-flex items-center gap-4">
                    <h4 className='font-cinzel text-2xl font-bold'>Cart Items</h4>
                    <p className='text-gray-500 text-lg'>{totalQnt} Items</p>
                </div>
                <div className="inline-flex items-center justify-center gap-6">
                    <p className='text-gray-500 text-lg'>Total</p>
                    <h4 className=' text-2xl font-bold'>${totalPrice}</h4>
                </div>
            </div>
            <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
                <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
                    <thead className="text-xs text-gray-700 uppercase  dark:bg-gray-700 dark:text-gray-400 border-y-2 border-gray-200">
                        <tr>
                            <th scope="col" className="px-6 py-6">
                                Product
                            </th>
                            <th scope="col" className="px-6 py-6">
                                Quantity
                            </th>
                            <th scope="col" className="px-6 py-6">
                                Price
                            </th>
                            <th scope="col" className="px-6 py-6">
                                Subtotal
                            </th>

                        </tr>
                    </thead>
                    <tbody>

                        {
                            cartItems.map(item => (
                                <tr key={item.productId} className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 border-gray-200  hover:bg-gray-50 dark:hover:bg-gray-600">
                                    <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white flex items-center justify-start gap-3">
                                        <Image
                                            src={item.image}
                                            alt="Picture of the author "
                                            width={80}
                                            height={80}
                                        />
                                        <div className='flex flex-col'>
                                            <h4 className=' text-xl bold'>{item.title}</h4>
                                            <p className="text-gray-600 text-base">{item.desc}</p>
                                            <button className='text-red-500  bold self-start text-base cursor-pointer' onClick={() => dispatch(removeCartItem(item.productId))}>Remove</button>

                                        </div>
                                    </th>
                                    <td className="px-6 py-4">
                                        <div className="flex items-center border rounded p-1 w-fit space-x-2">
                                            <button className="text-gray-500 hover:text-black px-1" onClick={() => dispatch(decreaseCartQuantity(item.productId))}>−</button>
                                            <span className="w-6 text-center">{item.quantity}</span>
                                            <button className="text-gray-500 hover:text-black px-1" onClick={() => dispatch(increaseCartQuantity(item.productId))}>+</button>
                                        </div>
                                    </td>
                                    <td className="px-6 py-4">
                                        ${item.price}
                                    </td>
                                    <td className="px-6 py-4 font-bold">
                                        ${item.price * item.quantity}
                                    </td>

                                </tr>
                            ))
                        }

                    </tbody>
                </table>
            </div>
            <div className='flex items-center justify-between p-12 '>
                <Link href='/category' className='text-base font-bold font-cinzel hover:scale-105  flex items-center gap-2'>
                    <ArrowLeft />
                    <span>Continue Shopping</span>
                </Link>
                <Link href='/checkout' className='text-base font-bold font-cinzel hover:scale-105 py-2 px-3 flex items-center gap-2 bg-primary rounded-lg  text-white'>
                    Procced to checkout
                </Link>
            </div>
        </>

    )
}

export default page
