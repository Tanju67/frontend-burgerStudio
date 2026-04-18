import { useDispatch, useSelector } from "react-redux";
import type { AppDispatch, RootState } from "../store";
import { cartActions } from "../store/CartSlice";
import type { Product } from "../schemas/productSchemas";

function useCart() {
  const dispatch = useDispatch<AppDispatch>();

  const cart = useSelector((state: RootState) => state.cart);

  const setCartModal = (isOpen: boolean) => {
    dispatch(cartActions.setCartModal(isOpen));
  };

  const setProduct = (product: Product) => {
    dispatch(cartActions.setProduct(product));
  };

  const addToCart = (product: Product & { amount: number }) => {
    dispatch(cartActions.addToCart(product));
  };

  const removeFromCart = (id: string) => {
    dispatch(cartActions.removeFromCart(id));
  };

  const setActiveCart = (activeCart: number) => {
    dispatch(cartActions.setActiveCart(activeCart));
  };

  const clearCart = () => {
    dispatch(cartActions.clearCart());
  };

  return {
    cart,
    setCartModal,
    setProduct,
    addToCart,
    removeFromCart,
    setActiveCart,
    clearCart,
  };
}

export default useCart;
