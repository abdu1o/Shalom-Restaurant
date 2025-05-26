import { Container, Title, TopBar, Filters, ProductsGroupList } from "@/components/custom"
import { prisma } from "@/prisma/prisma-client";

export default async function Home() {

  const categories = await prisma.category.findMany({ 
    include: { 
      products: {
        include: {
          items: true,
          ingredients: true,
        }
      } 
    },
    orderBy: {
    id: 'asc',
  }
  });

  return <>

    <Container className="mt-5 mb-5" >
      <Title text="From Shabbat to Shakshuka — welcome home" size='lg' className="font-extrabold"/>
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
