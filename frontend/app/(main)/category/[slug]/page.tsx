import React, { Suspense } from 'react';
import Image from 'next/image';
import { Lock, ShieldCheck, Truck, Undo2 } from 'lucide-react';
import Related from './Related';
import Review from './Review';
import { fetchProductDetail } from '@/lib/featchers';
import AddToCartButton from '@/components/AddToCartButton';

const ProductDetail = async ({ params }: { params: { slug: string } }) => {
  const product = await fetchProductDetail(params.slug);

  return (
    <div className="py-6 font-poppins container mx-auto">
      <div className="flex flex-col md:flex-row items-center md:items-start gap-10 py-8 px-6">
        <div className='mr-auto block md:hidden space-y-2'>
          <h1 className="text-3xl md:text-4xl font-cinzel font-bold text-gray-900">
            {product.title}
          </h1>

          <div className="flex items-center gap-1">
            {[...Array(5)].map((_, i) => (
              <svg
                key={i}
                className="h-5 w-5 text-yellow-400"
                fill="currentColor"
                viewBox="0 0 24 24"
              >
                <path d="M13.8 4.2a2 2 0 0 0-3.6 0L8.4 8.4l-4.6.3a2 2 0 0 0-1.1 3.5l3.5 3-1 4.4c-.5 1.7 1.4 3 2.9 2.1l3.9-2.3 3.9 2.3c1.5 1 3.4-.4 3-2.1l-1-4.4 3.4-3a2 2 0 0 0-1.1-3.5l-4.6-.3-1.8-4.2Z" />
              </svg>
            ))}
            <span className="text-sm text-gray-700 ml-1 font-medium">5.0</span>
            <span className="text-sm text-gray-500 ml-1">(455 reviews)</span>
          </div>
        </div>
        <div className="w-full md:w-1/2 flex justify-center shadow-md">
          <Image
            src={product.image}
            alt={product.title}
            width={400}
            height={400}
            className="rounded-xl object-contain "
          />
        </div>

        <div className="w-full md:w-1/2 flex flex-col gap-4">

          <h1 className="text-3xl md:text-4xl font-cinzel font-bold text-gray-900 md:block hidden">
            {product.title}
          </h1>

          <div className="items-center gap-1 md:flex hidden">
            {[...Array(5)].map((_, i) => (
              <svg
                key={i}
                className="h-5 w-5 text-yellow-400"
                fill="currentColor"
                viewBox="0 0 24 24"
              >
                <path d="M13.8 4.2a2 2 0 0 0-3.6 0L8.4 8.4l-4.6.3a2 2 0 0 0-1.1 3.5l3.5 3-1 4.4c-.5 1.7 1.4 3 2.9 2.1l3.9-2.3 3.9 2.3c1.5 1 3.4-.4 3-2.1l-1-4.4 3.4-3a2 2 0 0 0-1.1-3.5l-4.6-.3-1.8-4.2Z" />
              </svg>
            ))}
            <span className="text-sm text-gray-700 ml-1 font-medium">5.0</span>
            <span className="text-sm text-gray-500 ml-1">(455 reviews)</span>
          </div>

          <div className="flex flex-wrap items-baseline gap-2 mt-2">
            <span className="text-2xl font-bold text-gray-900">
              ETB {(product.price * (1 - product.discount)).toFixed(2)}
            </span>
            <span className="line-through text-gray-400 text-lg">
              ETB {(product.price).toFixed(2)}
            </span>
            <span className="text-red-600 text-sm font-semibold bg-red-50 px-2 py-0.5 rounded-md">
              Save ETB {(product.price * product.discount).toFixed(2)}
            </span>
          </div>

          <p className="text-gray-600 text-base leading-relaxed">
            {product.shortDesc}
          </p>

          <div className="flex flex-wrap gap-2 mt-2">
            {product.specs.map((item, i) => (
              <span
                key={i}
                className="text-sm font-medium text-gray-700 bg-gray-100 px-3 py-1 rounded-md"
              >
                {item}
              </span>
            ))}
          </div>
          <div className='mt-6 w-full'>
            <AddToCartButton product={product} />
          </div>
        </div>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4  px-6 pt-8 pb-12 md:px-12 max-w-fit mx-auto">
        <div className="flex flex-col items-center text-sm font-semibold text-gray-800">
          <Truck className="w-6 h-6 mb-2 text-primary" />
          Free Delivery
        </div>
        <div className="flex flex-col items-center text-sm font-semibold text-gray-800">
          <ShieldCheck className="w-6 h-6 mb-2 text-primary" />
          1-Year Warranty
        </div>
        <div className="flex flex-col items-center text-sm font-semibold text-gray-800">
          <Lock className="w-6 h-6 mb-2 text-primary" />
          Secure Payment
        </div>
        <div className="flex flex-col items-center text-sm font-semibold text-gray-800">
          <Undo2 className="w-6 h-6 mb-2 text-primary" />
          7-Day Return Policy
        </div>
      </div>

      <div className=" mr-auto">
        <Review reviews={product.reviews} desc={product.longDesc} productId={product.id}/>
        <Suspense fallback={<div>Loading...</div>}>
          <Related slug={product.slug} />
        </Suspense>
      </div>
    </div>
  );
};

export default ProductDetail;
