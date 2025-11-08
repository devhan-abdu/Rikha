import SideNav from "@/components/sidenav";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex min-h-screen flex-col md:flex-row md:overflow-hidden">
      <div className="w-full flex-none md:w-64 overflow-x-auto">
        <SideNav />
      </div>
      <div className="grow p-6 md:overflow-y-auto md:p-1">{children}</div>
    </div>
  );
}