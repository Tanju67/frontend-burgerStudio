import { useGetMyOrdersQuery } from "../../shared/services/orderApi";
import OrderHistorySkeleton from "../../shared/skeletons/OrderHistorySkeleton";
import IsError from "../../shared/UIElements/isError/IsError";
import NoOrder from "./NoOrder";
import OrderContent from "./OrderContent";

function Orders() {
  const { data, isLoading, isError } = useGetMyOrdersQuery();

  let content;
  if (isLoading) {
    content = <OrderHistorySkeleton />;
  } else if (isError) {
    content = <IsError />;
  } else if (data?.length === 0) {
    content = <NoOrder />;
  } else {
    content = <OrderContent data={data ?? []} />;
  }
  return <div className="bg-main-light">{content}</div>;
}

export default Orders;
