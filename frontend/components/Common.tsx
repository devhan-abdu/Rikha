import React from "react";
import Image from "next/image";

 type Props = {
  header: string;
  image: string;
 }

export default function Common({header , image}:Props) {
    return (      
        <section className="relative  h-fit  ">
        <div className="absolute inset-0 -z-10 h-full w-full bg-white bg-[linear-gradient(to_right,#8080800a_1px,transparent_1px),linear-gradient(to_bottom,#8080800a_1px,transparent_1px)] bg-[size:14px_24px]"><div className="absolute left-0 right-0 top-0 -z-10 m-auto h-[310px] w-[310px] rounded-full bg-primary opacity-20 blur-[100px]"></div></div>
        <div className="flex flex-col sm:flex-row  items-center jsutify-center place-content-center gap-4 sm:gap-12 py-8  sm:py-4 px-6">
            <h1 className="font-cinzel text-3xl  lg:text-4xl  font-semibold text-black/80 capitalize leading-8 lg:leading-12">{header}</h1>
          <div className="h-[200px]  flex items-center justify-center   ">
          <Image
            src={image}
            alt="Picture of the author"
            width={200}
            height={200}
            className="w-full h-full object-contain"
          />
          </div>
        </div>
      </section>
      
       
    )
    
}