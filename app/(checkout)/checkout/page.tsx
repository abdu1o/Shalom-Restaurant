'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { useForm, FormProvider } from "react-hook-form"
import { Container, Title } from "@/components/custom";
import { useCart } from "@/hooks/useCart";
import React from "react";
import { CheckoutTotalCard } from "@/components/custom/checkout/checkout-total-card";
import { CheckoutCart } from '@/components/custom/checkout/checkout-cart';
import { CheckoutInfo } from '@/components/custom/checkout/checkout-info';
import { CheckoutAddress } from '@/components/custom/checkout/checkout-address';
import { checkoutFormSchema, CheckoutFormValues } from '@/components/custom/checkout/schemas/checkout-form-schema';

export default function CheckoutPage() {
    const {totalAmount, items, updateItemQuantity, removeCartItem, loading} = useCart();

    const form = useForm<CheckoutFormValues>({
        resolver: zodResolver(checkoutFormSchema),
        defaultValues: {
            email: '',
            firstName: '',
            lastName: '',
            phone: '',
            address: '',
            comment: '',
        },
    });

    const onUpdateQuantityButton = (id: number, quantity: number, type: 'plus' | 'minus') => {
        const newQuantity = type === 'plus' ? quantity + 1 : quantity - 1;
        updateItemQuantity(id, newQuantity);
    }

    const onSubmit = (data: CheckoutFormValues) => {

    };

    return (
        <Container className="mt-10">
            <Title text='Checkout' className='font-extrabold mb-8 text-[36px]'></Title>

            <FormProvider {...form}>
                <form onSubmit={form.handleSubmit((onSubmit))}>
                    <div className="flex gap-10">
                        <div className="flex flex-col gap-10 flex-1 mb-20">
                            
                            <CheckoutCart items={items} onUpdateQuantityButton={onUpdateQuantityButton} removeCartItem={removeCartItem} loading={loading}></CheckoutCart>

                            <CheckoutInfo className={loading ? 'opacity-50 pointer-events-none' : ''}></CheckoutInfo>

                            <CheckoutAddress className={loading ? 'opacity-50 pointer-events-none' : ''}></CheckoutAddress>

                        </div>

                        <div className="w-[450px]">
                            <CheckoutTotalCard totalAmount={totalAmount} loading={loading}></CheckoutTotalCard>
                        </div>

                    </div>
                </form>
            </FormProvider>
        </Container>
    );
}