"use client"
import React, { useEffect, useState } from 'react'
import { useRouter, useSearchParams } from 'next/navigation';
import { startOrderPolling } from '@/lib/startOrderPolling';



const OrderStatus =  () => {
    const [status, setStatus] = useState<"processing" | "success" | "failed" | "error">("processing");
    const searchParams = useSearchParams();
    const txRef = searchParams.get("tx_ref")
    const router = useRouter();
    

    useEffect(() => {

        if(!txRef) {
            setStatus("error");
            return
        }

        const orderPulling = async () => {
            const { status, orderId } = await startOrderPolling(txRef)
            setStatus(status)

            if(status === "success") {
                router.push(`/order/success?orderId=${orderId}`)
            }
            if (status === "failed") {
               router.push(`/order/failed?orderId=${orderId}`)
            }
        }

        orderPulling();
    }, [txRef])


   return (
        <div className='p-10 text-center'>
            {status === "processing" && (
                <div>
                    <h2>⏳ Processing Payment...</h2>
                    <p>Please do not close this window. We are confirming your order status.</p>
                </div>
            )}
    
            {status === "error" && (
                <div>
                    <h2>⚠️ Error Confirming Payment</h2>
                    <p>There was a network error or the payment confirmation timed out. Please check your email or contact support with reference: {txRef}.</p>
                    <button onClick={() => router.refresh()}>Try Again</button>
                </div>
            )}
            {status === "failed" && (
                <div>
                    <h2>❌ Payment Failed</h2>
                    <p>The payment was explicitly marked as failed by the payment gateway.</p>
                    <button onClick={() => router.replace('/checkout')}>Return to Checkout</button>
                </div>
            )}
        </div>
    );
}

export default OrderStatus



