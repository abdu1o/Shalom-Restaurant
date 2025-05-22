'use client'
import { cn } from '@/lib/utils';
import React from 'react';
import { FilterChecboxProps, FilterCheckbox } from './filter-checkbox';
import { Input } from '../ui/input';

type Item = FilterChecboxProps;

interface Props {
    title: string;
    items: Item[];
    defaultItems: Item[];
    limit: number;
    searchInputPlaceholder?: string;
    onChange?: (values: string[]) => void;
    onClickCheckbox?: (id: string) => void;
    defaultValue?: string[];
    selectedIds?: Set<string>;
    className?: string;
    name?: string;
}

export const CheckboxFilterGroup: React.FC<Props> = (
    {
        title,
        items,
        defaultItems,
        limit,
        searchInputPlaceholder = 'Search',
        className,
        onClickCheckbox,
        selectedIds,
        defaultValue,
        name
    }) => {

        const [showAll, setShowAll] = React.useState(false);
        const [searchValue, setSearchValue] = React.useState('');

        const onChangeSearchInput = (value: string) => {
            setSearchValue(value);
        }
        
        const list = showAll ?
        items.filter((item) => item.text.toLowerCase().includes(searchValue.toLowerCase()))
        : defaultItems.slice(0, limit);

    return (
        <div className={cn(className)}>
           <p className='font-bold mb-3'>{title}</p>

           {showAll && (
            <div className='mb-5'>
                <Input onChange={e => onChangeSearchInput(e.target.value)} placeholder = {searchInputPlaceholder} className='bg-gray-50 border-none'></Input>
           </div>
           )}

            <div className='flex flex-col gap-4 max-h-96 pr-2 overflow-auto scrollbar'>
                {list.map((item, index) => (
                    <FilterCheckbox
                        checked = {selectedIds?.has(item.value)}
                        key = {index}
                        value = {item.value}
                        text = {item.text}
                        endAdornment = {item.endAdornment}
                        onCheckedChange = {() => onClickCheckbox?.(item.value)}
                        name = {name}
                    />
                ))}
            </div>

            {items.length > limit && (
                <div className={showAll ? 'border-t border-t-neutral-100 mt-1' : ''}>
                    <button onClick={() => setShowAll(!showAll)} className='text-primary mt-3 cursor-pointer'>
                        { showAll ? 'Hide' : 'Show all'}
                    </button>
                </div>
            )}
            
        </div>
    );
};