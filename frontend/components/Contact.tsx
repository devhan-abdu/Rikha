'use client'
import { Button } from "./ui/button";
import { SubmitHandler, useForm } from "react-hook-form";
import { ContactData, ContactSchema } from "@/interface";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "react-toastify";
import api from "@/lib/api";
import { InputField } from "./ui/InputField";



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
            reset();
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

                    <InputField
                        label="name *"
                        name="name"
                        register={register("name")}
                        error={errors.name?.message}
                    />
                    <InputField
                        label="Email *"
                        name="email"
                        register={register("email")}
                        error={errors.email?.message}
                    />
                    <InputField
                        label="phoneNumber *"
                        name="phoneNumber"
                        register={register("phoneNumber")}
                        error={errors.phoneNumber?.message}
                    />
                    <InputField
                        label="subject *"
                        name="subject"
                        register={register("subject")}
                        error={errors.subject?.message}
                    />
                    <div className="flex flex-col gap-1">
                        <textarea
                            id="message"
                            rows={5}
                            {...register("message")}
                            placeholder="Message"
                            className="rounded-md px-4 py-2 text-sm shadow-sm focus:outline-none border border-slate-200 placeholder:text-black/60 outline-none focus:ring-1 focus:ring-black w-full resize-none"
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