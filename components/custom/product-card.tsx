import { Title } from './title';
import Link from 'next/link';
import React from 'react';
import { Button } from '../ui';
import { PlusCircle } from 'lucide-react';
import { useCartStore } from '@/store/cart';
import toast from 'react-hot-toast';
import { RelationsProduct } from '@/@types/prisma';

interface Props {
    product: RelationsProduct;
    id: number;
    name: string;
    price: number;
    imageUrl: string;
    description: string;
    className?: string;
}

export const ProductCard: React.FC<Props> = ({ id, name, price, imageUrl, description, product, className }) => {
    
    const addCartItem = useCartStore((state) => state.addCartItem);
    const loading = useCartStore((state) => state.loading);

    const onAddProduct = async () => {
        try {
            await addCartItem({
                productItemId: product.items[0].id,
            });
            toast.success('Product added to cart');

        } catch (error) {
            toast.error('Error adding product to cart');
            console.log(error);
            console.log(product.items[0].id);
        }
    };

    return (
        <div className={className}>
            <Link href={`/product/${id}`}>
                <div className='flex justify-center p-6 rounded-lg h-[260px]'>
                    <img className='h-full max-h-[240px] min-h-[40px] w-full max-w-[240px] min-w-[40px] aspect-square object-contain rounded-4xl' src={imageUrl} alt={name}></img>
                </div>

                <Title text={name} size='sm' className='mb-1 mt-3 font-bold'></Title>

                <div className="flex justify-start items-center gap-3 mt-5">
                    <span className="text-[20px]">
                        from <b>${price}</b>
                    </span>

                    <Button variant="outline" loading={loading} /*onClick={onAddProduct}*/ className="text-base font-bold flex items-center gap-1">
                        <PlusCircle className="w-5 h-5" />
                        Add
                    </Button>
                </div>  
            </Link>
        </div>
    );
};