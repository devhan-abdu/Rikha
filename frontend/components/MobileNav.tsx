import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet"
import { Menu, TabletSmartphone } from "lucide-react";
import Link from "next/link";
import { navData } from "@/lib/navData";
import { cn } from "@/lib/utils";
import { usePathname } from "next/navigation";

const MobileNav = () => {
  const pathname = usePathname();

  return (
    <>
      <div className="flex items-center gap-4 order-1 md:order-3 md:hidden ">

        <div className="flex">
          <Sheet >
            <SheetTrigger><Menu /></SheetTrigger>
            <SheetContent className='z-[9999] bg-forground'>
              <SheetHeader>
                <SheetTitle>
                  <div className={`font-cinzel text-primary font-bold text-4xl text-center mt-16 mb-6 mx-auto flex items-center justify-center gap-1`}>
                    <TabletSmartphone className='text-6xl' />
                    <p >Rikha</p>
                  </div>
                </SheetTitle>

                <nav className="">
                  <ul className="flex flex-col items-center justify-center gap-6 no-underline  flex-1">
                    {
                      navData.map((item) => {
                        return (
                          <li key={item.id}>
                            <Link href={item.path} className={cn('transition-colors ', { "text-primary": pathname === item.path })}>
                              {item.name}
                            </Link>
                          </li>
                        )
                      })
                    }
                  </ul>
                </nav>
              </SheetHeader>
            </SheetContent>
          </Sheet>

        </div>
        {/* <Button variant="ghost" className=''>
          <Link href='/search'><Search /></Link>
        </Button> */}
      </div>
    </>
  )
}

export default MobileNav
