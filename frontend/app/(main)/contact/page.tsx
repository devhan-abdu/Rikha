import Link from "next/link"
import Contact from "@/components/Contact"
import Common from "@/components/Common"

const ContactPage = () => {
    return (
        <div className='p-6  max-w-[1260px] mx-auto'>
            <Common header=" WE&apos;VE GOT A GREAT FEALING ABOUT THIS " />
            <section id='contact'>
                <Contact />
            </section>
        </div>
    )
}

export default ContactPage