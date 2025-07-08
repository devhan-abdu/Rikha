import React from 'react'
import Image from 'next/image';
import Link from 'next/link';
import {ArrowLeft } from 'lucide-react';


interface Product {
    name: string;
    spec: string[];
    review: number;
    numberReview: number;
    price: number;
    image: string;
}
const product: Product = {
    name: "Apple iMac 27",
    spec: [
        "1TB HDD", "Retine 5K Display", "M3 Max "
    ],
    review: 4.5,
    numberReview: 455,
    price: 1699,
    image: "/images/iphoneCate.png"

}

const page = () => {
    return (
        <>
            <div className='flex items-center justify-between gap-4 pt-12 pb-6 px-6'>
                <div className="inline-flex items-center gap-4">
                    <h4 className='font-cinzel text-2xl font-bold'>Cart Items</h4>
                    <p className='text-gray-500 text-lg'>3 Items</p>
                </div>
                <div className="inline-flex items-center justify-center gap-6">
                    <p className='text-gray-500 text-lg'>Total</p>
                    <h4 className=' text-2xl font-bold'>$4,499</h4>
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
                            [1, 2, 3, 4, 5, 6].map(item => (
                                <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 border-gray-200  hover:bg-gray-50 dark:hover:bg-gray-600">
                                    <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white flex items-center justify-start gap-3">
                                        <Image
                                            src={product.image}
                                            alt="Picture of the author "
                                            width={80}
                                            height={80}
                                        />
                                        <div className='flex flex-col'>
                                            <h4 className=' text-xl bold'> Apple MacBook Pro 17"</h4>
                                            <div>
                                                {product.spec.map(item => (
                                                    <span className='text-black/80' key={item}>{item}</span>
                                                ))}
                                            </div>
                                            <button className=' capitalize text-red-500  bold self-start text-lg'>Remove</button>

                                        </div>
                                    </th>
                                    <td className="px-6 py-4">
                                        <div className="flex items-center border rounded p-1 w-fit space-x-2">
                                            <button className="text-gray-500 hover:text-black px-1">−</button>
                                            <span className="w-6 text-center">1</span>
                                            <button className="text-gray-500 hover:text-black px-1">+</button>
                                        </div>
                                    </td>
                                    <td className="px-6 py-4">
                                        ${product.price}
                                    </td>
                                    <td className="px-6 py-4 font-bold">
                                        ${product.price}
                                    </td>

                                </tr>
                            ))
                        }

                    </tbody>
                </table>
            </div>
            <div className='flex items-center justify-between p-12 '>
                <Link href='/product' className='text-[20px] font-bold font-cinzel hover:scale-105  flex items-center gap-2'>
                    <ArrowLeft />
                    <span>Continue Shopping</span>
                </Link>
                <Link href='/product' className='text-xl font-bold font-cinzel hover:scale-105 py-4 px-3.5 flex items-center gap-2 bg-primary rounded-lg  text-white'>
                    Procced to checkout
                </Link>
            </div>
        </>

    )
}

export default page
