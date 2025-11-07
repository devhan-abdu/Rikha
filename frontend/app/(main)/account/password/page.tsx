import { redirect } from "next/navigation";
import { featchMe } from "@/lib/auth/featchme";
import PasswordContent from "./PasswordContent";

export default async function OrdersPage() {
  const user = await featchMe();

  if (!user) redirect("/login?redirect=/account/orders");

  return <PasswordContent />;
}
