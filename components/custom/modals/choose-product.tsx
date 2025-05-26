'use client'

import { Dialog } from '@/components/ui';
import { Category, Product } from '@prisma/client';
import React from 'react';
import { Title } from '../title';
import { DialogContent } from '@/components/ui/dialog';
import { useRouter } from 'next/navigation';

interface Props {
    product: Product;
    className?: string;
}

export const ChooseProduct: React.FC<Props> = ({ product, className }) => {

    const router = useRouter();

    return (
        <Dialog open={Boolean(product)} onOpenChange={() => router.back()}>
            <DialogContent className='p-0 w-[1060px] max-w-[1060px] h-[500px] min-[h]-[500px] bg-white overflow-hidden'>
                <Title text={product.name}></Title>
            </DialogContent>
        </Dialog>

    );
};