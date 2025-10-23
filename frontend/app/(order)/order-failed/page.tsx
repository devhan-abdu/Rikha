"use client"
import OrderCard from "@/components/OrderCard";
import { useRouter } from "next/navigation";

export default function OrderSuccess() {
  const router = useRouter();
  return (
    <main className="min-h-screen flex items-center justify-center">
      <OrderCard
        status="failed"
        title="Payment Failed"
        message="Your transaction was unsuccessful. Please try again."
        primaryAction={{
          label: "Try Again",
          action: () => router.push("/checkout"),
        }}
      />
    </main>
  );
}
