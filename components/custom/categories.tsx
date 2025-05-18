'use client'

import { cn } from '@/lib/utils';
import { useCategoryStore } from '@/store/category';
import React from 'react';

interface Props {
    className?: string;
}

const categories = [
  { id: 1, name: 'First courses' },
  { id: 2, name: 'Main courses' },
  { id: 3, name: 'Snacks' },
  { id: 4, name: 'Drinks' },
  { id: 5, name: 'Confectionery' },
  { id: 6, name: 'Desserts' },
  { id: 7, name: 'Holiday courses' },
];

export const Categories: React.FC<Props> = ({ className }) => {
    const activeId = useCategoryStore((state) => state.activeId);
    return (
        <div className={cn('inline-flex gap-1 bg-gray-50 p-1 rounded-2xl', className)}>
            {
                categories.map(({name, id}, index) => (
                    <a className={cn('flex items-center font-bold h-11 rounded-2xl px-5',
                        activeId === id && 'bg-white shadow-md shadow-gray-200 text-primary'
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