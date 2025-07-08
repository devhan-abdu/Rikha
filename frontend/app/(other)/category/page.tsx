'use client'
import ProductCard from "@/components/ProductCard";
import { categories, products } from "@/constants/index";
import { cn } from "@/lib/utils";
import { useEffect, useState, useMemo } from "react";
import { Product } from "@/interface";


const Collection = () => {
    const [filteredProduct, setFilterdProduct] = useState([])
    const [selectedcategory, setSelectedCategory] = useState(categories[0].name)



    //   console.log(category, 'categry')

    //   const handelFilter = () => {
    //     let productCopy = products.slice()
    //     if (category.length > 0) {
    //       productCopy = productCopy.filter((item) => category.includes(item.category))
    //     }
    //     setFilterdProduct(productCopy)
    //   }

    //   useEffect(() => {
    //     handelFilter();
    //   }, [category])

    const filteredPrducts = useMemo(() => {
        if (!selectedcategory) return products;
        const filteredProduct: Product[] = products.filter(product => product.category === selectedcategory)
    }, [categories, products]);

    return (
        <>

            <div className="flex flex-col sm:flex-row justify-between  gap-2  pt-12 border-t px-4 relative">

                <div className="p-6 md:border border-gray-500 md:shadow-xl rounded-lg md:sticky mt-20 top-36 h-fit">
                    <h2 className="text-2xl font-bold mb-6 font-montserrat">Category</h2>
                    <div className="flex flex-wrap md:flex-col gap-4 items-start ">
                        {categories.map((item, index) => (
                            <button
                                key={index}
                                className={cn(
                                    "cursor-pointer uppercase text-sm md:text-base  pr-4 md:pr-0",

                                    item.name === selectedcategory
                                        ? "text-primary"
                                        : "text-gray-900"
                                )}
                                onClick={() => setSelectedCategory(item.name)}
                            >
                                {item.name}
                            </button>
                        ))}
                    </div>
                </div>
                <div className="flex-1 mx-auto bg-gray-50 px-2 py-4">
                    <div className="flex justify-between gap-12 mb-12">
                        <p className="sm:text-4xl text-2xl  capitalize font-cinzel font-bold">All Products</p>
                        {/* <select className="borderck-2 border-gray-300 text-[16px] px-4 font-cinzel bg-white">
            <option value="relevant">Sort by: relevant</option>
            <option value="low-high">Sort by: low to high</option>
            <option value="high-low">Sort by: high to low</option>
          </select> */}
                    </div>
                    <div className="mb-6 grid gap-x-4 gap-y-6 grid-cols-1 md:mb-8 md:grid-cols-2 lg:grid-cols-3">
                        {
                            //   <ProductCard data={filteredProduct} />
                            [1, 2, 3, 4, 5, 6].map(item => (
                                <ProductCard />
                            ))

                        }

                    </div>

                </div>

            </div>
        </>
    )
}

export default Collection
