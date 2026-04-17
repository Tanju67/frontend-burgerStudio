import { isRejectedWithValue, type Middleware } from "@reduxjs/toolkit";
import { toaster } from "../utils/toaster";

export const rtkQueryErrorLogger: Middleware =
  () => (next) => (action: any) => {
    if (isRejectedWithValue(action)) {
      const status = action.payload?.status;
      const endpointName = action.meta?.arg?.endpointName;

      // 1. NETWORK & CONNECTION ERRORS (e.g., MongoDB IP issues)
      if (status === "FETCH_ERROR") {
        toaster(
          "error",
          "Server connection failed. Please check your internet or database access.",
        );
        return next(action);
      }

      // 2. TIMEOUT ERRORS
      if (status === "TIMEOUT_ERROR") {
        toaster("error", "Request timed out. The server is not responding.");
        return next(action);
      }

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
