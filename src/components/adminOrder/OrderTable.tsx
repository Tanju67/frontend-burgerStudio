import useDashboard from "../../shared/hooks/useDahboard";
import { useGetAllOrdersQuery } from "../../shared/services/orderApi";
import OrderTableSkeleton from "../../shared/skeletons/OrderTableSkeleton";
import IsError from "../../shared/UIElements/isError/IsError";
import { filteredData } from "../../shared/utils/helper";
import OrderTableContent from "./OrderTableContent";

function OrderTable() {
  const {
    dashboard: { menuActiveTab },
  } = useDashboard();

  const { data, isLoading, isError } = useGetAllOrdersQuery();

  const filtered = filteredData(menuActiveTab, data ?? []);

  let content;

  if (isLoading) {
    content = <OrderTableSkeleton />;
  } else if (isError) {
    content = <IsError />;
  } else {
    content = <OrderTableContent data={filtered} />;
  }

  return <div>{content}</div>;
}
export default OrderTable;
