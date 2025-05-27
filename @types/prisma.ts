import { Ingredient, Product, ProductItem } from "@prisma/client";

export type RelationsProduct = Product & {
    items: ProductItem[];
    ingredients: Ingredient[];
}