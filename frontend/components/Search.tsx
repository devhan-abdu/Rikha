'use client'
import { SearchIcon } from "lucide-react"
import { useSearchParams , useRouter , usePathname } from "next/navigation"
import {useDebouncedCallback } from 'use-debounce'
 
 const Search = () => {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const {replace} = useRouter();


  const handleSearch =useDebouncedCallback((term) => {
     const params = new URLSearchParams(searchParams)
    
     if(term){
      params.set('query' , term)
     }
     else {
      params.delete('query')
     }
     console.log(term)
     replace(`${pathname}?${params.toString()}`)
  },500);

   return (
          <div className=" border-b border-slate-200 bg-gray-50 text-center z-50 px-4 flex items-center justify-center ">
     <div className="w-full inline-flex items-center justify-center px-6 py-2.5 my-5 mx-3  sm:w-1/2 border-2 border-gray-400 rounded-full shadow-lg shadow-white bg-white">
      <input
        defaultValue={searchParams.get('query')?.toString()}
        onChange={(e)=>{
        handleSearch(e.target.value)
       }}
       className="flex-1 outline-none bg-inherit" type="text" placeholder="search product..." />
      <SearchIcon className="text-gray-500"/>
    </div>
    </div>
   )
 }
 
 export default Search
 