import OrderStatusCard from "@/components/OrderStatusCard";

export const OrderStatusFallback = () => (
    <div className="min-h-screen flex items-center justify-center">
        <OrderStatusCard
            status="pending"
            title="Processing Payment..."
            message="Please do not close this window. We are confirming your order status."
        />
    </div>
);