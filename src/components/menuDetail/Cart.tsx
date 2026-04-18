import { ToastContainer } from "react-toastify";
import useCart from "../../shared/hooks/useCart";
import Address from "./Address";
import CartExtra from "./CartExtra";
import CartList from "./CartList";
import CartNav from "./CartNav";
import Info from "./Info";

function Cart() {
  const { cart } = useCart();
  return (
    <div className="h-full overflow-y-scroll">
      <CartNav />
      {cart.activeCart === 0 && (
        <>
          <CartList />
          <CartExtra />
        </>
      )}
      {cart.activeCart === 1 && <Address />}
      {cart.activeCart === 2 && <Info />}
      <ToastContainer />
    </div>
  );
}

export default Cart;
