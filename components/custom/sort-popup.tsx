import { cn } from '@/lib/utils';
import { ArrowUpDown } from 'lucide-react';
import React from 'react';

interface Props {
    className?: string;
}

export const SortPopup: React.FC<Props> = ({ className }) => {
    return (
        <div className={cn('inline-flex items-center gap-1 bg-transparent p-5 h-[52px] cursor-pointer', className)}>
            <ArrowUpDown size={16}/>
            <b>Sort</b>
            <b className='text-primary'>popular</b>
        </div>
    );
};