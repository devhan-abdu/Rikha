import Image from "next/image"
import { useAppSelector } from "@/redux/hooks"
import { selectCartItems, selectTotalPrice } from "@/redux/slices/cartSlice"
import { Button } from "./ui/button"


export const OrderSummery = () => {
  const totalPrice = useAppSelector(selectTotalPrice)
  const cartItems = useAppSelector(selectCartItems)


  return (
    <div className='py-4 space-y-4 max-w-xl mr-auto " '>

      {
        cartItems?.map((item) => (
          <div key={item.productId} className='flex items-center p-2 gap-6'>
            <div className='relative '>
              <Image
                src={item.image}
                alt="Picture of the author "
                width={80}
                height={80}
              />
              <div className='absolute -right-3 -top-3 bg-black text-white px-2.5  rounded-md text-sm'>
                {item.quantity}
              </div>
            </div>
            <h4 className=' font-semibold'>{item.title}</h4>
            <p className=" ml-auto" >
              {item.price * item.quantity} ETB
            </p>
          </div>
        ))
      }
      <div className='my-6 pt-6 border-t border-gray-400 '>
        <div className='flex items-center justify-between gap-6 '>
          <span className=''>
            Subtotal
          </span>
          <span>{totalPrice}</span>
        </div>
        <div className='flex items-center justify-between gap-6'>
          <span className=''>
            Discount
          </span>
          <span> discount ETB</span>
        </div>
        <div className='flex items-center justify-between gap-6'>
          <span className=' '>
            Shipping
          </span>
          <span> shipping ETB</span>
        </div>
        <div className='flex items-center justify-between gap-6'>

          <span className='text-lg py-4'>
            Total
          </span>
          <span className='font-semibold text-lg'>$4555</span>
        </div>
      </div>
      <Button className="text-white text-lg bg-primary w-full">
         Place Order
      </Button>
    </div>
  )
}