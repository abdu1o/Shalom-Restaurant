import { findOrCreateCart } from "@/lib/find-or-create-cart";
import { updateCartPrice } from "@/lib/update-cart-price";
import { prisma } from "@/prisma/prisma-client";
import { CreateCartItemValues } from "@/services/dto/cart-dto";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {

    try {
        const token = req.cookies.get('cartToken')?.value;
        
        if (!token) {
            return NextResponse.json({totalAmount:0, items: []});
        }

        const userCart = await prisma.cart.findFirst({
            where: {
                OR: [
                    {
                        token
                    }
                ]
            },
            include: {
                items: {
                    orderBy: {
                        createdAt: 'desc'
                    },
                    include: {
                        productItem: {
                            include: {
                                product: true,
                            }
                        }
                    }
                }
            }
        });

        return NextResponse.json(userCart);

    } catch (error) {
        console.log(error, 'GET');
    }
}

export async function POST(req: NextRequest) {
    try {
        let token = req.cookies.get('cartToken')?.value;

        if (!token) {
            token = crypto.randomUUID();
        }
        
        const userCart = await findOrCreateCart(token);
        
        const data = (await req.json()) as CreateCartItemValues;

        const findCartItem = await prisma.cartItem.findFirst({
           where: {
               cartId: userCart.id,
               productItemId: data.productItemId,
           } 
        });

        if(findCartItem) {
            await prisma.cartItem.update({
                where: {
                    id: findCartItem.id,
                },
                data: {
                    quantity: findCartItem.quantity + 1,
                }
            });
        } else {
            await prisma.cartItem.create({
                data: {
                    cartId: userCart.id,
                    productItemId: data.productItemId,
                    quantity: 1,
                }
        });
        }

        const updatedCart = await updateCartPrice(token);

        const response = NextResponse.json(updatedCart);
        response.cookies.set('cartToken', token);

        return response;

    } catch (error) {
        console.log(error, 'POST');
        return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });
    }
}