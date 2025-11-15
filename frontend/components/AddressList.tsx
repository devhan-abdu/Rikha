import React, { useState } from "react";
import {
    Dialog,
    DialogContent,
    DialogFooter,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "./ui/button";
import { MapPin } from "lucide-react";
import { ShippingData } from "@/interface";
import { DialogClose } from "@radix-ui/react-dialog";
import { useAddresses } from "@/lib/query/hook/useAddresses";

import AddressCard from "./AddressCard";
import AddressForm from "./AddressForm";


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
        <>
            <Dialog open={isListOpen} onOpenChange={setIsListOpen}>
                <form className="space-y-6">
                    <DialogContent className="max-w-2xl rounded-2xl p-6 sm:p-8 overflow-y-auto bg-gradient-to-b from-white to-gray-50 shadow-xl">
                        <DialogHeader>
                            <DialogTitle className="text-lg font-semibold text-gray-800">
                                Select Delivery Address
                            </DialogTitle>
                        </DialogHeader>
                        {
                            addresses.map((item) => (
                                <div
                                    onClick={() => setSelectedAddress(item)}
                                    key={item.id}
                                    className={`flex flex-col sm:flex-row sm:items-center justify-between border rounded-xl px-5 py-4 shadow-sm transition-all duration-200 ${selectedAddress?.id === item.id
                                        ? "border-primary bg-primary/5"
                                        : "border-gray-200 hover:bg-gray-50"
                                        }`}
                                >
                                    <AddressCard address={item} handleClick={handleClick} />
                                </div>
                            ))
                        }


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

            </Dialog>
            <Dialog open={isAddOpen} onOpenChange={setIsAddOpen}>
                <DialogTitle></DialogTitle>
                <DialogContent className="z-[999]">
                    <AddressForm isEdit={isEdit} setIsEdit={setIsEdit} data={item}/>
                </DialogContent>
            </Dialog>
        </>
    );
};

export default AddressList;
