import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import ProductCard from '@/components/ProductCard'
export default function Home() {
  const Category = [
    {
      "id": "iphone",
      "name": "iPhone",
      "description": "Explore the latest models with powerful performance and stunning cameras.",
      "link": "/categories/iphone",
      "image": "/images/iphoneCate.png"
    },
    {
      "id": "airpods",
      "name": "AirPods",
      "description": "Experience wireless freedom with high-quality sound and noise cancellation.",
      "link": "/categories/airpods",
      "image": "/images/airpadCat.png"
    },
    {
      "id": "ipad",
      "name": "iPad",
      "description": "From creativity to productivity — powerful tablets for every need.",
      "link": "/categories/ipad",
      "image": "/images/ipadCate.png"
    },
    {
      "id": "watch",
      "name": "Apple Watch",
      "description": "Stay connected and track your fitness with style and precision.",
      "link": "/categories/watch",
      "image": "/images/watchCata.png"
    },
    {
      "id": "mac",
      "name": "Mac",
      "description": "Performance meets elegance — discover MacBook and iMac models.",
      "link": "/categories/mac",
      "image": "/images/macCata.png"
    },
    {
      "id": "headset",
      "name": "Headsets",
      "description": "Crystal-clear audio for calls, gaming, and entertainment.",
      "link": "/categories/headset",
      "image": "/images/headsetCat.png"
    }
  ]

  return (
    <main className="">
      <section className="bg-gray-100    flex items-center justify-center">
        <div className="flex flex-col md:flex-row items-center justify-between  place-content-center gap-4 md:gap-12 container mx-auto">
          <div className="flex flex-col gap-4 ">
            <h1 className="font-cinzel text-4xl md:text-5xl  font-semibold text-black/80">Lorem ipsum dolor sit <span className="text-primary">amet.</span></h1>
            <p className="text-xl">Lorem ipsum dolor repudiandae magni architecto doloribus totam et doloremque aspernatur atque </p>
            <Link href='/cart' className="font-cinzel bg-primary text-white px-3 py-2 md:px-6 md:py-4 rounded-md text-lg md:text-2xl capitalize font-extrabold self-start mt-2">Shop Now</Link>
          </div>

          <div>
            <Image
              src="/images/hero2.png"
              alt="Picture of the author"
              width={1000}
              height={1000}
            />
          </div>
        </div>
      </section>
      <section className="p-8 py-12 space-y-12">
        <h2 className="text-2xl lg:text-3xl font-cinzel text-left">Top Category</h2>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-x-3 gap-y-6 items-center justify-between">
          {
            Category.map(category => (
              <div className="mx-auto rounded-2xl flex flex-col  items-center justify-center" key={category.id}>
                <Image
                  src={category.image}
                  alt="Picture of the author"
                  width={100}
                  height={100}
                />
                <p className="font-cinzel capitalize mt-3">{category.name}</p>
                <Link href={category.link} className="text-md text-primary capitalizee hover:scale-110"> Explore More</Link>
              </div>
            ))
          }

        </div>
      </section>
      <section className="p-6 pt-12 container mx-auto space-y-12 bg-gray-100">
        <h2 className="text-2xl lg:text-3xl font-cinzel text-left">Top Category</h2>

        {
          <ProductCard />
        }
      </section>
    </main>
  );
}
