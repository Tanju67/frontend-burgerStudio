import { useEffect } from "react";
import { ToastContainer } from "react-toastify";
import useDashboard from "../../shared/hooks/useDahboard";
import { useGetMenusQuery } from "../../shared/services/menuApi";
import DashboardMenuSkeleton from "../../shared/skeletons/DahboardMenuSkeleton";
import Button from "../../shared/UIElements/button/Button";
import DashboardNav from "../../shared/UIElements/dashboardNav/DashboardNav";
import NavItem from "../../shared/UIElements/dashboardNav/NavItem";
import Modal from "../../shared/UIElements/modal/Modal";
import { dashboardMenuNavData } from "../../shared/utils/data";
import AddMenuForm from "./AddMenuForm";
import MenuContent from "./MenuContent";

function BoardMenu() {
  const {
    dashboard: { isMenuModalOpen },
    closeMenuModal,
    setMenuActiveTab,
  } = useDashboard();

  const { data, isLoading, isError, refetch } = useGetMenusQuery();

  useEffect(() => {
    setMenuActiveTab(0);
  }, [setMenuActiveTab]);

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
    content = <MenuContent data={data ?? []} />;
  }

  return (
    <div className="flex flex-col gap-4">
      <DashboardNav title="Menu" rightSection={true}>
        <NavItem
          data={dashboardMenuNavData}
          isBtnVisible={true}
          btnTitle="Add Menu"
        />
      </DashboardNav>

      {content}

      <Modal
        onClose={closeMenuModal}
        open={isMenuModalOpen}
        className="bg-bg w-[90vw] sm:w-[70vw] md:w-1/2 lg:w-1/3"
      >
        <AddMenuForm />
      </Modal>

      <ToastContainer />
    </div>
  );
}

export default BoardMenu;
