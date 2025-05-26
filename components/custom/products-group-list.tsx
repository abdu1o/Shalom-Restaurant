'use client';

import { cn } from '@/lib/utils';
import { Title } from './title';
import React from 'react';
import { ProductCard } from './product-card';
import { useIntersection } from 'react-use';
import { useCategoryStore } from '@/store/category';

interface Props {
    title: string;
    items: any[];
    listClassName?: string;
    categoryId: number;
    className?: string;
}

export const ProductsGroupList: React.FC<Props> = ({
    items,
    categoryId,
    listClassName,
    className,
    title
    }) => {

    const setAciveCategoryId = useCategoryStore((state) => state.setActiveId);

    const intersectionRef = React.useRef<HTMLDivElement>(null);
    const intersection = useIntersection(intersectionRef as React.RefObject<HTMLElement>, {
        threshold: 0.4444
    });
    
    React.useEffect(() =>{
        if(intersection?.isIntersecting) {
            setAciveCategoryId(categoryId);
        }
    }, [categoryId, intersection?.isIntersecting, title])

    return (
            <div className={className} id={title} ref={intersectionRef}>

                <Title text={title} size='lg' 
                className='mt-9 
                font-bold 
                text-center
                bg-gradient-to-r from-transparent via-blue-200 to-transparent'></Title>

                <div className={cn('grid grid-cols-3 gap[80px]', listClassName)}>

                    {items.map((product, i) => (
                        <ProductCard
                        key={product.id}
                        id={product.id}
                        name={product.name}
                        imageUrl={product.imageUrl}
                        description={product.description}
                        price={product.items[0].price}/>
                    ))}
                        
                </div>
            </div>
    );
};