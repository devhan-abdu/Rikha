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
        <div className="py-12 px-4 md:px-12">
            <h2 className="text-2xl md:text-3xl font-cinzel text-center font-bold">
                GET IN TOUCH WITH US
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-10 md:gap-16 mt-8 md:mt-12 max-w-5xl mx-auto">
                <form className="flex flex-col gap-5 w-lg mx-auto md:w-full " onSubmit={handleSubmit(onSubmit)}>
                    <div className="flex flex-col gap-1">
                        <input
                            id="name"
                            type="text"
                            {...register("name")}
                            placeholder="Your name"
                            className="px-3 py-2 border border-black/20 rounded-md placeholder:text-black/60 outline-none focus:ring-1 focus:ring-black w-full"
                        />
                        {errors.name && <p className="text-red-500 text-xs">{errors.name?.message}</p>}
                    </div>

                    <div className="flex flex-col gap-1">
                        <input
                            id="email"
                            type="email"
                            {...register("email")}
                            placeholder="Email address"
                            className="px-3 py-2 border border-black/20 rounded-md placeholder:text-black/60 outline-none focus:ring-1 focus:ring-black w-full"
                        />
                        {errors.email && <p className="text-red-500 text-xs">{errors.email?.message}</p>}
                    </div>

                    <div className="flex flex-col gap-1">
                        <input
                            id="phoneNumber"
                            type="text"
                            {...register("phoneNumber")}
                            placeholder="Phone number"
                            className="px-3 py-2 border border-black/20 rounded-md placeholder:text-black/60 outline-none focus:ring-1 focus:ring-black w-full"
                        />
                        {errors.phoneNumber && <p className="text-red-500 text-xs">{errors.phoneNumber?.message}</p>}
                    </div>

                    <div className="flex flex-col gap-1">
                        <input
                            id="subject"
                            type="text"
                            {...register("subject")}
                            placeholder="Subject"
                            className="px-3 py-2 border border-black/20 rounded-md placeholder:text-black/60 outline-none focus:ring-1 focus:ring-black w-full"
                        />
                        {errors.subject && <p className="text-red-500 text-xs">{errors.subject?.message}</p>}
                    </div>

                    <div className="flex flex-col gap-1">
                        <textarea
                            id="message"
                            rows={5}
                            {...register("message")}
                            placeholder="Message"
                            className="px-3 py-2 border border-black/20 rounded-md placeholder:text-black/60 outline-none focus:ring-1 focus:ring-black w-full resize-none"
                        />
                        {errors.message && <p className="text-red-500 text-xs">{errors.message?.message}</p>}
                    </div>

                    <Button
                        disabled={isSubmitting}
                        className="self-start px-6 py-3 rounded-md font-bold text-white bg-primary hover:bg-primary/90"
                    >
                        {isSubmitting ? "Sending..." : "Send Message"}
                    </Button>
                </form>

                <div className="bg-gray-50 rounded-xl p-6 flex flex-col gap-6">
                    <h6 className="text-xl font-bold text-center">Contact Info</h6>

                    <div className="space-y-2">
                        <h6 className="text-md font-semibold">Phone Number</h6>
                        <p className="ml-2 text-sm text-gray-700">+25195234125</p>
                        <p className="ml-2 text-sm text-gray-700">+251743567212</p>
                    </div>

                    <div className="space-y-2">
                        <h6 className="text-md font-semibold">Email</h6>
                        <p className="ml-2 text-sm text-gray-700">rikha12@gmail.com</p>
                        <p className="ml-2 text-sm text-gray-700">rikhahan@gmail.com</p>
                    </div>
                </div>
            </div>
        </div>

    )
}

export default Contact;