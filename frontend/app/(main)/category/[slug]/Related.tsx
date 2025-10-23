import React from 'react'
import ProductCard from '@/components/ProductCard'
import { fetchRelatedProducts } from '@/lib/featchers'

const Related =async ({category}:{category:number}) => {
    const products = await fetchRelatedProducts(category);

  return (
    <div className='pb-12 bg-gray-100 px-8 lg:px-12'>
            <h1 className='text-2xl md:text-3xl font-bold uppercase font-cinzel text-left leading-24'>You may also like</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 items-center justify-center gap-x-4 gap-y-6">
        {  products.map((product) => (
               <ProductCard key={product.id} product={product}/>
          ))
          }
    </div>
    </div>
  )
}

export default Related
