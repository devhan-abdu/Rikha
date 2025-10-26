import OrderCard from "@/components/OrderCard";
import OrderLayout from "../layout";

export default function OrderSuccess() {
  return (
    <OrderLayout pathname="/order-failed">
      <main className="min-h-screen flex items-center justify-center">
        <OrderCard
          status="failed"
          title="Payment Failed"
          message="Your transaction was unsuccessful. Please try again."
          primaryAction={{
            label: "Try Again",
            path: "/checkout"
          }}
        />
      </main>
    </OrderLayout>
  );
}
