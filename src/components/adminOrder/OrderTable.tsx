import useDashboard from "../../shared/hooks/useDahboard";
import { useGetAllOrdersQuery } from "../../shared/services/orderApi";
import DashboardMenuSkeleton from "../../shared/skeletons/DahboardMenuSkeleton";
import Button from "../../shared/UIElements/button/Button";
import { filteredData } from "../../shared/utils/helper";
import OrderTableContent from "./OrderTableContent";

function OrderTable() {
  const {
    dashboard: { menuActiveTab },
  } = useDashboard();

  const { data, isLoading, isError, refetch } = useGetAllOrdersQuery();

  const filtered = filteredData(menuActiveTab, data ?? []);

  let content;

  if (isLoading) {
    content = <DashboardMenuSkeleton />;
  } else if (isError) {
    content = (
      <div className="flex min-h-[50vh] flex-col items-center justify-center text-center">
        <h2 className="text-xl font-bold">Oops! Something went wrong.</h2>
        <p className="text-gray-500">We couldn't load the menu.</p>
        <Button
          type="button"
          onClick={() => refetch()}
          className="bg-main-btn mt-4 px-4 py-2 text-white"
        >
          Try Again
        </Button>
      </div>
    );
  } else {
    content = <OrderTableContent data={filtered} />;
  }

  return <div>{content}</div>;
}
export default OrderTable;
