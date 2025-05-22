'use client'

import React from 'react';
import { Title } from './title';
import { FilterCheckbox } from './filter-checkbox';
import { Input } from '../ui';
import { RangeSlider } from './range-slider';
import { CheckboxFilterGroup } from './checkbox-filters-group';
import { useIngredients } from '@/hooks/useIngredients';

interface Props {
    className?: string;
}

export const Filters: React.FC<Props> = ({ className }) => {

    const {ingredients, onAddId, selectedIds} = useIngredients();
    const items = ingredients.map((item) => ({ value: String(item.id), text: item.name}));

    return (
        <div className={className}>
            <Title text='Filters' size='sm' className='mb-5 font-bold'/>

            {/*upper checkoboxes*/}
            <div className='flex flex-col gap-3'>
                <FilterCheckbox text="Kosher" value='1'></FilterCheckbox>
                <FilterCheckbox text="Vegeterian" value='2'></FilterCheckbox>
                <FilterCheckbox text="Gluten-Free" value='3'></FilterCheckbox>
                <FilterCheckbox text="Sugar-Free" value='4'></FilterCheckbox>
            </div>

            {/*price filter*/}
            <div className='mt-5 border-y border-y-neutral-100 py-6 pb-7'>
                <p className='font-bold mb-3'>Price:</p>
                <div className='flex gap-3 mb-5'>
                    <Input type='number' placeholder='0' min={0} max={1000} defaultValue={0}></Input>
                    <Input type='number' placeholder='1000' min={0} max={1000} defaultValue={10}></Input>
                </div>

                <RangeSlider min={0} max={1000} step={1} value={[0, 1000]}></RangeSlider>

            </div>

            {/*lower checkoboxes*/}
            <CheckboxFilterGroup 
                title='Specific' 
                name='ingredients'
                className='mt-5' 
                limit={3}
                defaultItems={items.slice(0, 3)}
                items={items}
                onClickCheckbox={onAddId}
                selectedIds={selectedIds}>
            </CheckboxFilterGroup>
        </div>
    );
};