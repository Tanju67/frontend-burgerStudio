import { useEffect } from "react";
import useDashboard from "../../shared/hooks/useDahboard";
import { useGetMenusQuery } from "../../shared/services/menuApi";
import DashboardMenuProductSkeleton from "../../shared/skeletons/DashboardMenuProductSkeleton";
import DashboardNav from "../../shared/UIElements/dashboardNav/DashboardNav";
import IsError from "../../shared/UIElements/isError/IsError";
import ProductContent from "./ProductContent";

function BoardProduct() {
  const { setMenuActiveTab } = useDashboard();
  const { data, isLoading, isError } = useGetMenusQuery();
  useEffect(() => {
    setMenuActiveTab(0);
  }, [setMenuActiveTab]);

  let content;

  if (isLoading) {
    content = <DashboardMenuProductSkeleton length={8} />;
  } else if (isError) {
    content = <IsError />;
  } else {
    content = <ProductContent data={data ?? []} />;
  }
  return (
    <div>
      <DashboardNav title="Products" rightSection={false} />
      {content}
    </div>
  );
}

export default BoardProduct;
