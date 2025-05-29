import { prisma } from '@/prisma/prisma-client';

export interface GetSearchParams {
  query?: string;
  sortBy?: string;
  ingredients?: string;
  priceFrom?: string;
  priceTo?: string;
}

const DEFAULT_MIN_PRICE = 0;
const DEFAULT_MAX_PRICE = 1000;

export const findProducts = async (params: GetSearchParams) => {

    const ingredientsIdArr = params.ingredients?.split(',').map(Number);

    const minPrice = params.priceFrom ? Number(params.priceFrom) : DEFAULT_MIN_PRICE;
    const maxPrice = params.priceTo ? Number(params.priceTo) : DEFAULT_MAX_PRICE;


    const categories = await prisma.category.findMany({ 
        include: { 
          products: {
            orderBy: {
                id: 'desc',
            },
            where: {
                ingredients: ingredientsIdArr ? {
                    some: {
                        id: {
                            in: ingredientsIdArr
                        }
                    }
                } : undefined,
                items: {
                    some: {
                        price: {
                            gte: minPrice, 
                            lte: maxPrice, 
                        },
                    }
                }
            },
            include: {
                ingredients: true,
                items: {
                    orderBy: {
                        price: 'asc',
                    }
                },
            }
          } 
        },
        orderBy: {
        id: 'asc',
      }
    });


    return categories;
};