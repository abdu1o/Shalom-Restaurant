'use server';

import { Client } from '@googlemaps/google-maps-services-js';
import { CheckoutFormValues } from "@/components/custom/checkout/schemas/checkout-form-schema";
import { prisma } from "@/prisma/prisma-client";
import { OrderStatus } from "@prisma/client";

export async function createOrder(data:CheckoutFormValues) {
    const token = '123';

    await prisma.order.create({
        data: {
            token,
            totalAmount: 2000,
            status: OrderStatus.Pending,
            items: [],
            fullName: data.firstName + ' ' + data.lastName,
            address: data.address,
            phone: data.phone,
            email: data.email,
            comment: data.comment
        }
    });

    return `http://localhost:3000/checkout/${token}`
}



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