"use client"
import { Button } from "@/components/ui/button"
import { Controller, SubmitHandler, useForm } from 'react-hook-form'
import { ShippingData, ShippingSchema } from "@/interface"
import { zodResolver } from "@hookform/resolvers/zod"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "./ui/select"
import { useCreate, useUpdate } from "@/lib/query/mutations/useAddressMutations"
import { toast } from "react-toastify"
import { useEffect } from "react"
import { subcityOptions } from "@/constants"
import { InputField } from "./ui/InputField"

type Props = {
    isEdit: boolean,
    setIsEdit: (isEdit: boolean) => void,
    selectedAddress?: ShippingData;
    setSelectedAddress:(address: ShippingData) => void
}
const AddressForm = ({ isEdit, selectedAddress,setSelectedAddress, setIsEdit }: Props) => {
    const { mutate: createAddress, isPending: addPending } = useCreate();
    const { mutate: updateAddress, isPending: editPending } = useUpdate()

    const {
        register,
        handleSubmit,
        reset,
        control,
        formState: { errors },
    } = useForm<ShippingData>({
        resolver: zodResolver(ShippingSchema),
        defaultValues: {
            country: "Ethiopia",
            city: "Addis Ababa",
            name: "",
            phoneNumber: "",
            subcity: "",
            woreda: "",
            houseNumber: "",
            isDefault: false
        },
        values: isEdit && selectedAddress ? selectedAddress : undefined,
    })

    const onSubmit: SubmitHandler<ShippingData> = async (data: ShippingData) => {
        if (isEdit && data.id) {
            updateAddress({ id: data.id, data }, {
                onSuccess: () => {
                    toast.success("Address updated successfully");
                }
            })
        } else {
            createAddress(data, {
                onSuccess: () => {
                    toast.success("Address saved successfully");
                }
            })
        }
            reset();
        setIsEdit(false);
        setIsEdit(false);
    }

    return (

        <div className="max-w-2xl mr-auto px-4 md:px-6 bg-white" id="address">
            <h2 className="text-xl font-semibold font-cinzel text-start mb-4">{!isEdit ? "Add New Address" : "Edit Address"}</h2>
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <InputField
                        label="Country"
                        name="country"
                        register={register("country")}
                        error={errors.country?.message}
                        defaultValue="Ethiopia"
                        readOnly={true}
                    />

                    <InputField
                        label="City"
                        name="city"
                        register={register("city")}
                        error={errors.city?.message}
                        defaultValue="Addis Ababa"
                        readOnly={true}
                    />

                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <InputField label="Full Name" name="name" register={register("name")} error={errors.name?.message} />
                    <InputField label="Phone Number" name="phoneNumber" register={register("phoneNumber")} error={errors.phoneNumber?.message} />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 ">
                    <Controller
                        name="subcity"
                        control={control}
                        render={({ field }) => (
                            <div className="flex flex-col gap-2">
                                <label className="text-sm font-medium text-gray-700">Sub City</label>
                                <Select onValueChange={field.onChange} value={field.value}>
                                    <SelectTrigger className="border-gray-300 focus:ring-2 focus:ring-primary/30 rounded-md">
                                        <SelectValue placeholder="Select sub city" />
                                    </SelectTrigger>
                                    <SelectContent className="bg-white z-[9999]">
                                        {subcityOptions.map((item) => (
                                            <SelectItem key={item} value={item}>{item}</SelectItem>
                                        ))}
                                    </SelectContent>
                                </Select>
                                {errors.subcity && <p className="text-xs text-red-500">{errors.subcity.message}</p>}
                            </div>
                        )}
                    />
                    <InputField label="Woreda" name="woreda" register={register("woreda")} error={errors.woreda?.message} />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <InputField label="House Number" name="houseNumber" register={register("houseNumber")} error={errors.houseNumber?.message} />
                </div>
                <div className="flex items-center gap-2 mt-6">
                    <input type="checkbox" id="isDefault" {...register("isDefault")} />
                    <label htmlFor="isDefault" className="text-sm text-gray-700">Set as Default Address</label>
                </div>

                <div className="flex items-center mt-4 gap-4">
                    <Button
                        type="submit"
                        disabled={addPending}
                        className="bg-primary hover:opacity-90 text-white px-6 py-3 rounded-lg "
                    >
                        {isEdit ? (editPending ? "Editing..." : "Edit Address") : (addPending ? "Saving..." : "Save Address")}
                    </Button>
                    {isEdit && (
                        <Button type="submit" variant="outline"
                            //    onClick={() => { setSelectedAddress(null); setIsEdit(false) }}
                            className="bg-gray-600 text-white hover:bg-gray-700 transition-colors duration-300">
                            Cancell
                        </Button>
                    )
                    }
                </div>

            </form>

        </div>
    )
}

export default AddressForm
