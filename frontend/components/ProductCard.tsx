'use client'

import Image from "next/image";
import Link from "next/link";
import { useAppDispatch } from "@/redux/hooks";
import { addCartItem } from "@/redux/slices/cartSlice";


const ProductCard = ({ product }: { product: any }) => {
  const dispatch = useAppDispatch();

  const addToCart =() =>{
     const cartItem ={
      productId:product.id,
      title:product.title,
      desc:product.desc,
      quantity:product.quantity,
      image:product.image,
      price:product.price,
     }
     console.log(cartItem , 'hela from cart')
     dispatch(addCartItem(cartItem))
  }

  return (
    <div className="rounded-lg border p-6 border-gray-300 bg-white shadow-sm dark:border-gray-700 dark:bg-gray-800 max-w-[330px] mx-auto">
        <Link href={`/category/${product.slug}`} className="flex items-center justify-center h-[180px] w-full">
            <Image
              src={product.image}
              alt={product.title}
              width={300}
              height={180}
              className="object-contain w-full h-full"
            />
        </Link>

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
          <p className="text-sm font-medium text-gray-900 dark:text-white">5.0</p>
          <p className="text-sm font-medium text-gray-500 dark:text-gray-400">(455)</p>
        </div>

        <div className="mt-4 flex flex-wrap items-center justify-between gap-4">
          <p className="text-xl font-extrabold leading-tight text-black dark:text-white">
            ${product.price}
          </p>
          <button
           onClick={()=>addToCart()}
            type="button"
            className="cursor-pointer inline-flex items-center rounded-lg bg-primary px-4 py-2 text-sm font-medium text-white hover:bg-primary/90 focus:outline-none focus:ring-4 focus:ring-primary-300 dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800"
          >
            <svg
              className="-ms-2 me-2 h-5 w-5"
              aria-hidden="true"
              fill="none"
              viewBox="0 0 24 24"
            >
              <path
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 4h1.5L8 16m0 0h8m-8 0a2 2 0 1 0 0 4 2 2 0 0 0 0-4Zm8 0a2 2 0 1 0 0 4 2 2 0 0 0 0-4Zm.75-3H7.5M11 7H6.312M17 4v6m-3-3h6"
              />
            </svg>
            Add to cart
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
