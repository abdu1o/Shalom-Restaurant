'use client'

import { cn } from '@/lib/utils';
import { useCategoryStore } from '@/store/category';
import { Category } from '@prisma/client';
import React from 'react';

interface Props {
    items: Category[];
    className?: string;
}

export const Categories: React.FC<Props> = ({ items, className }) => {
    const activeId = useCategoryStore((state) => state.activeId);
    return (
        <div className={cn('inline-flex gap-1 bg-transparent p-1', className)}>
            {
                items.map(({name, id}, index) => (
                    <a className={cn('flex items-center font-bold h-11 rounded p-1 px-5',
                        activeId === id && 'bg-transparent text-primary'
                    )}
                    href={`/#${name}`}
                    key = {index}>
                        <button className='cursor-pointer'>
                            {name}
                        </button>
                    </a>
                ))
            }
        </div>
    );
};