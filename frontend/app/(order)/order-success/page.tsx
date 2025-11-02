"use client"
import OrderStatusCard from "@/components/OrderStatusCard";
import { useRouter } from "next/navigation";

export default function OrderSuccess() {
  const router = useRouter()
  return (
    <main className="min-h-screen flex items-center justify-center">
      <OrderStatusCard
        status="success"
        title="Order Confirmed!"
        message="We&apos;ve sent a confirmation email. You&apos;ll be notified once it ships." primaryAction={{
          label: "Continue Shopping",
          action: () => router.push("/category"),
        }}
        secondaryAction={{
          label: "View Orders",
          action: () => router.push("/orders"),
        }}
      />
    </main>
  );
}
