import { redirect } from "next/navigation";
import AddressContent from "./AddressContent";
import { featchMe } from "@/lib/auth/featchme";

export default async function AddressPage() {
  const user = await featchMe();

  if (!user) redirect("/login?redirect=/account/address");

  return <AddressContent />;
}
