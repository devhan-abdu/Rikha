import Image from "next/image"
import Contact from "@/components/Contact"
import Common from "@/components/Common"


const About = () => {
    return (
        <div className="text-foreground-500 p-6  max-w-[1260px] mx-auto" >
            <Common header="WELCOME TO RIKHA - YOUR ONE-STOP APPLE STORE" />
            <section className="py-12 md:py-16 space-y-20" id="about">
                <div className="space-y-2">
                    <h2 className="text-2xl  font-cinzel text-center"> FROM PASSION TO PERFECTION
                    </h2>
                    <p className="text-foreground-500/80 text-center max-w-[500px] mx-auto text-sm">
                        Bringing the best of Apple technology to your hands with quality, trust, and style.
                    </p>
                </div>

                <div className=" grid grid-cols-1 sm:grid-cols-2 items-center justify-center gap-12">
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


            {/* <section className="py-12 md:py-16">
                <p className="text-center mb-1 text-sm">Services</p>
                <h2 className=" text-2xl sm:text-3xl lg:text-4xl leading-[1.1] font-bold mb-4 capitalize text-center font-montserrat">
                    Solutions That Drive Success
                </h2>
                <p className="text-foreground-500/80 text-center max-w-[500px] mx-auto text-sm">
                    Smart services for growing modern brands
                </p>
                <div className="flex items-center justify-center mt-12 md:mt-16">
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {
                            aboutSolutions.map((item, index) => (
                                <div key={index} className={cn("serviceCard w-[300px] h-[230px] px-4 py-5 rounded-lg border-[1.5px] border-white/20 transform cursor-pointer transition duration-300 ")} >
                                    <h3 className="text-2xl  font-bold mb-4 text-center font-montserrat">{item.title}</h3>
                                    <ul className="list-disc pl-5 space-y-2 text-sm">
                                        {
                                            item.description.map((desc, index) => (
                                                <li key={index}>{desc}</li>
                                            ))
                                        }
                                    </ul>
                                </div>
                            ))
                        }
                    </div>
                </div>
            </section>

            <section className="py-10 md:py-14 ">
                <p className="text-center mb-1 text-sm">why choose us</p>
                <h2 className=" text-2xl sm:text-3xl lg:text-4xl leading-[1.1] font-bold mb-4 capitalize text-center font-montserrat">
                    Why NileAgency Stands Out
                </h2>
                <p className="text-foreground-500/80 text-center max-w-[500px] mx-auto text-sm">
                    Innovative strategies driving success for 100+ clients
                </p>

                <div className="mt-12 md:mt-20">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-6 items-center justify-center">
                        <div className=" ">
                            <Image
                                src={'/about/about.jpg'}
                                alt="About our team"
                                className={cn('rounded-xl shadow-lg object-cover w-full')}
                                width={800}
                                height={600}
                                loading="lazy"
                            />
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            {
                                whyChooseUs.map((item) => (
                                    <div key={item.id} className="text-left space-y-2 mb-6">
                                        <div>{item.icon}</div>
                                        <h3 className="text-lg font-semibold font-montserrat">{item.title}</h3>
                                        <p className="text-sm text-foreground-500/80 line-clamp-3">{item.desc}</p>
                                    </div>
                                ))
                            }
                        </div>
                    </div>
                </div>
            </section> */}
            < Contact />
        </div>
    )
}
export default About