'use client'
import React, { useMemo } from 'react'
import useSWR from 'swr'
import { cn } from '@/lib/utils'
import { Category, Product } from '@/interface'
import { useState } from 'react'
import ProductCard from '@/components/ProductCard'
import { fetchAllProducts, fetchProductsByCategory } from '@/lib/fetchers'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { ProductCardsSkeleton } from '@/components/skeletons'


type Props = {
    categories: Category[];
    initialProducts: Product[];
    defaultCategory: string;
}

const CategoryContent = ({ categories, initialProducts, defaultCategory }: Props) => {
    const [selected, setSelected] = useState(defaultCategory || "all")
    const [sortOption, setSortOption] = useState('relevant');
    const shouldFetch = selected !== '';

    const categoryKey = `/api/category/${selected}`;
    const { data: products, isLoading } = useSWR(
        shouldFetch ? categoryKey : null,
        selected === "all" ? () => fetchAllProducts()
            : () => fetchProductsByCategory(selected),
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
        <div className=" px-4 md:px-6 py-6 ">
            <div className="my-4 p-4 shadow-sm border border-slate-200 rounded-md w-fit ">
                <h2 className="text-2xl font-semibold mb-6 ">Category</h2>
                <div className="flex flex-wrap  gap-4 items-start ">
                    {[{ name: "All", slug: "all" }, ...categories].map((item) => (
                        <button
                            key={item.slug}
                            className={cn(
                                "cursor-pointer uppercase text-sm md:text-base",
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
            <div className=' space-y-8 mt-12'>
                <div className="flex justify-between gap-12">
                    <p className=" text-2xl sm:text-3xl capitalize font-cinzel font-bold">Products</p>

                    <Select onValueChange={(value) => setSortOption(value)} >
                        <SelectTrigger className="w-[200px] focus:ring-primary">
                            <SelectValue placeholder="Sort by price" />
                        </SelectTrigger>
                        <SelectContent className='bg-white shadow-2xl z-[999]'>
                            <SelectItem value="relevant">Relevance</SelectItem>
                            <SelectItem value="price-asc">Price: Low to High</SelectItem>
                            <SelectItem value="price-desc">Price: High to Low</SelectItem>
                        </SelectContent>
                    </Select>

                </div>
                {isLoading ? (
                    <ProductCardsSkeleton />
                ) : (!products || products?.length === 0) ? (
                    <p className="text-gray-500"> No Product Found</p>)
                    : (
                        <div className="max-w-fit mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 items-center justify-center gap-x-6 gap-y-8 mt-12">
                            {sortedProducts?.map((product) => (
                                <ProductCard key={product.id} product={product} />
                            ))}
                        </div>
                    )}

            </div>
        </div>
    )
}

export default CategoryContent
