import Image from "next/image";
import Link from "next/link";
import ProductCard from '@/components/ProductCard'
import { fetchCategories, fetchFeaturedProducts, fetchNewArrivals } from '@/lib/featchers'
export default async function Home() {
  
  const [catRes, featRes, newRes] = await Promise.allSettled([fetchCategories(), fetchFeaturedProducts(), fetchNewArrivals()])
  const categories = catRes.status === 'fulfilled' ? catRes.value : [];
  const featured = featRes.status === 'fulfilled' ? featRes.value : [];
  const newArrivals = newRes.status === 'fulfilled' ? newRes.value : [];

  return (
    <main className="">
      <section className="relative px-6 pt-16  lg:pt-0 md:px-12 ">
        <div className="absolute inset-0 -z-10 h-full w-full bg-white bg-[linear-gradient(to_right,#8080800a_1px,transparent_1px),linear-gradient(to_bottom,#8080800a_1px,transparent_1px)] bg-[size:14px_24px]"><div className="absolute left-0 right-0 top-0 -z-10 m-auto h-[310px] w-[310px] rounded-full bg-primary opacity-20 blur-[100px]"></div></div>
        <div className="flex flex-col md:flex-row items-center  gap-4  mx-auto max-w-[1200px]">
          <div className="flex flex-col gap-4 w-full md:w-[50%] ">
            <h1 className="font-cinzel text-3xl  lg:text-4xl   font-semibold text-black/80 capitalize leading-8 lg:leading-12"> Professional tone that inspires <span className="text-primary">confidence</span></h1>
            <p className="text-xl">Explore iPhones, AirPods, iPads, Macs, and more premium devices for work, play, and everything in between </p>
            <div className="flex items-center gap-6 mt-3">
              <Link href='/category' className="font-cinzel bg-primary text-white px-3 py-2  rounded-sm text-lg  capitalize font-extrabold z-10 ">Shop Now</Link>
              <Link href='#category-section' className="font-cinzel text-primary border-2 border-primary px-3 py-1.5  rounded-sm text-lg  capitalize font-extrabold z-10">Explore More</Link>
            </div>
          </div>
          <div className="h-[500px] w-full md:w-[50%] flex items-center justify-center -mt-20 ">
          <Image
            src="/images/hero2.png"
            alt="Picture of the author"
            width={200}
            height={400}
            className="w-full h-full object-contain"
          />
          </div>
        </div>
      </section>
      <section className="p-8 py-12 space-y-12" id="category-section">
        <h2 className="text-2xl lg:text-3xl font-cinzel text-left">Top Category</h2>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-x-3 gap-y-6  ">
          {categories.length === 0 ? (
            <p className="text-gray-500"> No Category Found</p>
          ) : (
            categories.map(category => (
              <div className="mx-auto rounded-2xl flex flex-col  items-center justify-center w-[200px]" key={category.id}>
                <div className="flex items-center justify-center h-[100px] w-full">
                <Image
                  src={category.image}
                  alt="Picture of the author"
                  width={100}
                  height={100}
                  className="object-contain w-full h-full"
                />
                </div>
                <div className="h-full flex flex-col justify-between"></div>
                <p className="font-cinzel capitalize mt-3">{category.name}</p>
                <Link  href={{
                  pathname:'/category',
                  query:{slug:category.slug}
                }} className="text-md text-primary capitalizee hover:scale-110 cursor-pointer transition-all duration-500"> Explore More</Link>
              </div>
            ))
          )}
        </div>
      </section>
      <section className="p-6 pt-10 pb-20   space-y-12 bg-gray-50">
        <h2 className="text-2xl lg:text-3xl font-cinzel text-left">Featured Products</h2>
      <div className="max-w-fit mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 items-center justify-center gap-6">
        {featured.length === 0 ? (
          <p className="text-gray-500"> No Featured Product Found</p>

        ) : (
          featured.map((product) => (
               <ProductCard key={product.id} product={product}/>
          ))
        )
        
        }
        </div>
      </section>
     <section className="bg-primary flex flex-col items-center justify-center  p-6  gap-3 "> 
  <h2 className="text-2xl lg:text-3xl font-bold text-white mb-4 font-cinzel text-center">Need Help Finding the Right Product?</h2>
      <Link href='/contact' className="font-cinzel bg-black text-white px-5 rounded-sm py-2.5 text-lg  capitalize font-extrabold  ">Contact us</Link>
</section>

       <section className="px-6 pb-12 pt-18  space-y-12 bg-gray-50">
        <h2 className="text-2xl lg:text-3xl font-cinzel text-left">New Arrival Products</h2>
      <div className="max-w-fit mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 items-center jsutify-center gap-6">
        {newArrivals.length === 0 ? (
          <p className="text-gray-500"> No New Arrival Product Found</p>

        ) : (
          newArrivals.map((product) => (
               <ProductCard key={product.id} product={product}/>
          ))
        )
        
        }
        </div>
      </section>
    </main>
  );
}
