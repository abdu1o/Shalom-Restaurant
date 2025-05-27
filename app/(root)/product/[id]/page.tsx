import { Container, ProductImage, Title, VariantSelector } from "@/components/custom";
import { prisma } from "@/prisma/prisma-client";
import { notFound } from "next/navigation";

interface ProductPageProps {
  params: {
    id: string;
  };
}

export default async function ProductPage({ params }: ProductPageProps) {
  const { id } = await params;
  const productId = Number(id);

  const product = await prisma.product.findFirst({
    where: { id: productId },
    include: { items: true, ingredients: true },
  });

  if (!product) {
    return notFound();
  }

  return (
    <Container className="flex flex-col my-10">
      <div className="flex flex-1">
        <ProductImage imageUrl={product.imageUrl} className='w-[400px] h-[400px]' />

        <div className="w-[400px] bg-white p-7">
          <Title text={product.name} size="lg" className="font-extrabold mb-1" />

          <p className="text-gray-500">{product.description}</p>

          <VariantSelector
            selectedValue="1"
            items={[
              { name: 'Vegan', value: '1' },
              { name: 'Non-vegan', value: '2', disabled: true },
              { name: 'Gluten-free', value: '3' },
            ]}
          />
        </div>
      </div>
    </Container>
  );
}
