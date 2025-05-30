export const revalidate = 60;

import { Container, Title, TopBar, Filters, ProductsGroupList } from "@/components/custom"
import { findProducts, GetSearchParams } from "@/lib/find-products";

export default async function Home({ searchParams }: { searchParams: { [key: string]: string | string[] | undefined } }){

  const normalizedParams: GetSearchParams = {
    query: typeof searchParams.query === 'string' ? searchParams.query : undefined,
    sortBy: typeof searchParams.sortBy === 'string' ? searchParams.sortBy : undefined,
    ingredients: typeof searchParams.ingredients === 'string' ? searchParams.ingredients : undefined,
    priceFrom: typeof searchParams.priceFrom === 'string' ? searchParams.priceFrom : undefined,
    priceTo: typeof searchParams.priceTo === 'string' ? searchParams.priceTo : undefined,
  };

  const categories = await findProducts(normalizedParams);

  return <>

    <Container className="mt-5 mb-5" >
      <Title text="From Shabbat to Shakshuka — welcome home" size='lg' className="font-extrabold text-center"/>
    </Container>

    <TopBar categories={categories.filter((category) => category.products.length > 0)}/>
    <Container className="mt-10 pb-14">

      {/*filters*/}
      <div className="flex gap-[100px]">
        <div className="w-[250px]">
          <Filters></Filters>
        </div>

        {/*dish list*/}
        <div className="flex-1">
          <div className="flext flex-col gap-16">
              {
                categories.map((category) => (
                  category.products.length > 0 && <ProductsGroupList 
                  title={category.name}
                  key={category.id} 
                  categoryId={category.id}
                  items={category.products}></ProductsGroupList>
                ))
              }
          </div>
        </div>
      </div>
    </Container>
  </>
}
