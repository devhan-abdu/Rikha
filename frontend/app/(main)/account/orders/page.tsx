import { redirect } from "next/navigation";
import { featchMe } from "@/lib/auth/featchme";
import OrderContent from "./OrdersContent";

export default async function OrdersPage() {
    const user = await featchMe();

    if (!user) redirect("/login?redirect=/account/orders");

    return <OrderContent />;
}
