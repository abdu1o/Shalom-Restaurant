'use client'

import React from 'react';
import { Title } from './title';
import qs from 'qs';
import { Input } from '../ui';
import { RangeSlider } from './range-slider';
import { CheckboxFilterGroup } from './checkbox-filters-group';
import { useIngredients } from '@/hooks/useIngredients';
import { useRouter, useSearchParams } from 'next/navigation';

interface Props {
    className?: string;
}

interface PriceProps {
    priceFrom?: number;
    priceTo?: number;
}

interface FiletrProps extends PriceProps {
    ingredients: string;
}

export const Filters: React.FC<Props> = ({ className }) => {

    const searchParams = useSearchParams() as unknown as Map<keyof FiletrProps, string>;

    const [price, setPrice] = React.useState<PriceProps>({
        priceFrom: Number(searchParams.get('priceFrom')) || undefined,
        priceTo: Number(searchParams.get('priceTo')) || undefined
    });

    const {ingredients, onAddId, selectedIngredients} = useIngredients(searchParams.get('ingredients') ? searchParams.get('ingredients')?.split(',') : []);

    const items = ingredients.map((item) => ({ value: String(item.id), text: item.name}));

    const router = useRouter();

    const filters = {
        ...price,
        ingredients: Array.from(selectedIngredients)
    }

    const updatePrice = (name: keyof PriceProps, value: number ) => {
        setPrice({
            ...price,
            [name]: value,
        });
    };

    React.useEffect(() => {
        const query = qs.stringify(filters, {arrayFormat: 'comma'});

        router.push(`?${query}`, {scroll: false});
    }, [filters]);

    return (
        <div className={className}>
            <Title text='Filters' size='sm' className='mb-5 font-bold'/>

            {/*checkoboxes*/}
            <CheckboxFilterGroup 
                title='' 
                name='ingredients'
                className='mt-5' 
                limit={3}
                defaultItems={items.slice(0, 3)}
                items={items}
                onClickCheckbox={onAddId}
                selectedIds={selectedIngredients}>
            </CheckboxFilterGroup>

            {/*price filter*/}
            <div className='mt-5 border-y border-y-neutral-100 py-6 pb-7'>
                <p className='font-bold mb-3'>Price:</p>
                <div className='flex gap-3 mb-5'>

                    <Input type='number' placeholder='0' min={0} max={1000} 
                    value={String(price.priceFrom)} 
                    onChange={(e) => updatePrice('priceFrom', Number(e.target.value))}></Input>

                    <Input type='number' placeholder='1000' min={0} max={1000} 
                    value={String(price.priceTo)} 
                    onChange={(e) => updatePrice('priceTo', Number(e.target.value))}></Input>

                </div>

                <RangeSlider min={0} max={1000} step={1} 
                value={[price.priceFrom || 0, price.priceTo || 1000]} 
                onValueChange={([priceFrom, priceTo]) => setPrice({priceFrom, priceTo})}></RangeSlider>

            </div>
        </div>
    );
};