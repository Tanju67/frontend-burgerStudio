import { configureStore } from "@reduxjs/toolkit";
import cartReducer from "./CartSlice";

import { rtkQueryErrorLogger } from "./errorMiddleware";
import { baseApi } from "../services/baseApi";
import darkModeReducer from "./DarkModeSlice";
import { cartListenerMiddleware } from "./cartListener";

const store = configureStore({
  reducer: {
    cart: cartReducer,
    darkMode: darkModeReducer,
    [baseApi.reducerPath]: baseApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware()
      .prepend(cartListenerMiddleware.middleware)
      .concat(baseApi.middleware)
      .concat(rtkQueryErrorLogger),
});

export default store;

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
