"use client"
import OrderCard from "@/components/OrderCard";
import { useRouter } from "next/navigation";
import OrderLayout from "../layout";

export default function OrderSuccess() {
  const router = useRouter()
  return (
    <OrderLayout pathname="/order-success">
      <main className="min-h-screen flex items-center justify-center">
        <OrderCard
          status="success"
          title="Order Confirmed!"
          message="We&apos;ve sent a confirmation email. You&apos;ll be notified once it ships." primaryAction={{
            label: "Continue Shopping",
            path: "/category"
          }}
          secondaryAction={{
            label: "View Orders",
            path: "/orders",
          }}
        />
      </main>
    </OrderLayout>
  );
}
