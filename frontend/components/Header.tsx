'use client'
import { ShoppingBag, User, Search, TabletSmartphone } from 'lucide-react';
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { cn } from "@/lib/utils";
import { navData } from '@/constants/index';
import MobileNav from "./MobileNav";
import { selectTotalQnt } from '@/redux/slices/cartSlice';
import { useAppSelector } from '@/redux/hooks';
import { AccountDropdown } from './AccountDropdown';
import { selectUser } from '@/redux/slices/authSlice';


const Header = () => {
  const pathname = usePathname();
  const router = useRouter();
  const totalQnt = useAppSelector(selectTotalQnt)
  const user = useAppSelector(selectUser)


  return (
    <div className="flex justify-between items-center py-4 px-4 md:px-12 lg:px-24 w-full  z-[9999] ">
      <Link href="/" className={`font-cinzel text-primary font-bold  flex items-center gap-1  order-2 md:order-1`}>
        <TabletSmartphone className='text-6xl' />
        <p className='text-2xl md:text-4xl'>Rikha</p>
      </Link>
      <nav className="hidden items-center justify-between gap-16 md:flex md:order-2 xl:text-lg ">
        <ul className="flex items-center justify-center gap-6 no-underline  flex-1">
          {
            navData.map((item) => (

              <li key={item.id}>
                <button onClick={() => router.push(item.path)} className={cn(' text-lg transition-colors ', { "text-primary": pathname === item.path })}>
                  {item.name}
                </button>
              </li>
            )
            )
          }
        </ul>
      </nav>
      <MobileNav />

      <div className="flex items-center gap-4 order-3">
        <button className="text-gray-600 hidden md:block cursor-pointer z-10 "  ><Link href='/search'><Search /></Link> </button>

        {user ? (
          <AccountDropdown />
        ) : (
          <Link href='/login' className='text-gray-600'> <User className="" /></Link>
        )}

        <div className="relative  flex items-center">
          <span className="absolute -top-1/2 w-5 h-5 flex items-center justify-center bg-black rounded-full -right-1/2  translate-y-1/4 font-bold text-white">{totalQnt}</span>
          <Link href="/cart" className="text-gray-600 z-40" ><ShoppingBag className="" /></Link>
        </div>
      </div>
    </div>

  )
}

export default Header