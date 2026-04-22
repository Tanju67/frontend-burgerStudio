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
import { cn } from "../../shared/utils/cn";

function StatusUpdateForm() {
  const {
    closeOrderStatusModal,
    dashboard: { orderId },
  } = useDashboard();

  const [updateOrderStatus, { isLoading }] = useUpdateOrderStatusMutation();
  const { data: user } = useGetCurrentUserQuery();

  const isTestAdmin = user?.role === "test-admin";

  // Form setup with Zod
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<UpdateOrderStatus>({
    resolver: zodResolver(updateOrderStatusSchema),
    defaultValues: {
      status: "preparing",
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
      const msg = error?.data?.message || "Failed to update status";
      toaster("error", msg);
    }
  };

  return (
    <div className="bg-bg rounded-[2.5rem] p-4">
      {/* Header with Studio Accent */}
      <div className="mb-8 text-center">
        <h2 className="text-main-btn text-2xl leading-none font-black tracking-tighter uppercase italic">
          Update Order Status
        </h2>
        <div className="bg-main mx-auto mt-2 h-1 w-12 rounded-full" />
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        <fieldset className="space-y-2">
          <label className="text-main-btn ml-2 text-[10px] font-black tracking-[0.2em] uppercase">
            Select Current Stage
          </label>

          <div className="group relative">
            <select
              {...register("status")}
              className={cn(
                "text-main-btn w-full cursor-pointer appearance-none rounded-2xl border-4 bg-white px-5 py-4 font-bold transition-all outline-none",
                errors.status
                  ? "border-red-500 shadow-[4px_4px_0px_0px_rgba(239,68,68,1)]"
                  : "border-main shadow-[6px_6px_0px_0px_rgba(255,200,0,1)] focus:translate-x-1 focus:translate-y-1 focus:shadow-none",
              )}
            >
              <option value="preparing">🍳 Preparing</option>
              <option value="out_for_delivery">🚀 Out for delivery</option>
              <option value="delivered">✅ Delivered</option>
              <option value="cancelled">❌ Cancelled</option>
            </select>

            {/* Custom Arrow Decoration */}
            <div className="text-main-btn pointer-events-none absolute top-1/2 right-5 -translate-y-1/2 font-black">
              ↓
            </div>
          </div>

          {errors.status && (
            <span className="ml-2 text-[10px] font-bold tracking-wider text-red-500 uppercase">
              {errors.status.message}
            </span>
          )}
        </fieldset>

        {/* Action Buttons */}
        <div className="border-main/10 flex flex-col gap-3 border-t pt-4 sm:flex-row">
          <Button
            type="button"
            onClick={closeOrderStatusModal}
            className="bg-main-btn/5 text-main-btn/40 order-2 flex-1 rounded-2xl py-4 text-[10px] font-bold tracking-widest uppercase transition-all hover:bg-red-50 hover:text-red-500 sm:order-1"
          >
            Go Back
          </Button>

          <Button
            type="submit"
            disabled={isLoading}
            className="bg-main-btn hover:bg-main-btn-hover order-1 flex-[2] rounded-2xl py-4 font-black tracking-tighter text-white uppercase italic shadow-lg transition-all active:scale-95 disabled:opacity-50 sm:order-2"
          >
            {isLoading ? (
              <div className="flex items-center justify-center gap-3">
                <Spinner /> <span className="animate-pulse">Updating...</span>
              </div>
            ) : (
              "Confirm Status Change"
            )}
          </Button>
        </div>
      </form>

      <p className="text-main-btn/20 mt-6 text-center text-[10px] font-bold tracking-[0.2em] uppercase">
        Studio Admin Dashboard 2026
      </p>
    </div>
  );
}

export default StatusUpdateForm;
