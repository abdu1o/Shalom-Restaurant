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

interface FilterProps extends PriceProps {
  ingredients: string;
}

export const Filters: React.FC<Props> = ({ className }) => {
  const searchParams = useSearchParams() as unknown as Map<keyof FilterProps, string>;

  const [price, setPrice] = React.useState<PriceProps>({
    priceFrom: Number(searchParams.get('priceFrom')) || undefined,
    priceTo: Number(searchParams.get('priceTo')) || undefined
  });

  const { ingredients, onAddId, selectedIngredients } = useIngredients(
    searchParams.get('ingredients')?.split(',') || []
  );

  const items = ingredients.map((item) => ({
    value: String(item.id),
    text: item.name
  }));

  const router = useRouter();

  const filters = React.useMemo(() => ({
    ...price,
    ingredients: Array.from(selectedIngredients)
  }), [price, selectedIngredients]);

  React.useEffect(() => {
    const query = qs.stringify(filters, { arrayFormat: 'comma' });
    const currentQuery = window.location.search.slice(1);

    if (currentQuery !== query) {
      router.push(`?${query}`, { scroll: false });
    }
  }, [filters, router]);

  const updatePrice = (name: keyof PriceProps, value: number) => {
    setPrice((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  return (
    <div className={className}>
      <Title text="Filters" size="sm" className="mb-5 font-bold" />

      {/* Checkboxes */}
      <CheckboxFilterGroup
        title=""
        name="ingredients"
        className="mt-5"
        limit={3}
        defaultItems={items.slice(0, 3)}
        items={items}
        onClickCheckbox={onAddId}
        selectedIds={selectedIngredients}
      />

      {/* Price filter */}
      <div className="mt-5 border-y border-y-neutral-100 py-6 pb-7">
        <p className="font-bold mb-3">Price:</p>
        <div className="flex gap-3 mb-5">
          <Input
            type="number"
            placeholder="0"
            min={0}
            max={1000}
            value={price.priceFrom ?? ''}
            onChange={(e) => updatePrice('priceFrom', Number(e.target.value))}
          />
          <Input
            type="number"
            placeholder="1000"
            min={0}
            max={1000}
            value={price.priceTo ?? ''}
            onChange={(e) => updatePrice('priceTo', Number(e.target.value))}
          />
        </div>

        <RangeSlider
          min={0}
          max={1000}
          step={1}
          value={[price.priceFrom || 0, price.priceTo || 1000]}
          onValueChange={([priceFrom, priceTo]) => setPrice({ priceFrom, priceTo })}
        />
      </div>
    </div>
  );
};
