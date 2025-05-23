import { Api } from "@/services/api-client";
import { Ingredient } from "@prisma/client"
import React from "react";
import { useSet } from 'react-use';

type IngredientItem = Pick<Ingredient, 'id' | 'name'>;

interface ReturnProps {
    ingredients: IngredientItem[];
    selectedIngredients: Set<string>;
    onAddId: (id: string) => void;
}

export const useIngredients = (values: string[] = []): ReturnProps => {

    const [ingredients, setIngredients] = React.useState<ReturnProps['ingredients']>([]);

    const [selectedIds, { toggle } ] = useSet(new Set<string>(values));

    React.useEffect(()=> {
        async function fetchIngredients() {
            try {
                const ingredients = await Api.ingredients.getAll();
                setIngredients(
                    ingredients.map((ingredient) => ({id: ingredient.id, name:ingredient.name}))
                );

            } catch (error) {
                console.log(error);
            }
        }

        fetchIngredients();
    }, []);

    return {ingredients, onAddId: toggle, selectedIngredients: selectedIds};
};

