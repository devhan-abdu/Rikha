
import { Product } from "@/interface";
import ProductCard from "./ProductCard";

interface Props {
    fetchProduct: () => Promise<Product[]>
}
const ProductWrapper = async ({ fetchProduct }: Props) => {
    const products = await fetchProduct();
    return (

        <div className="max-w-fit mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 items-center justify-center gap-x-6 gap-y-8">
            {(!products || products?.length === 0) ? (
                <p className="text-gray-500"> No Product Found</p>

            ) : (
                products?.map((product) => (
                    <ProductCard key={product.id} product={product} />
                ))
            )

            }
        </div>
    )
}

export default ProductWrapper
