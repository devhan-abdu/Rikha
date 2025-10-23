'use client'
import React, { useMemo } from 'react'
import useSWR from 'swr'
import { cn } from '@/lib/utils'
import { Category, Product } from '@/interface'
import { useState } from 'react'
import ProductCard from '@/components/ProductCard'
import { fetchProductsByCategory } from '@/lib/featchers'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';


type Props = {
    categories: Category[];
    initialProducts: Product[];
    defaultCategory: string;
}

const CategoryPage = ({ categories, initialProducts, defaultCategory }: Props) => {
    const [selected, setSelected] = useState(defaultCategory)
    const [sortOption, setSortOption] = useState('relevant');
    const shouldFetch = selected !== '';

    const categoryKey = `/api/category/${selected}`;
    const { data: products, isLoading } = useSWR(
        shouldFetch ? categoryKey : null,
        () => fetchProductsByCategory(selected),
    )

    const displayProducts = shouldFetch ? products ?? [] : initialProducts;
    const sortedProducts = useMemo(() => {
        switch (sortOption) {
            case "price-asc":
                return [...displayProducts].sort((a, b) => a.price - b.price);
            case "price-desc":
                return [...displayProducts].sort((a, b) => b.price - a.price);
            default:
                return displayProducts;
        }
    }, [sortOption, displayProducts])

    return (

        <>
            <div className="flex flex-col lg:flex-row justify-between  gap-2  px-4 relative ">

                <div className="p-6 md:border border-gray-500 shadow-md lg:shadow-xl rounded-lg lg:sticky lg:mt-16  top-12 h-fit">
                    <h2 className="text-2xl font-bold mb-6 font-montserrat">Category</h2>
                    <div className="flex flex-wrap lg:flex-col gap-4 items-start ">
                        {categories.map((item) => (
                            <button
                                key={item.slug}
                                className={cn(
                                    "cursor-pointer uppercase text-sm md:text-base  pr-4 md:pr-0",

                                    item.slug === selected
                                        ? "text-primary"
                                        : "text-gray-900"
                                )}
                                onClick={() => setSelected(item.slug)}
                            >
                                {item.name}
                            </button>
                        ))}
                    </div>
                </div>
                <div className='flex-1 mx-auto px-2 py-4'>
                    <div className="flex justify-between gap-12 my-6 mb-8 ">
                        <p className="sm:text-4xl text-2xl  capitalize font-cinzel font-bold">Products</p>

                        <Select onValueChange={(value) => setSortOption(value)} >
                            <SelectTrigger className="w-[200px] focus:ring-primary"> 
                                <SelectValue placeholder="Sort by price" />
                            </SelectTrigger>
                            <SelectContent className='bg-white shadow-2xl z-[999]'>
                                <SelectItem value="price-asc">Price: Low to High</SelectItem>
                                <SelectItem value="price-desc">Price: High to Low</SelectItem>
                            </SelectContent>
                        </Select>

                    </div>

                    <div className="  grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3  items-center justify-center gap-x-4 gap-y-6">

                        {isLoading
                            ? Array.from({ length: 6 }).map((_, i) => (
                                <div key={i} className="w-full h-[300px] bg-gray-200 animate-pulse rounded-lg" />
                            )) : (
                                sortedProducts.map((product) => (
                                    <ProductCard key={product.id} product={product} />
                                ))
                            )}
                    </div>

                </div>
            </div>
        </>
    )
}

export default CategoryPage
