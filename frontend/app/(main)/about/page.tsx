import Image from "next/image"
import Contact from "@/components/Contact"
import Link from "next/link"


const About = () => {
    return (
        <div className="text-foreground-500 p-6  max-w-[1260px] mx-auto" >

            <section className="relative min-h-[60vh] flex items-center justify-center">
                <div className="absolute inset-0 -z-10 h-full w-full bg-white bg-[linear-gradient(to_right,#8080800a_1px,transparent_1px),linear-gradient(to_bottom,#8080800a_1px,transparent_1px)] bg-[size:14px_24px]"><div className="absolute left-0 right-0 top-0 -z-10 m-auto h-[310px] w-[310px] rounded-full bg-primary opacity-20 blur-[100px]"></div></div>
                <div className="flex flex-col  items-center justify-center gap-8 ">
                    <h1 className="font-cinzel text-center text-2xl sm:text-3xl  lg:text-4xl  font-bold  capitalize ">WELCOME TO RIKHA - YOUR ONE-STOP APPLE STORE</h1>
                    <Link href='/category' className="font-cinzel bg-primary text-white px-3.5 py-2.5 rounded-sm text-base capitalize z-10 hover:scale-95 transition-all duration-300"> Explore Our Product</Link>
                </div>
            </section>

            <section className="space-y-12 mb-6" id="about">
                <h2 className="text-2xl  font-cinzel text-center"> FROM PASSION TO PERFECTION
                </h2>

                <div className=" grid grid-cols-1 sm:grid-cols-2  justify-center gap-12">
                    <div className=" ">
                        <Image
                            src={'/images/about2.avif'}
                            alt="Rikha store display"
                            width={400}
                            height={400}
                            className="rounded-xl  object-cover sm:ml-auto mx-auto w-full"
                        />
                    </div>

                    <div className="leading-8 ">
                        <p>
                            <strong>Rikha</strong> is your trusted destination for Apple products — from iPhones and MacBooks to AirPods and wearables.
                            We&apos;re passionate about offering the latest devices, accessories, and unmatched customer experiences.
                        </p>
                        <br />
                        <p>
                            Our mission is simple — to make premium technology accessible, reliable, and inspiring.
                            Whether you&apos;re upgrading your device or exploring new Apple innovations, Rikha brings you closer to what you love.
                        </p>
                    </div>
                </div>
            </section>
            < Contact />
        </div>
    )
}
export default About