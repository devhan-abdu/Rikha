'use client'

import AddressCard from "@/components/AddressCard";
import AddressForm from "@/components/AddressForm";
import { ShippingData } from "@/interface";
import { useAddresses } from "@/lib/query/hook/useAddresses";
import { useAppSelector } from "@/redux/hooks";
import { selectUser } from "@/redux/slices/authSlice";
import { useState } from "react";


const AddressPage = () => {
  const { data: addresses = [], isLoading } = useAddresses();
  const user = useAppSelector(selectUser)
  const [isEdit, setIsEdit] = useState(false)
  const [item, setItem] = useState<ShippingData | undefined>(undefined)


  const handleClick = (isEdit: boolean, item?: ShippingData) => {
    if (isEdit) {
      setItem(item);
      setIsEdit(true)
    } else {
      setIsEdit(false)
    }

    const formSection = document.getElementById("address");
    formSection?.scrollIntoView({ behavior: "smooth", block: "start" });
  }


  if (!user) <div> Loading ....</div>
  return (
    <div className="px-6 py-12 bg-white rounded-lg shadow-sm max-w-5xl mx-auto min-h-screen">
      <h2 className="text-3xl font-semibold font-cinzel text-center mb-6 ">Manage Addresses</h2>

      <section className="mb-12">
        <h2 className="text-xl font-semibold font-cinzel text-start mb-4">Your Saved Addresses</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2  gap-6">
          {isLoading ? (
            [1, 2].map((i) =>
              <div key={i} className='flex flex-col  w-full gap-2 bg-gray-50 border border-gray-200 rounded-xl p-4 shadow-sm hover:shadow-md transition-shadow duration-200 h-32'>
                <div className='bg-gray-200 animate-pulse duration-500 w-44 h-3' />
                <div className='bg-gray-200 animate-pulse duration-500 w-32 h-3' />
                <div className='bg-gray-200 animate-pulse duration-500 w-44 h-3' />
                <div className='bg-gray-200 animate-pulse duration-500 w-24 h-3' />
              </div>
            )
          ) :
            addresses.length > 0 ? (
              addresses.map((address) => (
                <div key={address.id} className="border border-gray-200 rounded-xl p-4 shadow-sm hover:shadow-md transition-shadow duration-200">
                  <AddressCard address={address} handleClick={handleClick} />
                </div>
              ))
            ) : (
              <p className="text-gray-500 text-sm italic">No saved addresses yet.</p>
            )}
        </div>
      </section>

      <hr className="my-10 border-gray-200" />
      <section id="address">
        <AddressForm
          isEdit={isEdit}
          setIsEdit={setIsEdit}
          data={item ?? undefined}
        />
      </section>

    </div>

  )
}

export default AddressPage
