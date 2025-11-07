import { redirect } from "next/navigation";
import { featchMe } from "@/lib/auth/featchme";
import ProfileContent from "./ProfileContent";

export default async function OrdersPage() {
  const user = await featchMe();

  if (!user) redirect("/login?redirect=/account/orders");

  return <ProfileContent user={user} />;
}
