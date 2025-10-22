"use client"
import OrderCard from "@/components/OrderCard";
import { useRouter } from "next/navigation";

export default function OrderSuccess() {
  const router = useRouter()
  return (
    <main className="min-h-screen flex items-center justify-center bg-gray-50">
      <OrderCard
        status="success"
        title="Order Confirmed!"
        message="We’ve sent a confirmation email. You’ll be notified once it ships."
        primaryAction={{
          label: "Continue Shopping",
          action: () => router.push("/"),
        }}
        secondaryAction={{
          label: "View Orders",
          action: () => router.push("/orders"),
        }}
      />
    </main>
  );
}
