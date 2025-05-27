'use client'

import {cn} from '@/lib/utils'
import { Container } from './container';
import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { SearchInput } from './search-input';
import { CartButton } from '.';

import {
    Sheet,
    SheetClose,
    SheetContent,
    SheetFooter,
    SheetHeader,
    SheetTitle,
    SheetTrigger,
} from "@/components/ui/sheet"
import { ArrowRight } from 'lucide-react';
import { Button } from '../ui';
import { CartDrawerItem } from './cart-drawer-item';


interface Props {
    className?: string;
}

export const CartDrawer: React.FC<React.PropsWithChildren<Props>> = ({ children, className }) => {
    return (
        <Sheet>
            <SheetTrigger>
                {children}
            </SheetTrigger>
            <SheetContent className='flex flex-col justify-between pb-0 bg-white'>
                <SheetHeader>
                    <SheetTitle>
                        <span className='font-bold'> 3 items</span>
                    </SheetTitle>
                </SheetHeader>

                <CartDrawerItem 
                    id={1} 
                    imageUrl={'https://cdn.apartmenttherapy.info/image/upload/f_jpg,q_auto:eco,c_fill,g_auto,w_1500,ar_1:1/k%2FPhoto%2FRecipes%2F2021-03-how-to-matzo-ball-soup%2F2021_howto_matzoballsoup_lead2_228'} 
                    name={'Qweqweqwe'} 
                    details={'asdasdasd'} 
                    price={100} 
                    quantity={1}>
                </CartDrawerItem>

                <SheetFooter className='mx-6 bg-white p-8'>
                    <div className='w-full'>
                        <div className='flex mb-4'>
                            <span className='flex flex-1 text-lg text-gray-500'>
                                Total
                            </span>
                            <span className='font-bold text-lg'>$100</span>
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