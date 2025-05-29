import {cn} from '@/lib/utils'
import React from 'react';
import { CountButton, DetailsImage, ItemInfo } from './cart-item-details';
import { CartItemProps } from './cart-item-details/details-types';
import { DetailsPrice } from './cart-item-details/details-price';
import { Trash2Icon } from 'lucide-react';

interface Props extends CartItemProps {
    onUpdateQuantityButton?: (type: 'plus' | 'minus') => void
    onClickRemove?: () => void
    className?: string;
}

export const CartDrawerItem: React.FC<Props> = ({ className, imageUrl, id, name, price, quantity, details, onUpdateQuantityButton, onClickRemove }) => {
    return (
        <div className={cn('flex bg-white p-5 gap-6', className)}>
            <DetailsImage src={imageUrl}></DetailsImage>

            <div className='flex-1'>
                <ItemInfo name={name} details={details}></ItemInfo>

                <hr className='my-3'></hr>

                <div className='flex items-center justify-between'>
                    <CountButton onClick={onUpdateQuantityButton} value={quantity}></CountButton>

                    <div className='flex items-center gap-3'>
                        <DetailsPrice value={price}></DetailsPrice>
                        <Trash2Icon onClick={onClickRemove} className='text-gray-400 cursor-pointer hover:text-red-500' size={16}></Trash2Icon>
                    </div>
                </div>
            </div>
        </div>
    );
};