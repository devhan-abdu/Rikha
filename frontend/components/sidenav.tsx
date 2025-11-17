"use client"
import React from 'react'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { accountNav } from '@/constants';
import { usePathname, useRouter } from 'next/navigation';
import { useAppSelector } from '@/redux/hooks';
import { selectIsLoading, selectUser } from '@/redux/slices/authSlice';


const SideNav = () => {
  const router = useRouter();
  const pathname = usePathname();
  const user = useAppSelector(selectUser)
  const isLoading = useAppSelector(selectIsLoading)

  return (
    <div className='flex h-full flex-col px-3 py-4 md:px-4 md:py-6 gap-6 border-r border-slate-300'>
      <div className=' flex items-center gap-3 '>
        {isLoading ? (
          <div className="h-10 w-10 rounded-full bg-gray-200 animate-pulse" />
        ) : (
          <Avatar className="cursor-pointer">
            <AvatarImage src={user?.avatarUrl} />
            <AvatarFallback className="uppercase bg-gray-100 font-cinzel border-primary/30 shadow-md">
              {user?.username?.slice(0, 2)}
            </AvatarFallback>
          </Avatar>
        )}

        <div className="flex flex-col">
          <p className="font-semibold text-gray-800">{user?.username.split(" ")[0]}</p>
          <p className='text-sm text-gray-500'>{user?.email}</p>
        </div>
      </div>

      <div className='flex items-center justify-between gap-4 md:flex-col md:items-start overflow-x-auto'>
        {accountNav.map((item) => {
          const Icon = item.icon
          const isActive = pathname === item.path
          return (
            <button
              key={item.name}
              onClick={() => router.push(item.path)}
              className={`flex items-center gap-2 text-left w-full px-3 py-2 cursor-pointer rounded-md transition-all duration-200 
                    ${isActive ? " font-medium text-primary" : "hover:bg-gray-50 text-gray-700"}`}
            >
              <Icon size={18} />
              <span>{item.name}</span>
            </button>
          )
        })}
      </div>
    </div >
  )
}

export default SideNav
