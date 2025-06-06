'use client';

import {cn} from '@/lib/utils'
import React from 'react';
import { CountButton, DetailsImage, ItemInfo } from '../cart-item-details';
import { CartItemProps } from '../cart-item-details/details-types';
import { DetailsPrice } from '../cart-item-details/details-price';
import { Trash2Icon } from 'lucide-react';

interface Props extends CartItemProps {
    onUpdateQuantityButton?: (type: 'plus' | 'minus') => void
    onClickRemove?: () => void
    className?: string;
}

export const CheckoutItem: React.FC<Props> = ({ 
    className, 
    imageUrl, 
    name, 
    price, 
    quantity,
    details,
    disabled, 
    onUpdateQuantityButton, 
    onClickRemove 
}) => {
    return (
        <div className={cn('flex items-center justify-between', {'opacity-50 cursor-not-allowed': disabled }, className)}>
            <div className='flex items-center gap-5 flex-1'>
                <DetailsImage src={imageUrl}></DetailsImage>
                <ItemInfo name={name} details={details}></ItemInfo>
            </div>

            <DetailsPrice value={price}></DetailsPrice>

            <div className='flex items-center gap-5 ml-20'>
                <CountButton onClick={onUpdateQuantityButton} value={quantity}></CountButton>
                <Trash2Icon onClick={onClickRemove} className='text-gray-400 cursor-pointer hover:text-red-500' size={16}></Trash2Icon>
            </div>

        </div>
    );
};