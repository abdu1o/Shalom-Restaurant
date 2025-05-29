'use client'

import { Dialog } from '@/components/ui';
import { RelationsProduct } from '@/@types/prisma';
import React from 'react';
import { DialogContent } from '@/components/ui/dialog';
import { useRouter } from 'next/navigation';
import { ProductForm } from '../index';

interface Props {
    product: RelationsProduct;
    className?: string;
}

export const ChooseProduct: React.FC<Props> = ({ product, className }) => {

    const router = useRouter();
    
    return (
        <Dialog open={Boolean(product)} onOpenChange={() => router.back()}>
            <DialogContent className="p-0 w-full max-w-[95vw] sm:max-w-[600px] md:max-w-[700px] lg:max-w-[800px] min-h-[300px] sm:min-h-[350px] md:min-h-[400px] bg-white overflow-hidden">
                <ProductForm className="w-[300px]" classNameImg="w-[300px] h-[300px]" product={product}></ProductForm>
            </DialogContent>
        </Dialog>
    );
};