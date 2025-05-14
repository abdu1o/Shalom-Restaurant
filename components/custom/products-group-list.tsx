import { cn } from '@/lib/utils';
import { Title } from './title';
import React from 'react';
import { ProductCard } from './product-card';

interface Props {
    items: any[];
    listClassName?: string;
    categoryId: number;
    className?: string;
}

export const ProductsGroupList: React.FC<Props> = ({ items, categoryId, listClassName, className }) => {
    return (
            <div className={className}>
                <div className={cn('grid grid-cols-3 gap[50px]', listClassName)}>
                    {items.map((product, i) => (
                        <ProductCard
                        key={product.id}
                        id={product.id}
                        name={product.name}
                        imageUrl={product.imageUrl}
                        price={product.items[0].price}/>
                    ))}
                        
                </div>
            </div>
    );
};