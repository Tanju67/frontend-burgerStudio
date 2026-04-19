import { useEffect } from "react";
import useDashboard from "../../shared/hooks/useDahboard";
import { useGetMenusQuery } from "../../shared/services/menuApi";
import DashboardNav from "../../shared/UIElements/dashboardNav/DashboardNav";
import PageSpinner from "../../shared/UIElements/spinner/PageSpinner";
import ProductContent from "./ProductContent";
import DashboardMenuSkeleton from "../../shared/skeletons/DahboardMenuSkeleton";
import Button from "../../shared/UIElements/button/Button";

function BoardProduct() {
  const { setMenuActiveTab } = useDashboard();
  const { data, isLoading, isError, refetch } = useGetMenusQuery();
  useEffect(() => {
    setMenuActiveTab(0);
  }, [setMenuActiveTab]);

  let content;

  if (isLoading) {
    content = <DashboardMenuSkeleton layout="image" lenght={8} />;
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
