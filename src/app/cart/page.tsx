import { getCart } from "@/lib/db/cart";

export const metadata = {
  title: "Your Cart - CLFeshes",
};

const CartPage = async () => {
  const cart = await getCart();

  return (
    <div>
      <h1 className="mb-6 text-3xl font-bold">Shopping Cart</h1>
      {cart?.CartItem.map((cartItem) => {})};
    </div>
  );
};

export default CartPage;
