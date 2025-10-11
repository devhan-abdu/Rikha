import React, { useState } from "react";
import {
    Dialog,
    DialogContent,
    DialogFooter,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog";
import {
    RadioGroup,
    RadioGroupItem,
} from "@/components/ui/radio-group";
import { Button } from "./ui/button";
import { MapPin, Edit3, CheckCircle2 } from "lucide-react";
import { AddressModal } from "./AddressModal";
import { ShippingData } from "@/interface";
import { DialogClose } from "@radix-ui/react-dialog";
import { useAddresses } from "@/lib/query/hook/useAddresses";
import { useDelete, useSetDefault } from "@/lib/query/mutations/useAddressMutations";


type Props = {
    isListOpen: boolean,
    setIsListOpen: (open: boolean) => void,
    selectedAddress: ShippingData | null,
    setSelectedAddress: React.Dispatch<React.SetStateAction<ShippingData | null>>
}

const AddressList = ({ isListOpen, setIsListOpen, selectedAddress, setSelectedAddress }: Props) => {
    const [isAddOpen, setIsAddOpen] = useState(false)
    const [isEdit, setIsEdit] = useState(false)
    const [item, setItem] = useState<ShippingData>()
    const { data: addresses = [] } = useAddresses();
    const setAsDefault = useSetDefault();
    const deleteAddress = useDelete();

    const handleClick = (isEdit: boolean, item?: ShippingData) => {

        setIsAddOpen(true);
        setIsListOpen(false);
        if (isEdit) {
            setItem(item);
            setIsEdit(true)
        } else {
            setIsEdit(false)
        }

    }

    return (
        <Dialog open={isListOpen} onOpenChange={setIsListOpen}>
            <form className="space-y-6">
                <DialogContent className="max-w-2xl rounded-2xl p-6 sm:p-8 overflow-y-auto bg-gradient-to-b from-white to-gray-50 shadow-xl">
                    <DialogHeader>
                        <DialogTitle className="text-lg font-semibold text-gray-800">
                            Select Delivery Address
                        </DialogTitle>
                    </DialogHeader>

                    <RadioGroup
                        value={String(selectedAddress?.id) || ""}
                        onValueChange={(val) => {
                            const chosen = addresses.find(a => String(a.id) === val)
                            if (chosen) setSelectedAddress(chosen)
                        }}
                        className="space-y-5 mt-4"
                    >
                        {addresses?.map((item) => (
                            <div
                                key={item.id}
                                className={`flex flex-col sm:flex-row sm:items-center justify-between border rounded-xl px-5 py-4 shadow-sm transition-all duration-200 ${selectedAddress?.id === item.id
                                    ? "border-primary bg-primary/5"
                                    : "border-gray-200 hover:bg-gray-50"
                                    }`}
                            >
                                <div className="flex items-start gap-3 w-full">
                                    <RadioGroupItem
                                        value={String(item.id)}
                                        id={String(item.id)}
                                        className="mt-1"
                                    />

                                    <label htmlFor={String(item.id)} className="flex-1 cursor-pointer space-y-1">
                                        <div className="flex justify-between items-center">
                                            <p className="font-semibold text-gray-800">{item.name}</p>
                                            {item.isDefault && (
                                                <span className="flex items-center text-sm text-primary gap-1 font-medium">
                                                    <CheckCircle2 className="w-4 h-4" />
                                                    Default
                                                </span>
                                            )}
                                        </div>

                                        <p className="text-gray-500 text-sm">{item.phoneNumber}</p>
                                        <p className="text-gray-600 text-sm">
                                            {item.subcity}, Woreda {item.woreda}, {item.city}
                                        </p>
                                        <p className="text-gray-500 text-sm">House No: {item.houseNumber}</p>
                                    </label>
                                </div>

                                <div className="flex sm:flex-col items-center sm:items-end gap-2 mt-3 sm:mt-0">
                                    <Button variant="ghost" className='text-blue-500 font-bold ' onClick={() => handleClick(true, item)}> Edit
                                    </Button>
                                    <Button variant="ghost" className='text-red-500 font-bold ' onClick={() => deleteAddress.mutate(item.id!)}> Delete
                                    </Button>
                                    {(!item.isDefault && item?.id) && (
                                        <Button
                                            variant="outline"
                                            className="text-primary border-primary hover:scale-95 transition-all duration-300 text-sm px-3 py-1"
                                            onClick={() => setAsDefault.mutate(item.id!)}
                                        >
                                            Set Default
                                        </Button>
                                    )}
                                </div>
                            </div>
                        ))}
                    </RadioGroup>


                    <DialogFooter className="mt-6 flex justify-end">
                        <Button
                            onClick={() => handleClick(false)}
                            type="submit"
                            className="bg-primary hover:scale-95 transition-all duration-300 text-white px-6 py-3 rounded-md w-full"
                        >
                            <MapPin className="text-primary font-bold " /> Add New Address
                        </Button>
                        <DialogClose asChild>
                            <Button variant="outline">Cancel</Button>
                        </DialogClose>
                    </DialogFooter>
                </DialogContent>
            </form>
            <AddressModal isEdit={isEdit} isOpen={isAddOpen} onOpenChange={setIsAddOpen} data={item} />
        </Dialog>
    );
};

export default AddressList;
