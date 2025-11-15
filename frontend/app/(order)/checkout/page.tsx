"use client"
import { useAppSelector } from '@/redux/hooks'
import { ChevronDown, ChevronUp, MapPin } from 'lucide-react'
import React, { useEffect, useState } from 'react'
import { cn } from '@/lib/utils'
import Empty from '@/components/Empty'
import { OrderSummery } from '@/components/OrderSummery'
import Image from 'next/image'
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group'
import AddressList from '@/components/AddressList'
import { Button } from '@/components/ui/button'
import { useAddresses } from '@/lib/query/hook/useAddresses'
import { ShippingData } from '@/interface'
import { selectCheckoutItems, selectCheckoutTotals } from '@/redux/selectors'
import { Dialog, DialogContent, DialogTrigger } from '@radix-ui/react-dialog'
import AddressForm from '@/components/AddressForm'
import { DialogTitle } from '@/components/ui/dialog'

type PaymentMethodType = "TELEBIRR" | "MPSA" | "CBEBIRR";

const CheckoutPage = () => {
  const { totalPrice } = useAppSelector(selectCheckoutTotals)
  const checkoutItems = useAppSelector(selectCheckoutItems)
  const [show, setShow] = useState(false)
  const [isOpen, setIsOpen] = useState(false);
  const [isAddOpen, setIsAddOpen] = useState(false)
  const [paymentMethod, setPaymentMethod] = useState<PaymentMethodType>("TELEBIRR")
  const { data: addresses, isLoading } = useAddresses();
  const [selectedAddress, setSelectedAddress] = useState<ShippingData | null>(null)

  useEffect(() => {
    if (addresses && addresses.length > 0 && !selectedAddress) {
      const defaultAddr = addresses.find(addr => addr.isDefault);
      setSelectedAddress(defaultAddr || addresses[0]);
    }
  }, [addresses, selectedAddress]);


  if (checkoutItems.length === 0) {
    return (
      <Empty />
    )
  }


  return (
    <div className='px-4 pt-6 pb-12 '>
      <div className='flex flex-col md:flex-row justify-center gap-6 '>
        <div className='bg-[#fff] shadow-lg  md:hidden px-4 md:px-6 w-full  border border-black/10'>
          <button className='flex items-center gap-2 w-full outline-none focus:outline-1  rounded-md py-4 px-2 md:px-4 ' onClick={() => setShow(!show)}>
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
              <OrderSummery addressId={selectedAddress?.id ?? null} paymentMethod={paymentMethod} />
            </div>
          }

        </div>

        <div className='space-y-4 w-full md:w-1/2 max-w-[550px]'>
          <div className='bg-white rounded-md shadow-md px-4 pt-6 pb-3 space-y-3'>
            <h3 className="font-cinzel text-2xl font-semibold mb-6 border-b pb-3">Shipping address</h3>
            {isLoading ? (
              <div className='flex flex-col gap-2'>
                <div className='bg-gray-200 animate-pulse duration-500 w-44 h-3' />
                <div className='bg-gray-200 animate-pulse duration-500 w-32 h-3' />
                <div className='bg-gray-200 animate-pulse duration-500 w-44 h-3' />
                <div className='bg-gray-200 animate-pulse duration-500 w-24 h-3' />

              </div>
            ) : selectedAddress ? (
              <div className='flex justify-between flex-wrap'>

                <div>
                  <p className="font-semibold text-gray-800">{selectedAddress.name}</p>
                  <p className="text-gray-500 text-sm">{selectedAddress.phoneNumber}</p>
                  <p className="text-gray-600 text-sm">
                    {selectedAddress.subcity}, Woreda {selectedAddress.woreda}, {selectedAddress.city}
                  </p>
                  <p className="text-gray-500 text-sm">House No: {selectedAddress.houseNumber}</p>
                </div>
                <div className='flex flex-col'>
                  <Button variant="ghost" className='text-blue-500' onClick={() => setIsOpen(true)}>
                    Change
                  </Button>
                </div>
              </div>
            ) : (
              <Dialog open={isAddOpen} onOpenChange={setIsAddOpen}>
                <DialogTrigger asChild>
                  <Button variant='ghost' className='text-primary ' onClick={() => setIsAddOpen(true)}>
                    <MapPin /> Add New Address
                  </Button>
                </DialogTrigger>
                <DialogTitle></DialogTitle>
                <DialogContent >
                  <AddressForm isEdit={false} setIsEdit={() => false}  data={selectedAddress ?? undefined} />
                </DialogContent>
              </Dialog>
            )}
          </div>

          <div className='bg-white rounded-xl shadow-md p-6 md:p-8'>
            <h3 className="font-cinzel text-2xl font-semibold mb-6 border-b pb-3">Payment Method</h3>
            <RadioGroup
              value={paymentMethod}
              onValueChange={(value) => setPaymentMethod(value as PaymentMethodType)}
              defaultValue="CASH"
              className='space-y-2 px-1'
            >
              <div className="flex items-center space-x-4  rounded-lg cursor-pointer">
                <RadioGroupItem value="TELEBIRR" id="telebirr" />
                <label htmlFor="telebirr" className="flex-1 flex items-center gap-4 cursor-pointer">
                  <Image alt="Telebirr Logo" src="/images/Telebirr.png" width={40} height={40} />
                  <span className="font-medium">Telebirr</span>
                </label>
              </div>

              <div className="flex items-center space-x-4  rounded-lg cursor-pointer">
                <RadioGroupItem value="MPSA" id="mpsa" />
                <label htmlFor="mpsa" className="flex-1 flex items-center gap-4 cursor-pointer">
                  <Image alt="Mpsa Logo" src="/images/Mpsa.png" width={40} height={40} />
                  <span className="font-medium">M-Pesa</span>
                </label>
              </div>

              <div className="flex items-center space-x-4  rounded-lg cursor-pointer">
                <RadioGroupItem value="CBEBIRR" id="cbebirr" />
                <label htmlFor="cbebirr" className="flex-1 flex items-center gap-4 cursor-pointer">
                  <Image alt="CBEbirr Logo" src="/images/cbebirr.png" width={40} height={40} />
                  <span className="font-medium">CBEBirr</span>
                </label>
              </div>

            </RadioGroup>
          </div>
        </div>
        <div className='bg-[#fff] shadow-lg hidden md:block px-4 py-6  self-start w-full md:w-1/2'>
          <OrderSummery addressId={selectedAddress?.id ?? null} paymentMethod={paymentMethod} />
        </div>
      </div>
      <AddressList
        isListOpen={isOpen}
        setIsListOpen={setIsOpen}
        selectedAddress={selectedAddress}
        setSelectedAddress={setSelectedAddress}
      />

    </div >
  )
}


export default CheckoutPage
