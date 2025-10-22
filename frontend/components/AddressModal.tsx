import { Button } from "@/components/ui/button"
import {
    Dialog,
    DialogClose,
    DialogContent,
    DialogFooter,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog"
import { Controller, SubmitHandler, useForm } from 'react-hook-form'
import { ShippingData, ShippingSchema } from "@/interface"
import { zodResolver } from "@hookform/resolvers/zod"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "./ui/select"
import { ChevronLeft, MapPin } from "lucide-react"
import Link from "next/link"
import { useCreate, useUpdate } from "@/lib/query/mutations/useAddressMutations"
import { toast } from "react-toastify"
import { useEffect } from "react"

type Props = {
    isEdit: boolean,
    data?: ShippingData,
    isOpen?: boolean;
    onOpenChange: (open: boolean) => void;
}

export function AddressModal({ isEdit, data, isOpen, onOpenChange }: Props) {
    const { mutate: createAddress, isPending: addPending } = useCreate();
    const { mutate: updateAddress, isPending: editPending } = useUpdate()

    const subcityOptions = [
        "Addis Ketema",
        "Akaky Kaliti",
        "Arada",
        "Bole",
        "Gullele",
        "Kirkos",
        "Kolfe Keranio",
        "Lideta",
        "Nifas Silk-Lafto",
        "Yeka",
        "Lemi Kura"
    ]

    const inputClass = "w-full block border border-black/20 shadow-md rounded-sm py-1.5 px-2 text-base text-black placeholder:text-black/60 focus:outline-none sm:text-sm/6";
    const errorClass = "text-sm text-red-500 mt-1";

    const {
        register,
        handleSubmit,
        reset,
        control,
        formState: { errors },
    } = useForm<ShippingData>({
        resolver: zodResolver(ShippingSchema),
        defaultValues: isEdit && data ? data : {},
    })

    useEffect(() => {
    if (isEdit && data) {
        reset(data);
    }
}, [isEdit, data, reset]);


    type FieldName = keyof ShippingData;
    const ErrorMessage = ({ field }: { field: FieldName }) =>
        errors[field] ? <p className={errorClass}>{(errors[field]?.message as string) || ''}</p> : null;


    const onSubmit: SubmitHandler<ShippingData> = async (data: ShippingData) => {
        if (isEdit && data.id) {
            updateAddress({ id: data.id, data }, {
                onSuccess: () => {
                    toast.success("Address updated successfully");
                    onOpenChange(false);
                    reset();
                }
            })
        } else {
            createAddress(data, {
                onSuccess: () => {
                    toast.success("Address saved successfully");
                    onOpenChange(false);
                    reset()
                }
            })
        }
        onOpenChange(false)
    }


    return (
        <Dialog open={isOpen} onOpenChange={onOpenChange}>
            <DialogContent className="max-w-2xl rounded-2xl p-6 sm:p-8 overflow-y-auto bg-gradient-to-b from-white to-gray-50 shadow-xl">
                <form className="" onSubmit={handleSubmit(onSubmit)}>


                    <DialogHeader>
                        <DialogTitle className="text-lg font-semibold text-gray-800">
                            {!isEdit ? "Add New Address" : "Edit Address"}
                        </DialogTitle>
                    </DialogHeader>
                    <div className="space-y-4 mt-4">
                        <div className="flex flex-wrap items-center gap-4 justify-between">

                            <div className="flex-1 flex flex-col gap-2 max-w-[200px]">
                                <label htmlFor="country" className="text-sm text-black">Country</label>
                                <input
                                    type="text"
                                    id="country"
                                    {...register("country")}
                                    placeholder="Ethiopia "
                                    className={inputClass}
                                    value={"Ethiopia"}
                                    disabled
                                />
                                <ErrorMessage field="country" />
                            </div>
                            <div className="flex-1 flex flex-col gap-2 max-w-[200px]">
                                <label htmlFor="country" className="text-sm text-black">City</label>
                                <input
                                    type="text"
                                    id="country"
                                    {...register("city")}
                                    placeholder="addis Ababa "
                                    className={inputClass}
                                    value={"Addis Ababa"}
                                    disabled
                                />
                                <ErrorMessage field="country" />
                            </div>
                        </div>

                        <div className="flex flex-wrap items-center gap-4 justify-between">
                            <div className="flex-1 flex flex-col gap-2">
                                <label htmlFor="name" className="text-sm text-black">Contact Name</label>
                                <input
                                    type="text"
                                    id="name"
                                    {...register("name")}
                                    placeholder="First name"
                                    className={inputClass}
                                />
                                <ErrorMessage field="name" />
                            </div>
                            <div className="flex flex-col gap-2">
                                <label htmlFor="phoneNumber" className="text-sm text-black">Phone Number</label>
                                <input
                                    type="tel"
                                    id="phoneNumber"
                                    {...register("phoneNumber")}
                                    placeholder="09xxxxxxxx or 07xxxxxxxx"
                                    className={inputClass}
                                />
                                <ErrorMessage field="phoneNumber" />
                            </div>
                        </div>

                        <div className="flex flex-col gap-2">
                            <label htmlFor="subcity" className="text-sm text-black">
                                Sub City
                            </label>
                            <Controller
                                name="subcity"
                                control={control}
                                render={({ field }) => (
                                    <Select onValueChange={field.onChange} value={field.value}>
                                        <SelectTrigger className="w-full border border-black/20 shadow-md rounded-sm py-2">
                                            <SelectValue placeholder="Select sub city" />
                                        </SelectTrigger>
                                        <SelectContent className="bg-white shadow-2xl z-[999999] overflow-y-scroll">
                                            {subcityOptions.map((item) => (
                                                <SelectItem key={item} value={item}>
                                                    {item}
                                                </SelectItem>
                                            ))}
                                        </SelectContent>
                                    </Select>
                                )}
                            />
                            {errors.subcity && (
                                <p className="text-red-500 text-sm">{errors.subcity.message}</p>
                            )}
                        </div>

                        <div className="flex flex-wrap items-center gap-4 justify-between">
                            <div className="flex-1 flex flex-col gap-2">
                                <label htmlFor="woreda" className="text-sm text-black">Woreda</label>
                                <input
                                    type="text"
                                    id="woreda"
                                    {...register("woreda")}
                                    placeholder="e.g., Bole"
                                    className={inputClass}
                                />
                                <ErrorMessage field="woreda" />
                            </div>
                            <div className="flex-1 flex flex-col gap-2">
                                <label htmlFor="houseNumber" className="text-sm text-black">House Number </label>
                                <input
                                    type="text"
                                    id="houseNumber"
                                    {...register("houseNumber")}
                                    placeholder="e.g., 1000"
                                    className={inputClass}
                                />
                                <ErrorMessage field="houseNumber" />
                            </div>
                        </div>



                        <div className="flex items-center gap-2">
                            <input type='checkbox' id="setAsDefault" {...register("isDefault")} />
                            <label htmlFor="setAsDefault" className="text-sm text-black">
                                Set as default address
                            </label>
                        </div>
                    </div>

                    <div className="flex flex-wrap items-center justify-between gap-3 pt-2 mt-4 border-t border-black/10">
                        <Link href="/cart" className="flex items-center gap-2 text-sm text-black/80 hover:text-primary duration-500">
                            <ChevronLeft size={16} />
                            <span>Return to Cart</span>
                        </Link>
                        c
                    </div>

                    {errors.root && <p className={errorClass}>{errors.root.message}</p>}

                    <DialogFooter className="mt-6 flex justify-end">
                        <Button
                            type="submit"
                            className="bg-primary hover:scale-95 transition-all duration-300 text-white px-6 py-3 rounded-md w-full"
                        >
                            <MapPin className="text-primary font-bold " />
                            {isEdit ? (editPending ? "Editing..." : "Edit Address") : (addPending ? "Saving..." : "Save Address")}
                        </Button>
                        <DialogClose asChild>
                            <Button variant="outline">Cancel</Button>
                        </DialogClose>
                    </DialogFooter>
                </form >

            </DialogContent>
        </Dialog >
    )
}