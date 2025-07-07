// import { TbDeviceMobileCharging } from "react-icons/tb";

'use client'
import { ShoppingBag , User ,Search ,TabletSmartphone   } from 'lucide-react';
import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { useDispatch, useSelector } from "react-redux";
import { navData } from "@/lib/navData";
import MobileNav from "./MobileNav";

const user = true;

const Header = () => {
  const pathname = usePathname();
  // const dispatch = useDispatch();
  // const totalQnt = useSelector(state => state.cart.totalQnt)


  return (
    <div className="flex justify-between items-center py-4 px-4 md:px-12 container mx-auto ">
      <div className={`font-cinzel text-primary font-bold  flex items-center gap-1  order-2 md:order-1`}>
        <TabletSmartphone className='text-6xl' />
        <p className='text-2xl md:text-4xl'>Rikha</p>
      </div>
      <nav className="hidden items-center justify-between gap-16 md:flex md:order-2 xl:text-lg ">
        <ul className="flex items-center justify-center gap-6 no-underline  flex-1">
          {
            navData.map((item) => {
              return (
                <li key={item.id}>
                  <Link href={item.path} className={cn('transition-colors text-lg font-poppins', { "text-primary": pathname === item.path })}>
                    {item.name}
                  </Link>
                </li>
              )
            })
          }
        </ul>
      </nav>
      <MobileNav/>
     
      <div className="flex items-center gap-4 order-3">      
        <button  className="text-gray-600 hidden md:block"  ><Link href='/search'><Search /></Link> </button>
        {/* user */}
        {user ? (  
              <Link href='/login' aria-label='Login'> 
              <Avatar className='cursor-pointer text-sm'>
                <AvatarImage src="https://github.com/shadcn.png" />
                <AvatarFallback>CH</AvatarFallback>
              </Avatar>
              </Link>
        ) : (
          <button  className="text-gray-600"  ><Link href='/login'> <User className="" /></Link></button>
        )}

        <div className="relative  flex items-center">
          <span className="absolute -top-1/2 w-5 h-5 flex items-center justify-center bg-black rounded-full -right-1/2  translate-y-1/4 font-bold text-white">3</span>
          <Link href="/cart" className="text-gray-600" ><ShoppingBag className="" /></Link>
        </div>
      </div>
    </div>

  )
}

export default Header