"use client"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Order } from "@/interface"
import { useAppDispatch, useAppSelector } from "@/redux/hooks"
import { addCartItem, selectCartItems } from "@/redux/slices/cartSlice"
import { useRemove, useUpdateOrder } from "@/lib/query/mutations/useOrderMutation"
import { useRouter } from "next/navigation"
import { selectAll } from "@/redux/slices/selectedItemsSlice"

export default function OrderCard({ order }: { order: Order }) {
    const disptch = useAppDispatch();
    const cartItems = useAppSelector(selectCartItems)
    const router = useRouter();
    const { mutate: removeOrder } = useRemove()
    const { mutate: updateOrder } = useUpdateOrder()

    const handleAddToCart = () => {
        for (const item of order.items) {
            const product = item.product
            const cartItem = {
                productId: product.id,
                title: product.title,
                desc: product.shortDesc,
                quantity: item.quantity,
                image: product.image,
                price: product.price,
                discount: product.discount,
                stock: product.stock,
                slug: product.slug
            }
            disptch(addCartItem(cartItem))
        }
    }

    const handlePay = () => {
        handleAddToCart();
        disptch(selectAll(cartItems.map(item => item.productId)))
        router.replace("/checkout")
    }

    return (
        <div className="bg-white rounded-lg p-4 shadow-sm space-y-4">

            <div className="flex items-center justify-between border-b border-slate-300 pb-3">
                <p className="font-semibold text-lg">{order.orderStatus}</p>
                <p className="text-sm text-gray-500">{new Date(order.orderDate).toLocaleString().split(",")[0]}</p>
            </div>

            <div className="space-y-6 grid grid-cols-1 gap-2 lg:grid-cols-2">
                {order.items.map((item) => (
                    <div className="flex gap-3 py-2">
                        <div className="h-20 w-20 flex-shrink-0">
                            <Image
                                src={item.product.image}
                                alt={item.product.title}
                                width={80}
                                height={80}
                                className="object-contain w-full h-full"
                            />
                        </div>

                        <div className="flex flex-col justify-evenly gap-2">
                            <div className="space-y-1">
                                <p className="text-sm text-slate-700 font-medium">{item.product.title}</p>
                                <p className="text-black/80">{item.product.shortDesc}</p>
                            </div>

                            <div className="flex items-center gap-3 text-slate-600 text-sm">
                                <span className="font-bold ">ETB {item.product.price - (item.product.price * item.product.discount)}</span>
                                <span>x{item.quantity}</span>
                            </div>
                        </div>
                    </div>
                ))}
            </div>

            <div className="border-t border-slate-300 pt-4 flex flex-col items-end gap-3">
                <p className="text-sm font-semibold">
                    Total ({order.items.length} items): ETB {order.totalAmount}
                </p>

                <div className="flex flex-wrap gap-3">

                    {(order.orderStatus === "DELIVERED" || order.orderStatus === "CANCELLED") && (
                        <Button variant="outline" size="sm" className="text-primary border border-primary hover:scale-105 transition-all duration-300" onClick={() => removeOrder(order.id)}>
                            Remove
                        </Button>
                    )}
                    {(order.orderStatus === "DELIVERED" || order.orderStatus === "CANCELLED") && (
                        <Button variant="secondary" size="sm" className="rounded-md bg-primary text-white  hover:scale-105 transition-all duration-300" onClick={handleAddToCart}>
                            Add all to cart
                        </Button>
                    )}


                    {(order.orderStatus === "PENDING_PAYMENT" || order.orderStatus === "PROCESSING") && (
                        <Button variant="outline" size="sm" className="text-primary border border-primary hover:scale-105 transition-all duration-300" onClick={() => updateOrder(order.id)}>
                            Cancel
                        </Button>
                    )}

                    {order.orderStatus === "PENDING_PAYMENT" && (
                        <Button size="sm" className="rounded-md w-12 text-white  hover:scale-105 transition-all duration-300" onClick={handlePay}>
                            Pay
                        </Button>
                    )}

                </div>

            </div>
        </div>
    )
}
