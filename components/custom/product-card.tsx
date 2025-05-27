import { cn } from '@/lib/utils';
import { Title } from './title';
import Link from 'next/link';
import React from 'react';
import { Button } from '../ui';
import { PlusCircle } from 'lucide-react';

interface Props {
    id: number;
    name: string;
    price: number;
    imageUrl: string;
    description: string;
    className?: string;
}

export const ProductCard: React.FC<Props> = ({ id, name, price, imageUrl, description,className }) => {
    return (
            <div className={className}>
                <Link href={`/product/${id}`}>
                    <div className='flex justify-center p-6 rounded-lg h-[260px]'>
                        <img className='h-full max-h-[240px] min-h-[40px] w-full max-w-[240px] min-w-[40px] aspect-square object-contain rounded-4xl' src={imageUrl} alt={name}></img>
                    </div>

                    <Title text={name} size='sm' className='mb-1 mt-3 font-bold'></Title>

                    <div className="flex justify-start items-center gap-3 mt-5">
                        <span className="text-[20px]">
                            $<b>{price}</b>
                        </span>

                        <Button variant="outline" className="text-base font-bold flex items-center gap-1">
                            <PlusCircle className="w-5 h-5" />
                            Add
                        </Button>
                    </div>

                </Link>
            </div>
    );
};