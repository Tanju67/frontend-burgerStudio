import useDashboard from "../../shared/hooks/useDahboard";
import Modal from "../../shared/UIElements/modal/Modal";
import OrderDetail from "./OrderDetail";
import OrderTable from "./OrderTable";
import StatusUpdateForm from "./StatusUpdateForm";

function Content() {
  const {
    dashboard: { isOrderDetailModalOpen, isOrderStatusModalOpen },
    closeOrderDetailModal,
    closeOrderStatusModal,
  } = useDashboard();
  return (
    <div className="h-[80vh] overflow-y-auto">
      <OrderTable />

      <Modal
        onClose={() => closeOrderStatusModal()}
        open={isOrderStatusModalOpen}
        className="bg-bg w-[90vw] sm:w-[70vw] md:w-1/2 lg:w-1/4"
      >
        <StatusUpdateForm />
      </Modal>

      <Modal
        onClose={() => closeOrderDetailModal()}
        open={isOrderDetailModalOpen}
        className="bg-bg w-[90vw] sm:w-[70vw] md:w-1/2 lg:w-1/3"
      >
        <OrderDetail />
      </Modal>
    </div>
  );
}

export default Content;
