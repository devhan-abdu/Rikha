import React from 'react'
import Image from 'next/image'
import Link from 'next/link'

const Empty = () => {
  return (
     <div className='h-[70vh] flex flex-col items-center justify-center gap-4 px-6'>
      <Image src="/images/empty.jpg" width={200} height={200} alt='empty page'/>
     <p className='text-center'>It looks like you haven't added any items yet. Let's fill it up with great finds</p>
      <Link href='/category' className="font-cinzel bg-primary text-white px-2.5 py-1.5 rounded-sm text-sm">Start Shopping Now</Link>
      </div>
  )
}

export default Empty
