import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet"
import { Menu, TabletSmartphone } from "lucide-react";
import Link from "next/link";
import { navData } from "@/constants/index";
import { cn } from "@/lib/utils";
import { usePathname, useRouter } from "next/navigation";
import { useState } from "react";

const MobileNav = () => {
  const pathname = usePathname();
  const router = useRouter();
  const [open, setOpen] = useState(false);

  const handleNavigate = (path: string) => {
    setOpen(false)
    router.push(path)
  }

  return (
    <div className="flex order-1 md:order-3 md:hidden">
      <Sheet open={open} onOpenChange={setOpen}>
        <SheetTrigger asChild>
          <button aria-label="open menu" className="cursor-pointer">
            <Menu className="h-6 w-6" />
          </button>
        </SheetTrigger>

        <SheetContent className='z-[9999] bg-white w-[280px] border-none'>
          <SheetHeader>
            <SheetTitle>
              <div className="font-cinzel text-primary font-bold text-4xl text-center mt-14 mb-8 flex items-center justify-center gap-1">
                <TabletSmartphone className="text-6xl" />
                <p>Rikha</p>
              </div>
            </SheetTitle>
            </SheetHeader>

            <nav className="mt-4">
              <ul className="flex flex-col items-center gap-6">
                {
                  navData.map((item) => (

                    <li key={item.id}>
                      <button onClick={() => handleNavigate(item.path)} className={cn(' text-lg transition-colors cursor-pointer', { "text-primary": pathname === item.path })}>
                        {item.name}
                      </button>
                    </li>
                  )
                  )
                }
              </ul>
            </nav>
        </SheetContent>
      </Sheet>
    </div >
  )
}

export default MobileNav
