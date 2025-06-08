import { cn } from '@/lib/utils';
import React from 'react';
import { CartBlock } from './cart-block';
import { ArrowRight, HandCoins, Truck, UtensilsCrossed } from 'lucide-react';
import { Button, Skeleton } from '@/components/ui';
import { CheckoutItemDetails } from "@/components/custom/checkout/checkout-item-details";

const DELIVERY_PRICE = 10;
const TIP_PERCENTAGE = 20;

interface Props {
    totalAmount: number;
    loading?: boolean;
    className?: string;
}

export const CheckoutTotalCard: React.FC<Props> = ({ totalAmount, loading, className }) => {
    const deliveryPrice = totalAmount === 0 ? 0 : DELIVERY_PRICE;
    const tipAmount = (totalAmount * TIP_PERCENTAGE) / 100;
    const totalPrice = totalAmount + deliveryPrice + tipAmount;

    return (
        <CartBlock className="p-6 sticky top-4 border border-blue-400 rounded-lg">
            <div className="flex flex-col gap-1">
                <span className="text-xl">Total:</span>
                {loading ? (
                    <Skeleton className="h-11 w-48" />
                ) : (
                    <span className="h-11 text-[34px] font-extrabold">${totalPrice}</span>
                )}
            </div>

            <div className="grid grid-cols-1 gap-4 mt-4">
                <CheckoutItemDetails
                title={
                    <div className="flex items-center">
                    <UtensilsCrossed size={18} className="mr-2 text-gray-400" />
                    Products price:
                    </div>
                }
                value={loading ? <Skeleton className="h-6 w-16 rounded-[6px]" /> : `$${totalAmount}`}
                />

                <CheckoutItemDetails
                title={
                    <div className="flex items-center">
                    <Truck size={18} className="mr-2 text-gray-400" />
                    Shipping:
                    </div>
                }
                value={loading ? <Skeleton className="h-6 w-16 rounded-[6px]" /> : `$${deliveryPrice}`}
                />

                <CheckoutItemDetails
                title={
                    <div className="flex items-center">
                    <HandCoins size={18} className="mr-2 text-gray-400" />
                    Tips (5%):
                    </div>
                }
                value={loading ? <Skeleton className="h-6 w-16 rounded-[6px]" /> : `$${tipAmount}`}
                />
            </div>
            <Button loading={loading} disabled={totalAmount === 0} type="submit" className="w-full h-14 rounded-2xl mt-6 text-base font-bold sticky">
                Proceed to payment
                <ArrowRight className="w-5 ml-2" />
            </Button>
        </CartBlock>
    );
};
