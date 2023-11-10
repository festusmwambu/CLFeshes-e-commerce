"use server";

import createCart, { getCart } from "@/lib/db/cart";
import prisma from "@/lib/db/prisma";
import { revalidatePath } from "next/cache";

const setProductQuantity = async (productId: string, quantity: number) => {
  const cartItem = (await getCart()) ?? (await createCart());

  const itemInCart = cartItem.CartItem.find(
    (item) => item.productId === productId
  );

  if (quantity === 0) {
    if (itemInCart) {
      await prisma.cartItem.delete({
        where: { id: itemInCart.id },
      });
    }
  } else {
    if (itemInCart) {
      await prisma.cartItem.update({
        where: { id: itemInCart.id },
        data: { quantity },
      });
    } else {
      await prisma.cartItem.create({
        data: {
          cartId: cartItem.id,
          productId,
          quantity,
        },
      });
    }
  }

  revalidatePath("/cart");
};

export default setProductQuantity;
