'use client';

import { RelationsProduct } from '@/@types/prisma';
import { useCartStore } from '@/store/cart';
import React from 'react';
import toast from 'react-hot-toast';
import { ChooseDrinkForm } from './choose-drink-form';
import { ChooseProductForm } from './choose-product-form';

interface Props {
  product: RelationsProduct;
  className?: string;
  classNameImg?: string;
  onSubmit?: VoidFunction;
}

export const ProductForm: React.FC<Props> = ({ className, classNameImg, product, onSubmit: _onSubmit }) => {
    
    const addCartItem = useCartStore((state) => state.addCartItem);
    const loading = useCartStore((state) => state.loading);

    const isDrink = Boolean(product.items[0].size != null );

  const onAddProduct = async () => {
        try {
            await addCartItem({
                productItemId: product.items[0].id,
            });
            toast.success('Product added to cart');

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

        } catch (error) {
            toast.error('Error adding product to cart');
            console.error(error);
        }
    };

  if (isDrink) {
    return (
        <ChooseDrinkForm 
            onSubmit={onAddDrink}
            imageUrl={product.imageUrl} 
            name={product.name} 
            description={product.description ?? ''} 
            items={product.items} 
            loading={loading} 
            className={className}
            classNameImg={classNameImg}>
        </ChooseDrinkForm>
    );
  }

  return (
    <ChooseProductForm 
        onSubmit={onAddProduct} 
        imageUrl={product.imageUrl} 
        name={product.name} 
        description={product.description ?? ''} 
        price={product.items[0].price} 
        loading={loading} 
        className={className}
        classNameImg={classNameImg}>
    </ChooseProductForm>
  );
};