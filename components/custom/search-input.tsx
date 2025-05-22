'use client';

import {cn} from '@/lib/utils'
import React from 'react';
import { Search } from 'lucide-react';
import {useClickAway, useDebounce} from 'react-use';
import Link from 'next/link';
import { Api } from '@/services/api-client';
import { Product } from '@prisma/client';

interface Props {
    className?: string;
}

export const SearchInput: React.FC<Props> = ({ className }) => {
    const [focused, setFocused] = React.useState(false);
    const [searchQuery, setSearchQuery] = React.useState('');
    const [products, setProducts] = React.useState<Product[]>([]);
    const ref = React.useRef(null);

    useClickAway(ref, () => {
        console.log(focused);
        setFocused(false);
    });

    React.useEffect(() => {
    const fetchProducts = async () => {
        try {
            const items = await Api.products.search(searchQuery);
            setProducts(items);
        } catch (error) {
            console.error('Error fetching products:', error);
        }
    };

    fetchProducts();
}, [searchQuery]);

    const onClickItem = () => {
        setFocused(false);
        setSearchQuery('');
        setProducts([]);
    };

    return (
        <>
            {focused && <div className='fixed top-0 left-0 bottom-0 right-0 bg-black/50 z-30'> </div>}

                 <div ref={ref} className={cn('flex rounded-2xl flex-1 justify-between relative bg-white h-11 border-2 border-primary z-30', className)}>

                    <Search className='absolut top-1/2 translate-y-[50%] left-5 h-5 ml-2 text-primary'></Search>
                    <input className='w-full outline-none pl-3'
                            type='text'
                            placeholder='Search'
                            onFocus={() => setFocused(true)}
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}>
                    </input>

                    {products.length > 0 && <div className={cn(
                        'absolute w-full bg-white rounded-xl py-2 top-14 shadow-md transition-all duration-200 invisible opacity-0 z-30',
                        focused && 'visible opacity-100 top-12'
                    )}>
                        {products.map((product) => (
                                <Link
                                    onClick={onClickItem}
                                    key={product.id} 
                                    href={`/product/${product.id}`} 
                                    className="flex items-center gap-3 w-full px-3 py-2 hover:bg-primary/10">
                                        
                                        <img 
                                        className="rounded-sm h-8 w-8" 
                                        src={product.imageUrl} 
                                        alt={product.name}/>

                                        <span className='hover:text-primary'>
                                            {product.name}
                                        </span>
                                </Link>
                        ))}
                    </div>}
                </div>
        </>
    );
};