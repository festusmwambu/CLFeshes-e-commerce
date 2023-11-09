"use server";

import createCart, { getCart } from "@/lib/db/cart";
import prisma from "@/lib/db/prisma";
import { revalidatePath } from "next/cache";

const incrementProductQuantity = async (productId: string) => {
  const cartItem = (await getCart()) ?? (await createCart());

  const itemInCart = cartItem.CartItem.find(
    (item) => item.productId === productId
  );

  if (itemInCart) {
    await prisma.cartItem.update({
      where: { id: itemInCart.id },
      data: { quantity: { increment: 1 } },
    });
  } else {
    await prisma.cartItem.create({
      data: {
        cartId: cartItem.id,
        productId,
        quantity: 1,
      },
    });
  }

  revalidatePath("/products/[id]");
};

export default incrementProductQuantity;
