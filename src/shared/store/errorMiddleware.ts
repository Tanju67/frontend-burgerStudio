import { isRejectedWithValue, type Middleware } from "@reduxjs/toolkit";
import { toaster } from "../utils/toaster";

interface ApiErrorPayload {
  status: number | string;
  data?: {
    message?: string;
  };
  error?: string;
}

export const rtkQueryErrorLogger: Middleware = () => (next) => (action) => {
  if (isRejectedWithValue(action)) {
    const payload = action.payload as ApiErrorPayload;
    const status = payload.status;

    // action.meta üzerindeki verilere güvenli erişim
    const metaArg = action.meta && (action.meta as any).arg;
    const endpointName = metaArg?.endpointName;

    if (endpointName === "getCurrentUser") {
      return next(action);
    }

    // 2. NETWORK & CONNECTION ERRORS (IP Access, Internet down)
    if (status === "FETCH_ERROR") {
      toaster(
        "error",
        "Server connection failed. Please check your internet or database access.",
      );
      return next(action);
    }

    // 3. TIMEOUT ERRORS
    if (status === "TIMEOUT_ERROR") {
      toaster("error", "Request timed out. The server is not responding.");
      return next(action);
    }

    const message =
      payload.data?.message || payload.error || "An unexpected error occurred";

    // 4. AUTH & VALIDATION ERRORS
    const authEndpoints = ["login", "register"];

    if (
      (endpointName && authEndpoints.includes(endpointName)) ||
      status === 400 ||
      status === 401
    ) {
      // Konsolda teknik detay kalsın ama kullanıcıya dostane mesaj gitsin
      console.warn(`Auth/Validation Error [${endpointName}]:`, message);
      toaster("error", message);
      return next(action);
    }

    // 5. CRITICAL ERRORS (Server Down or Wrong Route)
    // fetch_error string olduğu için sayısal kontrolü güvenli yapıyoruz
    if (typeof status === "number" && (status >= 500 || status === 404)) {
      const searchParams = new URLSearchParams({
        message: message,
        status: status.toString(),
      });
      window.location.href = `/error?${searchParams.toString()}`;
    }
  }

  return next(action);
};
