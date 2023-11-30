import { getCart } from "@/lib/db/cart";
import CartEntry from "./cart_entry";
import setProductQuantity from "./set_product_quantity";
import formatPrice from "@/lib/format_price";

export const metadata = {
  title: "Your Cart - CLFeshes",
};

const CartPage = async () => {
  const cart = await getCart();

  return (
    <div>
      <h1 className="mb-6 text-3xl font-bold">Shopping Cart</h1>
      {cart?.items.map((item) => (
        <CartEntry
          key={item.id}
          cartItem={item}
          setProductQuantity={setProductQuantity}
        />
      ))}

      {!cart?.items.length && <p>Your cart is empty</p>}

      <div className="flex flex-col items-end sm:items-center">
        <p className="mb-3 font-bold">
          Total:
          {formatPrice(cart?.subtotal || 0)}
        </p>

        <button className="btn btn-primary sm:w-[200px]">Checkout</button>
      </div>
    </div>
  );
};

export default CartPage;
