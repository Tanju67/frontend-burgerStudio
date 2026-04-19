import { useDispatch, useSelector } from "react-redux";
import type { AppDispatch, RootState } from "../store";
import { dashboardActions } from "../store/DashboardSlice";
import type { Menu } from "../schemas/menuSchemas";
import type { OrderItem } from "../schemas/orderSchemas";
import type { Product } from "../schemas/productSchemas";
import { useCallback } from "react";

function useDashboard() {
  const dispatch = useDispatch<AppDispatch>();
  const dashboard = useSelector((state: RootState) => state.dashboard);

  const setMenuActiveTab = useCallback(
    (tab: number) => {
      dispatch(dashboardActions.setMenuActiveTab(tab));
    },
    [dispatch],
  );

  const openMenuModal = useCallback(
    (menu: Menu | null) => {
      dispatch(dashboardActions.openMenuModal(menu));
    },
    [dispatch],
  );

  const closeMenuModal = useCallback(() => {
    dispatch(dashboardActions.closeMenuModal());
  }, [dispatch]);

  const openOrderDetailModal = useCallback(
    (order: OrderItem[]) => {
      dispatch(dashboardActions.openOrderDetailModal(order));
    },
    [dispatch],
  );

  const closeOrderDetailModal = useCallback(() => {
    dispatch(dashboardActions.closeOrderDetailModal());
  }, [dispatch]);

  const openProductModal = useCallback(
    (product: Product | null) => {
      dispatch(dashboardActions.openProductModal(product));
    },
    [dispatch],
  );

  const closeProductModal = useCallback(() => {
    dispatch(dashboardActions.closeProductModal());
  }, [dispatch]);

  const openOrderStatusModal = useCallback(
    (orderId: string) => {
      dispatch(dashboardActions.openOrderStatusModal(orderId));
    },
    [dispatch],
  );

  const closeOrderStatusModal = useCallback(() => {
    dispatch(dashboardActions.closeOrderStatusModal());
  }, [dispatch]);

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
