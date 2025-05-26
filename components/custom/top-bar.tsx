import { cn } from '@/lib/utils';
import React from 'react';
import { Container } from './container';
import { Categories } from './categories';
import { SortPopup } from './sort-popup';
import { Category } from '@prisma/client';

interface Props {
    categories: Category[];
    className?: string;
}

export const TopBar: React.FC<Props> = ({ categories, className }) => {
    return (
        <div className={cn('sticky top-0 bg-blue-200 py-3 shadow-lg border-t-2 border-b-2 border-primary shadow-black/5 z-10', className)}>
            <Container className='flex items-center justify-between'>
                <Categories items={categories}></Categories>
                <SortPopup></SortPopup>
            </Container>
        </div>
    );
};