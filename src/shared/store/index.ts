import { configureStore } from "@reduxjs/toolkit";

import { rtkQueryErrorLogger } from "./errorMiddleware";
import { baseApi } from "../services/baseApi";
import darkModeReducer from "./DarkModeSlice";

const store = configureStore({
  reducer: {
    darkMode: darkModeReducer,
    [baseApi.reducerPath]: baseApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware()
      .concat(baseApi.middleware)
      .concat(rtkQueryErrorLogger),
});

export default store;

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
