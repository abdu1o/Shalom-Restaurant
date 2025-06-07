import React from 'react';
import { CartBlock } from './cart-block';
import { CheckoutItem } from './checkout-item';
import { CartStateItem } from '@/lib/get-cart-details';
import { CheckoutItemSkeleton } from './checkout-item-skeleton';

interface Props {
    items: CartStateItem[];
    onUpdateQuantityButton: (id: number, quantity: number, type: 'plus' | 'minus') => void;
    removeCartItem: (id: number) => void;
    className?: string;
    loading?: boolean;
}

export const CheckoutCart: React.FC<Props> = ({ className, items, onUpdateQuantityButton, removeCartItem, loading }) => {
    return (
        <CartBlock title="1. Order summary" className={className}>
            {
                loading && [...Array(4)].map((_, index) => <CheckoutItemSkeleton key={index} />)
            }

            {!loading && items.length > 0 && items.map((item) => (
                <div key={item.id} className="mb-2">
                <CheckoutItem
                    id={item.id}
                    imageUrl={item.imageUrl}
                    name={item.size ? `${item.name} - ${item.size}ml` : item.name}
                    details={item.description}
                    price={item.price}
                    quantity={item.quantity}
                    disabled={item.disabled}
                    onUpdateQuantityButton={(type) => onUpdateQuantityButton(item.id, item.quantity, type)}
                    onClickRemove={() => removeCartItem(item.id)}
                />
                </div>
            ))}
        </CartBlock>
    );
};
