"use client";

import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Order } from "@/interface";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { addCartItem, selectCartItems } from "@/redux/slices/cartSlice";
import { useRemove, useUpdateOrder } from "@/lib/query/mutations/useOrderMutation";
import { useRouter } from "next/navigation";
import { selectAll } from "@/redux/slices/selectedItemsSlice";
import { Package, Calendar, Trash2, ShoppingCart, XCircle, CreditCard } from "lucide-react";

export default function OrderCard({ order }: { order: Order }) {
    const dispatch = useAppDispatch();
    const cartItems = useAppSelector(selectCartItems);
    const router = useRouter();
    const { mutate: removeOrder } = useRemove();
    const { mutate: updateOrder } = useUpdateOrder();

    const handleAddToCart = () => {
        for (const item of order.items) {
            const product = item.product;
            dispatch(
                addCartItem({
                    productId: product.id,
                    title: product.title,
                    desc: product.shortDesc,
                    quantity: item.quantity,
                    image: product.image,
                    price: product.price,
                    discount: product.discount,
                    stock: product.stock,
                    slug: product.slug,
                })
            );
        }
    };

    const handlePay = () => {
        handleAddToCart();
        dispatch(selectAll(cartItems.map((item) => item.productId)));
        router.replace("/checkout");
    };

    const statusColor = {
        PENDING_PAYMENT: "bg-orange-100 text-orange-700 border-orange-200",
        PROCESSING: "bg-blue-100 text-blue-700 border-blue-200",
        SHIPPED: "bg-purple-100 text-purple-700 border-purple-200",
        DELIVERED: "bg-green-100 text-green-700 border-green-200",
        CANCELLED: "bg-red-100 text-red-700 border-red-200",
    }[order.orderStatus];

    return (
        <div className="bg-white rounded-xl shadow-md hover:shadow-sm transition-all duration-300 border border-gray-100 overflow-hidden">
            <div className=" p-5 border-b border-slate-300">
                <div className="flex flex-wrap items-center justify-between gap-3">
                    <div className="flex items-center gap-3">
                        <Package className="w-5 h-5 text-primary" />
                        <span className="font-bold text-lg text-gray-800">
                            Order #{order.id}
                        </span>
                    </div>
                    <div className="flex items-center gap-4">
                        <div className="flex items-center gap-2 text-sm text-gray-600">
                            <Calendar className="w-4 h-4" />
                            <span>{new Date(order.orderDate).toLocaleDateString("en-GB")}</span>
                        </div>
                        <span
                            className={`px-4 py-1.5 rounded-full text-xs font-bold border ${statusColor}`}
                        >
                            {order.orderStatus.replace("_", " ")}
                        </span>
                    </div>
                </div>
            </div>

            <div className="p-6 space-y-5">
                {order.items.map((item, index) => (
                    <div
                        key={index}
                        className="flex gap-4 p-4 bg-gray-50 rounded-xl  transition-colors"
                    >
                        <div className="relative flex-shrink-0">
                            <div className="w-20 h-20 bg-white rounded-lg shadow-sm border border-gray-200 p-2">
                                <Image
                                    src={item.product.image}
                                    alt={item.product.title}
                                    width={80}
                                    height={80}
                                    className="w-full h-full object-contain opacity-0 transition-opacity duration-500"
                                    onLoad={(e) => e.currentTarget.classList.remove("opacity-0")}
                                />
                            </div>
                            {item.quantity > 1 && (
                                <span className="absolute -top-2 -right-2 bg-primary text-white text-xs font-bold rounded-full w-6 h-6 flex items-center justify-center shadow-md">
                                    {item.quantity}
                                </span>
                            )}
                        </div>

                        <div className="flex-1 min-w-0">
                            <h4 className="font-semibold text-gray-800 truncate">
                                {item.product.title}
                            </h4>
                            <p className="text-sm text-gray-600 mt-1 line-clamp-2">
                                {item.product.shortDesc}
                            </p>
                            <div className="flex items-center gap-3 mt-2">
                                <span className="font-bold text-base ">
                                    ETB {(item.product.price * (1 - item.product.discount)).toFixed(2)}
                                </span>
                                {item.product.discount > 0 && (
                                    <span className="text-sm text-gray-500 line-through">
                                        ETB {item.product.price.toFixed(2)}
                                    </span>
                                )}
                            </div>
                        </div>
                    </div>
                ))}
            </div>

            <div className=" p-6 border-t border-slate-300">
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                    <div className="text-right">
                        <p className="text-sm text-gray-600">Total Amount</p>
                        <p className="text-xl font-bold">
                            ETB {order.totalAmount.toFixed(2)}
                        </p>
                        <p className="text-xs text-gray-500 mt-1">
                            {order.items.length} item{order.items.length > 1 ? "s" : ""}
                        </p>
                    </div>

                    <div className="flex flex-wrap gap-3 justify-end">
                        {(order.orderStatus === "DELIVERED" || order.orderStatus === "CANCELLED") && (
                            <>
                                <Button
                                    variant="outline"
                                    size="sm"
                                    className="gap-2 border-red-300 text-red-600 hover:bg-red-50 hover:scale-105 transition-all"
                                    onClick={() => removeOrder(order.id)}
                                >
                                    <Trash2 className="w-4 h-4" />
                                    Remove
                                </Button>
                                <Button
                                    size="sm"
                                    className="gap-2 bg-primary text-white hover:bg-primary/90 hover:scale-105 transition-all shadow-lg"
                                    onClick={handleAddToCart}
                                >
                                    <ShoppingCart className="w-4 h-4" />
                                    Add to Cart
                                </Button>
                            </>
                        )}

                        {(order.orderStatus === "PENDING_PAYMENT" || order.orderStatus === "PROCESSING") && (
                            <Button
                                variant="outline"
                                size="sm"
                                className="gap-2 border-gray-400 text-gray-700 hover:bg-gray-100 hover:scale-105 transition-all"
                                onClick={() => updateOrder(order.id)}
                            >
                                <XCircle className="w-4 h-4" />
                                Cancel Order
                            </Button>
                        )}

                        {order.orderStatus === "PENDING_PAYMENT" && (
                            <Button
                                size="sm"
                                className="gap-2 bg-primary text-white hover:bg-primary/90 hover:scale-110 transition-all shadow-xl font-bold"
                                onClick={handlePay}
                            >
                                <CreditCard className="w-4 h-4" />
                                Pay Now
                            </Button>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}