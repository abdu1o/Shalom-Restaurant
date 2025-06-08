'use server';

import { Client } from '@googlemaps/google-maps-services-js';
import { CheckoutFormValues } from "@/components/custom/checkout/schemas/checkout-form-schema";
import { prisma } from "@/prisma/prisma-client";
import { OrderStatus } from "@prisma/client";
import { cookies } from 'next/headers';
import { PayOrderTemplate } from '@/components/custom/email-templates/pay-order-template';
import { sendEmail } from '@/lib/send-email';
import ReactDOMServer from 'react-dom/server';
import React from 'react';

export async function createOrder(data: CheckoutFormValues) {
    try {
        const cookieStore = cookies();
        const cartToken = (await cookieStore).get('cartToken')?.value;

        if (!cartToken) {
            return;
        }

        const userCart = await prisma.cart.findFirst({
            include: {
                user: true,
                items: {
                    include: {
                        productItem: {
                            include: {
                                product: true,
                            }
                        }
                    }
                }
            },
            where: {
                token: cartToken,
            }
        })

        if (!userCart) {
            throw new Error('Cart not found');
        }

        if (userCart?.totalAmount === 0) {
            throw new Error('Cart is empty');
        }

        const order = await prisma.order.create({
            data: {
                token: cartToken,
                fullName: data.firstName + ' ' + data.lastName,
                email: data.email,
                phone: data.phone,
                address: data.address,
                comment: data.comment,
                totalAmount: userCart.totalAmount,
                status: OrderStatus.Pending,
                items: JSON.stringify(userCart.items),
            },
        });

        await prisma.cart.update({
            where: {
                id: userCart.id,
            },
            data: {
                totalAmount: 0,
            },
        });

        await prisma.cartItem.deleteMany({
            where: {
                cartId: userCart.id,
            },
        });

        const paymentUrl = 'https://monobank.ua/';

        await sendEmail(
            data.email,
            'Shalom | Pay for the order №' + order.id,
            PayOrderTemplate({
                orderId: order.id,
                totalAmount: order.totalAmount,
                paymentUrl,
            }),
        );


        return '/';

    } catch (error) {
        console.log('[CreateOrder] Server error', error);
    }
}


// google autocomplete
const client = new Client();
export const autocomplete = async (input: string) => {

    try {
        const response = await client.placeAutocomplete({
            params: {
                input,
                key: process.env.GOOGLE_API_KEY!,
            },
        });
        return response.data.predictions;
    } catch (error) {
        console.log(error);
    }

}