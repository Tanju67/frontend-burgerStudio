import { useDispatch, useSelector } from "react-redux";
import type { AppDispatch, RootState } from "../store";
import { dashboardActions } from "../store/DashboardSlice";
import type { Menu } from "../schemas/menuSchemas";
import type { OrderItem } from "../schemas/orderSchemas";
import type { Product } from "../schemas/productSchemas";

function useDashboard() {
  const dispatch = useDispatch<AppDispatch>();

  const dashboard = useSelector((state: RootState) => state.dashboard);

  const setMenuActiveTab = (tab: number) => {
    dispatch(dashboardActions.setMenuActiveTab(tab));
  };

  const openMenuModal = (menu: Menu | null) => {
    dispatch(dashboardActions.openMenuModal(menu));
  };

  const closeMenuModal = () => {
    dispatch(dashboardActions.closeMenuModal());
  };

  const openOrderDetailModal = (order: OrderItem[]) => {
    dispatch(dashboardActions.openOrderDetailModal(order));
  };
  const closeOrderDetailModal = () => {
    dispatch(dashboardActions.closeOrderDetailModal());
  };

  const openProductModal = (product: Product | null) => {
    dispatch(dashboardActions.openProductModal(product));
  };

  const closeProductModal = () => {
    dispatch(dashboardActions.closeProductModal());
  };

  const openOrderStatusModal = (orderId: string) => {
    dispatch(dashboardActions.openOrderStatusModal(orderId));
  };

  const closeOrderStatusModal = () => {
    dispatch(dashboardActions.closeOrderStatusModal());
  };
  return {
    dashboard,
    setMenuActiveTab,
    openMenuModal,
    closeMenuModal,
    openOrderDetailModal,
    closeOrderDetailModal,
    openProductModal,
    closeProductModal,
    openOrderStatusModal,
    closeOrderStatusModal,
  };
}

export default useDashboard;
