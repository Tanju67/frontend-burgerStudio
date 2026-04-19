import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import type { Menu } from "../schemas/menuSchemas";
import type { Product } from "../schemas/productSchemas";
import type { Order, OrderItem } from "../schemas/orderSchemas";

export interface DashboardState {
  menuActiveTab: number;
  isMenuModalOpen: boolean;
  isProductModalOpen: boolean;
  isOrderDetailModalOpen: boolean;
  isOrderStatusModalOpen: boolean;
  editingMenu: Menu | null;
  editingProduct: Product | null;
  order: Order[];
  orderItems: OrderItem[];
  orderId: string;
}

const initialState: DashboardState = {
  menuActiveTab: 0,
  isMenuModalOpen: false,
  editingMenu: null,
  isProductModalOpen: false,
  editingProduct: null,
  order: [],
  isOrderDetailModalOpen: false,
  isOrderStatusModalOpen: false,
  orderItems: [],
  orderId: "",
};

const dashboardSlice = createSlice({
  name: "dashboard",
  initialState,
  reducers: {
    setMenuActiveTab: (state, action: PayloadAction<number>) => {
      state.menuActiveTab = action.payload;
    },
    openMenuModal: (state, action: PayloadAction<Menu | null>) => {
      state.isMenuModalOpen = true;
      state.editingMenu = action.payload;
    },
    closeMenuModal: (state) => {
      state.isMenuModalOpen = false;
      state.editingMenu = null;
    },
    openOrderDetailModal: (state, action: PayloadAction<OrderItem[]>) => {
      state.isOrderDetailModalOpen = true;
      state.orderItems = action.payload;
    },
    closeOrderDetailModal: (state) => {
      state.isOrderDetailModalOpen = false;
    },
    openProductModal: (state, action: PayloadAction<Product | null>) => {
      state.isProductModalOpen = true;
      state.editingProduct = action.payload;
    },
    closeProductModal: (state) => {
      state.isProductModalOpen = false;
      state.editingProduct = null;
    },
    openOrderStatusModal: (state, action: PayloadAction<string>) => {
      state.isOrderStatusModalOpen = true;
      state.orderId = action.payload;
    },
    closeOrderStatusModal: (state) => {
      state.isOrderStatusModalOpen = false;
      state.orderId = "";
    },
  },
});

export const dashboardActions = dashboardSlice.actions;
export default dashboardSlice.reducer;
