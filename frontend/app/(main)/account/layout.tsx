import SideNav from "@/components/sidenav";
import { fetchMe } from "@/lib/auth/fetchme";
import { redirect } from "next/navigation";

export default async function Layout({ children }: { children: React.ReactNode }) {
  const user = await fetchMe();
  if (!user) redirect("/login?redirect=/account");
  
  return (
    <div className="flex min-h-screen flex-col md:flex-row md:overflow-hidden">
      <div className="w-full flex-none md:w-64 overflow-x-auto">
        <SideNav />
      </div>
      <div className="grow p-6 md:overflow-y-auto md:p-1">{children}</div>
    </div>
  );
}