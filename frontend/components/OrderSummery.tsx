import Image from "next/image"
import { useAppDispatch, useAppSelector } from "@/redux/hooks"
import { decreaseCartQuantity, increaseCartQuantity } from "@/redux/slices/cartSlice"
import { Button } from "./ui/button"
import { useCreate } from "@/lib/query/mutations/useOrderMutation"
import { useRouter } from "next/navigation"
import { useEffect, useState } from "react"
import { toast } from "react-toastify"
import { selectCheckoutItems, selectCheckoutTotals } from "@/redux/selectors"
import { Minus, Plus } from "lucide-react"


type Props = {
  paymentMethod: "TELEBIRR" | "MPSA" | "CBEBIRR",
  addressId: number | null
}
export const OrderSummery = ({ paymentMethod, addressId }: Props) => {
  const { totalPrice, totalDiscount } = useAppSelector(selectCheckoutTotals)
  const dispatch = useAppDispatch();
  const checkoutItems = useAppSelector(selectCheckoutItems)
  const [error, setError] = useState<string | null>(null);
  const { mutateAsync, isPending } = useCreate();
  const router = useRouter();

  useEffect(() => {
    if (addressId) setError(null)
  }, [addressId])

  const handlePlaceOrder = async () => {

    if (addressId === null) {
      setError("Please select a shipping address before placing the order.");
      return;
    }

    const orderData = {
      items: checkoutItems.map(item => ({ productId: item.productId, quantity: item.quantity })),
      paymentMethod,
      addressId: addressId
    }

    try {
      const url = await mutateAsync(orderData);
      if (url) {
        router.push(url);
      }
    } catch (error) {
      console.log(error)
      toast.error("Order creation failed");
    }
  }


  return (
    <div className='py-4 space-y-4 max-w-2xl mx-auto  " '>

      {
        checkoutItems?.map((item) => (
          <div key={item.productId} className='flex items-center p-2 gap-6 '>
            <div className='relative '>
              <Image
                src={item.image}
                alt="Picture of the author "
                width={80}
                height={80}
              />
            </div>
            <div>
              <h4 className=' font-semibold'>{item.title}</h4>
              <div className="flex flex-wrap items-center mt-2 ">
                <span className="line-through text-sm text-gray-500 mr-2">
                  ETB{(item.price).toFixed(2)}
                </span>
                <span className="text-md font-bold text-gray-900 mr-2">
                  ETB {(item.price * (1 - item.discount)).toFixed(2)}
                </span>
              </div>
            </div>
            <div className="inline-flex items-center border border-slate-300 shadow-sm rounded-full ml-auto">
              <button
                className="p-2 text-gray-600 hover:text-black"
                onClick={() => dispatch(decreaseCartQuantity(item.productId))}
              >
                <Minus className="h-4 w-4" />
              </button>
              <span className="w-6 text-center text-sm font-semibold">{item.quantity}</span>
              <button
                className="p-2 text-gray-600 hover:text-black"
                onClick={() => dispatch(increaseCartQuantity(item.productId))}
              >
                <Plus className="h-4 w-4" />
              </button>
            </div>
          </div>
        ))
      }
      <div className='my-6 pt-6 border-t border-gray-400 max-w-sm mx-auto '>
        <div className='space-y-3 text-sm'>
          <div className='flex justify-between'>
            <span>Items total</span>
            <span className='font-medium'>ETB {totalPrice.toFixed(2)}</span>
          </div>
          <div className='flex justify-between text-red-600'>
            <span>Items discount</span>
            <span className='font-medium'>- ETB {totalDiscount.toFixed(2)}</span>
          </div>
          <div className='flex justify-between border-t pt-3'>
            <span>Subtotal</span>
            <span className='font-medium'>ETB {(totalPrice - totalDiscount).toFixed(2)}</span>
          </div>
          <div className='flex justify-between'>
            <span>Shipping</span>
            <span className='font-medium'> free </span>
          </div>
        </div>
        <div className='flex justify-between items-center mt-4 pt-4 border-t border-gray-300'>
          <span className='text-lg font-semibold'>Estimated total</span>
          <span className='text-xl font-bold'>ETB {(totalPrice - totalDiscount).toFixed(2)}</span>
        </div>

        <Button className="text-white text-lg bg-primary w-full mt-6" disabled={isPending || !addressId || checkoutItems.length === 0} onClick={handlePlaceOrder} >
          Place Order
        </Button>
        {error && <p className="text-red-500 mt-2">{error}</p>}
      </div>

    </div>
  )
}