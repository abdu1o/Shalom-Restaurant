'use client'

import { Dialog } from '@/components/ui';
import { RelationsProduct } from '@/@types/prisma';
import React from 'react';
import { DialogContent } from '@/components/ui/dialog';
import { useRouter } from 'next/navigation';
import { ChooseProductForm, ChooseDrinkForm } from '../index';
import { useCartStore } from '@/store/cart';
import toast from 'react-hot-toast';

interface Props {
    product: RelationsProduct;
    className?: string;
}

export const ChooseProduct: React.FC<Props> = ({ product, className }) => {

    const router = useRouter();
    const isDrink = Boolean(product.items[0].size != null );

    const addCartItem = useCartStore((state) => state.addCartItem);
    const loading = useCartStore((state) => state.loading);

    const onAddProduct = async () => {

        try {
            await addCartItem({
                productItemId: product.items[0].id,
            });
            toast.success('Product added to cart');
            router.back();

        } catch (error) {
            toast.error('Error adding product to cart');
            console.error(error);
        }
    };

    const onAddDrink = async (productItemId: number, size: number | null) => {
        try {
            await addCartItem({
                productItemId,
                size,
            });
            toast.success('Product added to cart');
            router.back();

        } catch (error) {
            toast.error('Error adding product to cart');
            console.error(error);
        }
    };
    
    return (
        <Dialog open={Boolean(product)} onOpenChange={() => router.back()}>
            <DialogContent className="p-0 w-full max-w-[95vw] sm:max-w-[600px] md:max-w-[700px] lg:max-w-[800px] min-h-[300px] sm:min-h-[350px] md:min-h-[400px] bg-white overflow-hidden">
                {isDrink ? (
                    <ChooseDrinkForm onSubmit={onAddDrink} imageUrl={product.imageUrl} name={product.name} description={product.description ?? ''} items={product.items} loading={loading}></ChooseDrinkForm>
                ) : (
                    <ChooseProductForm onSubmit={onAddProduct} imageUrl={product.imageUrl} name={product.name} description={product.description ?? ''} price={product.items[0].price} loading={loading}></ChooseProductForm>
                )}
            </DialogContent>
        </Dialog>
    );
};