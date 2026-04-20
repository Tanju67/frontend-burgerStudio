import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import useDashboard from "../../shared/hooks/useDahboard";
import { useUpdateOrderStatusMutation } from "../../shared/services/orderApi";
import Button from "../../shared/UIElements/button/Button";
import {
  updateOrderStatusSchema,
  type UpdateOrderStatus,
} from "../../shared/schemas/orderSchemas";
import { toaster } from "../../shared/utils/toaster";
import Spinner from "../../shared/UIElements/spinner/Spinner";
import { useGetCurrentUserQuery } from "../../shared/services/authApi";

function StatusUpdateForm() {
  const {
    closeOrderStatusModal,
    dashboard: { orderId },
  } = useDashboard();

  const [updateOrderStatus, { isLoading }] = useUpdateOrderStatusMutation();
  const { data: user } = useGetCurrentUserQuery();

  const isTestAdmin = user?.role === "test-admin";

  // 1. Hook Form Kurulumu
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<UpdateOrderStatus>({
    resolver: zodResolver(updateOrderStatusSchema),
    defaultValues: {
      status: "preparing", // Başlangıç değeri
    },
  });

  const onSubmit = async (data: UpdateOrderStatus) => {
    if (isTestAdmin) {
      return toaster("warning", "Test admin cannot modify data.");
    }
    if (!orderId) {
      return toaster("error", "Order ID not found");
    }

    try {
      await updateOrderStatus({
        id: orderId,
        status: data.status,
      }).unwrap();

      toaster("success", "Order status updated");
      closeOrderStatusModal();
    } catch (error: any) {
      console.error(error);
      const msg = error?.data?.message || "Failed to update status";
      toaster("error", msg);
    }
  };

  return (
    <div className="p-2">
      <h2 className="text-main-btn mb-4 text-center text-xl font-bold uppercase">
        Update Order Status
      </h2>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <fieldset className="fieldset">
          <legend className="fieldset-legend text-text-dark font-semibold">
            Order Status
          </legend>

          <select
            {...register("status")}
            className={`select bg-main-light text-text-dark w-full border-2 transition-colors ${
              errors.status
                ? "border-red-500"
                : "focus:border-main-btn border-transparent"
            }`}
          >
            <option value="preparing">Preparing</option>
            <option value="out_for_delivery">Out for delivery</option>
            <option value="delivered">Delivered</option>
            <option value="cancelled">Cancelled</option>
          </select>

          {errors.status ? (
            <span className="label text-xs text-red-500">
              {errors.status.message}
            </span>
          ) : (
            <span className="label text-text-dark text-xs opacity-70">
              Please select the current stage of the order.
            </span>
          )}
        </fieldset>

        <div className="border-main flex justify-end gap-2 border-t pt-4">
          <Button
            type="button"
            onClick={closeOrderStatusModal}
            className="bg-gray-400 px-4 py-2 text-white hover:bg-gray-500"
          >
            Cancel
          </Button>
          <Button
            type="submit"
            disabled={isLoading}
            className="bg-main-btn hover:bg-main-btn-hover min-w-25 px-6 py-2 text-white"
          >
            {isLoading ? (
              <div className="flex items-center gap-2">
                <Spinner /> <span>Updating...</span>
              </div>
            ) : (
              "Update Status"
            )}
          </Button>
        </div>
      </form>
    </div>
  );
}

export default StatusUpdateForm;
