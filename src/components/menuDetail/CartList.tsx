import { useSelector } from "react-redux";
import useCart from "../../shared/hooks/useCart";
import type { Product } from "../../shared/schemas/productSchemas";
import { selectTotalPrice } from "../../shared/store/CartSlice";
import Button from "../../shared/UIElements/button/Button";
import { formatPrice } from "../../shared/utils/helper";
import CartListItem from "./CartListItem";

function CartList() {
  const { cart, setCartModal, setActiveCart } = useCart();
  const totalPrice = useSelector(selectTotalPrice);
  if (cart.cartData.length === 0) {
    return (
      <ul className="flex flex-col gap-2 py-8 text-xs md:text-base">
        <p className="text-center">
          Your cart is empty. Start adding some delicious items!
        </p>
        <div className="mb-4 flex items-center justify-center">
          <Button
            type="button"
            onClick={() => setCartModal(false)}
            className="bg-secondary-btn border-0 px-4 py-2"
          >
            Return to Menu
          </Button>
        </div>
      </ul>
    );
  }
  return (
    <ul className="mt-4 flex flex-col gap-2 text-xs md:text-base">
      {cart.cartData.map((item: Product) => (
        <CartListItem
          key={item._id}
          _id={item._id}
          title={item.title}
          image={item.image}
          price={item.price}
          amount={item.amount}
        />
      ))}

      <div className="text-end">
        <p>
          <span>Total:</span> <span>{formatPrice(totalPrice)}</span>
        </p>
      </div>

      {cart.activeCart === 0 && (
        <div className="mt-4 mb-8 flex items-center justify-between">
          <Button
            type="button"
            onClick={() => setCartModal(false)}
            className="bg-secondary-btn hover:bg-secondary-btn-hover px-4 py-2"
          >
            Return
          </Button>
          <Button
            type="button"
            onClick={() => setActiveCart(1)}
            className="bg-main-btn hover:bg-main-btn-hover px-4 py-2 text-xs text-white transition-all duration-300 ease-in-out active:scale-90 md:text-base"
          >
            Contiune
          </Button>
        </div>
      )}
    </ul>
  );
}

export default CartList;
