import { updateCartPrice } from "@/lib/update-cart-price";
import { prisma } from "@/prisma/prisma-client";
import { NextRequest, NextResponse } from "next/server";

export async function PATCH(req: NextRequest, { params }: { params: { id: string } }) {
  try {
    const { id: paramId } = await params;
    const id = Number(paramId);
    const data = (await req.json()) as { quantity: number };
    const token = req.cookies.get('cartToken')?.value;

    if (!token) {
      return NextResponse.json({ error: 'Cart token not found' });
    }

    const cartItem = await prisma.cartItem.findFirst({
      where: {
        id,
      },
    });

    if (!cartItem) {
      return NextResponse.json({ error: 'Cart item not found' });
    }

    await prisma.cartItem.update({
      where: {
        id,
      },
      data: {
        quantity: data.quantity,
      },
    });

    const updatedUserCart = await updateCartPrice(token);

    return NextResponse.json(updatedUserCart);
  } catch (error) {
    console.log('[CART_PATCH] Server error', error);
    return NextResponse.json({ message: 'Couldn`t update cart' }, { status: 500 });
  }
}

export async function DELETE(req: NextRequest, { params }: { params: { id: string } }) {
  try {
    const { id: paramId } = await params;
    const id = Number(paramId);
    const token = req.cookies.get('cartToken')?.value;

    if (!token) {
      return NextResponse.json({ error: 'Cart token not found' });
    }

    const cartItem = await prisma.cartItem.findFirst({
      where: {
        id,
      },
    });

    if (!cartItem) {
      return NextResponse.json({ error: 'Cart item not found' });
    }

    await prisma.cartItem.delete({
      where: {
        id,
      },
    });

    const updatedUserCart = await updateCartPrice(token);

    return NextResponse.json(updatedUserCart);
  } catch (error) {
    console.log('[CART_DELETE] Server error', error);
    return NextResponse.json({ message: 'Couldn`t update cart' }, { status: 500 });
  }
}