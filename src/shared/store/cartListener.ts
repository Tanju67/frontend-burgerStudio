import { createListenerMiddleware, isAnyOf } from "@reduxjs/toolkit";
import { cartActions } from "./CartSlice";
import type { RootState } from "./index";

export const cartListenerMiddleware = createListenerMiddleware();

cartListenerMiddleware.startListening({
  matcher: isAnyOf(
    cartActions.addToCart,
    cartActions.removeFromCart,
    cartActions.clearCart,
  ),
  effect: (action, listenerApi) => {
    const state = listenerApi.getState() as RootState;
    const cartData = state.cart.cartData;

    if (cartActions.clearCart.match(action)) {
      localStorage.removeItem("cartData");
    } else {
      localStorage.setItem("cartData", JSON.stringify(cartData));
    }
  },
});
