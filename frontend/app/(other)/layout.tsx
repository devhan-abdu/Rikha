import React from "react";

export default function Common({children}:{children:React.ReactNode}) {
    return (
        <>
        <section className="bg-gray-100 px-6 py-12">
            <div className="flex items-center justify-center">
             <p className="text-3xl font-cinzel bold capitalize">your cart</p>
            </div>

        </section>

        <section>{children}</section>
        </>
       
    )
    
}