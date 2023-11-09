import prisma from "@/lib/db/prisma";
import { notFound } from "next/navigation";
import Image from "next/image";
import PriceTag from "@/components/price_tag";
import { cache } from "react";
import { Metadata } from "next";
import AddToCartButton from "./add_to_cart_button";
import incrementProductQuantity from "./increment_product_quantity";

interface ProductPageProps {
  params: {
    id: string;
  };
}

const getProduct = cache(async (id: string) => {
  const product = await prisma.product.findUnique({ where: { id } });

  if (!product) notFound();
  return product;
});

export const generateMetadata = async ({
  params: { id },
}: ProductPageProps): Promise<Metadata> => {
  const product = await getProduct(id);

  return {
    title: product.name + " - CLFeshes",
    description: product.description,
    openGraph: {
      images: [
        {
          url: product.imageUrl,
        },
      ],
    },
  };
};

const ProductPage = async ({ params: { id } }: ProductPageProps) => {
  const product = await getProduct(id);
  if (!product) notFound();

  return (
    <div className="flex flex-col lg:flex-row gap-4 lg:items-center">
      <Image
        src={product.imageUrl}
        alt={product.name}
        width={500}
        height={500}
        className="rounded-lg"
        priority
      />

      <div>
        <h1 className="text-5xl font-bold">{product.name}</h1>
        <PriceTag price={product.price} className="mt-4" />
        <p className="py-6">{product.description}</p>
        <AddToCartButton
          productId={product.id}
          incrementProductQuantity={incrementProductQuantity}
        />
      </div>
    </div>
  );
};

export default ProductPage;
