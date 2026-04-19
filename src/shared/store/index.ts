import { configureStore } from "@reduxjs/toolkit";
import { baseApi } from "../services/baseApi";
import cartReducer from "./CartSlice";
import darkModeReducer from "./DarkModeSlice";
import dashboardReucer from "./DashboardSlice";
import { cartListenerMiddleware } from "./cartListener";
import { rtkQueryErrorLogger } from "./errorMiddleware";

const store = configureStore({
  reducer: {
    cart: cartReducer,
    dashboard: dashboardReucer,
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
