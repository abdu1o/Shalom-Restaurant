import { CartDTO } from "@/services/dto/cart-dto";
import { calcTotalItemPrice } from "./calc-cart-item-price";
import { Cart } from "@prisma/client";

export type CartStateItem = {
    id: number;
    quantity: number;
    name: string;
    description: string;
    price: number;
    disabled?: boolean;
    imageUrl: string;
    size?: number | null;
};

interface ReturnProps {
    items: CartStateItem[];
    totalAmount: number;
}

export const getCartDetails = (data: CartDTO): ReturnProps => {
    
    const items = data.items.map((item) => ({
        id: item.id,
        quantity: item.quantity,
        name: item.productItem.product.name,
        description: item.productItem.product.description,
        price: calcTotalItemPrice(item),
        imageUrl: item.productItem.product.imageUrl,
        size: item.productItem.size,
        disabled: false,
    })) as CartStateItem[];

    return {
        items,
        totalAmount: data.totalAmount,  
    };
};