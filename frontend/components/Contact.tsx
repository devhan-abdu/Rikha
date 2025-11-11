'use client'
import { Button } from "./ui/button";
import { SubmitHandler, useForm } from "react-hook-form";
import { ContactData, ContactSchema } from "@/interface";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "react-toastify";
import api from "@/lib/api";



const Contact = () => {

    const {
        handleSubmit,
        register,
        reset,
        formState: { isSubmitting, errors }
    } = useForm<ContactData>({
        resolver: zodResolver(ContactSchema)
    })


    const onSubmit: SubmitHandler<ContactData> = async (data: ContactData) => {
        try {
            await api.post('/contact', data)
            toast.success('Message sent!');
            reset({
                name: "",
                email: "",
                phoneNumber: "",
                subject: "",
                message: "",
            });
        } catch (error) {
            console.log(error)
            toast.error('Unexpected error occurred.');
        }
    };


    return (
        <div className="py-10 ">
            <h2 className="text-2xl  font-cinzel text-center">GET IN TOUCH WITH US</h2>
            <p className="text-foreground-500/80 text-center max-w-[500px] mx-auto text-sm">
                We&apos;re here to assist you with any inquiries, orders, or feedback — just send us a message below.
            </p>

            <div className="flex flex-col md:flex-row place-content-center items-start gap-12  mt-8 md:mt-12">
                <form className=" flex flex-col gap-6 md:w-1/2 w-full" onSubmit={handleSubmit(onSubmit)}>
                    <div className="space-y-2 relative">
                        <input
                            id="name"
                            type="text"
                            {...register("name")}
                            placeholder="Your name"
                            className=" px-3 py-2 border border-black/80 rounded-md  placeholder:text-black/60  outline-none focus:ring-1 focus:ring-black w-full"
                        />
                        {errors.name && <p className="text-red-500 text-xs">{errors.name?.message}</p>}
                    </div>
                    <div className="space-y-2 relative">
                        <input
                            id="email"
                            type="email"
                            {...register("email")}
                            placeholder="Email address"
                            className=" px-3 py-2 border border-black/80 rounded-md  placeholder:text-black/60  outline-none focus:ring-1 focus:ring-black w-full"
                        />
                        {errors.email && <p className="text-red-500 text-xs">{errors.email?.message}</p>}
                    </div>
                    <div className="space-y-2 relative">
                        <input
                            id="phoneNumber"
                            type="text"
                            {...register("name")}
                            placeholder="Phone number"
                            className=" px-3 py-2 border border-black/80 rounded-md  placeholder:text-black/60  outline-none focus:ring-1 focus:ring-black w-full"
                        />
                        {errors.phoneNumber && <p className="text-red-500 text-xs">{errors.phoneNumber?.message}</p>}
                    </div>
                    <div className="space-y-2 relative">
                        <input
                            id="subject"
                            type="text"
                            {...register("email")}
                            placeholder="Subject"
                            className=" px-3 py-2 border border-black/80 rounded-md  placeholder:text-black/60  outline-none focus:ring-1 focus:ring-black w-full"
                        />
                        {errors.subject && <p className="text-red-500 text-xs">{errors.subject?.message}</p>}
                    </div>
                    <div className="space-y-2 relative">
                        <textarea
                            id="message"
                            rows={4}
                            {...register("email")}
                            placeholder="Message"
                            className="mt-2 px-3 py-2 rounded-md span-col-2 border border-black/80   placeholder:text-black/60 outline-none text-gray-200 focus:outline-ring-1 focus:ring-black  col-span-2 min-h-24 w-full" />
                        {errors.message && <p className="text-red-500 text-xs">{errors.message?.message}</p>}
                    </div>
                    <Button disabled={isSubmitting} className='rounded-md px-6 py-3 cursor-pointer w-max self-start md:self-end text-white font-bold'>{isSubmitting ? "Sending..." : "Send Message"}</Button>
                </form>
                <div className="space-y-4  rounded-xl px-6 p-6 w-max h-max ">
                    <h6 className="text-xl capitalize font-bold text-center">Contact Info</h6>
                    <div className="space-y-2">
                        <div className="inline-flex gap-2 items-center">
                            <h6 className="text-md font-semibold">Phone Number</h6>
                        </div>
                        <p className="ml-8 mb-1 text-sm text-foreground-500/90">+25195234125</p>
                        <p className="ml-8 text-sm text-foreground-500/90">+251743567212</p>
                    </div>

                    <div className="space-y-2">
                        <div className="inline-flex gap-2 items-center">
                            <h6 className="text-md font-semibold">Email</h6>
                        </div>
                        <p className="ml-8 mb-1 text-sm text-foreground-500/90">rikha12@gmail.com</p>
                        <p className="ml-8 text-sm text-foreground-500/90">rikhahan@gmail.com</p>
                    </div>

                </div>
            </div>
        </div>
    )
}

export default Contact;