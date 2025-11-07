// app/address/AddressContent.tsx
"use client";

import AddressCard from "@/components/AddressCard";
import AddressForm from "@/components/AddressForm";
import { ShippingData } from "@/interface";
import { useAddresses } from "@/lib/query/hook/useAddresses";
import { useState } from "react";

export default function AddressContent() {
    const { data: addresses = [], isLoading } = useAddresses();
    const [isEdit, setIsEdit] = useState(false);
    const [item, setItem] = useState<ShippingData | undefined>(undefined);

    const handleClick = (isEdit: boolean, address?: ShippingData) => {
        setItem(address);
        setIsEdit(isEdit);
        document
            .getElementById("address-form")
            ?.scrollIntoView({ behavior: "smooth", block: "start" });
    };

    return (
        <div className="px-6 py-12 bg-white rounded-lg shadow-sm max-w-5xl mx-auto min-h-screen">
            <h2 className="text-3xl font-semibold font-cinzel text-center mb-10">
                Manage Addresses
            </h2>

            <section className="mb-12">
                <h3 className="text-xl font-semibold font-cinzel mb-6 text-gray-800">
                    Your Saved Addresses
                </h3>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                    {isLoading ? (
                        [1, 2].map((i) => (
                            <div
                                key={i}
                                className=" border border-gray-200 rounded-xl p-6 shadow-sm animate-pulse"
                            >
                                <div className="space-y-3">
                                    <div className="h-5 bg-gray-200 rounded w-48"></div>
                                    <div className="h-4 bg-gray-200 rounded w-36"></div>
                                    <div className="h-4 bg-gray-200 rounded w-44"></div>
                                    <div className="h-4 bg-gray-200 rounded w-28"></div>
                                </div>
                            </div>
                        ))
                    ) : addresses.length > 0 ? (
                        addresses.map((address) => (
                            <div
                                key={address.id}
                                className=" border border-gray-200 rounded-xl p-6 shadow-sm hover:shadow-lg transition-all duration-300 hover:border-primary/30"
                            >
                                <AddressCard address={address} handleClick={handleClick} />
                            </div>
                        ))
                    ) : (
                        <div className="col-span-2 text-center py-20">
                            <div className="bg-gray-100 border-2 border-dashed rounded-xl w-32 h-32 mx-auto mb-6" />
                            <h3 className="text-xl font-semibold text-gray-700 mb-2">
                                No saved addresses yet
                            </h3>
                            <p className="text-gray-500 max-w-xs mx-auto mb-6">
                                Add your first address below to speed up checkout.
                            </p>
                            <button
                                onClick={() => handleClick(false)}
                                className="inline-block px-8 py-3 bg-primary text-white rounded-lg hover:bg-primary-dark transition font-medium shadow-md"
                            >
                                Add New Address
                            </button>
                        </div>
                    )}
                </div>
            </section>

            <hr className="my-12 border-gray-200" />

            <section id="address-form">
                <AddressForm
                    isEdit={isEdit}
                    setIsEdit={setIsEdit}
                    data={item ?? undefined}
                />
            </section>
        </div>
    );
}