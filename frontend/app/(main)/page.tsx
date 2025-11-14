import Image from "next/image";
import Link from "next/link";
import { fetchCategories, fetchFeaturedProducts, fetchNewArrivals } from '@/lib/fetchers'
import ProductWrapper from "@/components/ProductWrapper";
import { Suspense } from "react";
import { CategorySkeleton, ProductCardsSkeleton } from "@/components/skeletons";
import { CategorySection } from "@/components/CategorySection";

export default async function Home() {

  return (
    <main className="">
      <section className="relative px-6 pt-16 lg:pt-0 md:px-12 lg:px-24 ">
        <div className="absolute inset-0 -z-10 h-full w-full bg-white bg-[linear-gradient(to_right,#8080800a_1px,transparent_1px),linear-gradient(to_bottom,#8080800a_1px,transparent_1px)] bg-[size:14px_24px]"><div className="absolute left-0 right-0 top-0 -z-10 m-auto h-[310px] w-[310px] rounded-full bg-primary opacity-20 blur-[100px]"></div></div>
        <div className="flex flex-col md:flex-row items-center gap-4 md:gap-8 ">
          <div className="flex flex-col gap-4 w-full md:w-[50%] ">
            <h1 className="font-cinzel text-3xl  lg:text-4xl  text-black/80 "> Professional tone that inspires <span className="text-primary">confidence</span></h1>
            <p className="text-xl ">Explore iPhones, AirPods, iPads, Macs, and more premium devices for work, play, and everything in between </p>
            <div className="flex items-center gap-6 mt-3">
              <Link href='/category' className="font-cinzel bg-primary text-white px-3 py-2 rounded-sm text-base capitalize z-10 hover:scale-95 transition-all duration-300">Shop Now</Link>
              <Link href='#category-section' className="font-cinzel text-primary border-2 border-primary px-3 py-1.5  rounded-sm text-base capitalize font-bold hover:scale-95 transition-all duration-300 z-10">Explore More</Link>
            </div>
          </div>
          <div className="h-[500px] w-full md:w-[50%] flex items-center justify-center -mt-20 ">
            <Image
              src="/images/hero2.avif"
              alt="hero image"
              width={200}
              height={400}
              className="w-full h-full object-contain"
            />
          </div>
        </div>
      </section>

      <section className="p-8 py-12 space-y-12 " id="category-section">
        <h2 className="text-2xl lg:text-3xl font-cinzel text-left">Top Category</h2>
        <Suspense fallback={<CategorySkeleton />}>
          <CategorySection fetchCategories={fetchCategories} />
        </Suspense>
      </section>

      <section className="p-8 pt-10 pb-20 space-y-12 bg-gray-50">
        <h2 className="text-2xl lg:text-3xl font-cinzel text-left">Featured Products</h2>
        <Suspense fallback={<ProductCardsSkeleton />}>
          <ProductWrapper fetchProduct={fetchFeaturedProducts} />
        </Suspense>
      </section>

      <section className="bg-primary flex flex-col items-center justify-center p-6 gap-3 ">
        <h2 className="text-xl lg:text-2xl font-semibold text-white mb-3 text-center font-cinzel  ">Need Help Finding the Right Product?</h2>
        <Link href='/contact' className=" bg-white text-primary px-4 py-2 rounded-md text-base capitalize font-extrabold font-cinzel hover:scale-95 transition-all duration-300">Contact us</Link>
      </section>

      <section className="px-8 pb-12 pt-18 space-y-12 bg-gray-50">
        <h2 className="text-2xl lg:text-3xl font-cinzel text-left">New Arrival Products</h2>
        <Suspense fallback={<ProductCardsSkeleton />}>
          <ProductWrapper fetchProduct={fetchNewArrivals} />
        </Suspense>
      </section>

    </main>
  );
}
