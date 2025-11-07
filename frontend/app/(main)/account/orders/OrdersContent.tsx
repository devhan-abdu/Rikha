"use client";

import { useMemo, useState } from "react";
import OrderCard from "@/components/OrderCard";
import { cn } from "@/lib/utils";
import { orderTab } from "@/constants";
import { Order } from "@/interface";
import { useOrder } from "@/lib/query/hook/useAddresses";
import Link from "next/link";

export default function OrderContent() {
    const { data: orders = [], isLoading } = useOrder();
    const [tab, setTab] = useState("all");

    const sortedOrders: Order[] = useMemo(() => {
        if (!orders) return [];
        switch (tab) {
            case "topay": return orders.filter((o) => o.orderStatus === "PENDING_PAYMENT");
            case "processing": return orders.filter((o) => o.orderStatus === "PROCESSING");
            case "shipped": return orders.filter((o) => o.orderStatus === "SHIPPED");
            case "delivered": return orders.filter((o) => o.orderStatus === "DELIVERED");
            case "cancelled": return orders.filter((o) => o.orderStatus === "CANCELLED");
            default: return orders;
        }
    }, [tab, orders]);

    return (
        <div className="px-6 pt-8 pb-12 bg-white rounded-lg shadow-sm max-w-5xl mx-auto min-h-screen">
            <h2 className="text-3xl font-semibold font-cinzel text-center mb-6">
                My Orders
            </h2>

            <div className="flex gap-4 overflow-x-auto scrollbar-hide bg-gray-50 p-4 rounded-lg shadow-sm mb-8">
                {orderTab.map((t) => (
                    <button
                        key={t.value}
                        onClick={() => setTab(t.value)}
                        className={cn(
                            "px-5 py-2.5 text-sm font-medium whitespace-nowrap rounded-full transition-all",
                            tab === t.value
                                ? "bg-primary text-white shadow-md"
                                : "bg-white text-gray-600 hover:bg-gray-100"
                        )}
                    >
                        {t.name}
                    </button>
                ))}
            </div>

            <div className="space-y-6">
                {isLoading ? (
                    [1, 2, 3].map((i) => (
                        <div
                            key={i}
                            className="bg-gray-50 border border-gray-200 rounded-xl p-6 shadow-sm animate-pulse"
                        >
                            <div className="h-6 bg-gray-200 rounded w-40 mb-4"></div>
                            <div className="space-y-3">
                                <div className="h-4 bg-gray-200 rounded"></div>
                                <div className="h-4 bg-gray-200 rounded w-4/6"></div>
                            </div>
                        </div>
                    ))
                ) : sortedOrders.length === 0 ? (
                    <div className="text-center py-20">
                        <div className="bg-gray-100 border-2 border-dashed rounded-xl w-32 h-32 mx-auto mb-6" />
                        <h3 className="text-xl font-semibold text-gray-700 mb-2">
                            No orders yet
                        </h3>
                        <p className="text-gray-500 max-w-xs mx-auto mb-6">
                            Your order history will appear here once you make a purchase.
                        </p>
                        <Link
                            href="/category"
                            className="inline-block px-8 py-3 bg-primary text-white rounded-lg hover:bg-primary-dark transition font-medium"
                        >
                            Start Shopping
                        </Link>
                    </div>
                ) : (

                    sortedOrders.map((order) => (
                        <OrderCard key={order.id} order={order} />
                    ))
                )}
            </div>
        </div>
    );
}