import Image from "next/image";
import Link from "next/link";
import AddToCartButton from "./AddToCartButton";
import { Product } from "@/interface";


const ProductCard = ({ product }: { product: Product }) => {

  return (
    <div className="relative rounded-lg border p-6 border-slate-300 bg-white shadow-sm w-[300px] mx-auto overflow-hidden">
      <Link href={`/category/${product.slug}`} className="flex items-center justify-center h-[180px] w-full">
        <Image
          src={product.image}
          alt={product.title}
          width={300}
          height={180}
          className="object-contain w-full h-full"
        />
      </Link>
      {product.stock > 5 ? (
        <span className="px-2 py-1 text-xs font-semibold rounded absolute top-0 right-0 bg-green-100 text-green-700">
          In Stock
        </span>
      ) : product.stock > 0 ? (
        <span className="px-2 py-1 text-xs font-semibold rounded absolute top-0 right-0 bg-amber-100 text-amber-700">
          Only {product.stock} left
        </span>
      ) : (
        <span className="px-2 py-1 text-xs font-semibold rounded absolute top-0 right-0 bg-red-200 text-red-700">
          Out of Stock
        </span>
      )}

      <div className=" pt-2 mt-2 flex flex-col justify-between h-full">
        <Link
          href={`/product/${product.slug}`}
          className="text-md font-semibold leading-tight text-gray-900 hover:underline dark:text-white"
        >
          {product.title}
        </Link>
        <p className="line-clamp-2 text-sm text-gray-600 dark:text-gray-300">
          {product.shortDesc}
        </p>

        <div className="mt-2 flex items-center gap-2">
          <div className="flex items-center">
            {[...Array(5)].map((_, i) => (
              <svg
                key={i}
                className="h-4 w-4 text-yellow-400"
                aria-hidden="true"
                fill="currentColor"
                viewBox="0 0 24 24"
              >
                <path d="M13.8 4.2a2 2 0 0 0-3.6 0L8.4 8.4l-4.6.3a2 2 0 0 0-1.1 3.5l3.5 3-1 4.4c-.5 1.7 1.4 3 2.9 2.1l3.9-2.3 3.9 2.3c1.5 1 3.4-.4 3-2.1l-1-4.4 3.4-3a2 2 0 0 0-1.1-3.5l-4.6-.3-1.8-4.2Z" />
              </svg>
            ))}
          </div>
          <p className="text-sm font-medium text-gray-900 dark:text-white">{product.rating}</p>
          <p className="text-sm font-medium text-gray-500 dark:text-gray-400">({product.numReviews})</p>
        </div>

        <div className="flex flex-wrap items-center mt-1.5 ">
          <span className="line-through text-sm text-gray-500 mr-2">
            ETB{(product.price).toFixed(2)}
          </span>
          <span className="text-md font-bold text-gray-900 mr-2">
            ETB {(product.price * (1 - product.discount)).toFixed(2)}
          </span>
        </div>
        <div className='ml-auto mt-2'>
            <AddToCartButton product={product} />
          </div>
      </div>
    </div>
  );
};

export default ProductCard;
