import React from 'react'
import Image from 'next/image'
import { Product } from '@/interface'
import Link from 'next/link';
import AddToCartButton from './AddToCartButton';

const SearchProductCard = ({ product }: { product: Product }) => {

    return (
        <div className='flex flex-col px-5 md:flex-row md:px-0 gap-4 border border-slate-200 shadow-sm py-3 ' key={product.id}>
            <Link href={`/category/${product.slug}`} className='md:w-[25%] h-[100px] cursor-pointer '>
                <Image
                    src={product.image}
                    alt={product.title}
                    width={100}
                    height={100}
                    className='object-contain h-full w-full rounded-md'
                />
            </Link >
            <div className='flex flex-1 flex-col gap-1 items-start'>
                <Link href={`/category/${product.slug}`}>
                    <h4 className='text-lg'>{product.title}</h4>
                </Link>
                <div className="mt-2 flex items-center gap-2">
                    <div className="flex items-center">
                        {[...Array(5)].map((_, i) => (
                            <svg
                                key={i}
                                className="h-4 w-4 text-yellow-600"
                                aria-hidden="true"
                                fill="currentColor"
                                viewBox="0 0 24 24"
                            >
                                <path d="M13.8 4.2a2 2 0 0 0-3.6 0L8.4 8.4l-4.6.3a2 2 0 0 0-1.1 3.5l3.5 3-1 4.4c-.5 1.7 1.4 3 2.9 2.1l3.9-2.3 3.9 2.3c1.5 1 3.4-.4 3-2.1l-1-4.4 3.4-3a2 2 0 0 0-1.1-3.5l-4.6-.3-1.8-4.2Z" />
                            </svg>
                        ))}
                    </div>
                    <p className="text-sm font-medium text-gray-900 dark:text-white">5.0</p>
                    <p className="text-sm font-medium text-gray-500 dark:text-gray-400">(455)</p>
                </div>
                <div className='flex flex-wrap items-center gap-x-3 text-gray-700'>
                    {
                        product.specs.map(item => (
                            <span key={item}>{item}</span>
                        ))
                    }
                </div>
            </div>
            <div className='md:pr-2 flex flex-col gap-4 justify-between'>
                <div className="flex items-baseline gap-2">
                    <span className="text-sm text-gray-400 line-through">
                        ETB {product.price.toFixed(2)}
                    </span>
                    <span className="text-md font-semibold text-gray-900">
                        ETB {(product.price * (1 - product.discount)).toFixed(2)}
                    </span>
                </div>
                <AddToCartButton product={product} />
            </div>
        </div>
    )
}

export default SearchProductCard
