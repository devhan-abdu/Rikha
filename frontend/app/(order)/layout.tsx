export const dynamic = 'force-dynamic';

import { fetchMe } from "@/lib/auth/fetchme";
import { TabletSmartphone } from "lucide-react";
import { redirect } from "next/navigation";

export default async function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {

    const user = await fetchMe();
    if (!user) redirect("/login?redirect=/account/orders");

    return (
        <>
            <div className="flex justify-between items-center py-4 shadow-lg  px-4 md:px-12 ">
                <div className="w-full max-w-[1200px] mx-auto z-[9999] ">
                    <div className={`font-cinzel text-primary font-bold  flex items-center gap-1  order-2 md:order-1`}>
                        <TabletSmartphone className='text-6xl' />
                        <p className='text-2xl md:text-4xl'>Rikha</p>
                    </div>
                </div>
            </div>
            <main>
                {children}
            </main>
        </>
    );
}