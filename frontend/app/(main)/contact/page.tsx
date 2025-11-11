import Link from "next/link"
import Contact from "@/components/Contact"

const ContactPage = () => {
    return (
        <div className="px-4 md:px-6 py-6">
            <section className="relative min-h-[30vh] flex items-center justify-center">
                <div className="absolute inset-0 -z-10 h-full w-full bg-white bg-[linear-gradient(to_right,#8080800a_1px,transparent_1px),linear-gradient(to_bottom,#8080800a_1px,transparent_1px)] bg-[size:14px_24px]"><div className="absolute left-0 right-0 top-0 -z-10 m-auto h-[310px] w-[310px] rounded-full bg-primary opacity-20 blur-[100px]"></div></div>
                <div className="flex flex-col  items-center justify-center gap-8 ">
                    <h1 className="font-cinzel text-center text-2xl sm:text-3xl  lg:text-4xl  font-bold  capitalize ">WE&apos;VE GOT A GREAT FEALING ABOUT THIS</h1>
                    <Link href='/category' className="font-cinzel bg-primary text-white px-3.5 py-2.5 rounded-sm text-base capitalize z-10 hover:scale-95 transition-all duration-300"> Explore Our Product</Link>
                </div>
            </section>
            <Contact/>
        </div>

    )
}

export default ContactPage