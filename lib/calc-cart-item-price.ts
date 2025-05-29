import { CartItemDTO } from "@/services/dto/cart-dto";

export const calcTotalItemPrice = (item: CartItemDTO): number => {
    return item.productItem.price * item.quantity;
};