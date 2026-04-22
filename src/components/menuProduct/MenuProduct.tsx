import { useParams, useSearchParams } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import useDashboard from "../../shared/hooks/useDahboard";
import { useGetProductsByMenuQuery } from "../../shared/services/productApi";
import DashboardProductSkeleton from "../../shared/skeletons/DashboardProductSkeleton";
import Button from "../../shared/UIElements/button/Button";
import DashboardNav from "../../shared/UIElements/dashboardNav/DashboardNav";
import NavItem from "../../shared/UIElements/dashboardNav/NavItem";
import Modal from "../../shared/UIElements/modal/Modal";
import { dashboardProductNavData } from "../../shared/utils/data";
import AddProductForm from "./AddProductForm";
import Content from "./Content";

function MenuProduct() {
  const [searchParams] = useSearchParams();
  const title = searchParams.get("title");
  const menuId = useParams().id;
  const { data, isLoading, isError, refetch } = useGetProductsByMenuQuery(
    menuId!,
  );
  const {
    dashboard: { isProductModalOpen },
    closeProductModal,
  } = useDashboard();
  if (!title) return null;

  let content;

  if (isLoading) {
    content = <DashboardProductSkeleton />;
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
    content = <Content data={data ?? []} />;
  }

  return (
    <div className="text-text-dark">
      <DashboardNav title={title} rightSection={true} isRedirect={true}>
        <NavItem
          data={dashboardProductNavData}
          btnTitle="Add Product"
          isBtnVisible={true}
        />
      </DashboardNav>

      {content}

      <Modal
        onClose={() => closeProductModal()}
        open={isProductModalOpen}
        className="bg-bg w-[90vw] sm:w-[70vw] md:w-1/2 lg:w-1/3"
      >
        <AddProductForm />
      </Modal>

      <ToastContainer />
    </div>
  );
}

export default MenuProduct;
