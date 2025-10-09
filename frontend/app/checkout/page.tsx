"use client"
import { useAppSelector } from '@/redux/hooks'
import { selectCartItems, selectTotalPrice, selectTotalQnt } from '@/redux/slices/cartSlice'
import { ChevronDown, ChevronLeft, ChevronUp } from 'lucide-react'
import Image from 'next/image'
import React, { useState } from 'react'
import { useRouter } from 'next/navigation'
import { Controller, SubmitHandler, useForm } from 'react-hook-form'
import { ShippingSchema, ShippingData } from '@/interface'
import { zodResolver } from '@hookform/resolvers/zod'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils'
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { selectUser } from '@/redux/slices/authSlice'
import { toast } from 'react-toastify'


const OrderSummery = () => {
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
    </div>
  )
}

const page = () => {
  const cartItems = useAppSelector(selectCartItems)
  const totalPrice = useAppSelector(selectTotalPrice)
  const router = useRouter();
  const [show, setShow] = useState(false)
  const [selectedPayment, setSelectedPayment] = useState("cash");


  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<ShippingData>({
    resolver: zodResolver(ShippingSchema),
    defaultValues: { country: "Ethiopia", paymentMethod: "CASH" },
  })

  
   if(cartItems.length === 0 ) {
      return (
        <div>
          no cart item
        </div>
      )
   }
  const onSubmit: SubmitHandler<ShippingData> = async (data: ShippingData) => {
    try {
      const orderItems = cartItems.map(({ productId, quantity }) => ({ productId, quantity }));
      const { paymentMethod, ...shippingAddressData } = data

      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/order`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ items: orderItems, shippingAddressData, paymentMethod }),
        credentials: 'include'
      })

      if (!res.ok) {
        toast.error("Something went wrong  unable to make order");
        return;
      }
      const result = await res.json();
      if (result.success)
        router.push(result.url)

    } catch (error) {
      toast.error("Something went wrong unable to make the order");
    }
  }
  const subcityOptions = [
    "Addis Ketema",
    "Akaky Kaliti",
    "Arada",
    "Bole",
    "Gullele",
    "Kirkos",
    "Kolfe Keranio",
    "Lideta",
    "Nifas Silk-Lafto",
    "Yeka",
    "Lemi Kura"
  ]
  const inputClass = "w-full block border border-black/20 shadow-md rounded-sm py-3 px-2 text-base text-black placeholder:text-black/60 focus:outline-none sm:text-sm/6";
  const selectTriggerClass = "w-full border border-black/20 shadow-md rounded-sm py-6 px-2 pr-3 pl-1 text-base focus:outline-none sm:text-sm/6";
  const errorClass = "text-sm text-red-500 mt-1";

  type FieldName = keyof ShippingData;
  const ErrorMessage = ({ field }: { field: FieldName }) =>
    errors[field] ? <p className={errorClass}>{(errors[field]?.message as string) || ''}</p> : null;

  return (
    <div className='md:px-6 '>
      <div className='flex flex-col md:flex-row justify-center gap-4 '>
        <div className='bg-[#fafafa] md:hidden px-4 md:px-6 w-full '>
          <button className='flex items-center gap-2 w-full outline-none focus:outline-1  rounded-md py-4 px-2 md:px-4 border border-black/10 shadow-sm' onClick={() => setShow(!show)}>
            <span className='text-lg'>
              Order summery
            </span>
            {
              show ? <ChevronUp /> : <ChevronDown />
            }
            <p className='text-xl ml-auto'>
              {totalPrice} ETB
            </p>
          </button>
          {
            <div
              className={cn(
                "transition-all duration-500  overflow-hidden ",
                show ? "h-max" : "h-0"
              )}
            >
              <OrderSummery />
            </div>


          }

        </div>

        <form className="space-y-6 px-6" onSubmit={handleSubmit(onSubmit)}>
          {/* Shipping Address Section */}
          <div className="space-y-4">
            <h3 className="font-cinzel text-2xl font-semibold">Shipping Address</h3>

            {/* Country */}
            <div className="flex-1 flex flex-col gap-2">
              <label htmlFor="country" className="text-sm text-black">First Name</label>
              <input
                type="text"
                id="country"
                {...register("country")}
                placeholder="First name"
                className={inputClass}
                value={"Ethiopia"}
                disabled
              />
              <ErrorMessage field="country" />
            </div>

            {/* First & Last Name */}
            <div className="flex items-center gap-4 justify-between">
              <div className="flex-1 flex flex-col gap-2">
                <label htmlFor="firstName" className="text-sm text-black">First Name</label>
                <input
                  type="text"
                  id="firstName"
                  {...register("firstName")}
                  placeholder="First name"
                  className={inputClass}
                />
                <ErrorMessage field="firstName" />
              </div>
              <div className="flex-1 flex flex-col gap-2">
                <label htmlFor="lastName" className="text-sm text-black">Last Name</label>
                <input
                  type="text"
                  id="lastName"
                  {...register("lastName")}
                  placeholder="Last name"
                  className={inputClass}
                />
                <ErrorMessage field="lastName" />
              </div>
            </div>

            {/* Sub City */}
            <div className="flex flex-col gap-2">
              <label htmlFor="subcity" className="text-sm text-black">
                Sub City
              </label>
              <Controller
                name="subcity"
                control={control}
                render={({ field }) => (
                  <Select onValueChange={field.onChange} value={field.value}>
                    <SelectTrigger className="w-full border border-black/20 shadow-md rounded-sm py-2">
                      <SelectValue placeholder="Select sub city" />
                    </SelectTrigger>
                    <SelectContent className="bg-white shadow-2xl z-[999]">
                      {subcityOptions.map((item) => (
                        <SelectItem key={item} value={item}>
                          {item}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                )}
              />
              {errors.subcity && (
                <p className="text-red-500 text-sm">{errors.subcity.message}</p>
              )}
            </div>

            {/* Woreda & House Number */}
            <div className="flex items-center gap-4 justify-between">
              <div className="flex-1 flex flex-col gap-2">
                <label htmlFor="woreda" className="text-sm text-black">Woreda</label>
                <input
                  type="text"
                  id="woreda"
                  {...register("woreda")}
                  placeholder="e.g., Bole"
                  className={inputClass}
                />
                <ErrorMessage field="woreda" />
              </div>
              <div className="flex-1 flex flex-col gap-2">
                <label htmlFor="houseNumber" className="text-sm text-black">House Number </label>
                <input
                  type="text" 
                  id="houseNumber"
                  {...register("houseNumber")}
                  placeholder="e.g., 1000"
                  className={inputClass}
                />
                <ErrorMessage field="houseNumber" />
              </div>
            </div>

            {/* Phone Number */}
            <div className="flex flex-col gap-2">
              <label htmlFor="phoneNumber" className="text-sm text-black">Phone Number</label>
              <input
                type="tel" // Better semantic for phone
                id="phoneNumber"
                {...register("phoneNumber")}
                placeholder="09xxxxxxxx or 07xxxxxxxx"
                className={inputClass}
              />
              <ErrorMessage field="phoneNumber" />
            </div>

            {/* Set as Default */}
            <div className="flex items-center gap-2">
              <input type='checkbox' id="setAsDefault" {...register("setAsDefault")} />
              <label htmlFor="setAsDefault" className="text-sm text-black">
                Set as default address
              </label>
            </div>
          </div>

          {/* Payment Method Section */}
          <div className="space-y-4">
            <h3 className="font-cinzel text-2xl font-semibold">Payment Method</h3>
            <Controller
              name='paymentMethod'
              control={control}
              render={({ field }) => (
                <RadioGroup
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                  className='space-y-3'
                >
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="CASH" id="cash" />
                    <label htmlFor="cash">Cash on Delivery</label>
                  </div>

                  <div className="flex items-center gap-3">
                    {/* Telebirr */}
                    <div className="relative">
                      <RadioGroupItem value="telebirr" id="telebirr" className="sr-only" {...register("paymentMethod")} />
                      <label
                        htmlFor="telebirr"
                        className={
                          `relative flex h-12 w-12 cursor-pointer items-center justify-center rounded border bg-white hover:scale-105 hover:border-gray-300 p-1 text-sm text-black ` +
                          (selectedPayment === "telebirr" ? "border-primary " : "border-gray-200")
                        }
                      >
                        <Image alt="Telebirr" src="/images/Telebirr.png" width={40} height={40} />
                      </label>
                    </div>

                    {/* Mpsa */}
                    <div className="relative">
                      <RadioGroupItem value="mpsa" id="mpsa" className="sr-only" {...register("paymentMethod")} />
                      <label
                        htmlFor="mpsa"
                        className={
                          `relative flex h-12 w-12 cursor-pointer items-center justify-center rounded border bg-white hover:scale-105 hover:border-gray-300 p-1 text-sm text-black ` +
                          (selectedPayment === "mpsa" ? "border-primary bg-primary/5" : "border-gray-200")
                        }
                      >
                        <Image alt="Mpsa" src="/images/Mpsa.png" width={40} height={40} />
                      </label>
                    </div>

                    {/* CBEbirr */}
                    <div className="relative">
                      <RadioGroupItem value="cbebirr" id="cbebirr" className="sr-only" {...register("paymentMethod")} />
                      <label
                        htmlFor="cbebirr"
                        className={
                          `relative flex h-12 w-12 cursor-pointer items-center justify-center rounded border bg-white hover:scale-105 hover:border-gray-300 p-1 text-sm text-black ` +
                          (selectedPayment === "cbebirr" ? "border-primary bg-primary/5" : "border-gray-200")
                        }
                      >
                        <Image alt="CBEbirr" src="/images/cbebirr.png" width={40} height={40} />
                      </label>
                    </div>
                  </div>

                </RadioGroup>
              )}
            >

            </Controller>
            <ErrorMessage field="paymentMethod" />
          </div>

          {/* Actions */}
          <div className="flex flex-wrap items-center justify-between gap-3 pt-4 border-t border-black/10">
            <Link href="/cart" className="flex items-center gap-2 text-sm">
              <ChevronLeft size={16} />
              <span>Return to Cart</span>
            </Link>
            <Button type="submit" className="py-3 px-6 text-base font-semibold text-white rounded-sm">
              Order Now
            </Button>
          </div>

          {/* Root/Server Errors */}
          {errors.root && <p className={errorClass}>{errors.root.message}</p>}
        </form>
        <div className='bg-[#fafafa] hidden md:block px-4 py-6 shadow-md self-start w-full md:w-1/2'>
          <OrderSummery />
        </div>
      </div>

    </div>
  )
}


export default page
