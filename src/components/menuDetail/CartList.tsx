import { useSelector } from "react-redux";
import useCart from "../../shared/hooks/useCart";
import type { Product } from "../../shared/schemas/productSchemas";
import { selectTotalPrice } from "../../shared/store/CartSlice";
import Button from "../../shared/UIElements/button/Button";
import { formatPrice } from "../../shared/utils/helper";
import CartEmpty from "./CartEmpty";
import CartListItem from "./CartListItem";

function CartList() {
  const { cart, setCartModal, setActiveCart } = useCart();
  const totalPrice = useSelector(selectTotalPrice);

  if (cart.cartData.length === 0) {
    return <CartEmpty setCartModal={setCartModal} />;
  }

  return (
    <div className="mt-6 flex flex-col">
      <ul className="border-main/10 bg-main-light/30 dark:bg-main/10 flex flex-col gap-4 overflow-hidden rounded-2xl border p-2">
        {cart.cartData.map((item: Product) => (
          <CartListItem key={item._id} {...item} />
        ))}
      </ul>

      <div className="border-main-dark/30 mt-6 flex items-end justify-between border-t border-dashed pt-4">
        <span className="text-main-dark text-sm font-bold tracking-widest uppercase">
          Total Amount
        </span>
        <div className="text-right">
          <p className="text-main-btn text-3xl font-black tracking-tighter italic drop-shadow-sm">
            {formatPrice(totalPrice)}
          </p>
        </div>
      </div>

      {cart.activeCart === 0 && (
        <div className="mt-8 mb-4 flex items-center justify-between gap-4">
          <button
            type="button"
            onClick={() => setCartModal(false)}
            className="text-main-dark hover:text-secondary-btn text-sm font-bold tracking-widest uppercase transition-colors"
          >
            ← Back
          </button>

          <Button
            type="button"
            onClick={() => setActiveCart(1)}
            className="bg-main-btn hover:bg-main-btn-hover flex-1 rounded-xl py-4 text-sm font-black tracking-widest text-white uppercase shadow-[0_10px_20px_rgba(110,2,111,0.2)] transition-all active:scale-95 md:text-base"
          >
            Continue <span className="hidden sm:inline">to Checkout</span>
          </Button>
        </div>
      )}
    </div>
  );
}

export default CartList;
