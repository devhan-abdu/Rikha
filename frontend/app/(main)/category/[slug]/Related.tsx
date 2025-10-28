import React from 'react'
import ProductCard from '@/components/ProductCard'
import { fetchRelatedProducts } from '@/lib/featchers'

const Related = async ({ slug }: { slug: string }) => {
  const products = await fetchRelatedProducts(slug);

  return (
    <div className="p-6 pb-20 space-y-12 bg-gray-50">
      <h2 className="text-2xl lg:text-3xl font-cinzel text-left">You May Also Like</h2>
      <div className="max-w-fit mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 items-center justify-center gap-4">
        {products.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))
        }
      </div>
    </div>
  )
}

export default Related
