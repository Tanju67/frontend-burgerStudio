import { configureStore } from "@reduxjs/toolkit";
import { authApi } from "../services/authApi";
import { rtkQueryErrorLogger } from "./errorMiddleware";

const store = configureStore({
  reducer: {
    [authApi.reducerPath]: authApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware()
      .concat(authApi.middleware)
      .concat(rtkQueryErrorLogger),
});

export default store;

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
