import { isRejectedWithValue, type Middleware } from "@reduxjs/toolkit";
import { toaster } from "../utils/toaster";

export const rtkQueryErrorLogger: Middleware =
  () => (next) => (action: any) => {
    if (isRejectedWithValue(action)) {
      const status = action.payload?.status;
      const endpointName = action.meta?.arg?.endpointName;

      const message =
        action.payload?.data?.message || "An unexpected error occurred";

      // 1. AUTH & VALIDATION ERRORS
      const authEndpoints = [
        "login",
        "register",
        // "createProduct",
        // "updateProduct",
      ];

      if (
        authEndpoints.includes(endpointName) ||
        status === 400 ||
        status === 401
      ) {
        console.warn(`Validation/Auth Error [${endpointName}]:`, message);
        toaster("error", message);
        return next(action);
      }

      // 2. CRITICAL ERRORS
      if (status >= 500 || status === 404) {
        const searchParams = new URLSearchParams({
          message: message,
          status: status.toString(),
        });
        window.location.href = `/error?${searchParams.toString()}`;
      }
    }

    return next(action);
  };
