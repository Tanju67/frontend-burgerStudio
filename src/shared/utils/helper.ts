import type { Order } from "../schemas/orderSchemas";

export const formatOrderDate = (isoDate: string) => {
  const date = new Date(isoDate);

  return {
    date: date.toLocaleDateString("en-GB"),
    time: date.toLocaleTimeString("en-GB", {
      hour: "2-digit",
      minute: "2-digit",
    }),
  };
};

export const isNewOrder = (orderDate: string) => {
  const orderTime = new Date(orderDate).getTime();
  const now = Date.now();

  const diffInMs = now - orderTime;

  return diffInMs <= 30 * 60 * 1000; // 30 dakika
};

export const isTodayOrder = (date: string): boolean => {
  const orderDate = new Date(date);
  const today = new Date();

  return (
    orderDate.getDate() === today.getDate() &&
    orderDate.getMonth() === today.getMonth() &&
    orderDate.getFullYear() === today.getFullYear()
  );
};

export const filteredData = (menuActiveTab: number, orders: Order[]) => {
  switch (menuActiveTab) {
    case 0:
      return orders.filter((order) => isNewOrder(order.createdAt));

    case 1:
      return orders.filter((order) => order.status === "out_for_delivery");

    case 2:
      return orders.filter((order) => order.status === "delivered");

    case 3:
      return orders.filter((order) => order.status === "cancelled");

    case 4:
      return orders.filter((order) => isTodayOrder(order.createdAt));

    case 5:
      return orders;

    default:
      return orders;
  }
};

// utils/formatAddress.ts
export interface Address {
  street?: string;
  houseNumber?: string;
  postalCode?: string;
  city?: string;
  phoneNumber?: string;
}

export function formatAddress(address: Address): string {
  if (!address) return "";

  const parts: string[] = [];

  if (address.street) parts.push(address.street);
  if (address.houseNumber) parts.push(address.houseNumber);
  if (address.city) parts.push(address.city);
  if (address.postalCode) parts.push(address.postalCode);

  return parts.join(", ");
}

export function formatPrice(value: number) {
  return new Intl.NumberFormat("de-DE", {
    style: "currency",
    currency: "EUR",
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(value);
}
