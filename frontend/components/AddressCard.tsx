import { ShippingData } from '@/interface'
import React from 'react'
import { Button } from './ui/button'
import { CheckCircle2, Edit2Icon, Trash2Icon } from 'lucide-react'
import { useDelete, useSetDefault } from '@/lib/query/mutations/useAddressMutations'
import { toast } from 'react-toastify'

type Props = {
    address: ShippingData,
    handleClick: (isEdit: boolean, item?: ShippingData) => void,
}

const AddressCard = ({ address, handleClick }: Props) => {
    const deleteAddress = useDelete();
    const setAsDefault = useSetDefault();


    const handleDelete = (id: number) => {
        deleteAddress.mutate(id, {
            onSuccess: () => {
                toast.success("Address deleted successfully");
            }
        });
    }
    return (
        <div className='w-full '>
            <div className="flex justify-between items-start">
                <div className="space-y-1">
                    <p className="text-gray-800 font-medium">{address.name}</p>
                    <p className="text-sm text-gray-600">{address.phoneNumber}</p>
                    <p className="text-sm text-gray-600">
                        {address.subcity}, Woreda {address.woreda}, {address.city}
                    </p>
                    <p className="text-sm text-gray-500">House No: {address.houseNumber}</p>
                </div>
                <div className="flex flex-col gap-2">
                    <Button variant="ghost" size="icon" className="text-blue-600 hover:bg-blue-50 rounded-full"
                      onClick={() => handleClick(true, address)}
                    >
                        <Edit2Icon size={18} />
                    </Button>
                    <Button variant="ghost" size="icon" className="text-red-600 hover:bg-red-50 rounded-full" onClick={() => handleDelete(address.id!)}>
                        <Trash2Icon size={18} />
                    </Button>
                </div>
            </div>
            {(!address.isDefault && address?.id) && (
                <Button variant="ghost" size="sm" className="text-sm text-primary mt-3"
                    onClick={() => setAsDefault.mutate(address.id!)}
                >
                    Set as Default
                </Button>
            )}
            {address.isDefault && (
                <span className="flex items-center text-sm text-primary gap-1 font-medium mt-3">
                    <CheckCircle2 className="w-4 h-4" />
                    Default
                </span>
            )}
        </div>
    )
}

export default AddressCard
