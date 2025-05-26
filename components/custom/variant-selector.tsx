'use client';

import { cn } from '@/lib/utils';
import React from 'react';

type Variant = {
    
    name: string;
    value: string;
    disabled?: boolean;
}

interface Props {
    items: readonly Variant[];
    onClick?: (value: Variant['value']) => void;
    selectedValue?: Variant['value'];
    className?: string;
}

export const VariantSelector: React.FC<Props> = ({ className, items, selectedValue, onClick }) => {
    return (
        <div className={cn('flex justify-between bg-white rounded-3xl p1 select-none mt-4', className)}>
            {
                items.map((item) => (
                    <button 
                        key={item.name} 
                        onClick={()=> onClick?.(item.value)} 
                        className={cn('flex items-center justify-center cursor-pointer h-[30px] px-5 flex-1 rounded-3xl transition-all duration-400 text-sm', 
                            {
                                'bg-primary text-primary-foreground': item.value === selectedValue,
                                'text-gray-500 opacity-60 cursor-not-allowed': item.disabled
                            })}>
                        {item.name}
                    </button>
                ))
            }
        </div>
    );
};