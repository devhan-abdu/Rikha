import React, { Suspense } from 'react';
import Image from 'next/image';
import { Lock, ShieldCheck, Truck, Undo2 } from 'lucide-react';
import Related from './Related';
import Review from './Review';
import { fetchProductDetail } from '@/lib/featchers';

const ProductDetail = async ({ params }: { params: { slug: string } }) => {
  const product = await fetchProductDetail(params.slug);

  return (
    <div className="">
      <div className=" px-4 md:px-12 grid grid-cols-1 md:grid-cols-2 items-center gap-8">
              {/* for mobile only */}
         <div className='flex flex-col gap-2 md:hidden pt-6'>
        <h1 className="text-3xl font-cinzel font-bold ">{product.title}</h1>
        <div className="flex items-center gap-2  ">
          {[...Array(5)].map((_, i) => (
            <svg key={i} className="h-5 w-5 text-yellow-400" fill="currentColor" viewBox="0 0 24 24">
              <path d="M13.8 4.2a2 2 0 0 0-3.6 0L8.4 8.4l-4.6.3a2 2 0 0 0-1.1 3.5l3.5 3-1 4.4c-.5 1.7 1.4 3 2.9 2.1l3.9-2.3 3.9 2.3c1.5 1 3.4-.4 3-2.1l-1-4.4 3.4-3a2 2 0 0 0-1.1-3.5l-4.6-.3-1.8-4.2Z" />
            </svg>
          ))}
          <p className="text-sm font-medium text-gray-800">5.0</p>
          <p className="text-sm text-gray-500">(455)</p>
        </div>
       </div>
        <div className="flex items-center justify-center">
          <Image
            src={product.image}
            alt={product.title}
            width={280}
            height={280}
            className="w-full h-auto object-contain border border-gray-300 rounded-md lg:p-8"
          />
        </div>

        {/* Product Info */}
        <div className="flex flex-col gap-4">
          <h1 className="text-3xl font-cinzel font-bold hidden md:block">{product.title}</h1>

          <ul className="text-base font-medium text-gray-700 flex flex-wrap gap-2">
            {product.specs.map((item, i) => (
              <li key={i} className="after:content-['|'] last:after:content-none px-1">{item}</li>
            ))}
          </ul>

          <div className="hidden md:flex items-center gap-2">
            {[...Array(5)].map((_, i) => (
              <svg key={i} className="h-5 w-5 text-yellow-400" fill="currentColor" viewBox="0 0 24 24">
                <path d="M13.8 4.2a2 2 0 0 0-3.6 0L8.4 8.4l-4.6.3a2 2 0 0 0-1.1 3.5l3.5 3-1 4.4c-.5 1.7 1.4 3 2.9 2.1l3.9-2.3 3.9 2.3c1.5 1 3.4-.4 3-2.1l-1-4.4 3.4-3a2 2 0 0 0-1.1-3.5l-4.6-.3-1.8-4.2Z" />
              </svg>
            ))}
            <p className="text-sm font-medium text-gray-800">5.0</p>
            <p className="text-sm text-gray-500">(455)</p>
          </div>

          <p className="text-gray-600 text-base">{product.shortDesc}</p>

          <div className="flex items-center justify-between mt-4">
            <p className="text-2xl font-extrabold text-black">${product.price}</p>
            <button className="bg-primary hover:bg-primary-dark text-white font-semibold px-6 py-2 rounded-md inline-flex items-center gap-2">
              <svg className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M4 4h1.5L8 16h8m-8 0a2 2 0 100 4 2 2 0 000-4zm8 0a2 2 0 100 4 2 2 0 000-4zM17 4v6m-3-3h6" />
              </svg>
              Add to cart
            </button>
          </div>
        </div>
      </div>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-12 px-4 md:px-12">
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

      {/* Review  Section */}
      <div className="mt-12">
        <Review reviews={product.reviews} desc={product.longDesc} />
        <Suspense fallback={<div>Loading...</div>}>
          <Related category={product.categoryId} />
        </Suspense>
      </div>
    </div>
  );
};

export default ProductDetail;
