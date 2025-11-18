import Search from '@/components/Search';
import { Frown } from 'lucide-react';
import { fetchFeaturedProducts, fetchSearchProducts } from '@/lib/fetchers';
import { Suspense } from 'react';
import ProductWrapper from '@/components/ProductWrapper';
import { ProductCardsSkeleton } from '@/components/skeletons';

export default async function Page(props: {
  searchParams?: Promise<{
    query?: string;
  }>;
}) {

  const searchParams = await props.searchParams;
  const query = (searchParams?.query || '').trim();
  const products = query === "" ? [] : await fetchSearchProducts(query);


  if (query === "") {
    return (
      <div>
        <Suspense fallback={<div>Loading ....</div>}>
          <Search />
        </Suspense>
        <main className='px-6 lg:px-12 mb-12 mt-16 '>
          <div className=" flex flex-col gap-12 w-full ">
            <h1 className="text-[24px] font-cinzel font-light text-left "> GET TO KNOW RIKHA BESTSELLERS</h1>
            <Suspense fallback={<ProductCardsSkeleton />}>
              <ProductWrapper fetchProduct={fetchFeaturedProducts} />
            </Suspense>
          </div>
        </main>
      </div>
    )
  }

  if (products?.length === 0 || !products) {
    return (
      <div>
        <Suspense fallback={<div>Loading ....</div>}>
          <Search />
        </Suspense>
        <main className='px-6 lg:px-12 mb-12 mt-16 '>
          <div className="flex flex-col items-center justify-center gap-12 ">
            <div className="text-xl  w-max p-8 pb-0 flex flex-wrap items-center justify-center gap-1">
              <p className="">  Oops, No results to match your search. </p>
              <Frown className="text-4xl" />
            </div>
            <div className=" flex flex-col gap-12 w-full ">
              <h1 className="text-[24px] font-cinzel font-light text-left ">GET TO KNOW RIKHA BESTSELLERS</h1>
              <Suspense fallback={<ProductCardsSkeleton />}>
                <ProductWrapper fetchProduct={fetchFeaturedProducts} />
              </Suspense>
            </div>
          </div>
        </main>
      </div>
    )
  }

  return (
    <div>
      <Suspense fallback={<div>Loading ....</div>}>
        <Search />
      </Suspense>
      <main className='px-6 lg:px-12 mb-12 mt-16 '>
        <div className=" flex flex-col gap-12 w-full ">
          <h1 className="text-[24px] font-cinzel font-light text-left ">SEARCH RESULT</h1>
          <Suspense fallback={<ProductCardsSkeleton />}>
            <ProductWrapper fetchProduct={() => fetchSearchProducts(query)} />
          </Suspense>
          </div>
      </main>
    </div>
  )
}

