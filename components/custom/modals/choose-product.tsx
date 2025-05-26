'use client'

import { Dialog } from '@/components/ui';
import { Category, Product } from '@prisma/client';
import { DialogContent, Title } from '@radix-ui/react-dialog';
import React from 'react';

interface Props {
    product: Product;
    className?: string;
}

export const ChooseProduct: React.FC<Props> = ({ product, className }) => {

    return (
        <Dialog>
            <DialogContent className='p-0 w-[1060px] max-w-[1060px] min-[h]-[500px] bg-white overflow-hidden'>
                <Title>{product.name}</Title>
            </DialogContent>
        </Dialog>

    );
};