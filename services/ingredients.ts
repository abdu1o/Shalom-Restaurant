import { Ingredient, Product } from "@prisma/client"
import { axiosInstance } from "./axios"
import { ApiRoutes } from "./constants";

export const getAll = async () => {
    return (await axiosInstance.get<Ingredient[]>(ApiRoutes.SERCH_INGREDIENTS)).data;
};