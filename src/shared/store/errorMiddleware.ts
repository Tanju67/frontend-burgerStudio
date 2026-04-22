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
    const metaArg = action.meta && (action.meta as any).arg;
    const endpointName = metaArg?.endpointName;

    console.log("DEBUG ERROR PAYLOAD:", payload);
    // 1. SESSİZ Hatalar (Kullanıcıya hiçbir şey gösterme)
    if (endpointName === "getCurrentUser") {
      return next(action);
    }

    const message =
      payload.data?.message || payload.error || "An unexpected error occurred";

    // 2. ERROR PAGE (Fatal Errors)
    // 404: Sayfa yok, 500+: Sunucu patlamış
    if (typeof status === "number" && (status >= 500 || status === 404)) {
      const searchParams = new URLSearchParams({
        message: message,
        status: status.toString(),
      });
      // Redirect to Error Page
      window.location.href = `/error?${searchParams.toString()}`;
      return next(action);
    }

    // 3. TOASTER (Recoverable Errors)
    // Kullanıcının düzeltebileceği veya sayfada kalarak aşabileceği hatalar

    // Bağlantı Hataları
    if (status === "FETCH_ERROR") {
      toaster("error", "Server connection failed. Check your internet.");
    }
    // Zaman Aşımı
    else if (status === "TIMEOUT_ERROR") {
      toaster("error", "Request timed out.");
    }
    // Diğer tüm 4xx Hataları (400, 401, 403, 422, 429 vb.)
    else {
      // Konsolda teknik detay kalsın
      console.warn(`API Error [${endpointName}]:`, message);
      toaster("error", message);
    }
  }

  return next(action);
};
