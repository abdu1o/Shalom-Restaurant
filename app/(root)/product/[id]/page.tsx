import { Container, ProductForm } from "@/components/custom";
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
    include: {
      ingredients: true,
      category: {
        include: {
          products: {
            include: {
              items: true,
            },
          },
        },
      },
      items: true,
    },
  });

  if (!product) {
    return notFound();
  }

  return (
    <Container className="flex flex-col my-10">
      <div className="flex flex-1">
        <ProductForm className="w-[500px]" classNameImg="w-[450px] h-[450px]" product={product}></ProductForm>
      </div>
    </Container>
  );
}
