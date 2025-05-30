import { cn } from '@/lib/utils';
import React from 'react';

interface Props {
    imageUrl: string;
    className?: string;
}

export const ProductImage: React.FC<React.PropsWithChildren<Props>> = ({ className, imageUrl }) => {
    return (
        <div className={cn('flex items-centeer justify-center flex-1 relative w-full', className)}>
            <img 
                src={imageUrl}
                alt="logo"
                className={cn('relative left-2S top-2 z-10 w-[250px] h-[250px] rounded-4xl')}>
            </img>
        </div>
    );
};