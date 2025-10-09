import { fetchFeaturedProducts, fetchSearchProducts } from "@/lib/featchers";
import Image from "next/image";
import { Frown } from 'lucide-react';
import SearchProductCard from "./SearchProductCard";

export default async function SearchTable({ query }: {
    query: string;
}) {
    const trimmedQuery = query.trim();
    const products = trimmedQuery === "" ? [] : await fetchSearchProducts(trimmedQuery);
    const featured = await fetchFeaturedProducts()

    if (trimmedQuery === "") {
        return (
            <div className=" flex flex-col gap-12 w-full ">
                <h1 className="md:text-[28px] text-2xl font-cinzel font-light text-center ">Get to know
                    Rikha Bestsellers</h1>
                <div className='space-y-4 md:space-y-2  '>
                    {featured?.map(product => (
                    <SearchProductCard product={product} key={product.id}/>
                    ))

                    }
                </div>
            </div>
        )
    }

    if (products.length === 0) {
        return (
            <div className="flex flex-col items-center justify-center gap-12 ">
                <div className="text-xl  w-max p-8 pb-0 flex flex-wrap items-center justify-center gap-1">
                    <p className="">  Oops, No results to match your search. </p>
                    <Frown className="text-4xl" />
                </div>
                <div className=" flex flex-col gap-12 w-full ">
                    <h1 className="md:text-[28px] text-2xl font-cinzel font-light text-center ">Get to know
                        Rikha Bestsellers</h1>
                    <div className='space-y-4 md:space-y-2  '>
                        {featured?.map(product => (
                          <SearchProductCard product={product} key={product.id}/>
                        ))

                        }
                    </div>
                </div>
            </div>
        )
    }
    return (
        <div className='space-y-4 md:space-y-2  '>
            {products?.map(product => (
            <SearchProductCard product={product} key={product.id}/>
            ))

            }
        </div>
    )
}