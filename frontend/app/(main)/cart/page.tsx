'use client'
import React from 'react';
import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';
import { useAppDispatch, useAppSelector } from '@/redux/hooks';
import { clearCart, selectCartItems, selectTotalQnt } from '@/redux/slices/cartSlice';
import CartCard from '@/components/CartCard';
import Empty from '@/components/Empty';
import { clearSelcted, selectAll, selectSelectedIds } from '@/redux/slices/selectedItemsSlice';
import { selectCheckoutTotals } from '@/redux/selectors';
import { Checkbox } from '@/components/ui/checkbox';
import Common from '@/components/Common';


const CartPage = () => {
    const cartItems = useAppSelector(selectCartItems)
    const selectedItems = useAppSelector(selectSelectedIds)
    const cartTotalQnt = useAppSelector(selectTotalQnt)
    const { totalQnt, totalPrice, totalDiscount } = useAppSelector(selectCheckoutTotals);
    const dispatch = useAppDispatch();

    const selectableIds = cartItems.filter(i => !i.outOfStock).map(i => i.productId);
    const allSelected = selectableIds.every(id => selectedItems.includes(id));

    const handleSelectAll = () => {
        if (allSelected) {
            dispatch(clearSelcted());
        } else {
            dispatch(selectAll(selectableIds));
        }
    }

    if (cartItems.length === 0) {
        return <Empty />
    }

    return (
        <div className="container mx-auto p-4 md:p-8 relative">
            <Common header={`Cart (${cartTotalQnt})`} />

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mt-3">

                <div className="lg:col-span-2">
                    <div className='flex flex-col sm:flex-row items-start sm:items-center justify-between gap-y-2  border-b pb-4 mb-4'>
                        <div className='flex items-center justify-start gap-6'>
                            <div className='flex items-center'>

                                <Checkbox className='rounded-full w-5 h-5 text-white border border-slate-400' checked={selectedItems.length === cartItems.length}
                                    onCheckedChange={handleSelectAll}

                                />
                                <span className='ml-2 text-gray-700'>Select all items</span>
                            </div>
                            <button className='text-blue-600 hover:text-blue-800 text-sm cursor-pointer' onClick={() => dispatch(clearCart())}>
                                Delete cart items
                            </button>
                        </div>
                        <Link href='/checkout' className='ml-auto'>
                            <button className=' bg-primary text-white font-bold py-2 px-4 rounded-sm hover:scale-95 transition duration-300 cursor-pointer'>
                                Checkout ({totalQnt})
                            </button>
                        </Link>
                    </div>
                    <CartCard />
                </div>

                <div className="lg:col-span-1 border border-slate-400  rounded-lg p-6 bg-white shadow-sm h-fit lg:sticky top-20 max-w-sm">
                    <h2 className='text-xl font-semibold mb-6'>Summary</h2>
                    <div className='space-y-3 text-sm'>
                        <div className='flex justify-between'>
                            <span>Items total</span>
                            <span className='font-medium'>ETB {totalPrice.toFixed(2)}</span>
                        </div>
                        <div className='flex justify-between text-red-600'>
                            <span>Items discount</span>
                            <span className='font-medium'>- ETB {totalDiscount.toFixed(2)}</span>
                        </div>
                        <div className='flex justify-between border-t pt-3'>
                            <span>Subtotal</span>
                            <span className='font-medium'>ETB {(totalPrice - totalDiscount).toFixed(2)}</span>
                        </div>
                        <div className='flex justify-between'>
                            <span>Shipping</span>
                            <span className='font-medium'> free </span>
                        </div>
                    </div>

                    <div className='flex justify-between items-center mt-4 pt-4 border-t border-gray-300'>
                        <span className='text-lg font-semibold'>Estimated total</span>
                        <span className='text-xl font-bold'>ETB {(totalPrice - totalDiscount).toFixed(2)}</span>
                    </div>

                    <Link href='/checkout' className='block mt-6'>
                        <button className='w-full bg-primary text-white font-bold py-3 rounded-lg hover:scale-95 transition duration-300'>
                            Checkout ({totalQnt})
                        </button>
                    </Link>

                </div>

            </div>

            <div className='flex justify-start p-4 border-t mt-8'>
                <Link href='/category' className='text-base font-bold text-gray-600 hover:text-gray-900 flex items-center gap-1'>
                    <ArrowLeft className='h-4 w-4' />
                    <span>Continue Shopping</span>
                </Link>
            </div>
        </div>
    );
}

export default CartPage;