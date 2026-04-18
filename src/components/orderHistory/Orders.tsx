import { ErrorPage } from "../../pages";
import type { Order } from "../../shared/schemas/orderSchemas";

import { useGetMyOrdersQuery } from "../../shared/services/orderApi";
import PageSpinner from "../../shared/UIElements/spinner/PageSpinner";
import SingleOrder from "./SingleOrder";

function Orders() {
  const { data, isLoading, isError, isFetching } = useGetMyOrdersQuery();
  console.log(data);
  if (isLoading || isFetching) return <PageSpinner />;
  if (isError) return <ErrorPage />;
  if (data?.length === 0)
    return (
      <p className="mt-4 flex min-h-[50vh] items-center justify-center text-center md:block">
        You have no orders yet.
      </p>
    );
  if (!data) return <ErrorPage />;
  return (
    <div className="bg-main-light">
      <div className="container-box mt-30 flex flex-col gap-4 py-4 md:mt-0">
        {data.map((item: Order) => (
          <SingleOrder key={item._id} {...item} />
        ))}
      </div>
    </div>
  );
}

export default Orders;
