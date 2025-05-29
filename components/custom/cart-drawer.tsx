'use client'

import {cn} from '@/lib/utils'
import React from 'react';
import Link from 'next/link';

import { Sheet, SheetClose, SheetContent, SheetFooter, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet"
import { ArrowBigLeft, ArrowLeft, ArrowRight } from 'lucide-react';
import { Button } from '../ui';
import { CartDrawerItem } from './cart-drawer-item';
import { useCart } from '@/hooks/useCart';


interface Props {
    className?: string;
}

export const CartDrawer: React.FC<React.PropsWithChildren<Props>> = ({ children, className }) => {
    
    const { totalAmount, updateItemQuantity, items, removeCartItem } = useCart();
    const [redirecting, setRedirecting] = React.useState(false);


    const onUpdateQuantityButton = (id: number, quantity: number, type: 'plus' | 'minus') => {
        const newQuantity = type === 'plus' ? quantity + 1 : quantity - 1;
        updateItemQuantity(id, newQuantity);
    }

    return (
        <Sheet>
            <SheetTrigger>
                {children}
            </SheetTrigger>
            <SheetContent className='flex flex-col justify-between pb-0 bg-white'>
                {totalAmount > 0 && (
                <>
                <SheetHeader>
                    <SheetTitle>
                        <span className='font-bold'> {items.length} items</span>
                    </SheetTitle>
                </SheetHeader>
                </>
                )}

                {!totalAmount && (
                    <div className='flex flex-col items-center justify-center flex-1 text-center'>
                        <span className='font-bold text-3xl'>Oooops...</span>
                        <span className='font-bold text-2xl mt-5 text-center'>Seems like cart is empty</span>

                        <SheetClose>
                            <Button className='w-35 h-12 text-base mt-5' size='lg'>
                                <ArrowLeft className='w-5 mr-2'></ArrowLeft>
                                Fix it
                            </Button>
                        </SheetClose>
                    </div>

                )}

                {totalAmount > 0 && (
                <>
                    <div className='scrollbar-hide overflow-y-scroll'>
                        {
                            items.map((item) => (
                                <div key={item.id} className='mb-2'>
                                    <CartDrawerItem 
                                        id={item.id} 
                                        imageUrl={item.imageUrl} 
                                        name={item.size ? `${item.name} - ${item.size}ml` : item.name}
                                        details={item.description} 
                                        price={item.price} 
                                        quantity={item.quantity}
                                        disabled={item.disabled}
                                        onUpdateQuantityButton={(type) => onUpdateQuantityButton(item.id, item.quantity, type)}
                                        onClickRemove={() => removeCartItem(item.id)}>
                                    </CartDrawerItem>
                                </div>
                            ))
                        }
                    </div>
                    
                    <SheetFooter className='mx-6 bg-white p-8 border-t-2 border-primary'>
                        <div className='w-full'>
                            <div className='flex mb-4'>
                                <span className='flex flex-1 text-lg text-gray-600'>
                                    Total:
                                </span>
                                <span className='font-bold text-lg'>${totalAmount}</span>
                            </div>

                            <Link href='/cart'>
                                <Button
                                    type="submit"
                                    className='w-full h-12 text-base'>
                                        Confirm
                                    <ArrowRight className='w-5 ml-2'></ArrowRight>
                                </Button>
                            </Link>
                        </div>
                    </SheetFooter>
                </>
                )}
            </SheetContent>
        </Sheet>
    );
};