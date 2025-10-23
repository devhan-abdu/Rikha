import {Suspense} from 'react'
import Search from '@/components/Search';
import SearchTable from '@/components/SearchTable';
import { List ,LayoutGrid  } from 'lucide-react';

export default async function Page(props:{
    searchParams?:Promise<{
        query?:string;
    }>;
}) { 

   const searchParams = await props.searchParams;
   const query = searchParams?.query || '';
 
  return (
    <div className=''>
        <Search />
      <main className='px-6 lg:px-12 mb-12 mt-8 max-w-[1000px] mx-auto'>
        {/* <div className="flex items-center justify-between ga-6 pb-6 ">
            <div className='text-gray-600 bg-gray-100  rounded-md border border-gray-300 flex items-center gap-1'>
                <p className='text-black bg-white py-2 px-2 border border-gray-300 rounded-md'>Sort by date</p>
                <p className=' p-2'>Sort by price</p>
            </div>
            <div className='text-gray-600 bg-gray-50  rounded-md border border-gray-300 hidden md:flex items-center gap-1'>
                <p className='text-black bg-white px-3 py-2 border border-gray-300 shadow-2xl rounded-md inline-flex items-center gap-1'> <List/> <span>List</span></p>
                <p className='px-3 py-2 inline-flex items-center gap-1'><LayoutGrid/> <span>Grid</span></p>
            </div>
        </div> */}
     <Suspense key={query} fallback={<div>Loading....</div>}>
      <SearchTable query={query}/>
      </Suspense>
      </main>
    
    </div>
  )
}

