import { Suspense } from 'react'
import OrderStatusContent from './OrderStatusContent '
import { OrderStatusFallback } from './OrderStatusFallback '


export default function OrderStatusPage() {
  return (
    <>
      <nav>
        <Suspense fallback={<OrderStatusFallback/>}>
          <OrderStatusContent />
        </Suspense>
      </nav>
    </>
  )
}