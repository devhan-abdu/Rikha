import Image from "next/image";
import Link from "next/link";
import AddToCartButton from "./AddToCartButton";
import { Product } from "@/interface";


const ProductCard = ({ product }: { product: Product }) => {

  return (
    <div className="group relative flex flex-col  rounded-xl border border-slate-200 bg-white shadow-sm hover:shadow-md transition-shadow duration-200 w-[305px] mx-auto overflow-hidden">
      <Link
        href={`/category/${product.slug}`}
        className="flex items-center justify-center h-[190px] w-full "
      >
        <Image
          src={product.image}
          alt={product.title}
          width={300}
          height={190}
          className="object-contain w-full h-full px-2 py-5 transition-transform duration-200 group-hover:scale-105"
        />
      </Link>

      {product.stock > 5 ? (
        <span className="absolute top-0 right-0 rounded-md bg-green-100 px-2 py-1 text-xs font-medium text-green-700">
          In Stock
        </span>
      ) : product.stock > 0 ? (
        <span className="absolute top-0 right-0 rounded-md bg-amber-100 px-2 py-1 text-xs font-medium text-amber-700">
          Only {product.stock} left
        </span>
      ) : (
        <span className="absolute top-0 right-0 rounded-md bg-red-100 px-2 py-1 text-xs font-medium text-red-700">
          Out of Stock
        </span>
      )}

      <div className="flex flex-col flex-1 px-6 py-4 space-y-2">
        <Link
          href={`/category/${product.slug}`}
          className="text-base font-semibold leading-snug text-gray-900 hover:text-blue-600 transition-colors line-clamp-2"
        >
          {product.title}
        </Link>

        <p className="text-sm text-gray-600 line-clamp-2">
          {product.shortDesc}
        </p>

        <div className="flex items-center gap-1">
          {[...Array(5)].map((_, i) => (
            <svg
              key={i}
              className={`h-4 w-4 ${i < Math.round(product.rating) ? 'text-yellow-400' : 'text-gray-300'}`}
              fill="currentColor"
              viewBox="0 0 24 24"
            >
              <path d="M13.8 4.2a2 2 0 0 0-3.6 0L8.4 8.4l-4.6.3a2 2 0 0 0-1.1 3.5l3.5 3-1 4.4c-.5 1.7 1.4 3 2.9 2.1l3.9-2.3 3.9 2.3c1.5 1 3.4-.4 3-2.1l-1-4.4 3.4-3a2 2 0 0 0-1.1-3.5l-4.6-.3-1.8-4.2Z" />
            </svg>
          ))}
          <p className="text-sm font-medium text-gray-700 ml-1">{product.rating}</p>
          <p className="text-sm text-gray-400">({product.numReviews})</p>
        </div>

        <div className="flex items-baseline gap-2">
          <span className="text-sm text-gray-400 line-through">
            ETB {product.price.toFixed(2)}
          </span>
          <span className="text-lg font-semibold text-gray-900">
            ETB {(product.price * (1 - product.discount)).toFixed(2)}
          </span>
        </div>

        <div className="ml-auto pt-2">
          <AddToCartButton product={product} />
        </div>
      </div>
    </div>

  );
};

export default ProductCard;
