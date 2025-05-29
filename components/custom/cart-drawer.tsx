'use client'

import {cn} from '@/lib/utils'
import React from 'react';
import Link from 'next/link';

import { Sheet, SheetClose, SheetContent, SheetFooter, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet"
import { ArrowRight } from 'lucide-react';
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
                <SheetHeader>
                    <SheetTitle>
                        <span className='font-bold'> {items.length} items</span>
                    </SheetTitle>
                </SheetHeader>

                <div className='scrollbar-hide overflow-y-scroll'>
                    {
                        items.map((item) => (
                            <div className='mb-2'>
                                <CartDrawerItem 
                                    key={item.id}
                                    id={item.id} 
                                    imageUrl={item.imageUrl} 
                                    name={item.size ? `${item.name} - ${item.size}ml` : item.name}
                                    details={item.description} 
                                    price={item.price} 
                                    quantity={item.quantity}
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
            </SheetContent>
        </Sheet>
    );
};