import { useParams, useSearchParams } from "react-router-dom";
import useDashboard from "../../shared/hooks/useDahboard";
import { useGetProductsByMenuQuery } from "../../shared/services/productApi";
import DashboardProductSkeleton from "../../shared/skeletons/DashboardProductSkeleton";
import DashboardNav from "../../shared/UIElements/dashboardNav/DashboardNav";
import NavItem from "../../shared/UIElements/dashboardNav/NavItem";
import IsError from "../../shared/UIElements/isError/IsError";
import Modal from "../../shared/UIElements/modal/Modal";
import { dashboardProductNavData } from "../../shared/utils/data";
import AddProductForm from "./AddProductForm";
import Content from "./Content";

function MenuProduct() {
  const [searchParams] = useSearchParams();
  const title = searchParams.get("title");
  const menuId = useParams().id;
  const { data, isLoading, isError } = useGetProductsByMenuQuery(menuId!);
  const {
    dashboard: { isProductModalOpen },
    closeProductModal,
  } = useDashboard();
  if (!title) return null;

  let content;

  if (isLoading) {
    content = <DashboardProductSkeleton />;
  } else if (isError) {
    content = <IsError />;
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
    </div>
  );
}

export default MenuProduct;
