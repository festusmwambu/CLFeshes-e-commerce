import { Prisma } from "@prisma/client";
import prisma from "./prisma";
import { cookies } from "next/dist/client/components/headers";

export type CartItemWithProduct = Prisma.CartItemGetPayload<{
  include: { product: true };
}>;

export type CartWithProducts = Prisma.CartGetPayload<{
  include: { CartItem: { include: { product: true } } };
}>;

export type ShoppingCart = CartWithProducts & {
  size: number;
  subtotal: number;
};

export const getCart = async (): Promise<ShoppingCart | null> => {
  const localCartId = cookies().get("localCartId")?.value;
  const cart = localCartId ? 
    await prisma.cart.findUnique({
      where: { id: localCartId },
      include: { CartItem: { include: { product: true } } },
    }) 
    : null;

  if (!cart) {
    return null;
  }

  return {
    ...cart,
    size: cart.CartItem.reduce((acc, item) => acc + item.quantity, 0),
    subtotal: cart.CartItem.reduce(
      (acc, item) => acc + item.quantity * item.product.price,
      0
    ),
  };
};

const createCart = async (): Promise<ShoppingCart> => {
  const newCart = await prisma.cart.create({
    data: {},
  });

  // Note: Needs encryption + secure settings in real production web app.
  cookies().set("cookieCartId", newCart.id);

  return {
    ...newCart,
    CartItem: [],
    size: 0,
    subtotal: 0,
  };
};

export default createCart;
