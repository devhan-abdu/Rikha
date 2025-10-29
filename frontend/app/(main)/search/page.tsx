import Search from '@/components/Search';
import { Frown } from 'lucide-react';
import { fetchFeaturedProducts, fetchSearchProducts } from '@/lib/featchers';
import SearchProductCard from '@/components/SearchProductCard';

export default async function Page(props: {
  searchParams?: Promise<{
    query?: string;
  }>;
}) {

  const searchParams = await props.searchParams;
  const query = (searchParams?.query || '').trim();
  const products = query === "" ? [] : await fetchSearchProducts(query);
  const featured = await fetchFeaturedProducts()


  if (query === "") {
    return (
      <div>
        <Search />
        <main className='px-6 lg:px-12 mb-12 mt-8 max-w-[1000px] mx-auto'>
          <div className=" flex flex-col gap-12 w-full ">
            <h1 className="text-[24px] font-cinzel font-light text-center ">Get to know
              Rikha Bestsellers</h1>
            <div className='space-y-4 md:space-y-2  '>
              {featured?.map(product => (
                <SearchProductCard product={product} key={product.id} />
              ))

              }
            </div>
          </div>
        </main>
      </div>
    )
  }

  if (products?.length === 0 || !products) {
    return (
      <div>
        <Search />
        <main className='px-6 lg:px-12 mb-12 mt-8 max-w-[1000px] mx-auto'>
          <div className="flex flex-col items-center justify-center gap-12 ">
            <div className="text-xl  w-max p-8 pb-0 flex flex-wrap items-center justify-center gap-1">
              <p className="">  Oops, No results to match your search. </p>
              <Frown className="text-4xl" />
            </div>
            <div className=" flex flex-col gap-12 w-full ">
              <h1 className="text-[24px] font-cinzel font-light text-center ">Get to know
                Rikha Bestsellers</h1>
              <div className='space-y-4 md:space-y-2  '>
                {featured?.map(product => (
                  <SearchProductCard product={product} key={product.id} />
                ))

                }
              </div>
            </div>
          </div>
        </main>
      </div>
    )
  }

  return (
    <div>
      <Search />
      <main className='px-6 lg:px-12 mb-12 mt-8 max-w-[1000px] mx-auto'>
        <div className='space-y-4 md:space-y-2  '>
          {products?.map(product => (
            <SearchProductCard product={product} key={product.id} />
          ))
          }
        </div>
      </main>
    </div>
  )
}

