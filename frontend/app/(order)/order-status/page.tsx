"use client";

import React, { useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { startOrderPolling } from "@/lib/startOrderPolling";
import OrderCard from "@/components/OrderCard";
import OrderLayout from "../layout";

const OrderStatus = () => {
  const [status, setStatus] = useState<
    "pending" | "success" | "failed" | "error"
  >("pending");
  const searchParams = useSearchParams();
  const txRef = searchParams.get("tx_ref");
  const router = useRouter();

  useEffect(() => {
    if (!txRef) {
      setStatus("error");
      return;
    }

    const orderPolling = async () => {
      const { status, orderId } = await startOrderPolling(txRef);
      setStatus(status);

      if (status === "success") router.push(`/order-success?orderId=${orderId}`);
      if (status === "failed") router.push(`/order-failed?orderId=${orderId}`);
    };

    orderPolling();
  }, [txRef]);

  return (
    <OrderLayout pathname="/order-status">
      <div className="min-h-screen flex items-center justify-center">
        {status === "pending" && (
          <OrderCard
            status="pending"
            title="Processing Payment..."
            message="Please do not close this window. We are confirming your order status."
          />
        )}

        {status === "error" && (
          <OrderCard
            status="error"
            title="Error Confirming Payment"
            message={`There was a network issue or timeout. Please check your email or contact support with reference: ${txRef}.`}
            primaryAction={{
            label: "Try Again",
            path: "/checkout"
            }}
          />
        )}
      </div>
    </OrderLayout>
  );
};

export default OrderStatus;
