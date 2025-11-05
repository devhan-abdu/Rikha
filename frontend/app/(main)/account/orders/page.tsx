"use client"
import React, { useMemo, useState } from 'react'
import OrderCard from '@/components/OrderCard';
import { cn } from '@/lib/utils';
import { orderTab } from '@/constants';
import { useOrder } from '@/lib/query/hook/useAddresses';
import { Order } from '@/interface';


const OrderPage = () => {

    const { data: orders, isLoading } = useOrder()

    const [tab, setTab] = useState("all")
    const displayedOrder = orders ?? []

    const sortedProducts: Order[] = useMemo(() => {
        switch (tab) {
            case "topay":
                return [...displayedOrder].filter((order) => (order.orderStatus === "PENDING_PAYMENT"));
            case "processing":
                return [...displayedOrder].filter((order) => order.orderStatus === "PROCESSING");
            case "shipped":
                return [...displayedOrder].filter((order) => order.orderStatus === "SHIPPED");
            case "delivered":
                return [...displayedOrder].filter((order) => order.orderStatus === "DELIVERED");
            case "cancelled":
                return [...displayedOrder].filter((order) => order.orderStatus === "CANCELLED");
            default:
                return displayedOrder;
        }
    }, [tab, orders])

    return (
        <div className=''>
            <div className="flex gap-4 overflow-x-auto scrollbar-hide bg-white p-3 rounded-md">
                {orderTab.map(t => (
                    <button
                        key={t.value}
                        onClick={() => setTab(t.value)}
                        className={cn(
                            "px-3 py-2 text-sm whitespace-nowrap cursor-pointer",
                            tab === t.value && "border-b-2 border-primary font-semibold"
                        )}
                    >
                        {t.name}
                    </button>
                ))}
            </div>

            <div className=' '>
                {
                    isLoading ? (
                        [1, 2, 3, 4, 5].map(item => (
                            <div key={item} className='w-full h-24 bg-gray-100 animate-pulse' />
                        ))

                    ) : sortedProducts?.length <= 0 ? (
                        <div>
                            No order
                        </div>
                    ) : (
                        <div className='space-y-4'>
                            {
                                sortedProducts?.map(order => (
                                    <OrderCard order={order} />
                                ))
                            }
                        </div>
                    )
                }

            </div>
        </div>

    )
}

export default OrderPage
