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
import { selectIsLoading, selectUser } from '@/redux/slices/authSlice';


const Header = () => {
  const pathname = usePathname();
  const router = useRouter();
  const totalQnt = useAppSelector(selectTotalQnt)
  const user = useAppSelector(selectUser)
  const isLoading = useAppSelector(selectIsLoading)


  return (
    <div className="flex justify-between items-center py-4 px-4 md:px-12 lg:px-24 w-full  z-[9999] ">
      <Link href="/" className={`font-cinzel text-primary font-bold  flex items-center gap-1  order-2 md:order-1`}>
        <TabletSmartphone className='text-6xl' />
        <p className='text-2xl md:text-4xl'>Rikha</p>
      </Link>
      <nav className="hidden items-center justify-between gap-16 md:flex md:order-2  ">
        <ul className="flex items-center justify-center gap-6 no-underline  flex-1">
          {
            navData.map((item) => (

              <li key={item.id}>
                <button onClick={() => router.push(item.path)} className={cn(' text-lg transition-colors cursor-pointer ', { "text-primary": pathname === item.path })}>
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


        {isLoading ? (
          <div className="h-8 w-8 rounded-full bg-gray-200 animate-pulse" />
        ) : user ? (
          <AccountDropdown />
        ) : (
          <Link href="/login" className="text-gray-600">
            <User />
          </Link>
        )}

        <Link href="/cart" className="relative flex items-center justify-center 
  w-10 h-10 rounded-full transition duration-150 ease-in-out hover:bg-gray-100">

           <span className="absolute -top-1 flex items-center justify-center 
    -right-0.5 w-5 h-5  bg-[#C7326A] text-white rounded-full font-medium text-sm">
            {totalQnt}
          </span>

          <svg
            className="h-8 w-8 text-gray-600"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"
            />
          </svg>
        </Link>


      </div>
    </div>

  )
}

export default Header