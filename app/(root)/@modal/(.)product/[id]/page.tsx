import { ChooseProduct, Container, ProductImage, Title, VariantSelector } from "@/components/custom";
import { prisma } from "@/prisma/prisma-client";
import { notFound } from "next/navigation";

interface ProductModalPageProps {
  params: {
    id: string;
  };
}

export default async function ProductModalPage({ params }: ProductModalPageProps) {
  const { id } = await params;
  const productId = Number(id);

  const product = await prisma.product.findUnique({
    where: { id: productId },
  });

    if (!product) {
        return notFound();
    }

  return <ChooseProduct product={product}></ChooseProduct>
}
