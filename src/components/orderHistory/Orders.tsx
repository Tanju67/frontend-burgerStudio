import { useGetMyOrdersQuery } from "../../shared/services/orderApi";
import MenuSkeleton from "../../shared/skeletons/MenuSkeleton";
import IsError from "../../shared/UIElements/isError/IsError";
import OrderContent from "./OrderContent";

function Orders() {
  const { data, isLoading, isError } = useGetMyOrdersQuery();

  let content;
  if (isLoading) {
    content = <MenuSkeleton />;
  } else if (isError) {
    content = <IsError />;
  } else if (data?.length === 0) {
    content = (
      <div className="flex flex-col items-center justify-center py-2 text-center">
        <span className="mb-4 text-6xl">🍔</span>
        <h2 className="text-text-dark text-xl font-black uppercase italic">
          No orders yet!
        </h2>
        <p className="text-main-dark mt-2 text-sm">
          Time to taste our delicious burgers.
        </p>
      </div>
    );
  } else {
    content = <OrderContent data={data ?? []} />;
  }
  return <div className="bg-main-light">{content}</div>;
}

export default Orders;
