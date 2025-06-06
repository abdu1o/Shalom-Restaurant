'use client';

import { Container, Title, CartDrawerItem } from "@/components/custom";
import { CartBlock } from "@/components/custom/checkout/cart-block";
import { CheckoutItemDetails } from "@/components/custom/checkout/checkout-item-details";
import { Button, Input } from "@/components/ui";
import { UtensilsCrossed, Truck, HandCoins, ArrowRight } from "lucide-react";
import { Textarea } from "@/components/ui/textarea";
import { CheckoutItem } from "@/components/custom/checkout/checkout-item";
import { useCart } from "@/hooks/useCart";
import React from "react";
import { CheckoutTotalCard } from "@/components/custom/checkout/checkout-total-card";

export default function CheckoutPage() {
    const {totalAmount, items, updateItemQuantity, removeCartItem} = useCart();

    const onUpdateQuantityButton = (id: number, quantity: number, type: 'plus' | 'minus') => {
        const newQuantity = type === 'plus' ? quantity + 1 : quantity - 1;
        updateItemQuantity(id, newQuantity);
    }

    return (
        <Container className="mt-10">
            <Title text='Checkout' className='font-extrabold mb-8 text-[36px]'></Title>

            <div className="flex gap-10">
                <div className="flex flex-col gap-10 flex-1 mb-20">
                    <CartBlock title="1. Order summary"></CartBlock>
                        {
                            items.map((item) => (
                                <div key={item.id} className='mb-2'>
                                    <CheckoutItem 
                                        id={item.id} 
                                        imageUrl={item.imageUrl} 
                                        name={item.size ? `${item.name} - ${item.size}ml` : item.name}
                                        details={item.description} 
                                        price={item.price} 
                                        quantity={item.quantity}
                                        disabled={item.disabled}
                                        onUpdateQuantityButton={(type) => onUpdateQuantityButton(item.id, item.quantity, type)}
                                        onClickRemove={() => removeCartItem(item.id)}>
                                    </CheckoutItem>
                                </div>
                            ))
                        } 

                    <CartBlock title="2. Personal info"></CartBlock>
                    <div className="grid grid-cols-2 gap-5">
                        <Input name='firstName' className="text-base" placeholder="First name"></Input>
                        <Input name='lastName' className="text-base" placeholder="Last name"></Input>
                        <Input name='email' className="text-base" placeholder="Email"></Input>
                        <Input name='phone' className="text-base" placeholder="Phone number"></Input>
                    </div>

                    <CartBlock title="3. Delivery address"></CartBlock>
                    <div className="flex flex-col gap-5">
                        <Input name='address' className="text-base" placeholder="Address"></Input>
                        <Textarea rows={5} className="text-base" placeholder="Additional notes"></Textarea>
                    </div>
                </div>

                <div className="w-[450px]">
                    <CheckoutTotalCard totalAmount={totalAmount}></CheckoutTotalCard>
                </div>

            </div>
        </Container>
    );
}